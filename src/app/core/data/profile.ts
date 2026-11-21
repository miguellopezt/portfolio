import type { Domain, Kpi, StackGroup, TimelineItem } from '../models';

export const SITE_URL = 'https://miguellopezt.github.io/portfolio';

export const PROFILE = {
  name: 'Miguel Alessandro López Tamagno',
  shortName: 'Miguel López Tamagno',
  initials: 'ML',
  role: 'Ingeniería Geoespacial & Big Data Analytics',
  jobTitle: 'Spatial Data Engineer',
  location: 'Torrejón de Ardoz, Madrid',
  coords: '40.4555° N · 3.4697° W',
  email: 'miguellopeztamagno@gmail.com',
  cv: 'data/cv_miguellopez.pdf',
  linkedin: 'https://www.linkedin.com/in/miguel-alessandro-lopez/',
  github: 'https://github.com/miguellopezt',
  availability: 'Buscando prácticas · 2026',
  /** Frases que rota el hero. */
  focus: ['pipelines ETL geoespaciales', 'modelos predictivos', 'visión por computador', 'productos web con IA'],
  lead:
    'Diseño y construyo sistemas de datos completos: desde la ingesta automatizada hasta modelos de Machine Learning y Deep Learning servidos en productos web en producción, con la componente espacial como variable de análisis.',
  description:
    'Ingeniero en Tecnologías de la Información Geoespacial. Pipelines ETL, Machine Learning, Deep Learning y productos web con IA desplegados en producción.',
} as const;

export const HERO_METRICS: readonly (Kpi & { source: string })[] = [
  { value: '70K+', label: 'registros catastrales servidos con inferencia en tiempo real', source: 'GradientEstate' },
  { value: '0,992', label: 'mAP@50 en detección orientada de vehículos sobre PNOA', source: 'TFG · YOLO OBB' },
  { value: '3.109', label: 'condados analizados en 11 periodos de flujos migratorios', source: 'GNN · Autoencoder' },
  { value: '<50 ms', label: 'latencia de inferencia del modelo de valoración', source: 'XGBoost · FastAPI' },
];

export const ABOUT = {
  paragraphs: [
    'Ingeniero en Tecnologías de la Información Geoespacial con un perfil técnico amplio y orientado a producto. Mi trabajo abarca el <strong>ciclo de vida completo del dato</strong>: desde la ingesta automatizada mediante pipelines ETL hasta su explotación en modelos predictivos, sistemas de detección de objetos y productos web con IA integrada, desplegados en producción sobre infraestructura cloud.',
    'Combino disciplinas que habitualmente viven separadas: ingeniería de datos geoespacial, Machine Learning clásico, Deep Learning aplicado a visión por computador, arquitecturas Fullstack asíncronas y análisis territorial avanzado con GIS. Cada proyecto es una oportunidad para profundizar en un área nueva sin abandonar el rigor en las anteriores.',
    'Actualmente curso el <strong>Máster en Analítica de Negocio y Big Data</strong> en la Universidad de Alcalá y busco prácticas donde aplicar estos conocimientos en entornos reales.',
  ],
  quote:
    'La fase que más condiciona la calidad de cualquier sistema predictivo es la construcción del dataset de entrenamiento: la selección de variables, su tratamiento, sus interacciones y lo que cada una aporta realmente a la variable objetivo. Es el trabajo más determinante y el que suele pasar más desapercibido.',
  sectors: ['Inmobiliario', 'Medio ambiente', 'Urbanismo', 'Agricultura', 'Demografía', 'Movilidad'],
};

export const DOMAINS: readonly Domain[] = [
  {
    title: 'Ingeniería de datos & Cloud',
    icon: 'workflow',
    text: 'Pipelines ETL automatizados en Python para extraer, transformar y unificar fuentes masivas en tiempo real. Despliegue en Oracle Cloud con Nginx como proxy inverso y workers para carga concurrente.',
  },
  {
    title: 'Machine Learning predictivo',
    icon: 'chart',
    text: 'Gradient boosting (XGBoost) para regresión de variables complejas, con la ingeniería de features geoespaciales como núcleo diferencial. Redes LSTM para series temporales multivariadas con componente espacial.',
  },
  {
    title: 'Deep Learning & Visión',
    icon: 'scan',
    text: 'Arquitecturas CNN multi-tarea que combinan detección orientada (YOLO OBB) con regresores ResNet para estimación angular. Graph Neural Networks y autoencoders para grafos y detección de anomalías.',
  },
  {
    title: 'Fullstack & IA generativa',
    icon: 'code',
    text: 'Backends asíncronos en FastAPI y frontends en React, con LLMs integrados mediante Server-Sent Events. Renderizado cartográfico avanzado con MapLibre GL JS y Leaflet.',
  },
  {
    title: 'GIS & PostGIS',
    icon: 'map',
    text: 'ArcGIS Pro, QGIS y PostGIS, apoyados en el stack geoespacial de Python (GeoPandas, Shapely, Rasterio) para análisis territoriales complejos y capas espaciales enriquecidas.',
  },
  {
    title: 'Teledetección',
    icon: 'satellite',
    text: 'Procesamiento de imagen satelital y aérea (PNOA), modelado predictivo de índices espectrales (NDVI) y patrones de cobertura del suelo para agricultura de precisión y análisis ambiental.',
  },
];

export const STACK: readonly StackGroup[] = [
  {
    title: 'Datos & Cloud',
    code: '01',
    items: [
      { name: 'Python', devicon: 'devicon-python-plain' },
      { name: 'Pandas · GeoPandas', devicon: 'devicon-pandas-plain' },
      { name: 'PostgreSQL · PostGIS', devicon: 'devicon-postgresql-plain' },
      { name: 'SQLite · Parquet', devicon: 'devicon-sqlite-plain' },
      { name: 'Oracle Cloud', devicon: 'devicon-oracle-original' },
      { name: 'Nginx · Uvicorn', devicon: 'devicon-nginx-original' },
    ],
  },
  {
    title: 'ML & Deep Learning',
    code: '02',
    items: [
      { name: 'XGBoost', icon: 'grid' },
      { name: 'PyTorch', devicon: 'devicon-pytorch-original' },
      { name: 'TensorFlow', devicon: 'devicon-tensorflow-original' },
      { name: 'YOLO (OBB)', icon: 'scan' },
      { name: 'PyTorch Geometric', icon: 'globe' },
      { name: 'R', devicon: 'devicon-r-plain' },
    ],
  },
  {
    title: 'GIS & Teledetección',
    code: '03',
    items: [
      { name: 'ArcGIS Pro · Online', icon: 'map' },
      { name: 'QGIS', icon: 'globe' },
      { name: 'Shapely · Rasterio', icon: 'layers' },
      { name: 'PNOA · WMS', icon: 'satellite' },
      { name: 'NDVI · Series temporales', icon: 'leaf' },
    ],
  },
  {
    title: 'Fullstack',
    code: '04',
    items: [
      { name: 'FastAPI', devicon: 'devicon-fastapi-plain' },
      { name: 'React · Vite', devicon: 'devicon-react-original' },
      { name: 'Angular', devicon: 'devicon-angular-plain' },
      { name: 'MapLibre GL JS', icon: 'map' },
      { name: 'Leaflet', icon: 'pin' },
      { name: 'LLM · SSE', icon: 'sparkles' },
    ],
  },
];

export const MARQUEE = [
  'ETL', 'GeoPandas', 'XGBoost', 'LSTM', 'YOLO OBB', 'ResNet', 'Graph Neural Networks', 'Autoencoders',
  'FastAPI', 'React', 'MapLibre', 'PostGIS', 'Oracle Cloud', 'NDVI', 'PNOA', 'Server-Sent Events',
];

export const TIMELINE: readonly TimelineItem[] = [
  {
    date: '2026 — Actualidad',
    title: 'Máster Universitario en Analítica de Negocio y Big Data',
    org: 'Universidad de Alcalá',
    text: 'Programa de 60 ECTS en modalidad semipresencial, orientado a analítica avanzada, Big Data y toma de decisiones basada en datos.',
    chips: ['60 ECTS', 'Big Data', 'Business Analytics'],
  },
  {
    date: '2022 — Actualidad',
    title: 'Grado en Ingeniería en Tecnologías de la Información Geoespacial',
    org: 'Universidad Politécnica de Madrid',
    text: 'Formación integral en Sistemas de Información Geográfica, Infraestructuras de Datos Espaciales, Big Data, ingeniería de datos, programación avanzada y algoritmia aplicada a problemas geográficos. Delegado de curso en 4º.',
    chips: ['GIS', 'IDE', 'Big Data'],
  },
  {
    date: 'TFG',
    title: 'CNN multi-tarea sobre ortofotografía PNOA',
    org: 'Cátedra IGN y CNIG — UPM',
    text: 'Detección de vehículos y estimación de su acimut con YOLO OBB + ResNet sobre 8.000 teselas del Plan Nacional de Ortofotografía Aérea.',
    chips: ['mAP@50 0,992', 'MAE 5,11°'],
  },
];

export const SOFT_SKILLS = [
  {
    title: 'Pensamiento analítico',
    img: 'img/icons/analitico.svg',
    text: 'Descomponer problemas complejos de datos en soluciones lógicas, eficientes y escalables.',
  },
  {
    title: 'Adaptabilidad y versatilidad',
    img: 'img/icons/adaptabilidad.svg',
    text: 'Aplicar la ingeniería de datos a sectores diversos y aprender nuevas herramientas con rapidez.',
  },
  {
    title: 'Innovación tecnológica',
    img: 'img/icons/innovacion.svg',
    text: 'Búsqueda proactiva de nuevas arquitecturas y metodologías para optimizar procesos tradicionales.',
  },
] as const;
