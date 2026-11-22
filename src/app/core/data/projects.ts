import type { Project } from '../models';

export const PROJECTS: readonly Project[] = [
  {
    slug: 'gradientestate',
    title: 'GradientEstate',
    kicker: 'Valoración de vivienda · ETL · XGBoost · Web en producción',
    status: 'Producción',
    icon: 'home',
    featured: true,
    summary:
      'Web para estimar el precio de una vivienda en Madrid. Cruza más de 10 fuentes públicas por edificio, predice con XGBoost en menos de 50 ms, simula reformas con su rentabilidad e incluye un asistente con LLM.',
    highlights: [
      'Una web para estimar el precio de una vivienda en Madrid. Eliges un edificio en el mapa, metes las características del piso y el modelo devuelve una valoración. También puedes simular una reforma y ver si sale rentable, o preguntar a un asistente con LLM que tiene los datos de ese edificio.',
      'La parte difícil fue el dataset: crucé <strong>más de 10 fuentes</strong> (Catastro, INE, ruido, NO₂, transporte y precios de portales) para calcular <strong>más de 30 variables por edificio</strong>. Como están precalculadas, cada predicción tarda menos de 50 ms.',
    ],
    kpis: [
      { value: '70K+', label: 'registros catastrales' },
      { value: '30+', label: 'features por edificio' },
      { value: '<50 ms', label: 'por predicción' },
    ],
    tags: ['Python', 'XGBoost', 'GeoPandas', 'FastAPI', 'LLM · SSE', 'React + Vite', 'MapLibre GL JS', 'ArcGIS Online', 'Nginx', 'Oracle Cloud'],
    links: [
      { label: 'gradientestate.com', url: 'https://gradientestate.com', kind: 'live' },
      { label: 'Código', url: 'https://github.com/miguellopezt/GradientEstate', kind: 'repo' },
    ],
    images: [
      { name: 'gradientestate-1', alt: 'Pantalla de acceso de GradientEstate sobre un relieve verde ondulado', caption: 'Acceso a la plataforma' },
      { name: 'gradientestate-3', alt: 'Buscador de oportunidades: 407 edificios evaluados en el barrio de Acacias coloreados por puntuación', caption: 'Buscador de oportunidades por barrio' },
      { name: 'gradientestate-2', alt: 'Ficha de un edificio con datos catastrales junto a su volumen 3D extruido en el mapa', caption: 'Ficha de edificio con extrusión 3D' },
    ],
    context: [
      'El precio de un piso depende mucho de dónde está, pero ninguna fuente pública lo recoge junto a lo que lo explica. Catastro describe el edificio, el INE la renta de la zona, el Ayuntamiento el ruido y la contaminación y los portales inmobiliarios el precio, cada uno a una escala y en un formato distinto.',
      'Quería juntarlo todo a nivel de edificio, entrenar un modelo con eso y ponerlo detrás de una web que cualquiera pudiera usar: tasar un piso, simular una reforma y consultar a un asistente que conoce el contexto del edificio.',
    ],
    approach: [
      { title: 'Recoger y unir los datos', text: 'Geometrías y atributos de Catastro (antigüedad, uso, calidad constructiva), precio por m² por barrio con scraping de portales, renta mediana por sección censal del INE, ruido nocturno y NO₂ del Ayuntamiento y estaciones de Metro y Cercanías.' },
      { title: 'Variables por edificio', text: 'Crecimiento anual compuesto (CAGR) de renta y precio por zona, número de estaciones a menos de 400 m, porcentaje de uso comercial y de oficinas, sótanos y planta máxima a partir de Catastro.' },
      { title: 'Modelo', text: 'XGBoost con 31 variables. Las de contexto se guardan precalculadas por edificio en Parquet, así que al predecir solo hay que juntar lo que mete el usuario con una fila que ya existe.' },
      { title: 'Web', text: 'API en FastAPI con endpoints de tasación, reforma, búsqueda, análisis de zona y asistente por SSE. Frontend en React + Vite con MapLibre GL JS sobre teselas vectoriales de ArcGIS Online.' },
    ],
    architecture: [
      { name: 'Presentación', items: ['React + Vite', 'MapLibre GL JS', 'Teselas vectoriales ArcGIS Online', 'Cliente SSE'] },
      { name: 'Aplicación', items: ['FastAPI asíncrono', '/tasar', '/optimizar_edificio', '/buscar', '/analizar_zona', 'Asistente LLM (SSE)'] },
      { name: 'Inferencia', items: ['XGBoost Regressor', '31 features', 'Motor de reglas de reforma', '<50 ms p95'] },
      { name: 'Datos', items: ['Parquet columnar (~70K registros)', 'Capa de edificios enriquecida', 'SQLite (usuarios y carteras)'] },
      { name: 'Infraestructura', items: ['Oracle Cloud (Ampere A1)', 'Nginx proxy inverso', 'Uvicorn + systemd'] },
    ],
    results: [
      'En producción y abierta en gradientestate.com.',
      'Menos de 50 ms por predicción gracias a tener las variables precalculadas.',
      'Más de 70.000 registros catastrales que se pueden buscar sobre el mapa.',
      'Simulación de reformas con rentabilidad estimada y asistente LLM en streaming.',
    ],
  },
  {
    slug: 'spain-aqi',
    title: 'Spain AQI',
    kicker: 'Calidad del aire · ETL · LSTM · Web en producción',
    status: 'Producción',
    icon: 'cloud',
    featured: true,
    summary:
      'Mapa de la calidad del aire en España con datos en tiempo real de las comunidades autónomas y el MITECO, histórico, meteorología y predicción con LSTM por estación.',
    highlights: [
      'Un mapa de la calidad del aire en España. Cada comunidad autónoma y el MITECO publican sus estaciones en formatos distintos; una <strong>ETL en Python</strong> las descarga, las normaliza y calcula el índice de calidad del aire (AQI) de cada estación.',
      'Con esos datos entrené <strong>modelos LSTM</strong> que combinan contaminantes y meteorología para predecir el AQI. En la web (FastAPI, React y Leaflet) se puede bajar de España a provincia y municipio y ver el histórico, el tiempo y la predicción.',
    ],
    kpis: [
      { value: 'CC.AA. + MITECO', label: 'fuentes unificadas' },
      { value: 'LSTM', label: 'predicción del AQI' },
      { value: '3 niveles', label: 'España, provincia y municipio' },
    ],
    tags: ['Python', 'LSTM', 'TensorFlow', 'Pandas · GeoPandas', 'FastAPI', 'React', 'Leaflet', 'Oracle Cloud'],
    links: [{ label: 'spain-aqi.ddns.net', url: 'https://spain-aqi.ddns.net/', kind: 'live' }],
    images: [
      { name: 'aire-1', alt: 'Mapa de calor del índice de calidad del aire sobre España con control temporal', caption: 'Vista nacional con mapa de calor' },
      { name: 'aire-2', alt: 'Panel provincial de Madrid con serie temporal del AQI, predicción y variables climáticas', caption: 'Provincia: serie histórica y predicción' },
      { name: 'aire-3', alt: 'Panel municipal de Málaga con evolución del AQI y datos meteorológicos', caption: 'Municipio: detalle y meteorología' },
    ],
    context: [
      'En España los datos de calidad del aire están repartidos: cada comunidad autónoma y el MITECO publican sus estaciones con formatos, frecuencias y nombres distintos. Para tener una vista nacional, y además predecir, primero hay que unificarlo todo.',
    ],
    approach: [
      { title: 'ETL', text: 'Descarga periódica de las fuentes autonómicas y del MITECO, normalización de contaminantes y estaciones y cálculo del AQI por estación.' },
      { title: 'Predicción', text: 'Redes LSTM entrenadas con series de contaminantes (NO₂, partículas) y variables meteorológicas para predecir el AQI.' },
      { title: 'Web', text: 'API en FastAPI que sirve los datos limpios, los mapas de calor y las predicciones; frontend en React + Vite con Leaflet.' },
    ],
    architecture: [
      { name: 'Fuentes', items: ['Comunidades autónomas', 'MITECO', 'Variables climáticas'] },
      { name: 'Procesamiento', items: ['ETL Python', 'Limpieza automatizada', 'Cálculo de AQI', 'Mapas de calor'] },
      { name: 'Modelos', items: ['LSTM (TensorFlow)', 'Series multivariadas'] },
      { name: 'Producto', items: ['FastAPI', 'React + Vite', 'Leaflet', 'Oracle Cloud + DNS público'] },
    ],
    results: [
      'Visor público en producción con datos en tiempo real de toda España.',
      'Histórico, meteorología y predicción en la misma vista.',
      'Navegación de España a provincia y a municipio.',
    ],
  },
  {
    slug: 'cnn-multitarea-pnoa',
    title: 'Vehículos y acimut en ortofoto PNOA',
    kicker: 'Visión por computador · YOLO OBB · ResNet · TFG',
    status: 'TFG',
    icon: 'scan',
    featured: true,
    summary:
      'Mi TFG en la Cátedra IGN y CNIG-UPM: detectar vehículos en ortofotos del PNOA y estimar hacia dónde apuntan, con YOLO OBB seguido de una ResNet.',
    highlights: [
      'Mi Trabajo Fin de Grado, dentro de la Cátedra IGN y CNIG-UPM: detectar vehículos en las ortofotos del PNOA y estimar hacia dónde apunta cada uno (su acimut).',
      'Son dos redes en cadena. <strong>YOLO con cajas orientadas (OBB)</strong> detecta cada vehículo en teselas de 512×512 px; después una <strong>ResNet</strong> recibe el recorte y predice el ángulo como seno y coseno. Al final la orientación se ajusta con las detecciones vecinas y la dirección de la vía.',
    ],
    kpis: [
      { value: '0,992', label: 'mAP@50' },
      { value: '0,857', label: 'mAP@50-95' },
      { value: '5,11°', label: 'MAE de acimut' },
    ],
    tags: ['PyTorch', 'YOLO OBB', 'ResNet', 'Regresión angular', 'PNOA · WMS', 'Visión por computador'],
    links: [],
    images: [
      { name: 'pnoa-1', alt: 'Ortofoto de una autovía con vehículos detectados mediante cajas orientadas y flechas de acimut', caption: 'Detección orientada y acimut en autovía' },
      { name: 'pnoa-2', alt: 'Ortofoto con varios carriles y vehículos detectados con su orientación estimada', caption: 'Múltiples carriles y sentidos' },
      { name: 'pnoa-3', alt: 'Ortofoto de un puente con un vehículo detectado y su ángulo de acimut', caption: 'Detección sobre puente' },
    ],
    context: [
      'El PNOA cubre toda España con ortofoto de alta resolución. Localizar un vehículo en ella es relativamente sencillo; saber hacia dónde apunta, no tanto, y es justo lo que dice en qué sentido circula. Una caja alineada con los ejes no da esa información.',
    ],
    approach: [
      { title: 'Dataset', text: '8.000 teselas PNOA de 512×512 px descargadas vía WMS y anotadas con cajas orientadas.' },
      { title: 'Detección', text: 'YOLO con cajas orientadas (OBB): cada vehículo sale con su rectángulo girado, no con una caja recta.' },
      { title: 'Acimut', text: 'Cada detección se recorta y pasa a una ResNet que predice el ángulo como seno y coseno, para evitar el salto entre 0° y 360°.' },
      { title: 'Ajuste final', text: 'Votación entre detecciones cercanas y uso de la dirección de la vía para corregir la orientación.' },
    ],
    results: [
      'mAP@50 = 0,992 y mAP@50-95 = 0,857 en detección.',
      'Error absoluto medio de 5,11° en la estimación de acimut.',
      'Trabajo dentro de la Cátedra IGN y CNIG-UPM.',
    ],
  },
  {
    slug: 'anomalias-migratorias-eeuu',
    title: 'Anomalías en flujos migratorios',
    kicker: 'Detección de anomalías · GNN · LSTM · XGBoost',
    status: 'Académico',
    icon: 'globe',
    featured: true,
    summary:
      'Búsqueda de anomalías en la migración entre los 3.109 condados de EE. UU. de 2011 a 2022, comparando autoencoders, una Graph Neural Network, LSTM y XGBoost.',
    highlights: [
      'Migración entre los <strong>3.109 condados de EE. UU. de 2011 a 2022</strong>: 296.749 flujos sacados de los registros fiscales del IRS. El objetivo era encontrar los años y lugares en los que la migración se salió de lo esperable.',
      'Comparé cuatro enfoques: <strong>autoencoders</strong>, un modelo gravitacional con <strong>Graph Neural Network</strong>, LSTM con ventanas de 3 años y XGBoost. Los modelos señalaron el huracán Harvey (2017) y la COVID-19, con 4,8 veces más anomalías en 2020.',
    ],
    kpis: [
      { value: '296.749', label: 'flujos analizados' },
      { value: '4', label: 'modelos comparados' },
      { value: '4,8×', label: 'más anomalías en 2020' },
    ],
    tags: ['Graph Neural Network', 'Autoencoder', 'LSTM', 'XGBoost', 'PyTorch Geometric', 'GeoPandas', 'IRS · Census Bureau'],
    links: [],
    images: [{ name: 'migracion-eeuu', alt: 'Mapa de EE.UU. por condados clasificados según su indicador de ganancia o salida migratoria', caption: 'Clústeres de ganancia y salida migratoria por condado' }],
    context: [
      'Los flujos entre condados forman un grafo dirigido y con pesos que cambia cada año. Para distinguir una anomalía de una simple tendencia hace falta un modelo que tenga en cuenta a la vez la parte espacial y la temporal.',
    ],
    approach: [
      { title: 'Datos', text: '296.749 flujos origen-destino del IRS entre 3.109 condados en 11 periodos, enriquecidos con variables del Census Bureau.' },
      { title: 'Autoencoders', text: 'Comprimen y reconstruyen los flujos; cuanto peor reconstruyen un flujo, más anómalo es.' },
      { title: 'Modelo gravitacional con GNN', text: 'Una Graph Neural Network que aprende la atracción entre condados, partiendo del modelo gravitacional clásico.' },
      { title: 'LSTM y XGBoost', text: 'LSTM con ventanas de 3 años sobre 13 variables económicas y temporales; XGBoost como referencia.' },
    ],
    results: [
      'Anomalías por encima del umbral del 1 % que coinciden con el huracán Harvey (2017).',
      '4,8 veces más anomalías en 2020, por el efecto de la COVID-19 en la migración.',
      'Los modelos detectan sucesos reales sin habérselos indicado.',
    ],
  },
  {
    slug: 'movilidad-urbana-madrid',
    title: 'Aparcamiento en Madrid',
    kicker: 'Análisis espacial · ArcGIS',
    status: 'Académico',
    icon: 'car',
    featured: false,
    summary:
      'Cruce de datos de tráfico y parquímetros por barrio para ver dónde falta o sobra aparcamiento, con mapas de calor y propuestas de movilidad.',
    highlights: [],
    kpis: [],
    tags: ['Python', 'ArcGIS', 'Análisis espacial', 'LISA'],
    links: [],
    images: [{ name: 'parking-madrid', alt: 'Mapa de Madrid por barrios con clústeres de indicador espacial local (alto-alto, bajo-bajo)', caption: 'Indicadores locales de asociación espacial por barrio' }],
    context: [],
    approach: [],
    results: [],
  },
  {
    slug: 'resiliencia-agricola-murcia',
    title: 'Estado de cultivos en Murcia',
    kicker: 'Teledetección · NDVI',
    status: 'Académico',
    icon: 'leaf',
    featured: false,
    summary:
      'Series temporales de NDVI para seguir el estado de los cultivos en la Región de Murcia y un modelo predictivo para anticipar su evolución.',
    highlights: [],
    kpis: [],
    tags: ['Python', 'ArcGIS', 'Teledetección', 'NDVI'],
    links: [{ label: 'StoryMap', url: 'https://storymaps.arcgis.com/stories/9a254a8d1e4240648b4d91c4f7886955', kind: 'story' }],
    images: [{ name: 'agro-murcia', alt: 'Mapa NDVI de la Región de Murcia en tonos verdes con la vegetación y los embalses', caption: 'Índice NDVI sobre la Región de Murcia' }],
    context: [],
    approach: [],
    results: [],
  },
];

export const FEATURED = PROJECTS.filter((p) => p.featured);
export const SECONDARY = PROJECTS.filter((p) => !p.featured);
export const projectBySlug = (slug: string) => FEATURED.find((p) => p.slug === slug);
