import { RenderMode, ServerRoute } from '@angular/ssr';
import { FEATURED } from './core/data/projects';

/** Todo se prerenderiza en build → HTML estático servible desde GitHub Pages. */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'proyectos/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => FEATURED.map((p) => ({ slug: p.slug })),
  },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
