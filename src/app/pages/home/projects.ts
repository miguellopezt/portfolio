import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED, SECONDARY } from '../../core/data/projects';
import { Icon } from '../../shared/icon/icon';
import { LightboxService } from '../../shared/lightbox/lightbox';
import { CountUp, Reveal, Spotlight } from '../../shared/motion/directives';
import { Picture } from '../../shared/picture/picture';
import { ProjectGallery } from '../../shared/project-gallery';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, Picture, ProjectGallery, Reveal, Spotlight, CountUp],
  template: `
    <section class="section" id="proyectos" aria-labelledby="proyectos-title">
      <div class="container">
        <header class="section-head" appReveal>
          <h2 class="section-title" id="proyectos-title">Proyectos</h2>
          <p class="section-lead">Del pipeline de datos al modelo y, cuando aplica, a un producto en producción.</p>
        </header>

        <div class="projects">
          @for (p of featured; track p.slug; let i = $index) {
            <article class="project" [attr.aria-labelledby]="'p-' + p.slug">
              <div class="project-info">
                <div class="project-index" appReveal>
                  @if (p.status === 'Producción') { <span class="badge-live">En producción</span> }
                  @else { <span class="chip">{{ p.status }}</span> }
                </div>
                <h3 [id]="'p-' + p.slug" appReveal [revealIndex]="1">{{ p.title }}</h3>
                <p class="project-sub" appReveal [revealIndex]="1">{{ p.kicker }}</p>
                <div class="project-body">
                  @for (h of p.highlights; track $index) {
                    <p appReveal [revealIndex]="2 + $index" [innerHTML]="h"></p>
                  }
                </div>
                <div class="project-kpis" appReveal [revealIndex]="3">
                  @for (k of p.kpis; track k.label) {
                    <div class="kpi"><div class="kpi-v" [appCountUp]="k.value">{{ k.value }}</div><div class="kpi-l">{{ k.label }}</div></div>
                  }
                </div>
                <div class="tags" appReveal [revealIndex]="4">
                  @for (t of p.tags; track t) { <span class="chip">{{ t }}</span> }
                </div>
                <div class="project-links" appReveal [revealIndex]="5">
                  <a class="btn btn-sm" [routerLink]="['/proyectos', p.slug]">Caso de estudio <app-icon name="arrowRight" class="arrow" /></a>
                  @for (l of p.links; track l.url) {
                    <a class="btn btn-ghost btn-sm" [href]="l.url" target="_blank" rel="noopener">
                      <app-icon [name]="l.kind === 'repo' ? 'github' : 'arrowUpRight'" class="arrow" /> {{ l.label }}
                    </a>
                  }
                </div>
              </div>
              <app-project-gallery [images]="p.images" />
            </article>
          }
        </div>

        <div class="minor-head" appReveal>
          <h3>Otros trabajos</h3>
        </div>
        <div class="minor-grid">
          @for (p of secondary; track p.slug; let i = $index) {
            <article class="minor spot" appSpotlight appReveal [revealIndex]="i">
              <button type="button" class="media-main" (click)="lb.open(p.images)" [attr.aria-label]="'Ampliar: ' + p.images[0].alt">
                <app-picture [name]="p.images[0].name" [alt]="p.images[0].alt" sizes="(max-width: 760px) 100vw, 560px" />
                <span class="media-zoom"><app-icon name="expand" style="width: 13px; height: 13px" /> Ampliar</span>
              </button>
              <div class="minor-body">
                <span class="project-sub" style="margin: 0">{{ p.kicker }}</span>
                <h4>{{ p.title }}</h4>
                <p>{{ p.summary }}</p>
                <div class="minor-foot">
                  <div class="tags">@for (t of p.tags; track t) { <span class="chip">{{ t }}</span> }</div>
                  @for (l of p.links; track l.url) {
                    <a class="btn btn-ghost btn-sm" [href]="l.url" target="_blank" rel="noopener"><app-icon name="arrowUpRight" class="arrow" /> {{ l.label }}</a>
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Projects {
  protected readonly featured = FEATURED;
  protected readonly secondary = SECONDARY;
  protected readonly lb = inject(LightboxService);
}
