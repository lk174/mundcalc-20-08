<?php
/**
 * Mundula — Kalkulator obszycia mundurów
 * Wersja: 2.0
 *
 * Umieść pliki w: /wp-content/kalkulator/
 *   - kalkulator.html
 *   - functions.php (ten plik)
 *
 * Dodaj do functions.php motywu dziecko:
 * require_once WP_CONTENT_DIR . '/kalkulator/functions.php';
 */

// ── PANEL ADMIN ──────────────────────────────────────────────
$mundula_admin = WP_CONTENT_DIR . '/kalkulator/mundula-admin.php';
if ( file_exists( $mundula_admin ) ) require_once $mundula_admin;

// ── SHORTCODE ────────────────────────────────────────────────
function mundula_kalkulator_shortcode() {
    $file = WP_CONTENT_DIR . '/kalkulator/mundula-kalkulator.html';
    if ( ! file_exists( $file ) ) {
        return '<!-- mundula: brak pliku kalkulator.html -->';
    }
    ob_start();
    include $file;
    return ob_get_clean();
}
add_shortcode( 'mundula_kalkulator', 'mundula_kalkulator_shortcode' );

// ── SKRYPTY I STYLE ──────────────────────────────────────────
function mundula_enqueue_scripts() {
    global $post;
    $is_kalkulator = is_page( 'cennik' ) || 
        ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'mundula_kalkulator' ) );

    if ( $is_kalkulator ) {
        // Style i skrypty kalkulatora
        wp_enqueue_style( 'mundula-kalkulator-css', content_url( '/kalkulator/mundula-kalkulator.css' ), [], '3.4' );
        wp_enqueue_script( 'mundula-kalkulator-js', content_url( '/kalkulator/mundula-kalkulator.js' ), [ 'jquery' ], '3.4', true );

        // Dane AJAX
        wp_add_inline_script(
            'mundula-kalkulator-js',
            'var mundula_ajax = ' . json_encode([
                'url'   => admin_url( 'admin-ajax.php' ),
                'nonce' => wp_create_nonce( 'mundula_nonce' ),
            ]) . ';',
            'before'
        );
    }
}
add_action( 'wp_enqueue_scripts', 'mundula_enqueue_scripts' );


// ── CUSTOM POST TYPE — HISTORIA ZGŁOSZEŃ ────────────────────
function mundula_register_cpt() {
    register_post_type( 'mundula_zgloszenie', [
        'labels' => [
            'name'               => 'Zgłoszenia Mundula',
            'singular_name'      => 'Zgłoszenie',
            'add_new'            => 'Dodaj zgłoszenie',
            'add_new_item'       => 'Dodaj nowe zgłoszenie',
            'edit_item'          => 'Edytuj zgłoszenie',
            'view_item'          => 'Zobacz zgłoszenie',
            'all_items'          => 'Wszystkie zgłoszenia',
            'search_items'       => 'Szukaj zgłoszeń',
            'not_found'          => 'Brak zgłoszeń',
            'not_found_in_trash' => 'Brak zgłoszeń w koszu',
        ],
        'public'              => false,
        'show_ui'             => false,
        'show_in_menu'        => false,
        'menu_position'       => 30,
        'menu_icon'           => 'dashicons-clipboard',
        'supports'            => [ 'title', 'custom-fields' ],
        'capability_type'     => 'post',
        'capabilities'        => [
            'create_posts'        => 'do_not_allow',
            'edit_posts'          => 'manage_options',
            'edit_others_posts'   => 'manage_options',
            'publish_posts'       => 'manage_options',
            'read_private_posts'  => 'manage_options',
            'delete_posts'        => 'manage_options',
            'delete_others_posts' => 'manage_options',
        ],
        'map_meta_cap'        => true,
    ] );
}
add_action( 'init', 'mundula_register_cpt' );

// Funkcja pomocnicza do zapisu zgłoszenia
function mundula_save_zgloszenie( $typ, $meta ) {
    $tytul = $typ . ' — ' . current_time( 'd.m.Y H:i' );
    $post_id = wp_insert_post( [
        'post_title'  => $tytul,
        'post_type'   => 'mundula_zgloszenie',
        'post_status' => 'publish',
    ] );
    if ( $post_id && ! is_wp_error( $post_id ) ) {
        foreach ( $meta as $key => $val ) {
            update_post_meta( $post_id, $key, $val );
        }
    }
    return $post_id;
}

// ── FUNKCJE POMOCNICZE ───────────────────────────────────────


// Wyciąga rodzaj munduru z ścieżki nawigacji
function mundula_rodzaj_z_path( $path ) {
    if ( empty($path) ) return '';
    $mapa = [
        'Wojska Lądowe'           => 'wl',
        'Siły Powietrzne'         => 'sp',
        'Marynarka Wojenna'       => 'mw',
        'Służba Więzienna'        => 'sw',
        'Straż Graniczna'         => 'sg',
        'Państwowa Straż Pożarna' => 'psp',
        'Wojsko Polskie'          => 'wl',
    ];
    foreach ( array_reverse( (array)$path ) as $label ) {
        $label = (string)$label;
        foreach ( $mapa as $nazwa => $kod ) {
            if ( mb_stripos( $label, $nazwa ) !== false ) return $kod;
        }
    }
    return '';
}

// Wyciąga stopień obszyty i nowy z rows (collected)
function mundula_extract_stopnie( $rows ) {
    $res = [ 'obszyty' => '', 'nowy' => '' ];
    if ( empty($rows) ) return $res;
    foreach ( (array)$rows as $row ) {
        if ( !is_array($row) ) continue;
        $item  = (string)( $row['itemLabel'] ?? '' );
        $step  = (string)( $row['stepLabel'] ?? '' );
        if ( empty($item) ) continue;

        // "Kapral → Sierżant — zmiana dystynkcji"
        // Znak → (U+2192) jako UTF-8: \xe2\x86\x92
        if ( mb_strpos($item, "\xe2\x86\x92") !== false ) {
            $parts = explode("\xe2\x86\x92", $item, 2);
            if ( isset($parts[0]) && isset($parts[1]) ) {
                $before = trim($parts[0]);
                $after = trim($parts[1]);
                $after = preg_replace('/\s*[\x{2014}\x{2013}\-].*/u', '', $after);
                $res['obszyty'] = $before;
                $res['nowy'] = trim($after);
                return $res;
            }
        }
        // "Kapral — obszycie dystynkcji (stopień)" gdy stepLabel zawiera "Stopień"
        if ( mb_stripos($step, 'stopie') !== false ) {
            $before = preg_replace('/\s*[\x{2014}\x{2013}\-].*/u', '', $item);
            $res['nowy'] = trim($before);
            return $res;
        }
    }
    return $res;
}

// Wyciąga stopień z rows (collected)
function mundula_stopien_z_rows( $rows ) {
    $stopnie = mundula_extract_stopnie( $rows );
    return $stopnie['nowy'];
}


// ── AJAX: REZERWACJA TERMINU ─────────────────────────────────
function mundula_booking_handler() {
    // 1. Weryfikacja nonce
    if ( ! check_ajax_referer( 'mundula_nonce', 'nonce', false ) ) {
        wp_send_json_error( [ 'message' => 'Nieprawidłowy token.' ], 403 );
    }

    // 2. Sanityzacja i walidacja danych
    $date_deliver = mundula_parse_date( $_POST['date_deliver'] ?? '' );
    $date_needed  = mundula_parse_date( $_POST['date_needed']  ?? '' );
    $contact      = sanitize_text_field( $_POST['contact']      ?? '' );
    $total        = absint( $_POST['total'] ?? 0 );
    $rows_raw     = wp_unslash( $_POST['rows'] ?? '[]' );

    // Walidacja dat
    if ( ! $date_deliver || ! $date_needed ) {
        wp_send_json_error( [ 'message' => 'Nieprawidłowy format daty.' ], 400 );
    }

    // Walidacja i rozróżnienie email/telefon
    if ( empty( $contact ) ) {
        wp_send_json_error( [ 'message' => 'Brak danych kontaktowych.' ], 400 );
    }
    // Sprawdź czy contact to email czy telefon
    $contact_email   = is_email( $contact ) ? $contact : '';
    $contact_telefon = $contact_email ? '' : $contact;

    // Bezpieczne dekodowanie JSON z pozycjami
    $rows = json_decode( $rows_raw, true );
    if ( ! is_array( $rows ) ) {
        $rows = [];
    }

    // Wyciągnij path, rodzaj munduru i stopnie
    $path_raw = wp_unslash( $_POST['path'] ?? '[]' );
    $path     = json_decode( (string)$path_raw, true ) ?: [];
    $rodzaj   = mundula_rodzaj_z_path( $path );
    $stopnie  = mundula_extract_stopnie( $rows );

    // Wyciągnij express_mode z formularza kalkulatora
    $express_mode = sanitize_text_field( $_POST['express_mode'] ?? 'standard' );
    $is_urgent    = ( $express_mode === 'express' || $express_mode === 'weekend' ) ? '1' : '0';

    // 3. Buduj treść maila
    $to      = 'info@mundula.pl';
    // Unikalny numer porządkowy
    $counter  = (int) get_option( 'mundula_booking_counter', 0 ) + 1;
    update_option( 'mundula_booking_counter', $counter );
    $nr       = str_pad( $counter, 4, '0', STR_PAD_LEFT );
    $subject  = '[Mundula] Rezerwacja #' . $nr . ' — ' . esc_html( mundula_format_date( $date_deliver ) ) . ' ' . current_time( 'H:i' );
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'From: Kalkulator Mundula <noreply@mundula.pl>',
    ];

    $body  = "Nowe zgłoszenie rezerwacji obszycia munduru.\n\n";
    $body .= "Data dostarczenia: " . esc_html( mundula_format_date( $date_deliver ) ) . "\n";
    $body .= "Potrzebne do: "      . esc_html( mundula_format_date( $date_needed ) )  . "\n";
    $body .= "Kontakt: "           . esc_html( $contact )      . "\n";
    $body .= "Szacunkowa kwota usługi (netto): " . $total . " zł\n\n";
    $body .= "Zakres prac:\n";

    foreach ( $rows as $row ) {
        if ( ! is_array( $row ) ) continue;
        $elem  = sanitize_text_field( $row['elemLabel']  ?? '' );
        $item  = sanitize_text_field( $row['itemLabel']  ?? '' );
        $price = absint( $row['price'] ?? 0 );
        $body .= "  - {$elem}: {$item} — {$price} zł\n";
    }

    $sent = wp_mail( $to, $subject, $body, $headers );

    // Check if the client is marked as difficult based on past orders
    $is_trudny = '0';
    $meta_queries = [];
    if ( $contact_email ) {
        $meta_queries[] = [
            'key'     => '_email',
            'value'   => $contact_email,
            'compare' => '='
        ];
    }
    if ( $contact_telefon ) {
        $meta_queries[] = [
            'key'     => '_telefon',
            'value'   => $contact_telefon,
            'compare' => '='
        ];
        // Kalkulator sends phone number as _kontakt, but in admin it's saved as _telefon.
        // It could also still be in _kontakt for old orders.
        $meta_queries[] = [
            'key'     => '_kontakt',
            'value'   => $contact_telefon,
            'compare' => '='
        ];
    }
    
    if ( ! empty( $meta_queries ) ) {
        $meta_queries['relation'] = 'OR';
        
        $past_orders = get_posts([
            'post_type'      => 'mundula_zgloszenie',
            'posts_per_page' => 1,
            'meta_query'     => [
                'relation' => 'AND',
                [
                    'key'     => '_trudny_klient',
                    'value'   => '1',
                    'compare' => '='
                ],
                $meta_queries
            ],
            'fields' => 'ids'
        ]);
        if ( ! empty( $past_orders ) ) {
            $is_trudny = '1';
        }
    }

    // Zapisz do bazy danych
    $pid = mundula_save_zgloszenie( 'Rezerwacja', [
        '_status'        => 'rezerwacja',
        '_nr'            => $nr,
        '_kwota'         => $total,
        '_kontakt'       => $contact_telefon,
        '_email'         => $contact_email,
        '_data_dostawy'  => $date_deliver,
        '_data_potrzebna'=> $date_needed,
        '_zakres_json'   => json_encode( $rows, JSON_UNESCAPED_UNICODE ),
        '_rodzaj_munduru'=> $rodzaj,
        '_stopien'       => $stopnie['nowy'],
        '_stopien_obszyty'=> $stopnie['obszyty'],
        '_path'          => implode( ' › ', $path ),
        '_ip_hash'       => hash( 'sha256', ( $_SERVER['REMOTE_ADDR'] ?? '' ) . AUTH_SALT ),
        '_trudny_klient' => $is_trudny,
        '_is_urgent'     => $is_urgent,
    ] );

    // Szukaj czy była wcześniej wysłana wycena dla tego e-maila lub telefonu
    $meta_queries = [];
    if ( $contact_email ) {
        $meta_queries[] = [ 'key' => '_email', 'value' => $contact_email ];
    }
    if ( $contact_telefon ) {
        $meta_queries[] = [ 'key' => '_kontakt', 'value' => $contact_telefon ];
    }
    
    if ( ! empty( $meta_queries ) ) {
        $meta_queries['relation'] = 'OR';
        $powiazana_wycena = get_posts([
            'post_type'  => 'mundula_zgloszenie',
            'meta_query' => [
                'relation' => 'AND',
                [
                    'key'     => '_status',
                    'value'   => 'wycena',
                    'compare' => '='
                ],
                $meta_queries
            ],
            'posts_per_page' => 1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);
        
        if ( ! empty( $powiazana_wycena ) ) {
            $wycena_date = get_the_date( 'd.m.Y H:i', $powiazana_wycena[0]->ID );
            update_post_meta( $pid, '_wycena_wyslana', $contact_email ?: $contact_telefon );
            update_post_meta( $pid, '_wycena_data', $wycena_date );
        }
    }

    if ( $sent ) {
        wp_send_json_success( [ 'message' => 'Rezerwacja wysłana.' ] );
    } else {
        wp_send_json_error( [ 'message' => 'Błąd wysyłki. Skontaktuj się telefonicznie.' ], 500 );
    }
}
add_action( 'wp_ajax_mundula_booking',        'mundula_booking_handler' );
add_action( 'wp_ajax_nopriv_mundula_booking', 'mundula_booking_handler' );

// ── AJAX: WYSYŁKA WYCENY NA EMAIL ────────────────────────────
function mundula_quote_handler() {
    // 1. Weryfikacja nonce
    if ( ! check_ajax_referer( 'mundula_nonce', 'nonce', false ) ) {
        wp_send_json_error( [ 'message' => 'Nieprawidłowy token.' ], 403 );
    }

    // 2. Sanityzacja i walidacja
    $email    = sanitize_email( $_POST['email'] ?? '' );
    $total    = absint( $_POST['total'] ?? 0 );
    $rows_raw = wp_unslash( $_POST['rows'] ?? '[]' );

    if ( ! is_email( $email ) ) {
        wp_send_json_error( [ 'message' => 'Nieprawidłowy adres e-mail.' ], 400 );
    }

    // Rate limiting — max 3 wyceny z jednego IP na godzinę
    $ip_key   = 'mundula_quote_' . md5( $_SERVER['REMOTE_ADDR'] ?? '' );
    $attempts = (int) get_transient( $ip_key );
    if ( $attempts >= 8 ) {
        wp_send_json_error( [ 'message' => 'Zbyt wiele żądań. Spróbuj ponownie za godzinę.' ], 429 );
    }
    set_transient( $ip_key, $attempts + 1, HOUR_IN_SECONDS );

    // 3. Bezpieczne dekodowanie JSON
    $rows = json_decode( $rows_raw, true );
    if ( ! is_array( $rows ) ) {
        $rows = [];
    }

    // 4. Buduj email do klienta
    $subject = 'Wycena obszycia munduru — Mundula';

    $body  = "Dziękujemy za skorzystanie z kalkulatora Mundula.\n\n";
    $body .= "Poniżej znajdziesz podsumowanie wyceny:\n\n";

    $current_elem = '';
    foreach ( $rows as $row ) {
        if ( ! is_array( $row ) ) continue;
        $elem  = sanitize_text_field( $row['elemLabel']  ?? '' );
        $item  = sanitize_text_field( $row['itemLabel']  ?? '' );
        $price = absint( $row['price'] ?? 0 );

        if ( $elem !== $current_elem ) {
            $body .= "\n{$elem}:\n";
            $current_elem = $elem;
        }
        $body .= "  - {$item} — {$price} zł\n";
    }

    $body .= "\nŁączna kwota usługi obszycia: {$total} zł\n";
    $body .= "\nJest to wstępna wycena netto. Skontaktuj się z nami aby potwierdzić termin:\n";
    $body .= "✉ info@mundula.pl\n";
    $body .= "☎ +48 508 768 636\n\n";
    $body .= "Mundula — obszycie mundurów\nhttps://mundula.pl\n";

    $headers = [ 'Content-Type: text/plain; charset=UTF-8' ];
    wp_mail( $email, $subject, $body, $headers );

    // Kopia do admina
    wp_mail( 'info@mundula.pl', '[Mundula] Wycena wysłana do: ' . $email,
        "Wycena wysłana.\n\nEmail: {$email}\nKwota: {$total} zł\n\n" . $body,
        [ 'Content-Type: text/plain; charset=UTF-8', 'From: Kalkulator Mundula <noreply@mundula.pl>' ]
    );

    // Wyciągnij path dla wyceny
    $path_raw_q = wp_unslash( $_POST['path'] ?? '[]' );
    $path_q     = json_decode( $path_raw_q, true ) ?: [];

    // Zapisz do bazy danych — szukaj czy jest powiązana rezerwacja (ten sam email)
    $powiazana_rez = get_posts([
        'post_type'  => 'mundula_zgloszenie',
        'meta_query' => [
            ['key'=>'_email',  'value'=>$email],
            ['key'=>'_status', 'value'=>'rezerwacja'],
        ],
        'posts_per_page' => 1,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);
    if ( ! empty($powiazana_rez) ) {
        update_post_meta( $powiazana_rez[0]->ID, '_wycena_wyslana', $email );
        update_post_meta( $powiazana_rez[0]->ID, '_wycena_data', current_time('d.m.Y H:i') );
    }

    // Check if the client is marked as difficult based on past orders
    $is_trudny_q = '0';
    if ( $email ) {
        $past_orders_q = get_posts([
            'post_type'      => 'mundula_zgloszenie',
            'posts_per_page' => 1,
            'meta_query'     => [
                'relation' => 'AND',
                [
                    'key'     => '_trudny_klient',
                    'value'   => '1',
                    'compare' => '='
                ],
                [
                    'key'     => '_email',
                    'value'   => $email,
                    'compare' => '='
                ]
            ],
            'fields' => 'ids'
        ]);
        if ( ! empty( $past_orders_q ) ) {
            $is_trudny_q = '1';
        }
    }

    $stopnie_q = mundula_extract_stopnie( $rows );
    mundula_save_zgloszenie( 'Wycena', [
        '_status'        => 'wycena',
        '_kwota'         => $total,
        '_email'         => $email,
        '_zakres_json'   => json_encode( $rows, JSON_UNESCAPED_UNICODE ),
        '_rodzaj_munduru'=> mundula_rodzaj_z_path( $path_q ),
        '_stopien'       => $stopnie_q['nowy'],
        '_stopien_obszyty'=> $stopnie_q['obszyty'],
        '_path'          => implode( ' › ', $path_q ),
        '_ip_hash'       => hash( 'sha256', ( $_SERVER['REMOTE_ADDR'] ?? '' ) . AUTH_SALT ),
        '_trudny_klient' => $is_trudny_q,
    ] );

    wp_send_json_success( [ 'message' => 'Wycena wysłana.' ] );
}
add_action( 'wp_ajax_mundula_quote',        'mundula_quote_handler' );
add_action( 'wp_ajax_nopriv_mundula_quote', 'mundula_quote_handler' );



// ── HELPERY DO DAT ───────────────────────────────────────────
/**
 * Konwertuje dowolną datę na format YYYY-MM-DD (dla zapisu do bazy i HTML5 date input)
 */
function mundula_parse_date( $date_str ) {
    $date_str = trim( (string) $date_str );
    if ( empty( $date_str ) ) return '';

    // Szybka ścieżka: Jeśli już jest w formacie YYYY-MM-DD HH:MM:SS, YYYY-MM-DD HH:MM lub YYYY-MM-DD
    if ( preg_match( '/^\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}(?::\d{2})?)?$/', $date_str ) ) {
        return $date_str;
    }

    // Formaty zawierające czas
    $datetime_formats = [
        'Y-m-d\TH:i:s',
        'Y-m-d\TH:i',
        'd.m.Y H:i:s',
        'd.m.Y H:i',
        'd-m-Y H:i:s',
        'd-m-Y H:i',
    ];

    foreach ( $datetime_formats as $fmt ) {
        $dt = DateTime::createFromFormat( '!' . $fmt, $date_str );
        if ( $dt !== false ) {
            $errs = DateTime::getLastErrors();
            if ( $errs === false || ( $errs['warning_count'] === 0 && $errs['error_count'] === 0 ) ) {
                if ( (int) $dt->format( 'Y' ) >= 1000 ) {
                    return $dt->format( 'Y-m-d H:i:00' );
                }
            }
        }
    }

    // Formaty bez czasu
    $date_formats = [
        'd.m.Y',
        'd-m-Y',
    ];

    foreach ( $date_formats as $fmt ) {
        $dt = DateTime::createFromFormat( '!' . $fmt, $date_str );
        if ( $dt !== false ) {
            $errs = DateTime::getLastErrors();
            if ( $errs === false || ( $errs['warning_count'] === 0 && $errs['error_count'] === 0 ) ) {
                if ( (int) $dt->format( 'Y' ) >= 1000 ) {
                    return $dt->format( 'Y-m-d' );
                }
            }
        }
    }

    // Próba ogólna (fallback)
    $timestamp = strtotime( str_replace( '.', '-', $date_str ) );
    if ( ! $timestamp ) {
        $timestamp = strtotime( $date_str );
    }
    
    if ( $timestamp ) {
        if ( strpos( $date_str, ':' ) !== false ) {
            return date( 'Y-m-d H:i:s', $timestamp );
        }
        return date( 'Y-m-d', $timestamp );
    }
    
    return '';
}

/**
 * Formatuje datę do polskiego formatu DD.MM.YYYY dla wyświetlania i maili
 */
function mundula_format_date( $date_str ) {
    $date_str = trim( (string) $date_str );
    if ( empty( $date_str ) ) return '';

    // Jeśli jest już w formacie DD.MM.YYYY HH:MM
    if ( preg_match( '/^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/', $date_str ) ) {
        return $date_str;
    }

    // Jeśli już jest DD.MM.YYYY
    if ( preg_match( '/^\d{2}\.\d{2}\.\d{4}$/', $date_str ) ) {
        return $date_str;
    }

    $parsed = mundula_parse_date( $date_str );
    if ( ! $parsed ) return $date_str;

    $timestamp = strtotime( $parsed );
    if ( ! $timestamp ) return $date_str;
    
    // Jeśli w $parsed jest spacja i dwukropek, to ma czas
    if ( strpos( $parsed, ' ' ) !== false && strpos( $parsed, ':' ) !== false ) {
        return date( 'd.m.Y H:i', $timestamp );
    }
    
    return date( 'd.m.Y', $timestamp );
}

/**
 * Zwraca datę w formacie YYYY-MM-DD do użycia w value="..." pola input[type="date"]
 */
function mundula_format_date_input( $date_str ) {
    return mundula_parse_date( $date_str );
}

