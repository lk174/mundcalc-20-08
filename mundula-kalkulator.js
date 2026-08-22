// ════════════════════════════════════════════════════════════
// STAWKI — ładowane z bazy danych WP
// ════════════════════════════════════════════════════════════
var STAWKI = {"s0": 0, "s1": 20, "s2": 20, "s3": 25, "s4": 45, "s5": 55, "s6": 80, "s7": 95, "s8": 175, "s9": 150, "s10": 190, "s11": 310, "s12": 120, "s13": 180, "s14": 240, "s15": 270, "s16": 300, "s17": 360, "sw0": 15, "sw1": 20, "sw2": 25, "sw3": 45, "sw4": 55, "sw5": 80, "sw6": 95, "sw7": 110, "sw8": 130, "sw9": 175, "sw10": 150, "sw11": 190, "sw12": 220, "sw13": 250, "sw14": 310, "sw15": 120, "sw16": 180, "sw17": 240, "sw18": 270, "sw19": 300, "sw20": 360, "sg12": 120, "sg13": 180, "sg14": 240, "sg15": 270, "sg16": 300, "sg17": 360, "psp1": 20, "psp2": 25, "psp3": 45, "psp4": 55, "psp5": 80, "psp6": 95, "psp7": 120, "psp8": 150, "psp9": 180, "psp10": 210, "psp11": 240, "psp12": 270, "psp13": 300, "psp14": 330, "psp15": 350, "psp16": 360, "s0_czapka": 85, "s1_czapka": 85, "s2_czapka": 85, "s3_czapka": 85, "s4_czapka": 85, "s5_czapka": 85, "s6_czapka": 85, "s7_czapka": 85, "s8_czapka": 85, "s9_czapka": 85, "s10_czapka": 85, "s11_czapka": 85, "s12_czapka": 85, "s13_czapka": 85, "s14_czapka": 85, "s15_czapka": 85, "s16_czapka": 85, "s17_czapka": 85, "s0_czapka_bajorek": 110, "s1_czapka_bajorek": 110, "s2_czapka_bajorek": 110, "s3_czapka_bajorek": 110, "s4_czapka_bajorek": 110, "s5_czapka_bajorek": 110, "s6_czapka_bajorek": 110, "s7_czapka_bajorek": 110, "s8_czapka_bajorek": 110, "s9_czapka_bajorek": 110, "s10_czapka_bajorek": 110, "s11_czapka_bajorek": 110, "s12_czapka_bajorek": 140, "s13_czapka_bajorek": 140, "s14_czapka_bajorek": 140, "s15_czapka_bajorek": 140, "s16_czapka_bajorek": 140, "s17_czapka_bajorek": 140, "sw0_czapka": 85, "sw1_czapka": 85, "sw2_czapka": 85, "sw3_czapka": 85, "sw4_czapka": 85, "sw5_czapka": 85, "sw6_czapka": 85, "sw7_czapka": 85, "sw8_czapka": 85, "sw9_czapka": 85, "sw10_czapka": 85, "sw11_czapka": 85, "sw12_czapka": 85, "sw13_czapka": 85, "sw14_czapka": 85, "sw15_czapka": 85, "sw16_czapka": 85, "sw17_czapka": 85, "sw18_czapka": 85, "sw19_czapka": 85, "sw20_czapka": 85, "sg12_czapka": 85, "sg13_czapka": 85, "sg14_czapka": 85, "sg15_czapka": 85, "sg16_czapka": 85, "sg17_czapka": 85, "psp1_czapka": 85, "psp2_czapka": 85, "psp3_czapka": 85, "psp4_czapka": 85, "psp5_czapka": 85, "psp6_czapka": 85, "psp7_czapka": 85, "psp8_czapka": 85, "psp9_czapka": 85, "psp10_czapka": 85, "psp11_czapka": 85, "psp12_czapka": 85, "psp13_czapka": 85, "psp14_czapka": 85, "psp15_czapka": 85, "psp16_czapka": 85, "s0_beret": 45, "s1_beret": 45, "s2_beret": 45, "s3_beret": 45, "s4_beret": 45, "s5_beret": 45, "s6_beret": 45, "s7_beret": 45, "s8_beret": 45, "s9_beret": 45, "s10_beret": 45, "s11_beret": 45, "s12_beret": 45, "s13_beret": 45, "s14_beret": 45, "s15_beret": 45, "s16_beret": 45, "s17_beret": 45, "s0_beret_bajorek": 75, "s1_beret_bajorek": 75, "s2_beret_bajorek": 75, "s3_beret_bajorek": 75, "s4_beret_bajorek": 75, "s5_beret_bajorek": 75, "s6_beret_bajorek": 75, "s7_beret_bajorek": 75, "s8_beret_bajorek": 75, "s9_beret_bajorek": 75, "s10_beret_bajorek": 75, "s11_beret_bajorek": 75, "s12_beret_bajorek": 95, "s13_beret_bajorek": 95, "s14_beret_bajorek": 95, "s15_beret_bajorek": 95, "s16_beret_bajorek": 95, "s17_beret_bajorek": 95, "s0_pagony": 20, "s1_pagony": 20, "s2_pagony": 20, "s3_pagony": 20, "s4_pagony": 20, "s5_pagony": 20, "s6_pagony": 20, "s7_pagony": 20, "s8_pagony": 20, "s9_pagony": 20, "s10_pagony": 20, "s11_pagony": 20, "s12_pagony": 20, "s13_pagony": 20, "s14_pagony": 20, "s15_pagony": 20, "s16_pagony": 20, "s17_pagony": 20, "sw0_pagony": 20, "sw1_pagony": 20, "sw2_pagony": 20, "sw3_pagony": 20, "sw4_pagony": 20, "sw5_pagony": 20, "sw6_pagony": 20, "sw7_pagony": 20, "sw8_pagony": 20, "sw9_pagony": 20, "sw10_pagony": 20, "sw11_pagony": 20, "sw12_pagony": 20, "sw13_pagony": 20, "sw14_pagony": 20, "sw15_pagony": 20, "sw16_pagony": 20, "sw17_pagony": 20, "sw18_pagony": 20, "sw19_pagony": 20, "sw20_pagony": 20, "sg12_pagony": 20, "sg13_pagony": 20, "sg14_pagony": 20, "sg15_pagony": 20, "sg16_pagony": 20, "sg17_pagony": 20, "psp1_pagony": 20, "psp2_pagony": 20, "psp3_pagony": 20, "psp4_pagony": 20, "psp5_pagony": 20, "psp6_pagony": 20, "psp7_pagony": 20, "psp8_pagony": 20, "psp9_pagony": 20, "psp10_pagony": 20, "psp11_pagony": 20, "psp12_pagony": 20, "psp13_pagony": 20, "psp14_pagony": 20, "psp15_pagony": 20, "psp16_pagony": 20, "s0_kapelusz": 30, "s1_kapelusz": 30, "s2_kapelusz": 30, "s3_kapelusz": 30, "s4_kapelusz": 30, "s5_kapelusz": 30, "s6_kapelusz": 30, "s7_kapelusz": 30, "s8_kapelusz": 30, "s9_kapelusz": 30, "s10_kapelusz": 30, "s11_kapelusz": 30, "s12_kapelusz": 50, "s13_kapelusz": 50, "s14_kapelusz": 50, "s15_kapelusz": 50, "s16_kapelusz": 50, "s17_kapelusz": 50, "oz1": 50, "oz2": 25, "oz3": 25, "oz4": 10, "oz5": 25, "oz6": 25, "ozs1": 50, "ozs2": 25, "ozs6": 25, "ozs3": 25, "ozs4": 10, "ozs7": 25, "ozo1": 30, "ozo2": 35, "ozo3": 10, "ozo4": 20, "ozo5": 25, "ozp1": 50, "ozp2": 25, "ozp3": 10, "ozp4": 25, "ozp5": 25, "ob1": 10, "b1": 25, "b4": 55, "b5": 65, "swoz1": 50, "swoz2": 25, "swoz3": 25, "swoz4": 10, "swoz5": 25, "swozo3": 25, "swozp1": 50, "swozp2": 25, "swozp3": 25, "swozp4": 10, "swozp5": 25, "sgoz1": 50, "sgoz2": 25, "sgoz3": 10, "sgoz4": 25, "sgozo1": 25, "pspoz1": 50, "pspoz2": 25, "pspoz3": 25, "pspoz4": 10, "pspoz5": 25, "pspozo1": 35, "pspozo2": 10, "pspozo3": 25, "pspozp1": 50, "pspozp2": 25, "pspozp3": 25, "pspozp4": 10, "pspozp5": 25, "sh_paczkomat": 15, "sh_kurier": 20, "wp_furazerka_z": 35, "wp_furazerka_bez": 25, "wp_furazerka_zmiana_z": 60, "wp_furazerka_zmiana_bez": 40, "wp_beret_galowy_fee": 25, "wp_beret_zmiana_fee": 25, "wp_beret_nowy_bez": 25, "wp_beret_zmiana_bez": 40, "wp_czapka_nowy_bez": 20, "wp_czapka_zmiana_bez": 25, "wp_czapka_zmiana_fee": 0, "wp_pagony_zmiana_fee": 0, "wp_kapelusz_zmiana_fee": 20, "sw_czapka_nowy_bez": 20, "sw_czapka_zmiana_bez": 25, "sg_czapka_nowy_bez": 20, "sg_czapka_zmiana_bez": 25, "psp_czapka_nowy_bez": 20, "psp_czapka_zmiana_bez": 25, "wp_kapelusz_nowy_bez": 20, "wp_kapelusz_zmiana_bez": 35, "wl_oz_panstwowa_nowa": 50, "wl_oz_panstwowa_wlasna": 25, "wl_oz_rozpoznawcza_wlasna": 25, "wl_oz_korpus_wlasny": 10, "wl_oz_rezerwa_wlasna": 25, "wl_oz_szkolna_wlasna": 25, "wl_oz_odznaki_wlasne": 25, "wl_oz_panstwowa_zmiana": 30, "wl_oz_rozpoznawcza_zmiana": 35, "wl_oz_korpus_zmiana": 10, "wl_oz_rezerwa_zmiana": 20, "wl_oz_odznaki_zmiana": 25, "wl_oz_szkolne_usuniecie": 50, "nagl_proporczyk_beret": 10};

function getP(id) {
  return STAWKI[id] !== undefined ? STAWKI[id] : 0;
}

function getBezPrice(elemId, isChange) {
  var idLower = elemId.toLowerCase();
  if (idLower.indexOf('cr') >= 0 || idLower.indexOf('cg') >= 0 || idLower.indexOf('czapka') >= 0) {
    return isChange ? getP('wp_czapka_zmiana_bez') : getP('wp_czapka_nowy_bez');
  }
  if (idLower.indexOf('bg') >= 0) {
    return isChange ? getP('wp_beret_zmiana_bez') : getP('wp_beret_nowy_bez');
  }
  if (idLower.indexOf('bw') >= 0) {
    return isChange ? getP('wp_beret_zmiana_bez') : getP('wp_beret_nowy_bez');
  }
  if (idLower.indexOf('fu') >= 0) {
    return isChange ? getP('wp_furazerka_zmiana_bez') : getP('wp_furazerka_bez');
  }
  if (idLower.indexOf('kapelusz') >= 0) {
    return isChange ? getP('wp_kapelusz_zmiana_bez') : getP('wp_kapelusz_nowy_bez');
  }
  return 0;
}

function getMatrixPrice(elemId, fromRank, toRank, optionType) {
  var idLower = elemId.toLowerCase();
  
  // Marynarka
  if (idLower.indexOf('mg') >= 0 || idLower.indexOf('mw') >= 0) {
    return (PRICE_CHANGE[fromRank] && PRICE_CHANGE[fromRank][toRank] != null) ? PRICE_CHANGE[fromRank][toRank] : 0;
  }
  // Płaszcz
  if (idLower.indexOf('pl') >= 0) {
    return (PRICE_CHANGE_PLASZCZ[fromRank] && PRICE_CHANGE_PLASZCZ[fromRank][toRank] != null) ? PRICE_CHANGE_PLASZCZ[fromRank][toRank] : 0;
  }
  // Koszula (Naramienniki)
  if (idLower.indexOf('koszula') >= 0) {
    return (PRICE_CHANGE_KOSZULA[fromRank] && PRICE_CHANGE_KOSZULA[fromRank][toRank] != null) ? PRICE_CHANGE_KOSZULA[fromRank][toRank] : 0;
  }
  // Czapka
  if (idLower.indexOf('cr') >= 0 || idLower.indexOf('cg') >= 0 || idLower.indexOf('czapka') >= 0) {
    if (optionType === 'bajorek') {
      return (PRICE_CHANGE_CZAPKA_BAJOREK[fromRank] && PRICE_CHANGE_CZAPKA_BAJOREK[fromRank][toRank] != null) ? PRICE_CHANGE_CZAPKA_BAJOREK[fromRank][toRank] : 0;
    } else {
      return (PRICE_CHANGE_CZAPKA_GOTOWY[fromRank] && PRICE_CHANGE_CZAPKA_GOTOWY[fromRank][toRank] != null) ? PRICE_CHANGE_CZAPKA_GOTOWY[fromRank][toRank] : 0;
    }
  }
  // Beret galowy / wyjściowy
  if (idLower.indexOf('bg') >= 0) {
    if (optionType === 'bajorek') {
      return (PRICE_CHANGE_BERET_GAL_BAJOREK[fromRank] && PRICE_CHANGE_BERET_GAL_BAJOREK[fromRank][toRank] != null) ? PRICE_CHANGE_BERET_GAL_BAJOREK[fromRank][toRank] : 0;
    } else {
      return (PRICE_CHANGE_BERET_GAL_GOTOWY[fromRank] && PRICE_CHANGE_BERET_GAL_GOTOWY[fromRank][toRank] != null) ? PRICE_CHANGE_BERET_GAL_GOTOWY[fromRank][toRank] : 0;
    }
  }
  // Beret polowy
  if (idLower.indexOf('bw') >= 0) {
    return (PRICE_CHANGE_BERET_POL[fromRank] && PRICE_CHANGE_BERET_POL[fromRank][toRank] != null) ? PRICE_CHANGE_BERET_POL[fromRank][toRank] : 0;
  }
  // Furażerka
  if (idLower.indexOf('fu') >= 0) {
    return (PRICE_CHANGE_FURAZERKA[fromRank] && PRICE_CHANGE_FURAZERKA[fromRank][toRank] != null) ? PRICE_CHANGE_FURAZERKA[fromRank][toRank] : 0;
  }
  // Kapelusz
  if (idLower.indexOf('kapelusz') >= 0) {
    if (optionType === 'bajorek') {
      return (PRICE_CHANGE_KAPELUSZ_BAJOREK[fromRank] && PRICE_CHANGE_KAPELUSZ_BAJOREK[fromRank][toRank] != null) ? PRICE_CHANGE_KAPELUSZ_BAJOREK[fromRank][toRank] : 0;
    } else {
      return (PRICE_CHANGE_KAPELUSZ_GOTOWY[fromRank] && PRICE_CHANGE_KAPELUSZ_GOTOWY[fromRank][toRank] != null) ? PRICE_CHANGE_KAPELUSZ_GOTOWY[fromRank][toRank] : 0;
    }
  }
  
  return 0;
}

function updateFlatArrays() {
  ST_BERET_W.forEach(function(item){ item.p = getP(item.id + '_beret'); });
  ST_BERET_G.forEach(function(item){ item.p = getP(item.id + '_beret') + getP('wp_beret_galowy_fee'); });
  ST_BERET_G_BAJOREK.forEach(function(item){ item.p = getP(item.id + '_beret_bajorek'); });
  ST_CZAPKA_G_BAJOREK.forEach(function(item){ item.p = getP(item.id + '_czapka_bajorek'); });
  ST_FURAZERA.forEach(function(item){ item.p = getP('wp_furazerka_z'); });
  ST_FU_ZMIANA.forEach(function(item){ item.p = getP('wp_furazerka_zmiana_z'); });
  ST_BW_ZMIANA.forEach(function(item){ item.p = getP(item.id + '_beret') + getP('wp_beret_zmiana_fee'); });
  ST_BG_ZMIANA.forEach(function(item){ item.p = getP(item.id + '_beret') + getP('wp_beret_galowy_fee') + getP('wp_beret_zmiana_fee'); });
  ST_CR_ZMIANA.forEach(function(item){ item.p = getP(item.id + '_czapka') + getP('wp_czapka_zmiana_fee'); });
  ST_CG_ZMIANA.forEach(function(item){ item.p = getP(item.id + '_czapka') + getP('wp_czapka_zmiana_fee'); });
  ST_CR_NOWA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
  ST_CG_NOWA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
  
  SW_ST_CZAPKA_NOWA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
  SW_ST_CZAPKA_ZMIANA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
  SG_ST_CZAPKA_NOWA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
  SG_ST_CZAPKA_ZMIANA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
  PSP_ST_CZAPKA_NOWA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
  PSP_ST_CZAPKA_ZMIANA.forEach(function(item){ item.p = getP(item.id + '_czapka'); });
}

// Pobierz aktualne stawki z WP
(function() {
  function loadRates() {
    if (typeof mundula_ajax === 'undefined') return false;
    
    // Stawki pozycji
    var fd1 = new FormData();
    fd1.append('action', 'mundula_stawki');
    fd1.append('nonce', mundula_ajax.nonce);
    // Stawki zmian stopni
    var fd2 = new FormData();
    fd2.append('action', 'mundula_price_change');
    fd2.append('nonce', mundula_ajax.nonce);

    Promise.all([
      fetch(mundula_ajax.url, {method:'POST', body:fd1}).then(function(r){ return r.json(); }),
      fetch(mundula_ajax.url, {method:'POST', body:fd2}).then(function(r){ return r.json(); })
    ]).then(function(results) {
      // Stawki pozycji
      if (results[0].success && results[0].data) {
        Object.assign(STAWKI, results[0].data);
        // Aktualizuj ceny w tablicach opcji
        var arraysToUpdate = [ST, OZ, OZ_BERET, OZ_PLASZCZ_SW, OZ_PLASZCZ, OZ_OBS_SZK, OZ_OBS, OZ_SZK, BA, SG_ST, SG_OZ, SG_OZ_OBS, SW_ST, SW_OZ, SW_OZ_OBS, PSP_ST, PSP_OZ, PSP_OZ_OBS, PSP_OZ_PLASZCZ, ST_BERET_G_BAJOREK, ST_CZAPKA_G_BAJOREK];
        var keyMapping = {
          'oz1': 'wl_oz_panstwowa_nowa', 'oz2': 'wl_oz_panstwowa_wlasna', 'oz3': 'wl_oz_rozpoznawcza_wlasna',
          'oz4': 'wl_oz_korpus_wlasny', 'oz5': 'wl_oz_rezerwa_wlasna', 'oz6': 'wl_oz_odznaki_wlasne',
          'ozs1': 'wl_oz_panstwowa_nowa', 'ozs2': 'wl_oz_panstwowa_wlasna', 'ozs6': 'wl_oz_szkolna_wlasna',
          'ozs3': 'wl_oz_rozpoznawcza_wlasna', 'ozs4': 'wl_oz_korpus_wlasny', 'ozs7': 'wl_oz_odznaki_wlasne',
          'ozp1': 'wl_oz_panstwowa_nowa', 'ozp2': 'wl_oz_panstwowa_wlasna', 'ozp3': 'wl_oz_korpus_wlasny',
          'ozp4': 'wl_oz_rozpoznawcza_wlasna', 'ozp5': 'wl_oz_odznaki_wlasne',
          'ozo1': 'wl_oz_szkolne_usuniecie', 'ozo2': 'wl_oz_rozpoznawcza_zmiana', 'ozo3': 'wl_oz_korpus_zmiana',
          'ozo4': 'wl_oz_rezerwa_zmiana', 'ozo5': 'wl_oz_odznaki_zmiana',
          'ob1': 'nagl_proporczyk_beret'
        };
        arraysToUpdate.forEach(function(arr) {
          if (arr && Array.isArray(arr)) {
            arr.forEach(function(item) {
              if (item && item.id) {
                var k = keyMapping[item.id] || item.id;
                item.p = getP(k);
              }
            });
          }
        });
        updateFlatArrays();
      }
      // Stawki zmian stopni
      if (results[1].success && results[1].data) {
        var pc = results[1].data;
        if (pc.PRICE_CHANGE)                 PRICE_CHANGE                 = pc.PRICE_CHANGE;
        if (pc.PRICE_CHANGE_PLASZCZ)         PRICE_CHANGE_PLASZCZ         = pc.PRICE_CHANGE_PLASZCZ;
        if (pc.PRICE_CHANGE_KOSZULA)         PRICE_CHANGE_KOSZULA         = pc.PRICE_CHANGE_KOSZULA;
        if (pc.PRICE_CHANGE_CZAPKA_BAJOREK)   PRICE_CHANGE_CZAPKA_BAJOREK   = pc.PRICE_CHANGE_CZAPKA_BAJOREK;
        if (pc.PRICE_CHANGE_CZAPKA_GOTOWY)    PRICE_CHANGE_CZAPKA_GOTOWY    = pc.PRICE_CHANGE_CZAPKA_GOTOWY;
        if (pc.PRICE_CHANGE_BERET_GAL_BAJOREK) PRICE_CHANGE_BERET_GAL_BAJOREK = pc.PRICE_CHANGE_BERET_GAL_BAJOREK;
        if (pc.PRICE_CHANGE_BERET_GAL_GOTOWY) PRICE_CHANGE_BERET_GAL_GOTOWY = pc.PRICE_CHANGE_BERET_GAL_GOTOWY;
        if (pc.PRICE_CHANGE_BERET_POL)       PRICE_CHANGE_BERET_POL       = pc.PRICE_CHANGE_BERET_POL;
        if (pc.PRICE_CHANGE_FURAZERKA)       PRICE_CHANGE_FURAZERKA       = pc.PRICE_CHANGE_FURAZERKA;
        if (pc.PRICE_CHANGE_KAPELUSZ_BAJOREK) PRICE_CHANGE_KAPELUSZ_BAJOREK = pc.PRICE_CHANGE_KAPELUSZ_BAJOREK;
        if (pc.PRICE_CHANGE_KAPELUSZ_GOTOWY)  PRICE_CHANGE_KAPELUSZ_GOTOWY  = pc.PRICE_CHANGE_KAPELUSZ_GOTOWY;
        if (pc.PRICE_CHANGE_ROK)             PRICE_CHANGE_ROK             = pc.PRICE_CHANGE_ROK;
        if (pc.PRICE_CHANGE_SW)              PRICE_CHANGE_SW              = pc.PRICE_CHANGE_SW;
        if (pc.PRICE_CHANGE_SG)              PRICE_CHANGE_SG              = pc.PRICE_CHANGE_SG;
        if (pc.PRICE_CHANGE_PSP)             PRICE_CHANGE_PSP             = pc.PRICE_CHANGE_PSP;
      }
      if (typeof S !== 'undefined' && S.path && S.path.length === 0) renderView();
    }).catch(function(){});
    
    return true;
  }

  function triggerLoad() {
    if (loadRates()) {
      clearInterval(intervalId);
      events.forEach(function(ev) {
        document.removeEventListener(ev, triggerLoad);
      });
    }
  }

  var intervalId = setInterval(triggerLoad, 200);
  var events = ['mousemove', 'scroll', 'touchstart', 'click', 'seraph_accel_jsFinish'];
  events.forEach(function(ev) {
    document.addEventListener(ev, triggerLoad, {passive: true});
  });
})();


// ════════════════════════════════════════════════════════════
// DANE
// ════════════════════════════════════════════════════════════
var ST = [ // Stopnie
  {id:'s0', l:'Szeregowy',                    p:getP('s0')},
  {id:'s1', l:'Starszy szeregowy',            p:getP('s1')},
  {id:'s2', l:'Starszy szeregowy specjalista',p:getP('s2')},
  {id:'s3', l:'Kapral',                       p:getP('s3')},
  {id:'s4', l:'Starszy kapral',               p:getP('s4')},
  {id:'s5', l:'Plutonowy',                    p:getP('s5')},
  {id:'s6', l:'Sierżant',                     p:getP('s6')},
  {id:'s7', l:'Starszy sierżant',             p:getP('s7')},
  {id:'s8', l:'Młodszy chorąży',              p:getP('s8')},
  {id:'s9', l:'Chorąży',                      p:getP('s9')},
  {id:'s10',l:'Starszy chorąży',              p:getP('s10')},
  {id:'s11',l:'Starszy chorąży sztabowy',     p:getP('s11')},
  {id:'s12',l:'Podporucznik',                 p:getP('s12')},
  {id:'s13',l:'Porucznik',                    p:getP('s13')},
  {id:'s14',l:'Kapitan',                      p:getP('s14')},
  {id:'s15',l:'Major',                        p:getP('s15')},
  {id:'s16',l:'Podpułkownik',                 p:getP('s16')},
  {id:'s17',l:'Pułkownik',                    p:getP('s17')}
];
var OZ = [ // Oznaki przynależności (mundur wyjściowy)
  {id:'oz1',l:'Oznaka przynależności państwowej — oznaka + obszycie',     p:getP('wl_oz_panstwowa_nowa')},
  {id:'oz2',l:'Oznaka przynależności państwowej — tylko obszycie (dostarczę własną)',p:getP('wl_oz_panstwowa_wlasna')},
  {id:'oz3',l:'Oznaka rozpoznawcza jednostki — tylko obszycie (dostarczę własną)',  p:getP('wl_oz_rozpoznawcza_wlasna')},
  {id:'oz4',l:'Oznaka korpusu osobowego — umieszczenie (dostarczę własną)',p:getP('wl_oz_korpus_wlasny')},
  {id:'oz5',l:'Oznaka rezerwy — umieszczenie / obszycie (dostarczę własną)',p:getP('wl_oz_rezerwa_wlasna')},
  {id:'oz6',l:'Odznaki absolwenckie, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)',p:getP('wl_oz_odznaki_wlasne')}
];
var OPT_BERET_W = [
  {id:'bw_z', l:'Oznaka stopnia + obszycie beretu'},
  {id:'bw_b', l:'Tylko obszycie beretu (dostarczę własną oznakę stopnia)'}
];
var OPT_BERET_G = [
  {id:'bg_bajorek', l:'Haft stopnia bajorkiem na berecie'},
  {id:'bg_z',       l:'Stopień na tkaninie + obszycie stopnia'},
  {id:'bg_b',       l:'Tylko obszycie (dostarczę stopień do obszycia)'}
];
var OPT_BERET_G_ZMIANA = [
  {id:'bg_zm_bajorek', l:'Haft stopnia bajorkiem na berecie'},
  {id:'bg_zm_z',       l:'Stopień na tkaninie + obszycie stopnia'},
  {id:'bg_zm_b',       l:'Tylko obszycie (dostarczę stopień do obszycia)'}
];
var OPT_FURAZERA = [
  {id:'fu_z', l:'Oznaka stopnia + obszycie furażerki'},
  {id:'fu_b', l:'Tylko obszycie furażerki (dostarczę własną oznakę stopnia)'}
];
var ST_CR_NOWA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });
var ST_CG_NOWA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });
var ST_BERET_W = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_beret')}; });
var ST_BERET_G = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_beret') + getP('wp_beret_galowy_fee')}; });
var ST_BERET_G_BAJOREK = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_beret_bajorek')}; });
var ST_CZAPKA_G_BAJOREK = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka_bajorek')}; });

function getBajorekCzapkaPrice(rankId) {
  var found = ST_CZAPKA_G_BAJOREK.filter(function(s){ return s.id === rankId; })[0];
  if (found) return found.p;
  if (rankId.indexOf('psp') === 0) {
    var num = parseInt(rankId.replace('psp', ''), 10);
    if (num >= 10) return 140;
  } else if (rankId.indexOf('sg') === 0) {
    var num = parseInt(rankId.replace('sg', ''), 10);
    if (num >= 12) return 140;
  } else if (rankId.indexOf('sw') === 0) {
    var num = parseInt(rankId.replace('sw', ''), 10);
    if (num >= 15) return 140;
  }
  return 110;
}
var ST_FURAZERA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP('wp_furazerka_z')}; });
var ST_FU_ZMIANA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP('wp_furazerka_zmiana_z')}; });
var ST_BW_ZMIANA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_beret') + getP('wp_beret_zmiana_fee')}; });
var ST_BG_ZMIANA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_beret') + getP('wp_beret_galowy_fee') + getP('wp_beret_zmiana_fee')}; });
var ST_CR_ZMIANA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka') + getP('wp_czapka_zmiana_fee')}; });
var ST_CG_ZMIANA = ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka') + getP('wp_czapka_zmiana_fee')}; });
var OZ_BERET = [ // Oznaki dla beretów
  {id:'ob1', l:'Proporczyk rozpoznawczy — umieszczenie (dostarczę własny)', p:getP('nagl_proporczyk_beret')}
];
var OZ_PLASZCZ_SW = [ // Oznaki przynależności (płaszcz SW)
  {id:'swozp1',l:'Oznaka przynależności państwowej — oznaka + obszycie',              p:getP('swozp1')},
  {id:'swozp2',l:'Oznaka przynależności państwowej — tylko obszycie (dostarczę własną)', p:getP('swozp2')},
  {id:'swozp3',l:'Oznaka rozpoznawcza SW — tylko obszycie (dostarczę własną)',        p:getP('swozp3')},
  {id:'swozp4',l:'Oznaka korpusu SW — umieszczenie / obszycie (dostarczę własną)',    p:getP('swozp4')},
  {id:'swozp5',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('swozp5')}
];
var OZ_PLASZCZ = [ // Oznaki przynależności (płaszcz)
  {id:'ozp1',l:'Oznaka przynależności państwowej — oznaka + obszycie',      p:getP('wl_oz_panstwowa_nowa')},
  {id:'ozp2',l:'Oznaka przynależności państwowej — tylko obszycie (dostarczę własną)', p:getP('wl_oz_panstwowa_wlasna')},
  {id:'ozp3',l:'Oznaka korpusu osobowego — umieszczenie (dostarczę własną)', p:getP('wl_oz_korpus_wlasny')},
  {id:'ozp4',l:'Oznaka rozpoznawcza jednostki — tylko obszycie (dostarczę własną)',    p:getP('wl_oz_rozpoznawcza_wlasna')},
  {id:'ozp5',l:'Odznaki absolwenckie, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)',p:getP('wl_oz_odznaki_wlasne')}
];
var OPT_KAPELUSZ_NOWY = [
  {id:'kb', l:'Obszycie stopnia bajorkiem'},
  {id:'kt', l:'Obszycie stopnia na tkaninie zasadniczej'},
  {id:'kb_bez', l:'Tylko obszycie (dostarczę stopień do obszycia)'}
];
var OPT_KAPELUSZ_ZMIANA = [
  {id:'kb_z', l:'Zmiana stopnia - obszycie bajorkiem'},
  {id:'kt_z', l:'Zmiana stopnia - na tkaninie zasadniczej'},
  {id:'kb_zmiana_bez', l:'Tylko obszycie (dostarczę stopień do obszycia)'}
];
var OZ_OBS_SZK = [ // Oznaki przynależności (zmiana stopnia — szkolny, bez rezerwy)
  {id:'ozo1',l:'Usunięcie oznak szkolnych akademii (naramienniki / rękawy)', p:getP('wl_oz_szkolne_usuniecie')},
  {id:'ozo2',l:'Oznaka rozpoznawcza jednostki — zmiana oznaki (dostarczę własną)',      p:getP('wl_oz_rozpoznawcza_zmiana')},
  {id:'ozo3',l:'Oznaka korpusu osobowego — zmiana oznaki (dostarczę własną)', p:getP('wl_oz_korpus_zmiana')},
  {id:'ozo5',l:'Odznaki absolwenckie, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('wl_oz_odznaki_zmiana')}
];
var OZ_OBS = [ // Oznaki przynależności (zmiana stopnia — zawodowcy)
  {id:'ozo1',l:'Usunięcie oznak szkolnych akademii (naramienniki / rękawy)', p:getP('wl_oz_szkolne_usuniecie')},
  {id:'ozo2',l:'Oznaka rozpoznawcza jednostki — zmiana oznaki (dostarczę własną)',      p:getP('wl_oz_rozpoznawcza_zmiana')},
  {id:'ozo3',l:'Oznaka korpusu osobowego — zmiana oznaki (dostarczę własną)', p:getP('wl_oz_korpus_zmiana')},
  {id:'ozo4',l:'Oznaka rezerwy — umieszczenie / obszycie (dostarczę własną)', p:getP('wl_oz_rezerwa_zmiana')},
  {id:'ozo5',l:'Odznaki absolwenckie, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('wl_oz_odznaki_zmiana')}
];
var OZ_SZK = [ // Oznaki przynależności (mundur szkolny podchorążych)
  {id:'ozs1',l:'Oznaka przynależności państwowej — oznaka + obszycie',     p:getP('wl_oz_panstwowa_nowa')},
  {id:'ozs2',l:'Oznaka przynależności państwowej — tylko obszycie (dostarczę własną)',p:getP('wl_oz_panstwowa_wlasna')},
  {id:'ozs6',l:'Oznaka szkolna WAT, AWL, LAW lub AMW (dostarczę własną)', p:getP('wl_oz_szkolna_wlasna')},
  {id:'ozs3',l:'Oznaka rozpoznawcza jednostki — tylko obszycie (dostarczę własną)',  p:getP('wl_oz_rozpoznawcza_wlasna')},
  {id:'ozs4',l:'Oznaka korpusu osobowego — umieszczenie (dostarczę własną)',p:getP('wl_oz_korpus_wlasny')},
  {id:'ozs7',l:'Odznaki absolwenckie, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)',p:getP('wl_oz_odznaki_wlasne')}
];
var BA = [ // Baretki
  {id:'b1',l:'Baretka jednorzędowa — umieszczenie / obszycie (dostarczę własną)',   p:getP('b1')},
  {id:'b4',l:'Baretka dwurzędowa — umieszczenie / obszycie (dostarczę własną)',   p:getP('b4')},
  {id:'b5',l:'Baretka trzyrzędowa — umieszczenie / obszycie (dostarczę własną)',  p:getP('b5')}
];
var OT_ROG = [ // Otok czapki rogatywki
  {id:'otr_bajorek', l:'Haft stopnia bajorkiem na otoku',                p:0},
  {id:'otr1', l:'Otok + dopasowanie do czapki',                          p:70},
  {id:'otr2', l:'Tylko dopasowanie do czapki (dostarczę własny otok)',  p:20}
];
var OT_GAR = [ // Otok czapki garnizonowej
  {id:'otg_bajorek', l:'Haft stopnia bajorkiem na otoku',                p:0},
  {id:'otg1', l:'Otok z dystynkcją + dopasowanie do czapki (gratis)',    p:70},
  {id:'otg2', l:'Tylko dopasowanie do czapki (dostarczę własny otok)',  p:20}
];
var PC = [ // Podchorążowie
  {id:'p1',l:'Obszycie rękawów i naramienników — 1 rok nauki',p:105},
  {id:'p2',l:'Obszycie rękawów i naramienników — 2 rok nauki',p:135},
  {id:'p3',l:'Obszycie rękawów i naramienników — 3 rok nauki',p:170},
  {id:'p4',l:'Obszycie rękawów i naramienników — 4 rok nauki',p:205},
  {id:'p5',l:'Obszycie rękawów i naramienników — 5 rok nauki',p:140},
  {id:'p6',l:'Obszycie rękawów i naramienników — 6 rok nauki',p:180}
];

// Konfiguracja elementu munduru: lista kroków
// Każdy krok: {id, label, type:'single'|'multi', optional:bool, items:[]}
function plaszczSteps(prefix) {
  return [
    {id:prefix+'_nowy', label:'Obszycie płaszcza', type:'stopien_new',
     withPodchorazy: false, isPaszcz: true, optional:false}
  ];
}
function pspMwSteps(prefix) {
  return [{id:prefix+'_nowy', label:'Obszycie munduru PSP', type:'stopien_new',
           withPodchorazy:false, isPaszcz:false, isPSP:true, optional:false}];
}
function pspPlSteps(prefix) {
  return [{id:prefix+'_nowy', label:'Obszycie płaszcza PSP', type:'stopien_new',
           withPodchorazy:false, isPaszcz:true, isPSP:true, optional:false}];
}
function pspCzapkaSteps(prefix) {
  return [{id:prefix+'_opt', label:'Czapka rogatywka', type:'czapka_opt',
           otTable:OT_ROG, stTable:PSP_ST_CZAPKA_NOWA, stItemsArr:PSP_ST, stalePrice:getP('psp_czapka_nowy_bez'), optional:false}];
}
function pspChangeSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Zmiana stopnia PSP', type:'stopien_psp_change', optional:false}];
}
function pspChangeCzapkaSteps(prefix) {
  return [{id:prefix+'_opt', label:'Czapka rogatywka', type:'zmiana_czapka_opt',
           otTable:OT_ROG, stTable:PSP_ST_CZAPKA_ZMIANA, stItemsArr:PSP_ST, stalePrice:getP('psp_czapka_zmiana_bez'), optional:false}];
}
function sgMwSteps(prefix) {
  return [{id:prefix+'_nowy', label:'Obszycie munduru SG', type:'stopien_new',
           withPodchorazy:false, isPaszcz:false, isSG:true, optional:false}];
}
function sgCzapkaSteps(prefix) {
  return [{id:prefix+'_opt', label:'Czapka', type:'czapka_opt',
           otTable:OT_GAR, stTable:SG_ST_CZAPKA_NOWA, stItemsArr:SG_ST, stalePrice:getP('sg_czapka_nowy_bez'), optional:false}];
}
function sgChangeSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Zmiana stopnia SG', type:'stopien_sg_change', optional:false}];
}
function sgChangeCzapkaSteps(prefix) {
  return [{id:prefix+'_opt', label:'Czapka', type:'zmiana_czapka_opt',
           otTable:OT_GAR, stTable:SG_ST_CZAPKA_ZMIANA, stItemsArr:SG_ST, stalePrice:getP('sg_czapka_zmiana_bez'), optional:false}];
}
function swMwSteps(prefix) {
  return [{id:prefix+'_nowy', label:'Obszycie munduru SW', type:'stopien_new',
           withPodchorazy:false, isPaszcz:false, isSW:true, optional:false}];
}
function swPlSteps(prefix) {
  return [{id:prefix+'_nowy', label:'Obszycie płaszcza SW', type:'stopien_new',
           withPodchorazy:false, isPaszcz:true, isSW:true, isSWPl:true, optional:false}];
}
function swChangeSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Zmiana stopnia SW', type:'stopien_sw_change', optional:false}];
}
function swCzapkaSteps(prefix, isChange) {
  return [{id:prefix+'_opt', label:'Czapka', type: isChange ? 'zmiana_czapka_opt' : 'czapka_opt',
           otTable:OT_GAR, 
           stTable: isChange ? SW_ST_CZAPKA_ZMIANA : SW_ST_CZAPKA_NOWA, 
           stItemsArr:SW_ST, 
           stalePrice: isChange ? getP('sw_czapka_zmiana_bez') : getP('sw_czapka_nowy_bez'), 
           optional:false}];
}
function beretWSteps(prefix) {
  return [{id:prefix+'_opt', label:'Beret munduru polowego', type:'beret_opt',
           optTable:OPT_BERET_W, stTable:ST_BERET_W, stalePrice:getP('wp_beret_w_nowy_bez'), optional:false}];
}
function beretGSteps(prefix) {
  return [{id:prefix+'_opt', label:'Beret munduru galowego / wyjściowego', type:'beret_opt',
           optTable:OPT_BERET_G, stTable:ST_BERET_G, stalePrice:getP('wp_beret_g_nowy_bez'), optional:false}];
}
function furazSteps(prefix) {
  return [{id:prefix+'_opt', label:'Furażerka', type:'beret_opt',
           optTable:OPT_FURAZERA, stTable:ST_FURAZERA, stalePrice:getP('wp_furazerka_bez'), optional:false}];
}
function czapkaRogSteps(prefix) {
  return [
    {id:prefix+'_opt', label:'Czapka rogatywka', type:'czapka_opt',
     otTable:OT_ROG, stTable:ST_CR_NOWA, stalePrice:getP('wp_czapka_rog_nowy_bez'), optional:false}
  ];
}
function czapkaGarSteps(prefix) {
  return [
    {id:prefix+'_opt', label:'Czapka garnizonowa', type:'czapka_opt',
     otTable:OT_GAR, stTable:ST_CG_NOWA, stalePrice:getP('wp_czapka_gar_nowy_bez'), optional:false}
  ];
}
function czapkaSteps(prefix) {
  return czapkaRogSteps(prefix);
}
function mwSteps(prefix, withPodchorazy) {
  return [
    {id:prefix+'_nowy', label:'Obszycie munduru', type:'stopien_new',
     withPodchorazy: !!withPodchorazy, optional:false}
  ];
}

// Drzewo nawigacyjne
// type: 'nav' = lista opcji do wyboru (pojedynczy)
// type: 'elemList' = lista elementów munduru z konfiguracją
// type: 'end' = koniec (brak prac dla tej ścieżki)
var PRICE_CHANGE = {}; // ładowane z WP
var PRICE_CHANGE_PLASZCZ = {};
var PRICE_CHANGE_KOSZULA = {};
var PRICE_CHANGE_CZAPKA_BAJOREK = {};
var PRICE_CHANGE_CZAPKA_GOTOWY = {};
var PRICE_CHANGE_BERET_GAL_BAJOREK = {};
var PRICE_CHANGE_BERET_GAL_GOTOWY = {};
var PRICE_CHANGE_BERET_POL = {};
var PRICE_CHANGE_FURAZERKA = {};
var PRICE_CHANGE_KAPELUSZ_BAJOREK = {};
var PRICE_CHANGE_KAPELUSZ_GOTOWY = {};
function changeStopienSzkSteps(prefix, elemType, isKoszula, isKapelusz) {
  // elemType: 'mw' = marynarka wyjściowa (rok+stopień), 'mg_pl' = galowa/płaszcz (tylko stopień), 'nagl' = nakrycia głowy (tylko stopień, bez oznak)
  return [
    {id:prefix+'_zmiana', label:'Zmiana obszycia', type:'stopien_szk_change', optional:false, elemType: elemType||'mw', isKoszula: !!isKoszula, isKapelusz: !!isKapelusz}
  ];
}
function koszulaSteps(prefix) {
  return [
    {id:prefix+'_nowy', label:'Obszycie naramienników koszuli', type:'stopien_new',
     withPodchorazy: false, isPaszcz: true, isKoszula: true, optional:false}
  ];
}
function changeKoszulaSteps(prefix) {
  return [
    {id:prefix+'_zmiana', label:'Zmiana stopnia', type:'stopien_change', isKoszula:true, optional:false}
  ];
}
function kapeluszSteps(prefix) {
  return [
    {id:prefix+'_opt', label:'Obszycie kapelusza', type:'kapelusz_opt',
     optTable:OPT_KAPELUSZ_NOWY, stalePriceTable:{'kb':'kp_bajorek', 'kt':'kp_tkanina'}, optional:false}
  ];
}
function changeKapeluszSteps(prefix) {
  return [
    {id:prefix+'_opt', label:'Zmiana obszycia kapelusza', type:'kapelusz_opt',
     optTable:OPT_KAPELUSZ_ZMIANA, stalePriceTable:{'kb_z':'kp_bajorek_zmiana', 'kt_z':'kp_tkanina_zmiana'}, optional:false}
  ];
}
function changeBeretWSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Beret munduru polowego', type:'zmiana_beret_opt',
           stTable:ST_BW_ZMIANA, stalePrice:getP('wp_beret_w_zmiana_bez'), optional:false}];
}
function changeBeretGSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Beret munduru galowego / wyjściowego', type:'zmiana_beret_opt',
           optTable:OPT_BERET_G_ZMIANA, stTable:ST_BG_ZMIANA, stalePrice:getP('wp_beret_g_zmiana_bez'), optional:false}];
}
function changeFurazSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Furażerka', type:'zmiana_beret_opt',
           stTable:ST_FU_ZMIANA, stalePrice:getP('wp_furazerka_zmiana_bez'), optional:false}];
}
function changeCzapkaRogSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Czapka rogatywka', type:'zmiana_czapka_opt',
           otTable:OT_ROG, stTable:ST_CR_ZMIANA, stalePrice:getP('wp_czapka_rog_zmiana_bez'), optional:false}];
}
function changeCzapkaGarSteps(prefix) {
  return [{id:prefix+'_zmiana', label:'Czapka garnizonowa', type:'zmiana_czapka_opt',
           otTable:OT_GAR, stTable:ST_CG_ZMIANA, stalePrice:getP('wp_czapka_gar_zmiana_bez'), optional:false}];
}
function changeStopienNaglSteps(prefix, stTable) {
  return [
    {id:prefix+'_zmiana', label:'Zmiana stopnia', type:'stopien_nagl_change', optional:false, stTable:stTable}
  ];
}
function changeStopienSteps(prefix) {
  return [
    {id:prefix+'_zmiana', label:'Zmiana stopnia', type:'stopien_change', optional:false}
  ];
}

var PRICE_CHANGE_ROK = {}; // ładowane z WP

// ════════════════════════════════════════════════════════════
// DANE — STRAŻ GRANICZNA
// ════════════════════════════════════════════════════════════

var SG_ST = [ // Stopnie SG (od podporucznika wzwyż)
  {id:'sg12',l:'Podporucznik',  p:getP('sg12')},
  {id:'sg13',l:'Porucznik',     p:getP('sg13')},
  {id:'sg14',l:'Kapitan',       p:getP('sg14')},
  {id:'sg15',l:'Major',         p:getP('sg15')},
  {id:'sg16',l:'Podpułkownik',  p:getP('sg16')},
  {id:'sg17',l:'Pułkownik',     p:getP('sg17')}
];

var SG_OZ = [ // Oznaki SG (nowy mundur)
  {id:'sgoz1',l:'Oznaka przynależności państwowej i rozpoznawcza — oznaka + obszycie',    p:getP('sgoz1')},
  {id:'sgoz2',l:'Oznaka przynależności państwowej i rozpoznawcza — tylko obszycie (dostarczę własną)', p:getP('sgoz2')},
  {id:'sgoz3',l:'Oznaka korpusu SG — umieszczenie / obszycie (dostarczę własną)',         p:getP('sgoz3')},
  {id:'sgoz4',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('sgoz4')}
];

var SG_OZ_OBS = [ // Oznaki SG (zmiana stopnia)
  {id:'sgozo1',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('sgozo1')}
];

// Czapka SG — jak garnizonowa WP + stopień
var SG_ST_CZAPKA_NOWA = SG_ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });
var SG_ST_CZAPKA_ZMIANA = SG_ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });

// Tablica zmian stopni SG (6x6) — tymczasowo 10 zł
var SG_IDS = ['sg12','sg13','sg14','sg15','sg16','sg17'];
var PRICE_CHANGE_SG = {}; // ładowane z WP

// ════════════════════════════════════════════════════════════
// DANE — SŁUŻBA WIĘZIENNA
// ════════════════════════════════════════════════════════════

var SW_ST = [ // Stopnie SW (bez St.szer.spec, nowe: Sierż.sztab, St.sierż.sztab, Chorąży sztab, St.chorąży sztab)
  {id:'sw0', l:'Szeregowy',                  p:getP('sw0')},
  {id:'sw1', l:'Starszy szeregowy',          p:getP('sw1')},
  {id:'sw2', l:'Kapral',                     p:getP('sw2')},
  {id:'sw3', l:'Starszy kapral',             p:getP('sw3')},
  {id:'sw4', l:'Plutonowy',                  p:getP('sw4')},
  {id:'sw5', l:'Sierżant',                   p:getP('sw5')},
  {id:'sw6', l:'Starszy sierżant',           p:getP('sw6')},
  {id:'sw7', l:'Sierżant sztabowy',          p:getP('sw7')},
  {id:'sw8', l:'Starszy sierżant sztabowy',  p:getP('sw8')},
  {id:'sw9', l:'Młodszy chorąży',            p:getP('sw9')},
  {id:'sw10',l:'Chorąży',                    p:getP('sw10')},
  {id:'sw11',l:'Starszy chorąży',            p:getP('sw11')},
  {id:'sw12',l:'Chorąży sztabowy',           p:getP('sw12')},
  {id:'sw13',l:'Starszy chorąży sztabowy',   p:getP('sw13')},
  {id:'sw15',l:'Podporucznik',               p:getP('sw15')},
  {id:'sw16',l:'Porucznik',                  p:getP('sw16')},
  {id:'sw17',l:'Kapitan',                    p:getP('sw17')},
  {id:'sw18',l:'Major',                      p:getP('sw18')},
  {id:'sw19',l:'Podpułkownik',               p:getP('sw19')},
  {id:'sw20',l:'Pułkownik',                  p:getP('sw20')}
];
var SW_ST_CZAPKA_NOWA = SW_ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });
var SW_ST_CZAPKA_ZMIANA = SW_ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });

var SW_OZ = [ // Oznaki SW (nowy mundur)
  {id:'swoz1',l:'Oznaka przynależności państwowej — oznaka + obszycie',              p:getP('swoz1')},
  {id:'swoz2',l:'Oznaka przynależności państwowej — tylko obszycie (dostarczę własną)',p:getP('swoz2')},
  {id:'swoz3',l:'Oznaka rozpoznawcza SW — tylko obszycie (dostarczę własną)',        p:getP('swoz3')},
  {id:'swoz4',l:'Oznaka korpusu SW — umieszczenie / obszycie (dostarczę własną)',    p:getP('swoz4')},
  {id:'swoz5',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('swoz5')}
];

var SW_OZ_OBS = [ // Oznaki SW (zmiana stopnia)
  {id:'swozo3',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('swozo3')}
];

// Tablica zmian stopni SW (20x20) — tymczasowo 10 zł, do aktualizacji
var SW_IDS = ['sw1','sw2','sw3','sw4','sw5','sw6','sw7','sw8','sw9','sw10','sw11','sw12','sw13','sw15','sw16','sw17','sw18','sw19','sw20'];
var PRICE_CHANGE_SW = {}; // ładowane z WP

// ════════════════════════════════════════════════════════════
// DANE — PAŃSTWOWA STRAŻ POŻARNA
// ════════════════════════════════════════════════════════════

var PSP_ST = [ // Stopnie PSP (bez Strażaka - bez obszycia)
  {id:'psp1', l:'Starszy strażak',      p:getP('psp1')},
  {id:'psp2', l:'Sekcyjny',             p:getP('psp2')},
  {id:'psp3', l:'Starszy sekcyjny',     p:getP('psp3')},
  {id:'psp4', l:'Młodszy ogniomistrz',  p:getP('psp4')},
  {id:'psp5', l:'Ogniomistrz',          p:getP('psp5')},
  {id:'psp6', l:'Starszy ogniomistrz',  p:getP('psp6')},
  {id:'psp7', l:'Młodszy aspirant',     p:getP('psp7')},
  {id:'psp8', l:'Aspirant',             p:getP('psp8')},
  {id:'psp9', l:'Starszy aspirant',     p:getP('psp9')},
  {id:'psp10',l:'Aspirant sztabowy',    p:getP('psp10')},
  {id:'psp11',l:'Młodszy kapitan',      p:getP('psp11')},
  {id:'psp12',l:'Kapitan',              p:getP('psp12')},
  {id:'psp13',l:'Starszy kapitan',      p:getP('psp13')},
  {id:'psp14',l:'Młodszy brygadier',    p:getP('psp14')},
  {id:'psp15',l:'Brygadier',            p:getP('psp15')},
  {id:'psp16',l:'Starszy brygadier',    p:getP('psp16')}
];

var PSP_OZ = [ // Oznaki PSP (nowy mundur)
  {id:'pspoz1',l:'Oznaka przynależności państwowej — oznaka + obszycie',              p:getP('pspoz1')},
  {id:'pspoz2',l:'Oznaka przynależności państwowej — tylko obszycie (dostarczę własną)', p:getP('pspoz2')},
  {id:'pspoz3',l:'Oznaka rozpoznawcza jednostki — tylko obszycie (dostarczę własną)',           p:getP('pspoz3')},
  {id:'pspoz4',l:'Oznaka korpusu osobowego — umieszczenie (dostarczę własną)',        p:getP('pspoz4')},
  {id:'pspoz5',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('pspoz5')}
];

var PSP_OZ_OBS = [ // Oznaki PSP (zmiana stopnia)
  {id:'pspozo1',l:'Oznaka rozpoznawcza jednostki — zmiana oznaki (dostarczę własną)',           p:getP('pspozo1')},
  {id:'pspozo2',l:'Oznaka korpusu osobowego — zmiana oznaki (dostarczę własną)',      p:getP('pspozo2')},
  {id:'pspozo3',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('pspozo3')}
];

var PSP_OZ_PLASZCZ = [ // Oznaki PSP (płaszcz)
  {id:'pspozp1',l:'Oznaka przynależności państwowej — oznaka + obszycie',             p:getP('pspozp1')},
  {id:'pspozp2',l:'Oznaka przynależności państwowej — tylko obszycie (dostarczę własną)', p:getP('pspozp2')},
  {id:'pspozp3',l:'Oznaka rozpoznawcza jednostki — tylko obszycie (dostarczę własną)',          p:getP('pspozp3')},
  {id:'pspozp4',l:'Oznaka korpusu osobowego — umieszczenie (dostarczę własną)',       p:getP('pspozp4')},
  {id:'pspozp5',l:'Odznaki honorowe, pamiątkowe i inne — umieszczenie / obszycie (dostarczę własną)', p:getP('pspozp5')}
];

var PSP_ST_CZAPKA_NOWA = PSP_ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });
var PSP_ST_CZAPKA_ZMIANA = PSP_ST.map(function(s){ return {id:s.id, l:s.l, p:getP(s.id + '_czapka')}; });

// Tablica zmian stopni PSP (16x16) — tymczasowo 10 zł
var PSP_IDS = ['psp1','psp2','psp3','psp4','psp5','psp6','psp7','psp8','psp9','psp10','psp11','psp12','psp13','psp14','psp15','psp16'];
var PRICE_CHANGE_PSP = {}; // ładowane z WP

var TREE = {id:'root', label:'Wybierz rodzaj służby', type:'nav', opts:[
  {id:'wp', label:'Wojsko Polskie', stepLabel:'Wybierz rodzaj wojsk', type:'nav', opts:[
    {id:'wl', label:'Wojska Lądowe', stepLabel:'Wybierz rodzaj munduru Wojsk Lądowych', type:'nav', opts:[
      {id:'wl_zaw', label:'Mundur żołnierza zawodowego', type:'nav', opts:[
        {id:'wl_nowy', label:'Mundur nowy bez dystynkcji', type:'elemList', elems:[
          {id:'mg',  label:'Marynarka munduru galowego',    steps:mwSteps('wl_mg', false)},
          {id:'mw',  label:'Marynarka munduru wyjściowego', steps:mwSteps('wl_mw', false)},
          {id:'pl',  label:'Płaszcz',                      steps:plaszczSteps('wl_pl')},
          {id:'wl_koszula', label:'Naramienniki koszuli',          steps:koszulaSteps('wl_koszula')},
          {id:'wl_cr',  label:'Czapka rogatywka',              steps:czapkaSteps('wl_cr')},
          {id:'wl_bg',  label:'Beret munduru galowego / wyjściowego',        steps:beretGSteps('wl_bg')},
          {id:'wl_bw',  label:'Beret munduru polowego',     steps:beretWSteps('wl_bw')},
          {id:'wl_fu',  label:'Furażerka',                     steps:furazSteps('wl_fu')},
          {id:'wl_kapelusz', label:'Kapelusz Podhalański / Huculski', steps:kapeluszSteps('wl_kapelusz')}
        ]},
        {id:'wl_obs', label:'Mundur obszyty — zmiana dystynkcji (stopnia)', type:'elemList', elems:[
          {id:'obs_mg',  label:'Marynarka munduru galowego',    steps:changeStopienSteps('obs_mg')},
          {id:'obs_mw',  label:'Marynarka munduru wyjściowego', steps:changeStopienSteps('obs_mw')},
          {id:'obs_pl',  label:'Płaszcz',                      steps:changeStopienSteps('obs_pl')},
          {id:'wl_obs_koszula', label:'Naramienniki koszuli',          steps:changeKoszulaSteps('wl_obs_koszula')},
          {id:'obs_cr',  label:'Czapka rogatywka',              steps:changeCzapkaRogSteps('obs_cr')},
          {id:'obs_bg',  label:'Beret munduru galowego / wyjściowego',        steps:changeBeretGSteps('obs_bg')},
          {id:'obs_bw',  label:'Beret munduru polowego',     steps:changeBeretWSteps('obs_bw')},
          {id:'wl_obs_fu',  label:'Furażerka',                     steps:changeFurazSteps('wl_obs_fu')},
          {id:'wl_obs_kapelusz', label:'Kapelusz Podhalański / Huculski', steps:changeKapeluszSteps('wl_obs_kapelusz')}
        ]}
      ]},
      {id:'wl_szk', label:'Mundur szkolny podchorążych', type:'nav', opts:[
        {id:'wl_szk_nowy', label:'Mundur nowy bez dystynkcji', type:'elemList', elems:[
          {id:'mgs',  label:'Marynarka munduru galowego',    steps:mwSteps('wl_mgs', true)},
          {id:'mws',  label:'Marynarka munduru wyjściowego', steps:mwSteps('wl_mws', true)},
          {id:'pls',  label:'Płaszcz',                      steps:plaszczSteps('wl_pls')},
          {id:'wl_szk_koszula', label:'Naramienniki koszuli',          steps:koszulaSteps('wl_szk_koszula')},
          {id:'crs',  label:'Czapka rogatywka',              steps:czapkaSteps('wl_crs')},
          {id:'bgs',  label:'Beret munduru galowego / wyjściowego',        steps:beretGSteps('wl_bgs')},
          {id:'bws',  label:'Beret munduru polowego',     steps:beretWSteps('wl_bws')},
          {id:'wl_fus',  label:'Furażerka',                     steps:furazSteps('wl_fus')},
          {id:'wl_szk_kapelusz', label:'Kapelusz Podhalański / Huculski', steps:kapeluszSteps('wl_szk_kapelusz')}
        ]},
        {id:'wl_szk_obs', label:'Mundur obszyty (zmiana stopnia lub roku nauki)', type:'elemList', elems:[
          {id:'szk_obs_mg',  label:'Marynarka munduru galowego',    steps:changeStopienSzkSteps('szk_obs_mg','mw')},
          {id:'szk_obs_mw',  label:'Marynarka munduru wyjściowego', steps:changeStopienSzkSteps('szk_obs_mw','mw')},
          {id:'szk_obs_pl',  label:'Płaszcz',                      steps:changeStopienSzkSteps('szk_obs_pl','mg_pl')},
          {id:'wl_szk_obs_koszula', label:'Naramienniki koszuli',          steps:changeStopienSzkSteps('wl_szk_obs_koszula', 'mg_pl', true)},
          {id:'szk_obs_cr',  label:'Czapka rogatywka',              steps:changeStopienSzkSteps('szk_obs_cr','nagl')},
          {id:'szk_obs_bg',  label:'Beret munduru galowego / wyjściowego',        steps:changeStopienSzkSteps('szk_obs_bg','beret_g')},
          {id:'szk_obs_bw',  label:'Beret munduru polowego',     steps:changeStopienSzkSteps('szk_obs_bw','beret_w')},
          {id:'wl_szk_obs_fu',  label:'Furażerka',                     steps:changeStopienSzkSteps('wl_szk_obs_fu','nagl')},
          {id:'wl_szk_obs_kapelusz', label:'Kapelusz Podhalański / Huculski', steps:changeKapeluszSteps('wl_szk_obs_kapelusz')}
        ]}
      ]}
    ]},
    {id:'sp', label:'Siły Powietrzne', type:'nav', opts:[
      {id:'sp_zaw', label:'Mundur żołnierza zawodowego', type:'nav', opts:[
        {id:'sp_nowy', label:'Mundur nowy bez dystynkcji', type:'elemList', elems:[
          {id:'sp_mg',  label:'Marynarka munduru galowego',    steps:mwSteps('sp_mg', false)},
          {id:'sp_mw',  label:'Marynarka munduru wyjściowego', steps:mwSteps('sp_mw', false)},
          {id:'sp_pl',  label:'Płaszcz',                      steps:plaszczSteps('sp_pl')},
          {id:'sp_koszula', label:'Naramienniki koszuli',          steps:koszulaSteps('sp_koszula')},
          {id:'sp_cg',  label:'Czapka garnizonowa',            steps:czapkaGarSteps('sp_cg')},
          {id:'sp_fu',  label:'Furażerka',                     steps:furazSteps('sp_fu')}
        ]},
        {id:'sp_obs', label:'Mundur obszyty — zmiana dystynkcji (stopnia)', type:'elemList', elems:[
          {id:'sp_obs_mg',  label:'Marynarka munduru galowego',    steps:changeStopienSteps('sp_obs_mg')},
          {id:'sp_obs_mw',  label:'Marynarka munduru wyjściowego', steps:changeStopienSteps('sp_obs_mw')},
          {id:'sp_obs_pl',  label:'Płaszcz',                      steps:changeStopienSteps('sp_obs_pl')},
          {id:'sp_obs_koszula', label:'Naramienniki koszuli',          steps:changeKoszulaSteps('sp_obs_koszula')},
          {id:'sp_obs_cg',  label:'Czapka garnizonowa',            steps:changeCzapkaGarSteps('sp_obs_cg')},
          {id:'sp_obs_fu',  label:'Furażerka',                     steps:changeFurazSteps('sp_obs_fu')}
        ]}
      ]},
      {id:'sp_szk', label:'Mundur szkolny podchorążych', type:'nav', opts:[
        {id:'sp_szk_nowy', label:'Mundur nowy bez dystynkcji', type:'elemList', elems:[
          {id:'sp_mgs',  label:'Marynarka munduru galowego',    steps:mwSteps('sp_mgs', true)},
          {id:'sp_mws',  label:'Marynarka munduru wyjściowego', steps:mwSteps('sp_mws', true)},
          {id:'sp_pls',  label:'Płaszcz',                      steps:plaszczSteps('sp_pls')},
          {id:'sp_szk_koszula', label:'Naramienniki koszuli',          steps:koszulaSteps('sp_szk_koszula')},
          {id:'sp_cgs',  label:'Czapka garnizonowa',            steps:czapkaGarSteps('sp_cgs')},
          {id:'sp_fus',  label:'Furażerka',                     steps:furazSteps('sp_fus')}
        ]},
        {id:'sp_szk_obs', label:'Mundur obszyty (zmiana stopnia lub roku nauki)', type:'elemList', elems:[
          {id:'sp_szk_obs_mg',  label:'Marynarka munduru galowego',    steps:changeStopienSzkSteps('sp_szk_obs_mg','mw')},
          {id:'sp_szk_obs_mw',  label:'Marynarka munduru wyjściowego', steps:changeStopienSzkSteps('sp_szk_obs_mw','mw')},
          {id:'sp_szk_obs_pl',  label:'Płaszcz',                      steps:changeStopienSzkSteps('sp_szk_obs_pl','mg_pl')},
          {id:'sp_szk_obs_koszula', label:'Naramienniki koszuli',          steps:changeStopienSzkSteps('sp_szk_obs_koszula', 'mg_pl', true)},
          {id:'sp_szk_obs_cg',  label:'Czapka garnizonowa',            steps:changeStopienSzkSteps('sp_szk_obs_cg','nagl')},
          {id:'sp_szk_obs_fu',  label:'Furażerka',                     steps:changeStopienSzkSteps('sp_szk_obs_fu','nagl')}
        ]}
      ]}
    ]},
    {id:'mw', label:'Marynarka Wojenna',type:'end'}
  ]},
  {id:'sw', label:'Służba Więzienna', type:'nav', opts:[
    {id:'sw_nowy', label:'Mundur nowy bez dystynkcji', type:'elemList', elems:[
      {id:'sw_mw', label:'Marynarka munduru',            steps:swMwSteps('sw_mw')},
      {id:'sw_pl', label:'Płaszcz',                      steps:swPlSteps('sw_pl')},
      {id:'sw_cg', label:'Czapka',                       steps:swCzapkaSteps('sw_cg')}
    ]},
    {id:'sw_obs', label:'Mundur obszyty — zmiana dystynkcji (stopnia)', type:'elemList', elems:[
      {id:'sw_obs_mw', label:'Marynarka munduru',            steps:swChangeSteps('sw_obs_mw')},
      {id:'sw_obs_pl', label:'Płaszcz',                      steps:swChangeSteps('sw_obs_pl')},
      {id:'sw_obs_cg', label:'Czapka',                       steps:swCzapkaSteps('sw_obs_cg', true)}
    ]}
  ]},
  {id:'sg', label:'Straż Graniczna', type:'nav', opts:[
    {id:'sg_nowy', label:'Mundur nowy bez dystynkcji', type:'elemList', elems:[
      {id:'sg_mw', label:'Marynarka munduru galowego',  steps:sgMwSteps('sg_mw')},
      {id:'sg_cg', label:'Czapka / Kapelusz',           steps:sgCzapkaSteps('sg_cg')}
    ]},
    {id:'sg_obs', label:'Mundur obszyty — zmiana dystynkcji (stopnia)', type:'elemList', elems:[
      {id:'sg_obs_mw', label:'Marynarka munduru galowego', steps:sgChangeSteps('sg_obs_mw')},
      {id:'sg_obs_cg', label:'Czapka / Kapelusz',          steps:sgChangeCzapkaSteps('sg_obs_cg')}
    ]}
  ]},
  {id:'psz', label:'Państwowa Straż Pożarna', type:'nav', opts:[
    {id:'psz_nowy', label:'Mundur nowy bez dystynkcji', type:'elemList', elems:[
      {id:'psz_mw', label:'Marynarka munduru galowego', steps:pspMwSteps('psz_mw')},
      {id:'psz_pl', label:'Płaszcz',                   steps:pspPlSteps('psz_pl')},
      {id:'psz_cr', label:'Czapka rogatywka',           steps:pspCzapkaSteps('psz_cr')}
    ]},
    {id:'psz_obs', label:'Mundur obszyty — zmiana dystynkcji (stopnia)', type:'elemList', elems:[
      {id:'psz_obs_mw', label:'Marynarka munduru galowego', steps:pspChangeSteps('psz_obs_mw')},
      {id:'psz_obs_pl', label:'Płaszcz',                   steps:pspChangeSteps('psz_obs_pl')},
      {id:'psz_obs_cr', label:'Czapka rogatywka',           steps:pspChangeCzapkaSteps('psz_obs_cr')}
    ]}
  ]}
]};

// ════════════════════════════════════════════════════════════
// STAN
// ════════════════════════════════════════════════════════════
var S = {
  path:[],        // [{id, label}] — wybrana ścieżka nawigacji
  history:[],     // stos widoków do cofnięcia [{type, data}]
  collected:[],   // [{elemLabel, stepLabel, itemLabel, price}]
  elemDone:{},    // {elemId: true/false}
  currentElems:[],// aktualna lista elementów munduru
  expressMode: 'standard' // 'standard', 'express', 'weekend'
};

function reset() {
  S.path = []; S.history = []; S.collected = []; S.elemDone = {}; S.currentElems = []; S.expressMode = 'standard';
  document.getElementById('mundula-subtitle').style.display = '';
  showView('nav', {node: TREE});
}

// ════════════════════════════════════════════════════════════
// ROUTER
// ════════════════════════════════════════════════════════════
function showView(type, data, pushHistory) {
  if (pushHistory !== false) {
    // Zapisz aktualny widok do historii przed zmianą
  }
  document.getElementById('mundula-subtitle').style.display = 'none';
  var cont = document.getElementById('mundula-content');
  cont.innerHTML = '';

  if      (type === 'nav')      renderNav(data.node);
  else if (type === 'elemList') renderElemList(data.node, data.elems);
  else if (type === 'elemCfg')  renderElemCfg(data.elem, data.stepIdx, data.node);
  else if (type === 'end')      renderEnd();
  else if (type === 'summary')  renderSummary();

  // Przewiń do początku kalkulatora
  setTimeout(function() {
    var wrap = document.getElementById('mundula-wrap');
    if (wrap) {
      var top = wrap.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }, 50);
}

// ════════════════════════════════════════════════════════════
// WIDOK: NAWIGACJA (wybór opcji)
// ════════════════════════════════════════════════════════════
function renderNav(node) {
  var cont = document.getElementById('mundula-content');
  renderBasket(cont);

  var card = el('div','card');
  card.appendChild(tag('div','step-tag', S.path.length === 0 ? 'Krok 1' : 'Krok '+(S.path.length+1)));
  card.appendChild(tag('div','step-q', node.stepLabel || node.label));

  var opts = el('div','opts-single');
  node.opts.forEach(function(opt) {
    var btn = el('button','opt');
    btn.textContent = opt.label;
    btn.addEventListener('click', function() {
      S.path.push({id: opt.id, label: opt.label});
      S.history.push({type:'nav', node: node});
      if      (opt.type === 'nav')      showView('nav',      {node: opt});
      else if (opt.type === 'elemList') showView('elemList', {node: node, elems: opt.elems, navOpt: opt});
      else if (opt.type === 'end')      showView('end',      {});
    });
    opts.appendChild(btn);
  });
  card.appendChild(opts);

  var nav = el('div','nav');
  if (S.history.length > 0) {
    var back = el('button','btn-back');
    back.textContent = '← Wstecz';
    back.addEventListener('click', goBack);
    nav.appendChild(back);
  }
  card.appendChild(nav);
  cont.appendChild(card);
}

// ════════════════════════════════════════════════════════════
// WIDOK: LISTA ELEMENTÓW MUNDURU
// ════════════════════════════════════════════════════════════
function renderElemList(navNode, elems) {
  // Jeśli elems przekazano - zapisz; jeśli nie - użyj zapisanych
  if (elems) S.currentElems = elems;
  else elems = S.currentElems;
  if (!elems || elems.length === 0) { goBack(); return; }
  var lastPath = S.path[S.path.length - 1];
  var cont = document.getElementById('mundula-content');
  cont.innerHTML = '';
  renderBasket(cont);

  var card = el('div','card');
  card.appendChild(tag('div','step-tag','Krok '+(S.path.length+1)));
  card.appendChild(tag('div','step-q', lastPath ? lastPath.label : 'Elementy munduru'));
  card.appendChild(tag('div','hint','Wybierz element aby go skonfigurować, następnie wróć i dodaj kolejny'));

  var list = el('div','elem-list');

  elems.forEach(function(elem) {
    (function(elem) {
      var isDone = !!S.elemDone[elem.id];
      var row = el('div','elem-row'+(isDone?' done':''));

      var lbl = el('span','elem-lbl'); lbl.textContent = elem.label;
      var badge = el('span','elem-badge'); badge.textContent = '✓ dodano';
      var btn = el('button','elem-btn'); btn.textContent = isDone ? 'Zmień' : 'Wybierz';

      btn.addEventListener('click', function() {
        S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
        S.elemDone[elem.id] = false;

        if (!elem.steps || elem.steps.length === 0) {
          S.elemDone[elem.id] = true;
          renderElemList(null, elems);
          return;
        }
        // Zapisz elems w historii żeby wrócić
        S.history.push({type:'elemList', elems:elems});
        renderElemCfg(elem, 0, elems);
      });

      row.appendChild(lbl); row.appendChild(badge); row.appendChild(btn);
      list.appendChild(row);
    })(elem);
  });
  card.appendChild(list);

  var nav = el('div','nav');

  if (S.history.length > 0) {
    var back = el('button','btn-back'); back.textContent = '← Wstecz';
    back.addEventListener('click', goBack);
    nav.appendChild(back);
  }

  var hasAny = elems.some(function(e){ return S.elemDone[e.id]; });
  var fin = el('button','btn-next'); fin.textContent = 'Przejdź do wyceny →';
  fin.disabled = !hasAny; fin.style.opacity = hasAny ? '1' : '0.35';
  fin.addEventListener('click', function(){
    if (hasAny) showView('summary', {});
  });
  nav.appendChild(fin);
  card.appendChild(nav);
  cont.appendChild(card);
}

// ════════════════════════════════════════════════════════════
// WIDOK: KONFIGURACJA ELEMENTU (kroki: stopień, oznaki, baretki)
// ════════════════════════════════════════════════════════════
function renderStopienNew(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var selSt = null;   // wybrany stopień
  var selOz = [];     // wybrane oznaki
  var selBa = [];     // wybrane baretki
  var selPc = null;   // podchorążowie (jeśli withPodchorazy)
  var isPaszcz = !!step.isPaszcz;
  var isSW = !!step.isSW;
  var isSG  = !!step.isSG;
  var isPSP = !!step.isPSP;
  var isKoszula = !!step.isKoszula;
  var ozItems = isPSP ? (isPaszcz ? PSP_OZ_PLASZCZ : PSP_OZ) : (isSG ? (isPaszcz ? OZ_PLASZCZ : SG_OZ) : (isSW ? (isPaszcz ? OZ_PLASZCZ_SW : SW_OZ) : (isPaszcz ? OZ_PLASZCZ : (step.withPodchorazy ? OZ_SZK : OZ))));
  var stItems = isPSP ? PSP_ST : (isSG ? SG_ST : (isSW ? SW_ST : ST));
  if (isKoszula) {
    stItems = stItems.filter(function(s){ return s.id !== 's0'; });
  }

  function renderView() {
    cont.innerHTML = '';
    renderBasket(cont);

    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    var stepTitle = isKoszula ? 'Wybierz stopień do obszycia' : 'Wybierz stopień i oznaki do obszycia';
    card.appendChild(tag('div','step-q', stepTitle));

    var wrap = el('div','stopien-change-wrap');

    // ── STOPIEŃ ─────────────────────────────────────────
    var grpSt = el('div','stopien-change-group');
    grpSt.appendChild(tag('div','stopien-change-lbl','Stopień'));

    if (!selSt) {
      var optsSt = el('div','opts-single');
      stItems.forEach(function(s) {
        var btn = el('button','opt');
        btn.textContent = s.l;
        btn.addEventListener('click', function(){
          selSt = s.id;
          renderView();
        });
        optsSt.appendChild(btn);
      });
      grpSt.appendChild(optsSt);
    } else {
      var stLabel = stItems.filter(function(s){return s.id===selSt;})[0].l;
      var selBox = el('div','stopien-selected');
      selBox.innerHTML = '<span class="stopien-selected-val">'+stLabel+'</span>'
        +'<button class="stopien-change-btn">Zmień</button>';
      selBox.querySelector('.stopien-change-btn').addEventListener('click', function(){
        selSt = null; selOz = []; selBa = []; selPc = null; renderView();
      });
      grpSt.appendChild(selBox);
    }
    wrap.appendChild(grpSt);

    // ── PO WYBORZE STOPNIA ────────────────────────────────
    if (selSt) {

      // ── PODCHORĄŻOWIE PIERWSI (tylko szkolny, nie płaszcz) ──────────
      if (step.withPodchorazy && !isPaszcz) {
        var grpPc = el('div','stopien-change-group');
        grpPc.appendChild(tag('div','stopien-change-lbl','Oznaki szkolne podchorążych (opcjonalnie)'));
        var optsPc = el('div','opts-single');
        PC.forEach(function(pc){
          (function(pc){
            var btn = el('button','opt');
            btn.textContent = pc.l;
            if (selPc===pc.id) btn.classList.add('selected');
            btn.addEventListener('click', function(){
              selPc = selPc===pc.id ? null : pc.id;
              renderView();
            });
            optsPc.appendChild(btn);
          })(pc);
        });
        grpPc.appendChild(optsPc);
        wrap.appendChild(grpPc);
      }

      // ── OZNAKI PRZYNALEŻNOŚCI ───────────────────────────
      if (!isKoszula) {
        var grpOz = el('div','stopien-change-group');
        grpOz.appendChild(tag('div','stopien-change-lbl', 'Oznaki przynależności państwowej i rozpoznawcze (opcjonalnie)'));
        var optsOz = el('div','opts-multi');
        ozItems.forEach(function(oz) {
          (function(oz){
            var row = el('div','opt-chk');
            if (selOz.indexOf(oz.id) >= 0) row.classList.add('on');
            row.innerHTML = '<div class="chkbox">&#10003;</div><span class="chk-lbl">'+oz.l+'</span>';
            row.addEventListener('click', function(){
              row.classList.toggle('on');
              var idx = selOz.indexOf(oz.id);
              if (idx >= 0) selOz.splice(idx,1); else selOz.push(oz.id);
            });
            optsOz.appendChild(row);
          })(oz);
        });
        grpOz.appendChild(optsOz);
        wrap.appendChild(grpOz);
      }

      // ── BARETKI (nie dla płaszcza) ────────────────────────
      if (!isPaszcz && !isKoszula) {
      var grpBa = el('div','stopien-change-group');
      grpBa.appendChild(tag('div','stopien-change-lbl','Baretki orderów i odznaczeń (opcjonalnie)'));
      var optsBa = el('div','opts-single');
      BA.forEach(function(ba){
        (function(ba){
          var btn = el('button','opt');
          btn.textContent = ba.l;
          if (selBa === ba.id) btn.classList.add('selected'); else btn.classList.remove('selected');
          btn.addEventListener('click', function(){
            selBa = selBa===ba.id ? null : ba.id;
            renderView();
          });
          optsBa.appendChild(btn);
        })(ba);
      });

      grpBa.appendChild(optsBa);
      wrap.appendChild(grpBa);
      } // end if !isPaszcz
    }

    card.appendChild(wrap);

    // ── NAWIGACJA ───────────────────────────────────────
    var nav = el('div','nav');

    var back = el('button','btn-back');
    back.textContent = '← Wróć do listy elementów';
    back.addEventListener('click', function(){
      S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
      S.elemDone[elem.id] = false;
      for (var i=S.history.length-1;i>=0;i--) {
        if (S.history[i].type==='elemList') { S.history.splice(i,1); break; }
      }
      renderElemList(null, null);
    });
    nav.appendChild(back);

    if (selSt) {
      var nextBtn = el('button','btn-next');
      nextBtn.textContent = 'Dalej →';
      nextBtn.addEventListener('click', function(){
        var stItem = stItems.filter(function(s){return s.id===selSt;})[0];
        S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });

        // Stopień
        var rankPrice = (isPSP || isSG || isSW) ? stItem.p : getMatrixPrice(elem.id, 's0', selSt, 'gotowy');
        S.collected.push({
          elemId: elem.id, elemLabel: elem.label,
          stepLabel: 'Stopień',
          itemLabel: stItem.l + ' — obszycie dystynkcji (stopień)',
          price: rankPrice
        });
        // Oznaki
        if (!isKoszula) {
          selOz.forEach(function(ozId){
            var oz = ozItems.filter(function(o){return o.id===ozId;})[0];
            if (oz) S.collected.push({
              elemId: elem.id, elemLabel: elem.label,
              stepLabel: 'Oznaki przynależności',
              itemLabel: oz.l, price: oz.p
            });
          });
        }
        // Baretki
        if (!isKoszula && selBa) {
          var ba = BA.filter(function(b){return b.id===selBa;})[0];
          if (ba) S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Baretki orderów i odznaczeń',
            itemLabel: ba.l, price: ba.p
          });
        }
        // Podchorążowie
        if (selPc) {
          var pc = PC.filter(function(p){return p.id===selPc;})[0];
          if (pc) S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Oznaki szkolne podchorążych',
            itemLabel: pc.l, price: pc.p
          });
        }
        goToNextStep(elem, stepIdx, S.currentElems);
      });
      nav.appendChild(nextBtn);
    }

    card.appendChild(nav);
    cont.appendChild(card);
  }

  renderView();
}


function renderStopienSzkChange(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var stItemsArr = step.stItemsArr || ST;
  var elemType = step.elemType || 'mw'; // 'mw'=marynarka wyjściowa, 'mg_pl'=galowa/płaszcz, 'beret_w','beret_g','nagl'=nakrycia
  var isMW    = elemType === 'mw';     // pełny tryb: stopień+rok+oznaki+baretki
  var isMGPL  = elemType === 'mg_pl'; // tylko stopień+oznaki (bez roku)
  var isBeret = elemType === 'beret_w' || elemType === 'beret_g'; // stopień+proporczyk
  var isNagl  = elemType === 'nagl';  // tylko stopień, nic więcej
  var isKoszula = !!step.isKoszula;
  var isKapelusz = !!step.isKapelusz;
  var isPaszcz = elem.id.indexOf('pl') >= 0;

  // Dla nakryć głowy i beretów — wymuś tryb stopień
  var mode    = (isBeret || isNagl || isMGPL) ? 'stopien' : null;
  var selZ    = null;  // aktualny stopień
  var selN    = null;  // nowy stopień
  var selZr   = null;  // aktualny rok nauki (tryb 'oba')
  var selNr   = null;  // nowy rok nauki (tryb 'oba')
  var selOz   = [];    // oznaki przynależności
  var selProp = false; // proporczyk (tylko berety)

  var ROKU_LABELS = {
    'r1':'1 rok nauki', 'r2':'2 rok nauki', 'r3':'3 rok nauki',
    'r4':'4 rok nauki', 'r5':'5 rok nauki', 'r6':'6 rok nauki'
  };
  var ROKU_IDS = ['r1','r2','r3','r4','r5','r6'];

  function getPriceRok() {
    if (!selZ || !selN || selZ===selN) return 0;
    return (PRICE_CHANGE_ROK[selZ] && PRICE_CHANGE_ROK[selZ][selN] != null)
      ? PRICE_CHANGE_ROK[selZ][selN] : 0;
  }
  function getPriceSt() {
    if (!selZ || !selN || selZ===selN) return 0;
    // Dla nakryć głowy i beretów — stałe ceny
    if (isBeret && elemType==='beret_w') return 70;   // beret wyjściowy: 45+25
    if (isBeret && elemType==='beret_g') return 95;   // beret galowy: 70+25
    if (isNagl  && elemType==='nagl')    return 85;   // czapki: 70+15 (czapka, furażerka — 60 jeśli fu)
    // Furażerka obszycia szkolnego
    if (step.elemType==='nagl' && elem.id.indexOf('fu')>=0) return 60;
    // Marynarka i płaszcz — z odpowiedniej matrycy
    return getMatrixPrice(elem.id, selZ, selN, 'gotowy');
  }

  function renderView() {
    cont.innerHTML = '';
    renderBasket(cont);

    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', 'Zmiana obszycia'));

    var wrap = el('div','stopien-change-wrap');

    // ── WYBÓR TRYBU ─────────────────────────────────────
    if (!mode) {
      var hint = el('div','hint');
      hint.textContent = 'Co chcesz zmienić?';
      wrap.appendChild(hint);
      var modeOpts = el('div','opts-single');
      [
        {id:'stopien', l:'Zmiana stopnia (awans / korekta)'},
        {id:'rok',     l:'Zmiana roku nauki (kolejny rok akademii)'},
        {id:'oba',     l:'Zmiana stopnia i roku nauki jednocześnie'}
      ].forEach(function(m){
        var btn = el('button','opt'); btn.textContent = m.l;
        btn.addEventListener('click', function(){ mode=m.id; selZ=null; selN=null; selZr=null; selNr=null; renderView(); });
        modeOpts.appendChild(btn);
      });
      wrap.appendChild(modeOpts);
      card.appendChild(wrap);

    } else if (mode === 'stopien') {
      // ── ZMIANA STOPNIA ──────────────────────────────
      var modeBox = el('div','stopien-selected');
      modeBox.innerHTML='<span class="stopien-selected-val">Zmiana stopnia</span><button class="stopien-change-btn">Zmień tryb</button>';
      modeBox.querySelector('.stopien-change-btn').addEventListener('click',function(){ mode=null; selZ=null; selN=null; selOz=[]; renderView(); });
      wrap.appendChild(modeBox);

      // Aktualny stopień
      var grpZ = el('div','stopien-change-group');
      grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
      if (!selZ) {
        var optsZ=el('div','opts-single');
        stItemsArr.forEach(function(s){ var btn=el('button','opt'); btn.textContent=s.l;
          btn.addEventListener('click',function(){ selZ=s.id; if(selN===selZ) selN=null; renderView(); }); optsZ.appendChild(btn); });
        grpZ.appendChild(optsZ);
      } else {
        var lbl=stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
        var b=el('div','stopien-selected');
        b.innerHTML='<span class="stopien-selected-val">'+lbl+'</span><button class="stopien-change-btn">Zmień</button>';
        b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZ=null; selN=null; renderView(); });
        grpZ.appendChild(b);
      }
      wrap.appendChild(grpZ);

      // Nowy stopień
      if (selZ) {
        var grpN=el('div','stopien-change-group');
        grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
        if (!selN) {
          var optsN=el('div','opts-single');
          stItemsArr.forEach(function(s){ if(s.id===selZ) return; var btn=el('button','opt'); btn.textContent=s.l;
            btn.addEventListener('click',function(){ selN=s.id; renderView(); }); optsN.appendChild(btn); });
          grpN.appendChild(optsN);
        } else {
          var nlbl=stItemsArr.filter(function(s){return s.id===selN;})[0].l;
          var nb=el('div','stopien-selected');
          nb.innerHTML='<span class="stopien-selected-val">'+nlbl+'</span><button class="stopien-change-btn">Zmień</button>';
          nb.querySelector('.stopien-change-btn').addEventListener('click',function(){ selN=null; renderView(); });
          grpN.appendChild(nb);
        }
        wrap.appendChild(grpN);
      }

      // Oznaki i proporczyk — zależnie od typu elementu
      if (selZ && selN) {
        if ((isMW || isMGPL) && !isKoszula && !isKapelusz) {
          // Marynarka wyjściowa i galowa/płaszcz — oznaki
          // Przy zmianie roku (lub oba) ukryj "Usunięcie oznak szkolnych" (ozo1) — nielogiczne
          var ozListSzk = OZ_OBS_SZK;
          if (isPaszcz) {
            ozListSzk = ozListSzk.filter(function(oz){ return oz.id !== 'ozo1' && oz.id !== 'ozo5'; });
          } else if (mode==='rok' || mode==='oba') {
            ozListSzk = ozListSzk.filter(function(oz){ return oz.id !== 'ozo1'; });
          }
          var grpOz=el('div','stopien-change-group');
          grpOz.appendChild(tag('div','stopien-change-lbl','Oznaki przynależności państwowej i rozpoznawcze (opcjonalnie)'));
          var optsOz=el('div','opts-multi');
          ozListSzk.forEach(function(oz){ (function(oz){
            var row=el('div','opt-chk'); if(selOz.indexOf(oz.id)>=0) row.classList.add('on');
            row.innerHTML='<div class="chkbox">&#10003;</div><span class="chk-lbl">'+oz.l+'</span>';
            row.addEventListener('click',function(){ row.classList.toggle('on'); var i=selOz.indexOf(oz.id); if(i>=0)selOz.splice(i,1);else selOz.push(oz.id); });
            optsOz.appendChild(row);
          })(oz); });
          grpOz.appendChild(optsOz); wrap.appendChild(grpOz);
        } else if (isBeret) {
          // Beret — tylko proporczyk
          var grpProp=el('div','stopien-change-group');
          grpProp.appendChild(tag('div','stopien-change-lbl','Proporczyk (opcjonalnie)'));
          var optsProp=el('div','opts-single');
          var btnProp=el('button','opt');
          btnProp.textContent=OZ_BERET[0].l;
          if (selProp) btnProp.classList.add('selected'); else btnProp.classList.remove('selected');
          btnProp.addEventListener('click',function(){ selProp=!selProp; renderView(); });
          optsProp.appendChild(btnProp);
          grpProp.appendChild(optsProp); wrap.appendChild(grpProp);
        }
        // isNagl — nic nie pokazujemy
      }
      card.appendChild(wrap);

    } else if (mode === 'rok') {
      // ── ZMIANA ROKU NAUKI ───────────────────────────
      var modeBox=el('div','stopien-selected');
      modeBox.innerHTML='<span class="stopien-selected-val">Zmiana roku nauki</span><button class="stopien-change-btn">Zmień tryb</button>';
      modeBox.querySelector('.stopien-change-btn').addEventListener('click',function(){ mode=null; selZ=null; selN=null; renderView(); });
      wrap.appendChild(modeBox);

      // Aktualny rok
      var grpZ=el('div','stopien-change-group');
      grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty rok nauki'));
      if (!selZ) {
        var optsZ=el('div','opts-single');
        ROKU_IDS.forEach(function(rid){ var btn=el('button','opt'); btn.textContent=ROKU_LABELS[rid];
          btn.addEventListener('click',function(){ selZ=rid; if(selN===selZ)selN=null; renderView(); }); optsZ.appendChild(btn); });
        grpZ.appendChild(optsZ);
      } else {
        var b=el('div','stopien-selected');
        b.innerHTML='<span class="stopien-selected-val">'+ROKU_LABELS[selZ]+'</span><button class="stopien-change-btn">Zmień</button>';
        b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZ=null; selN=null; renderView(); });
        grpZ.appendChild(b);
      }
      wrap.appendChild(grpZ);

      // Nowy rok
      if (selZ) {
        var grpN=el('div','stopien-change-group');
        grpN.appendChild(tag('div','stopien-change-lbl','Nowy rok nauki'));
        if (!selN) {
          var optsN=el('div','opts-single');
          ROKU_IDS.forEach(function(rid){ if(ROKU_IDS.indexOf(rid)<=ROKU_IDS.indexOf(selZ)) return; var btn=el('button','opt'); btn.textContent=ROKU_LABELS[rid];
            btn.addEventListener('click',function(){ selN=rid; renderView(); }); optsN.appendChild(btn); });
          grpN.appendChild(optsN);
        } else {
          var nb=el('div','stopien-selected');
          nb.innerHTML='<span class="stopien-selected-val">'+ROKU_LABELS[selN]+'</span><button class="stopien-change-btn">Zmień</button>';
          nb.querySelector('.stopien-change-btn').addEventListener('click',function(){ selN=null; renderView(); });
          grpN.appendChild(nb);
        }
        wrap.appendChild(grpN);
      }
      card.appendChild(wrap);

    } else if (mode === 'oba') {
      // ── ZMIANA STOPNIA + ROKU NAUKI ─────────────────
      var modeBox=el('div','stopien-selected');
      modeBox.innerHTML='<span class="stopien-selected-val">Zmiana stopnia i roku nauki</span><button class="stopien-change-btn">Zmień tryb</button>';
      modeBox.querySelector('.stopien-change-btn').addEventListener('click',function(){ mode=null; selZ=null; selN=null; selZr=null; selNr=null; renderView(); });
      wrap.appendChild(modeBox);

      // Stopień aktualny
      var grpZ=el('div','stopien-change-group');
      grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
      if (!selZ) {
        var optsZ=el('div','opts-single');
        stItemsArr.forEach(function(s){ var btn=el('button','opt'); btn.textContent=s.l;
          btn.addEventListener('click',function(){ selZ=s.id; if(selN===selZ)selN=null; renderView(); }); optsZ.appendChild(btn); });
        grpZ.appendChild(optsZ);
      } else {
        var lbl=stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
        var b=el('div','stopien-selected');
        b.innerHTML='<span class="stopien-selected-val">'+lbl+'</span><button class="stopien-change-btn">Zmień</button>';
        b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZ=null; selN=null; renderView(); });
        grpZ.appendChild(b);
      }
      wrap.appendChild(grpZ);

      // Stopień nowy
      if (selZ) {
        var grpN=el('div','stopien-change-group');
        grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
        if (!selN) {
          var optsN=el('div','opts-single');
          stItemsArr.forEach(function(s){ if(s.id===selZ) return; var btn=el('button','opt'); btn.textContent=s.l;
            btn.addEventListener('click',function(){ selN=s.id; renderView(); }); optsN.appendChild(btn); });
          grpN.appendChild(optsN);
        } else {
          var nlbl=stItemsArr.filter(function(s){return s.id===selN;})[0].l;
          var nb=el('div','stopien-selected');
          nb.innerHTML='<span class="stopien-selected-val">'+nlbl+'</span><button class="stopien-change-btn">Zmień</button>';
          nb.querySelector('.stopien-change-btn').addEventListener('click',function(){ selN=null; renderView(); });
          grpN.appendChild(nb);
        }
        wrap.appendChild(grpN);
      }

      // Rok aktualny
      if (selZ && selN) {
        var grpZr=el('div','stopien-change-group');
        grpZr.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty rok nauki'));
        if (!selZr) {
          var optsZr=el('div','opts-single');
          ROKU_IDS.forEach(function(rid){ var btn=el('button','opt'); btn.textContent=ROKU_LABELS[rid];
            btn.addEventListener('click',function(){ selZr=rid; if(selNr===selZr)selNr=null; renderView(); }); optsZr.appendChild(btn); });
          grpZr.appendChild(optsZr);
        } else {
          var br=el('div','stopien-selected');
          br.innerHTML='<span class="stopien-selected-val">'+ROKU_LABELS[selZr]+'</span><button class="stopien-change-btn">Zmień</button>';
          br.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZr=null; selNr=null; renderView(); });
          grpZr.appendChild(br);
        }
        wrap.appendChild(grpZr);
      }

      // Rok nowy
      if (selZ && selN && selZr) {
        var grpNr=el('div','stopien-change-group');
        grpNr.appendChild(tag('div','stopien-change-lbl','Nowy rok nauki'));
        if (!selNr) {
          var optsNr=el('div','opts-single');
          ROKU_IDS.forEach(function(rid){ if(ROKU_IDS.indexOf(rid)<=ROKU_IDS.indexOf(selZr)) return; var btn=el('button','opt'); btn.textContent=ROKU_LABELS[rid];
            btn.addEventListener('click',function(){ selNr=rid; renderView(); }); optsNr.appendChild(btn); });
          grpNr.appendChild(optsNr);
        } else {
          var nbr=el('div','stopien-selected');
          nbr.innerHTML='<span class="stopien-selected-val">'+ROKU_LABELS[selNr]+'</span><button class="stopien-change-btn">Zmień</button>';
          nbr.querySelector('.stopien-change-btn').addEventListener('click',function(){ selNr=null; renderView(); });
          grpNr.appendChild(nbr);
        }
        wrap.appendChild(grpNr);
      }

      // Oznaki
      if (selZ && selN && selZr && selNr) {
        var grpOz=el('div','stopien-change-group');
        grpOz.appendChild(tag('div','stopien-change-lbl','Oznaki przynależności państwowej i rozpoznawcze (opcjonalnie)'));
        var optsOz=el('div','opts-multi');
        // W trybie 'oba' (zmiana stopnia i roku) ukryj usunięcie oznak szkolnych
        var ozListSzk = isPaszcz ? OZ_OBS_SZK.filter(function(oz){ return oz.id !== 'ozo1' && oz.id !== 'ozo5'; }) : OZ_OBS_SZK.filter(function(oz){ return oz.id !== 'ozo1'; });
        ozListSzk.forEach(function(oz){ (function(oz){
          var row=el('div','opt-chk'); if(selOz.indexOf(oz.id)>=0) row.classList.add('on');
          row.innerHTML='<div class="chkbox">&#10003;</div><span class="chk-lbl">'+oz.l+'</span>';
          row.addEventListener('click',function(){ row.classList.toggle('on'); var i=selOz.indexOf(oz.id); if(i>=0)selOz.splice(i,1);else selOz.push(oz.id); });
          optsOz.appendChild(row);
        })(oz); });
        grpOz.appendChild(optsOz); wrap.appendChild(grpOz);
      }
      card.appendChild(wrap);
    }

    // ── NAWIGACJA ────────────────────────────────────
    var nav=el('div','nav');
    var back=el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click',function(){
      S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
      S.elemDone[elem.id]=false;
      for(var i=S.history.length-1;i>=0;i--){ if(S.history[i].type==='elemList'){S.history.splice(i,1);break;} }
      renderElemList(null,null);
    });
    nav.appendChild(back);

    // Przycisk Dalej — aktywny gdy wybrano wymagane pola
    var readyToSave = (mode==='stopien' && selZ && selN) || (mode==='rok' && selZ && selN) || (mode==='oba' && selZ && selN && selZr && selNr);
    if (readyToSave) {
      var nextBtn=el('button','btn-next'); nextBtn.textContent='Dalej →';
      nextBtn.addEventListener('click',function(){
        S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
        if (mode==='stopien') {
          var zLbl=stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
          var nLbl=stItemsArr.filter(function(s){return s.id===selN;})[0].l;
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana stopnia', itemLabel:zLbl+' → '+nLbl+' — zmiana dystynkcji (stopnia)', price:getPriceSt()});
          // Oznaki — tylko dla marynarek i płaszcza
          if ((isMW || isMGPL) && !isKoszula && !isKapelusz) {
            var ozListSzk = isPaszcz ? OZ_OBS_SZK.filter(function(oz){ return oz.id !== 'ozo1' && oz.id !== 'ozo5'; }) : OZ_OBS_SZK;
            selOz.forEach(function(ozId){
              var oz=ozListSzk.filter(function(o){return o.id===ozId;})[0];
              if(oz) S.collected.push({elemId:elem.id, elemLabel:elem.label,
                stepLabel:'Oznaki przynależności', itemLabel:oz.l, price:oz.p});
            });
          }
          // Proporczyk — tylko dla beretów
          if (isBeret && selProp) {
            S.collected.push({elemId:elem.id, elemLabel:elem.label,
              stepLabel:'Proporczyk', itemLabel:OZ_BERET[0].l, price:OZ_BERET[0].p});
          }
        } else if (mode==='rok') {
          var zLbl=ROKU_LABELS[selZ], nLbl=ROKU_LABELS[selN];
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana roku nauki', itemLabel:zLbl+' → '+nLbl, price:getPriceRok()});
        } else {
          // Oba — stopień + rok, ceny sumowane
          var zStLbl=stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
          var nStLbl=stItemsArr.filter(function(s){return s.id===selN;})[0].l;
          var pSt=getPriceSt();
          var pRok=(PRICE_CHANGE_ROK[selZr]&&PRICE_CHANGE_ROK[selZr][selNr])?PRICE_CHANGE_ROK[selZr][selNr]:0;
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana stopnia', itemLabel:zStLbl+' → '+nStLbl+' — zmiana dystynkcji (stopnia)', price:pSt});
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana roku nauki', itemLabel:ROKU_LABELS[selZr]+' → '+ROKU_LABELS[selNr], price:pRok});
          var ozListSzk = isPaszcz ? OZ_OBS_SZK.filter(function(oz){ return oz.id !== 'ozo1' && oz.id !== 'ozo5'; }) : OZ_OBS_SZK;
          selOz.forEach(function(ozId){
            var oz=ozListSzk.filter(function(o){return o.id===ozId;})[0];
            if(oz) S.collected.push({elemId:elem.id, elemLabel:elem.label,
              stepLabel:'Oznaki przynależności', itemLabel:oz.l, price:oz.p});
          });
        }
        goToNextStep(elem, stepIdx, S.currentElems);
      });
      nav.appendChild(nextBtn);
    }

    card.appendChild(nav);
    cont.appendChild(card);
  }

  renderView();
}


// ── Beret/Furażerka ZMIANA STOPNIA ──────────────────────────────
function renderZmianaBeretOpt(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var stTable    = step.stTable;
  var stalePrice = step.stalePrice; // 40 zł
  var stItemsArr = step.stItemsArr || ST;
  var optTable   = step.optTable;
  var selOpt = null; // 'bajorek', 'z' lub 'b'
  var selSt  = null; // nowy stopień
  var selProp = false; // czy wybrano proporczyk

  function renderView() {
    cont.innerHTML = ''; renderBasket(cont);
    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', step.label));
    var wrap = el('div','stopien-change-wrap');

    // Wybór z/bez oznaki
    var grpOpt = el('div','stopien-change-group');
    grpOpt.appendChild(tag('div','stopien-change-lbl','Zakres obszycia'));
    if (!selOpt) {
      var optsO = el('div','opts-single');
      if (optTable) {
        optTable.forEach(function(o){ (function(o){
          var btn = el('button','opt'); btn.textContent = o.l;
          btn.addEventListener('click', function(){
            if (o.id === 'bg_zm_bajorek') {
              selOpt = 'bajorek';
            } else {
              selOpt = o.id.slice(-1); // 'z' lub 'b'
            }
            selSt = null;
            renderView();
          });
          optsO.appendChild(btn);
        })(o); });
      } else {
        [{id:'z',l:'Oznaka stopnia + obszycie (nowy stopień)'},{id:'b',l:'Tylko obszycie (dostarczę własną oznakę nowego stopnia)'}].forEach(function(o){
          var btn=el('button','opt'); btn.textContent=o.l;
          btn.addEventListener('click',function(){ selOpt=o.id; selSt=null; renderView(); });
          optsO.appendChild(btn);
        });
      }
      grpOpt.appendChild(optsO);
    } else {
      var chosenLbl = '';
      if (optTable) {
        chosenLbl = optTable.filter(function(o){
          var type = (o.id === 'bg_zm_bajorek') ? 'bajorek' : o.id.slice(-1);
          return type === selOpt;
        })[0].l;
      } else {
        chosenLbl = selOpt==='z' ? 'Oznaka stopnia + obszycie (nowy stopień)' : 'Tylko obszycie (dostarczę własną oznakę nowego stopnia)';
      }
      var b=el('div','stopien-selected');
      b.innerHTML='<span class="stopien-selected-val">'+chosenLbl+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selOpt=null; selSt=null; renderView(); });
      grpOpt.appendChild(b);
    }
    wrap.appendChild(grpOpt);

    // Nowy stopień
    if (selOpt==='z' || selOpt==='bajorek') {
      var grpSt=el('div','stopien-change-group');
      grpSt.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
      if (!selSt) {
        var optsSt=el('div','opts-single');
        stItemsArr.forEach(function(s){ var btn=el('button','opt'); btn.textContent=s.l;
          btn.addEventListener('click',function(){ selSt=s.id; renderView(); }); optsSt.appendChild(btn); });
        grpSt.appendChild(optsSt);
      } else {
        var nb=el('div','stopien-selected');
        nb.innerHTML='<span class="stopien-selected-val">'+stItemsArr.filter(function(s){return s.id===selSt;})[0].l+'</span><button class="stopien-change-btn">Zmień</button>';
        nb.querySelector('.stopien-change-btn').addEventListener('click',function(){ selSt=null; renderView(); });
        grpSt.appendChild(nb);
      }
      wrap.appendChild(grpSt);
    }

    // ── PROPORCZYK (opcjonalnie) ────────────────────
    var ready = selOpt==='b' || ((selOpt==='z' || selOpt==='bajorek') && selSt);
    if (ready && elem.id.indexOf('fu') === -1) { // Nie pokazuj dla furażerki
      var grpProp = el('div','stopien-change-group');
      grpProp.appendChild(tag('div','stopien-change-lbl','Dodatki (opcjonalnie)'));
      var optsProp = el('div','opts-multi');
      var row = el('div','opt-chk');
      if (selProp) row.classList.add('on');
      row.innerHTML = '<div class="chkbox">&#10003;</div><span class="chk-lbl">' + OZ_BERET[0].l + '</span>';
      row.addEventListener('click', function(){
        row.classList.toggle('on');
        selProp = !selProp;
      });
      optsProp.appendChild(row);
      grpProp.appendChild(optsProp);
      wrap.appendChild(grpProp);
    }

    card.appendChild(wrap);

    var nav=el('div','nav');
    var back=el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click',function(){
      S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
      S.elemDone[elem.id]=false;
      for(var i=S.history.length-1;i>=0;i--){if(S.history[i].type==='elemList'){S.history.splice(i,1);break;}}
      renderElemList(null,null);
    });
    nav.appendChild(back);

    if (ready) {
      var nextBtn=el('button','btn-next'); nextBtn.textContent='Dalej →';
      nextBtn.addEventListener('click',function(){
        S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
        if (selOpt==='b') {
          var itemLbl = optTable ? optTable.filter(function(o){ return o.id.slice(-1)==='b'; })[0].l : 'Tylko obszycie (dostarczę własną oznakę nowego stopnia)';
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana obszycia', itemLabel:itemLbl, price:getBezPrice(elem.id, true)});
        } else if (selOpt==='bajorek') {
          var stLbl  = stItemsArr.filter(function(s){ return s.id===selSt; })[0].l;
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana obszycia',
            itemLabel:'Haft stopnia bajorkiem na berecie — ' + stLbl,
            price:getMatrixPrice(elem.id, 's1', selSt, 'bajorek')});
        } else {
          var itemLbl = optTable ? stItemsArr.filter(function(s){return s.id===selSt;})[0].l+' — stopień na tkaninie + obszycie stopnia' : stItemsArr.filter(function(s){return s.id===selSt;})[0].l+' — zmiana dystynkcji (stopnia)';
          var price = getMatrixPrice(elem.id, 's1', selSt, 'gotowy');
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana obszycia',
            itemLabel:itemLbl,
            price:price});
        }
        
        // Dodaj proporczyk jeśli zaznaczony
        if (selProp && elem.id.indexOf('fu') === -1) {
          S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Proporczyk',
            itemLabel: OZ_BERET[0].l,
            price: OZ_BERET[0].p
          });
        }
        
        goToNextStep(elem,stepIdx,S.currentElems);
      });
      nav.appendChild(nextBtn);
    }
    card.appendChild(nav); cont.appendChild(card);
  }
  renderView();
}

// ── Czapka ZMIANA STOPNIA ────────────────────────────────────────
function renderZmianaCzapkaOpt(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var otTable    = step.otTable;
  var stalePrice = step.stalePrice; // 25 zł
  var stItemsArr = step.stItemsArr || ST;
  var selOt  = null; // id opcji otoku
  var selZ   = null; // aktualny stopień
  var selN   = null; // nowy stopień

  function needsSt() { return selOt && (selOt==='otr1'||selOt==='otg1'||selOt==='otr_bajorek'||selOt==='otg_bajorek'); }

  function renderView() {
    cont.innerHTML = ''; renderBasket(cont);
    var card=el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', step.label));
    var wrap=el('div','stopien-change-wrap');

    // Wybór otoku
    var grpOt=el('div','stopien-change-group');
    grpOt.appendChild(tag('div','stopien-change-lbl','Zakres obszycia'));
    if (!selOt) {
      var optsO=el('div','opts-single');
      otTable.forEach(function(o){ var btn=el('button','opt'); btn.textContent=o.l;
        btn.addEventListener('click',function(){ selOt=o.id; selZ=null; selN=null; renderView(); }); optsO.appendChild(btn); });
      grpOt.appendChild(optsO);
    } else {
      var chosenOt=otTable.filter(function(o){return o.id===selOt;})[0];
      var b=el('div','stopien-selected');
      b.innerHTML='<span class="stopien-selected-val">'+chosenOt.l+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selOt=null; selZ=null; selN=null; renderView(); });
      grpOt.appendChild(b);
    }
    wrap.appendChild(grpOt);

    if (needsSt()) {
      // Aktualny stopień
      var grpZ=el('div','stopien-change-group');
      grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
      if (!selZ) {
        var optsZ=el('div','opts-single');
        stItemsArr.forEach(function(s){ var btn=el('button','opt'); btn.textContent=s.l;
          btn.addEventListener('click',function(){ selZ=s.id; if(selN===selZ) selN=null; renderView(); }); optsZ.appendChild(btn); });
        grpZ.appendChild(optsZ);
      } else {
        var bz=el('div','stopien-selected');
        bz.innerHTML='<span class="stopien-selected-val">'+stItemsArr.filter(function(s){return s.id===selZ;})[0].l+'</span><button class="stopien-change-btn">Zmień</button>';
        bz.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZ=null; selN=null; renderView(); });
        grpZ.appendChild(bz);
      }
      wrap.appendChild(grpZ);

      // Nowy stopień
      if (selZ) {
        var grpN=el('div','stopien-change-group');
        grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
        if (!selN) {
          var optsN=el('div','opts-single');
          stItemsArr.forEach(function(s){ if(s.id===selZ) return; var btn=el('button','opt'); btn.textContent=s.l;
            btn.addEventListener('click',function(){ selN=s.id; renderView(); }); optsN.appendChild(btn); });
          grpN.appendChild(optsN);
        } else {
          var bn=el('div','stopien-selected');
          bn.innerHTML='<span class="stopien-selected-val">'+stItemsArr.filter(function(s){return s.id===selN;})[0].l+'</span><button class="stopien-change-btn">Zmień</button>';
          bn.querySelector('.stopien-change-btn').addEventListener('click',function(){ selN=null; renderView(); });
          grpN.appendChild(bn);
        }
        wrap.appendChild(grpN);
      }
    }
    card.appendChild(wrap);

    var nav=el('div','nav');
    var back=el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click',function(){
      S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
      S.elemDone[elem.id]=false;
      for(var i=S.history.length-1;i>=0;i--){if(S.history[i].type==='elemList'){S.history.splice(i,1);break;}}
      renderElemList(null,null);
    });
    nav.appendChild(back);

    var ready = selOt && (!needsSt() || (selZ && selN));
    if (ready) {
      var nextBtn=el('button','btn-next'); nextBtn.textContent='Dalej →';
      nextBtn.addEventListener('click',function(){
        S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
        var chosenOt=otTable.filter(function(o){return o.id===selOt;})[0];
        if (!needsSt()) {
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana otoku', itemLabel:chosenOt.l, price:getBezPrice(elem.id, true)});
        } else if (selOt === 'otr_bajorek' || selOt === 'otg_bajorek') {
          var zLbl=stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
          var nLbl=stItemsArr.filter(function(s){return s.id===selN;})[0].l;
          var price = getMatrixPrice(elem.id, selZ, selN, 'bajorek');
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana otoku',
            itemLabel:chosenOt.l+' — '+zLbl+' → '+nLbl, price:price});
        } else {
          var zLbl=stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
          var nLbl=stItemsArr.filter(function(s){return s.id===selN;})[0].l;
          var price = getMatrixPrice(elem.id, selZ, selN, 'gotowy');
          S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Zmiana otoku',
            itemLabel:chosenOt.l+' — '+zLbl+' → '+nLbl, price:price});
        }
        goToNextStep(elem,stepIdx,S.currentElems);
      });
      nav.appendChild(nextBtn);
    }
    card.appendChild(nav); cont.appendChild(card);
  }
  renderView();
}


function renderKapeluszOpt(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var optTable = step.optTable;
  var stalePriceTable = step.stalePriceTable; // {'kb':'kp_bajorek', 'kt':'kp_tkanina'} itp.
  var selOpt = null; // wybrana opcja ('kb'/'kt' lub 'kb_z'/'kt_z' lub 'kb_bez'/'kb_zmiana_bez')
  var selZ = null;   // wybrany aktualny stopień (dla zmiany)
  var selN = null;   // wybrany nowy stopień (dla zmiany)
  var selSt = null;  // wybrany stopień (dla nowego)

  var isChange = optTable === OPT_KAPELUSZ_ZMIANA;

  function needsSt() {
    return selOpt && selOpt !== 'kb_bez' && selOpt !== 'kb_zmiana_bez';
  }

  function renderView() {
    cont.innerHTML = '';
    renderBasket(cont);

    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', step.label));

    var wrap = el('div','stopien-change-wrap');

    // ── WYBÓR WARIANTU OBSZYCIA ───────────────────────
    var grpOpt = el('div','stopien-change-group');
    grpOpt.appendChild(tag('div','stopien-change-lbl','Zakres obszycia'));
    if (!selOpt) {
      var optsO = el('div','opts-single');
      optTable.forEach(function(o){ (function(o){
        var btn = el('button','opt'); btn.textContent = o.l;
        btn.addEventListener('click', function(){ selOpt = o.id; selZ = null; selN = null; selSt = null; renderView(); });
        optsO.appendChild(btn);
      })(o); });
      grpOpt.appendChild(optsO);
    } else {
      var chosenOpt = optTable.filter(function(o){ return o.id===selOpt; })[0];
      var b = el('div','stopien-selected');
      b.innerHTML = '<span class="stopien-selected-val">'+chosenOpt.l+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click', function(){ selOpt=null; selZ=null; selN=null; selSt=null; renderView(); });
      grpOpt.appendChild(b);
    }
    wrap.appendChild(grpOpt);

    // ── WYBÓR STOPNIA ─────────────────────────────────
    if (needsSt()) {
      if (isChange) {
        // Aktualny stopień
        var grpZ = el('div','stopien-change-group');
        grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
        if (!selZ) {
          var optsZ = el('div','opts-single');
          ST.forEach(function(s){ (function(s){
            var btn = el('button','opt'); btn.textContent = s.l;
            btn.addEventListener('click', function(){ selZ = s.id; if(selN===selZ) selN=null; renderView(); });
            optsZ.appendChild(btn);
          })(s); });
          grpZ.appendChild(optsZ);
        } else {
          var bz = el('div','stopien-selected');
          bz.innerHTML = '<span class="stopien-selected-val">'+ST.filter(function(s){return s.id===selZ;})[0].l+'</span><button class="stopien-change-btn">Zmień</button>';
          bz.querySelector('.stopien-change-btn').addEventListener('click', function(){ selZ=null; selN=null; renderView(); });
          grpZ.appendChild(bz);
        }
        wrap.appendChild(grpZ);

        // Nowy stopień
        if (selZ) {
          var grpN = el('div','stopien-change-group');
          grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
          if (!selN) {
            var optsN = el('div','opts-single');
            ST.forEach(function(s){ if(s.id===selZ) return; (function(s){
              var btn = el('button','opt'); btn.textContent = s.l;
              btn.addEventListener('click', function(){ selN = s.id; renderView(); });
              optsN.appendChild(btn);
            })(s); });
            grpN.appendChild(optsN);
          } else {
            var bn = el('div','stopien-selected');
            bn.innerHTML = '<span class="stopien-selected-val">'+ST.filter(function(s){return s.id===selN;})[0].l+'</span><button class="stopien-change-btn">Zmień</button>';
            bn.querySelector('.stopien-change-btn').addEventListener('click', function(){ selN=null; renderView(); });
            grpN.appendChild(bn);
          }
          wrap.appendChild(grpN);
        }
      } else {
        // Nowy mundur - pojedynczy wybór stopnia
        var grpSt = el('div','stopien-change-group');
        grpSt.appendChild(tag('div','stopien-change-lbl','Wybierz stopień'));
        if (!selSt) {
          var optsSt = el('div','opts-single');
          var stItemsFiltered = ST.filter(function(s){ return s.id !== 's0'; });
          stItemsFiltered.forEach(function(s){ (function(s){
            var btn = el('button','opt'); btn.textContent = s.l;
            btn.addEventListener('click', function(){ selSt = s.id; renderView(); });
            optsSt.appendChild(btn);
          })(s); });
          grpSt.appendChild(optsSt);
        } else {
          var stLbl = ST.filter(function(s){ return s.id===selSt; })[0].l;
          var nb = el('div','stopien-selected');
          nb.innerHTML = '<span class="stopien-selected-val">'+stLbl+'</span><button class="stopien-change-btn">Zmień</button>';
          nb.querySelector('.stopien-change-btn').addEventListener('click', function(){ selSt=null; renderView(); });
          grpSt.appendChild(nb);
        }
        wrap.appendChild(grpSt);
      }
    }

    card.appendChild(wrap);

    var nav = el('div','nav');
    var back = el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click', function(){
      S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
      S.elemDone[elem.id] = false;
      for (var i=S.history.length-1;i>=0;i--){ if(S.history[i].type==='elemList'){S.history.splice(i,1);break;} }
      renderElemList(null, null);
    });
    nav.appendChild(back);

    var ready = selOpt && (!needsSt() || (isChange ? (selZ && selN) : selSt));
    if (ready) {
      var nextBtn = el('button','btn-next'); nextBtn.textContent = 'Dalej →';
      nextBtn.addEventListener('click', function(){
        S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
        var chosenOpt = optTable.filter(function(o){ return o.id===selOpt; })[0];
        
        var calculatedPrice = 0;
        var calculatedLbl = "";
        
        if (selOpt === 'kb_bez') {
          calculatedPrice = getBezPrice(elem.id, false);
          calculatedLbl = chosenOpt.l;
        } else if (selOpt === 'kb_zmiana_bez') {
          calculatedPrice = getBezPrice(elem.id, true);
          calculatedLbl = chosenOpt.l;
        } else {
          if (isChange) {
            var zLbl = ST.filter(function(s){return s.id===selZ;})[0].l;
            var nLbl = ST.filter(function(s){return s.id===selN;})[0].l;
            calculatedPrice = (selOpt === 'kb_z') 
              ? getMatrixPrice(elem.id, selZ, selN, 'bajorek')
              : getMatrixPrice(elem.id, selZ, selN, 'gotowy');
            calculatedLbl = chosenOpt.l + ' — ' + zLbl + ' → ' + nLbl;
          } else {
            var stLbl = ST.filter(function(s){return s.id===selSt;})[0].l;
            calculatedPrice = (selOpt === 'kb')
              ? getMatrixPrice(elem.id, 's0', selSt, 'bajorek')
              : getMatrixPrice(elem.id, 's0', selSt, 'gotowy');
            calculatedLbl = chosenOpt.l + ' — ' + stLbl;
          }
        }

        S.collected.push({
          elemId: elem.id, elemLabel: elem.label,
          stepLabel: step.label,
          itemLabel: calculatedLbl,
          price: calculatedPrice
        });
        goToNextStep(elem, stepIdx, S.currentElems);
      });
      nav.appendChild(nextBtn);
    }

    card.appendChild(nav);
    cont.appendChild(card);
  }

  renderView();
}


function renderCzapkaOpt(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var otTable   = step.otTable;    // OT_ROG lub OT_GAR
  var stTable   = step.stTable;    // ST_CR_ZMIANA lub ST_CG_ZMIANA
  var stalePrice= step.stalePrice; // 20 zł (tylko dopasowanie)
  var stItemsArr = step.stItemsArr || ST;
  if (elem.id === 'wl_cr' || elem.id === 'sp_cg') {
    stItemsArr = stItemsArr.filter(function(s){ return s.id !== 's0'; });
  }
  var selOt  = null;  // id opcji otoku ('otr1'/'otr2' lub 'otg1'/'otg2')
  var selSt  = null;  // id stopnia (tylko jeśli wybrany otok z dystynkcją)

  function needsSt() {
    // Czy wybrany otok wymaga wyboru stopnia?
    return selOt && (selOt === 'otr1' || selOt === 'otg1' || selOt === 'otr_bajorek' || selOt === 'otg_bajorek');
  }

  function renderView() {
    cont.innerHTML = '';
    renderBasket(cont);

    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', step.label));

    var wrap = el('div','stopien-change-wrap');

    // ── WYBÓR OTOKU ─────────────────────────────────
    var grpOt = el('div','stopien-change-group');
    grpOt.appendChild(tag('div','stopien-change-lbl','Zakres obszycia'));
    if (!selOt) {
      var optsO = el('div','opts-single');
      otTable.forEach(function(o){ (function(o){
        var btn = el('button','opt'); btn.textContent = o.l;
        btn.addEventListener('click', function(){ selOt = o.id; selSt = null; renderView(); });
        optsO.appendChild(btn);
      })(o); });
      grpOt.appendChild(optsO);
    } else {
      var chosenOt = otTable.filter(function(o){ return o.id===selOt; })[0];
      var b = el('div','stopien-selected');
      b.innerHTML = '<span class="stopien-selected-val">'+chosenOt.l+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click', function(){ selOt=null; selSt=null; renderView(); });
      grpOt.appendChild(b);
    }
    wrap.appendChild(grpOt);

    // ── WYBÓR STOPNIA (tylko jeśli otok z dystynkcją) ──
    if (needsSt()) {
      var grpSt = el('div','stopien-change-group');
      grpSt.appendChild(tag('div','stopien-change-lbl','Wybierz stopień'));
      if (!selSt) {
        var optsSt = el('div','opts-single');
        stItemsArr.forEach(function(s){ (function(s){
          var btn = el('button','opt'); btn.textContent = s.l;
          btn.addEventListener('click', function(){ selSt = s.id; renderView(); });
          optsSt.appendChild(btn);
        })(s); });
        grpSt.appendChild(optsSt);
      } else {
        var stLbl = stItemsArr.filter(function(s){ return s.id===selSt; })[0].l;
        var nb = el('div','stopien-selected');
        nb.innerHTML = '<span class="stopien-selected-val">'+stLbl+'</span><button class="stopien-change-btn">Zmień</button>';
        nb.querySelector('.stopien-change-btn').addEventListener('click', function(){ selSt=null; renderView(); });
        grpSt.appendChild(nb);
      }
      wrap.appendChild(grpSt);
    }

    card.appendChild(wrap);

    var nav = el('div','nav');
    var back = el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click', function(){
      S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
      S.elemDone[elem.id] = false;
      for (var i=S.history.length-1;i>=0;i--){ if(S.history[i].type==='elemList'){S.history.splice(i,1);break;} }
      renderElemList(null, null);
    });
    nav.appendChild(back);

    var ready = selOt && (!needsSt() || selSt);
    if (ready) {
      var nextBtn = el('button','btn-next'); nextBtn.textContent = 'Dalej →';
      nextBtn.addEventListener('click', function(){
        S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
        var chosenOt = otTable.filter(function(o){ return o.id===selOt; })[0];
        if (!needsSt()) {
          // Tylko dopasowanie — stała cena (Option 3)
          S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Otok czapki',
            itemLabel: chosenOt.l,
            price: getBezPrice(elem.id, false)
          });
        } else {
          // Otok + dopasowanie — cena ze stTable lub bajorek
          var price = (selOt === 'otr_bajorek' || selOt === 'otg_bajorek') 
            ? getMatrixPrice(elem.id, 's0', selSt, 'bajorek')
            : getMatrixPrice(elem.id, 's0', selSt, 'gotowy');
          var stLbl  = stItemsArr.filter(function(s){ return s.id===selSt; })[0].l;
          S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Otok czapki',
            itemLabel: chosenOt.l + ' — ' + stLbl,
            price: price
          });
        }
        goToNextStep(elem, stepIdx, S.currentElems);
      });
      nav.appendChild(nextBtn);
    }

    card.appendChild(nav);
    cont.appendChild(card);
  }

  renderView();
}


function renderBeretOpt(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var optTable  = step.optTable;   // OPT_BERET_W / OPT_BERET_G / OPT_FURAZERA
  var stTable   = step.stTable;    // ST_BERET_W itp.
  var stalePrice= step.stalePrice; // 25 zł (bez własnej oznaki)
  var stItemsArr = step.stItemsArr || ST;
  if (elem.id === 'wl_bw' || elem.id === 'wl_fu' || elem.id === 'sp_fu') {
    stItemsArr = stItemsArr.filter(function(s){ return s.id !== 's0'; });
  }
  var selOpt = null;  // 'bajorek', 'z' lub 'b'
  var selSt  = null;  // id stopnia
  var selProp = false; // czy wybrano proporczyk

  function renderView() {
    cont.innerHTML = '';
    renderBasket(cont);

    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', step.label));

    var wrap = el('div','stopien-change-wrap');

    // ── WYBÓR Z/BEZ OZNAKI ──────────────────────────
    var grpOpt = el('div','stopien-change-group');
    grpOpt.appendChild(tag('div','stopien-change-lbl','Zakres obszycia'));
    if (!selOpt) {
      var optsO = el('div','opts-single');
      optTable.forEach(function(o){ (function(o){
        var btn = el('button','opt'); btn.textContent = o.l;
        btn.addEventListener('click', function(){
          if (o.id === 'bg_bajorek') {
            selOpt = 'bajorek';
          } else {
            selOpt = o.id.slice(-1); // 'z' lub 'b'
          }
          selSt = null;
          renderView();
        });
        optsO.appendChild(btn);
      })(o); });
      grpOpt.appendChild(optsO);
    } else {
      var chosenLbl = optTable.filter(function(o){
        var type = (o.id === 'bg_bajorek') ? 'bajorek' : o.id.slice(-1);
        return type === selOpt;
      })[0].l;
      var b = el('div','stopien-selected');
      b.innerHTML = '<span class="stopien-selected-val">'+chosenLbl+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click', function(){ selOpt=null; selSt=null; renderView(); });
      grpOpt.appendChild(b);
    }
    wrap.appendChild(grpOpt);

    // ── WYBÓR STOPNIA ────────
    if (selOpt === 'z' || selOpt === 'bajorek') {
      var grpSt = el('div','stopien-change-group');
      grpSt.appendChild(tag('div','stopien-change-lbl','Wybierz stopień'));
      if (!selSt) {
        var optsSt = el('div','opts-single');
        stItemsArr.forEach(function(s){ (function(s){
          var btn = el('button','opt'); btn.textContent = s.l;
          btn.addEventListener('click', function(){ selSt = s.id; renderView(); });
          optsSt.appendChild(btn);
        })(s); });
        grpSt.appendChild(optsSt);
      } else {
        var stLbl = stItemsArr.filter(function(s){ return s.id===selSt; })[0].l;
        var nb = el('div','stopien-selected');
        nb.innerHTML = '<span class="stopien-selected-val">'+stLbl+'</span><button class="stopien-change-btn">Zmień</button>';
        nb.querySelector('.stopien-change-btn').addEventListener('click', function(){ selSt=null; renderView(); });
        grpSt.appendChild(nb);
      }
      wrap.appendChild(grpSt);
    }

    // ── PROPORCZYK (opcjonalnie) ────────────────────
    var ready = selOpt === 'b' || ((selOpt === 'z' || selOpt === 'bajorek') && selSt);
    if (ready && elem.id.indexOf('fu') === -1) { // Nie pokazuj dla furażerki
      var grpProp = el('div','stopien-change-group');
      grpProp.appendChild(tag('div','stopien-change-lbl','Dodatki (opcjonalnie)'));
      var optsProp = el('div','opts-multi');
      var row = el('div','opt-chk');
      if (selProp) row.classList.add('on');
      row.innerHTML = '<div class="chkbox">&#10003;</div><span class="chk-lbl">' + OZ_BERET[0].l + '</span>';
      row.addEventListener('click', function(){
        row.classList.toggle('on');
        selProp = !selProp;
      });
      optsProp.appendChild(row);
      grpProp.appendChild(optsProp);
      wrap.appendChild(grpProp);
    }

    card.appendChild(wrap);

    // ── NAWIGACJA ────────────────────────────────────
    var nav = el('div','nav');
    var back = el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click', function(){
      S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
      S.elemDone[elem.id] = false;
      for (var i=S.history.length-1;i>=0;i--){ if(S.history[i].type==='elemList'){S.history.splice(i,1);break;} }
      renderElemList(null, null);
    });
    nav.appendChild(back);

    if (ready) {
      var nextBtn = el('button','btn-next'); nextBtn.textContent = 'Dalej →';
      nextBtn.addEventListener('click', function(){
        S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
        if (selOpt === 'b') {
          S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Obszycie',
            itemLabel: optTable.filter(function(o){ return o.id.slice(-1)==='b'; })[0].l,
            price: getBezPrice(elem.id, false)
          });
        } else if (selOpt === 'bajorek') {
          var stLbl  = stItemsArr.filter(function(s){ return s.id===selSt; })[0].l;
          S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Obszycie',
            itemLabel: 'Haft stopnia bajorkiem na berecie — ' + stLbl,
            price: getMatrixPrice(elem.id, 's0', selSt, 'bajorek')
          });
        } else {
          var stLbl  = stItemsArr.filter(function(s){ return s.id===selSt; })[0].l;
          var itemLbl = elem.id.indexOf('bg') >= 0 ? stLbl + ' — stopień na tkaninie + obszycie stopnia' : stLbl + ' — obszycie dystynkcji (stopień)';
          S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Obszycie',
            itemLabel: itemLbl,
            price: getMatrixPrice(elem.id, 's0', selSt, 'gotowy')
          });
        }
        
        // Dodaj proporczyk jeśli zaznaczony
        if (selProp && elem.id.indexOf('fu') === -1) {
          S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Proporczyk',
            itemLabel: OZ_BERET[0].l,
            price: OZ_BERET[0].p
          });
        }
        
        goToNextStep(elem, stepIdx, S.currentElems);
      });
      nav.appendChild(nextBtn);
    }

    card.appendChild(nav);
    cont.appendChild(card);
  }

  renderView();
}


function renderStopienNaglChange(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var stTable = step.stTable || ST; // tablica ze stałą ceną
  var stItemsArr = step.stItemsArr || ST;
  var selZ = null;
  var selN = null;

  function renderView() {
    cont.innerHTML = '';
    renderBasket(cont);

    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', 'Zmiana stopnia'));

    var wrap = el('div','stopien-change-wrap');

    // Aktualny stopień
    var grpZ = el('div','stopien-change-group');
    grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
    if (!selZ) {
      var optsZ = el('div','opts-single');
      stItemsArr.forEach(function(s){
        var btn = el('button','opt'); btn.textContent = s.l;
        btn.addEventListener('click', function(){ selZ=s.id; if(selN===selZ) selN=null; renderView(); });
        optsZ.appendChild(btn);
      });
      grpZ.appendChild(optsZ);
    } else {
      var lbl = stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
      var b = el('div','stopien-selected');
      b.innerHTML = '<span class="stopien-selected-val">'+lbl+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click', function(){ selZ=null; selN=null; renderView(); });
      grpZ.appendChild(b);
    }
    wrap.appendChild(grpZ);

    // Nowy stopień
    if (selZ) {
      var grpN = el('div','stopien-change-group');
      grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
      if (!selN) {
        var optsN = el('div','opts-single');
        stItemsArr.forEach(function(s){
          if (s.id===selZ) return;
          var btn = el('button','opt'); btn.textContent = s.l;
          btn.addEventListener('click', function(){ selN=s.id; renderView(); });
          optsN.appendChild(btn);
        });
        grpN.appendChild(optsN);
      } else {
        var nlbl = stItemsArr.filter(function(s){return s.id===selN;})[0].l;
        var nb = el('div','stopien-selected');
        nb.innerHTML = '<span class="stopien-selected-val">'+nlbl+'</span><button class="stopien-change-btn">Zmień</button>';
        nb.querySelector('.stopien-change-btn').addEventListener('click', function(){ selN=null; renderView(); });
        grpN.appendChild(nb);
      }
      wrap.appendChild(grpN);
    }

    card.appendChild(wrap);

    var nav = el('div','nav');
    var back = el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click', function(){
      S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
      S.elemDone[elem.id] = false;
      for (var i=S.history.length-1;i>=0;i--){ if(S.history[i].type==='elemList'){S.history.splice(i,1);break;} }
      renderElemList(null, null);
    });
    nav.appendChild(back);

    if (selZ && selN) {
      var nextBtn = el('button','btn-next'); nextBtn.textContent='Dalej →';
      nextBtn.addEventListener('click', function(){
        var zLbl = stItemsArr.filter(function(s){return s.id===selZ;})[0].l;
        var nLbl = stItemsArr.filter(function(s){return s.id===selN;})[0].l;
        // Cena z tablicy stTable (stała dla tego elementu)
        var price = stTable.filter(function(s){return s.id===selN;})[0].p;
        S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
        S.collected.push({
          elemId: elem.id, elemLabel: elem.label,
          stepLabel: 'Zmiana stopnia',
          itemLabel: zLbl+' → '+nLbl+' — zmiana dystynkcji (stopnia)',
          price: price
        });
        goToNextStep(elem, stepIdx, S.currentElems);
      });
      nav.appendChild(nextBtn);
    }

    card.appendChild(nav);
    cont.appendChild(card);
  }

  renderView();
}


function renderStopienPSPChange(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var selZ  = null;
  var selN  = null;
  var selOz = [];
  var selBa = null;

  function getPrice() {
    if (!selZ || !selN || selZ===selN) return 0;
    return (PRICE_CHANGE_PSP[selZ] && PRICE_CHANGE_PSP[selZ][selN] != null)
      ? PRICE_CHANGE_PSP[selZ][selN] : 0;
  }

  function renderView() {
    cont.innerHTML = ''; renderBasket(cont);
    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', 'Zmiana stopnia'));
    var wrap = el('div','stopien-change-wrap');

    // Aktualny stopień
    var grpZ = el('div','stopien-change-group');
    grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
    if (!selZ) {
      var optsZ = el('div','opts-single');
      PSP_ST.forEach(function(s){ var btn=el('button','opt'); btn.textContent=s.l;
        btn.addEventListener('click',function(){ selZ=s.id; if(selN===selZ) selN=null; renderView(); }); optsZ.appendChild(btn); });
      grpZ.appendChild(optsZ);
    } else {
      var lbl=PSP_ST.filter(function(s){return s.id===selZ;})[0].l;
      var b=el('div','stopien-selected');
      b.innerHTML='<span class="stopien-selected-val">'+lbl+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZ=null; selN=null; renderView(); });
      grpZ.appendChild(b);
    }
    wrap.appendChild(grpZ);

    // Nowy stopień
    if (selZ) {
      var grpN=el('div','stopien-change-group');
      grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
      if (!selN) {
        var optsN=el('div','opts-single');
        PSP_ST.forEach(function(s){ if(s.id===selZ) return; var btn=el('button','opt'); btn.textContent=s.l;
          btn.addEventListener('click',function(){ selN=s.id; renderView(); }); optsN.appendChild(btn); });
        grpN.appendChild(optsN);
      } else {
        var nlbl=PSP_ST.filter(function(s){return s.id===selN;})[0].l;
        var nb=el('div','stopien-selected');
        nb.innerHTML='<span class="stopien-selected-val">'+nlbl+'</span><button class="stopien-change-btn">Zmień</button>';
        nb.querySelector('.stopien-change-btn').addEventListener('click',function(){ selN=null; renderView(); });
        grpN.appendChild(nb);
      }
      wrap.appendChild(grpN);
    }

    // Oznaki + baretki
    if (selZ && selN) {
      var isPaszcz = elem.id.indexOf('pl') >= 0;
      var ozList = isPaszcz ? PSP_OZ_OBS.filter(function(o){ return o.id !== 'pspozo3'; }) : PSP_OZ_OBS;

      if (ozList.length > 0) {
        var grpOz=el('div','stopien-change-group');
        grpOz.appendChild(tag('div','stopien-change-lbl','Oznaki przynależności państwowej i rozpoznawcze (opcjonalnie)'));
        var optsOz=el('div','opts-multi');
        ozList.forEach(function(oz){ (function(oz){
          var row=el('div','opt-chk'); if(selOz.indexOf(oz.id)>=0) row.classList.add('on');
          row.innerHTML='<div class="chkbox">&#10003;</div><span class="chk-lbl">'+oz.l+'</span>';
          row.addEventListener('click',function(){ row.classList.toggle('on'); var i=selOz.indexOf(oz.id); if(i>=0)selOz.splice(i,1);else selOz.push(oz.id); });
          optsOz.appendChild(row);
        })(oz); });
        grpOz.appendChild(optsOz); wrap.appendChild(grpOz);
      }

      if (!isPaszcz) {
        var grpBa=el('div','stopien-change-group');
        grpBa.appendChild(tag('div','stopien-change-lbl','Baretki orderów i odznaczeń (opcjonalnie)'));
        var optsBa=el('div','opts-single');
        BA.forEach(function(ba){ (function(ba){
          var btn=el('button','opt'); btn.textContent=ba.l;
          if(selBa===ba.id) btn.classList.add('selected'); else btn.classList.remove('selected');
          btn.addEventListener('click',function(){ selBa=selBa===ba.id?null:ba.id; renderView(); });
          optsBa.appendChild(btn);
        })(ba); });
        grpBa.appendChild(optsBa); wrap.appendChild(grpBa);
      }
    }
    card.appendChild(wrap);

    var nav=el('div','nav');
    var back=el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click',function(){
      S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
      S.elemDone[elem.id]=false;
      for(var i=S.history.length-1;i>=0;i--){if(S.history[i].type==='elemList'){S.history.splice(i,1);break;}}
      renderElemList(null,null);
    });
    nav.appendChild(back);

    if (selZ && selN) {
      var nextBtn=el('button','btn-next'); nextBtn.textContent='Dalej →';
      nextBtn.addEventListener('click',function(){
        S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
        var zLbl=PSP_ST.filter(function(s){return s.id===selZ;})[0].l;
        var nLbl=PSP_ST.filter(function(s){return s.id===selN;})[0].l;
        S.collected.push({elemId:elem.id, elemLabel:elem.label,
          stepLabel:'Zmiana stopnia', itemLabel:zLbl+' → '+nLbl+' — zmiana dystynkcji (stopnia)', price:getPrice()});
        var isPaszcz = elem.id.indexOf('pl') >= 0;
        var ozList = isPaszcz ? PSP_OZ_OBS.filter(function(o){ return o.id !== 'pspozo3'; }) : PSP_OZ_OBS;
        selOz.forEach(function(ozId){
          var oz=ozList.filter(function(o){return o.id===ozId;})[0];
          if(oz) S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Oznaki przynależności', itemLabel:oz.l, price:oz.p});
        });
        if(!isPaszcz && selBa){
          var ba=BA.filter(function(b){return b.id===selBa;})[0];
          if(ba) S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Baretki orderów i odznaczeń', itemLabel:ba.l, price:ba.p});
        }
        goToNextStep(elem,stepIdx,S.currentElems);
      });
      nav.appendChild(nextBtn);
    }
    card.appendChild(nav); cont.appendChild(card);
  }
  renderView();
}


function renderStopienSGChange(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var selZ  = null;
  var selN  = null;
  var selOz = [];
  var selBa = null;

  function getPrice() {
    if (!selZ || !selN || selZ===selN) return 0;
    return (PRICE_CHANGE_SG[selZ] && PRICE_CHANGE_SG[selZ][selN] != null)
      ? PRICE_CHANGE_SG[selZ][selN] : 0;
  }

  function renderView() {
    cont.innerHTML = ''; renderBasket(cont);
    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', 'Zmiana stopnia'));
    var wrap = el('div','stopien-change-wrap');

    // Aktualny stopień
    var grpZ = el('div','stopien-change-group');
    grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
    if (!selZ) {
      var optsZ = el('div','opts-single');
      SG_ST.forEach(function(s){ var btn=el('button','opt'); btn.textContent=s.l;
        btn.addEventListener('click',function(){ selZ=s.id; if(selN===selZ) selN=null; renderView(); }); optsZ.appendChild(btn); });
      grpZ.appendChild(optsZ);
    } else {
      var lbl=SG_ST.filter(function(s){return s.id===selZ;})[0].l;
      var b=el('div','stopien-selected');
      b.innerHTML='<span class="stopien-selected-val">'+lbl+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZ=null; selN=null; renderView(); });
      grpZ.appendChild(b);
    }
    wrap.appendChild(grpZ);

    // Nowy stopień
    if (selZ) {
      var grpN=el('div','stopien-change-group');
      grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
      if (!selN) {
        var optsN=el('div','opts-single');
        SG_ST.forEach(function(s){ if(s.id===selZ) return; var btn=el('button','opt'); btn.textContent=s.l;
          btn.addEventListener('click',function(){ selN=s.id; renderView(); }); optsN.appendChild(btn); });
        grpN.appendChild(optsN);
      } else {
        var nlbl=SG_ST.filter(function(s){return s.id===selN;})[0].l;
        var nb=el('div','stopien-selected');
        nb.innerHTML='<span class="stopien-selected-val">'+nlbl+'</span><button class="stopien-change-btn">Zmień</button>';
        nb.querySelector('.stopien-change-btn').addEventListener('click',function(){ selN=null; renderView(); });
        grpN.appendChild(nb);
      }
      wrap.appendChild(grpN);
    }

    // Oznaki + baretki
    if (selZ && selN) {
      if (SG_OZ_OBS.length > 0) {
        var grpOz=el('div','stopien-change-group');
        grpOz.appendChild(tag('div','stopien-change-lbl','Oznaki (opcjonalnie)'));
        var optsOz=el('div','opts-multi');
        SG_OZ_OBS.forEach(function(oz){ (function(oz){
          var row=el('div','opt-chk'); if(selOz.indexOf(oz.id)>=0) row.classList.add('on');
          row.innerHTML='<div class="chkbox">&#10003;</div><span class="chk-lbl">'+oz.l+'</span>';
          row.addEventListener('click',function(){ row.classList.toggle('on'); var i=selOz.indexOf(oz.id); if(i>=0)selOz.splice(i,1);else selOz.push(oz.id); });
          optsOz.appendChild(row);
        })(oz); });
        grpOz.appendChild(optsOz); wrap.appendChild(grpOz);
      }

      var grpBa=el('div','stopien-change-group');
      grpBa.appendChild(tag('div','stopien-change-lbl','Baretki orderów i odznaczeń (opcjonalnie)'));
      var optsBa=el('div','opts-single');
      BA.forEach(function(ba){ (function(ba){
        var btn=el('button','opt'); btn.textContent=ba.l;
        if(selBa===ba.id) btn.classList.add('selected'); else btn.classList.remove('selected');
        btn.addEventListener('click',function(){ selBa=selBa===ba.id?null:ba.id; renderView(); });
        optsBa.appendChild(btn);
      })(ba); });
      grpBa.appendChild(optsBa); wrap.appendChild(grpBa);
    }
    card.appendChild(wrap);

    var nav=el('div','nav');
    var back=el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click',function(){
      S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
      S.elemDone[elem.id]=false;
      for(var i=S.history.length-1;i>=0;i--){if(S.history[i].type==='elemList'){S.history.splice(i,1);break;}}
      renderElemList(null,null);
    });
    nav.appendChild(back);

    if (selZ && selN) {
      var nextBtn=el('button','btn-next'); nextBtn.textContent='Dalej →';
      nextBtn.addEventListener('click',function(){
        S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
        var zLbl=SG_ST.filter(function(s){return s.id===selZ;})[0].l;
        var nLbl=SG_ST.filter(function(s){return s.id===selN;})[0].l;
        S.collected.push({elemId:elem.id, elemLabel:elem.label,
          stepLabel:'Zmiana stopnia', itemLabel:zLbl+' → '+nLbl+' — zmiana dystynkcji (stopnia)', price:getPrice()});
        selOz.forEach(function(ozId){
          var oz=SG_OZ_OBS.filter(function(o){return o.id===ozId;})[0];
          if(oz) S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Oznaki', itemLabel:oz.l, price:oz.p});
        });
        if(selBa){
          var ba=BA.filter(function(b){return b.id===selBa;})[0];
          if(ba) S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Baretki orderów i odznaczeń', itemLabel:ba.l, price:ba.p});
        }
        goToNextStep(elem,stepIdx,S.currentElems);
      });
      nav.appendChild(nextBtn);
    }
    card.appendChild(nav); cont.appendChild(card);
  }
  renderView();
}


function renderStopienSWChange(elem, step, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var selZ  = null;
  var selN  = null;
  var selOz = [];
  var selBa = null;

  function getPrice() {
    if (!selZ || !selN || selZ===selN) return 0;
    return (PRICE_CHANGE_SW[selZ] && PRICE_CHANGE_SW[selZ][selN] != null)
      ? PRICE_CHANGE_SW[selZ][selN] : 0;
  }

  function renderView() {
    cont.innerHTML = ''; renderBasket(cont);
    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', 'Zmiana stopnia'));
    var wrap = el('div','stopien-change-wrap');

    // Aktualny stopień
    var grpZ = el('div','stopien-change-group');
    grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));
    if (!selZ) {
      var optsZ = el('div','opts-single');
      SW_ST.forEach(function(s){ var btn=el('button','opt'); btn.textContent=s.l;
        btn.addEventListener('click',function(){ selZ=s.id; if(selN===selZ) selN=null; renderView(); }); optsZ.appendChild(btn); });
      grpZ.appendChild(optsZ);
    } else {
      var lbl=SW_ST.filter(function(s){return s.id===selZ;})[0].l;
      var b=el('div','stopien-selected');
      b.innerHTML='<span class="stopien-selected-val">'+lbl+'</span><button class="stopien-change-btn">Zmień</button>';
      b.querySelector('.stopien-change-btn').addEventListener('click',function(){ selZ=null; selN=null; renderView(); });
      grpZ.appendChild(b);
    }
    wrap.appendChild(grpZ);

    // Nowy stopień
    if (selZ) {
      var grpN=el('div','stopien-change-group');
      grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
      if (!selN) {
        var optsN=el('div','opts-single');
        SW_ST.forEach(function(s){ if(s.id===selZ) return; var btn=el('button','opt'); btn.textContent=s.l;
          btn.addEventListener('click',function(){ selN=s.id; renderView(); }); optsN.appendChild(btn); });
        grpN.appendChild(optsN);
      } else {
        var nlbl=SW_ST.filter(function(s){return s.id===selN;})[0].l;
        var nb=el('div','stopien-selected');
        nb.innerHTML='<span class="stopien-selected-val">'+nlbl+'</span><button class="stopien-change-btn">Zmień</button>';
        nb.querySelector('.stopien-change-btn').addEventListener('click',function(){ selN=null; renderView(); });
        grpN.appendChild(nb);
      }
      wrap.appendChild(grpN);
    }

    // Oznaki + baretki po wyborze obu stopni
    if (selZ && selN) {
      var isPaszcz = elem.id.indexOf('pl') >= 0;
      var ozList = isPaszcz ? SW_OZ_OBS.filter(function(o){ return o.id !== 'swozo3'; }) : SW_OZ_OBS;

      if (ozList.length > 0) {
        var grpOz=el('div','stopien-change-group');
        grpOz.appendChild(tag('div','stopien-change-lbl','Oznaki przynależności (opcjonalnie)'));
        var optsOz=el('div','opts-multi');
        ozList.forEach(function(oz){ (function(oz){
          var row=el('div','opt-chk'); if(selOz.indexOf(oz.id)>=0) row.classList.add('on');
          row.innerHTML='<div class="chkbox">&#10003;</div><span class="chk-lbl">'+oz.l+'</span>';
          row.addEventListener('click',function(){ row.classList.toggle('on'); var i=selOz.indexOf(oz.id); if(i>=0)selOz.splice(i,1);else selOz.push(oz.id); });
          optsOz.appendChild(row);
        })(oz); });
        grpOz.appendChild(optsOz); wrap.appendChild(grpOz);
      }

      if (!isPaszcz) {
        var grpBa=el('div','stopien-change-group');
        grpBa.appendChild(tag('div','stopien-change-lbl','Baretki orderów i odznaczeń (opcjonalnie)'));
        var optsBa=el('div','opts-single');
        BA.forEach(function(ba){ (function(ba){
          var btn=el('button','opt'); btn.textContent=ba.l;
          if(selBa===ba.id) btn.classList.add('selected'); else btn.classList.remove('selected');
          btn.addEventListener('click',function(){ selBa=selBa===ba.id?null:ba.id; renderView(); });
          optsBa.appendChild(btn);
        })(ba); });
        grpBa.appendChild(optsBa); wrap.appendChild(grpBa);
      }
    }
    card.appendChild(wrap);
 
    var nav=el('div','nav');
    var back=el('button','btn-back'); back.textContent='← Wróć do listy elementów';
    back.addEventListener('click',function(){
      S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
      S.elemDone[elem.id]=false;
      for(var i=S.history.length-1;i>=0;i--){if(S.history[i].type==='elemList'){S.history.splice(i,1);break;}}
      renderElemList(null,null);
    });
    nav.appendChild(back);
 
    if (selZ && selN) {
      var nextBtn=el('button','btn-next'); nextBtn.textContent='Dalej →';
      nextBtn.addEventListener('click',function(){
        S.collected=S.collected.filter(function(r){return r.elemId!==elem.id;});
        var zLbl=SW_ST.filter(function(s){return s.id===selZ;})[0].l;
        var nLbl=SW_ST.filter(function(s){return s.id===selN;})[0].l;
        S.collected.push({elemId:elem.id, elemLabel:elem.label,
          stepLabel:'Zmiana stopnia', itemLabel:zLbl+' → '+nLbl+' — zmiana dystynkcji (stopnia)', price:getPrice()});
        var isPaszcz = elem.id.indexOf('pl') >= 0;
        var ozList = isPaszcz ? SW_OZ_OBS.filter(function(o){ return o.id !== 'swozo3'; }) : SW_OZ_OBS;
        selOz.forEach(function(ozId){
          var oz=ozList.filter(function(o){return o.id===ozId;})[0];
          if(oz) S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Oznaki przynależności', itemLabel:oz.l, price:oz.p});
        });
        if(!isPaszcz && selBa){
          var ba=BA.filter(function(b){return b.id===selBa;})[0];
          if(ba) S.collected.push({elemId:elem.id, elemLabel:elem.label,
            stepLabel:'Baretki orderów i odznaczeń', itemLabel:ba.l, price:ba.p});
        }
        goToNextStep(elem,stepIdx,S.currentElems);
      });
      nav.appendChild(nextBtn);
    }
    card.appendChild(nav); cont.appendChild(card);
  }
  renderView();
}


function renderStopienChange(elem, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  var selZ = null;  // aktualny stopień
  var selN = null;  // nowy stopień
  var selOz = [];   // wybrane oznaki przynależności
  var selBa = null; // wybrana baretka (single)
  var step = elem.steps[stepIdx];
  var isKoszula = step && !!step.isKoszula;
  var isKapelusz = step && !!step.isKapelusz;

  function getPrice() {
    if (!selZ || !selN) return null;
    if (selZ === selN) return null;
    return getMatrixPrice(elem.id, selZ, selN, 'gotowy');
  }

  function renderView() {
    cont.innerHTML = '';
    renderBasket(cont);

    var card = el('div','card');
    card.appendChild(tag('div','step-tag', elem.label));
    card.appendChild(tag('div','step-q', 'Zmiana stopnia'));

    var wrap = el('div','stopien-change-wrap');

    // Aktualnie obszyty stopień
    var grpZ = el('div','stopien-change-group');
    grpZ.appendChild(tag('div','stopien-change-lbl','Aktualnie obszyty stopień'));

    if (!selZ) {
      // Brak wyboru — pokaż pełną listę
      var optsZ = el('div','opts-single');
      ST.forEach(function(s) {
        var btn = el('button','opt');
        btn.textContent = s.l;
        btn.addEventListener('click', function(){
          selZ = s.id;
          if (selN === selZ) selN = null;
          renderView();
        });
        optsZ.appendChild(btn);
      });
      grpZ.appendChild(optsZ);
    } else {
      // Wybrano — pokaż tylko wybrany z możliwością zmiany
      var selBox = el('div','stopien-selected');
      var selLabel = ST.filter(function(s){return s.id===selZ;})[0].l;
      selBox.innerHTML = '<span class="stopien-selected-val">'+selLabel+'</span>'
        +'<button class="stopien-change-btn">Zmień</button>';
      selBox.querySelector('.stopien-change-btn').addEventListener('click', function(){
        selZ = null; selN = null; renderView();
      });
      grpZ.appendChild(selBox);
    }
    wrap.appendChild(grpZ);

    // Nowy stopień — tylko jeśli wybrano aktualny
    if (selZ) {
      var grpN = el('div','stopien-change-group');
      grpN.appendChild(tag('div','stopien-change-lbl','Nowy stopień'));
      if (!selN) {
        // Brak wyboru — pokaż pełną listę
        var optsN = el('div','opts-single');
        ST.forEach(function(s) {
          if (s.id === selZ) return; // blokada tego samego stopnia
          var btn = el('button','opt');
          btn.textContent = s.l;
          btn.addEventListener('click', function(){
            selN = s.id;
            renderView();
          });
          optsN.appendChild(btn);
        });
        grpN.appendChild(optsN);
      } else {
        // Wybrano — pokaż tylko wybrany z opcją zmiany
        var selBoxN = el('div','stopien-selected');
        var nLabel = ST.filter(function(s){return s.id===selN;})[0].l;
        selBoxN.innerHTML = '<span class="stopien-selected-val">'+nLabel+'</span>'
          +'<button class="stopien-change-btn">Zmień</button>';
        selBoxN.querySelector('.stopien-change-btn').addEventListener('click', function(){
          selN = null; renderView();
        });
        grpN.appendChild(selBoxN);
      }
      wrap.appendChild(grpN);
    }

    card.appendChild(wrap);

    // Nawigacja
    var nav = el('div','nav');
    var back = el('button','btn-back');
    back.textContent = '← Wróć do listy elementów';
    back.addEventListener('click', function(){
      S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
      S.elemDone[elem.id] = false;
      for (var i=S.history.length-1;i>=0;i--) {
        if (S.history[i].type==='elemList') { S.history.splice(i,1); break; }
      }
      renderElemList(null, null);
    });
    nav.appendChild(back);

    if (selZ && selN) {
      var price = getPrice();
      var isPaszcz = elem.id.indexOf('pl') >= 0;

      // Oznaki przynależności (multi, opcjonalne)
      if (!isKoszula && !isKapelusz) {
        var ozList = isPaszcz ? OZ_OBS.filter(function(o){ return o.id !== 'ozo1' && o.id !== 'ozo5'; }) : OZ_OBS;
        var grpOz = el('div','stopien-change-group');
        grpOz.appendChild(tag('div','stopien-change-lbl','Oznaki przynależności państwowej i rozpoznawcze (opcjonalnie)'));
        var optsOz = el('div','opts-multi');
        ozList.forEach(function(oz) {
          (function(oz){
            var row = el('div','opt-chk');
            if (selOz.indexOf(oz.id) >= 0) row.classList.add('on');
            row.innerHTML = '<div class="chkbox">&#10003;</div><span class="chk-lbl">'+oz.l+'</span>';
            row.addEventListener('click', function(){
              row.classList.toggle('on');
              var idx = selOz.indexOf(oz.id);
              if (idx >= 0) selOz.splice(idx,1); else selOz.push(oz.id);
              // nie rerenderujemy — tylko toggle klasy
            });
            optsOz.appendChild(row);
          })(oz);
        });
        grpOz.appendChild(optsOz);
        wrap.appendChild(grpOz);
      }

      // Baretki (single, opcjonalne)
      if (!isKoszula && !isKapelusz && !isPaszcz) {
        var grpBa = el('div','stopien-change-group');
        grpBa.appendChild(tag('div','stopien-change-lbl','Baretki orderów i odznaczeń (opcjonalnie)'));
        var optsBa = el('div','opts-multi');
        BA.forEach(function(ba){
          (function(ba){
            var btn = el('button','opt');
            btn.textContent = ba.l;
            if (selBa === ba.id) btn.classList.add('selected'); else btn.classList.remove('selected');
            btn.addEventListener('click', function(){
              selBa = selBa===ba.id ? null : ba.id;
              renderView();
            });
            optsBa.appendChild(btn);
          })(ba);
        });
        grpBa.appendChild(optsBa);
        wrap.appendChild(grpBa);
      }

      var nextBtn = el('button','btn-next');
      nextBtn.textContent = 'Dalej →';
      nextBtn.addEventListener('click', function(){
        var zLabel = ST.filter(function(s){return s.id===selZ;})[0].l;
        var nLabel = ST.filter(function(s){return s.id===selN;})[0].l;
        var p = price !== null ? price : 0;
        S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
        // Zmiana stopnia
        S.collected.push({
          elemId: elem.id, elemLabel: elem.label,
          stepLabel: 'Zmiana stopnia',
          itemLabel: zLabel + ' → ' + nLabel + ' — zmiana dystynkcji (stopnia)',
          price: p
        });
        // Oznaki
        if (!isKoszula && !isKapelusz) {
          var ozList = isPaszcz ? OZ_OBS.filter(function(o){ return o.id !== 'ozo1' && o.id !== 'ozo5'; }) : OZ_OBS;
          selOz.forEach(function(ozId){
            var oz = ozList.filter(function(o){return o.id===ozId;})[0];
            if (oz) S.collected.push({
              elemId: elem.id, elemLabel: elem.label,
              stepLabel: 'Oznaki przynależności',
              itemLabel: oz.l, price: oz.p
            });
          });
        }
        // Baretka
        if (!isKoszula && !isKapelusz && !isPaszcz && selBa) {
          var ba = BA.filter(function(b){return b.id===selBa;})[0];
          if (ba) S.collected.push({
            elemId: elem.id, elemLabel: elem.label,
            stepLabel: 'Baretki orderów i odznaczeń',
            itemLabel: ba.l, price: ba.p
          });
        }
        goToNextStep(elem, stepIdx, S.currentElems);
      });
      nav.appendChild(nextBtn);
    }

    card.appendChild(nav);
    cont.appendChild(card);
  }

  renderView();
}


function renderElemCfg(elem, stepIdx, elems) {
  var cont = document.getElementById('mundula-content');
  cont.innerHTML = '';
  renderBasket(cont);

  var step = elem.steps[stepIdx];

  // Specjalny tryb zmiany stopnia
  if (step.type === 'stopien_change') {
    renderStopienChange(elem, stepIdx, elems);
    return;
  }
  if (step.type === 'kapelusz_opt') {
    renderKapeluszOpt(elem, step, stepIdx, elems);
    return;
  }
  // Specjalny tryb nowego munduru (stopień + oznaki + baretki na jednej stronie)
  if (step.type === 'stopien_new') {
    renderStopienNew(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'stopien_szk_change') {
    renderStopienSzkChange(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'stopien_nagl_change') {
    renderStopienNaglChange(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'beret_opt') {
    renderBeretOpt(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'czapka_opt') {
    renderCzapkaOpt(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'zmiana_beret_opt') {
    renderZmianaBeretOpt(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'zmiana_czapka_opt') {
    renderZmianaCzapkaOpt(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'stopien_sw_change') {
    renderStopienSWChange(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'stopien_sg_change') {
    renderStopienSGChange(elem, step, stepIdx, elems);
    return;
  }
  if (step.type === 'stopien_psp_change') {
    renderStopienPSPChange(elem, step, stepIdx, elems);
    return;
  }

  var isMulti   = step.type === 'multi';
  var isOptional= step.optional;
  var sel = isMulti ? [] : null;

  var card = el('div','card');
  card.appendChild(tag('div','step-tag', elem.label));
  card.appendChild(tag('div','step-q', step.label));

  if (isMulti) card.appendChild(tag('div','hint','Możesz wybrać kilka opcji'));

  var opts = el('div', isMulti ? 'opts-multi' : 'opts-single');

  step.items.forEach(function(item) {
    (function(item) {
      if (isMulti) {
        var row = el('div','opt-chk');
        row.innerHTML = '<div class="chkbox">&#10003;</div><span class="chk-lbl">'+item.l+'</span>';
        row.addEventListener('click', function(){
          row.classList.toggle('on');
          var i = sel.indexOf(item.id);
          if (i>=0) sel.splice(i,1); else sel.push(item.id);
          updateNext();
        });
        opts.appendChild(row);
      } else {
        var btn = el('button','opt'); btn.textContent = item.l;
        btn.addEventListener('click', function(){
          // Zapisz wybór i przejdź dalej
          saveStepResult(elem, step, [item.id], stepIdx, elems);
        });
        opts.appendChild(btn);
      }
    })(item);
  });
  card.appendChild(opts);

  var nav = el('div','nav');

  // Wstecz — zawsze wróć do listy elementów
  var back = el('button','btn-back');
  back.textContent = '← Wróć do listy elementów';
  back.addEventListener('click', function(){
    S.collected = S.collected.filter(function(r){ return r.elemId !== elem.id; });
    S.elemDone[elem.id] = false;
    for (var i=S.history.length-1;i>=0;i--) {
      if (S.history[i].type==='elemList') { S.history.splice(i,1); break; }
    }
    renderElemList(null, null); // użyje S.currentElems
  });
  nav.appendChild(back);

  if (isOptional) {
    var skip = el('button','btn-skip'); skip.textContent = 'Pomiń';
    skip.addEventListener('click', function(){
      goToNextStep(elem, stepIdx, S.currentElems);
    });
    nav.appendChild(skip);
  }

  if (isMulti) {
    var next = el('button','btn-next'); next.id = 'btn-next';
    next.textContent = 'Dalej →'; next.disabled = !isOptional;
    next.addEventListener('click', function(){
      saveStepResult(elem, step, sel, stepIdx, elems);
    });
    nav.appendChild(next);
  }

  card.appendChild(nav);
  cont.appendChild(card);

  function updateNext(){
    var b = document.getElementById('btn-next'); if(!b) return;
    b.disabled = sel.length === 0 && !isOptional;
  }
}

function saveStepResult(elem, step, selectedIds, stepIdx, elems) {
  selectedIds.forEach(function(id){
    var item = step.items.filter(function(i){ return i.id === id; })[0];
    if (!item) return;
    // Dla kroku "Wybierz stopień" dodaj "— obszycie dystynkcji"
    var label = step.id.indexOf('_st') >= 0
      ? item.l + ' — obszycie dystynkcji (stopień)'
      : item.l;
    S.collected.push({
      elemId:    elem.id,
      elemLabel: elem.label,
      stepLabel: step.label,
      itemLabel: label,
      price:     item.p
    });
  });
  goToNextStep(elem, stepIdx, elems);
}

function goToNextStep(elem, stepIdx, elems) {
  var next = stepIdx + 1;
  if (next < elem.steps.length) {
    renderElemCfg(elem, next, elems);
  } else {
    S.elemDone[elem.id] = true;
    // Usuń wpis elemList z historii (był dodany przy wejściu w konfigurację)
    for (var i=S.history.length-1;i>=0;i--) {
      if (S.history[i].type==='elemList') { S.history.splice(i,1); break; }
    }
    renderElemList(null, null); // użyje S.currentElems
  }
}

// ════════════════════════════════════════════════════════════
// WIDOK: KONIEC (brak cennika dla tej ścieżki)
// ════════════════════════════════════════════════════════════
function renderEnd() {
  var cont = document.getElementById('mundula-content');
  var card = el('div','card');
  card.appendChild(tag('div','step-q','Wycena w przygotowaniu'));
  var p = el('p',''); p.style.cssText='color:var(--mid);font-size:14px;margin-bottom:1rem;';
  p.textContent = 'Dla tej kategorii cennik jest w przygotowaniu. Skontaktuj się z nami bezpośrednio.';
  card.appendChild(p);
  var nav = el('div','nav');
  var back = el('button','btn-back'); back.textContent='← Wstecz';
  back.addEventListener('click', goBack); nav.appendChild(back);
  card.appendChild(nav); cont.appendChild(card);
}

// ════════════════════════════════════════════════════════════
// WIDOK: PODSUMOWANIE
// ════════════════════════════════════════════════════════════
function getExpressFeeData(baseTotal) {
  var p72 = STAWKI['express_72h_percent'] !== undefined ? (STAWKI['express_72h_percent'].p !== undefined ? STAWKI['express_72h_percent'].p : STAWKI['express_72h_percent']) : 50;
  var min72 = STAWKI['express_72h_min'] !== undefined ? (STAWKI['express_72h_min'].p !== undefined ? STAWKI['express_72h_min'].p : STAWKI['express_72h_min']) : 100;
  var pWeek = STAWKI['express_weekend_percent'] !== undefined ? (STAWKI['express_weekend_percent'].p !== undefined ? STAWKI['express_weekend_percent'].p : STAWKI['express_weekend_percent']) : 100;
  var minWeek = STAWKI['express_weekend_min'] !== undefined ? (STAWKI['express_weekend_min'].p !== undefined ? STAWKI['express_weekend_min'].p : STAWKI['express_weekend_min']) : 150;

  var fee = 0;
  var itemLabel = '';
  var elemId = '';

  if (baseTotal === 0) {
    return { fee: 0, itemLabel: itemLabel, elemId: elemId, p72: p72, min72: min72, pWeek: pWeek, minWeek: minWeek };
  }

  if (S.expressMode === 'express') {
    fee = Math.max(min72, Math.round(baseTotal * (p72 / 100)));
    itemLabel = 'Dopłata za realizację Ekspres (do 72h w dni robocze - wymaga potwierdzenia)';
    elemId = 'express_72h';
  } else if (S.expressMode === 'weekend') {
    fee = Math.max(minWeek, Math.round(baseTotal * (pWeek / 100)));
    itemLabel = 'Dopłata za realizację Weekend Ekspres (do 72h z pracą w weekend - wymaga potwierdzenia)';
    elemId = 'express_weekend';
  }

  return { fee: fee, itemLabel: itemLabel, elemId: elemId, p72: p72, min72: min72, pWeek: pWeek, minWeek: minWeek };
}

function renderSummary() {
  var cont = document.getElementById('mundula-content');
  cont.innerHTML = '';

  var total = S.collected.reduce(function(s,r){ return s+r.price; }, 0);

  var card = el('div','sum-card');
  card.appendChild(tag('div','sum-title','Szacunkowa wycena'));

  // Ścieżka nawigacji
  if (S.path.length > 0) {
    var pathDiv = el('div','sum-nav-path');
    S.path.forEach(function(p, i){
      var span = el('span','sum-nav-item'); span.textContent = p.label;
      pathDiv.appendChild(span);
      if (i < S.path.length-1) {
        var sep = el('span','sum-nav-sep'); sep.textContent = '›';
        pathDiv.appendChild(sep);
      }
    });
    card.appendChild(pathDiv);
  }

  if (S.collected.length === 0) {
    var e = el('p',''); e.style.cssText='color:var(--mid);font-size:14px;margin-top:1rem;';
    e.textContent='Nie wybrano pozycji z cenami. Skontaktuj się z nami po dokładną wycenę.';
    card.appendChild(e);
  } else {
    // 1. ZAKRES PRAC
    card.appendChild(tag('div','sum-sec-ttl','Zakres prac objętych wyceną'));
    var seen = {}, order = [];
    S.collected.forEach(function(r){
      if (!seen[r.elemId]) { seen[r.elemId]=true; order.push(r.elemId); }
    });
    order.forEach(function(eid){
      var rows = S.collected.filter(function(r){ return r.elemId===eid; });
      var elemHdr = el('div','sum-elem-hdr'); elemHdr.textContent = rows[0].elemLabel+':';
      card.appendChild(elemHdr);
      rows.forEach(function(r){
        var row = el('div','sum-work-row'); row.textContent = r.itemLabel;
        card.appendChild(row);
      });
    });

    // 1.5 TRYB EKSPRESOWY (Czas realizacji)
    var expSec = el('div','sum-sec-ttl');
    expSec.textContent = 'Czas realizacji:';
    card.appendChild(expSec);

    var expOpts = el('div', 'opt-group');
    expOpts.style.cssText = 'display:flex;flex-direction:column;gap:10px;margin-bottom:20px;';

    function renderExpressOptions() {
      expOpts.innerHTML = '';
      
      var eData = getExpressFeeData(total);
      var optsData = [
        { id: 'standard', label: 'Standardowy – czas realizacji od 4 do 14 dni roboczych', sub: '(bez dopłat)' },
        { id: 'express', label: 'Ekspres (do 72h w dni robocze - wymaga potwierdzenia)', sub: '(+'+eData.p72+'%, min. '+eData.min72+' zł)' },
        { id: 'weekend', label: 'Weekend Ekspres (do 72h z pracą w weekend - wymaga potwierdzenia)', sub: '(+'+eData.pWeek+'%, min. '+eData.minWeek+' zł)' }
      ];

      optsData.forEach(function(o) {
        var lbl = el('label', 'opt-chk');
        if (S.expressMode === o.id) lbl.classList.add('on');
        lbl.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 16px;border:1px solid var(--border-sub);border-radius:var(--radius);cursor:pointer;';
        
        var rad = el('input', '');
        rad.type = 'radio';
        rad.name = 'express_mode';
        rad.value = o.id;
        rad.checked = S.expressMode === o.id;
        rad.style.cssText = 'accent-color:var(--gold);width:16px;height:16px;cursor:pointer;';
        
        rad.addEventListener('change', function() {
          S.expressMode = o.id;
          
          // Zaktualizuj klasy dla labeli
          var allLabels = expOpts.querySelectorAll('.opt-chk');
          allLabels.forEach(function(l) { l.classList.remove('on'); });
          lbl.classList.add('on');
          
          // Zaktualizuj kwotę w widoku
          var eData = getExpressFeeData(total);
          var finalTotal = total + eData.fee;
          var totalValElem = document.querySelector('.sum-total-val');
          if (totalValElem) {
            totalValElem.textContent = finalTotal + ' zł';
          }
        });
        
        lbl.appendChild(rad);
        
        var txtCont = el('div', '');
        txtCont.style.cssText = 'display:flex;flex-direction:column;';
        
        var t1 = el('span', '');
        t1.textContent = o.label;
        t1.style.cssText = 'font-size:14px;font-weight:500;color:var(--text);';
        txtCont.appendChild(t1);
        
        var t2 = el('span', '');
        t2.textContent = o.sub;
        t2.style.cssText = 'font-size:12px;color:var(--text-muted);margin-top:2px;';
        txtCont.appendChild(t2);
        
        lbl.appendChild(txtCont);
        expOpts.appendChild(lbl);
      });
    }
    renderExpressOptions();
    card.appendChild(expOpts);

    // 2. ŁĄCZNA KWOTA
    var eData = getExpressFeeData(total);
    var finalTotal = total + eData.fee;

    var tot = el('div','sum-total');
    if (finalTotal === 0) {
      tot.innerHTML = '<div class="sum-total-lbl" style="color:#d9534f;font-weight:bold;text-align:center;width:100%;line-height:1.4;">Najprawdopodobniej nie wybrano żadnej usługi lub wystąpił błąd</div>';
      tot.style.borderColor = '#d9534f';
      tot.style.backgroundColor = '#f2dede';
      tot.style.display = 'flex';
      tot.style.alignItems = 'center';
      tot.style.justifyContent = 'center';
      tot.style.padding = '15px';
      tot.style.minHeight = '60px';
    } else {
      tot.innerHTML='<div class="sum-total-lbl">Łączna kwota usługi obszycia</div>'
        +'<div class="sum-total-val">'+finalTotal+' zł</div>';
    }
    card.appendChild(tot);

    // Disclaimer — treść zależna od ścieżki
    var isModyfikacja = S.path.some(function(p){
      return p.label.toLowerCase().indexOf('obszyty') >= 0
          || p.label.toLowerCase().indexOf('zmiana stopnia') >= 0;
    });
    var disc = el('div','sum-disclaimer');
    disc.textContent = isModyfikacja
      ? 'W przypadku modyfikacji obszycia mundurów cena usługi może nieznacznie się zmienić w zależności od stanu faktycznego munduru oraz zakresu prac niezbędnych do wykonania w celu ich regulaminowego obszycia.\nW przypadku wysyłki munduru do paczkomatu lub kurierem, należy uwzględnić koszt wysyłki ubezpieczonej.'
      : 'Jest to wstępna wycena netto dla zaznaczonej konfiguracji i może różnić się od wartości końcowej usługi w zależności od faktycznie zrealizowanego zakresu.\nW przypadku wysyłki munduru do paczkomatu lub kurierem, należy uwzględnić koszt wysyłki ubezpieczonej.';
    card.appendChild(disc);

    // 3. CHECKLISTA
  }

  cont.appendChild(card);

  // "Wyślij lub dostarcz nam" — osobna wydzielona karta
  var delivery = buildDeliveryList();
  var hasDelivery = delivery.elems.length > 0 || Object.keys(delivery.extras).length > 0;
  if (hasDelivery) {
    var delDiv = el('div','sum-deliver');
    delDiv.appendChild(tag('div','sum-sec-ttl','Wyślij lub dostarcz nam elementy munduru:'));
    delivery.elems.forEach(function(e){
      var row = el('div','sum-deliver-row'); row.textContent = e.label;
      delDiv.appendChild(row);
    });
    Object.keys(delivery.extras).forEach(function(lbl){
      var qty = delivery.extras[lbl];
      var row = el('div','sum-deliver-row');
      var suffix = (qty > 1 && lbl !== 'Odznaki') ? ' — '+qty+' szt.' : '';
      row.textContent = lbl + suffix;
      delDiv.appendChild(row);
    });
    cont.appendChild(delDiv);
  }

  // 4. SEPARATOR
  var sep = el('div','sum-separator');
  cont.appendChild(sep);

  // 5. REZERWACJA
  var booking = el('div','booking-card');
  booking.appendChild(tag('div','booking-title','Zarezerwuj termin'));

  function bookingField(labelTxt, inputId, type, placeholder) {
    var wrap = el('div','booking-field');
    var lbl = el('label','booking-label'); lbl.textContent = labelTxt; lbl.htmlFor = inputId;
    var inp = el('input','booking-input'); inp.type = type; inp.id = inputId;
    if (placeholder) inp.placeholder = placeholder;
    wrap.appendChild(lbl); wrap.appendChild(inp);
    return wrap;
  }

  booking.appendChild(bookingField('Kiedy dostarczysz mundur?',                'bk-date1',   'date', ''));
  booking.appendChild(bookingField('Na kiedy potrzebujesz obszytego munduru?',  'bk-date2',   'date', ''));
  booking.appendChild(bookingField('Adres e-mail lub numer telefonu',           'bk-contact', 'text', 'np. jan@email.pl lub 600 123 456'));

  var rodoBook = el('p','booking-rodo');
  rodoBook.style.cssText = 'font-size:11px;color:rgba(255,255,255,0.4);line-height:1.5;margin:1rem 0 0.5rem;font-weight:300;';
  rodoBook.textContent = 'Podając dane kontaktowe wyrażasz zgodę na ich przetwarzanie przez Mundula w celu realizacji zgłoszenia. Dane przechowywane są przez okres niezbędny do obsługi zlecenia.';
  booking.appendChild(rodoBook);

  var btnBook = el('button','btn-book'); btnBook.textContent = 'Zarezerwuj termin';
  if (total === 0) {
    btnBook.disabled = true;
    btnBook.style.opacity = '0.5';
    btnBook.style.cursor = 'not-allowed';
    btnBook.textContent = 'Brak usług do rezerwacji';
  }
  var bookingOk = el('div','booking-ok');
  bookingOk.textContent = 'W ciągu 24 godzin poinformujemy Cię o przyjęciu rezerwacji drogą mailową lub telefoniczną. Jeśli wybrany termin będzie zajęty, zaproponujemy najbliższą dostępną datę realizacji zlecenia.';

  btnBook.addEventListener('click', function(){
    var d1      = document.getElementById('bk-date1').value;
    var d2      = document.getElementById('bk-date2').value;
    var contact = document.getElementById('bk-contact').value.trim();
    ['bk-date1','bk-date2','bk-contact'].forEach(function(id){
      document.getElementById(id).style.borderColor = '';
    });
    if (!d1) document.getElementById('bk-date1').style.borderColor = '#c00';
    if (!d2) document.getElementById('bk-date2').style.borderColor = '#c00';
    if (!contact) document.getElementById('bk-contact').style.borderColor = '#c00';
    if (!d1 || !d2 || !contact) return;
    bookingOk.style.display = 'block';
    btnBook.disabled = true; btnBook.style.opacity = '0.5';
    btnBook.textContent = 'Wysłano zgłoszenie rezerwacji';
    if (typeof mundula_ajax !== 'undefined') {
      var finalRows = JSON.parse(JSON.stringify(S.collected));
      var finalTotal = total;
      
      var eData = getExpressFeeData(total);
      if (eData.fee > 0) {
        finalRows.push({ elemId: eData.elemId, elemLabel: 'Czas realizacji', itemLabel: eData.itemLabel, price: eData.fee });
        finalTotal += eData.fee;
      }

      fetch(mundula_ajax.url, {method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'action=mundula_booking'
          +'&nonce='+encodeURIComponent(mundula_ajax.nonce)
          +'&date_deliver='+encodeURIComponent(d1)
          +'&date_needed='+encodeURIComponent(d2)
          +'&contact='+encodeURIComponent(contact)
          +'&express_mode='+encodeURIComponent(S.expressMode)
          +'&rows='+encodeURIComponent(JSON.stringify(finalRows))
          +'&path='+encodeURIComponent(JSON.stringify(S.path.map(function(p){return p.label;})))
          +'&total='+finalTotal
      }).catch(function(e){
        console.error(e);
        alert('Wystąpił błąd podczas wysyłania zgłoszenia. Spróbuj ponownie później.');
        btnBook.disabled = false; btnBook.style.opacity = '1';
        btnBook.textContent = 'Zarezerwuj termin';
        bookingOk.style.display = 'none';
      });
    }
  });
  booking.appendChild(btnBook);
  booking.appendChild(bookingOk);
  cont.appendChild(booking);

  // 6. EMAIL
  var es=el('div','email-sec');
  es.appendChild(tag('div','email-lbl','Wyślij wycenę na podany e-mail'));
  es.appendChild(tag('div','email-sub','Otrzymasz podsumowanie zakresu wyceny'));

  var er=el('div','email-row');
  var ei=el('input','email-in'); ei.type='email'; ei.placeholder='Twój adres e-mail';
  var sb=el('button','btn-send'); sb.textContent='Wyślij';
  er.appendChild(ei); er.appendChild(sb);
  es.appendChild(er);

  // Checkbox RODO
  var rodoWrap=el('div','rodo-wrap');
  var rodoChk=el('input','rodo-chk'); rodoChk.type='checkbox'; rodoChk.id='rodo-chk';
  var rodoLbl=el('label','rodo-lbl'); rodoLbl.htmlFor='rodo-chk';
  rodoLbl.textContent='Wyrażam zgodę na przesłanie informacji handlowej drogą elektroniczną przez Mundula w rozumieniu ustawy o świadczeniu usług drogą elektroniczną. Administratorem danych osobowych jest Mundula. Dane będą przetwarzane w celu przesłania wyceny oraz przypomnień. Przysługuje Ci prawo dostępu, sprostowania, usunięcia danych oraz cofnięcia zgody w dowolnym momencie.';
  rodoWrap.appendChild(rodoChk); rodoWrap.appendChild(rodoLbl);
  es.appendChild(rodoWrap);

  var rodoErr=el('div','rodo-err'); rodoErr.id='rodo-err';
  rodoErr.textContent='Wymagana zgoda na przesłanie informacji handlowej.';
  es.appendChild(rodoErr);

  var ok=el('div','ok-msg'); ok.textContent='✓ Wycena wysłana! Sprawdź skrzynkę.';
  es.appendChild(ok);

  sb.addEventListener('click',function(){
    var valid = true;
    if(!ei.value.includes('@')){ei.style.borderColor='#c00'; valid=false;} else ei.style.borderColor='';
    if(!rodoChk.checked){rodoErr.style.display='block'; valid=false;} else rodoErr.style.display='none';
    if(!valid) return;
    ok.style.display='block'; sb.disabled=true;
    if(typeof mundula_ajax!=='undefined'){
      var finalRowsQ = JSON.parse(JSON.stringify(S.collected));
      var finalTotalQ = total;
      
      var eData = getExpressFeeData(total);
      if (eData.fee > 0) {
        finalRowsQ.push({ elemId: eData.elemId, elemLabel: 'Czas realizacji', itemLabel: eData.itemLabel, price: eData.fee });
        finalTotalQ += eData.fee;
      }

      fetch(mundula_ajax.url,{method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'action=mundula_quote&nonce='+encodeURIComponent(mundula_ajax.nonce)
          +'&email='+encodeURIComponent(ei.value)+'&total='+finalTotalQ
          +'&express_mode='+encodeURIComponent(S.expressMode)
          +'&rows='+encodeURIComponent(JSON.stringify(finalRowsQ))
          +'&path='+encodeURIComponent(JSON.stringify(S.path.map(function(x){return x.label;})))
      }).catch(function(e){
        console.error(e);
        alert('Wystąpił błąd podczas wysyłania wyceny. Spróbuj ponownie.');
        sb.disabled = false;
        ok.style.display = 'none';
      });
    }
  });
  cont.appendChild(es);

  // 7. ZACZNIJ OD NOWA
  var restart=el('button','btn-restart'); restart.textContent='← Zacznij od nowa';
  restart.addEventListener('click', reset);
  cont.appendChild(restart);
}


function buildDeliveryList() {
  var elems    = [];  // [{label}] - elementy munduru (1 sztuka każdy)
  var extras   = {};  // {label: count} - dodatkowe przedmioty do dostarczenia

  // Ilości oznak na element (stałe)
  var OZNAKA_ILOSC = {
    'Oznaka przynależności państwowej': 1,
    'Oznaka rozpoznawcza jednostki':              1,
    'Oznaka korpusu osobowego':         2,
    'Oznaka rezerwy':                   1,
    'Oznaka szkolna WAT/AWL/LAW/AMW':   2,
    'Baretki':                          1,
    'Odznaki':                          1,
    // Zmiana stopnia
    'Oznaka rozpoznawcza jednostki (zmiana)':     1,
    'Oznaka korpusu osobowego (zmiana)':2,
    'Oznaka rezerwy (zmiana)':          2,
    // Płaszcz
    'Oznaka korpusu osobowego (płaszcz)':2,
    'Oznaka rozpoznawcza jednostki (płaszcz)':     1
  };

  // Śledź unikalne elementy munduru
  var elemSeen = {};
  S.collected.forEach(function(r){
    if (!elemSeen[r.elemId]) {
      elemSeen[r.elemId] = true;
      elems.push({label: r.elemLabel});
    }

    // Sprawdź czy klient dostarcza coś sam
    var lbl = r.itemLabel;
    if (lbl.indexOf('dostarczę własn') >= 0) {
      var what = '';
      if      (lbl.indexOf('Oznaka przynależności państwowej') >= 0) what = 'Oznaka przynależności państwowej';
      else if (lbl.indexOf('Oznaka rozpoznawcza jednostki') >= 0)              what = 'Oznaka rozpoznawcza jednostki';
      else if (lbl.indexOf('Oznaka korpusu') >= 0)                   what = 'Oznaka korpusu osobowego';
      else if (lbl.indexOf('Oznaka rezerwy') >= 0)                   what = 'Oznaka rezerwy';
      else if (lbl.indexOf('Tylko dopasowanie') >= 0)                what = 'Otok czapki';
      else if (lbl.indexOf('Oznaka szkolna WAT') >= 0)              what = 'Oznaka szkolna WAT/AWL/LAW/AMW';
      else if (lbl.indexOf('Oznaka rozpoznawcza jednostki — zmiana') >= 0)    what = 'Oznaka rozpoznawcza jednostki (zmiana)';
      else if (lbl.indexOf('Oznaka korpusu osobowego — zmiana') >= 0) what = 'Oznaka korpusu osobowego (zmiana)';
      else if (lbl.indexOf('Oznaka rezerwy — umieszczenie') >= 0 && lbl.indexOf('zmiana') < 0) what = 'Oznaka rezerwy';
      else if (lbl.indexOf('Oznaka rezerwy — umieszczenie') >= 0 && lbl.indexOf('obszycie') >= 0) what = 'Oznaka rezerwy (zmiana)';
      else if (lbl.indexOf('Oznaka korpusu osobowego — umieszczenie') >= 0) what = 'Oznaka korpusu osobowego (płaszcz)';
      else if (lbl.indexOf('Oznaka rozpoznawcza jednostki — tylko obszycie') >= 0 && lbl.indexOf('zmiana') < 0) what = 'Oznaka rozpoznawcza jednostki (płaszcz)';
      else if (lbl.indexOf('Baretka') >= 0)                          what = 'Baretki';
      else if (lbl.indexOf('Odznak') >= 0)                           what = 'Odznaki';
      if (what) {
        var qty = OZNAKA_ILOSC[what] || 1;
        extras[what] = (extras[what] || 0) + qty;
      }
    }
  });

  return {elems: elems, extras: extras};
}


function renderBasket(cont) {
  if (S.collected.length === 0) return;
  var b = el('div','basket');
  // Nagłówek: ścieżka nawigacji
  if (S.path.length > 0) {
    var pathEl = el('div','basket-path');
    pathEl.textContent = S.path.map(function(p){return p.label;}).join(' › ');
    b.appendChild(pathEl);
  }
  b.appendChild(tag('div','basket-ttl','Zakres prac'));
  // Grupuj po elemencie
  var seen = {}, order = [];
  S.collected.forEach(function(r){
    if (!seen[r.elemId]) { seen[r.elemId]=true; order.push(r.elemId); }
  });
  order.forEach(function(eid){
    var rows = S.collected.filter(function(r){return r.elemId===eid;});
    var elemLbl = el('div','basket-elem'); elemLbl.textContent = rows[0].elemLabel+':';
    b.appendChild(elemLbl);
    rows.forEach(function(r){
      // Pokaż tylko nazwę stopnia/opcji, bez nazwy kroku
      b.appendChild(tag('div','basket-row', r.itemLabel));
    });
  });
  cont.appendChild(b);
}

// ════════════════════════════════════════════════════════════
// NAWIGACJA WSTECZ
// ════════════════════════════════════════════════════════════
function goBack() {
  if (S.history.length === 0) return;
  var prev = S.history.pop();
  var cont = document.getElementById('mundula-content');
  cont.innerHTML = '';
  if (prev.type === 'nav') {
    S.path.pop();
    renderNav(prev.node);
  } else if (prev.type === 'elemList') {
    renderElemList(null, prev.elems);
  }
}

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════
function el(tag, cls) {
  var e = document.createElement(tag);
  if (cls) e.className = cls; return e;
}
function tag(tagName, cls, text) {
  var e = el(tagName, cls); e.textContent = text; return e;
}

// ════════════════════════════════════════════════════════════
// START
// ════════════════════════════════════════════════════════════
reset();


