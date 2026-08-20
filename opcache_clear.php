<?php
// Samodzielny skrypt do czyszczenia pamięci podręcznej OPcache serwera
header('Content-Type: text/plain; charset=utf-8');

echo "Inicjowanie czyszczenia OPcache...\n";

if ( function_exists( 'opcache_reset' ) ) {
    if ( opcache_reset() ) {
        echo "SUKCES: OPcache został pomyślnie zresetowany!\n";
    } else {
        echo "BŁĄD: Wywołanie opcache_reset() zwróciło false (brak uprawnień lub błąd).\n";
    }
} else {
    echo "INFORMACJA: Rozszerzenie OPcache nie jest włączone lub funkcja opcache_reset() jest zablokowana na serwerze.\n";
}

// Sprawdźmy też APCu i inne popularne cache
if ( function_exists( 'apc_clear_cache' ) ) {
    apc_clear_cache();
    echo "SUKCES: APC cache wyczyszczone.\n";
}
if ( function_exists( 'apcu_clear_cache' ) ) {
    apcu_clear_cache();
    echo "SUKCES: APCu cache wyczyszczone.\n";
}

echo "Gotowe.\n";
