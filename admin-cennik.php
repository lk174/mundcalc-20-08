<?php
function mundula_stawki_default() {
    $file = WP_CONTENT_DIR . '/kalkulator/mundula-stawki-default.json';
    if ( ! file_exists($file) ) return [];
    $content = file_get_contents( $file );
    if ( substr($content, 0, 3) === pack("CCC", 0xef, 0xbb, 0xbf) ) {
        $content = substr($content, 3);
    }
    return json_decode( $content, true ) ?: [];
}


function mundula_stawki_get() {
    $saved = get_option( 'mundula_stawki', [] );
    if ( empty($saved) ) return mundula_stawki_default();

    $default = mundula_stawki_default();
    $changed = false;

    // Zapewniamy spójność wszystkich nowo dodanych stawek z pliku domyślnego
    // oraz WYMUSZAMY poprawne, osobne grupy cennikowe (np. marynarka, beret, czapka)
    foreach ( $default as $id => $item ) {
        if ( ! isset($saved[$id]) ) {
            $saved[$id] = $item;
            $changed = true;
        } else {
            // Zapobiegamy łączeniu cenników stopni - nadpisujemy g, t oraz etykiety l z pliku domyślnego
            if ( ! isset($saved[$id]['g']) || $saved[$id]['g'] !== $item['g'] || ! isset($saved[$id]['t']) || $saved[$id]['t'] !== $item['t'] || ! isset($saved[$id]['l']) || $saved[$id]['l'] !== $item['l'] ) {
                $saved[$id]['g'] = $item['g'];
                $saved[$id]['t'] = $item['t'];
                $saved[$id]['l'] = $item['l'];
                $changed = true;
            }
            // Zapewnienie stawek ekspresowych z bazy
            if (strpos($id, 'express_') === 0 && !isset($saved[$id]['p'])) {
                $saved[$id]['p'] = $item['p'];
                $changed = true;
            }
        }
    }

    // Usuwamy stawki, które zostały wycofane z pliku domyślnego
    foreach ( $saved as $id => $item ) {
        if ( ! isset($default[$id]) ) {
            unset($saved[$id]);
            $changed = true;
        }
    }

    // Usunięcie starych baretek b2 i b3 oraz aktualizacja b1
    if ( isset($saved['b2']) || isset($saved['b3']) || (isset($saved['b1']) && $saved['b1']['l'] !== 'Baretka jednorzędowa - umieszczenie / obszycie (dostarczę własną)') ) {
        unset($saved['b2']);
        unset($saved['b3']);
        if ( isset($saved['b1']) ) {
            $saved['b1']['l'] = 'Baretka jednorzędowa - umieszczenie / obszycie (dostarczę własną)';
        }
        $changed = true;
    }

    // Dynamiczna migracja/ujednolicenie nazw grup stawek w bazie (tylko dla oznak/naszywek)
    $group_mapping = [
        'Oznaki WP/SP (nowy mundur wyjściowy)'    => 'Oznaki WL/SP (nowy mundur galowy, wyjściowy)',
        'Oznaki WP/SP (mundur szkolny)'           => 'Oznaki WL/SP (mundur szkolny)',
        'Oznaki WP/SP (zmiana stopnia szkolny)'   => 'Oznaki WL/SP (zmiana stopnia mundur szkolny)',
        'Oznaki WP/SP (płaszcz)'                  => 'Oznaki WL/SP (płaszcz)',
        'Oznaki (beret)'                          => 'Oznaki (beret galowy, wyjściowy)',
        'Oznaki SW (nowy mundur)'                 => 'Oznaki SW (nowy mundur letni, zimowy)',
        'Oznaki SG (nowy mundur)'                 => 'Oznaki SG (nowy mundur galowy)',
        'Oznaki PSP (nowy mundur)'                => 'Oznaki PSP (nowy mundur galowy)',
    ];

    foreach ( $saved as $id => &$item ) {
        // Naprawa kodowania etykiet i grup na bieżąco
        if ( isset($item['l']) ) {
            $old_l = $item['l'];
            $new_l = mundula_clean_encoding($old_l);
            if ( $old_l !== $new_l ) {
                $item['l'] = $new_l;
                $changed = true;
            }
        }
        if ( isset($item['g']) ) {
            $old_g = $item['g'];
            $new_g = mundula_clean_encoding($old_g);
            if ( $old_g !== $new_g ) {
                $item['g'] = $new_g;
                $changed = true;
            }
        }

        if ( isset($item['g']) ) {
            $g = $item['g'];
            $g_norm = trim($g);

            if ( isset($group_mapping[$g_norm]) ) {
                $item['g'] = $group_mapping[$g_norm];
                $changed = true;
            }
        }
    }
    unset($item);

    if ( $changed ) {
        update_option( 'mundula_stawki', $saved );
    }

    return $saved;
}


function mundula_ajax_stawki() {
    $stawki = mundula_stawki_get();
    // Zwróć tylko id => p (cena)
    $prices = [];
    foreach ( $stawki as $id => $item ) {
        $prices[$id] = (int)($item['p'] ?? 0);
    }
    wp_send_json_success( $prices );
}
add_action( 'wp_ajax_mundula_stawki',        'mundula_ajax_stawki' );
add_action( 'wp_ajax_nopriv_mundula_stawki', 'mundula_ajax_stawki' );


function mundula_price_change_default() {
    $file = WP_CONTENT_DIR . '/kalkulator/mundula-price-change-default.json';
    $default = [];
    if ( file_exists($file) ) {
        $content = file_get_contents( $file );
        if ( substr($content, 0, 3) === pack("CCC", 0xef, 0xbb, 0xbf) ) {
            $content = substr($content, 3);
        }
        $default = json_decode( $content, true ) ?: [];
    }
    
    if ( ! empty($default) ) {
        // Fallback dla brakujących matryc w pliku domyślnym
        $m_fallbacks = [
            'PRICE_CHANGE_PLASZCZ',
            'PRICE_CHANGE_KOSZULA',
            'PRICE_CHANGE_CZAPKA_GOTOWY',
            'PRICE_CHANGE_CZAPKA_BAJOREK',
            'PRICE_CHANGE_BERET_GAL_GOTOWY',
            'PRICE_CHANGE_BERET_GAL_BAJOREK',
            'PRICE_CHANGE_BERET_POL',
            'PRICE_CHANGE_FURAZERKA',
            'PRICE_CHANGE_KAPELUSZ_GOTOWY',
            'PRICE_CHANGE_KAPELUSZ_BAJOREK'
        ];
        
        foreach ($m_fallbacks as $k) {
            if ( ! isset($default[$k]) ) {
                if ( $k === 'PRICE_CHANGE_PLASZCZ' || $k === 'PRICE_CHANGE_KOSZULA' ) {
                    $default[$k] = isset($default['PRICE_CHANGE']) ? $default['PRICE_CHANGE'] : [];
                } else {
                    $default[$k] = mundula_generate_default_matrix($k);
                }
            }
        }
    }
    return $default;
}


function mundula_generate_default_matrix($key) {
    $ranks = [];
    for ($i = 0; $i <= 17; $i++) {
        $ranks[] = "s{$i}";
    }
    
    $matrix = [];
    foreach ($ranks as $from) {
        $matrix[$from] = [];
        foreach ($ranks as $to) {
            if ($from === $to) {
                $matrix[$from][$to] = 0;
                continue;
            }
            
            $num_to = (int)substr($to, 1);
            
            switch ($key) {
                case 'PRICE_CHANGE_CZAPKA_GOTOWY':
                    $matrix[$from][$to] = 85;
                    break;
                    
                case 'PRICE_CHANGE_CZAPKA_BAJOREK':
                    $matrix[$from][$to] = ($num_to >= 12) ? 140 : 110;
                    break;
                    
                case 'PRICE_CHANGE_BERET_GAL_GOTOWY':
                    $matrix[$from][$to] = ($from === 's0') ? 70 : 95;
                    break;
                    
                case 'PRICE_CHANGE_BERET_GAL_BAJOREK':
                    $matrix[$from][$to] = ($num_to >= 12) ? 95 : 75;
                    break;
                    
                case 'PRICE_CHANGE_BERET_POL':
                    $matrix[$from][$to] = ($from === 's0') ? 45 : 70;
                    break;
                    
                case 'PRICE_CHANGE_FURAZERKA':
                    $matrix[$from][$to] = ($from === 's0') ? 35 : 60;
                    break;
                    
                case 'PRICE_CHANGE_KAPELUSZ_GOTOWY':
                    $base = ($num_to >= 12) ? 50 : 30;
                    $matrix[$from][$to] = ($from === 's0') ? $base : ($base + 20);
                    break;
                    
                case 'PRICE_CHANGE_KAPELUSZ_BAJOREK':
                    $base = ($num_to >= 12) ? 100 : 60;
                    $matrix[$from][$to] = ($from === 's0') ? $base : ($base + 20);
                    break;
                    
                default:
                    $matrix[$from][$to] = 0;
            }
        }
    }
    return $matrix;
}


function mundula_price_change_get() {
    $saved = get_option( 'mundula_price_change', [] );
    $default = mundula_price_change_default();
    if ( empty($default) ) {
        return empty($saved) ? [] : $saved;
    }

    if ( empty($saved) ) return $default;
    
    $changed = false;

    // Zapewnij obecność i poprawną kolejność etykiet (np. dla sw0 na początku)
    if ( ! isset($saved['_labels']) ) {
        $saved['_labels'] = $default['_labels'];
        $changed = true;
    } else {
        foreach ( $default['_labels'] as $group_key => $labels ) {
            if ( ! isset($saved['_labels'][$group_key]) ) {
                $saved['_labels'][$group_key] = $labels;
                $changed = true;
            } else {
                $new_group_labels = [];
                foreach ( $labels as $id => $label ) {
                    if ( isset($saved['_labels'][$group_key][$id]) ) {
                        $new_group_labels[$id] = $saved['_labels'][$group_key][$id];
                    } else {
                        $new_group_labels[$id] = $label;
                        $changed = true;
                    }
                }
                // Jeśli kolejność lub klucze się zmieniły, nadpisz grupę
                if ( array_keys($saved['_labels'][$group_key]) !== array_keys($new_group_labels) ) {
                    $saved['_labels'][$group_key] = $new_group_labels;
                    $changed = true;
                }
            }
        }
    }

    // Zapewnij obecność i poprawną kolejność matryc i wierszy/kolumn
    $matrix_keys = [
        'PRICE_CHANGE', 
        'PRICE_CHANGE_PLASZCZ', 
        'PRICE_CHANGE_KOSZULA', 
        'PRICE_CHANGE_CZAPKA_BAJOREK', 
        'PRICE_CHANGE_CZAPKA_GOTOWY', 
        'PRICE_CHANGE_BERET_GAL_BAJOREK', 
        'PRICE_CHANGE_BERET_GAL_GOTOWY', 
        'PRICE_CHANGE_BERET_POL', 
        'PRICE_CHANGE_FURAZERKA', 
        'PRICE_CHANGE_KAPELUSZ_BAJOREK', 
        'PRICE_CHANGE_KAPELUSZ_GOTOWY', 
        'PRICE_CHANGE_ROK', 
        'PRICE_CHANGE_SW', 
        'PRICE_CHANGE_SG', 
        'PRICE_CHANGE_PSP'
    ];
    foreach ( $matrix_keys as $mkey ) {
        if ( ! isset($saved[$mkey]) ) {
            $saved[$mkey] = isset($default[$mkey]) ? $default[$mkey] : [];
            $changed = true;
        } else {
            $new_matrix = [];
            $def_matrix = isset($default[$mkey]) ? $default[$mkey] : [];
            if ( ! empty($def_matrix) ) {
                $changed_this_matrix = false;
                foreach ( $def_matrix as $from => $cols ) {
                    $new_matrix[$from] = [];
                    foreach ( $cols as $to => $val ) {
                        if ( isset($saved[$mkey][$from][$to]) ) {
                            $new_matrix[$from][$to] = $saved[$mkey][$from][$to];
                        } else {
                            $new_matrix[$from][$to] = $val;
                            $changed_this_matrix = true;
                        }
                    }
                }
                if ( $changed_this_matrix || array_keys($saved[$mkey]) !== array_keys($new_matrix) ) {
                    $saved[$mkey] = $new_matrix;
                    $changed = true;
                }
            }
        }
    }

    if ( $changed ) {
        update_option( 'mundula_price_change', $saved );
    }

    return $saved;
}


function mundula_ajax_price_change() {
    wp_send_json_success( mundula_price_change_get() );
}
add_action( 'wp_ajax_mundula_price_change',        'mundula_ajax_price_change' );
add_action( 'wp_ajax_nopriv_mundula_price_change', 'mundula_ajax_price_change' );


function mundula_render_pc_table($table_key, $input_name, $ids_key, $label_key, $table_title, $data, $default) {
    $PC      = $data[$table_key] ?? [];
    $PC_def  = $default[$table_key] ?? [];
    if ( $ids_key === 'ROK' ) {
        $labels = ['r1'=>'1 rok','r2'=>'2 rok','r3'=>'3 rok','r4'=>'4 rok','r5'=>'5 rok','r6'=>'Szkoła Podchorążych Rezerwy'];
    } else {
        $labels  = $data['_labels'][$ids_key] ?? [];
    }
    $label_keys = array_keys($labels);

    echo '<div style="background:#fff;border:1px solid #ddd;border-radius:4px;margin-bottom:24px;overflow-x:auto;">';
    echo '<div style="padding:12px 16px;background:#f6f7f7;border-bottom:1px solid #ddd;">';
    echo '<strong>' . esc_html($table_title) . '</strong>';
    echo '<span style="color:#999;font-size:12px;margin-left:8px">( ' . count($labels) . 'x' . count($labels) . ' )</span>';
    echo '</div>';
    echo '<table class="mundula-change-table" style="border-collapse:collapse;font-size:11px;min-width:100%">';
    echo '<thead><tr>';
    echo '<th style="padding:4px 6px;background:#f6f7f7;border:1px solid #e2e4e7;position:sticky;left:0;z-index:1">Z &darr; / NA &rarr;</th>';
    foreach ($labels as $to_id => $to_l) {
        echo '<th style="padding:4px 3px;background:#f6f7f7;border:1px solid #e2e4e7;writing-mode:vertical-lr;height:80px;font-weight:400;font-size:10px;min-width:36px" title="' . esc_attr($to_l) . '">';
        echo esc_html(mb_substr($to_l, 0, 14));
        echo '</th>';
    }
    echo '</tr></thead><tbody>';
    foreach ($labels as $from_id => $from_l) {
        $from_idx = array_search($from_id, $label_keys);
        echo '<tr>';
        echo '<td style="padding:3px 6px;background:#f6f7f7;border:1px solid #e2e4e7;font-size:10px;white-space:nowrap;position:sticky;left:0;font-weight:500">' . esc_html(mb_substr($from_l,0,20)) . '</td>';
        foreach ($labels as $to_id => $to_l) {
            $to_idx  = array_search($to_id, $label_keys);
            $val     = (int)($PC[$from_id][$to_id] ?? 0);
            $def_val = (int)($PC_def[$from_id][$to_id] ?? 0);
            $same    = $from_id === $to_id;
            $changed = !$same && $val !== $def_val;
            $bg = $same ? '#f0f0f0' : ($changed ? '#fff8ee' : '#fff');
            echo '<td style="padding:1px 2px;border:1px solid #e2e4e7;text-align:center;background:' . $bg . '">';
            if ($same) {
                echo '<span style="color:#ccc">&mdash;</span>';
                echo '<input type="hidden" name="' . $input_name . '[' . $from_id . '][' . $to_id . ']" value="0">';
            } else {
                $is_bold = ($from_idx === 0) || ($to_idx === $from_idx + 1);
                $input_classes = [];
                if ( $changed ) $input_classes[] = 'changed-val';
                if ( $is_bold ) $input_classes[] = 'important-rate';
                $class_str = implode(' ', $input_classes);
                echo '<input type="number" class="' . esc_attr($class_str) . '" name="' . $input_name . '[' . $from_id . '][' . $to_id . ']" value="' . $val . '" min="0" max="9999">';
            }
            echo '</td>';
        }
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}


function mundula_save_stawki_unified() {
    if ( ! check_admin_referer('mundula_save_stawki_unified') ) wp_die('Błąd bezpieczeństwa.');
    if ( ! current_user_can('manage_options') ) wp_die('Brak uprawnień.');

    $tab = isset($_POST['tab']) ? sanitize_key($_POST['tab']) : 'wp';

    // Odszyfruj dane JSON jeśli zostały przesłane w jednym polu (bypassing max_input_vars)
    $json_data = null;
    if ( isset($_POST['cennik_json_data']) && ! empty($_POST['cennik_json_data']) ) {
        $json_data = json_decode( stripslashes($_POST['cennik_json_data']), true );
    }

    // 1. Zapisz płaskie stawki z formularza do mundula_stawki
    $post_stawka = isset($json_data['stawka']) ? $json_data['stawka'] : ($_POST['stawka'] ?? []);
    if ( is_array($post_stawka) && ! empty($post_stawka) ) {
        $stawki = mundula_stawki_get();
        $changed_stawki = false;
        foreach ( $post_stawka as $sid => $val ) {
            $sid = sanitize_key($sid);
            if ( isset($stawki[$sid]) ) {
                $stawki[$sid]['p'] = absint($val);
                $changed_stawki = true;
            }
        }
        if ( $changed_stawki ) {
            update_option( 'mundula_stawki', $stawki );
        }
    }

    // 2. Zapisz matryce (PRICE_CHANGE) z formularza do mundula_price_change
    $saved_pc = mundula_price_change_get();
    
    $matrix_post_map = [
        'PRICE_CHANGE' => 'pc',
        'PRICE_CHANGE_PLASZCZ' => 'pc_plaszcz',
        'PRICE_CHANGE_KOSZULA' => 'pc_koszula',
        'PRICE_CHANGE_CZAPKA_BAJOREK' => 'pc_czapka_bajorek',
        'PRICE_CHANGE_CZAPKA_GOTOWY' => 'pc_czapka_gotowy',
        'PRICE_CHANGE_BERET_GAL_BAJOREK' => 'pc_beret_gal_bajorek',
        'PRICE_CHANGE_BERET_GAL_GOTOWY' => 'pc_beret_gal_gotowy',
        'PRICE_CHANGE_BERET_POL' => 'pc_beret_pol',
        'PRICE_CHANGE_FURAZERKA' => 'pc_furazerka',
        'PRICE_CHANGE_KAPELUSZ_BAJOREK' => 'pc_kapelusz_bajorek',
        'PRICE_CHANGE_KAPELUSZ_GOTOWY' => 'pc_kapelusz_gotowy',
        'PRICE_CHANGE_ROK' => 'pcr',
        'PRICE_CHANGE_SW' => 'pcsw',
        'PRICE_CHANGE_SG' => 'pcsg',
        'PRICE_CHANGE_PSP' => 'pcpsp'
    ];

    foreach ( $matrix_post_map as $mkey => $post_key ) {
        $post_matrix = isset($json_data[$post_key]) ? $json_data[$post_key] : ($_POST[$post_key] ?? []);
        if ( is_array($post_matrix) && ! empty($post_matrix) ) {
            foreach ( $post_matrix as $from => $tos ) {
                $from = sanitize_key($from);
                if ( ! isset($saved_pc[$mkey][$from]) ) continue;
                foreach ( $tos as $to => $val ) {
                    $to = sanitize_key($to);
                    if ( isset($saved_pc[$mkey][$from][$to]) )
                        $saved_pc[$mkey][$from][$to] = absint($val);
                }
            }
        }
    }
    
    update_option( 'mundula_price_change', $saved_pc );

    // Zapisz jako domyślne (JSON)
    $save_as_default = isset($_POST['save_as_default']) && $_POST['save_as_default'] == '1';
    if ( $save_as_default ) {
        $file_stawki = WP_CONTENT_DIR . '/kalkulator/mundula-stawki-default.json';
        if ( ! file_exists( dirname($file_stawki) ) ) {
            wp_mkdir_p( dirname($file_stawki) );
        }
        $w1 = file_put_contents( $file_stawki, json_encode( $stawki, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) );

        $file_pc = WP_CONTENT_DIR . '/kalkulator/mundula-price-change-default.json';
        if ( ! file_exists( dirname($file_pc) ) ) {
            wp_mkdir_p( dirname($file_pc) );
        }
        $w2 = file_put_contents( $file_pc, json_encode( $saved_pc, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) );

        if ( $w1 === false || $w2 === false ) {
            wp_redirect( admin_url('admin.php?page=mundula-stawki&defaults_saved_error=1&tab=' . $tab) );
        } else {
            wp_redirect( admin_url('admin.php?page=mundula-stawki&defaults_saved=1&tab=' . $tab) );
        }
        exit;
    }

    wp_redirect( admin_url('admin.php?page=mundula-stawki&saved=1&tab=' . $tab) );
    exit;
}
add_action( 'admin_post_mundula_save_stawki_unified', 'mundula_save_stawki_unified' );


function mundula_reset_stawki_unified() {
    if ( ! check_admin_referer('mundula_reset_stawki_unified') ) wp_die('Błąd bezpieczeństwa.');
    if ( ! current_user_can('manage_options') ) wp_die('Brak uprawnień.');

    $tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'wp';

    // Pobierz wszystkie cenniki
    $stawki = mundula_stawki_get();
    $default_stawki = mundula_stawki_default();
    $pc_data = mundula_price_change_get();
    $pc_default = mundula_price_change_default();

    // Resetuj tylko te stawki, które należą do aktywnej zakładki
    foreach ( $stawki as $id => &$item ) {
        $g = $item['g'] ?? 'Inne';
        $g_lower = mb_strtolower($g);
        $item_tab = 'inne';
        
        if ( strpos($g_lower, 'wp/sp') !== false || strpos($g_lower, 'wl/sp') !== false || strpos($g_lower, 'wojsk') !== false || strpos($g_lower, 'furażerk') !== false || strpos($g_lower, 'beret') !== false || strpos($g_lower, 'kapelusz') !== false ) {
            $item_tab = 'wp';
        } elseif ( strpos($g_lower, 'sw') !== false || strpos($g_lower, 'więzien') !== false ) {
            $item_tab = 'sw';
        } elseif ( strpos($g_lower, 'sg') !== false || strpos($g_lower, 'granic') !== false ) {
            $item_tab = 'sg';
        } elseif ( strpos($g_lower, 'psp') !== false || strpos($g_lower, 'pożarn') !== false ) {
            $item_tab = 'psp';
        }

        if ( $item_tab === $tab && isset($default_stawki[$id]) ) {
            $item['p'] = $default_stawki[$id]['p'];
        }
    }
    unset($item);
    update_option( 'mundula_stawki', $stawki );

    // Resetuj matryce dla tej zakładki
    if ( $tab === 'wp' ) {
        $wp_keys = [
            'PRICE_CHANGE', 
            'PRICE_CHANGE_PLASZCZ', 
            'PRICE_CHANGE_KOSZULA', 
            'PRICE_CHANGE_CZAPKA_BAJOREK', 
            'PRICE_CHANGE_CZAPKA_GOTOWY', 
            'PRICE_CHANGE_BERET_GAL_BAJOREK', 
            'PRICE_CHANGE_BERET_GAL_GOTOWY', 
            'PRICE_CHANGE_BERET_POL', 
            'PRICE_CHANGE_FURAZERKA', 
            'PRICE_CHANGE_KAPELUSZ_BAJOREK', 
            'PRICE_CHANGE_KAPELUSZ_GOTOWY', 
            'PRICE_CHANGE_ROK'
        ];
        foreach ( $wp_keys as $k ) {
            $pc_data[$k] = isset($pc_default[$k]) ? $pc_default[$k] : [];
        }
    } elseif ( $tab === 'sw' ) {
        $pc_data['PRICE_CHANGE_SW'] = isset($pc_default['PRICE_CHANGE_SW']) ? $pc_default['PRICE_CHANGE_SW'] : [];
    } elseif ( $tab === 'sg' ) {
        $pc_data['PRICE_CHANGE_SG'] = isset($pc_default['PRICE_CHANGE_SG']) ? $pc_default['PRICE_CHANGE_SG'] : [];
    } elseif ( $tab === 'psp' ) {
        $pc_data['PRICE_CHANGE_PSP'] = isset($pc_default['PRICE_CHANGE_PSP']) ? $pc_default['PRICE_CHANGE_PSP'] : [];
    }
    update_option( 'mundula_price_change', $pc_data );

    wp_redirect( admin_url('admin.php?page=mundula-stawki&reset=1&tab=' . $tab) );
    exit;
}
add_action( 'admin_post_mundula_reset_stawki_unified', 'mundula_reset_stawki_unified' );

function mundula_panel_cennik() {
    $stawki  = mundula_stawki_get();
    $default_stawki = mundula_stawki_default();
    $pc_data = mundula_price_change_get();
    $pc_default = mundula_price_change_default();
    
    $saved   = isset($_GET['saved']);
    $reset   = isset($_GET['reset']);
    $active_tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'wp';
    
    $tabs = [
        'wp'   => '🎖️ Wojsko Polskie / WL / SP',
        'sw'   => '⛓️ Służba Więzienna',
        'sg'   => '💚 Straż Graniczna',
        'psp'  => '🚒 Straż Pożarna',
        'inne' => '⚙️ Inne / Dostawa'
    ];
    
    $groups = mundula_group_cennik_rates( $stawki );
    $active_groups = $groups[$active_tab] ?? [];
    
    ?>
    <div class="wrap">
    <h1>⚙️ Ustawienia cenników kalkulatora Mundula</h1>
    <?php
    mundula_render_cennik_notices( $saved, $reset );
    mundula_render_cennik_tabs( $tabs, $active_tab );
    mundula_render_cennik_quick_links( $active_tab, $active_groups );
    ?>
    <form id="mundula-cennik-form" method="post" action="<?php echo admin_url('admin-post.php'); ?>">
        <?php wp_nonce_field('mundula_save_stawki_unified'); ?>
        <input type="hidden" name="action" value="mundula_save_stawki_unified">
        <input type="hidden" name="tab" value="<?= esc_attr($active_tab) ?>">
        <input type="hidden" id="mundula-cennik-json-data" name="cennik_json_data" value="">
        
        <?php
        mundula_render_cennik_matrices( $active_tab, $pc_data, $pc_default );
        mundula_render_cennik_flat_rates( $active_groups, $default_stawki );
        mundula_render_cennik_buttons( $active_tab );
        ?>
    </form>
    <?php
    mundula_render_cennik_scripts();
    ?>
    </div>
    <?php
}

function mundula_group_cennik_rates( $stawki ) {
    $groups = [];
    foreach ( $stawki as $id => $item ) {
        $g = $item['g'] ?? 'Inne';
        $g_lower = mb_strtolower($g);
        $tab = 'inne';
        
        if ( strpos($g_lower, 'wp/sp') !== false || strpos($g_lower, 'wl/sp') !== false || strpos($g_lower, 'wojsk') !== false || strpos($g_lower, 'furażerk') !== false || strpos($g_lower, 'beret') !== false || strpos($g_lower, 'kapelusz') !== false ) {
            $tab = 'wp';
        } elseif ( strpos($g_lower, 'sw') !== false || strpos($g_lower, 'więzien') !== false ) {
            $tab = 'sw';
        } elseif ( strpos($g_lower, 'sg') !== false || strpos($g_lower, 'granic') !== false ) {
            $tab = 'sg';
        } elseif ( strpos($g_lower, 'psp') !== false || strpos($g_lower, 'pożarn') !== false ) {
            $tab = 'psp';
        }
        
        $groups[$tab][$g][$id] = $item;
    }
    return $groups;
}

function mundula_render_cennik_notices( $saved, $reset ) {
    $raw_file = WP_CONTENT_DIR . '/kalkulator/mundula-price-change-default.json';
    $raw_pc_default = [];
    if ( file_exists($raw_file) ) {
        $raw_content = file_get_contents($raw_file);
        if ( substr($raw_content, 0, 3) === pack("CCC", 0xef, 0xbb, 0xbf) ) {
            $raw_content = substr($raw_content, 3);
        }
        $raw_pc_default = json_decode($raw_content, true) ?: [];
    }
    
    if ( empty($raw_pc_default) ) {
        echo '<div class="notice notice-error"><p><strong>❌ Błąd:</strong> Nie znaleziono lub nie można odczytać pliku domyślnego <code>wp-content/kalkulator/mundula-price-change-default.json</code>.</p></div>';
    } elseif ( ! isset($raw_pc_default['PRICE_CHANGE_PLASZCZ']) ) {
        echo '<div class="notice notice-warning"><p><strong>⚠️ Ostrzeżenie:</strong> Plik <code>wp-content/kalkulator/mundula-price-change-default.json</code> na Twoim serwerze jest nieaktualny (brak nowych matryc). Upewnij się, że wgrałeś najnowszy plik z repozytorium na serwer FTP.</p></div>';
    }
    
    if ($saved) {
        echo '<div class="notice notice-success is-dismissible"><p>✅ Stawki zapisane.</p></div>';
    } elseif ($reset) {
        echo '<div class="notice notice-success is-dismissible"><p>✅ Stawki zresetowane do wartości domyślnych dla tej formacji.</p></div>';
    } elseif (isset($_GET['defaults_saved'])) {
        echo '<div class="notice notice-success is-dismissible"><p>✅ Bieżące stawki zostały zapisane jako nowe wartości domyślne (pliki JSON zaktualizowane).</p></div>';
    } elseif (isset($_GET['defaults_saved_error'])) {
        echo '<div class="notice notice-error is-dismissible"><p>❌ Błąd zapisu: Nie można zapisać plików JSON na serwerze (brak uprawnień zapisu w folderze wp-content/kalkulator/).</p></div>';
    }
}

function mundula_render_cennik_tabs( $tabs, $active_tab ) {
    echo '<h2 class="nav-tab-wrapper" style="margin-bottom: 20px;">';
    foreach ($tabs as $tid => $tname) {
        $active_class = $active_tab === $tid ? 'nav-tab-active' : '';
        echo '<a href="?page=mundula-stawki&tab=' . esc_attr($tid) . '" class="nav-tab ' . esc_attr($active_class) . '">' . esc_html($tname) . '</a>';
    }
    echo '</h2>';
}

function mundula_render_cennik_quick_links( $active_tab, $active_groups ) {
    echo '<div class="mundula-quick-links" style="margin: 15px 0 25px 0; display: flex; gap: 8px; flex-wrap: wrap;">';
    if ($active_tab === 'wp') {
        echo '<a href="#table-change-wp" class="button button-secondary button-small" style="font-size: 11px;">Marynarka</a>';
        echo '<a href="#table-change-plaszcz" class="button button-secondary button-small" style="font-size: 11px;">Płaszcz</a>';
        echo '<a href="#table-change-koszula" class="button button-secondary button-small" style="font-size: 11px;">Koszula</a>';
        echo '<a href="#table-change-czapka-gotowy" class="button button-secondary button-small" style="font-size: 11px;">Czapka (gotowa)</a>';
        echo '<a href="#table-change-czapka-bajorek" class="button button-secondary button-small" style="font-size: 11px;">Czapka (bajorek)</a>';
        echo '<a href="#table-change-beret-gal-gotowy" class="button button-secondary button-small" style="font-size: 11px;">Beret gal. (gotowy)</a>';
        echo '<a href="#table-change-beret-gal-bajorek" class="button button-secondary button-small" style="font-size: 11px;">Beret gal. (bajorek)</a>';
        echo '<a href="#table-change-beret-pol" class="button button-secondary button-small" style="font-size: 11px;">Beret polowy</a>';
        echo '<a href="#table-change-furazerka" class="button button-secondary button-small" style="font-size: 11px;">Furażerka</a>';
        echo '<a href="#table-change-kapelusz-gotowy" class="button button-secondary button-small" style="font-size: 11px;">Kapelusz (gotowy)</a>';
        echo '<a href="#table-change-kapelusz-bajorek" class="button button-secondary button-small" style="font-size: 11px;">Kapelusz (bajorek)</a>';
        echo '<a href="#table-change-pcr" class="button button-secondary button-small" style="font-size: 11px;">Podchorążowie (rok)</a>';
    } elseif ($active_tab === 'sw') {
        echo '<a href="#table-change-sw" class="button button-secondary button-small" style="font-size: 11px;">Matryca Marynarka/Płaszcz</a>';
    } elseif ($active_tab === 'sg') {
        echo '<a href="#table-change-sg" class="button button-secondary button-small" style="font-size: 11px;">Matryca Marynarka/Płaszcz</a>';
    } elseif ($active_tab === 'psp') {
        echo '<a href="#table-change-psp" class="button button-secondary button-small" style="font-size: 11px;">Matryca Marynarka/Płaszcz</a>';
    }
    
    foreach ($active_groups as $gname => $items) {
        $anchor = 'table-' . sanitize_title($gname);
        echo '<a href="#' . esc_attr($anchor) . '" class="button button-secondary button-small" style="font-size: 11px;">' . esc_html($gname) . '</a>';
    }
    echo '</div>';
}

function mundula_render_cennik_matrices( $active_tab, $pc_data, $pc_default ) {
    if ($active_tab === 'wp') {
        echo '<div id="table-change-wp" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE',     'pc',    'ST',     'ST',     'Wojsko Polskie / Siły Powietrzne — Marynarka', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-plaszcz" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_PLASZCZ', 'pc_plaszcz', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Płaszcz', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-koszula" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_KOSZULA', 'pc_koszula', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Koszula / Naramienniki', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-czapka-gotowy" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_CZAPKA_GOTOWY', 'pc_czapka_gotowy', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Czapka (Otok gotowy)', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-czapka-bajorek" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_CZAPKA_BAJOREK', 'pc_czapka_bajorek', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Czapka (Otok bajorek)', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-beret-gal-gotowy" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_BERET_GAL_GOTOWY', 'pc_beret_gal_gotowy', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Beret galowy (Oznaka gotowa)', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-beret-gal-bajorek" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_BERET_GAL_BAJOREK', 'pc_beret_gal_bajorek', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Beret galowy (Bajorek)', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-beret-pol" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_BERET_POL', 'pc_beret_pol', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Beret polowy', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-furazerka" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_FURAZERKA', 'pc_furazerka', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Furażerka', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-kapelusz-gotowy" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_KAPELUSZ_GOTOWY', 'pc_kapelusz_gotowy', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Kapelusz Podhalański (Tkanina)', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-kapelusz-bajorek" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_KAPELUSZ_BAJOREK', 'pc_kapelusz_bajorek', 'ST', 'ST', 'Wojsko Polskie / Siły Powietrzne — Kapelusz Podhalański (Bajorek)', $pc_data, $pc_default);
        echo '</div>';
        echo '<div id="table-change-pcr" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_ROK', 'pcr',   'ROK',    'ROK_L',  'Podchorążowie — zmiana roku nauki', $pc_data, $pc_default);
        echo '</div>';
    } elseif ($active_tab === 'sw') {
        echo '<div id="table-change-sw" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_SW',  'pcsw',  'SW_ST',  'SW_ST',  'Służba Więzienna — zmiana dystynkcji (marynarka/płaszcz)', $pc_data, $pc_default);
        echo '</div>';
    } elseif ($active_tab === 'sg') {
        echo '<div id="table-change-sg" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_SG',  'pcsg',  'SG_ST',  'SG_ST',  'Straż Graniczna — zmiana dystynkcji (marynarka/płaszcz)', $pc_data, $pc_default);
        echo '</div>';
    } elseif ($active_tab === 'psp') {
        echo '<div id="table-change-psp" style="scroll-margin-top: 40px;">';
        mundula_render_pc_table('PRICE_CHANGE_PSP', 'pcpsp', 'PSP_ST', 'PSP_ST', 'Państwowa Straż Pożarna — zmiana dystynkcji (marynarka/płaszcz)', $pc_data, $pc_default);
        echo '</div>';
    }
}

function mundula_render_cennik_flat_rates( $active_groups, $default_stawki ) {
    foreach ($active_groups as $gname => $items) {
        $anchor = 'table-' . sanitize_title($gname);
        $gname_lower = mb_strtolower($gname);
        $bg_color = '#f6f7f7';
        $border_color = '#ddd';
        $text_color = '#3c434a';

        if ( strpos($gname_lower, 'wp/sp') !== false || strpos($gname_lower, 'wojsk') !== false || strpos($gname_lower, 'furażerk') !== false ) {
            $bg_color = '#f4f9f4'; $border_color = '#c2d9c2'; $text_color = '#1e3a1e';
        } elseif ( strpos($gname_lower, 'sw') !== false || strpos($gname_lower, 'więzien') !== false ) {
            $bg_color = '#f0f6fc'; $border_color = '#c8def4'; $text_color = '#1a365d';
        } elseif ( strpos($gname_lower, 'sg') !== false || strpos($gname_lower, 'granic') !== false ) {
            $bg_color = '#f0fdfa'; $border_color = '#b2f5ea'; $text_color = '#134e4a';
        } elseif ( strpos($gname_lower, 'psp') !== false || strpos($gname_lower, 'straż pożarn') !== false ) {
            $bg_color = '#fef2f2'; $border_color = '#fecaca'; $text_color = '#7f1d1d';
        } elseif ( strpos($gname_lower, 'kapelusz') !== false || strpos($gname_lower, 'beret') !== false || strpos($gname_lower, 'czapka') !== false || strpos($gname_lower, 'pagony') !== false ) {
            $bg_color = '#fffbeb'; $border_color = '#fde68a'; $text_color = '#78350f';
        }
        ?>
        <div id="<?= $anchor ?>" style="background:#fff;border:1px solid <?= $border_color ?>;border-radius:4px;margin-bottom:20px;scroll-margin-top: 40px;">
            <div style="padding:12px 16px;background:<?= $bg_color ?>;border-bottom:1px solid <?= $border_color ?>;border-radius:4px 4px 0 0;color:<?= $text_color ?>;">
                <strong><?= esc_html($gname) ?></strong>
                <span style="opacity: 0.7;font-size:12px;margin-left:8px">(<?= count($items) ?> pozycji)</span>
            </div>
            <table class="widefat" style="border:none;">
                <thead>
                    <tr>
                        <th style="width:50%">Usługa</th>
                        <th style="width:120px">Cena (zł netto)</th>
                        <th style="width:120px">Domyślna</th>
                        <th style="width:60px">Zmiana</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($items as $sid => $item):
                    $current  = (int)$item['p'];
                    $def_val  = (int)($default_stawki[$sid]['p'] ?? $current);
                    $changed  = $current !== $def_val;
                ?>
                <tr style="<?= $changed ? 'background:#fff8ee' : '' ?>">
                    <td style="font-size:13px"><?= esc_html($item['l']) ?></td>
                    <td>
                        <input type="number" name="stawka[<?= esc_attr($sid) ?>]"
                               value="<?= $current ?>" min="0" max="9999"
                               style="width:90px;padding:4px 8px;font-weight:<?= $changed ? '700' : '400' ?>;
                                      color:<?= $changed ? '#e2ae61' : 'inherit' ?>">
                        <span style="font-size:12px;color:#999">zł</span>
                    </td>
                    <td style="font-size:12px;color:#999"><?= $def_val ?> zł</td>
                    <td>
                        <?php if ($changed): ?>
                        <span style="color:#e2ae61;font-size:11px;font-weight:600">
                            <?= $current > $def_val ? '▲ +'.($current-$def_val) : '▼ '.($current-$def_val) ?> zł
                        </span>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
}

function mundula_render_cennik_buttons( $active_tab ) {
    ?>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;">
        <a href="<?= wp_nonce_url(admin_url('admin-post.php?action=mundula_reset_stawki_unified&tab=' . $active_tab), 'mundula_reset_stawki_unified') ?>"
           class="button"
           onclick="return confirm('Zresetować stawki aktywnej zakładki do wartości domyślnych?');"
           style="color:#dc2626;">↩ Przywróć domyślne</a>
        <div style="display:flex;gap:12px;">
            <button type="submit" name="save_as_default" value="1" class="button button-secondary button-large" onclick="return confirm('Czy na pewno chcesz zapisać te stawki jako domyślne (nadpisać pliki JSON na serwerze)?');">💾 Ustaw jako domyślne</button>
            <button type="submit" class="button button-primary button-large">💾 Zapisz cennik</button>
        </div>
    </div>
    <?php
}

function mundula_render_cennik_scripts() {
    ?>
    <script>
    jQuery(document).ready(function($) {
        $('#mundula-cennik-form').on('submit', function(e) {
            var data = {
                stawka: {},
                pc: {},
                pc_plaszcz: {},
                pc_koszula: {},
                pc_czapka_bajorek: {},
                pc_czapka_gotowy: {},
                pc_beret_gal_bajorek: {},
                pc_beret_gal_gotowy: {},
                pc_beret_pol: {},
                pc_furazerka: {},
                pc_kapelusz_bajorek: {},
                pc_kapelusz_gotowy: {},
                pcr: {},
                pcsw: {},
                pcsg: {},
                pcpsp: {}
            };
            
            // Populate flat rates
            $(this).find('input[name^="stawka["]').each(function() {
                var name = $(this).attr('name');
                var matches = name.match(/stawka\[([^\]]+)\]/);
                if (matches) {
                    data.stawka[matches[1]] = $(this).val();
                }
            });
            
            // Populate matrices
            var matrix_keys = ['pc', 'pc_plaszcz', 'pc_koszula', 'pc_czapka_bajorek', 'pc_czapka_gotowy', 'pc_beret_gal_bajorek', 'pc_beret_gal_gotowy', 'pc_beret_pol', 'pc_furazerka', 'pc_kapelusz_bajorek', 'pc_kapelusz_gotowy', 'pcr', 'pcsw', 'pcsg', 'pcpsp'];
            
            var self = this;
            matrix_keys.forEach(function(mkey) {
                $(self).find('input[name^="' + mkey + '["]').each(function() {
                    var name = $(this).attr('name');
                    var matches = name.match(new RegExp('^' + mkey + '\\[([^\\]]+)\\]\\[([^\\]]+)\\]'));
                    if (matches) {
                        var from = matches[1];
                        var to = matches[2];
                        if (!data[mkey][from]) data[mkey][from] = {};
                        data[mkey][from][to] = $(this).val();
                    }
                });
            });
            
            // Put JSON into hidden field
            $('#mundula-cennik-json-data').val(JSON.stringify(data));
            
            // Disable original inputs to avoid sending them in POST (bypasses max_input_vars!)
            $(this).find('input[name^="stawka["], input[name^="pc["], input[name^="pc_"], input[name^="pcr["], input[name^="pcsw["], input[name^="pcsg["], input[name^="pcpsp["]').prop('disabled', true);
        });
    });
    </script>
    <?php
}

