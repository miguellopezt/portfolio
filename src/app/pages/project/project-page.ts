import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE, SITE_URL } from '../../core/data/profile';
import { FEATURED as PROJECTS, projectBySlug } from '../../core/data/projects';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon/icon';
import { CountUp, Reveal, Spotlight } from '../../shared/motion/directives';
import { fullSrc } from '../../shared/picture/picture';
import { ProjectGallery } from '../../shared/project-gallery';

/** Caso de estudio: contexto → enfoque → arquitectura → resultados. Ruta /proyectos/:slug. */
@Component({
  selector: 'app-project-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, ProjectGallery, Reveal, Spotlight, CountUp],
  template: `
    @if (project(); as p) {
      <article class="case">
        <header class="case-hero container">
          <a class="back" routerLink="/" fragment="proyectos" appReveal><app-icon name="arrowLeft" /> Todos los proyectos</a>
          <div class="project-index" appReveal [revealIndex]="1">
            <b>{{ p.status === 'Producción' ? 'En producción' : p.status }}</b>
            <span>{{ p.kicker }}</span>
          </div>
          <h1 class="case-title" appReveal [revealIndex]="1">{{ p.title }}</h1>
          <p class="case-lead" appReveal [revealIndex]="2">{{ p.summary }}</p>
          @if (p.kpis.length) {
            <ul class="metrics case-kpis" role="list" appReveal [revealIndex]="3">
              @for (k of p.kpis; track k.label) {
                <li class="metric"><p class="metric-value"><span [appCountUp]="k.value">{{ k.value }}</span></p><p class="metric-label">{{ k.label }}</p></li>
              }
            </ul>
          }
          <div class="project-links" appReveal [revealIndex]="4">
            @for (l of p.links; track l.url) {
              <a class="btn" [class.btn-ghost]="l.kind === 'repo'" [href]="l.url" target="_blank" rel="noopener">
                <app-icon [name]="l.kind === 'repo' ? 'github' : 'arrowUpRight'" class="arrow" /> {{ l.label }}
              </a>
            }
          </div>
        </header>

        <div class="container case-gallery">
          <app-project-gallery [images]="p.images" sizes="(max-width: 1160px) 100vw, 1100px" [priority]="true" />
        </div>

        <div class="container case-body">
          <aside class="case-aside">
            <div class="side-card spot" appSpotlight appReveal>
              <h3>Stack</h3>
              <div class="tags">@for (t of p.tags; track t) { <span class="chip">{{ t }}</span> }</div>
            </div>
          </aside>

          <div class="case-main">
            @if (p.context.length) {
              <section class="case-section" appReveal>
                <h2>El problema</h2>
                @for (c of p.context; track $index) { <p>{{ c }}</p> }
              </section>
            }
            @if (p.approach.length) {
              <section class="case-section">
                <h2 appReveal>Cómo lo hice</h2>
                <ol class="steps">
                  @for (s of p.approach; track s.title; let i = $index) {
                    <li class="step spot" appSpotlight appReveal [revealIndex]="i % 2">
                      <span class="step-n mono">{{ (i + 1).toString().padStart(2, '0') }}</span>
                      <h3>{{ s.title }}</h3>
                      <p>{{ s.text }}</p>
                    </li>
                  }
                </ol>
              </section>
            }
            @if (p.architecture) {
              <section class="case-section">
                <h2 appReveal>Arquitectura</h2>
                <div class="arch">
                  @for (l of p.architecture; track l.name; let i = $index) {
                    <div class="arch-layer" appReveal [revealIndex]="i">
                      <span class="arch-name mono">{{ l.name }}</span>
                      <div class="arch-items">@for (it of l.items; track it) { <span class="chip chip-accent">{{ it }}</span> }</div>
                    </div>
                  }
                </div>
              </section>
            }
            @if (p.results.length) {
              <section class="case-section" appReveal>
                <h2>Resultados</h2>
                <ul class="facts results">
                  @for (r of p.results; track r) { <li><app-icon name="check" /><span>{{ r }}</span></li> }
                </ul>
              </section>
            }
          </div>
        </div>

        <nav class="container case-next" aria-label="Siguiente proyecto">
          <a class="next-card spot" appSpotlight [routerLink]="['/proyectos', next().slug]" appReveal>
            <span class="next-sub">Siguiente proyecto</span>
            <span class="next-title">{{ next().title }} <app-icon name="arrowRight" class="arrow" /></span>
            <span class="next-sub">{{ next().kicker }}</span>
          </a>
        </nav>
      </article>
    }
  `,
})
export class ProjectPage {
  /** Parámetro de ruta (withComponentInputBinding). */
  readonly slug = input.required<string>();
  protected readonly project = computed(() => projectBySlug(this.slug()));
  protected readonly next = computed(() => {
    const i = PROJECTS.findIndex((p) => p.slug === this.slug());
    return PROJECTS[(i + 1) % PROJECTS.length];
  });
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      const p = this.project();
      if (!p) return;
      const path = `proyectos/${p.slug}`;
      this.seo.set({
        title: `${p.title} · ${PROFILE.shortName}`,
        description: p.summary,
        path,
        type: 'article',
        image: fullSrc(p.images[0].name),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: p.title,
          description: p.summary,
          url: `${SITE_URL}/${path}`,
          image: `${SITE_URL}/${fullSrc(p.images[0].name)}`,
          keywords: p.tags.join(', '),
          author: { '@type': 'Person', name: PROFILE.name, url: `${SITE_URL}/` },
        },
      });
    });
  }
}
