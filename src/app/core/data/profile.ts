import type { Domain, Kpi, StackGroup, TimelineItem } from '../models';

export const SITE_URL = 'https://miguellopezt.github.io/portfolio';

export const PROFILE = {
  name: 'Miguel Alessandro López Tamagno',
  shortName: 'Miguel López Tamagno',
  initials: 'ML',
  role: 'Datos geoespaciales · Machine Learning · Aplicaciones web',
  jobTitle: 'Spatial Data Engineer',
  location: 'Madrid',
  coords: '40.4555° N · 3.4697° W',
  email: 'miguellopeztamagno@gmail.com',
  cv: 'data/cv_miguellopez.pdf',
  linkedin: 'https://www.linkedin.com/in/miguel-alessandro-lopez/',
  github: 'https://github.com/miguellopezt',
  availability: 'Buscando prácticas',
  focus: [] as readonly string[],
  lead:
    'Estudio Ingeniería Geoespacial en la UPM y el Máster en Big Data en la Universidad de Alcalá. Hago proyectos completos con datos espaciales: la ETL que recoge y cruza las fuentes, el modelo que saca algo útil de ellas y la aplicación web donde se usa. Dos de ellos están en producción.',
  description:
    'Estudiante de Ingeniería Geoespacial (UPM) y del Máster en Big Data (UAH). ETL con datos espaciales, Machine Learning, visión por computador y aplicaciones web en producción.',
} as const;

export const HERO_METRICS: readonly (Kpi & { source: string })[] = [
  { value: '70K+', label: 'registros catastrales consultables en la web de valoración', source: 'GradientEstate' },
  { value: '<50 ms', label: 'por cada predicción del modelo de precios', source: 'GradientEstate · XGBoost' },
  { value: '0,992', label: 'mAP@50 detectando vehículos en ortofoto PNOA', source: 'TFG · YOLO OBB' },
  { value: '3.109', label: 'condados de EE. UU. en el análisis de migración', source: 'GNN · LSTM · XGBoost' },
];

export const ABOUT = {
  paragraphs: [
    'Lo que más me interesa son los problemas en los que la ubicación cambia el resultado: el precio de un piso, la calidad del aire en una estación o la orientación de un coche en una foto aérea. Casi siempre empiezan igual: datos públicos repartidos en formatos y escalas distintas que hay que limpiar y cruzar antes de poder modelar nada.',
    'Trabajo sobre todo en Python. Para los datos uso GeoPandas, PostGIS y ETL propias; para modelar, XGBoost si el problema es tabular, LSTM para series temporales y PyTorch para visión y grafos. Cuando el proyecto lo pide, hago la API con FastAPI, el frontend con React y MapLibre, y lo despliego en un servidor de Oracle Cloud con Nginx.',
    'Estoy en el último curso del Grado en la UPM, curso el Máster en Analítica de Negocio y Big Data en la Universidad de Alcalá y busco prácticas en ingeniería de datos, GIS o Machine Learning.',
  ],
  quoteLabel: 'Cómo trabajo',
  quote:
    'Lo que más condiciona un modelo predictivo es el dataset de entrenamiento: qué variables entran, cómo se tratan, cómo interactúan y qué aporta cada una a la variable objetivo. Es la parte que más tiempo me lleva y la que menos se ve.',
  sectors: ['Vivienda', 'Medio ambiente', 'Urbanismo', 'Agricultura', 'Demografía', 'Movilidad'],
};

export const DOMAINS: readonly Domain[] = [
  {
    title: 'Datos y ETL',
    icon: 'workflow',
    text: 'Scripts en Python que descargan, limpian y unen fuentes públicas (Catastro, INE, MITECO, IRS, WMS del IGN) y las dejan listas para modelar en Parquet o PostGIS.',
  },
  {
    title: 'Machine Learning',
    icon: 'chart',
    text: 'XGBoost para regresión con muchas variables espaciales derivadas y LSTM para series temporales. Donde más tiempo pongo es en construir y validar las features.',
  },
  {
    title: 'Visión por computador',
    icon: 'scan',
    text: 'Detección orientada con YOLO OBB y regresión de ángulos con ResNet sobre ortofoto PNOA. También he usado GNN y autoencoders para detectar anomalías en grafos.',
  },
  {
    title: 'Aplicaciones web',
    icon: 'code',
    text: 'APIs con FastAPI, frontends en React con MapLibre GL JS o Leaflet y un asistente con LLM servido por SSE. Despliegue en Oracle Cloud con Nginx, Uvicorn y systemd.',
  },
  {
    title: 'GIS',
    icon: 'map',
    text: 'ArcGIS Pro, QGIS y PostGIS para análisis espacial; GeoPandas, Shapely y Rasterio cuando hay que automatizarlo o meterlo en un pipeline.',
  },
  {
    title: 'Teledetección',
    icon: 'satellite',
    text: 'Imagen satelital y ortofoto PNOA: series de NDVI para seguir el estado de cultivos y análisis de cobertura del suelo.',
  },
];

export const STACK: readonly StackGroup[] = [
  {
    title: 'Datos y cloud',
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
    title: 'ML y Deep Learning',
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
    title: 'GIS y teledetección',
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
    title: 'Web',
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
    date: '2026 – actualidad',
    title: 'Máster Universitario en Analítica de Negocio y Big Data',
    org: 'Universidad de Alcalá',
    text: '60 ECTS, semipresencial. Analítica avanzada y Big Data aplicados a la toma de decisiones.',
    chips: ['60 ECTS', 'Big Data', 'Business Analytics'],
  },
  {
    date: '2022 – actualidad',
    title: 'Grado en Ingeniería en Tecnologías de la Información Geoespacial',
    org: 'Universidad Politécnica de Madrid',
    text: 'SIG, infraestructuras de datos espaciales, Big Data, ingeniería de datos, programación y algoritmia aplicada a problemas geográficos. Delegado de 4º curso.',
    chips: ['SIG', 'IDE', 'Big Data'],
  },
  {
    date: 'TFG',
    title: 'Detección de vehículos y acimut en ortofoto PNOA',
    org: 'Cátedra IGN y CNIG · UPM',
    text: 'YOLO OBB más un regresor ResNet sobre 8.000 teselas del PNOA para localizar vehículos y estimar su orientación.',
    chips: ['mAP@50 0,992', 'MAE 5,11°'],
  },
];

export const SOFT_SKILLS = [
  {
    title: 'Análisis',
    img: 'img/icons/analitico.svg',
    text: 'Partir un problema de datos grande en piezas que se puedan resolver y comprobar una a una.',
  },
  {
    title: 'Versatilidad',
    img: 'img/icons/adaptabilidad.svg',
    text: 'He aplicado lo mismo a vivienda, medio ambiente, urbanismo, agricultura y demografía.',
  },
  {
    title: 'Trabajo en equipo',
    img: 'img/icons/innovacion.svg',
    text: 'Delegado de 4º curso en el Grado: represento a mis compañeros ante el profesorado.',
  },
] as const;
