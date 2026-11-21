import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PROFILE, SITE_URL } from './data/profile';

export interface SeoData {
  title: string;
  description: string;
  /** Ruta relativa al sitio, p. ej. '' o 'proyectos/gradientestate'. */
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  jsonLd?: object;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(d: SeoData): void {
    const url = d.path ? `${SITE_URL}/${d.path}/` : `${SITE_URL}/`;
    const image = `${SITE_URL}/${d.image ?? 'img/og-cover.jpg'}`;
    this.title.setTitle(d.title);
    const tags: [string, string, 'name' | 'property'][] = [
      ['description', d.description, 'name'],
      ['og:title', d.title, 'property'],
      ['og:description', d.description, 'property'],
      ['og:url', url, 'property'],
      ['og:image', image, 'property'],
      ['og:type', d.type ?? 'website', 'property'],
      ['og:locale', 'es_ES', 'property'],
      ['og:site_name', PROFILE.name, 'property'],
      ['twitter:card', 'summary_large_image', 'name'],
      ['twitter:title', d.title, 'name'],
      ['twitter:description', d.description, 'name'],
      ['twitter:image', image, 'name'],
    ];
    for (const [key, content, attr] of tags) {
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }
    this.link('canonical', url);
    this.jsonLd(d.jsonLd);
  }

  private link(rel: string, href: string): void {
    let el = this.doc.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = rel;
      this.doc.head.appendChild(el);
    }
    el.href = href;
  }

  private jsonLd(data?: object): void {
    this.doc.head.querySelector('script[data-seo="ld"]')?.remove();
    if (!data) return;
    const s = this.doc.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-seo', 'ld');
    s.textContent = JSON.stringify(data);
    this.doc.head.appendChild(s);
  }
}

export const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  jobTitle: PROFILE.jobTitle,
  description: PROFILE.description,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/img/avatar-640.webp`,
  email: `mailto:${PROFILE.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Torrejón de Ardoz', addressRegion: 'Madrid', addressCountry: 'ES' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Universidad Politécnica de Madrid' },
    { '@type': 'CollegeOrUniversity', name: 'Universidad de Alcalá' },
  ],
  knowsAbout: ['Geospatial data engineering', 'GIS', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Remote sensing', 'ETL', 'FastAPI', 'React'],
  knowsLanguage: ['es', 'en'],
  sameAs: [PROFILE.linkedin, PROFILE.github],
});
