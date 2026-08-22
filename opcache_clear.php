<?php
// Samodzielny skrypt do czyszczenia pamięci podręcznej OPcache serwera
define('WP_USE_THEMES', false);
if ( file_exists( __DIR__ . '/../../wp-load.php' ) ) {
    require_once __DIR__ . '/../../wp-load.php';
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Dostęp zabroniony.' );
    }
} else {
    wp_die( 'Nie można załadować środowiska WordPress.' );
}

header('Content-Type: text/plain; charset=utf-8');

echo "Inicjowanie czyszczenia OPcache...
";

if ( function_exists( 'opcache_reset' ) ) {
    if ( opcache_reset() ) {
        echo "SUKCES: OPcache został pomyślnie zresetowany!
";
    } else {
        echo "BŁĄD: Wywołanie opcache_reset() zwróciło false (brak uprawnień lub błąd).
";
    }
} else {
    echo "INFORMACJA: Rozszerzenie OPcache nie jest włączone lub funkcja opcache_reset() jest zablokowana na serwerze.
";
}

// Sprawdźmy też APCu i inne popularne cache
if ( function_exists( 'apc_clear_cache' ) ) {
    apc_clear_cache();
    echo "SUKCES: APC cache wyczyszczone.
";
}
if ( function_exists( 'apcu_clear_cache' ) ) {
    apcu_clear_cache();
    echo "SUKCES: APCu cache wyczyszczone.
";
}

echo "Gotowe.
";
