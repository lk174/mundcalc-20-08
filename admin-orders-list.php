<?php
function mundula_panel_page() {
    global $MUNDULA_STATUSY;
    if ( ! current_user_can( 'manage_options' ) ) return;

    $action  = $_GET['action'] ?? 'list';
    $post_id = absint( $_GET['id'] ?? 0 );

    if ( $action === 'edit' && $post_id ) {
        mundula_panel_edit( $post_id );
    } else {
        mundula_panel_list();
    }
}


function mundula_panel_list() {
    global $MUNDULA_STATUSY;

    // Wyczyszczenie zaległych priorytetów dla nieaktywnych zleceń
    global $wpdb;
    $wpdb->query("
        DELETE pm FROM {$wpdb->postmeta} pm
        INNER JOIN {$wpdb->posts} p ON pm.post_id = p.ID
        INNER JOIN {$wpdb->postmeta} pm_status ON p.ID = pm_status.post_id AND pm_status.meta_key = '_status'
        WHERE p.post_type = 'mundula_zgloszenie'
          AND pm.meta_key IN ('_priorytet', '_is_urgent')
          AND pm_status.meta_value IN ('zrealizowane', 'anulowane', 'wyslane_odebrane')
    ");

    // Filtry
    $filter_status = sanitize_text_field( $_GET['filter_status'] ?? '' );
    $filter_search = sanitize_text_field( $_GET['search']        ?? '' );
    $sort_by       = sanitize_text_field( $_GET['sort']          ?? 'priorytet' );
    $saved         = isset( $_GET['saved'] );
    $hide_wyslane  = isset( $_GET['hide_wyslane'] ) ? (int)$_GET['hide_wyslane'] : 1;

    // Query
    $meta_query = [];
    if ( $filter_status ) {
        $meta_query[] = [ 'key' => '_status', 'value' => $filter_status ];
    } else {
        if ( $hide_wyslane ) {
            $meta_query[] = [
                'key'     => '_status',
                'value'   => 'wyslane_odebrane',
                'compare' => '!=',
            ];
        }
    }

    $args = [
        'post_type'              => 'mundula_zgloszenie',
        'posts_per_page'         => -1,
        'meta_query'             => $meta_query ?: [ 'relation' => 'OR' ],
        'update_post_meta_cache' => true,
    ];

    // Query - pobieramy domyślnie po dacie zgłoszenia (DESC)
    $args['orderby'] = 'date';
    $args['order']   = 'DESC';
    $posts = get_posts( $args );

    // Filtr wyszukiwania
    if ( $filter_search ) {
        $s = strtolower( $filter_search );

        // Pomocnicza funkcja normalizacji numeru telefonu (usuwa znaki nie-cyfrowe, inteligentnie obsługuje polski prefiks 48)
        $normalize_phone = function( $phone ) {
            $phone_clean = ltrim( $phone );
            $has_plus_48 = (strpos( $phone_clean, '+48' ) === 0);
            $digits = preg_replace( '/\D/', '', $phone_clean );
            if ( $has_plus_48 ) {
                if ( strpos( $digits, '48' ) === 0 ) {
                    $digits = substr( $digits, 2 );
                }
            } else {
                if ( strlen( $digits ) === 11 && strpos( $digits, '48' ) === 0 ) {
                    $digits = substr( $digits, 2 );
                }
            }
            return $digits;
        };

        $s_digits = $normalize_phone( $filter_search );

        $posts = array_filter( $posts, function( $p ) use ( $s, $s_digits, $normalize_phone ) {
            $fields = [
                get_post_meta( $p->ID, '_imie_nazwisko',  true ),
                get_post_meta( $p->ID, '_telefon',        true ),
                get_post_meta( $p->ID, '_email',          true ),
                get_post_meta( $p->ID, '_stopien',        true ),
                get_post_meta( $p->ID, '_zbiorcze_nazwisko', true ),
                get_post_meta( $p->ID, '_zbiorcze_telefon',  true ),
                get_post_meta( $p->ID, '_zbiorcze_email',    true ),
                get_post_meta( $p->ID, '_kontakt',           true ),
                $p->post_title,
            ];
            foreach ( $fields as $f ) {
                if ( strpos( strtolower( $f ), $s ) !== false ) return true;
            }
            // Szukaj po numerze
            $nr = get_post_meta( $p->ID, '_nr', true );
            if ( strpos( $nr, $s ) !== false ) return true;

            // Jeśli wyszukiwana fraza zawiera cyfry, dopasuj znormalizowany numer telefonu
            if ( $s_digits !== '' ) {
                $tels = [
                    get_post_meta( $p->ID, '_telefon', true ),
                    get_post_meta( $p->ID, '_zbiorcze_telefon', true ),
                    get_post_meta( $p->ID, '_kontakt', true ),
                ];
                foreach ( $tels as $tel ) {
                    if ( $tel ) {
                        $norm_tel = $normalize_phone( $tel );
                        if ( strpos( $norm_tel, $s_digits ) !== false ) return true;
                    }
                }
            }
            return false;
        });
    }

    // Sortowanie w PHP po przefiltrowaniu (zapobiega gubieniu wpisów bez metadanych)
    if ( $sort_by && $sort_by !== 'date' ) {
        usort( $posts, function( $a, $b ) use ( $sort_by ) {
            // Jeśli sortujemy po priorytecie, nieaktywne (zrealizowane, wysłane, anulowane) trafiają na koniec listy
            if ( $sort_by === 'priorytet' ) {
                $status_a = get_post_meta( $a->ID, '_status', true ) ?: 'rezerwacja';
                $status_b = get_post_meta( $b->ID, '_status', true ) ?: 'rezerwacja';

                $inactive_statuses = [ 'zrealizowane', 'wyslane_odebrane', 'anulowane' ];
                $is_inactive_a = in_array( $status_a, $inactive_statuses, true ) ? 1 : 0;
                $is_inactive_b = in_array( $status_b, $inactive_statuses, true ) ? 1 : 0;

                if ( $is_inactive_a !== $is_inactive_b ) {
                    return $is_inactive_a <=> $is_inactive_b; // aktywne przed nieaktywnymi
                }
            }

            // Zlecenia pilne mają zawsze pierwszeństwo w kolejce (przy sortowaniu po priorytecie i po dacie realizacji)
            if ( $sort_by === 'priorytet' || $sort_by === 'date_realizacji' ) {
                $urg_a = get_post_meta( $a->ID, '_is_urgent', true ) === '1' ? 1 : 0;
                $urg_b = get_post_meta( $b->ID, '_is_urgent', true ) === '1' ? 1 : 0;
                if ( $urg_a !== $urg_b ) {
                    return $urg_b <=> $urg_a; // 1 (pilne) przed 0 (standardowe)
                }
            }

            if ( $sort_by === 'priorytet' ) {
                $val_a = get_post_meta( $a->ID, '_priorytet', true );
                $val_b = get_post_meta( $b->ID, '_priorytet', true );

                // Jeśli oba mają ręczny priorytet
                if ( $val_a !== '' && $val_b !== '' ) {
                    return (int)$val_a <=> (int)$val_b;
                }
                // Jeśli tylko A ma ręczny priorytet
                if ( $val_a !== '' ) return -1;
                // Jeśli tylko B ma ręczny priorytet
                if ( $val_b !== '' ) return 1;

                // Jeśli żadne nie ma ręcznego priorytetu, sortuj po dacie realizacji (_data_realizacji)
                $date_a = get_post_meta( $a->ID, '_data_realizacji', true );
                $date_b = get_post_meta( $b->ID, '_data_realizacji', true );

                if ( empty( $date_a ) && empty( $date_b ) ) return 0;
                if ( empty( $date_a ) ) return 1;
                if ( empty( $date_b ) ) return -1;

                return strcmp( $date_a, $date_b );
            }

            $meta_map = [
                'date_dostawy'              => '_data_dostawy',
                'date_realizacji'           => '_data_realizacji',
                'date_przyjecia'            => '_data_przyjecia',
                'date_fizycznej_realizacji' => '_data_fizycznej_realizacji',
                'date_wydania'              => '_data_wydania',
                'date_potrzebna'            => '_data_potrzebna',
            ];

            if ( isset( $meta_map[$sort_by] ) ) {
                $meta_key = $meta_map[$sort_by];
                $val_a = get_post_meta( $a->ID, $meta_key, true );
                $val_b = get_post_meta( $b->ID, $meta_key, true );

                if ( empty( $val_a ) && empty( $val_b ) ) return 0;
                if ( empty( $val_a ) ) return 1;
                if ( empty( $val_b ) ) return -1;

                return strcmp( $val_a, $val_b );
            }

            return 0;
        });
    }

    // Parametry paginacji
    $posts_per_page = 30;
    $total_posts    = count( $posts );
    $current_page   = max( 1, (int)( $_GET['paged'] ?? 1 ) );
    $total_pages    = (int) ceil( $total_posts / $posts_per_page );
    $current_page   = min( $current_page, $total_pages ?: 1 );

    $offset         = ( $current_page - 1 ) * $posts_per_page;
    $paged_posts    = array_slice( $posts, $offset, $posts_per_page );

    $page_links = paginate_links([
        'base'      => add_query_arg( 'paged', '%#%' ),
        'format'    => '',
        'prev_text' => '&laquo;',
        'next_text' => '&raquo;',
        'total'     => $total_pages,
        'current'   => $current_page,
    ]);

    $nonce = wp_create_nonce( 'mundula_admin_nonce' );
    $ajax  = admin_url( 'admin-ajax.php' );
    ?>
    <div class="wrap" id="mundula-panel">
    <h1>📋 Panel zleceń Mundula
        <a href="<?= admin_url('admin.php?page=mundula-panel') ?>"
           class="page-title-action">Odśwież</a>
    </h1>

    <?php if ( $saved ): ?>
    <div class="notice notice-success is-dismissible"><p>✅ Zlecenie zapisane.</p></div>
    <?php endif; ?>

    <!-- FILTRY -->
    <form method="get" class="mundula-filters-form">
        <input type="hidden" name="post_type" value="mundula_zgloszenie">
        <input type="hidden" name="page" value="mundula-panel">
        <input type="hidden" name="hide_wyslane" value="<?= $hide_wyslane ?>">
        <input type="search" name="search" value="<?= esc_attr($filter_search) ?>"
               placeholder="Szukaj (nazwisko, tel, stopień, nr)..."
               style="width:260px;padding:6px 10px;border:1px solid #c3c4c7;border-radius:4px;">
        <select name="filter_status" style="padding:6px 10px;border:1px solid #c3c4c7;border-radius:4px;">
            <option value="">Status</option>
            <?php foreach ( $MUNDULA_STATUSY as $k => $v ): ?>
            <option value="<?= $k ?>" <?= selected($filter_status,$k,false) ?>><?= $v['label'] ?></option>
            <?php endforeach; ?>
        </select>
        <select name="sort" style="padding:6px 10px;border:1px solid #c3c4c7;border-radius:4px;">
            <option value="date_dostawy" <?= selected($sort_by,'date_dostawy',false) ?>>Deklarowane dostarczenie</option>
            <option value="date_realizacji" <?= selected($sort_by,'date_realizacji',false) ?>>Planowana realizacja</option>
            <option value="date_przyjecia" <?= selected($sort_by,'date_przyjecia',false) ?>>Fizyczne przyjęcie</option>
            <option value="date_fizycznej_realizacji" <?= selected($sort_by,'date_fizycznej_realizacji',false) ?>>Fizyczne wykonanie</option>
            <option value="date_wydania" <?= selected($sort_by,'date_wydania',false) ?>>Odbiór / wysyłka</option>
            <option value="date_potrzebna" <?= selected($sort_by,'date_potrzebna',false) ?>>Termin gotowości</option>
            <option value="priorytet"   <?= selected($sort_by,'priorytet',false)    ?>>Priorytet</option>
            <option value="date"        <?= selected($sort_by,'date',false)         ?>>Data zgłoszenia</option>
        </select>
        <button type="submit" class="button">Filtruj</button>
        <a href="<?= admin_url('admin.php?page=mundula-panel') ?>"
           class="button">Reset</a>
        <?php if ($hide_wyslane): ?>
            <a href="<?= esc_url(add_query_arg('hide_wyslane', 0)) ?>" class="button" style="color: #06b6d4; border-color: #06b6d4; background: #ecfeff;">
                👁️ Pokaż
            </a>
        <?php else: ?>
            <a href="<?= esc_url(remove_query_arg('hide_wyslane')) ?>" class="button" style="color: #06b6d4; border-color: #06b6d4;">
                🙈 Ukryj
            </a>
        <?php endif; ?>
    </form>

    <!-- STATYSTYKI -->
    <?php
    // Zlicz bezpośrednio z bazy - świeże dane bez cache
    $counts = [];
    foreach ( $MUNDULA_STATUSY as $k => $v ) {
        $counts[$k] = 0;
    }
    $all_posts = get_posts([
        'post_type'              => 'mundula_zgloszenie',
        'posts_per_page'         => -1,
        'post_status'            => 'publish',
        'suppress_filters'       => true,
        'no_found_rows'          => true,
        'fields'                 => 'ids',
        'update_post_meta_cache' => true,
    ]);
    foreach ( $all_posts as $pid ) {
        $st = get_post_meta( $pid, '_status', true ) ?: MUNDULA_STATUS_REZERWACJA;
        if ( isset($counts[$st]) ) {
            $counts[$st]++;
        }
    }
    ?>
    <div class="mundula-stats-container">
    <?php foreach ( $MUNDULA_STATUSY as $k => $v ): ?>
        <div class="mundula-stat-card" style="background:<?= $v['bg'] ?>;border-left:4px solid <?= $v['color'] ?>;padding:12px 16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
                <span style="font-size:13px;font-weight:600;color:#333;"><?= $v['label'] ?></span>
                <span style="font-size:20px;font-weight:700;color:<?= $v['color'] ?>;margin-left:8px;"><?= $counts[$k] ?></span>
            </div>
        </div>
    <?php endforeach; ?>
    </div>

    <!-- AKCJE MASOWE -->
    <div id="mundula-bulk-bar" style="display:none;align-items:center;gap:12px;
         padding:10px 14px;background:#fff3cd;border:1px solid #ffc107;border-radius:4px;margin-bottom:12px;">
        <span id="mundula-bulk-count" style="font-weight:600;"></span>
        <button type="button" id="mundula-bulk-delete" class="button"
                style="background:#dc2626;color:#fff;border-color:#dc2626;">
            🗑️ Usuń zaznaczone
        </button>
        <button type="button" id="mundula-bulk-cancel" class="button">Anuluj</button>
    </div>

    <!-- TABELA -->
    <?php if ( empty($posts) ): ?>
        <p style="color:#666;padding:20px 0;">Brak zleceń spełniających kryteria.</p>
    <?php else: ?>
    <div class="tablenav top" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div class="alignleft actions"></div>
        <div class="tablenav-pages" style="margin:0;">
            <span class="displaying-num"><?= $total_posts ?> zleceń</span>
            <?php if ( $page_links ): ?>
                <span class="pagination-links"><?= $page_links ?></span>
            <?php endif; ?>
        </div>
    </div>
    <div class="mundula-table-responsive">
    <table class="wp-list-table widefat striped" id="mundula-table">
        <thead>
            <tr>
                <th style="width:36px"><input type="checkbox" id="mundula-check-all" title="Zaznacz wszystkie"></th>
                <th style="width:75px">Pilne/P</th>
                <th style="width:200px">Status / Nr / Data</th>
                <th style="width:160px">Kontakt</th>
                <th style="width:130px">Dostarczenie</th>
                <th style="width:135px">Mundur / Stopień</th>
                <th>Zakres prac</th>
                <th style="width:110px">Wartość</th>
                <th style="width:110px">Opłacone</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ( $paged_posts as $p ):
            $status    = get_post_meta($p->ID,'_status',true) ?: MUNDULA_STATUS_REZERWACJA;
            $sv        = $MUNDULA_STATUSY[$status] ?? $MUNDULA_STATUSY[MUNDULA_STATUS_REZERWACJA];
            $nr        = get_post_meta($p->ID,'_nr',true) ?: '—';
            $imie      = get_post_meta($p->ID,'_imie_nazwisko',true);
            $telefon   = get_post_meta($p->ID,'_telefon',true);
            $email_v   = get_post_meta($p->ID,'_email',true);
            $kontakt_v = get_post_meta($p->ID,'_kontakt',true); // z kalkulatora
            $dostawy   = get_post_meta($p->ID,'_data_dostawy',true);
            $prio_meta = get_post_meta($p->ID,'_priorytet',true);
            $priorytet = ($prio_meta !== '') ? (int)$prio_meta : '';
            $is_urgent = get_post_meta($p->ID,'_is_urgent',true) === '1';
            $zakres_raw_temp = get_post_meta($p->ID,'_zakres_json',true);
            $zakres = json_decode( (string)$zakres_raw_temp, true ) ?: [];
            $elementy  = array_unique(array_column($zakres,'elemLabel'));
            $elementy  = array_filter($elementy, function($el) {
                return mb_strtolower(trim($el)) !== 'wysyłka';
            });
            $created   = get_the_date('d.m.Y',$p->ID);

            // Dane zamówienia zbiorczego
            $is_zbiorcze = get_post_meta($p->ID, '_zam_zbiorcze', true) === '1';
            $zbiorcze_nazwisko = get_post_meta($p->ID, '_zbiorcze_nazwisko', true);
            $wyswietlane_imie = ($is_zbiorcze && !empty($zbiorcze_nazwisko)) ? $zbiorcze_nazwisko : $imie;
        ?>
        <tr data-id="<?= $p->ID ?>" class="<?= $is_urgent ? 'mundula-row-urgent' : '' ?>">
            <td class="col-checkbox" style="text-align:center">
                <input type="checkbox" class="mundula-check-row" value="<?= $p->ID ?>">
            </td>
            <td class="col-prio" style="white-space:nowrap;text-align:center;">
                <span class="mundula-urgent-star-indicator"
                      style="font-size:16px;margin-right:6px;color:<?= $is_urgent ? '#dc2626' : '#ccc' ?>;"
                      title="<?= $is_urgent ? 'Zlecenie pilne' : 'Zlecenie standardowe' ?>">&#9733;</span>
                <input type="number" min="0" max="99" value="<?= $priorytet ?>"
                       class="mundula-priorytet"
                       style="width:36px;padding:3px;text-align:center;border:1px solid #ddd;border-radius:3px;"
                       <?= $is_urgent ? 'disabled' : '' ?>
                       title="<?= $is_urgent ? 'Zablokowane dla pilnych' : 'Priorytet (0=najwyższy)' ?>">
            </td>
            <?php
            $list_pay_status = get_post_meta($p->ID, '_payment_status', true) ?: 'nie';
            ?>
            <td data-label="Status / Nr / Data" class="mundula-pay-<?= esc_attr($list_pay_status) ?>">
                <span class="mundula-status-badge"
                      style="display:inline-block;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:600;background:<?= $sv['bg'] ?>;color:<?= $sv['color'] ?>;border:1px solid <?= $sv['color'] ?>;">
                    <?= $sv['label'] ?>
                </span>
                <?php if ( $is_urgent ): ?>
                    <span class="mundula-urgent-badge"
                          style="display:inline-block;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;background:#fee2e2;color:#dc2626;margin-left:6px;border:1px solid #fecaca;">
                        PILNE
                    </span>
                <?php endif; ?>
                <div style="font-size:12px;color:#666;margin-top:3px;">
                    <?php if($nr !== '—'): ?><strong><a href="<?= admin_url('admin.php?page=mundula-panel&action=edit&id='.$p->ID) ?>" class="mundula-list-edit-link" style="text-decoration:none;font-weight:700;color:inherit;">#<?= esc_html($nr) ?></a></strong> · <?php endif; ?>
                    <?= esc_html($created) ?>
                </div>
            </td>
            <td style="font-size:12px;vertical-align:middle;" data-label="Kontakt">
                <?php if($wyswietlane_imie): ?>
                <div style="font-size:13px;font-weight:600;margin-bottom:4px;">
                    <a href="<?= admin_url('admin.php?page=mundula-panel&action=edit&id='.$p->ID) ?>" class="mundula-list-edit-link" style="text-decoration:none;color:inherit;font-weight:600;">
                        <?= esc_html($wyswietlane_imie) ?>
                    </a>
                    <?php if ( $is_zbiorcze ): ?>
                        <span style="font-size:10px;background:#dfe1e6;color:#172b4d;padding:2px 4px;border-radius:3px;font-weight:600;margin-left:4px;vertical-align:middle;">ZBIORCZE</span>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
                <?php
                // Telefon: _telefon lub _kontakt jeśli nie jest emailem
                $tel_display = $telefon;
                if (!$tel_display && $kontakt_v && !is_email($kontakt_v)) $tel_display = $kontakt_v;
                // Email: _email lub _kontakt jeśli jest emailem
                $email_display = $email_v;
                if (!$email_display && $kontakt_v && is_email($kontakt_v)) $email_display = $kontakt_v;

                // Nadpisz kontakt danymi zlecającego jeśli to zamówienie zbiorcze
                if ( $is_zbiorcze ) {
                    $zbiorcze_tel = get_post_meta($p->ID, '_zbiorcze_telefon', true);
                    $zbiorcze_eml = get_post_meta($p->ID, '_zbiorcze_email', true);
                    if ( ! empty($zbiorcze_tel) ) $tel_display = $zbiorcze_tel;
                    if ( ! empty($zbiorcze_eml) ) $email_display = $zbiorcze_eml;
                }

                $is_trudny_klient = get_post_meta($p->ID, '_trudny_klient', true) === '1';
                if ( $is_trudny_klient ) {
                    echo '<div style="margin-bottom:4px;"><span style="display:inline-block;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;background:#dc2626;color:#fff;border:1px solid #b91c1c;" title="Trudny klient">TRUDNY KLIENT</span></div>';
                }

                if ($tel_display)   echo esc_html($tel_display);
                if ($email_display) echo '<br><span style="color:#666">'.esc_html($email_display).'</span>';

                // Oblicz łączną liczbę zleceń dla klienta (po telefonie lub e-mailu)
                $cust_orders_count = mundula_get_customer_orders_count( $tel_display, $email_display );
                if ( $cust_orders_count > 1 ) {
                    $inflected = mundula_pl_plural_zlecenie( $cust_orders_count );
                    echo '<div style="margin-top:4px;color:#dc2626;font-weight:700;font-size:11px;" title="Łączna liczba zleceń tego klienta w systemie">';
                    echo esc_html($inflected);
                    echo '</div>';
                }
                ?>
            </td>
            <td data-label="Dostarczenie">
                <?php
                $data_przyjecia = get_post_meta($p->ID, '_data_przyjecia', true);
                $data_potrzebna = get_post_meta($p->ID, '_data_potrzebna', true);

                $has_output = false;

                // Dla rezerwacji pokazujemy deklarowaną dostawę, jeśli brak rzeczywistej daty przyjęcia
                if ($status === MUNDULA_STATUS_REZERWACJA && !$data_przyjecia) {
                    $data_dostawy_temp = get_post_meta($p->ID, '_data_dostawy', true);
                    if ($data_dostawy_temp) {
                        echo '<div style="font-size:11px;color:#999;margin-bottom:1px">deklarowana:</div>';
                        echo '<span style="font-size:12px;color:#2563eb;font-weight:600">' . esc_html(mundula_format_date($data_dostawy_temp)) . '</span>';
                        $has_output = true;
                    }
                } elseif ($data_przyjecia) {
                    echo '<div style="font-size:11px;color:#999;margin-bottom:1px">przyjęto:</div>';
                    echo '<span style="font-size:12px;color:#2563eb;font-weight:600">' . esc_html(mundula_format_date($data_przyjecia)) . '</span>';
                    $has_output = true;
                }

                if ($data_potrzebna) {
                    $margin_top = $has_output ? 'margin-top:4px;' : '';
                    echo '<div style="font-size:11px;color:#999;' . $margin_top . 'margin-bottom:1px">deadline:</div>';
                    echo '<span style="font-size:12px;color:#dc2626;font-weight:600">' . esc_html(mundula_format_date($data_potrzebna)) . '</span>';
                    $has_output = true;
                }

                if (!$has_output) {
                    echo '<span style="color:#999">—</span>';
                }
                ?>
            </td>
            <td style="font-size:12px;line-height:1.4;" data-label="Mundur / Stopień">
                <?php
                $rodzaje = [
                    'wl'  => 'Wojska Lądowe',
                    'sp'  => 'Siły Powietrzne',
                    'mw'  => 'Marynarka Wojenna',
                    'sw'  => 'Służba Więzienna',
                    'sg'  => 'Straż Graniczna',
                    'psp' => 'Państwowa Straż Pożarna',
                    'inn' => 'Inne',
                ];
                $rodzaj_v  = get_post_meta( $p->ID, '_rodzaj_munduru',  true );
                $rodzaj_nazwa = $rodzaje[$rodzaj_v] ?? '';

                $stopien_v = get_post_meta($p->ID,'_stopien',true);
                if (!$stopien_v) {
                    $z_all = json_decode((string)$zakres_raw_temp,true) ?: [];
                    $stopien_v = mundula_stopien_z_rows($z_all);
                }

                if ($rodzaj_nazwa) {
                    echo '<div style="font-weight:600;color:#333;">' . esc_html($rodzaj_nazwa) . '</div>';
                } else {
                    echo '<div style="color:#999;font-style:italic;">Brak munduru</div>';
                }

                if ($stopien_v) {
                    echo '<div style="margin-top:2px;color:#666;">' . esc_html($stopien_v) . '</div>';
                } else {
                    echo '<div style="margin-top:2px;color:#999;">—</div>';
                }
                ?>
            </td>
            <td style="font-size:12px;line-height:1.4;padding-top:8px;padding-bottom:8px;" data-label="Zakres prac">
                <?php if (!empty($elementy)): ?>
                    <?php foreach ($elementy as $el): ?>
                        <div style="margin-bottom:3px;">• <?= esc_html($el) ?></div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <span style="color:#999">—</span>
                <?php endif; ?>
            </td>
            <td style="font-size:12px;vertical-align:middle;" data-label="Wartość">
                <?php
                $kwota_sza = get_post_meta($p->ID, '_kwota', true);
                $kwota_fin = get_post_meta($p->ID, '_cena_finalna', true);
                $dostawa   = get_post_meta($p->ID, '_dostawa', true) ?: 'osobisty';

                $cena_bazowa = ($kwota_fin !== '') ? (int)$kwota_fin : (int)$kwota_sza;

                if ($dostawa === 'paczkomat' || $dostawa === 'kurier') {
                    $cena_wyswietlana = ceil(($cena_bazowa * 1.23) / 5) * 5;
                    $label = 'brutto';
                    $color = '#2563eb'; // blue for gross/shipping
                } else {
                    $cena_wyswietlana = $cena_bazowa;
                    $label = 'netto';
                    $color = '#16a34a'; // green for net
                }

                if ($cena_wyswietlana > 0) {
                    echo '<div><strong style="font-size:14px;color:' . $color . ';">' . esc_html($cena_wyswietlana) . ' zł</strong>';
                    echo ' <span style="font-size:10px;color:#888;text-transform:uppercase;font-weight:600;">' . $label . '</span></div>';
                } else {
                    echo '<span style="color:#999">—</span>';
                }
                ?>
            </td>

            <td style="font-size:12px;vertical-align:middle;" data-label="Opłacone">
                <?php
                $pay_status = get_post_meta($p->ID, '_payment_status', true) ?: 'nie';
                $amount_paid = (int)get_post_meta($p->ID, '_payment_amount_paid', true);
                $has_invoice = get_post_meta($p->ID, '_payment_invoice', true) === '1';

                $invoice_icon = $has_invoice ? ' <span style="font-size:14px;vertical-align:middle;margin-left:6px;cursor:help;" title="Rachunek wystawiony">🧾</span>' : '';

                if ( $pay_status === 'tak' ) {
                    echo '<span style="color:#16a34a;font-weight:700;font-size:13px;">✅ Tak</span>' . $invoice_icon;
                } elseif ( $pay_status === 'czesciowo' ) {
                    echo '<span style="color:#d97706;font-weight:700;font-size:13px;">⏳ Częściowo</span>' . $invoice_icon;
                    echo '<div style="font-size:11px;color:#666;margin-top:2px;">Wpłacono: <strong>' . $amount_paid . ' zł</strong></div>';
                } else {
                    echo '<span style="color:#dc2626;font-weight:700;font-size:13px;">❌ Nie</span>' . $invoice_icon;
                }
                ?>
            </td>
        </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    </div>
    <div class="tablenav bottom" style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
        <div class="alignleft actions"></div>
        <div class="tablenav-pages" style="margin:0;">
            <span class="displaying-num"><?= $total_posts ?> zleceń</span>
            <?php if ( $page_links ): ?>
                <span class="pagination-links"><?= $page_links ?></span>
            <?php endif; ?>
        </div>
    </div>
    <?php endif; ?>
    </div>


    <?php
}
