

/* ==========================================================================
   Consolidated Backend Scripts
   ========================================================================== */

jQuery(document).ready(function($){
        var nonce = mundulaAdmin.nonce;
        var ajax  = mundulaAdmin.ajax;

        // Podwójne kliknięcie na wiersz otwiera edycję zlecenia
        $('#mundula-table tbody').on('dblclick', 'tr[data-id]', function(e) {
            // Ignorujemy kliknięcia w inputy, selecty, buttony, linki i pola specjalne
            if ($(e.target).is('input, select, button, a, option, textarea') || $(e.target).closest('.col-checkbox, .col-prio').length) {
                return;
            }
            var id = $(this).data('id');
            if (id) {
                window.location.href = 'admin.php?page=mundula-panel&action=edit&id=' + id;
            }
        });

        // Zaznacz wszystkie
        $('#mundula-check-all').on('change', function(){
            $('.mundula-check-row').prop('checked', this.checked);
            mundulaUpdateBulkBar();
        });

        // Pojedynczy checkbox
        $(document).on('change', '.mundula-check-row', function(){
            var total = $('.mundula-check-row').length;
            var checked = $('.mundula-check-row:checked').length;
            $('#mundula-check-all').prop('indeterminate', checked > 0 && checked < total);
            $('#mundula-check-all').prop('checked', checked === total);
            mundulaUpdateBulkBar();
        });

        function mundulaUpdateBulkBar() {
            var checked = $('.mundula-check-row:checked').length;
            if (checked > 0) {
                $('#mundula-bulk-count').text('Zaznaczono: ' + checked);
                $('#mundula-bulk-bar').css('display','flex');
            } else {
                $('#mundula-bulk-bar').hide();
            }
        }

        // Anuluj zaznaczenie
        $('#mundula-bulk-cancel').on('click', function(){
            $('.mundula-check-row, #mundula-check-all').prop('checked', false);
            $('#mundula-bulk-bar').hide();
        });

        // Usuń zaznaczone
        $('#mundula-bulk-delete').on('click', function(){
            var ids = $('.mundula-check-row:checked').map(function(){ return $(this).val(); }).get();
            if (!ids.length) return;
            if (!confirm('Usunąć ' + ids.length + ' zgłoszenie(ń)? Operacja jest nieodwracalna.')) return;
            $.post(ajax, {action:'mundula_delete', nonce:nonce, ids:ids}, function(r){
                if (r.success) location.reload();
                else alert('Błąd podczas usuwania.');
            });
        });

        // Potwierdź rezerwację (Dostarczenie)
        $(document).on('click', '.mundula-potwierdz', function(){
            var post_id = $(this).data('id');
            var $btn    = $(this);
            if (!confirm('Potwierdzić dostarczenie zlecenia #'+post_id+' i wysłać mail do klienta?')) return;
            $btn.prop('disabled',true).text('Wysyłam...');
            $.post(ajax, {action:'mundula_potwierdz', nonce:nonce, post_id:post_id}, function(r){
                if (r.success) {
                    alert(r.data.message);
                    location.reload();
                } else {
                    alert('Błąd: ' + (r.data.message || 'nieznany'));
                    $btn.prop('disabled',false).text('✅ Potwierdź dostarczenie');
                }
            }).fail(function(){
                alert('Błąd połączenia.');
                $btn.prop('disabled',false).text('✅ Potwierdź');
            });
        });

        // Zmiana statusu inline
        document.querySelectorAll('.mundula-status-change').forEach(function(sel) {
            sel.addEventListener('change', function() {
                var row     = this.closest('tr');
                var post_id = row ? row.getAttribute('data-id') : 0;
                var status  = this.value;
                if (!post_id) return;
                var fd = new FormData();
                fd.append('action',  'mundula_status');
                fd.append('nonce',   mundulaAdmin.nonce);
                fd.append('post_id', post_id);
                fd.append('status',  status);
                fetch(mundulaAdmin.ajax, {method:'POST', body:fd})
                    .then(function(r){ return r.json(); })
                    .then(function(r){ if(r.success) location.reload(); else alert('Błąd: '+JSON.stringify(r)); });
            });
        });

        // Zmiana priorytetu
        var pTimer;
        $('.mundula-priorytet').on('input', function(){
            var $row = $(this).closest('tr');
            var post_id  = $row.data('id');
            var priorytet = $(this).val();
            clearTimeout(pTimer);
            pTimer = setTimeout(function(){
                $.post(ajax, {action:'mundula_priorytet', nonce:nonce, post_id:post_id, priorytet:priorytet}, function(r){
                    if (r.success) location.reload();
                });
            }, 600);
        });


});

jQuery(document).ready(function($) {
                                // Blokuj pojedyncze kliknięcia, jeśli nie ma klasy is-editable
                                $('#elementy-dostarczone').on('click', '.elementy-dostarczone-lbl', function(e) {
                                    var $item = $(this).closest('.elementy-dostarczone-item');
                                    if ( ! $item.hasClass('is-editable') ) {
                                        e.preventDefault();
                                        return false;
                                    }
                                });

                                // Dwuklik aktywuje edycję (klasa is-editable)
                                $('#elementy-dostarczone').on('dblclick', '.elementy-dostarczone-item', function() {
                                    var $item = $(this);
                                    if ( $item.hasClass('is-editable') ) return;
                                    
                                    // Najpierw zamknij inne edytowane elementy
                                    $('.elementy-dostarczone-item.is-editable').each(function() {
                                        closeEdit($(this));
                                    });
                                    
                                    $item.addClass('is-editable');
                                    var $cb = $item.find('.elementy-dostarczone-cb');
                                    var $lbl = $item.find('.elementy-dostarczone-lbl');
                                    var $qty = $item.find('.elementy-dostarczone-qty');
                                    var $badge = $item.find('.el-qty-badge');
                                    
                                    // Ukryj statyczną etykietę ilości
                                    $badge.hide();
                                    
                                    // Pokaż pole edycji ilości
                                    $qty.show().focus();
                                    
                                    // Zmień obramowanie na przerywane, aby zasygnalizować tryb edycji
                                    $lbl.css('border-style', 'dashed');
                                });

                                // Pomocnicza funkcja do zamykania edycji
                                function closeEdit($row) {
                                    var $qty = $row.find('.elementy-dostarczone-qty');
                                    var $lbl = $row.find('.elementy-dostarczone-lbl');
                                    var $cb = $row.find('.elementy-dostarczone-cb');
                                    var $badge = $row.find('.el-qty-badge');
                                    
                                    var val = parseInt($qty.val(), 10) || 1;
                                    if (val < 1) val = 1;
                                    $qty.val(val);
                                    
                                    $row.removeClass('is-editable');
                                    $lbl.css('border-style', 'solid');
                                    
                                    if ($cb.is(':checked')) {
                                        $qty.hide();
                                        if (val > 1) {
                                            $badge.text('(x' + val + ')').show();
                                        } else {
                                            $badge.hide();
                                        }
                                    } else {
                                        $qty.hide();
                                        $badge.hide();
                                    }
                                }

                                // Zapobiegaj wysyłaniu formularza po enterze w polu ilości
                                $('#elementy-dostarczone').on('keypress', '.elementy-dostarczone-qty', function(e) {
                                    if (e.which === 13) {
                                        e.preventDefault();
                                        closeEdit($(this).closest('.elementy-dostarczone-item'));
                                        return false;
                                    }
                                });

                                // Kliknięcie poza aktywnym elementem kończy edycję
                                $(document).on('click', function(e) {
                                    if ( ! $(e.target).closest('.elementy-dostarczone-item').length ) {
                                        $('.elementy-dostarczone-item.is-editable').each(function() {
                                            closeEdit($(this));
                                        });
                                    }
                                });

                                // Obsługa zmiany stanu checkboxa (tylko w trybie edycji)
                                $('#elementy-dostarczone').on('change', '.elementy-dostarczone-cb', function() {
                                    var $cb = $(this);
                                    var $lbl = $cb.parent();
                                    var $row = $lbl.parent();
                                    var $qty = $row.find('.elementy-dostarczone-qty');
                                    var $badge = $row.find('.el-qty-badge');
                                    
                                    if ($cb.is(':checked')) {
                                        $lbl.css({
                                            'border-color': '#2563eb',
                                            'background': '#eff6ff',
                                            'opacity': '1'
                                        });
                                        $qty.show();
                                        $badge.hide();
                                    } else {
                                        $lbl.css({
                                            'border-color': '#ddd',
                                            'background': '#fff',
                                            'opacity': '0.6'
                                        });
                                        $qty.hide();
                                        $badge.hide();
                                    }
                                });
                            });

jQuery(document).ready(function($){
        var idx = jQuery('#zakres-body .zakres-row').length;
        var nonce = (typeof mundulaAdmin !== 'undefined') ? mundulaAdmin.nonce : '';
        var ajax  = (typeof mundulaAdmin !== 'undefined') ? mundulaAdmin.ajax : '';

        // Potwierdź rezerwację (Dostarczenie)
        $(document).on('click', '.mundula-potwierdz', function(){
            var post_id = $(this).data('id');
            var $btn    = $(this);
            if (!confirm('Potwierdzić dostarczenie i wysłać mail do klienta?')) return;
            $btn.prop('disabled', true).text('Wysyłam...');
            $.post(ajax, {
                action: 'mundula_potwierdz',
                nonce:  nonce,
                post_id: post_id
            }, function(r) {
                if (r.success) {
                    alert(r.data.message);
                    location.reload();
                } else {
                    alert('Błąd: ' + (r.data && r.data.message ? r.data.message : 'nieznany'));
                    $btn.prop('disabled', false).text('Potwierdź dostarczenie i wyślij mail');
                }
            }).fail(function(xhr) {
                alert('Błąd połączenia: ' + xhr.status);
                $btn.prop('disabled', false).text('Potwierdź dostarczenie i wyślij mail');
            });
        });

        // Stawki wysyłki
        var shipRates = (typeof mundulaAdmin !== 'undefined' && mundulaAdmin.shipRates) ? mundulaAdmin.shipRates : { paczkomat: 15, kurier: 20 };

        // Oblicz i zaktualizuj cenę końcową (brutto) - zaokrąglona w górę do pełnych 5 zł
        function updateCenaKoncowaBrutto() {
            var finalInput = document.getElementById('cena-finalna-input') || document.getElementsByName('cena_finalna')[0];
            var cenaFin = finalInput ? (parseFloat(finalInput.value) || 0) : 0;
            var cenaBrutto = Math.ceil((cenaFin * 1.23) / 5) * 5;
            $('#cena-koncowa-brutto-val').text(cenaBrutto + ' zł');
        }

        // Przelicz sumę
        function przeliczSume() {
            var suma = 0;
            $('.zakres-price').each(function(){ suma += parseInt($(this).val()) || 0; });
            $('#zakres-suma').text(suma + ' zł');
            
            // Automatycznie zaktualizuj cenę finalną (netto) i wyzwól zdarzenia w czystym JS
            var finalInput = document.getElementById('cena-finalna-input') || document.getElementsByName('cena_finalna')[0];
            if (finalInput) {
                finalInput.value = suma;
                finalInput.dispatchEvent(new Event('input', { bubbles: true }));
                finalInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
        $(document).on('input change keyup', '.zakres-price', przeliczSume);
        $(document).on('input change keyup', 'input[name="cena_finalna"], #cena-finalna-input', updateCenaKoncowaBrutto);

        // Obsługa przełączania edycji krytycznej daty gotowości dla zleceń pilnych (sama data)
        $('#is-urgent-cb').on('change', function() {
            var isUrgent = $(this).is(':checked');
            if (isUrgent) {
                $('#data-potrzebna-readonly-container').hide();
                $('#data-potrzebna-editable-container').show();
                // Przenieś nazwę 'data_potrzebna' na input edytowalny
                $('#data-potrzebna-hidden').attr('name', 'data_potrzebna_static');
                $('#data-potrzebna-input').attr('name', 'data_potrzebna');
                
                // Jeśli input edytowalny jest pusty, skopiuj samą datę z ukrytego (pierwsze 10 znaków YYYY-MM-DD)
                var rawVal = $('#data-potrzebna-hidden').val();
                if (rawVal && !$('#data-potrzebna-input').val()) {
                    var datePart = rawVal.substring(0, 10);
                    if (datePart.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        $('#data-potrzebna-input').val(datePart);
                    } else {
                        var t = Date.parse(rawVal);
                        if (!isNaN(t)) {
                            var dt = new Date(t);
                            var y = dt.getFullYear();
                            var m = ('0' + (dt.getMonth() + 1)).slice(-2);
                            var d = ('0' + dt.getDate()).slice(-2);
                            $('#data-potrzebna-input').val(y + '-' + m + '-' + d);
                        }
                    }
                }
            } else {
                $('#data-potrzebna-editable-container').hide();
                $('#data-potrzebna-readonly-container').show();
                // Przenieś nazwę 'data_potrzebna' na input ukryty
                $('#data-potrzebna-input').attr('name', 'data_potrzebna_urgent');
                $('#data-potrzebna-hidden').attr('name', 'data_potrzebna');
            }
        });

        // Obsługa automatycznego dodawania/usuwania Wysyłki
        function mundulaUpdateShippingItem(val) {
            var $shippingRow = null;
            $('#zakres-body .zakres-row').each(function() {
                var elemVal = $(this).find('input[name*="[elemLabel]"]').val();
                if (elemVal && elemVal.trim() === 'Wysyłka') {
                    $shippingRow = $(this);
                    return false; // break loop
                }
            });
            
            if (val === 'paczkomat' || val === 'kurier') {
                var shipLabel = val === 'paczkomat' ? 'Paczkomat' : 'Kurier';
                var shipPrice = shipRates[val] || 0;
                
                if ($shippingRow) {
                    $shippingRow.find('input[name*="[itemLabel]"]').val(shipLabel);
                    $shippingRow.find('input[name*="[price]"]').val(shipPrice);
                } else {
                    var row = '<tr class="zakres-row">' +
                        '<td><input type="text" name="zakres_items['+idx+'][elemLabel]" value="Wysyłka" ' +
                            'style="width:100%;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;"></td>' +
                        '<td><input type="text" name="zakres_items['+idx+'][itemLabel]" value="'+shipLabel+'" ' +
                            'style="width:100%;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;"></td>' +
                        '<td><input type="number" name="zakres_items['+idx+'][price]" value="'+shipPrice+'" ' +
                            'style="width:70px;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;" class="zakres-price"></td>' +
                        '<td><button type="button" class="button-link zakres-remove" ' +
                            'style="color:#dc2626;font-size:16px;padding:0 4px;" title="Usuń">×</button></td>' +
                        '</tr>';
                    $('#zakres-body').append(row);
                    idx++;
                }
            } else {
                if ($shippingRow) {
                    $shippingRow.remove();
                }
            }
            
            // Przenumeruj indeksy
            $('#zakres-body .zakres-row').each(function(i){
                $(this).find('input').each(function(){
                    var name = $(this).attr('name');
                    $(this).attr('name', name.replace(/\[\d+\]/, '['+i+']'));
                });
            });
            idx = $('#zakres-body .zakres-row').length;
            
            przeliczSume();
        }

        // Obsługa zmiany sposobu dostawy
        $('#dostawa-select').on('change', function() {
            var val = $(this).val();
            $('#dostawa-paczkomat').css('display', val === 'paczkomat' ? 'block' : 'none');
            $('#dostawa-kurier').css('display', val === 'kurier' ? 'block' : 'none');
            
            $('#cena-koncowa-brutto-container').css('display', (val === 'paczkomat' || val === 'kurier') ? 'block' : 'none');
            
            mundulaUpdateShippingItem(val);
        });

        // Usuń pozycję
        $(document).on('click', '.zakres-remove', function(){
            $(this).closest('tr').remove();
            przeliczSume();
            // Przenumeruj indeksy
            $('#zakres-body .zakres-row').each(function(i){
                $(this).find('input').each(function(){
                    var name = $(this).attr('name');
                    $(this).attr('name', name.replace(/\[\d+\]/, '['+i+']'));
                });
            });
            idx = $('#zakres-body .zakres-row').length;
        });

        // Dodaj pozycję
        $(document).on('click', '#zakres-add', function(){
            var row = '<tr class="zakres-row">' +
                '<td><input type="text" name="zakres_items['+idx+'][elemLabel]" value="" autocomplete="off" ' +
                    'style="width:100%;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;"></td>' +
                '<td><input type="text" name="zakres_items['+idx+'][itemLabel]" value="" autocomplete="off" ' +
                    'style="width:100%;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;"></td>' +
                '<td><input type="number" name="zakres_items['+idx+'][price]" value="0" ' +
                    'style="width:70px;border:1px solid #ddd;padding:4px 6px;border-radius:3px;font-size:12px;" class="zakres-price"></td>' +
                '<td><button type="button" class="button-link zakres-remove" ' +
                    'style="color:#dc2626;font-size:16px;padding:0 4px;" title="Usuń">×</button></td>' +
                '</tr>';
            $('#zakres-body').append(row);
            idx++;
        });

        // Toggle zamówienie zbiorcze
        $('#zam-zbiorcze-cb').on('change', function() {
            if ($(this).is(':checked')) {
                $('#zbiorcze-fields-container').slideDown(200);
            } else {
                $('#zbiorcze-fields-container').slideUp(200);
            }
        });

        $('#mundula-copy-label-edit-btn').on('click', function(){
            var isZbiorcze = $('#zam-zbiorcze-cb').is(':checked');
            var name = '';
            var phone = '';
            var rank = $('input[name="stopien"]').val() || '';
            
            if (isZbiorcze) {
                name = $('input[name="zbiorcze_nazwisko"]').val();
                phone = $('input[name="zbiorcze_telefon"]').val();
                if (!name) name = $('input[name="imie_nazwisko"]').val();
                if (!phone) phone = $('input[name="telefon"]').val();
            } else {
                name = $('input[name="imie_nazwisko"]').val();
                phone = $('input[name="telefon"]').val();
            }
            
            // clean phone number (9 digits)
            var cleanPhone = (phone || '').replace(/\D/g, '');
            if (cleanPhone.length === 11 && cleanPhone.startsWith('48')) {
                cleanPhone = cleanPhone.substring(2);
            }
            if (cleanPhone.length > 9) {
                cleanPhone = cleanPhone.substring(cleanPhone.length - 9);
            }
            
            // abbreviate rank
            var cleanRank = rank;
            cleanRank = cleanRank.replace(/Starszy/g, 'St.').replace(/starszy/g, 'St.');
            cleanRank = cleanRank.replace(/Sztabowy/g, 'sztab.').replace(/sztabowy/g, 'sztab.');
            cleanRank = cleanRank.replace(/Młodszy/g, 'Mł.').replace(/młodszy/g, 'Mł.');
            
            var textToCopy = (name || '').trim() + '\n' + (cleanRank + ' ' + cleanPhone).trim();
            
            navigator.clipboard.writeText(textToCopy).then(function() {
                mundulaShowToast("Skopiowano do schowka:\n" + textToCopy);
            }).catch(function(err) {
                alert("Błąd kopiowania: " + err);
            });
        });
        
        function mundulaShowToast(msg) {
            var $toast = $('#mundula-toast');
            if ($toast.length === 0) {
                $('body').append('<div id="mundula-toast"></div>');
                $toast = $('#mundula-toast');
            }
            $toast.text(msg).fadeIn(200).delay(2500).fadeOut(200);
        }

        function mundulaTogglePaymentExtraFields() {
            var status = $('#payment-status-select').val();
            var method = $('#payment-method-select').val();
            if ((status === 'czesciowo' || status === 'tak') && (method === 'blik' || method === 'przelew')) {
                $('#payment-date-row').show();
                $('#payment-invoice-row').show();
            } else {
                $('#payment-date-row').hide();
                $('#payment-invoice-row').hide();
            }
        }

        function mundulaRecalculatePaymentRemaining() {
            var status = $('#payment-status-select').val();
            var finalPrice = parseInt($('input[name="cena_finalna"]').val()) || 0;
            var amountPaid = parseInt($('#payment-amount-paid-input').val()) || 0;
            
            var remaining = finalPrice - amountPaid;
            if (remaining < 0) remaining = 0;
            
            $('#payment-remaining-display').text(remaining + ' zł');
            
            if (status === 'czesciowo') {
                $('#payment-amount-row').show();
                $('#payment-remaining-row').show();
                $('#payment-method-row').show();
            } else if (status === 'tak') {
                $('#payment-amount-row').hide();
                $('#payment-remaining-row').hide();
                $('#payment-method-row').show();
            } else {
                $('#payment-amount-row').hide();
                $('#payment-remaining-row').hide();
                $('#payment-method-row').hide();
            }
            mundulaTogglePaymentExtraFields();
        }
        
        $('#payment-status-select').on('change', mundulaRecalculatePaymentRemaining);
        $('#payment-method-select').on('change', mundulaTogglePaymentExtraFields);
        $('#payment-amount-paid-input').on('input', mundulaRecalculatePaymentRemaining);
        $('input[name="cena_finalna"]').on('input', mundulaRecalculatePaymentRemaining);
        $(document).on('input', '.zakres-price', function() {
            setTimeout(mundulaRecalculatePaymentRemaining, 50);
        });
        
        mundulaRecalculatePaymentRemaining();

        // Obsługa częściowego wydania / wysyłki
        var $container = $('#wydane-elementy-container');
        var $addSelect = $('#wydane-elementy-add-select');
        var $tagiContainer = $('#wydane-elementy-tagi');
        var $hiddenInputsContainer = $('#wydane-elementy-hidden-inputs');
        var selectedElements = [];

        // Inicjalizacja przy pierwszym ładowaniu
        if ($container.length) {
            var rawSelected = $container.data('selected');
            if (rawSelected) {
                if (typeof rawSelected === 'string') {
                    try {
                        selectedElements = JSON.parse(rawSelected) || [];
                    } catch(e) {
                        selectedElements = rawSelected.split(',') || [];
                    }
                } else if (Array.isArray(rawSelected)) {
                    selectedElements = rawSelected;
                }
            }
        }

        $('#wydanie-status-select').on('change', function() {
            if ($(this).val() === 'czesc') {
                $('.sekcja-wydanie-czesciowe').show();
                updateWydanieSection();
            } else {
                $('.sekcja-wydanie-czesciowe').hide();
            }
        });

        function updateWydanieSection() {
            if (!$container.length) return;

            // 1. Pobierz wszystkie unikalne elementy z zakresu prac
            var allElements = [];
            $('#zakres-body tr.zakres-row').each(function() {
                var val = $(this).find('input[name*="[elemLabel]"]').val();
                if (val) {
                    val = $.trim(val);
                    if (val && $.inArray(val, allElements) === -1) {
                        allElements.push(val);
                    }
                }
            });

            // Oczyść zaznaczone elementy z takich, które zostały usunięte z zakresu prac
            selectedElements = $.grep(selectedElements, function(val) {
                return $.inArray(val, allElements) !== -1;
            });

            // 2. Wyczyść i uzupełnij dropdown (dodajemy tylko niewybrane elementy)
            $addSelect.empty();
            $addSelect.append('<option value="">— Wybierz element do wydania —</option>');
            $.each(allElements, function(idx, val) {
                if ($.inArray(val, selectedElements) === -1) {
                    $addSelect.append($('<option></option>').val(val).text(val));
                }
            });

            // 3. Odbuduj tagi (odznaki) i ukryte inputy formularza
            $tagiContainer.empty();
            $hiddenInputsContainer.empty();
            $.each(selectedElements, function(idx, val) {
                var $tag = $('<span class="mundula-tag"></span>').text(val + ' ');
                var $remove = $('<span class="mundula-tag-remove">&times;</span>').attr('data-val', val);
                $tag.append($remove);
                $tagiContainer.append($tag);

                // Ukryte inputy pozwalają na zachowanie pełnej kompatybilności z zapisem PHP w tablicy $_POST['wydane_elementy']
                $hiddenInputsContainer.append($('<input type="hidden" name="wydane_elementy[]">').val(val));
            });

            // Dynamicznie dodaj style tagów jeśli jeszcze nie istnieją w nagłówku
            if (!$('#mundula-tag-styles').length) {
                $('head').append('<style id="mundula-tag-styles">' +
                    '.mundula-tag { background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; border: 1px solid #bae6fd; }' +
                    '.mundula-tag-remove { cursor: pointer; font-weight: bold; color: #0284c7; font-size: 14px; margin-left: 2px; }' +
                    '.mundula-tag-remove:hover { color: #dc2626; }' +
                    '</style>');
            }

            // 4. Oblicz elementy pozostałe do wydania
            var remaining = [];
            $.each(allElements, function(idx, val) {
                if ($.inArray(val, selectedElements) === -1) {
                    remaining.push(val);
                }
            });

            var $lista = $('#pozostaje-do-wydania-lista');
            if (remaining.length > 0) {
                $lista.text(remaining.join(', '));
            } else {
                $lista.text('Brak (Wszystko wydane)');
            }
        }

        // Dodanie elementu z listy rozwijanej (lista zamyka się automatycznie, bo to pojedynczy select)
        $addSelect.on('change', function() {
            var val = $(this).val();
            if (val) {
                selectedElements.push(val);
                updateWydanieSection();
                $(this).val(''); // Reset do wartości domyślnej
            }
        });

        // Usuwanie elementu poprzez kliknięcie "x" przy tagu
        $tagiContainer.on('click', '.mundula-tag-remove', function() {
            var val = $(this).data('val');
            selectedElements = $.grep(selectedElements, function(v) {
                return v !== val;
            });
            updateWydanieSection();
        });

        // Uruchomienie na start
        if ($('#wydanie-status-select').val() === 'czesc') {
            updateWydanieSection();
        }

        // Nasłuchiwanie modyfikacji w zakresie prac
        $(document).on('input', '#zakres-body input[name*="[elemLabel]"]', function() {
            updateWydanieSection();
        });
        
        $(document).on('click', '.zakres-remove, #zakres-add', function() {
            setTimeout(updateWydanieSection, 100);
        });
    });

// Podświetlanie i interakcja obsłużona w metaboksie elementy-dostarczone

jQuery(document).ready(function($){
        // Tab switching
        $('.mundula-tab-btn').on('click', function(){
            var target = $(this).data('tab');
            
            // Update button styles
            $('.mundula-tab-btn').removeClass('active').css({
                'background': 'none',
                'color': '#64748b',
                'font-weight': '600',
                'box-shadow': 'none'
            });
            $(this).addClass('active').css({
                'background': '#fff',
                'color': '#1e293b',
                'font-weight': '700',
                'box-shadow': '0 1px 2px rgba(0,0,0,0.05)'
            });
            
            // Switch tabs
            $('.mundula-tab-content').hide();
            $('#' + target).show();
            
            // Trigger filter
            $('#queue-search').trigger('input');
        });

        $('#queue-search').on('input', function() {
            var val = $(this).val().toLowerCase();
            $('.mundula-tab-content:visible tbody tr.queue-row').each(function() {
                var rank = $(this).find('.col-rank').text().toLowerCase();
                var elem = $(this).find('.col-elem').text().toLowerCase();
                if (rank.indexOf(val) !== -1 || elem.indexOf(val) !== -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        // Toggle custom date fields visibility
        $('#period-select').on('change', function() {
            if ($(this).val() === 'custom') {
                $('.custom-date-fields').css('display', 'inline-flex');
            } else {
                $('.custom-date-fields').hide();
            }
        }).trigger('change');

        // CUSTOM AUTO-SUGGEST DLA ZAKRESU PRAC
        $(document).on('focus input', '.zakres-row input[name*="elemLabel"], .zakres-row input[name*="itemLabel"]', function() {
            var $input = $(this);
            var isElem = $input.attr('name').indexOf('elemLabel') >= 0;
            var list = [];
            if (typeof mundulaAdmin !== 'undefined') {
                list = isElem ? (mundulaAdmin.elementy || []) : (mundulaAdmin.uslugi || []);
            }
            var val = $input.val().toLowerCase();

            // Usunięcie starych list sugestii
            $('.mundula-suggest-list').remove();

            // Filtruj elementy w locie (odrzucamy puste i dopasowujemy wpisany tekst)
            var filtered = list.filter(function(item) {
                return item && item.toLowerCase().indexOf(val) !== -1;
            });

            if (filtered.length === 0) return;

            // Stwórz kontener listy sugestii
            var $list = $('<div class="mundula-suggest-list"></div>').css({
                position: 'absolute',
                zIndex: 99999,
                background: '#fff',
                border: '1px solid #c3c4c7',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                maxHeight: '220px',
                overflowY: 'auto',
                width: ($input.outerWidth() - 2) + 'px',
                boxSizing: 'border-box'
            });

            // Wstaw do body i wypozycjonuj dokładnie pod inputem
            $('body').append($list);
            var offset = $input.offset();
            $list.offset({
                top: offset.top + $input.outerHeight() + 2,
                left: offset.left
            });

            // Dodaj dopasowane opcje
            filtered.forEach(function(item) {
                var $item = $('<div class="mundula-suggest-item"></div>')
                    .text(item)
                    .css({
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        borderBottom: '1px solid #f1f5f9',
                        color: '#1e293b'
                    })
                    .hover(
                        function() { $(this).css({ 'background': '#eff6ff', 'color': '#1d4ed8' }); },
                        function() { $(this).css({ 'background': '#fff', 'color': '#1e293b' }); }
                    );

                // Zapisz wartość po kliknięciu myszą (używamy mousedown, żeby wyzwoliło się przed blur)
                $item.on('mousedown', function(e) {
                    e.preventDefault();
                    $input.val(item);
                    $input.trigger('change');
                    $('.mundula-suggest-list').remove();
                });

                $list.append($item);
            });
        });

        // Zamknięcie listy podpowiedzi po wyjściu z pola (blur)
        $(document).on('blur', '.zakres-row input[name*="elemLabel"], .zakres-row input[name*="itemLabel"]', function() {
            setTimeout(function() {
                $('.mundula-suggest-list').remove();
            }, 150);
        });

        // Zamknięcie listy podpowiedzi przy scrollowaniu lub zmianie rozmiaru okna
        $(window).on('resize scroll', function() {
            $('.mundula-suggest-list').remove();
        });
    });