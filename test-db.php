<?php
define('WP_USE_THEMES', false);
if ( file_exists( __DIR__ . '/../../wp-load.php' ) ) {
    require_once __DIR__ . '/../../wp-load.php';
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Dostęp zabroniony.' );
    }
} else {
    wp_die( 'Nie można załadować środowiska WordPress.' );
}

$option = get_option('mundula_price_change', []);
$file = WP_CONTENT_DIR . '/kalkulator/mundula-price-change-default.json';
$raw_json = [];
if (file_exists($file)) {
    $content = file_get_contents($file);
    if ( substr($content, 0, 3) === pack("CCC", 0xef, 0xbb, 0xbf) ) {
        $content = substr($content, 3);
    }
    $raw_json = json_decode($content, true) ?: [];
}

echo '<h3>Porównanie PRICE_CHANGE_FURAZERKA:</h3>';

$mkey = 'PRICE_CHANGE_FURAZERKA';
if (isset($option[$mkey])) {
    echo "Wielkość w DB: " . count($option[$mkey]) . " wierszy.<br>";
    if (isset($option[$mkey]['s1'])) {
        echo "Wiersz s1 w DB:<pre>";
        print_r($option[$mkey]['s1']);
        echo "</pre>";
    } else {
        echo "Wiersz s1 NIE istnieje w DB!<br>";
    }
} else {
    echo "Matryca PRICE_CHANGE_FURAZERKA NIE istnieje w DB!<br>";
}

if (isset($raw_json[$mkey])) {
    echo "Wielkość w JSON: " . count($raw_json[$mkey]) . " wierszy.<br>";
    if (isset($raw_json[$mkey]['s1'])) {
        echo "Wiersz s1 w JSON:<pre>";
        print_r($raw_json[$mkey]['s1']);
        echo "</pre>";
    } else {
        echo "Wiersz s1 NIE istnieje w JSON!<br>";
    }
} else {
    echo "Matryca PRICE_CHANGE_FURAZERKA NIE istnieje w JSON!<br>";
}
