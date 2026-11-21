# Portfolio — Miguel Alessandro López Tamagno

Portfolio personal de ingeniería geoespacial, datos y Machine Learning.
**https://miguellopezt.github.io/portfolio/**

## Stack

- **Angular 22** (componentes standalone, signals, sin zone.js) con **prerenderizado estático (SSG)**: cada ruta se genera como HTML real en build, indexable por buscadores y legible por las previsualizaciones de LinkedIn.
- **Hidratación** del cliente con *event replay* y **View Transitions** entre páginas.
- **GitHub Actions** compila y publica en GitHub Pages en cada push a `main`.

## Estructura

```
src/app/
├── core/
│   ├── data/            # Contenido tipado: perfil, proyectos, manifiesto de imágenes
│   ├── models.ts        # Interfaces del dominio
│   └── seo.service.ts   # Title, meta, Open Graph, canonical y JSON-LD por ruta
├── layout/              # Nav, footer y fondo topográfico (canvas)
├── pages/
│   ├── home/            # Hero, perfil, proyectos, stack, trayectoria, contacto
│   ├── project/         # Caso de estudio: /proyectos/:slug
│   └── not-found.ts     # 404
└── shared/              # Icono, <picture> responsive, galería, lightbox, directivas de movimiento
```

**Editar contenido** = editar `src/app/core/data/profile.ts` o `projects.ts`. Un proyecto con `featured: true` obtiene automáticamente su página de caso de estudio, su entrada en el sitemap y sus metadatos.

## Imágenes

Los originales viven en `src-img/`. El script genera variantes AVIF + WebP (480/960/1600 px) en `public/img/` y el manifiesto tipado que usa `<app-picture>`:

```bash
pip install pillow
npm run images
```

## Desarrollo

```bash
npm ci
npm start          # http://localhost:4200
npm run build      # salida estática en dist/portfolio/browser
```

## Animación y accesibilidad

- Fondo de **isolíneas topográficas** en tiempo real: ruido Perlin 3D + *marching squares*, con una elevación que sigue al cursor. ~30 fps, se pausa fuera del hero o con la pestaña oculta.
- Revelados al hacer scroll con un único `IntersectionObserver`, contadores animados, *spotlight* en tarjetas, inclinación 3D en imágenes, timeline guiada por scroll (`animation-timeline: view()`).
- Respeta `prefers-reduced-motion`; el contenido es visible sin JavaScript.
