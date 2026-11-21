// Postbuild: prepara la salida estática para GitHub Pages.
//  - 404.html a partir de la ruta /404 prerenderizada (GitHub Pages la sirve en rutas inexistentes)
//  - sitemap.xml con todas las páginas prerenderizadas
import { copyFileSync, existsSync, readdirSync, statSync, writeFileSync, rmSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE = 'https://miguellopezt.github.io/portfolio';
const OUT = 'dist/portfolio/browser';

const notFound = join(OUT, '404', 'index.html');
if (existsSync(notFound)) {
  copyFileSync(notFound, join(OUT, '404.html'));
  rmSync(join(OUT, '404'), { recursive: true });
}

const pages = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') pages.push(relative(OUT, dir).split(sep).join('/'));
  }
};
walk(OUT);

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .sort()
  .map((p) => {
    const loc = p ? `${SITE}/${p}/` : `${SITE}/`;
    return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${p ? '0.8' : '1.0'}</priority></url>`;
  })
  .join('\n');
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`postbuild: 404.html ${existsSync(join(OUT, '404.html')) ? 'ok' : 'NO'} · sitemap con ${pages.length} URLs`);
