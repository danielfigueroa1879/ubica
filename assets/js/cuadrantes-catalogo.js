/* =====================================================================
   CATÁLOGO COMPARTIDO DE CALLES MULTI-COMUNA E HITOS DE AVENIDAS
   =====================================================================
   Fuente ÚNICA de datos, usada por:
     • mapa-cuadrantes.html  (autocompletado y búsqueda del mapa)
     • assets/js/search.js   (modo mapa del buscador de index.html)

   Editar SOLO aquí para agregar/corregir calles o cuadrantes.
   Expone en el ámbito global:
     • window.OS10_CATALOGO_STREETS     (calles presentes en varias comunas)
     • window.OS10_CATALOGO_MILESTONES  (hitos por numeración de grandes avenidas)
     • window.OS10_DIRECCIONES_VERIFICADAS (direcciones exactas verificadas en terreno)
     • window.OS10_buscarCallesMulticomuna(texto)  -> [alternativas]
   ===================================================================== */
(function(global){
  var STREETS = [
  {
    regex: /cedros?/i,
    streetName: 'Los Cedros',
    locations: [
      {
        comuna: 'serena',
        sector: 'Los Cedros, San Joaquín / Villa Jordán',
        cuadN: 5,
        lat: -29.9271686,
        lng: -71.2476196,
        tel: '9-8729-6426'
      },
      {
        comuna: 'coquimbo',
        sector: 'Los Cedros, El Sauce / Rinconada',
        cuadN: 8,
        lat: -30.0268429,
        lng: -71.3413471,
        tel: '9-8729-6447'
      }
    ]
  },
  {
    regex: /^(?:av(?:enida)?\.?\s+)?(?:jose\s+manuel\s+)?balmaceda/i,
    streetName: 'Avenida Balmaceda',
    locations: [
      {
        comuna: 'serena',
        sector: 'Av. Balmaceda (La Serena)',
        cuadN: 5,
        lat: -29.9140,
        lng: -71.2505,
        tel: '9-8729-6426'
      },
      {
        comuna: 'coquimbo',
        sector: 'Av. Balmaceda (Tierras Blancas, Coquimbo)',
        cuadN: 11,
        lat: -29.9670,
        lng: -71.2910,
        tel: '9-8729-6445'
      }
    ]
  },
  {
    regex: /^(?:av(?:enida)?\.?\s+)?(?:del\s+mar|costanera(?!\s+del\s+r[ií]o))/i,
    streetName: 'Av. del Mar / Costanera',
    locations: [
      {
        comuna: 'serena',
        sector: 'Av. del Mar (La Serena)',
        cuadN: 8,
        lat: -29.9230,
        lng: -71.2740,
        tel: '9-8729-6429'
      },
      {
        comuna: 'coquimbo',
        sector: 'Av. Costanera (Peñuelas, Coquimbo)',
        cuadN: 6,
        lat: -29.9620,
        lng: -71.2880,
        tel: '9-8729-6443'
      }
    ]
  },
  {
    regex: /^(?:av(?:enida)?\.?\s+)?(?:francisco\s+de\s+)?aguirre/i,
    streetName: 'Francisco de Aguirre',
    locations: [
      {
        comuna: 'serena',
        sector: 'Av. Francisco de Aguirre (Centro La Serena)',
        cuadN: 4,
        lat: -29.9040,
        lng: -71.2550,
        tel: '9-8729-6425'
      },
      {
        comuna: 'coquimbo',
        sector: 'Francisco de Aguirre (Guayacán, Coquimbo)',
        cuadN: 7,
        lat: -29.9650,
        lng: -71.3420,
        tel: '9-8729-6444'
      }
    ]
  },
  {
    regex: /^(?:calle\s+)?(?:arturo\s+)?prat/i,
    streetName: 'Arturo Prat',
    locations: [
      {
        comuna: 'serena',
        sector: 'Calle Prat (Centro La Serena)',
        cuadN: 4,
        lat: -29.9020,
        lng: -71.2510,
        tel: '9-8729-6425'
      },
      {
        comuna: 'coquimbo',
        sector: 'Calle Prat (Puerto / Centro Coquimbo)',
        cuadN: 7,
        lat: -29.9540,
        lng: -71.3380,
        tel: '9-8729-6444'
      }
    ]
  },
  {
    regex: /^(?:av(?:enida)?\.?\s+)?(?:gabriela\s+)?mistral/i,
    streetName: 'Gabriela Mistral',
    locations: [
      {
        comuna: 'serena',
        sector: 'Av. Gabriela Mistral (San Joaquín La Serena)',
        cuadN: 5,
        lat: -29.9220,
        lng: -71.2460,
        tel: '9-8729-6426'
      },
      {
        comuna: 'coquimbo',
        sector: 'Av. Gabriela Mistral (Sindempart Coquimbo)',
        cuadN: 9,
        lat: -29.9850,
        lng: -71.3280,
        tel: '9-8729-6448'
      }
    ]
  },
  {
    regex: /^(?:calle\s+)?(?:manuel\s+)?rodr[ií]guez/i,
    streetName: 'Manuel Rodríguez',
    locations: [
      {
        comuna: 'serena',
        sector: 'Manuel Rodríguez (Las Compañías La Serena)',
        cuadN: 3,
        lat: -29.8780,
        lng: -71.2550,
        tel: '9-8729-6424'
      },
      {
        comuna: 'coquimbo',
        sector: 'Manuel Rodríguez (El Llano Coquimbo)',
        cuadN: 7,
        lat: -29.9570,
        lng: -71.3320,
        tel: '9-8729-6444'
      }
    ]
  },
  {
    regex: /aromos?/i,
    streetName: 'Los Aromos',
    locations: [
      {
        comuna: 'serena',
        sector: 'Los Aromos (La Pampa La Serena)',
        cuadN: 5,
        lat: -29.9250,
        lng: -71.2510,
        tel: '9-8729-6426'
      },
      {
        comuna: 'coquimbo',
        sector: 'Los Aromos (Tierras Blancas Coquimbo)',
        cuadN: 11,
        lat: -29.9690,
        lng: -71.2890,
        tel: '9-8729-6445'
      }
    ]
  },
  {
    regex: /pl[aá]tanos?/i,
    streetName: 'Los Plátanos',
    locations: [
      {
        comuna: 'serena',
        sector: 'Los Plátanos (San Joaquín La Serena)',
        cuadN: 5,
        lat: -29.9240,
        lng: -71.2480,
        tel: '9-8729-6426'
      },
      {
        comuna: 'coquimbo',
        sector: 'Los Plátanos (Tierras Blancas Coquimbo)',
        cuadN: 11,
        lat: -29.9720,
        lng: -71.2910,
        tel: '9-8729-6445'
      }
    ]
  },
  {
    regex: /alerces?/i,
    streetName: 'Los Alerces',
    locations: [
      {
        comuna: 'serena',
        sector: 'Los Alerces (San Joaquín La Serena)',
        cuadN: 5,
        lat: -29.9260,
        lng: -71.2490,
        tel: '9-8729-6426'
      },
      {
        comuna: 'coquimbo',
        sector: 'Los Alerces (Tierras Blancas Coquimbo)',
        cuadN: 11,
        lat: -29.9740,
        lng: -71.2930,
        tel: '9-8729-6445'
      }
    ]
  }
];

  var MILESTONES = [
  {
    pattern: /^(?:av(?:enida)?\.?\s+)?(?:jose\s+manuel\s+)?balmaceda/i,
    comuna: 'serena',
    name: 'Avenida Balmaceda',
    ranges: [
      { maxNum: 450, lat: -29.9030, lng: -71.2492, cuad: '4', desc: 'Centro Histórico (Prat a Cordovez)' },
      { maxNum: 750, lat: -29.9070, lng: -71.2501, cuad: '4', desc: 'Centro Sur (Francisco de Aguirre a Brasil)' },
      { maxNum: 1300, lat: -29.9140, lng: -71.2505, cuad: '5', desc: 'Huanhualí a Amunátegui / Estadio La Portada' },
      { maxNum: 2100, lat: -29.9200, lng: -71.2535, cuad: '5', desc: 'Seminario Conciliar a San Joaquín' },
      { maxNum: 3000, lat: -29.9257, lng: -71.2596, cuad: '8', desc: 'San Joaquín a Cuatro Esquinas / Paseo Balmaceda' },
      { maxNum: 4200, lat: -29.9320, lng: -71.2615, cuad: '8', desc: 'Cuatro Esquinas Sur / Las Palmeras' },
      { maxNum: Infinity, lat: -29.9480, lng: -71.2675, cuad: '8', desc: 'Pozos de Agua / Límite Peñuelas Alto' }
    ]
  },
  {
    pattern: /^(?:av(?:enida)?\.?\s+)?(?:del\s+mar|costanera(?!\s+del\s+r[ií]o))/i,
    comuna: 'serena',
    name: 'Avenida del Mar',
    ranges: [
      { maxNum: 1500, lat: -29.9150, lng: -71.2740, cuad: '8', desc: 'El Faro a Los Corsarios' },
      { maxNum: 3000, lat: -29.9240, lng: -71.2720, cuad: '8', desc: 'Los Nísperos a Cuatro Esquinas' },
      { maxNum: 4500, lat: -29.9350, lng: -71.2820, cuad: '6', desc: 'Cuatro Esquinas a Canto del Agua' },
      { maxNum: 5500, lat: -29.9450, lng: -71.2850, cuad: '6', desc: 'Canto del Agua a Peñuelas' },
      { maxNum: Infinity, lat: -29.9500, lng: -71.2870, cuad: '9', comuna: 'coquimbo', desc: 'Costanera Peñuelas (Coquimbo)' }
    ]
  },
  {
    pattern: /^(?:av(?:enida)?\.?\s+)?(?:francisco\s+de\s+)?aguirre/i,
    comuna: 'serena',
    name: 'Avenida Francisco de Aguirre',
    ranges: [
      { maxNum: 250, lat: -29.9040, lng: -71.2650, cuad: '8', desc: 'Costanera a Ruta 5' },
      { maxNum: 650, lat: -29.9055, lng: -71.2520, cuad: '4', desc: 'Ruta 5 a Cienfuegos (Centro)' },
      { maxNum: Infinity, lat: -29.9085, lng: -71.2380, cuad: '9', desc: 'Colina El Pino / Subcomisaría La Florida' }
    ]
  },
  {
    pattern: /^(?:calle\s+)?(?:jose\s+santiago\s+)?aldunate/i,
    comuna: 'coquimbo',
    name: 'Calle Aldunate (Coquimbo)',
    ranges: [
      { maxNum: 600, lat: -29.9530, lng: -71.3385, cuad: '1', desc: 'Plaza de Armas / Centro / Puerto' },
      { maxNum: 1100, lat: -29.9570, lng: -71.3395, cuad: '1', desc: 'Bilbao a Freire' },
      { maxNum: 1700, lat: -29.9630, lng: -71.3415, cuad: '3', desc: 'Freire a Guayacán / El Llano' },
      { maxNum: Infinity, lat: -29.9700, lng: -71.3430, cuad: '3', desc: 'Guayacán Sur' }
    ]
  },
  {
    pattern: /^(?:av(?:enida)?\.?\s+)?cuatro\s+esquinas/i,
    comuna: 'serena',
    name: 'Avenida Cuatro Esquinas',
    ranges: [
      { maxNum: 500, lat: -29.9350, lng: -71.2800, cuad: '6', desc: 'Av. del Mar a Ruta 5' },
      { maxNum: 1300, lat: -29.9310, lng: -71.2610, cuad: '8', desc: 'Ruta 5 a Av. Balmaceda' },
      { maxNum: 2200, lat: -29.9300, lng: -71.2450, cuad: '5', desc: 'Balmaceda a Guillermo Ulriksen' },
      { maxNum: Infinity, lat: -29.9300, lng: -71.2350, cuad: '7', desc: 'Ulriksen a Cerro Grande' }
    ]
  },
  {
    pattern: /^(?:av(?:enida)?\.?\s+)?larra[ií]n\s+alcalde/i,
    comuna: 'serena',
    name: 'Avenida Larraín Alcalde',
    ranges: [
      { maxNum: 1400, lat: -29.9160, lng: -71.2480, cuad: '5', desc: 'Huanhualí a Seminario Conciliar' },
      { maxNum: 2300, lat: -29.9220, lng: -71.2510, cuad: '5', desc: 'Seminario a Los Perales' },
      { maxNum: Infinity, lat: -29.9300, lng: -71.2540, cuad: '5', desc: 'Los Perales a Cuatro Esquinas' }
    ]
  },
  {
    pattern: /^(?:av(?:enida)?\.?\s+)?videla/i,
    comuna: 'coquimbo',
    name: 'Avenida Videla (Coquimbo)',
    ranges: [
      { maxNum: 500, lat: -29.9540, lng: -71.3360, cuad: '1', desc: 'Costanera a Henríquez' },
      { maxNum: Infinity, lat: -29.9640, lng: -71.3380, cuad: '3', desc: 'Henríquez a Hospital San Pablo' }
    ]
  },
  {
    pattern: /^(?:calle\s+)?varela/i,
    comuna: 'coquimbo',
    name: 'Calle Varela (Coquimbo)',
    ranges: [
      { maxNum: 1100, lat: -29.9530, lng: -71.3365, cuad: '1', desc: 'Puerto a Plaza Vicuña Mackenna' },
      { maxNum: Infinity, lat: -29.9610, lng: -71.3385, cuad: '3', desc: 'Plaza sur / empalme' }
    ]
  },
  {
    pattern: /^(?:calle\s+)?(?:los\s+)?carrera/i,
    comuna: 'serena',
    name: 'Calle Los Carrera',
    ranges: [
      { maxNum: 600, lat: -29.9040, lng: -71.2470, cuad: '4', desc: 'Casco Histórico (Brasil a Aguirre)' },
      { maxNum: Infinity, lat: -29.9120, lng: -71.2480, cuad: '4', desc: 'Aguirre a Huanhualí' }
    ]
  }
];

  // Búsqueda instantánea de calles presentes en varias comunas (misma lógica que el mapa).
  function buscarCallesMulticomuna(val){
    var norm = (val || '').toLowerCase().trim();
    if (norm.length < 2) return [];
    var sugs = [];
    for (var i = 0; i < STREETS.length; i++) {
      var entry = STREETS[i];
      if (entry.regex.test(norm)) {
        entry.locations.forEach(function(loc){
          sugs.push({
            comuna: loc.comuna,
            streetName: entry.streetName,
            cuadN: loc.cuadN,
            cuadTxt: 'Cuadrante N° ' + loc.cuadN,
            sector: loc.sector,
            sectorTxt: loc.sector,
            tel: loc.tel,
            lat: loc.lat,
            lng: loc.lng
          });
        });
        break;
      }
    }
    return sugs;
  }

  // -------------------------------------------------------------------
  // DIRECCIONES VERIFICADAS EN TERRENO
  // Tienen prioridad sobre cualquier geocodificador (ArcGIS / OSM). Usar
  // para calles SIN numeración en los mapas o que cruzan varios cuadrantes.
  // calle: nombre sin "Av./Calle/Pasaje"; num: número exacto;
  // comuna: serena | coquimbo | vicuna | paihuano | andacollo.
  // -------------------------------------------------------------------
  var VERIFICADAS = [
    { calle: 'Costanera del Río', num: 1567, comuna: 'serena', lat: -29.89363, lng: -71.24850,
      nombre: 'Av. Costanera del Río 1567, La Serena' }
  ];

  global.OS10_DIRECCIONES_VERIFICADAS = VERIFICADAS;
  global.OS10_CATALOGO_STREETS = STREETS;
  global.OS10_CATALOGO_MILESTONES = MILESTONES;
  global.OS10_buscarCallesMulticomuna = buscarCallesMulticomuna;
})(typeof self !== 'undefined' ? self : this);
