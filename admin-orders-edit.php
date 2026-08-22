<?php
function mundula_save_zlecenie() {
    if ( ! isset( $_POST['mundula_nonce_zlecenie'] ) ) return;
    if ( ! wp_verify_nonce( $_POST['mundula_nonce_zlecenie'], 'mundula_save_zlecenie' ) ) return;
    if ( ! current_user_can( 'manage_options' ) ) return;

    $post_id = absint( $_POST['post_id'] ?? 0 );
    if ( ! $post_id ) return;

    // Przygotuj elementy dostarczone z ilościami
    $elementy_dostarczone_cb = (array) ( $_POST['elementy_dostarczone'] ?? [] );
    $elementy_ilosc = (array) ( $_POST['elementy_ilosc'] ?? [] );
    $elementy_zapis = [];
    foreach ( $elementy_dostarczone_cb as $k ) {
        $k = sanitize_key( $k );
        $qty = isset( $elementy_ilosc[$k] ) ? max( 1, intval( $elementy_ilosc[$k] ) ) : 1;
        $elementy_zapis[$k] = $qty;
    }

    $fields = [
        '_status'          => sanitize_text_field( $_POST['status']          ?? '' ),
        '_imie_nazwisko'   => sanitize_text_field( $_POST['imie_nazwisko']   ?? '' ),
        '_telefon'         => sanitize_text_field( $_POST['telefon']         ?? '' ),
        '_email'           => sanitize_email(      $_POST['email']           ?? '' ),
        '_dostawa'         => sanitize_text_field( $_POST['dostawa']         ?? '' ),
        '_rodzaj_munduru'  => sanitize_text_field( $_POST['rodzaj_munduru']  ?? '' ),
        '_adres'           => sanitize_textarea_field( mundula_build_adres( $_POST ) ),
        '_notatki'         => sanitize_textarea_field( $_POST['notatki']     ?? '' ),
        '_elementy_dostarczone' => json_encode( $elementy_zapis, JSON_UNESCAPED_UNICODE ),
        '_elementy_inne'        => sanitize_text_field( $_POST['elementy_inne'] ?? '' ),
        '_data_dostawy'    => mundula_parse_date( $_POST['data_dostawy']    ?? '' ),
        '_data_potrzebna'  => mundula_parse_date( $_POST['data_potrzebna']  ?? '' ),
        '_data_realizacji' => mundula_parse_date( $_POST['data_realizacji'] ?? '' ),
        '_data_wydania'             => mundula_parse_date( $_POST['data_wydania']              ?? '' ),
        '_data_przyjecia'           => mundula_parse_date( $_POST['data_przyjecia']            ?? '' ),
        '_data_fizycznej_realizacji'=> mundula_parse_date( $_POST['data_fizycznej_realizacji'] ?? '' ),
        '_cena_finalna'    => absint( $_POST['cena_finalna'] ?? 0 ),
        '_stopien'         => sanitize_text_field( $_POST['stopien']         ?? '' ),
        '_stopien_obszyty' => isset( $_POST['stopien_obszyty'] ) ? sanitize_text_field( $_POST['stopien_obszyty'] ) : get_post_meta( $post_id, '_stopien_obszyty', true ),
        '_zam_zbiorcze'      => isset($_POST['zam_zbiorcze']) ? '1' : '0',
        '_zbiorcze_nazwisko' => sanitize_text_field( $_POST['zbiorcze_nazwisko'] ?? '' ),
        '_zbiorcze_telefon'  => sanitize_text_field( $_POST['zbiorcze_telefon']  ?? '' ),
        '_zbiorcze_email'    => sanitize_email(      $_POST['zbiorcze_email']    ?? '' ),
        '_payment_status'      => sanitize_text_field( $_POST['payment_status'] ?? 'nie' ),
        '_payment_method'      => sanitize_text_field( $_POST['payment_method'] ?? '' ),
        '_payment_amount_paid' => isset($_POST['payment_amount_paid']) ? absint( $_POST['payment_amount_paid'] ) : 0,
        '_payment_date'        => mundula_parse_date( $_POST['payment_date'] ?? '' ),
        '_payment_invoice'     => isset($_POST['payment_invoice']) ? '1' : '0',
        '_wydanie_status'            => sanitize_text_field( $_POST['wydanie_status'] ?? 'calosc' ),
        '_data_wydania_czesciowego'   => mundula_parse_date( $_POST['data_wydania_czesciowego'] ?? '' ),
        '_wydano_pokrowiec'          => isset( $_POST['wydano_pokrowiec'] ) ? 'yes' : 'no',
        '_trudny_klient'             => isset( $_POST['trudny_klient'] ) ? '1' : '0',
    ];

    foreach ( $fields as $key => $val ) {
        update_post_meta( $post_id, $key, $val );
    }

    // Obsługa pilności i priorytetu
    $status = sanitize_text_field( $_POST['status'] ?? '' );
    if ( $status === 'zrealizowane' || $status === 'anulowane' || $status === 'wyslane_odebrane' ) {
        delete_post_meta( $post_id, '_priorytet' );
        delete_post_meta( $post_id, '_is_urgent' );
    } else {
        $old_is_urgent = get_post_meta( $post_id, '_is_urgent', true ) === '1';
        $new_is_urgent = isset( $_POST['is_urgent'] ) && $_POST['is_urgent'] === '1';
        
        $prio_input = isset($_POST['priorytet']) ? trim($_POST['priorytet']) : '';
        
        if ( $old_is_urgent !== $new_is_urgent ) {
            // Zmiana pilności zlecenia!
            // 1. Przesuń priorytety w dotychczasowej kolejce
            $old_prio = get_post_meta( $post_id, '_priorytet', true );
            if ( $old_prio !== '' ) {
                mundula_shift_priorities_on_change_urgency( $post_id, $old_is_urgent, (int)$old_prio );
            }
            
            // 2. Zapisz nową flagę pilności i obsłuż przywracanie priorytetu
            if ( $new_is_urgent ) {
                update_post_meta( $post_id, '_is_urgent', '1' );
                // Zapisz dotychczasowy priorytet standardowy do przywrócenia w przyszłości
                if ( $old_prio !== '' ) {
                    update_post_meta( $post_id, '_prev_standard_priority', $old_prio );
                } else {
                    delete_post_meta( $post_id, '_prev_standard_priority' );
                }
                
                // Przypisz na koniec nowej kolejki (pilnej)
                update_post_meta( $post_id, '_priorytet', mundula_get_next_priority( true, $post_id ) );
            } else {
                delete_post_meta( $post_id, '_is_urgent' );
                
                // Sprawdź, czy mamy zapisany poprzedni priorytet standardowy
                $prev_prio = get_post_meta( $post_id, '_prev_standard_priority', true );
                delete_post_meta( $post_id, '_prev_standard_priority' );
                
                if ( $prev_prio !== '' ) {
                    // Wstaw z powrotem na zapisaną pozycję
                    mundula_reorder_priorities( $post_id, (int)$prev_prio, false );
                } else {
                    // Brak poprzedniego priorytetu -> przypisz na koniec kolejki standardowej
                    update_post_meta( $post_id, '_priorytet', mundula_get_next_priority( false, $post_id ) );
                }
            }
        } else {
            // Brak zmiany pilności, po prostu zaktualizuj priorytet
            if ( $prio_input !== '' ) {
                $new_prio = absint( $prio_input );
                mundula_reorder_priorities( $post_id, $new_prio, $new_is_urgent );
            } else {
                // Jeśli pole priorytetu jest puste w formularzu:
                // Usuwamy ręczny priorytet
                $old_prio = get_post_meta( $post_id, '_priorytet', true );
                if ( $old_prio !== '' ) {
                    mundula_shift_priorities_on_change_urgency( $post_id, $new_is_urgent, (int)$old_prio );
                }
                delete_post_meta( $post_id, '_priorytet' );
            }
        }
    }

    // Zapisz edytowane pozycje zakresu
    $items = [];
    if ( isset( $_POST['zakres_items'] ) && is_array( $_POST['zakres_items'] ) ) {
        foreach ( $_POST['zakres_items'] as $item ) {
            $items[] = [
                'elemLabel' => wp_unslash( $item['elemLabel'] ?? '' ),
                'itemLabel' => wp_unslash( $item['itemLabel'] ?? '' ),
                'price'     => absint( $item['price'] ?? 0 ),
            ];
        }
        update_post_meta( $post_id, '_zakres_json', json_encode( $items, JSON_UNESCAPED_UNICODE ) );
    }

    // Zapisz wydane elementy i pozostałe elementy (tylko w przypadku wydania częściowego)
    $wydanie_status = sanitize_text_field( $_POST['wydanie_status'] ?? 'calosc' );
    if ( $wydanie_status === 'czesc' ) {
        $wydane = isset( $_POST['wydane_elementy'] ) && is_array( $_POST['wydane_elementy'] ) ? array_map( 'sanitize_text_field', $_POST['wydane_elementy'] ) : [];
        update_post_meta( $post_id, '_wydane_elementy', $wydane );

        // Wylicz pozostałe elementy do wydania na bazie zakresu prac
        $pozostaje = [];
        $unique_elems = [];
        foreach ( $items as $item ) {
            $elem = trim( sanitize_text_field( $item['elemLabel'] ?? '' ) );
            if ( $elem && ! in_array( $elem, $unique_elems ) ) {
                $unique_elems[] = $elem;
            }
        }
        foreach ( $unique_elems as $elem ) {
            if ( ! in_array( $elem, $wydane ) ) {
                $pozostaje[] = $elem;
            }
        }
        update_post_meta( $post_id, '_pozostaje_do_wydania', $pozostaje );
    } else {
        update_post_meta( $post_id, '_wydane_elementy', [] );
        update_post_meta( $post_id, '_pozostaje_do_wydania', [] );
    }

    // Odbierz i zapisz prywatne zdjęcia
    if ( ! empty( $_FILES['mundula_photos']['name'][0] ) ) {
        $upload_dir = WP_CONTENT_DIR . '/uploads/mundula-private/';
        if ( ! file_exists( $upload_dir ) ) {
            wp_mkdir_p( $upload_dir );
            $htaccess_content = "Order deny,allow
Deny from all
Require all denied
";
            file_put_contents( $upload_dir . '.htaccess', $htaccess_content );
        }
        
        $existing_photos = get_post_meta( $post_id, '_mundula_photos', true );
        if ( ! is_array( $existing_photos ) ) {
            $existing_photos = [];
        }
        
        $files = $_FILES['mundula_photos'];
        $count = count( $files['name'] );
        
        for ( $i = 0; $i < $count; $i++ ) {
            if ( $files['error'][$i] === UPLOAD_ERR_OK ) {
                $tmp_name = $files['tmp_name'][$i];
                $original_name = sanitize_file_name( $files['name'][$i] );
                $ext = pathinfo( $original_name, PATHINFO_EXTENSION );
                
                $new_filename = 'photo_' . $post_id . '_' . wp_generate_password( 12, false ) . '.' . $ext;
                $destination = $upload_dir . $new_filename;
                
                if ( move_uploaded_file( $tmp_name, $destination ) ) {
                    $existing_photos[] = [
                        'file' => $new_filename,
                        'name' => $original_name,
                        'date' => current_time( 'mysql' )
                    ];
                }
            }
        }
        
        update_post_meta( $post_id, '_mundula_photos', $existing_photos );
    }

    wp_redirect( admin_url( 'admin.php?page=mundula-panel&action=edit&saved=1&id=' . $post_id ) );
    exit;
}
add_action( 'admin_post_mundula_save_zlecenie', 'mundula_save_zlecenie' );
add_action( 'admin_post_mundula_view_photo', 'mundula_view_photo_handler' );
add_action( 'admin_post_mundula_delete_photo', 'mundula_delete_photo_handler' );

function mundula_panel_edit( $post_id ) {
    global $MUNDULA_STATUSY;
    if ( ! current_user_can( 'manage_options' ) ) return;

    $p = get_post( $post_id );
    if ( ! $p || $p->post_type !== 'mundula_zgloszenie' ) {
        echo '<div class="wrap"><p>Nie znaleziono zlecenia.</p></div>'; return;
    }

    // Pobierz meta
    $m = [];
    foreach ([
        '_status','_nr','_imie_nazwisko','_telefon','_email','_kontakt','_data_potrzebna',
        '_dostawa','_adres','_notatki','_data_dostawy','_data_realizacji',
        '_data_wydania','_cena_finalna','_priorytet','_is_urgent','_stopien','_stopien_obszyty','_kwota',
        '_zakres_json','_ip_hash', '_zam_zbiorcze', '_zbiorcze_nazwisko', '_zbiorcze_telefon', '_zbiorcze_email', '_payment_status', '_payment_method', '_payment_amount_paid', '_payment_date', '_payment_invoice', '_trudny_klient'
    ] as $key ) {
        $m[$key] = get_post_meta($post_id,$key,true);
    }

    $status    = $m['_status'] ?: MUNDULA_STATUS_REZERWACJA;
    $sv        = $MUNDULA_STATUSY[$status] ?? $MUNDULA_STATUSY[MUNDULA_STATUS_REZERWACJA];
    $zakres    = json_decode( (string)($m['_zakres_json'] ?: '[]'), true ) ?: [];

    // Wyciągnij stopień z zakresu prac jeśli nie zapisany
    $stopien_nowy_meta = $m['_stopien'] ?: '';
    $stopien_obszyty_meta = $m['_stopien_obszyty'] ?: '';
    if ( ( ! $stopien_nowy_meta || ! $stopien_obszyty_meta ) && ! empty($zakres) ) {
        $extracted_fallback = mundula_extract_stopnie( $zakres );
        if ( ! $stopien_nowy_meta ) {
            $m['_stopien'] = $extracted_fallback['nowy'];
        }
        if ( ! $stopien_obszyty_meta ) {
            $m['_stopien_obszyty'] = $extracted_fallback['obszyty'];
        }
    }
    $created   = get_the_date('d.m.Y H:i',$post_id);

    mundula_render_edit_header( $m, $sv );
    ?>
    <form method="post" action="<?= admin_url('admin-post.php') ?>" enctype="multipart/form-data">
        <?php wp_nonce_field('mundula_save_zlecenie','mundula_nonce_zlecenie'); ?>
        <input type="hidden" name="action"  value="mundula_save_zlecenie">
        <input type="hidden" name="post_id" value="<?= $post_id ?>">

        <div class="mundula-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px;align-items:start;">
            <!-- KOLUMNA LEWA -->
            <div>
                <?php
                mundula_render_edit_metabox_order( $post_id, $status, $m, $sv );
                mundula_render_edit_metabox_dates( $post_id, $created, $m );
                mundula_render_edit_metabox_customer( $m );
                mundula_render_edit_metabox_delivery( $post_id, $m );
                ?>
            </div>
            <!-- KOLUMNA PRAWA -->
            <div>
                <?php
                mundula_render_edit_metabox_zakres_prac( $post_id, $zakres, $m );
                mundula_render_edit_metabox_notes( $m );
                mundula_render_edit_metabox_photos( $post_id );
                ?>
            </div>
        </div>
        <?php mundula_render_edit_actions(); ?>
    </form>
    </div>
    <?php
}

function mundula_render_edit_header( $m, $sv ) {
    ?>
    <div class="wrap" id="mundula-edit">
    <h1>
        <a href="<?= admin_url('admin.php?page=mundula-panel') ?>">← Panel zleceń</a>
        &nbsp;/&nbsp; Zlecenie <?= $m['_nr'] ? '#'.esc_html($m['_nr']) : '' ?>
        <span style="display:inline-block;padding:4px 12px;border-radius:12px;font-size:13px;font-weight:600;
                     background:<?= $sv['bg'] ?>;color:<?= $sv['color'] ?>;border:1px solid <?= $sv['color'] ?>;
                     margin-left:12px;vertical-align:middle;">
            <?= $sv['label'] ?>
        </span>
    </h1>

    <?php if ( isset($_GET['saved']) ): ?>
    <div class="notice notice-success is-dismissible" style="margin-left:0; margin-right:0;"><p>✅ Zlecenie zapisane.</p></div>
    <?php endif;
}

function mundula_render_edit_metabox_order( $post_id, $status, $m, $sv ) {
    global $MUNDULA_STATUSY;
    ?>
    <!-- ZLECENIE -->
    <div class="postbox">
        <div class="postbox-header"><h2>Zlecenie</h2></div>
        <div class="inside" style="padding:16px;">
            <table class="form-table" style="margin:0 0 16px 0">
                <tr>
                    <th style="width:200px">Numer rezerwacji / zlecenia</th>
                    <td>
                        <?php if($m['_nr']): ?>
                            <strong style="font-size:16px;">#<?= esc_html($m['_nr']) ?></strong>
                        <?php else: ?>
                            <span style="color:#999">—</span>
                        <?php endif; ?>
                    </td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>
                        <select name="status" style="width:100%">
                            <?php foreach($MUNDULA_STATUSY as $k=>$v): ?>
                            <option value="<?= $k ?>" <?= selected($status,$k,false) ?>><?= $v['label'] ?></option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Zlecenie pilne</th>
                    <td>
                        <label>
                            <input type="checkbox" name="is_urgent" id="is-urgent-cb" value="1" <?= checked($m['_is_urgent'],'1',false) ?>>
                            <span style="color:#dc2626;font-weight:600;">Usługa Expres</span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th>Priorytet</th>
                    <td><input type="number" name="priorytet" value="<?= $m['_priorytet'] !== '' ? esc_attr($m['_priorytet']) : '' ?>"
                               min="0" max="99" style="width:80px"> <small style="color:#666">(0 = najwyższy, zostaw puste dla kolejki domyślnej)</small></td>
                </tr>
                <tr>
                    <th>Status płatności</th>
                    <td>
                        <?php $pay_status = $m['_payment_status'] ?: 'nie'; ?>
                        <select name="payment_status" id="payment-status-select" style="width:100%">
                            <option value="nie" <?= selected($pay_status, 'nie', false) ?>>Nieopłacone</option>
                            <option value="czesciowo" <?= selected($pay_status, 'czesciowo', false) ?>>Opłacone częściowo</option>
                            <option value="tak" <?= selected($pay_status, 'tak', false) ?>>Opłacone w całości</option>
                        </select>
                    </td>
                </tr>
                <tr id="payment-amount-row" style="display: <?= $pay_status === 'czesciowo' ? 'table-row' : 'none' ?>;">
                    <th>Wpłacona kwota</th>
                    <td>
                        <input type="number" name="payment_amount_paid" id="payment-amount-paid-input" 
                               value="<?= esc_attr($m['_payment_amount_paid'] ?: 0) ?>" min="0" style="width:120px"> <strong>zł</strong>
                    </td>
                </tr>
                <tr id="payment-method-row" style="display: <?= ($pay_status === 'czesciowo' || $pay_status === 'tak') ? 'table-row' : 'none' ?>;">
                    <th>Forma płatności</th>
                    <td>
                        <?php $pay_method = $m['_payment_method'] ?: ''; ?>
                        <select name="payment_method" id="payment-method-select" style="width:100%">
                            <option value="" <?= selected($pay_method, '', false) ?>>— Wybierz —</option>
                            <option value="gotowka" <?= selected($pay_method, 'gotowka', false) ?>>Gotówka</option>
                            <option value="przelew" <?= selected($pay_method, 'przelew', false) ?>>Przelew</option>
                            <option value="blik" <?= selected($pay_method, 'blik', false) ?>>BLIK</option>
                        </select>
                    </td>
                </tr>
                <?php 
                $show_extra = ($pay_status === 'czesciowo' || $pay_status === 'tak') && ($pay_method === 'blik' || $pay_method === 'przelew');
                ?>
                <tr id="payment-date-row" style="display: <?= $show_extra ? 'table-row' : 'none' ?>;">
                    <th>Data wpłaty</th>
                    <td>
                        <input type="date" name="payment_date" value="<?= esc_attr($m['_payment_date'] ? substr($m['_payment_date'], 0, 10) : '') ?>" style="width:220px;border:1px solid #ddd;padding:4px 6px;border-radius:4px;font-size:13px;">
                    </td>
                </tr>
                <tr id="payment-invoice-row" style="display: <?= $show_extra ? 'table-row' : 'none' ?>;">
                    <th>Rachunek wystawiony</th>
                    <td>
                        <label>
                            <input type="checkbox" name="payment_invoice" value="1" <?= checked($m['_payment_invoice'] ?? '', '1', false) ?>>
                            Tak
                        </label>
                    </td>
                </tr>
                <tr id="payment-remaining-row" style="display: <?= $pay_status === 'czesciowo' ? 'table-row' : 'none' ?>;">
                    <th>Pozostaje do zapłaty</th>
                    <td>
                        <strong id="payment-remaining-display" style="font-size:16px; color:#b45309;">0 zł</strong>
                    </td>
                </tr>
            </table>
                        
            <?php if ( $status === MUNDULA_STATUS_REZERWACJA || $status === MUNDULA_STATUS_ZLECENIE ):
                $pot_data  = get_post_meta($post_id,'_potwierdzenie_wyslane',true);
                $has_email = !empty(get_post_meta($post_id,'_email',true));
            ?>
            <div style="padding:12px 14px;background:#f5f3ff;border-left:3px solid #7c3aed;border-radius:4px;margin-bottom:16px;">
                <?php if ( $pot_data && $pot_data !== 'blad' && $pot_data !== 'tylko_telefon' ): ?>
                    <span style="color:#16a34a;font-weight:600;">✅ Potwierdzenie wysłane <?= esc_html($pot_data) ?></span>
                    <button type="button" class="button button-small mundula-potwierdz"
                            data-id="<?= $post_id ?>" style="margin-left:10px;">🔁 Wyślij ponownie</button>
                <?php elseif ($pot_data === 'blad'): ?>
                    <span style="color:#dc2626;font-weight:600;">⚠️ Poprzedni mail nie dotarł.</span>
                    <button type="button" class="button button-small mundula-potwierdz"
                            data-id="<?= $post_id ?>"
                            style="margin-left:10px;background:#7c3aed;color:#fff;border-color:#7c3aed;">
                        ✅ Wyślij ponownie
                    </button>
                <?php elseif ($has_email): ?>
                    <div style="font-size:13px;color:#555;margin-bottom:8px;">
                        Zapisz datę planowanej realizacji i potwierdź dostarczenie — wyślemy mail do klienta.
                    </div>
                    <button type="button" class="button mundula-potwierdz"
                            data-id="<?= $post_id ?>"
                            style="background:#7c3aed;color:#fff;border-color:#7c3aed;">
                        Potwierdź dostarczenie i wyślij mail
                    </button>
                <?php else: ?>
                    <div style="font-size:13px;color:#555;margin-bottom:8px;">
                        Brak adresu email — powiadom klienta telefonicznie.
                    </div>
                    <button type="button" class="button mundula-potwierdz"
                            data-id="<?= $post_id ?>">
                        ✅ Zmień status na Dostarczone
                    </button>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- Wycena e-mail -->
            <?php $wycena_email = get_post_meta($post_id,'_wycena_wyslana',true); ?>
            <div style="padding:8px 12px;background:#f9f9f9;border-radius:4px;font-size:13px;">
                <strong>Wycena e-mail:</strong>&nbsp;
                <?php if ($wycena_email): ?>
                    <span style="color:#16a34a;">✅ Wysłana na <?= esc_html($wycena_email) ?></span>
                <?php elseif (!empty(get_post_meta($post_id,'_email',true))): ?>
                    <span style="color:#e2ae61;">⚠️ Nie wysłana</span>
                <?php else: ?>
                    <span style="color:#999;">— brak emaila</span>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php
}

function mundula_render_edit_metabox_dates( $post_id, $created, $m ) {
    ?>
    <!-- DATY REALIZACJI -->
    <div class="postbox" style="margin-top:16px">
        <div class="postbox-header"><h2>Daty realizacji</h2></div>
        <div class="inside" style="padding:16px;">
            <table class="form-table" style="margin:0">
                <!-- 1. Data zgłoszenia -->
                <tr>
                    <th style="width:200px">Data zgłoszenia</th>
                    <td><strong><?= esc_html($created) ?></strong></td>
                </tr>
                <!-- 2. Deklarowana data dostarczenia -->
                <tr>
                    <th>Deklarowana data dostarczenia</th>
                    <td>
                        <?php $dd = $m['_data_dostawy']; ?>
                        <strong><?= $dd ? esc_html(mundula_format_date($dd)) : '<span style="color:#999">—</span>' ?></strong>
                        <input type="hidden" name="data_dostawy" value="<?= esc_attr($dd) ?>">
                    </td>
                </tr>
                <!-- 3. Krytyczna data gotowości -->
                <tr>
                    <th>Krytyczna data gotowości</th>
                    <td>
                        <?php 
                        $dg = $m['_data_potrzebna'];
                        $is_urgent = $m['_is_urgent'] === '1';
                        
                        $dg_date_value = '';
                        if ($dg) {
                            $parsed_dg = mundula_parse_date($dg);
                            if ($parsed_dg) {
                                $dg_date_value = substr($parsed_dg, 0, 10);
                            }
                        }
                        ?>
                        <div id="data-potrzebna-readonly-container" style="display: <?= $is_urgent ? 'none' : 'block' ?>;">
                            <strong><?= $dg ? esc_html(mundula_format_date($dg)) : '<span style="color:#999">—</span>' ?></strong>
                            <input type="hidden" id="data-potrzebna-hidden" name="<?= $is_urgent ? 'data_potrzebna_static' : 'data_potrzebna' ?>" value="<?= esc_attr($dg) ?>">
                        </div>
                        <div id="data-potrzebna-editable-container" style="display: <?= $is_urgent ? 'block' : 'none' ?>;">
                            <input type="date" id="data-potrzebna-input" name="<?= $is_urgent ? 'data_potrzebna' : 'data_potrzebna_urgent' ?>" value="<?= esc_attr($dg_date_value) ?>" style="width:220px;border:1px solid #ddd;padding:4px 6px;border-radius:4px;font-size:13px;">
                        </div>
                    </td>
                </tr>
                <!-- 4. Data przyjęcia munduru -->
                <tr>
                    <th>Data przyjęcia munduru</th>
                    <td>
                        <input type="date" name="data_przyjecia"
                               value="<?= esc_attr(mundula_format_date_input(get_post_meta($post_id,'_data_przyjecia',true))) ?>"
                               style="width:220px">
                        <small style="color:#666;margin-left:8px">fizyczna data dostarczenia</small>
                    </td>
                </tr>
                <!-- 5. Data planowanej realizacji -->
                <tr>
                    <th>Data planowanej realizacji</th>
                    <td>
                        <input type="date" name="data_realizacji"
                               value="<?= esc_attr(mundula_format_date_input($m['_data_realizacji'])) ?>" style="width:220px">
                    </td>
                </tr>
                <!-- 6. Data realizacji -->
                <tr>
                    <th>Data realizacji</th>
                    <td>
                        <input type="date" name="data_fizycznej_realizacji"
                               value="<?= esc_attr(mundula_format_date_input(get_post_meta($post_id,'_data_fizycznej_realizacji',true))) ?>"
                               style="width:220px">
                        <small style="color:#666;margin-left:8px">fizyczna data wykonania</small>
                    </td>
                </tr>
                <!-- 7. Data odbioru / wysyłki -->
                <tr>
                    <th>Data odbioru / wysyłki</th>
                    <td>
                        <input type="date" name="data_wydania"
                               value="<?= esc_attr(mundula_format_date_input($m['_data_wydania'])) ?>"
                               style="width:220px">
                        <small style="color:#666;margin-left:8px">fizyczna data wydania</small>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <?php
}

function mundula_render_edit_metabox_customer( $m ) {
    ?>
    <!-- DANE KONTAKTOWE -->
    <div class="postbox" style="margin-top:16px">
        <div class="postbox-header"><h2>Dane kontaktowe</h2></div>
        <div class="inside" style="padding:16px;">
            <label style="font-weight:600; display:inline-block; margin-bottom:12px; cursor:pointer; margin-right: 20px;">
                <input type="checkbox" name="zam_zbiorcze" id="zam-zbiorcze-cb" value="1" <?= checked($m['_zam_zbiorcze'], '1', false) ?>>
                To jest zamówienie zbiorcze (dostarczający to inna osoba)
            </label>
            <label style="font-weight:600; display:inline-block; margin-bottom:12px; cursor:pointer; color: #dc2626;">
                <input type="checkbox" name="trudny_klient" value="1" <?= checked($m['_trudny_klient'], '1', false) ?>>
                ⚠️ Trudny klient
            </label>
            
            <div id="zbiorcze-fields-container" style="display: <?= $m['_zam_zbiorcze'] === '1' ? 'block' : 'none' ?>; border-top: 1px solid #eee; padding-top: 12px; margin-top: 8px; margin-bottom: 16px;">
                <table class="form-table" style="margin:0">
                    <tr>
                        <th style="width:140px">Imię i nazwisko zlecającego</th>
                        <td><input type="text" name="zbiorcze_nazwisko"
                                   value="<?= esc_attr($m['_zbiorcze_nazwisko']) ?>" class="regular-text" style="width:100%"></td>
                    </tr>
                    <tr>
                        <th>Telefon zlecającego</th>
                        <td><input type="text" name="zbiorcze_telefon"
                                   value="<?= esc_attr($m['_zbiorcze_telefon']) ?>" class="regular-text" style="width:100%"></td>
                    </tr>
                    <tr>
                        <th>E-mail zlecającego</th>
                        <td><input type="email" name="zbiorcze_email"
                                   value="<?= esc_attr($m['_zbiorcze_email']) ?>" class="regular-text" style="width:100%"></td>
                    </tr>
                </table>
            </div>

            <table class="form-table" style="margin:0">
                <tr>
                    <th style="width:140px">Imię i nazwisko</th>
                    <td><input type="text" name="imie_nazwisko"
                               value="<?= esc_attr($m['_imie_nazwisko']) ?>" class="regular-text" style="width:100%"></td>
                </tr>
                <tr>
                    <th>Telefon</th>
                    <td>
                        <?php
                        $tel = $m['_telefon'];
                        if ( ! $tel ) {
                            $k = $m['_kontakt'] ?? '';
                            $tel = ( $k && ! is_email($k) ) ? $k : '';
                        }
                        ?>
                        <input type="text" name="telefon"
                               value="<?= esc_attr($tel) ?>" class="regular-text" style="width:100%">
                    </td>
                </tr>
                <tr>
                    <th>E-mail</th>
                    <td>
                        <?php
                        $eml = $m['_email'];
                        if ( ! $eml ) {
                            $k = $m['_kontakt'] ?? '';
                            $eml = ( $k && is_email($k) ) ? $k : '';
                        }
                        ?>
                        <input type="email" name="email"
                               value="<?= esc_attr($eml) ?>" class="regular-text" style="width:100%">
                    </td>
                </tr>
            </table>
            
            <!-- Kopiowanie etykiety P15 -->
            <div style="margin-top:16px; padding-top:12px; border-top:1px solid #eee; display:flex; justify-content:flex-end;">
                <button type="button" id="mundula-copy-label-edit-btn" class="button" style="background:#0f766e;color:#fff;border-color:#0f766e;">
                    📋 Kopiuj etykietę P15
                </button>
            </div>
        </div>
    </div>
    <?php
}

function mundula_render_edit_metabox_delivery( $post_id, $m ) {
    $adres_lines = explode("\n", $m['_adres'] ?? '');
    $adres_imnaz = $adres_lines[0] ?? '';
    $adres_ulica = $adres_lines[1] ?? '';
    $adres_kod   = $adres_lines[2] ?? '';
    $adres_miasto= $adres_lines[3] ?? '';
    $adres_paczk = $adres_lines[0] ?? '';

    $wydanie_status = get_post_meta($post_id, '_wydanie_status', true) ?: 'calosc';
    $data_wydania_czesciowego = get_post_meta($post_id, '_data_wydania_czesciowego', true) ?: '';
    $wydane_elementy = get_post_meta($post_id, '_wydane_elementy', true) ?: [];
    if (!is_array($wydane_elementy)) {
        $wydane_elementy = $wydane_elementy ? explode(',', $wydane_elementy) : [];
    }
    ?>
    <!-- DOSTAWA / ODBIÓR -->
    <div class="postbox" style="margin-top:16px">
        <div class="postbox-header"><h2>Dostawa / Odbiór</h2></div>
        <div class="inside" style="padding:16px;">
            <table class="form-table" style="margin:0">
                <tr>
                    <th style="width:140px">Sposób dostawy</th>
                    <td>
                        <select name="dostawa" id="dostawa-select" style="width:100%">
                            <option value="osobisty"  <?= selected($m['_dostawa'],'osobisty',false)  ?>>Odbiór osobisty</option>
                            <option value="paczkomat" <?= selected($m['_dostawa'],'paczkomat',false) ?>>Paczkomat</option>
                            <option value="kurier"    <?= selected($m['_dostawa'],'kurier',false)    ?>>Kurier</option>
                        </select>
                    </td>
                </tr>
            </table>

            <!-- Paczkomat -->
            <div id="dostawa-paczkomat" style="margin-top:12px;display:<?= $m['_dostawa']==='paczkomat' ? 'block' : 'none' ?>">
                <table class="form-table" style="margin:0">
                    <tr>
                        <th style="width:140px">Numer paczkomatu</th>
                        <td><input type="text" name="adres_paczkomat"
                                   value="<?= esc_attr($adres_paczk) ?>"
                                   placeholder="np. WAW123M"
                                   class="regular-text" style="width:100%;font-size:16px;font-weight:600;letter-spacing:.05em"></td>
                    </tr>
                </table>
            </div>

            <!-- Kurier -->
            <div id="dostawa-kurier" style="margin-top:12px;display:<?= $m['_dostawa']==='kurier' ? 'block' : 'none' ?>">
                <table class="form-table" style="margin:0">
                    <tr>
                        <th style="width:140px">Imię i nazwisko</th>
                        <td><input type="text" name="adres_imnaz"
                                   value="<?= esc_attr($adres_imnaz) ?>"
                                   class="regular-text" style="width:100%"></td>
                    </tr>
                    <tr>
                        <th>Ulica i numer</th>
                        <td><input type="text" name="adres_ulica"
                                   value="<?= esc_attr($adres_ulica) ?>"
                                   class="regular-text" style="width:100%"></td>
                    </tr>
                    <tr>
                        <th>Kod pocztowy</th>
                        <td><input type="text" name="adres_kod"
                                   value="<?= esc_attr($adres_kod) ?>"
                                   placeholder="00-000"
                                   style="width:120px"></td>
                    </tr>
                    <tr>
                        <th>Miasto</th>
                        <td><input type="text" name="adres_miasto"
                                   value="<?= esc_attr($adres_miasto) ?>"
                                   class="regular-text" style="width:100%"></td>
                    </tr>
                </table>
            </div>

            <!-- STAN WYDANIA / WYSYŁKI -->
            <div id="dostawa-status-wydania" style="margin-top:16px; border-top:1px solid #eee; padding-top:16px;">
                <table class="form-table" style="margin:0">
                    <tr>
                        <th style="width:140px">Stan wydania / wysyłki</th>
                        <td>
                            <select name="wydanie_status" id="wydanie-status-select" style="width:100%">
                                <option value="calosc" <?= selected($wydanie_status, 'calosc', false) ?>>Wydano / wysłano w całości</option>
                                <option value="czesc" <?= selected($wydanie_status, 'czesc', false) ?>>Wydano / wysłano w części</option>
                            </select>
                        </td>
                    </tr>
                    
                    <tr class="sekcja-wydanie-czesciowe" style="display: <?= $wydanie_status === 'czesc' ? 'table-row' : 'none' ?>">
                        <th>Data częściowego wydania / wysyłki</th>
                        <td>
                            <input type="date" name="data_wydania_czesciowego" value="<?= esc_attr($data_wydania_czesciowego) ?>" style="width:100%">
                        </td>
                    </tr>
                    
                    <tr class="sekcja-wydanie-czesciowe" style="display: <?= $wydanie_status === 'czesc' ? 'table-row' : 'none' ?>">
                        <th>Wydane / wysłane elementy</th>
                        <td>
                            <div id="wydane-elementy-container" data-selected="<?= esc_attr(json_encode($wydane_elementy)) ?>">
                                <select id="wydane-elementy-add-select" style="width:100%">
                                    <option value="">— Wybierz element do wydania —</option>
                                </select>
                                <div id="wydane-elementy-tagi" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px;"></div>
                                <div id="wydane-elementy-hidden-inputs"></div>
                            </div>
                        </td>
                    </tr>
                    
                    <tr class="sekcja-wydanie-czesciowe" style="display: <?= $wydanie_status === 'czesc' ? 'table-row' : 'none' ?>">
                        <th>Pozostaje do wydania / wysyłki</th>
                        <td>
                            <div id="pozostaje-do-wydania-wrapper" style="padding:10px; background:#fffbeb; border-left:4px solid #d97706; border-radius:4px; color:#b45309; font-weight:500;">
                                <span id="pozostaje-do-wydania-lista">Wczytywanie...</span>
                            </div>
                        </td>
                    </tr>
                    
                    <?php
                    $wydano_pokrowiec = get_post_meta($post_id, '_wydano_pokrowiec', true) === 'yes';
                    ?>
                    <tr>
                        <th>Pokrowiec</th>
                        <td>
                            <label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;user-select:none;">
                                <input type="checkbox" name="wydano_pokrowiec" value="yes" <?= $wydano_pokrowiec ? 'checked' : '' ?>>
                                <span style="font-size:13px;font-weight:600;color:#2c3338;">Wydano pokrowiec</span>
                            </label>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <?php
}

function mundula_render_edit_metabox_notes( $m ) {
    ?>
    <!-- NOTATKI -->
    <div class="postbox" style="margin-top:16px">
        <div class="postbox-header"><h2>Notatki</h2></div>
        <div class="inside" style="padding:16px;">
            <textarea name="notatki" rows="4" style="width:100%"><?= esc_textarea($m['_notatki']) ?></textarea>
        </div>
    </div>
    <?php
}

function mundula_render_edit_metabox_elementy_dostarczone( $post_id, $zakres ) {
    ?>
    <!-- Elementy dostarczone -->
    <div style="margin-bottom:16px;" id="elementy-dostarczone">
        <div style="font-size:12px;font-weight:600;text-transform:uppercase;
                    letter-spacing:.05em;color:#666;margin-bottom:8px;">
            Elementy dostarczone do obszycia
        </div>
        <?php
        $el_saved_raw = get_post_meta($post_id,'_elementy_dostarczone',true);
        if ( is_array( $el_saved_raw ) ) {
            $el_saved = $el_saved_raw;
        } else {
            $el_saved = json_decode( (string)$el_saved_raw ?: '[]', true );
        }
        if ( ! is_array( $el_saved ) ) {
            $el_saved = [];
        }

        $key_mapping = [
            'marynarka_wyj'  => 'marynarka_munduru_wyjsciowego',
            'marynarka_gal'  => 'marynarka_munduru_galowego',
            'beret_w'        => 'beret_munduru_galowego_wyjsciowego',
            'beret_g'        => 'beret_munduru_galowego_wyjsciowego',
            'czapka_rog'     => 'czapka_rogatywka',
            'czapka_gar'     => 'czapka_garnizonowa',
            'furazera'       => 'furazerka',
            'kapelusz'       => 'kapelusz_podhalanski_huculski',
            'otok_czysty'    => 'otok',
            'otok_obszyty'   => 'otok',
            'orzel_flaga'    => 'orzel_flaga',
            'ozn_rodzaju'    => 'oznaka_rozpoznawcza',
            'korpusowki'     => 'korpusowki',
            'nasz_nagl'      => 'naszywki',
            'pagony'         => 'naramienniki_koszuli',
            'identyfikator'  => 'identyfikator',
            'proporczyk'     => 'proporczyk',
            'baretka'        => 'baretki',
        ];

        $el_checked = [];
        $el_quantities = [];
        foreach ( $el_saved as $key => $val ) {
            $mapped_key = is_string( $key ) ? ($key_mapping[$key] ?? $key) : (string)$val;
            if ( ! in_array( $mapped_key, $el_checked, true ) ) {
                $el_checked[] = $mapped_key;
            }
            $qty = is_string( $key ) ? intval( $val ) : 1;
            $el_quantities[$mapped_key] = ($el_quantities[$mapped_key] ?? 0) + $qty;
        }

        $el_obszywane = [
            'marynarka_munduru_galowego'          => 'Marynarka munduru galowego',
            'marynarka_munduru_wyjsciowego'       => 'Marynarka munduru wyjściowego',
            'plaszcz'                             => 'Płaszcz',
            'beret_munduru_galowego_wyjsciowego' => 'Beret munduru galowego / wyjściowego',
            'beret_munduru_polowego'              => 'Beret munduru polowego',
            'czapka_rogatywka'                    => 'Czapka rogatywka',
            'czapka_garnizonowa'                  => 'Czapka garnizonowa',
            'furazerka'                           => 'Furażerka',
            'kapelusz_podhalanski_huculski'       => 'Kapelusz Podhalański / Huculski',
            'naramienniki_koszuli'                => 'Naramienniki koszuli',
            'otok'                                => 'Otok',
        ];

        $el_naszywane = [
            'baretki'             => 'Baretki',
            'oznaka_rozpoznawcza' => 'Oznaka rozpoznawcza',
            'orzel_flaga'         => 'Orzełek / Flaga',
            'naszywki'            => 'Naszywki',
            'korpusowki'          => 'Korpusówki',
            'proporczyk'          => 'Proporczyk',
            'identyfikator'       => 'Identyfikator',
            'inne'                => 'Inne',
        ];

        $render_items = function($opcje) use ($el_checked, $el_quantities) {
            foreach ($opcje as $k => $v):
                $checked = in_array($k, $el_checked, true);
                $qty = $el_quantities[$k] ?? 1;
            ?>
            <div class="elementy-dostarczone-item" style="display:flex;align-items:center;gap:5px;">
                <label style="display:flex;align-items:center;gap:5px;padding:5px 10px;
                               border:1px solid #<?= $checked ? '2563eb' : 'ddd' ?>;
                               border-radius:4px;cursor:pointer;font-size:13px;
                               background:<?= $checked ? '#eff6ff' : '#fff' ?>;
                               user-select:none; opacity: <?= $checked ? '1' : '0.6' ?>;"
                       class="elementy-dostarczone-lbl">
                    <input type="checkbox" name="elementy_dostarczone[]"
                           value="<?= $k ?>" <?= $checked ? 'checked' : '' ?>
                           class="elementy-dostarczone-cb"
                           style="margin:0">
                    <span class="el-label-text"><?= esc_html($v) ?></span>
                    <span class="el-qty-badge" style="font-weight:bold;color:#2563eb;margin-left:4px;<?= ($checked && $qty > 1) ? '' : 'display:none;' ?>">(x<?= $qty ?>)</span>
                </label>
                <input type="number" name="elementy_ilosc[<?= $k ?>]"
                       value="<?= esc_attr($qty) ?>" min="1"
                       style="width:55px;padding:3px;font-size:12px;border:1px solid #ddd;border-radius:4px;display:none;"
                       class="elementy-dostarczone-qty"
                       placeholder="ilość">
            </div>
            <?php
            endforeach;
        };
        ?>

        <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-top:6px;margin-bottom:6px;">
            👕 Elementy munduru (obszywane)
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;" id="elementy-obszywane">
            <?php $render_items($el_obszywane); ?>
        </div>

        <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-top:6px;margin-bottom:6px;">
            🏷️ Dodatki / Insygnia (naszywane)
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;" id="elementy-naszywane">
            <?php $render_items($el_naszywane); ?>
        </div>

        <div style="margin-top:8px;">
            <label style="font-size:12px;color:#666">Inne (opis):&nbsp;</label>
            <input type="text" name="elementy_inne"
                   value="<?= esc_attr(get_post_meta($post_id,'_elementy_inne',true)) ?>"
                   style="width:300px;font-size:13px;padding:4px 8px;border:1px solid #ddd;border-radius:4px;"
                   placeholder="np. sznury, pagony, dystynkcje...">
        </div>
    </div>
    <?php
}

function mundula_render_edit_metabox_zakres_prac( $post_id, $zakres, $m ) {
    $cena_sza = (int)$m['_kwota'];
    $cena_fin = (int)($m['_cena_finalna'] ?: $cena_sza);
    $stopien_nowy_meta = $m['_stopien'] ?: '';
    $stopien_obszyty_meta = $m['_stopien_obszyty'] ?: '';
    ?>
    <!-- ZAKRES PRAC -->
    <div class="postbox">
        <div class="postbox-header"><h2>Zakres prac i wycena</h2></div>
        <div class="inside" style="padding:16px;">

            <!-- Rodzaj munduru i stopień -->
            <table class="form-table" style="margin:0 0 16px 0">
                <tr>
                    <th style="width:140px">Rodzaj munduru</th>
                    <td>
                        <select name="rodzaj_munduru" style="width:100%">
                            <option value="">— Wybierz —</option>
                            <?php foreach([
                                'wl'  => 'Wojska Lądowe',
                                'sp'  => 'Siły Powietrzne',
                                'mw'  => 'Marynarka Wojenna',
                                'sw'  => 'Służba Więzienna',
                                'sg'  => 'Straż Graniczna',
                                'psp' => 'Państwowa Straż Pożarna',
                                'inn' => 'Inne',
                            ] as $k=>$v): ?>
                            <option value="<?= $k ?>" <?= selected(get_post_meta($post_id,'_rodzaj_munduru',true),$k,false) ?>><?= $v ?></option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                </tr>
                <?php if ( ! empty( $stopien_obszyty_meta ) ): ?>
                <tr>
                    <th style="width:140px">Stopień obszyty</th>
                    <td><input type="text" name="stopien_obszyty"
                               value="<?= esc_attr($stopien_obszyty_meta) ?>"
                               class="regular-text" style="width:100%"
                               placeholder="uzupełniane automatycznie z rezerwacji"></td>
                </tr>
                <?php endif; ?>
                <tr>
                    <th style="width:140px">Nowy stopień</th>
                    <td><input type="text" name="stopien"
                               value="<?= esc_attr($stopien_nowy_meta) ?>"
                               class="regular-text" style="width:100%"
                               placeholder="uzupełniane automatycznie z rezerwacji"></td>
                </tr>
            </table>

            <?php mundula_render_edit_metabox_elementy_dostarczone( $post_id, $zakres ); ?>

            <!-- Porównanie cen -->
            <div class="mundula-pricing-summary">
                <div style="flex:1;padding:12px;background:#fff8ee;border-left:3px solid #e2ae61;border-radius:4px;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em">Szacunkowa</div>
                    <div style="font-size:22px;font-weight:700;color:#e2ae61"><?= $cena_sza ?> zł</div>
                </div>
                <div style="flex:1;padding:12px;background:#f0fdf4;border-left:3px solid #16a34a;border-radius:4px;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em">Finalna (netto)</div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <input type="number" name="cena_finalna" id="cena-finalna-input" value="<?= $cena_fin ?>"
                               min="0" style="width:90px;font-size:18px;font-weight:700;color:#16a34a;
                               border:1px solid #ddd;border-radius:4px;padding:4px 8px;">
                        <span style="font-size:16px;color:#16a34a;font-weight:600">zł</span>
                    </div>
                </div>
                <div id="cena-koncowa-brutto-container" style="flex:1;padding:12px;background:#eff6ff;border-left:3px solid #2563eb;border-radius:4px;display:<?= ($m['_dostawa'] === 'paczkomat' || $m['_dostawa'] === 'kurier') ? 'block' : 'none' ?>;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em">Końcowa (brutto)</div>
                    <div style="font-size:22px;font-weight:700;color:#2563eb" id="cena-koncowa-brutto-val">
                        <?= ceil(($cena_fin * 1.23) / 5) * 5 ?> zł
                    </div>
                </div>
                <?php if($cena_sza && $cena_fin && $cena_sza !== $cena_fin):
                    $diff = $cena_fin - $cena_sza;
                    $col = $diff > 0 ? '#dc2626' : '#16a34a';
                ?>
                <div style="flex:1;padding:12px;background:#f8f8f8;border-left:3px solid <?= $col ?>;border-radius:4px;">
                    <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.05em">Różnica</div>
                    <div style="font-size:22px;font-weight:700;color:<?= $col ?>">
                        <?= ($diff > 0 ? '+' : '') . $diff ?> zł
                    </div>
                </div>
                <?php endif; ?>
            </div>

            <!-- Tabela pozycji -->
            <div class="zakres-table-wrapper"><table class="wp-list-table widefat" id="zakres-table" style="font-size:13px;">
                <thead>
                    <tr>
                        <th>Element</th>
                        <th>Usługa</th>
                        <th style="width:80px">Cena</th>
                        <th style="width:36px"></th>
                    </tr>
                </thead>
                <tbody id="zakres-body">
                <?php foreach($zakres as $i=>$item): ?>
                    <tr class="zakres-row">
                        <td><input type="text" name="zakres_items[<?= $i ?>][elemLabel]"
                                   value="<?= esc_attr($item['elemLabel']) ?>"
                                   autocomplete="off"
                                   style="width:100%;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;"></td>
                        <td><input type="text" name="zakres_items[<?= $i ?>][itemLabel]"
                                   value="<?= esc_attr($item['itemLabel']) ?>"
                                   autocomplete="off"
                                   style="width:100%;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;"></td>
                        <td><input type="number" name="zakres_items[<?= $i ?>][price]"
                                   value="<?= esc_attr($item['price']) ?>"
                                   style="width:70px;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;"
                                   class="zakres-price"></td>
                        <td><button type="button" class="button-link zakres-remove"
                                     style="color:#dc2626;font-size:16px;padding:0 4px;"
                                     title="Usuń">×</button></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="text-align:right;padding:8px 6px;font-weight:600;">Suma:</td>
                        <td><strong id="zakres-suma" style="font-size:14px;"><?= array_sum(array_column($zakres,'price')) ?> zł</strong></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="padding-top:8px;">
                            <button type="button" id="zakres-add" class="button">+ Dodaj pozycję</button>
                        </td>
                    </tr>
                </tfoot>
            </table></div>
        </div>
    </div>
    <?php
}

function mundula_render_edit_metabox_photos( $post_id ) {
    ?>
    <!-- ZDJĘCIA ZLECENIA -->
    <div class="postbox" style="margin-top:16px">
        <div class="postbox-header"><h2>Zdjęcia zlecenia (prywatne)</h2></div>
        <div class="inside" id="mundula-photos-card-inside" style="padding:16px;">
            <?php
            $photos = get_post_meta($post_id, '_mundula_photos', true);
            if ( ! is_array($photos) ) {
                $photos = [];
            }
            ?>
            
            <?php if ( ! empty($photos) ): ?>
                <div id="mundula-photos-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap:12px; margin-bottom:16px;">
                    <?php foreach ( $photos as $p ): 
                        $view_url = admin_url('admin-post.php?action=mundula_view_photo&post_id=' . $post_id . '&file=' . urlencode($p['file']) . '&nonce=' . wp_create_nonce('mundula_view_photo_' . $p['file']));
                        $delete_url = admin_url('admin-post.php?action=mundula_delete_photo&post_id=' . $post_id . '&file=' . urlencode($p['file']) . '&nonce=' . wp_create_nonce('mundula_delete_photo_' . $p['file']));
                    ?>
                        <div style="position:relative; border:1px solid #ddd; border-radius:4px; padding:4px; background:#fff; text-align:center;">
                            <a href="<?= $view_url ?>" target="_blank" title="Powiększ zdjęcie">
                                <img src="<?= $view_url ?>" style="width:100%; height:80px; object-fit:cover; border-radius:2px;" alt="<?= esc_attr($p['name']) ?>">
                            </a>
                            <div style="font-size:10px; color:#888; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:4px;" title="<?= esc_attr($p['name']) ?>">
                                <?= esc_html($p['name']) ?>
                            </div>
                            <a href="<?= $delete_url ?>" class="submitdelete deletion" onclick="return confirm('Czy na pewno chcesz usunąć to zdjęcie?')" style="color:#dc2626; font-size:11px; text-decoration:none; display:inline-block; margin-top:4px;">
                                🗑️ Usuń
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <div id="mundula-no-photos-message" style="padding:12px; background:#f9f9f9; color:#666; border-radius:4px; text-align:center; font-size:13px; margin-bottom:16px;">
                    Brak zdjęć do tego zlecenia.
                </div>
            <?php endif; ?>

            <div style="border-top:1px solid #eee; padding-top:12px;">
                <label style="font-weight:600; display:block; margin-bottom:8px; font-size:13px;">Dodaj nowe zdjęcia:</label>
                <input type="file" id="mundula-photos-input" name="mundula_photos[]" multiple accept="image/*" style="width:100%; font-size:13px;">
                <p class="description" style="margin-top:6px; font-size:11px;">
                    Wybierz jedno lub więcej zdjęć (format JPG, PNG, GIF). Zdjęcia są zabezpieczone i dostępne tylko dla zalogowanych administratorów.
                </p>
            </div>
        </div>
    </div>
    <?php
}

function mundula_render_edit_actions() {
    ?>
    <!-- PRZYCISKI ZAPISU -->
    <div class="mundula-edit-actions">
        <a href="<?= admin_url('admin.php?page=mundula-panel') ?>"
           class="button button-large">← Wróć do listy</a>
        <div style="display:flex;gap:10px;align-items:center;">
            <button type="submit" class="button button-primary button-large">💾 Zapisz zlecenie</button>
        </div>
    </div>
    <?php
}

function mundula_find_rank_in_string( $str ) {
    if ( empty( $str ) ) return '';
    
    // Normalize arrows
    $str = str_replace( [ '→', '->', '=>' ], '>', $str );
    
    // If there is an arrow, prioritize the part after the arrow
    if ( strpos( $str, '>' ) !== false ) {
        $parts = explode( '>', $str );
        $search_str = end( $parts );
    } else {
        $search_str = $str;
    }
    
    $ranks = [
        'Starszy szeregowy specjalista',
        'Starszy sierżant sztabowy',
        'Starszy chorąży sztabowy',
        'Starszy ogniomistrz',
        'Młodszy ogniomistrz',
        'Aspirant sztabowy',
        'Sierżant sztabowy',
        'Młodszy brygadier',
        'Starszy brygadier',
        'Starszy szeregowy',
        'Młodszy aspirant',
        'Chorąży sztabowy',
        'Starszy sekcyjny',
        'Starszy sierżant',
        'Starszy aspirant',
        'Młodszy kapitan',
        'Starszy strażak',
        'Młodszy chorąży',
        'Starszy kapitan',
        'Starszy chorąży',
        'Starszy kapral',
        'Podpułkownik',
        'Podporucznik',
        'Ogniomistrz',
        'Porucznik',
        'Brygadier',
        'Pułkownik',
        'Plutonowy',
        'Szeregowy',
        'Sierżant',
        'Sekcyjny',
        'Aspirant',
        'Chorąży',
        'Kapitan',
        'Kapral',
        'Major'
    ];
    
    $search_str_lower = mb_strtolower( $search_str );
    foreach ( $ranks as $rank ) {
        $rank_lower = mb_strtolower( $rank );
        if ( mb_strpos( $search_str_lower, $rank_lower ) !== false ) {
            return $rank;
        }
    }
    
    return '';
}


function mundula_clean_operation_label( $label ) {
    $label = trim( $label );
    if ( empty( $label ) ) return '';

    static $pattern = null;
    if ( $pattern === null ) {
        $ranks = [
            'Starszy szeregowy specjalista',
            'Starszy sierżant sztabowy',
            'Starszy chorąży sztabowy',
            'Starszy ogniomistrz',
            'Młodszy ogniomistrz',
            'Aspirant sztabowy',
            'Sierżant sztabowy',
            'Młodszy brygadier',
            'Starszy brygadier',
            'Starszy szeregowy',
            'Młodszy aspirant',
            'Chorąży sztabowy',
            'Starszy sekcyjny',
            'Starszy sierżant',
            'Starszy aspirant',
            'Młodszy kapitan',
            'Starszy strażak',
            'Młodszy chorąży',
            'Starszy kapitan',
            'Starszy chorąży',
            'Starszy kapral',
            'Podpułkownik',
            'Podporucznik',
            'Ogniomistrz',
            'Porucznik',
            'Brygadier',
            'Pułkownik',
            'Plutonowy',
            'Szeregowy',
            'Sierżant',
            'Sekcyjny',
            'Aspirant',
            'Chorąży',
            'Kapitan',
            'Kapral',
            'Major'
        ];
        $quoted_ranks = array_map(function($r) {
            return preg_quote($r, '/');
        }, $ranks);
        $pattern = '/^(?:' . implode('|', $quoted_ranks) . ')/ui';
    }

    while (true) {
        $new_label = preg_replace($pattern, '', $label);
        if ($new_label === $label) {
            break;
        }
        $label = ltrim($new_label, " \t\n\r\0\x0B-–—→->=>");
    }

    if ( ! function_exists( 'mb_ucfirst' ) ) {
        $firstChar = mb_substr( $label, 0, 1, 'UTF-8' );
        $then = mb_substr( $label, 1, null, 'UTF-8' );
        $label = mb_strtoupper( $firstChar, 'UTF-8' ) . $then;
    } else {
        $label = mb_ucfirst( $label );
    }

    return trim( $label );
}


function mundula_panel_raporty() {
    if ( ! current_user_can( 'manage_options' ) ) return;

    $period = sanitize_text_field( $_GET['period'] ?? '3months' );
    $date_from = sanitize_text_field( $_GET['date_from'] ?? '' );
    $date_to = sanitize_text_field( $_GET['date_to'] ?? '' );

    $date_start = '';
    $date_end = '';

    if ( $period === 'month' ) {
        $date_start = date( 'Y-m-d', strtotime( '-30 days' ) );
    } elseif ( $period === '3months' ) {
        $date_start = date( 'Y-m-d', strtotime( '-90 days' ) );
    } elseif ( $period === '6months' ) {
        $date_start = date( 'Y-m-d', strtotime( '-180 days' ) );
    } elseif ( $period === 'year' ) {
        $date_start = date( 'Y-m-d', strtotime( '-365 days' ) );
    } elseif ( $period === 'custom' ) {
        $date_start = $date_from;
        $date_end = $date_to;
    }

    $periods = [
        'month'    => 'Ostatni miesiąc (30 dni)',
        '3months'  => 'Ostatnie 3 miesiące (90 dni)',
        '6months'  => 'Ostatnie 6 miesięcy (180 dni)',
        'year'     => 'Ostatni rok (365 dni)',
        'all'      => 'Cały okres',
        'custom'   => 'Własny zakres dat',
    ];

    $query_args = [
        'post_type'              => 'mundula_zgloszenie',
        'posts_per_page'         => -1,
        'post_status'            => 'publish',
        'update_post_meta_cache' => true,
    ];

    if ( ! empty( $date_start ) || ! empty( $date_end ) ) {
        $date_query = [];
        if ( ! empty( $date_start ) ) {
            $date_query['after'] = $date_start;
            $date_query['inclusive'] = true;
        }
        if ( ! empty( $date_end ) ) {
            $date_query['before'] = $date_end;
            $date_query['inclusive'] = true;
        }
        $query_args['date_query'] = [ $date_query ];
    }

    $posts = get_posts( $query_args );

    if ( ! empty( $posts ) ) {
        update_meta_cache( 'post', wp_list_pluck( $posts, 'ID' ) );
    }

    $queue_data = []; // [$rank][$elem] = ['todo' => X, 'done' => Y]
    $operations_data = []; // [$rank][$op] = ['todo' => X, 'done' => Y]
    $popular_ranks = [];
    $popular_elems = [];
    $stats_by_status = [];
    $debug_info = [];

    $revenue_stats = [
        'wysylka' => [
            'label' => 'Wysyłka (Kurier / Paczkomat)',
            'count' => 0,
            'estimated' => 0,
            'final' => 0,
        ],
        'odbior' => [
            'label' => 'Odbiór własny',
            'count' => 0,
            'estimated' => 0,
            'final' => 0,
        ]
    ];

    global $MUNDULA_STATUSY;
    foreach ( $MUNDULA_STATUSY as $status_key => $status_info ) {
        $stats_by_status[$status_key] = [
            'count'     => 0,
            'estimated' => 0,
            'final'     => 0,
        ];
    }

    $total_estimated = 0;
    $total_final = 0;
    $total_count = 0;
    $total_todo_elements = 0;
    $total_todo_operations = 0;

    foreach ( $posts as $p ) {
        $p_date = get_the_date( 'Y-m-d', $p->ID );
        $status = get_post_meta( $p->ID, '_status', true ) ?: 'rezerwacja';

        $in_period = true;
        if ( $date_start && $p_date < $date_start ) $in_period = false;
        if ( $date_end && $p_date > $date_end ) $in_period = false;

        $kwota = (int)get_post_meta( $p->ID, '_kwota', true );
        $cena_finalna = get_post_meta( $p->ID, '_cena_finalna', true );
        $cena_finalna = ($cena_finalna === '') ? $kwota : (int)$cena_finalna;

        if ( $in_period ) {
            $total_count++;
            $total_estimated += $kwota;
            if ( in_array( $status, ['zrealizowane', 'wyslane_odebrane'] ) ) {
                $total_final += $cena_finalna;
            }

            if ( isset( $stats_by_status[$status] ) ) {
                $stats_by_status[$status]['count']++;
                $stats_by_status[$status]['estimated'] += $kwota;
                $stats_by_status[$status]['final'] += $cena_finalna;
            }

            // Podsumowanie przychodów (wysyłka vs odbiór własny)
            $dostawa_meta = get_post_meta( $p->ID, '_dostawa', true ) ?: 'osobisty';
            $is_ship = ($dostawa_meta === 'paczkomat' || $dostawa_meta === 'kurier');
            $rev_key = $is_ship ? 'wysylka' : 'odbior';
            
            $revenue_stats[$rev_key]['count']++;
            $revenue_stats[$rev_key]['estimated'] += $kwota;
            if ( in_array( $status, ['zrealizowane', 'wyslane_odebrane'] ) ) {
                $revenue_stats[$rev_key]['final'] += $cena_finalna;
            }
        }

        $stopien = get_post_meta( $p->ID, '_stopien', true );
        $zakres_raw = get_post_meta( $p->ID, '_zakres_json', true );
        $zakres = json_decode( (string)$zakres_raw, true ) ?: [];

        if ( empty( $stopien ) ) {
            $stopien = mundula_stopien_z_rows( $zakres ) ?: 'Brak stopnia';
        } else {
            $stopien = mundula_find_rank_in_string( $stopien ) ?: $stopien;
        }

        // Pobranie danych o częściowym wydaniu
        $wydanie_status = get_post_meta( $p->ID, '_wydanie_status', true ) ?: 'calosc';
        $data_czesciowa = get_post_meta( $p->ID, '_data_wydania_czesciowego', true ) ?: $p_date;
        $wydane = get_post_meta( $p->ID, '_wydane_elementy', true ) ?: [];
        if ( ! is_array( $wydane ) ) {
            $wydane = $wydane ? explode( ',', $wydane ) : [];
        }

        // Pobranie daty zakończenia zlecenia (dla statusów zrealizowane / wysłane)
        $data_zakonczenia = get_post_meta( $p->ID, '_data_fizycznej_realizacji', true );
        if ( empty( $data_zakonczenia ) ) {
            $data_zakonczenia = get_post_meta( $p->ID, '_data_wydania', true );
        }
        if ( empty( $data_zakonczenia ) ) {
            $data_zakonczenia = $p_date;
        }

        $unique_items = [];
        $items_mapped = [];

        foreach ( $zakres as $item ) {
            $elem = trim( $item['elemLabel'] ?? '' );
            if ( empty( $elem ) ) $elem = 'Inne';

            static $exclude_pattern = null;
            if ( $exclude_pattern === null ) {
                $exclude_keywords = [ 'wysył', 'wysyl', 'kurier', 'paczkomat', 'dostawa', 'dopłat', 'doplat', 'ekspres', 'szybki', 'prowizj' ];
                $exclude_pattern = '/(?:' . implode('|', array_map('preg_quote', $exclude_keywords)) . ')/ui';
            }
            $is_service = (bool) preg_match( $exclude_pattern, $elem );
            if ( $is_service ) {
                continue;
            }

            // Pobranie stopnia dla danej pozycji zlecenia (dla zamówień zbiorczych)
            $item_stopien = mundula_find_rank_in_string( $item['itemLabel'] ?? '' ) ?: $stopien;

            $is_done = false;
            $item_date = $p_date;

            if ( in_array( $status, [ 'rezerwacja', 'zlecenie', 'realizacja' ] ) ) {
                if ( $wydanie_status === 'czesc' && in_array( $elem, $wydane, true ) ) {
                    $is_done = true;
                    $item_date = $data_czesciowa;
                } else {
                    $is_done = false;
                    $item_date = $p_date;
                }
            } elseif ( in_array( $status, [ 'zrealizowane', 'wyslane_odebrane' ] ) ) {
                $is_done = true;
                $item_date = $data_zakonczenia;
            }

            $in_item_period = true;
            if ( $date_start && $item_date < $date_start ) $in_item_period = false;
            if ( $date_end && $item_date > $date_end ) $in_item_period = false;

            // Zestawienie 2: Operacje (każda pozycja osobno)
            $op_label = trim( $item['itemLabel'] ?? '' );
            if ( empty( $op_label ) ) {
                $op_label = $elem;
            } else {
                $op_label = mundula_clean_operation_label( $op_label );
            }
            if ( ! isset( $operations_data[$item_stopien] ) ) {
                $operations_data[$item_stopien] = [];
            }
            if ( ! isset( $operations_data[$item_stopien][$op_label] ) ) {
                $operations_data[$item_stopien][$op_label] = [
                    'todo' => 0,
                    'done' => 0,
                ];
            }
            if ( $is_done ) {
                if ( $in_item_period ) {
                    $operations_data[$item_stopien][$op_label]['done']++;
                }
            } else {
                $operations_data[$item_stopien][$op_label]['todo']++;
                $total_todo_operations++;
            }

            // Klucz grupowania: stopień + element (np. "Kapral|||Marynarka munduru wyjściowego")
            // Pozwala to traktować wiele operacji na tej samej części munduru jako jeden element do obszycia
            $g_key = $item_stopien . '|||' . $elem;

            if ( ! isset( $unique_items[$g_key] ) ) {
                $unique_items[$g_key] = [
                    'stopien'        => $item_stopien,
                    'elem'           => $elem,
                    'is_done'        => $is_done,
                    'in_item_period' => $in_item_period,
                    'details'        => []
                ];
            }

            // Gromadzimy opisy operacji dla celów diagnostycznych
            $unique_items[$g_key]['details'][] = $item['itemLabel'] ?? '';
            // Jeśli chociaż jedna operacja jest niedokończona w aktywnym zleceniu, cały mundur pozostaje w kolejce (todo)
            if ( ! $is_done ) {
                $unique_items[$g_key]['is_done'] = false;
            }
        }

        // Zliczanie zagregowanych mundurów
        foreach ( $unique_items as $u_item ) {
            $item_stopien = $u_item['stopien'];
            $elem = $u_item['elem'];
            $is_done = $u_item['is_done'];
            $in_item_period = $u_item['in_item_period'];
            $details_str = implode( '; ', array_filter( $u_item['details'] ) );

            if ( ! isset( $queue_data[$item_stopien] ) ) {
                $queue_data[$item_stopien] = [];
            }
            if ( ! isset( $queue_data[$item_stopien][$elem] ) ) {
                $queue_data[$item_stopien][$elem] = [
                    'todo' => 0,
                    'done' => 0,
                ];
            }

            if ( $is_done ) {
                if ( $in_item_period ) {
                    $queue_data[$item_stopien][$elem]['done']++;
                    $items_mapped[] = [
                        'rank' => $item_stopien,
                        'elem' => $elem,
                        'desc' => $details_str ?: 'Obszycie',
                        'type' => 'Obszyte (w okresie)'
                    ];
                } else {
                    $items_mapped[] = [
                        'rank' => $item_stopien,
                        'elem' => $elem,
                        'desc' => $details_str ?: 'Obszycie',
                        'type' => 'Obszyte (poza okresem)'
                    ];
                }
            } else {
                $queue_data[$item_stopien][$elem]['todo']++;
                $total_todo_elements++;
                $items_mapped[] = [
                    'rank' => $item_stopien,
                    'elem' => $elem,
                    'desc' => $details_str ?: 'Obszycie',
                    'type' => 'W kolejce'
                ];
            }

            if ( $is_done && $in_item_period ) {
                $popular_ranks[$item_stopien] = ( $popular_ranks[$item_stopien] ?? 0 ) + 1;
                $popular_elems[$elem] = ( $popular_elems[$elem] ?? 0 ) + 1;
            }
        }

        $debug_info[] = [
            'id' => $p->ID,
            'title' => get_post_meta($p->ID, '_nr', true) ?: $p->post_title,
            'status' => $status,
            'stopien' => $stopien,
            'items_mapped' => $items_mapped
        ];
    }

    arsort( $popular_ranks );
    $top_ranks = array_slice( $popular_ranks, 0, 10, true );

    arsort( $popular_elems );
    $top_elems = array_slice( $popular_elems, 0, 10, true );
    ?>
    

    <div class="wrap mundula-report-container">
        <h1>📊 Raporty i statystyki</h1>

        <!-- FILTRY OKRESU -->
        <form method="get" action="admin.php" class="mundula-report-filters">
            <input type="hidden" name="page" value="mundula-raporty">
            
            <label for="period-select">Okres raportowania:</label>
            <select name="period" id="period-select">
                <?php foreach ($periods as $k => $v): ?>
                    <option value="<?= $k ?>" <?= selected($period, $k, false) ?>><?= $v ?></option>
                <?php endforeach; ?>
            </select>
            
            <span class="custom-date-fields" style="display: <?= $period === 'custom' ? 'inline-flex' : 'none' ?>; align-items: center; gap: 8px;">
                <label for="date-from">Od:</label>
                <input type="date" name="date_from" id="date-from" value="<?= esc_attr($date_from) ?>">
                <label for="date-to">Do:</label>
                <input type="date" name="date_to" id="date-to" value="<?= esc_attr($date_to) ?>">
            </span>
            
            <button type="submit" class="button">Filtruj dane</button>
        </form>

        <!-- KPI CARDS GRID -->
        <div class="mundula-card-grid">
            <div class="mundula-kpi-card kpi-orders">
                <div class="mundula-kpi-icon-container">📝</div>
                <div class="mundula-kpi-info">
                    <p class="mundula-kpi-value"><?= $total_count ?></p>
                    <p class="mundula-kpi-label">Zlecenia w okresie</p>
                </div>
            </div>
            <div class="mundula-kpi-card kpi-estimated">
                <div class="mundula-kpi-icon-container">💰</div>
                <div class="mundula-kpi-info">
                    <p class="mundula-kpi-value"><?= number_format($total_estimated, 0, ',', ' ') ?> zł</p>
                    <p class="mundula-kpi-label">Wycena szacunkowa</p>
                </div>
            </div>
            <div class="mundula-kpi-card kpi-final">
                <div class="mundula-kpi-icon-container">✅</div>
                <div class="mundula-kpi-info">
                    <p class="mundula-kpi-value"><?= number_format($total_final, 0, ',', ' ') ?> zł</p>
                    <p class="mundula-kpi-label">Suma zrealizowana</p>
                </div>
            </div>
            <div class="mundula-kpi-card kpi-queue">
                <div class="mundula-kpi-icon-container">👕</div>
                <div class="mundula-kpi-info">
                    <p class="mundula-kpi-value"><?= $total_todo_elements ?></p>
                    <p class="mundula-kpi-label">Mundury w kolejce</p>
                </div>
            </div>
            <div class="mundula-kpi-card kpi-operations">
                <div class="mundula-kpi-icon-container">✂️</div>
                <div class="mundula-kpi-info">
                    <p class="mundula-kpi-value"><?= $total_todo_operations ?></p>
                    <p class="mundula-kpi-label">Operacje w kolejce</p>
                </div>
            </div>
        </div>

        <!-- ECONOMICS AND STATUS BREAKDOWN -->
        <div class="mundula-report-grid-2">
            <!-- Left Side: Economics Tables -->
            <div>
                <div class="mundula-report-box">
                    <div class="mundula-report-box-header">
                        <h2>📈 Podsumowanie ekonomiczne według statusów</h2>
                    </div>
                    <div class="mundula-report-box-body" style="padding: 10px 20px;">
                        <table class="mundula-report-table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th style="text-align: center;">Zlecenia</th>
                                    <th style="text-align: right;">Suma szacunkowa</th>
                                    <th style="text-align: right;">Suma zrealizowana</th>
                                    <th style="text-align: right; width: 140px;">Udział</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($stats_by_status as $st_key => $st_val): 
                                    $st_info = $MUNDULA_STATUSY[$st_key] ?? [ 'label' => $st_key, 'color' => '#666', 'bg' => '#eee' ];
                                    $pct = $total_estimated > 0 ? round(($st_val['estimated'] / $total_estimated) * 100) : 0;
                                ?>
                                <tr>
                                    <td>
                                        <span class="mundula-status-badge"
                                              style="display:inline-block;padding:2px 6px;border-radius:10px;font-size:11px;font-weight:600;background:<?= $st_info['bg'] ?>;color:<?= $st_info['color'] ?>;border:1px solid <?= $st_info['color'] ?>;">
                                            <?= $st_info['label'] ?>
                                        </span>
                                    </td>
                                    <td style="text-align: center; font-weight: 600;"><?= $st_val['count'] ?></td>
                                    <td style="text-align: right;"><?= number_format($st_val['estimated'], 0, ',', ' ') ?> zł</td>
                                    <td style="text-align: right; font-weight: 600; color: #16a34a;">
                                        <?= in_array($st_key, ['zrealizowane', 'wyslane_odebrane']) ? number_format($st_val['final'], 0, ',', ' ') . ' zł' : '—' ?>
                                    </td>
                                    <td style="text-align: right;">
                                        <span style="font-weight: 600; color: #64748b;"><?= $pct ?>%</span>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar-fill" style="width: <?= $pct ?>%; background: <?= $st_info['color'] ?>;"></div>
                                        </div>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Left Side: Revenues Summary (Shipping vs Pickup) -->
                <div class="mundula-report-box" style="margin-top: 20px;">
                    <div class="mundula-report-box-header">
                        <h2>💰 Podsumowanie przychodów (Wysyłka vs Odbiór)</h2>
                    </div>
                    <div class="mundula-report-box-body" style="padding: 10px 20px;">
                        <table class="mundula-report-table">
                            <thead>
                                <tr>
                                    <th>Forma dostawy</th>
                                    <th style="text-align: center;">Zlecenia</th>
                                    <th style="text-align: right;">Suma szacunkowa</th>
                                    <th style="text-align: right;">Suma zrealizowana</th>
                                    <th style="text-align: right; width: 140px;">Udział</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($revenue_stats as $rev_key => $rev_val): 
                                    $pct = $total_estimated > 0 ? round(($rev_val['estimated'] / $total_estimated) * 100) : 0;
                                    $color = ($rev_key === 'wysylka') ? '#2563eb' : '#16a34a';
                                    $bg = ($rev_key === 'wysylka') ? '#eff6ff' : '#f0fdf4';
                                ?>
                                <tr>
                                    <td>
                                        <span class="mundula-status-badge"
                                              style="display:inline-block;padding:2px 6px;border-radius:10px;font-size:11px;font-weight:600;background:<?= $bg ?>;color:<?= $color ?>;border:1px solid <?= $color ?>;">
                                            <?= esc_html($rev_val['label']) ?>
                                        </span>
                                    </td>
                                    <td style="text-align: center; font-weight: 600;"><?= $rev_val['count'] ?></td>
                                    <td style="text-align: right;"><?= number_format($rev_val['estimated'], 0, ',', ' ') ?> zł</td>
                                    <td style="text-align: right; font-weight: 600; color: #16a34a;">
                                        <?= number_format($rev_val['final'], 0, ',', ' ') ?> zł
                                    </td>
                                    <td style="text-align: right;">
                                        <span style="font-weight: 600; color: #64748b;"><?= $pct ?>%</span>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar-fill" style="width: <?= $pct ?>%; background: <?= $color ?>;"></div>
                                        </div>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Right Side: Popular Ranks -->
            <div class="mundula-report-box">
                <div class="mundula-report-box-header">
                    <h2>🏆 Najczęściej obszywane stopnie (Top 10)</h2>
                </div>
                <div class="mundula-report-box-body" style="padding: 10px 20px;">
                    <table class="mundula-report-table">
                        <thead>
                            <tr>
                                <th style="width: 40px; text-align: center;">Poz.</th>
                                <th>Stopień</th>
                                <th style="text-align: right;">Liczba obszyć</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($top_ranks)): ?>
                                <tr><td colspan="3" style="text-align: center; color: #999; padding: 20px;">Brak danych w tym okresie</td></tr>
                            <?php else: ?>
                                <?php $pos = 1; foreach ($top_ranks as $rank => $count): ?>
                                    <tr>
                                        <td style="text-align: center; font-weight: bold; color: #64748b;"><?= $pos++ ?></td>
                                        <td style="font-weight: 600;"><?= esc_html($rank) ?></td>
                                        <td style="text-align: right; font-weight: bold; color: #2563eb;"><?= $count ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="mundula-report-grid-2" style="grid-template-columns: 2fr 3fr; gap: 20px; margin-bottom: 24px;">
            <!-- Left: Popular Elements -->
            <div class="mundula-report-box">
                <div class="mundula-report-box-header">
                    <h2>🏆 Najczęściej obszywane elementy (Top 10)</h2>
                </div>
                <div class="mundula-report-box-body" style="padding: 10px 20px;">
                    <table class="mundula-report-table">
                        <thead>
                            <tr>
                                <th style="width: 40px; text-align: center;">Poz.</th>
                                <th>Element</th>
                                <th style="text-align: right;">Liczba obszyć</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($top_elems)): ?>
                                <tr><td colspan="3" style="text-align: center; color: #999; padding: 20px;">Brak danych w tym okresie</td></tr>
                            <?php else: ?>
                                <?php $pos = 1; foreach ($top_elems as $elem => $count): ?>
                                    <tr>
                                        <td style="text-align: center; font-weight: bold; color: #64748b;"><?= $pos++ ?></td>
                                        <td style="font-weight: 600;"><?= esc_html($elem) ?></td>
                                        <td style="text-align: right; font-weight: bold; color: #2563eb;"><?= $count ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Right: Queue Table -->
            <div class="mundula-report-box">
                <div class="mundula-report-box-header" style="flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; display: flex;">
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <h2 style="margin: 0; font-size: 16px;">📋 Kolejka obszyć</h2>
                        <div class="mundula-tabs" style="display: inline-flex; background: #f1f5f9; border-radius: 6px; padding: 2px; border: 1px solid #e2e8f0;">
                            <button type="button" class="mundula-tab-btn active" data-tab="tab-mundury" style="border: none; background: #fff; padding: 5px 12px; font-size: 11px; font-weight: 700; color: #1e293b; border-radius: 4px; cursor: pointer; transition: all 0.15s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                                👕 Fizyczne mundury
                            </button>
                            <button type="button" class="mundula-tab-btn" data-tab="tab-operacje" style="border: none; background: none; padding: 5px 12px; font-size: 11px; font-weight: 600; color: #64748b; border-radius: 4px; cursor: pointer; transition: all 0.15s;">
                                ✂️ Szczegółowe operacje
                            </button>
                        </div>
                    </div>
                    <input type="text" id="queue-search" placeholder="Filtruj tabelę (stopień, element)..." 
                           style="padding: 4px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12px; width: 220px;">
                </div>
                <div class="mundula-report-box-body" style="padding: 10px 20px; max-height: 500px; overflow-y: auto;">
                    
                    <!-- Zestawienie 1: Fizyczne mundury -->
                    <div id="tab-mundury" class="mundula-tab-content">
                        <table class="mundula-report-table">
                            <thead>
                                <tr>
                                    <th>Stopień</th>
                                    <th>Mundur / Element</th>
                                    <th style="text-align: center; width: 100px;">W kolejce</th>
                                    <th style="text-align: center; width: 110px;">Obszyte w okresie</th>
                                    <th style="text-align: center; width: 80px;">Razem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $has_queue_rows = false;
                                ksort($queue_data);
                                foreach ( $queue_data as $rank => $elems ) {
                                    ksort($elems);
                                    foreach ( $elems as $elem => $counts ) {
                                        if ($counts['todo'] == 0 && $counts['done'] == 0) continue;
                                        $has_queue_rows = true;
                                        ?>
                                        <tr class="queue-row">
                                            <td class="col-rank" style="font-weight: 600;"><?= esc_html($rank) ?></td>
                                            <td class="col-elem"><?= esc_html($elem) ?></td>
                                            <td style="text-align: center;">
                                                <?php if ($counts['todo'] > 0): ?>
                                                    <span style="display:inline-block; min-width: 20px; padding: 2px 6px; border-radius: 10px; font-size: 11px; font-weight: bold; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;">
                                                        <?= $counts['todo'] ?>
                                                    </span>
                                                <?php else: ?>
                                                    <span style="color: #cbd5e1;">0</span>
                                                <?php endif; ?>
                                            </td>
                                            <td style="text-align: center;">
                                                <?php if ($counts['done'] > 0): ?>
                                                    <span style="display:inline-block; min-width: 20px; padding: 2px 6px; border-radius: 10px; font-size: 11px; font-weight: bold; background: #dcfce7; color: #16a34a; border: 1px solid #86efac;">
                                                        <?= $counts['done'] ?>
                                                    </span>
                                                <?php else: ?>
                                                    <span style="color: #cbd5e1;">0</span>
                                                <?php endif; ?>
                                            </td>
                                            <td style="text-align: center; font-weight: 600; color: #64748b;">
                                                <?= $counts['todo'] + $counts['done'] ?>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                }
                                if ( ! $has_queue_rows ) {
                                    echo '<tr><td colspan="5" style="text-align: center; color: #999; padding: 20px;">Brak elementów w kolejce oraz obszytych</td></tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>

                    <!-- Zestawienie 2: Szczegółowe operacje -->
                    <div id="tab-operacje" class="mundula-tab-content" style="display: none;">
                        <table class="mundula-report-table">
                            <thead>
                                <tr>
                                    <th>Stopień</th>
                                    <th>Operacja krawiecka</th>
                                    <th style="text-align: center; width: 100px;">W kolejce</th>
                                    <th style="text-align: center; width: 110px;">Obszyte w okresie</th>
                                    <th style="text-align: center; width: 80px;">Razem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $has_op_rows = false;
                                ksort($operations_data);
                                foreach ( $operations_data as $rank => $ops ) {
                                    ksort($ops);
                                    foreach ( $ops as $op => $counts ) {
                                        if ($counts['todo'] == 0 && $counts['done'] == 0) continue;
                                        $has_op_rows = true;
                                        ?>
                                        <tr class="queue-row">
                                            <td class="col-rank" style="font-weight: 600;"><?= esc_html($rank) ?></td>
                                            <td class="col-elem"><?= esc_html($op) ?></td>
                                            <td style="text-align: center;">
                                                <?php if ($counts['todo'] > 0): ?>
                                                    <span style="display:inline-block; min-width: 20px; padding: 2px 6px; border-radius: 10px; font-size: 11px; font-weight: bold; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;">
                                                        <?= $counts['todo'] ?>
                                                    </span>
                                                <?php else: ?>
                                                    <span style="color: #cbd5e1;">0</span>
                                                <?php endif; ?>
                                            </td>
                                            <td style="text-align: center;">
                                                <?php if ($counts['done'] > 0): ?>
                                                    <span style="display:inline-block; min-width: 20px; padding: 2px 6px; border-radius: 10px; font-size: 11px; font-weight: bold; background: #dcfce7; color: #16a34a; border: 1px solid #86efac;">
                                                        <?= $counts['done'] ?>
                                                    </span>
                                                <?php else: ?>
                                                    <span style="color: #cbd5e1;">0</span>
                                                <?php endif; ?>
                                            </td>
                                            <td style="text-align: center; font-weight: 600; color: #64748b;">
                                                <?= $counts['todo'] + $counts['done'] ?>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                }
                                if ( ! $has_op_rows ) {
                                    echo '<tr><td colspan="5" style="text-align: center; color: #999; padding: 20px;">Brak operacji w kolejce oraz obszytych</td></tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <details style="background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);">
                <summary style="font-weight: 700; cursor: pointer; color: #334155; font-size: 14px;">🔍 Szczegóły zliczania zleceń (Diagnostyka bazy danych)</summary>
                <div style="margin-top: 15px; overflow-x: auto;">
                    <table class="mundula-report-table" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th>ID zlecenia</th>
                                <th>Numer / Tytuł</th>
                                <th>Status zlecenia</th>
                                <th>Stopień (Globalny)</th>
                                <th>Pozycje (Wyodrębniony stopień → Element)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($debug_info as $dbg): ?>
                                <tr>
                                    <td><strong>#<?= $dbg['id'] ?></strong></td>
                                    <td><?= esc_html($dbg['title']) ?></td>
                                    <td>
                                        <span style="display:inline-block; padding: 2px 6px; border-radius: 4px; font-weight: bold; background: <?= $MUNDULA_STATUSY[$dbg['status']]['bg'] ?? '#eee' ?>; color: <?= $MUNDULA_STATUSY[$dbg['status']]['color'] ?? '#666' ?>;">
                                            <?= $MUNDULA_STATUSY[$dbg['status']]['label'] ?? $dbg['status'] ?>
                                        </span>
                                    </td>
                                    <td><?= esc_html($dbg['stopien']) ?></td>
                                    <td>
                                        <ul style="margin: 0; padding-left: 15px;">
                                            <?php foreach ($dbg['items_mapped'] as $it): ?>
                                                <li>
                                                    <span style="font-weight: 600; color: #0284c7;"><?= esc_html($it['rank']) ?></span> → <?= esc_html($it['elem']) ?> 
                                                    (<?= esc_html($it['desc']) ?>) - 
                                                    <strong><?= $it['type'] ?></strong>
                                                </li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </details>
        </div>
    </div>

    
    <?php
}

