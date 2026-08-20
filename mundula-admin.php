<?php
/**
 * Plik: /wp-content/kalkulator/mundula-admin.php
 * Wrapper ładujący moduły panelu administracyjnego
 */

if ( ! defined( 'ABSPATH' ) ) exit;

require_once __DIR__ . '/admin-core.php';
require_once __DIR__ . '/admin-cennik.php';
require_once __DIR__ . '/admin-orders-list.php';
require_once __DIR__ . '/admin-orders-edit.php';
