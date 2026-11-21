import type { Project } from '../models';

export const PROJECTS: readonly Project[] = [
  {
    slug: 'gradientestate',
    title: 'GradientEstate',
    kicker: 'Ecosistema PropTech · Data Engineering · ML · IA generativa · Cloud',
    status: 'Producción',
    icon: 'home',
    featured: true,
    summary:
      'Plataforma de valoración inmobiliaria para Madrid que cruza más de 10 fuentes geoespaciales para estimar precios en tiempo real, simular reformas con ROI y asesorar con un LLM integrado.',
    highlights: [
      'Ecosistema PropTech end-to-end centrado en el municipio de Madrid que automatiza el análisis y la valoración inmobiliaria mediante inteligencia de datos geoespaciales, modelos predictivos y asesoramiento por IA en tiempo real.',
      'Pipelines ETL que cruzan <strong>más de 10 datasets</strong> con componente geográfica para generar capas propias —contexto socioeconómico, accesibilidad, indicadores ambientales y momentum de mercado— que alimentan un modelo XGBoost con <strong>30+ features precomputadas por edificio</strong>.',
    ],
    kpis: [
      { value: '70K+', label: 'registros catastrales' },
      { value: '30+', label: 'features por edificio' },
      { value: '<50 ms', label: 'inferencia p95' },
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
      'El precio de la vivienda es una variable con un comportamiento espacial muy marcado que ninguna fuente pública recoge de forma integrada. Catastro describe el edificio, el INE el contexto socioeconómico, el Ayuntamiento el entorno ambiental y los portales inmobiliarios el mercado, pero cada uno a una escala y en un formato distinto.',
      'GradientEstate nace para unificar esas piezas en una matriz de entrenamiento coherente y servirla en un producto que cualquier usuario pueda usar: tasar un inmueble teórico en milisegundos, simular estrategias de reforma con su ROI y consultar a un asesor IA con el contexto del edificio.',
    ],
    approach: [
      { title: 'Ingesta y unificación', text: 'Geometrías y atributos estructurales de Catastro (antigüedad, uso, calidad constructiva), histórico de precio por m² por barrio mediante scraping, renta mediana por sección censal del INE, ruido nocturno y NO₂ del Ayuntamiento, y red de Metro y Cercanías.' },
      { title: 'Ingeniería de features espaciales', text: 'Momentum CAGR de renta y precio por zona, accesibilidad como número de estaciones en un buffer de 400 m por edificio, ratios comercial/oficinas, sótanos y planta máxima agregados desde Catastro.' },
      { title: 'Modelo y precomputación', text: 'XGBoost entrenado sobre 31 variables. Las features de contexto se precomputan por edificio en Parquet, de modo que la inferencia solo combina la entrada del usuario con una fila ya calculada.' },
      { title: 'Producto', text: 'API asíncrona en FastAPI (tasación, optimización de reforma, búsqueda, análisis de zona y asesor IA por SSE) y SPA en React + Vite con MapLibre GL JS sobre teselas vectoriales de ArcGIS Online.' },
    ],
    architecture: [
      { name: 'Presentación', items: ['React + Vite', 'MapLibre GL JS', 'Teselas vectoriales ArcGIS Online', 'Cliente SSE'] },
      { name: 'Aplicación', items: ['FastAPI asíncrono', '/tasar', '/optimizar_edificio', '/buscar', '/analizar_zona', 'Asesor IA (SSE)'] },
      { name: 'Inferencia', items: ['XGBoost Regressor', '31 features', 'Motor de reglas de reforma', '<50 ms p95'] },
      { name: 'Datos', items: ['Parquet columnar (~70K registros)', 'Capa de edificios enriquecida', 'SQLite (usuarios y carteras)'] },
      { name: 'Infraestructura', items: ['Oracle Cloud (Ampere A1)', 'Nginx proxy inverso', 'Uvicorn + systemd'] },
    ],
    results: [
      'Plataforma desplegada en producción y accesible públicamente en gradientestate.com.',
      'Inferencia por debajo de 50 ms gracias a la precomputación de más de 30 features por edificio.',
      'Más de 70.000 registros catastrales indexados para búsqueda geoespacial.',
      'Simulación de reformas con ROI estimado y asesor LLM en streaming.',
    ],
  },
  {
    slug: 'spain-aqi',
    title: 'Spain AQI',
    kicker: 'ETL en tiempo real · LSTM · Series temporales · Fullstack · Cloud',
    status: 'Producción',
    icon: 'cloud',
    featured: true,
    summary:
      'Sistema de monitorización y predicción de la calidad del aire a escala nacional, con ETL en tiempo real de fuentes oficiales y predicciones LSTM por estación.',
    highlights: [
      'Sistema de monitorización y predicción de calidad del aire a escala nacional. Pipeline ETL en Python que agrega y unifica datos en tiempo real de <strong>múltiples fuentes oficiales (CC.AA. y MITECO)</strong> para calcular el Índice de Calidad del Aire por estación.',
      'Backend FastAPI con limpieza automatizada, mapas de calor e inferencia de <strong>modelos LSTM entrenados sobre series de contaminantes combinadas con variables climáticas</strong>. Navegación nacional, provincial y municipal.',
    ],
    kpis: [
      { value: 'Nacional', label: 'cobertura por estación' },
      { value: 'LSTM', label: 'predicción del AQI' },
      { value: '3 niveles', label: 'país · provincia · municipio' },
    ],
    tags: ['Python', 'LSTM', 'TensorFlow', 'Pandas · GeoPandas', 'FastAPI', 'React', 'Leaflet', 'Oracle Cloud'],
    links: [{ label: 'spain-aqi.ddns.net', url: 'https://spain-aqi.ddns.net/', kind: 'live' }],
    images: [
      { name: 'aire-1', alt: 'Mapa de calor del índice de calidad del aire sobre España con control temporal', caption: 'Vista nacional con mapa de calor' },
      { name: 'aire-2', alt: 'Panel provincial de Madrid con serie temporal del AQI, predicción y variables climáticas', caption: 'Provincia: serie histórica y predicción' },
      { name: 'aire-3', alt: 'Panel municipal de Málaga con evolución del AQI y datos meteorológicos', caption: 'Municipio: detalle y meteorología' },
    ],
    context: [
      'Los datos de calidad del aire en España se publican de forma fragmentada: cada comunidad autónoma y el MITECO exponen sus estaciones con formatos, frecuencias y nomenclaturas distintas. Obtener una visión nacional coherente, y además anticipar su evolución, exige un trabajo previo de ingeniería de datos considerable.',
    ],
    approach: [
      { title: 'ETL multi-fuente', text: 'Extracción periódica de las fuentes autonómicas y del MITECO, normalización de contaminantes y estaciones y cálculo del Índice de Calidad del Aire por estación.' },
      { title: 'Modelado temporal', text: 'Redes LSTM entrenadas sobre series de contaminantes (NO₂, partículas) combinadas con variables climáticas para predecir el AQI.' },
      { title: 'Servicio y visualización', text: 'API FastAPI que sirve datos limpios, mapas de calor y predicciones; frontend React + Vite con Leaflet y navegación por provincia y municipio.' },
    ],
    architecture: [
      { name: 'Fuentes', items: ['Comunidades autónomas', 'MITECO', 'Variables climáticas'] },
      { name: 'Procesamiento', items: ['ETL Python', 'Limpieza automatizada', 'Cálculo de AQI', 'Mapas de calor'] },
      { name: 'Modelos', items: ['LSTM (TensorFlow)', 'Series multivariadas'] },
      { name: 'Producto', items: ['FastAPI', 'React + Vite', 'Leaflet', 'Oracle Cloud + DNS público'] },
    ],
    results: [
      'Visor público en producción con datos en tiempo real a escala nacional.',
      'Histórico, variables climáticas y predicción LSTM integrados en la misma vista.',
      'Navegación jerárquica nacional → provincial → municipal.',
    ],
  },
  {
    slug: 'cnn-multitarea-pnoa',
    title: 'CNN multi-tarea sobre PNOA',
    kicker: 'Deep Learning · Computer Vision · Teledetección · TFG',
    status: 'TFG',
    icon: 'scan',
    featured: true,
    summary:
      'Detección de vehículos y estimación de su acimut sobre ortofotografía PNOA con un detector YOLO OBB encadenado a un regresor ResNet. Trabajo Fin de Grado en la Cátedra IGN y CNIG-UPM.',
    highlights: [
      'Modelo de aprendizaje profundo <strong>multi-tarea</strong> para detectar vehículos y estimar su acimut sobre ortofotografía del Plan Nacional de Ortofotografía Aérea del IGN. Trabajo Fin de Grado en el marco de la Cátedra IGN y CNIG-UPM.',
      'Un detector <strong>YOLO con cajas orientadas (OBB)</strong> localiza los vehículos sobre teselas de 512×512 px; cada detección pasa a un <strong>regresor ResNet</strong> con salida seno/coseno. La inferencia añade votación espacial y el vector director de la vía.',
    ],
    kpis: [
      { value: '0,992', label: 'mAP@50' },
      { value: '0,857', label: 'mAP@50-95' },
      { value: '5,11°', label: 'MAE de acimut' },
    ],
    tags: ['YOLO OBB', 'ResNet', 'CNN multi-tarea', 'Regresión angular', 'PyTorch', 'PNOA · IGN', 'Computer Vision'],
    links: [],
    images: [
      { name: 'pnoa-1', alt: 'Ortofoto de una autovía con vehículos detectados mediante cajas orientadas y flechas de acimut', caption: 'Detección orientada y acimut en autovía' },
      { name: 'pnoa-2', alt: 'Ortofoto con varios carriles y vehículos detectados con su orientación estimada', caption: 'Múltiples carriles y sentidos' },
      { name: 'pnoa-3', alt: 'Ortofoto de un puente con un vehículo detectado y su ángulo de acimut', caption: 'Detección sobre puente' },
    ],
    context: [
      'La ortofotografía PNOA cubre todo el territorio nacional con alta resolución, pero extraer de ella información sobre objetos móviles como vehículos —y no solo su posición, sino su orientación— es un problema abierto. El acimut aporta información sobre sentido de circulación y uso de la vía que una caja alineada a los ejes no captura.',
    ],
    approach: [
      { title: 'Dataset', text: '8.000 teselas PNOA de 512×512 px descargadas vía WMS y anotadas con cajas orientadas.' },
      { title: 'Etapa 1 · Detección', text: 'Detector YOLO con cajas orientadas (OBB) que localiza cada vehículo con su rectángulo girado.' },
      { title: 'Etapa 2 · Acimut', text: 'Cada detección se recorta y pasa a un regresor ResNet que estima el ángulo con salida seno/coseno, evitando la discontinuidad 0°/360°.' },
      { title: 'Post-proceso', text: 'Votación espacial entre detecciones cercanas y uso del vector director de la vía para consolidar la orientación final.' },
    ],
    results: [
      'mAP@50 = 0,992 y mAP@50-95 = 0,857 en detección.',
      'Error absoluto medio de 5,11° en la estimación de acimut.',
      'Desarrollado en el marco de la Cátedra IGN y CNIG-UPM.',
    ],
  },
  {
    slug: 'anomalias-migratorias-eeuu',
    title: 'Anomalías en flujos migratorios',
    kicker: 'Graph Neural Network · Autoencoder · LSTM · XGBoost · Big Data',
    status: 'Académico',
    icon: 'globe',
    featured: true,
    summary:
      'Detección de anomalías en la migración interna de EE.UU. (3.109 condados, 2011–2022) comparando autoencoders geoespaciales, un modelo de gravedad neuronal con GNN, LSTM y XGBoost.',
    highlights: [
      'Análisis de flujos de migración interna en <strong>3.109 condados durante 11 periodos (2011–2022)</strong>, con 296.749 flujos procedentes de registros fiscales del IRS, para detectar anomalías históricas en la movilidad poblacional.',
      'Comparativa de <strong>autoencoders geoespaciales</strong>, un <strong>motor de gravedad neuronal con Graph Neural Network</strong>, LSTM con ventanas de 3 años y XGBoost. El sistema aisló el huracán Harvey (2017) y el shock del COVID-19.',
    ],
    kpis: [
      { value: '296.749', label: 'flujos analizados' },
      { value: '4', label: 'arquitecturas comparadas' },
      { value: '4,8×', label: 'ratio de anomalías en 2020' },
    ],
    tags: ['Graph Neural Network', 'Autoencoder', 'LSTM', 'XGBoost', 'PyTorch Geometric', 'GeoPandas', 'IRS · Census Bureau'],
    links: [],
    images: [{ name: 'migracion-eeuu', alt: 'Mapa de EE.UU. por condados clasificados según su indicador de ganancia o salida migratoria', caption: 'Clústeres de ganancia y salida migratoria por condado' }],
    context: [
      'Los flujos migratorios internos entre condados forman un grafo dirigido y ponderado que cambia cada año. Detectar qué cambios son anómalos —y no simple tendencia— requiere modelos que entiendan a la vez la estructura espacial y la temporal.',
    ],
    approach: [
      { title: 'Datos', text: '296.749 flujos origen-destino del IRS entre 3.109 condados en 11 periodos, enriquecidos con variables del Census Bureau.' },
      { title: 'Autoencoders geoespaciales', text: 'Compresión y reconstrucción de flujos; el error de reconstrucción actúa como puntuación de anomalía.' },
      { title: 'Gravedad neuronal (GNN)', text: 'Graph Neural Network que aprende la atracción entre condados como extensión del modelo gravitacional clásico.' },
      { title: 'LSTM y XGBoost', text: 'LSTM con ventanas deslizantes de 3 años sobre 13 features económicas y temporales; XGBoost como referencia de gradient boosting.' },
    ],
    results: [
      'Anomalías por encima del umbral del 1 % coincidentes con el huracán Harvey (2017).',
      'Ratio de anomalías 4,8 veces superior en 2020 por el shock migratorio del COVID-19.',
      'Validación de la capacidad de los modelos para capturar disrupciones históricas reales.',
    ],
  },
  {
    slug: 'movilidad-urbana-madrid',
    title: 'Movilidad urbana inteligente',
    kicker: 'Location Intelligence · Análisis espacial',
    status: 'Académico',
    icon: 'car',
    featured: false,
    summary:
      'Estudio de optimización del aparcamiento en Madrid cruzando datos de tráfico y parquímetros para generar mapas de calor y propuestas de movilidad.',
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
    title: 'Resiliencia agrícola en Murcia',
    kicker: 'Teledetección aplicada · Agricultura de precisión',
    status: 'Académico',
    icon: 'leaf',
    featured: false,
    summary:
      'Evaluación de la salud de cultivos mediante series temporales de NDVI y modelado predictivo para apoyar decisiones en agricultura de precisión.',
    highlights: [],
    kpis: [],
    tags: ['Python', 'ArcGIS', 'Remote Sensing', 'NDVI'],
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
