<?php
// ── STATUSY I STAŁE ──────────────────────────────────────────

// ── STAŁE STATUSÓW ───────────────────────────────────────────
define( 'MUNDULA_STATUS_REZERWACJA',  'rezerwacja' );
define( 'MUNDULA_STATUS_REALIZACJA',  'realizacja' );
define( 'MUNDULA_STATUS_ZREALIZOWANE','zrealizowane' );
define( 'MUNDULA_STATUS_ANULOWANE',   'anulowane' );
define( 'MUNDULA_STATUS_ZLECENIE',    'zlecenie' );
define( 'MUNDULA_STATUS_WYSLANE_ODEBRANE', 'wyslane_odebrane' );

global $MUNDULA_STATUSY;
$MUNDULA_STATUSY = [
    MUNDULA_STATUS_REZERWACJA   => [ 'label' => 'Rezerwacja',   'color' => '#e2ae61', 'bg' => '#fff8ee' ],
    MUNDULA_STATUS_ZLECENIE     => [ 'label' => 'Dostarczone',  'color' => '#7c3aed', 'bg' => '#f5f3ff' ],
    MUNDULA_STATUS_REALIZACJA   => [ 'label' => 'W realizacji', 'color' => '#2563eb', 'bg' => '#eff6ff' ],
    MUNDULA_STATUS_ZREALIZOWANE => [ 'label' => 'Zrealizowane', 'color' => '#16a34a', 'bg' => '#f0fdf4' ],
    MUNDULA_STATUS_WYSLANE_ODEBRANE => [ 'label' => 'Wysłane / Odebrane', 'color' => '#06b6d4', 'bg' => '#ecfeff' ],
    MUNDULA_STATUS_ANULOWANE    => [ 'label' => 'Anulowane',    'color' => '#6b7280', 'bg' => '#f3f4f6' ],
];

function mundula_clean_encoding( $str ) {
    if ( ! is_string( $str ) ) return $str;
    $replacements = [
        'ĹĽ' => 'ż',
        'Ĺ›' => 'ś',
        'Ĺ„' => 'ń',
        'Ä™' => 'ę',
        'Ĺ‚' => 'ł',
        'Ä…' => 'ą',
        'Ĺš' => 'Ś',
        'Ĺ»' => 'Ż',
        'Ăł' => 'ó',
        'â€”' => '—',
        'â€“' => '–',
        'â\u0080\u0094' => '—',
        'â\u0080\u0093' => '–',
        'â€™' => '’',
    ];
    $str = str_replace( array_keys($replacements), array_values($replacements), $str );
    
    // Ujednolicenie nazewnictwa: Oznaka rozpoznawcza -> Oznaka rozpoznawcza jednostki
    $str = str_replace( 'Oznaka rozpoznawcza jednostki', 'Oznaka rozpoznawcza', $str );
    $str = str_replace( 'Oznaka rozpoznawcza', 'Oznaka rozpoznawcza jednostki', $str );
    
    return $str;
}


function mundula_admin_enqueue( $hook ) {
    if ( strpos( $hook, 'mundula' ) === false ) return;
    wp_enqueue_script( 'jquery' );

    $stawki_cennik = function_exists('mundula_stawki_get') ? mundula_stawki_get() : [];
    $cennik_uslugi = [];
    foreach ( $stawki_cennik as $st_item ) {
        if ( ! empty($st_item['l']) ) {
            $l = trim($st_item['l']);
            $g = trim($st_item['g'] ?? '');
            
            // Dopasowanie do formatu kalkulatora:
            if ( stripos($g, 'Stopnie') === 0 ) {
                $cennik_uslugi[] = $l . ' — obszycie dystynkcji (stopień)';
                $cennik_uslugi[] = $l . ' — zmiana dystynkcji (stopnia)';
                $cennik_uslugi[] = 'Haft stopnia bajorkiem na berecie — ' . $l;
                $cennik_uslugi[] = 'Haft stopnia bajorkiem na czapce — ' . $l;
            } else {
                $cennik_uslugi[] = $l;
            }
        }
    }
    
    $base_elementy = [
        'Marynarka munduru galowego',
        'Marynarka munduru wyjściowego',
        'Płaszcz',
        'Beret munduru galowego / wyjściowego',
        'Beret munduru polowego',
        'Czapka rogatywka',
        'Czapka garnizonowa',
        'Furażerka',
        'Kapelusz Podhalański / Huculski',
        'Naramienniki koszuli',
        'Otok',
        'Wysyłka'
    ];

    $base_uslugi = [
        'Obszycie stopnia (dystynkcji)',
        'Obszycie stopnia (haft bajorkiem)',
        'Obszycie pagonów',
        'Obszycie naramienników',
        'Zmiana dystynkcji (stopnia)',
        'Oznaka rozpoznawcza jednostki - tylko obszycie',
        'Oznaka rozpoznawcza jednostki - oznaka + obszycie',
        'Oznaka rozpoznawcza jednostki - zmiana',
        'Oznaka przynależności państwowej - tylko obszycie',
        'Oznaka przynależności państwowej - oznaka + obszycie',
        'Oznaka korpusu osobowego - umieszczenie',
        'Oznaka rezerwy - umieszczenie',
        'Oznaka szkolna - umieszczenie',
        'Baretka jednorzędowa - umieszczenie / obszycie',
        'Baretka dwurzędowa - umieszczenie / obszycie',
        'Baretka trzyrzędowa - umieszczenie / obszycie',
        'Odznaki honorowe, pamiątkowe - umieszczenie',
        'Naszywka stopnia na nakrycie głowy',
        'Obszycie czapki',
        'Obszycie beretu',
        'Obszycie munduru',
        'Obszycie płaszcza',
        'Dopłata za zmianę stopnia (odprucie)',
        'Ekspres 72h',
        'Ekspres weekend 72h'
    ];

    // CSS override dla panelu
    wp_enqueue_style( 'mundula-admin-backend-css', content_url( '/kalkulator/admin-backend.css' ), [], '3.5' );
    wp_enqueue_script( 'mundula-admin-backend-js', content_url( '/kalkulator/admin-backend.js' ), [ 'jquery' ], '3.5', true );

    // Przekaż nonce do JS przez wp_localize_script (powiązany z mundula-admin-backend-js)
    wp_localize_script( 'mundula-admin-backend-js', 'mundulaAdmin', [
        'nonce'     => wp_create_nonce( 'mundula_admin_nonce' ),
        'ajax'      => admin_url( 'admin-ajax.php' ),
        'shipRates' => [
            'paczkomat' => (int)(get_option( 'mundula_stawki', [] )['sh_paczkomat']['p'] ?? 15),
            'kurier'    => (int)(get_option( 'mundula_stawki', [] )['sh_kurier']['p'] ?? 20),
        ],
        'elementy'  => $base_elementy,
        'uslugi'    => array_values(array_unique(array_filter(array_merge($base_uslugi, $cennik_uslugi))))
    ]);
}
add_action( 'admin_enqueue_scripts', 'mundula_admin_enqueue' );


function mundula_admin_menu() {
    add_menu_page(
        'Mundula - Zlecenia',
        "Zlecenia",
        'manage_options',
        'mundula-panel',
        'mundula_panel_page',
        'dashicons-clipboard',
        30
    );
    // Dodaj widoczną pozycję w podmenu (naprawia nawigację na urządzeniach mobilnych)
    add_submenu_page(
        'mundula-panel',
        'Mundula - Zlecenia',
        '📋 Lista zleceń',
        'manage_options',
        'mundula-panel',
        'mundula_panel_page'
    );
    add_submenu_page(
        'mundula-panel',
        'Cenniki kalkulatora',
        "⚙️ Cenniki",
        'manage_options',
        'mundula-stawki',
        'mundula_panel_cennik'
    );
    add_submenu_page(
        'mundula-panel',
        'Raporty i statystyki',
        "📊 Raporty",
        'manage_options',
        'mundula-raporty',
        'mundula_panel_raporty'
    );
}
add_action( 'admin_menu', 'mundula_admin_menu' );


function mundula_remove_admin_footer() {
    $page = isset( $_GET['page'] ) ? sanitize_text_field( $_GET['page'] ) : '';
    if ( in_array( $page, [ 'mundula-panel', 'mundula-stawki', 'mundula-raporty' ], true ) ) {
        add_filter( 'admin_footer_text', '__return_empty_string', 9999 );
        add_filter( 'update_footer', '__return_empty_string', 9999 );
    }
}
add_action( 'admin_init', 'mundula_remove_admin_footer' );



function mundula_build_adres( $post ) {
    $dostawa = sanitize_text_field( $post['dostawa'] ?? '' );
    if ( $dostawa === 'paczkomat' ) {
        return sanitize_text_field( $post['adres_paczkomat'] ?? '' );
    }
    if ( $dostawa === 'kurier' ) {
        return implode("
", [
            sanitize_text_field( $post['adres_imnaz']  ?? '' ),
            sanitize_text_field( $post['adres_ulica']  ?? '' ),
            sanitize_text_field( $post['adres_kod']    ?? '' ),
            sanitize_text_field( $post['adres_miasto'] ?? '' ),
        ]);
    }
    return '';
}


function mundula_view_photo_handler() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Forbidden', '', array( 'response' => 403 ) );
    }
    
    $post_id = absint( $_GET['post_id'] ?? 0 );
    $file = sanitize_file_name( $_GET['file'] ?? '' );
    
    $photos = get_post_meta( $post_id, '_mundula_photos', true );
    $found = false;
    if ( is_array( $photos ) ) {
        foreach ( $photos as $p ) {
            if ( $p['file'] === $file ) {
                $found = true;
                break;
            }
        }
    }
    
    if ( ! $found ) {
        wp_die( 'Nie znaleziono pliku.', '', array( 'response' => 404 ) );
    }
    
    $file_path = WP_CONTENT_DIR . '/uploads/mundula-private/' . $file;
    if ( ! file_exists( $file_path ) ) {
        wp_die( 'Plik nie istnieje na serwerze.', '', array( 'response' => 404 ) );
    }
    
    $mime = mime_content_type( $file_path );
    if ( ! $mime || strpos( $mime, 'image/' ) !== 0 ) {
        wp_die( 'Niepoprawny typ pliku.', '', array( 'response' => 400 ) );
    }
    
    header( 'Cache-Control: no-store, no-cache, must-revalidate, max-age=0' );
    header( 'Cache-Control: post-check=0, pre-check=0', false );
    header( 'Pragma: no-cache' );
    header( 'Content-Type: ' . $mime );
    header( 'Content-Length: ' . filesize( $file_path ) );
    
    readfile( $file_path );
    exit;
}


function mundula_delete_photo_handler() {
    if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Forbidden' );
    $post_id = absint( $_GET['post_id'] ?? 0 );
    $file = sanitize_file_name( $_GET['file'] ?? '' );
    $nonce = $_GET['nonce'] ?? '';
    
    if ( ! wp_verify_nonce( $nonce, 'mundula_delete_photo_' . $file ) ) {
        wp_die( 'Błędny klucz zabezpieczający' );
    }
    
    $existing_photos = get_post_meta( $post_id, '_mundula_photos', true );
    if ( is_array( $existing_photos ) ) {
        $new_photos = [];
        foreach ( $existing_photos as $p ) {
            if ( $p['file'] === $file ) {
                $file_path = WP_CONTENT_DIR . '/uploads/mundula-private/' . $file;
                if ( file_exists( $file_path ) ) {
                    unlink( $file_path );
                }
            } else {
                $new_photos[] = $p;
            }
        }
        update_post_meta( $post_id, '_mundula_photos', $new_photos );
    }
    
    wp_redirect( admin_url( 'admin.php?page=mundula-panel&action=edit&id=' . $post_id ) );
    exit;
}


function mundula_ajax_delete() {
    check_ajax_referer( 'mundula_admin_nonce', 'nonce' );
    if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error();
    $ids = array_map( 'absint', $_POST['ids'] ?? [] );
    $deleted = 0;
    foreach ( $ids as $id ) {
        if ( get_post_type( $id ) === 'mundula_zgloszenie' ) {
            wp_delete_post( $id, true );
            $deleted++;
        }
    }
    wp_cache_flush();
    wp_send_json_success( [ 'deleted' => $deleted ] );
}
add_action( 'wp_ajax_mundula_delete', 'mundula_ajax_delete' );



function mundula_mail_potwierdzenie( $post_id ) {
    $is_zbiorcze = get_post_meta( $post_id, '_zam_zbiorcze', true ) === '1';
    
    $email = '';
    $imie  = '';
    
    if ( $is_zbiorcze ) {
        $email = get_post_meta( $post_id, '_zbiorcze_email', true );
        $imie  = get_post_meta( $post_id, '_zbiorcze_nazwisko', true );
    }
    
    if ( empty( $email ) ) {
        $email = get_post_meta( $post_id, '_email',   true )
              ?: get_post_meta( $post_id, '_kontakt', true );
    }
    if ( empty( $imie ) ) {
        $imie = get_post_meta( $post_id, '_imie_nazwisko',   true );
    }

    $nr      = get_post_meta( $post_id, '_nr',              true );
    $dostawy = get_post_meta( $post_id, '_data_dostawy',    true );
    $stopien = get_post_meta( $post_id, '_stopien',         true );
    $rodzaj  = get_post_meta( $post_id, '_rodzaj_munduru',  true );
    $kwota   = get_post_meta( $post_id, '_kwota',           true );

    // Mapa kodów rodzaju munduru na nazwy
    $rodzaje = [
        'wl'  => 'Wojska Lądowe',
        'sp'  => 'Siły Powietrzne',
        'mw'  => 'Marynarka Wojenna',
        'sw'  => 'Służba Więzienna',
        'sg'  => 'Straż Graniczna',
        'psp' => 'Państwowa Straż Pożarna',
        'inn' => 'Inne',
    ];
    $rodzaj_nazwa = $rodzaje[$rodzaj] ?? '';

    // Zakres prac - tylko elementy (elemLabel)
    $regex_raw_temp = get_post_meta( $post_id, '_zakres_json', true );
    $zakres     = json_decode( (string)$regex_raw_temp ?: '[]', true ) ?: [];
    $elementy   = array_unique( array_column( $zakres, 'elemLabel' ) );

    // Walidacja - potrzebny email lub telefon
    if ( ! $email || ! is_email( $email ) ) return false;

    $subject = 'Potwierdzenie dostarczenia munduru do obszycia' . ( $nr ? ' #'.$nr : '' );

    $powitanie = $imie ? "Szanowny/a {$imie}," : "Szanowny Kliencie,";

    $body  = "{$powitanie}

";
    $body .= "Potwierdzamy dostarczenie Twojego munduru do obszycia.

";
    $body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
";
    $body .= "SZCZEGÓŁY ZLECENIA
";
    $body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
";
    if ( $nr )           $body .= "Numer zlecenia:        #{$nr}
";
    if ( $rodzaj_nazwa ) $body .= "Rodzaj służby:         {$rodzaj_nazwa}
";
    if ( $stopien )      $body .= "Stopień:               {$stopien}
";
    if ( ! empty($elementy) ) {
        $body .= "Zakres prac:
";
        foreach ( $elementy as $el ) {
            $body .= "  • {$el}
";
        }
    }
    if ( $kwota )        $body .= "
Szacunkowa kwota (netto): {$kwota} zł
";
     // Planowana realizacja po zakresie prac z warunkiem dostarczenia
     $data_real = get_post_meta( $post_id, '_data_realizacji', true );
     if ( $data_real ) {
         $body .= "
Planowana realizacja: " . esc_html( mundula_format_date( $data_real ) );
         if ( $dostawy ) {
             $body .= "
(pod warunkiem dostarczenia munduru oraz oznak do dnia " . esc_html( mundula_format_date( $dostawy ) ) . ")";
         }
         $body .= "
";
     }
    $body .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

";
    $body .= "O gotowości munduru do odbioru poinformujemy Cię mailowo lub telefonicznie.

";
    $body .= "W razie pytań prosimy o kontakt:
";
    $body .= "✉ info@mundula.pl
";
    $body .= "☎ +48 508 768 636

";
    $body .= "Dziękujemy za zaufanie!
";
    $body .= "Mundula — obszycie mundurów
https://mundula.pl
";

    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: Mundula <info@mundula.pl>',
    ];

    return wp_mail( $email, $subject, $body, $headers );
}


function mundula_ajax_potwierdz() {
    check_ajax_referer( 'mundula_admin_nonce', 'nonce' );
    if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error();

    $post_id = absint( $_POST['post_id'] ?? 0 );
    if ( ! $post_id ) wp_send_json_error( ['message' => 'Brak ID zlecenia.'] );

    // Zmień status na zlecenie
    update_post_meta( $post_id, '_status', 'zlecenie' );
    update_post_meta( $post_id, '_data_potwierdzenia', current_time('d.m.Y H:i') );

    // Wyślij mail potwierdzający tylko gdy jest email
    $email_kl = get_post_meta( $post_id, '_email', true );
    // Sprawdź też _kontakt jeśli _email pusty
    if ( ! $email_kl ) {
        $kontakt = get_post_meta( $post_id, '_kontakt', true );
        if ( $kontakt && is_email($kontakt) ) $email_kl = $kontakt;
    }
    if ( $email_kl && is_email($email_kl) ) {
        $sent = mundula_mail_potwierdzenie( $post_id );
        update_post_meta( $post_id, '_potwierdzenie_wyslane', $sent ? current_time('d.m.Y H:i') : 'blad' );
        $msg = $sent
            ? 'Dostarczenie zlecenia potwierdzone, mail wysłany na ' . $email_kl . '.'
            : 'Status zmieniony na Dostarczone, ale mail nie został wysłany. Sprawdź konfigurację SMTP.';
    } else {
        // Tylko telefon - zmień status bez maila
        update_post_meta( $post_id, '_potwierdzenie_wyslane', 'tylko_telefon' );
        $sent = null;
        $msg  = 'Status zmieniony na Dostarczone. Brak adresu email — powiadom klienta telefonicznie.';
    }

    wp_send_json_success([
        'message' => $msg,
        'sent'    => $sent,
    ]);
}
add_action( 'wp_ajax_mundula_potwierdz', 'mundula_ajax_potwierdz' );


function mundula_change_status_form() {
    if ( ! check_admin_referer( 'mundula_change_status' ) ) wp_die('Błąd bezpieczeństwa.');
    if ( ! current_user_can( 'manage_options' ) ) return;

    $post_id = absint( $_POST['post_id'] ?? 0 );
    $status  = sanitize_text_field( $_POST['new_status'] ?? '' );
    $allowed = [ 'rezerwacja', 'zlecenie', 'realizacja', 'zrealizowane', 'anulowane', 'wyslane_odebrane' ];

    if ( $post_id && in_array( $status, $allowed ) ) {
        update_post_meta( $post_id, '_status', $status );
        if ( $status === 'realizacja' && ! get_post_meta( $post_id, '_data_realizacji', true ) ) {
            update_post_meta( $post_id, '_data_realizacji', current_time('Y-m-d') );
        }
    }
    wp_redirect( admin_url( 'admin.php?page=mundula-panel' ) );
    exit;
}
add_action( 'admin_post_mundula_change_status_form', 'mundula_change_status_form' );


function mundula_ajax_status() {
    check_ajax_referer( 'mundula_admin_nonce', 'nonce' );
    if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error();
    $post_id = absint( $_POST['post_id'] ?? 0 );
    $status  = sanitize_text_field( $_POST['status'] ?? '' );
    $allowed = [ MUNDULA_STATUS_REZERWACJA, MUNDULA_STATUS_REALIZACJA, MUNDULA_STATUS_ZREALIZOWANE, MUNDULA_STATUS_WYSLANE_ODEBRANE ];
    if ( ! in_array( $status, $allowed ) ) wp_send_json_error();
    update_post_meta( $post_id, '_status', $status );

    // Ustaw datę wydania automatycznie
    if ( $status === MUNDULA_STATUS_ZREALIZOWANE ) {
        if ( ! get_post_meta( $post_id, '_data_wydania', true ) ) {
            update_post_meta( $post_id, '_data_wydania', current_time( 'Y-m-d' ) );
        }
    }
    // Ustaw datę realizacji
    if ( $status === MUNDULA_STATUS_REALIZACJA ) {
        if ( ! get_post_meta( $post_id, '_data_realizacji', true ) ) {
            update_post_meta( $post_id, '_data_realizacji', current_time( 'Y-m-d' ) );
        }
    }
    wp_send_json_success();
}
add_action( 'wp_ajax_mundula_status', 'mundula_ajax_status' );


function mundula_get_next_priority( $is_urgent, $exclude_post_id = 0 ) {
    $active_posts = get_posts([
        'post_type'      => 'mundula_zgloszenie',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_query'     => [
            [
                'key'     => '_status',
                'value'   => [ 'zrealizowane', 'anulowane', 'wyslane_odebrane' ],
                'compare' => 'NOT IN',
            ]
        ],
        'fields'         => 'ids',
    ]);
    
    $max_prio = -1;
    foreach ( $active_posts as $pid ) {
        if ( $pid === $exclude_post_id ) {
            continue;
        }
        $p_urgent = get_post_meta( $pid, '_is_urgent', true ) === '1';
        if ( $p_urgent === $is_urgent ) {
            $prio = get_post_meta( $pid, '_priorytet', true );
            if ( $prio !== '' ) {
                $max_prio = max( $max_prio, (int)$prio );
            }
        }
    }
    
    return $max_prio + 1;
}


function mundula_get_customer_orders_count( $tel, $email ) {
    global $wpdb;
    
    $tel = trim((string)$tel);
    $email = trim((string)$email);
    
    if ( empty($tel) && empty($email) ) {
        return 0;
    }
    
    $meta_clauses = [];
    $params = [ 'mundula_zgloszenie', 'publish' ];
    
    if ( ! empty($tel) ) {
        $meta_clauses[] = "(meta_key IN ('_telefon', '_kontakt', '_zbiorcze_telefon') AND meta_value = %s)";
        $params[] = $tel;
    }
    
    if ( ! empty($email) ) {
        $meta_clauses[] = "(meta_key IN ('_email', '_kontakt', '_zbiorcze_email') AND meta_value = %s)";
        $params[] = $email;
    }
    
    $where_meta = implode( ' OR ', $meta_clauses );
    
    $query = $wpdb->prepare(
        "SELECT COUNT(DISTINCT post_id) 
         FROM {$wpdb->postmeta} pm
         JOIN {$wpdb->posts} p ON p.ID = pm.post_id
         WHERE p.post_type = %s 
           AND p.post_status = %s 
           AND ($where_meta)",
        $params
    );
    
    return (int) $wpdb->get_var( $query );
}


function mundula_pl_plural_zlecenie( $count ) {
    if ( $count === 1 ) {
        return '1 zlecenie';
    }
    
    $last_digit = $count % 10;
    $last_two = $count % 100;
    
    if ( in_array( $last_two, [11, 12, 13, 14] ) ) {
        return $count . ' zleceń';
    }
    
    if ( in_array( $last_digit, [2, 3, 4] ) ) {
        return $count . ' zlecenia';
    }
    
    return $count . ' zleceń';
}


function mundula_shift_priorities_on_completion( $post_id ) {
    static $is_running = false;
    if ( $is_running ) return;
    $is_running = true;

    $completed_prio = get_post_meta( $post_id, '_priorytet', true );
    if ( $completed_prio === '' ) {
        $is_running = false;
        return;
    }
    $completed_prio = (int)$completed_prio;
    $is_urgent = get_post_meta( $post_id, '_is_urgent', true ) === '1';

    // Usuń priorytet i flagę pilności zrealizowanego/anulowanego zlecenia
    delete_post_meta( $post_id, '_priorytet' );
    delete_post_meta( $post_id, '_is_urgent' );

    $active_posts = get_posts([
        'post_type'      => 'mundula_zgloszenie',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_query'     => [
            [
                'key'     => '_status',
                'value'   => [ 'zrealizowane', 'anulowane', 'wyslane_odebrane' ],
                'compare' => 'NOT IN',
            ]
        ],
        'fields'         => 'ids',
    ]);

    foreach ( $active_posts as $pid ) {
        $p_urgent = get_post_meta( $pid, '_is_urgent', true ) === '1';
        if ( $p_urgent === $is_urgent ) {
            $prio = get_post_meta( $pid, '_priorytet', true );
            if ( $prio !== '' ) {
                $prio = (int)$prio;
                if ( $prio > $completed_prio ) {
                    update_post_meta( $pid, '_priorytet', $prio - 1 );
                }
            }
        }
    }

    $is_running = false;
}


function mundula_shift_priorities_on_change_urgency( $post_id, $was_urgent, $old_prio ) {
    $active_posts = get_posts([
        'post_type'      => 'mundula_zgloszenie',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_query'     => [
            [
                'key'     => '_status',
                'value'   => [ 'zrealizowane', 'anulowane', 'wyslane_odebrane' ],
                'compare' => 'NOT IN',
            ]
        ],
        'fields'         => 'ids',
    ]);

    foreach ( $active_posts as $pid ) {
        if ( (int)$pid === (int)$post_id ) continue;
        $p_urgent = get_post_meta( $pid, '_is_urgent', true ) === '1';
        if ( $p_urgent === $was_urgent ) {
            $prio = get_post_meta( $pid, '_priorytet', true );
            if ( $prio !== '' ) {
                $prio = (int)$prio;
                if ( $prio > $old_prio ) {
                    update_post_meta( $pid, '_priorytet', $prio - 1 );
                }
            }
        }
    }
}


function mundula_reorder_priorities( $post_id, $new_prio, $is_urgent ) {
    $old_prio = get_post_meta( $post_id, '_priorytet', true );
    
    // Pobierz wszystkie aktywne w danej kolejce
    $active_posts = get_posts([
        'post_type'      => 'mundula_zgloszenie',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_query'     => [
            [
                'key'     => '_status',
                'value'   => [ 'zrealizowane', 'anulowane', 'wyslane_odebrane' ],
                'compare' => 'NOT IN',
            ]
        ],
        'fields'         => 'ids',
    ]);
    
    $queue_posts = [];
    foreach ( $active_posts as $pid ) {
        $p_urgent = get_post_meta( $pid, '_is_urgent', true ) === '1';
        if ( $p_urgent === $is_urgent ) {
            $prio = get_post_meta( $pid, '_priorytet', true );
            if ( $prio !== '' ) {
                $queue_posts[$pid] = (int)$prio;
            }
        }
    }
    
    // Sortuj tablicę po priorytecie
    asort($queue_posts);
    $max_prio = !empty($queue_posts) ? max($queue_posts) : -1;
    
    // Korekta nowego priorytetu poza zakresem
    if ( $new_prio > $max_prio + 1 ) {
        $new_prio = $max_prio + 1;
    }
    if ( $new_prio < 0 ) {
        $new_prio = 0;
    }
    
    if ( $old_prio === '' ) {
        // Nowy priorytet (wstawienie)
        foreach ( $queue_posts as $pid => $prio ) {
            if ( $prio >= $new_prio ) {
                update_post_meta( $pid, '_priorytet', $prio + 1 );
            }
        }
        update_post_meta( $post_id, '_priorytet', $new_prio );
    } else {
        $old_prio = (int)$old_prio;
        if ( $old_prio === $new_prio ) return;
        
        if ( $new_prio < $old_prio ) {
            // Przeniesienie w górę (np. 3 -> 1): zwiększ priorytety pomiędzy new a old
            foreach ( $queue_posts as $pid => $prio ) {
                if ( $pid === $post_id ) continue;
                if ( $prio >= $new_prio && $prio < $old_prio ) {
                    update_post_meta( $pid, '_priorytet', $prio + 1 );
                }
            }
        } else {
            // Przeniesienie w dół (np. 1 -> 3): zmniejsz priorytety pomiędzy old a new
            foreach ( $queue_posts as $pid => $prio ) {
                if ( $pid === $post_id ) continue;
                if ( $prio > $old_prio && $prio <= $new_prio ) {
                    update_post_meta( $pid, '_priorytet', $prio - 1 );
                }
            }
        }
        update_post_meta( $post_id, '_priorytet', $new_prio );
    }
}


function mundula_ajax_priorytet() {
    check_ajax_referer( 'mundula_admin_nonce', 'nonce' );
    if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error();
    $post_id   = absint( $_POST['post_id']   ?? 0 );
    $priorytet = absint( $_POST['priorytet'] ?? 0 );
    $is_urgent = get_post_meta( $post_id, '_is_urgent', true ) === '1';
    
    mundula_reorder_priorities( $post_id, $priorytet, $is_urgent );
    wp_send_json_success();
}
add_action( 'wp_ajax_mundula_priorytet', 'mundula_ajax_priorytet' );




function mundula_status_meta_hook( $meta_id, $post_id, $meta_key, $meta_value ) {
    if ( get_post_type( $post_id ) !== 'mundula_zgloszenie' ) return;
    if ( $meta_key !== '_status' ) return;

    if ( $meta_value === 'zrealizowane' || $meta_value === 'anulowane' || $meta_value === 'wyslane_odebrane' ) {
        mundula_shift_priorities_on_completion( $post_id );
    } else {
        // Jeśli status jest aktywny i zlecenie nie ma priorytetu, nadaj kolejny wolny priorytet
        $prio = get_post_meta( $post_id, '_priorytet', true );
        if ( $prio === '' ) {
            $is_urgent = get_post_meta( $post_id, '_is_urgent', true ) === '1';
            update_post_meta( $post_id, '_priorytet', mundula_get_next_priority( $is_urgent, $post_id ) );
        }
    }
}
add_action( 'updated_post_meta', 'mundula_status_meta_hook', 10, 4 );
add_action( 'added_post_meta',   'mundula_status_meta_hook', 10, 4 );


if ( ! function_exists( 'mb_ucfirst' ) ) {
    function mb_ucfirst( $str, $encoding = 'UTF-8' ) {
        $firstChar = mb_substr( $str, 0, 1, $encoding );
        $then = mb_substr( $str, 1, null, $encoding );
        return mb_strtoupper( $firstChar, $encoding ) . $then;
    }
}

