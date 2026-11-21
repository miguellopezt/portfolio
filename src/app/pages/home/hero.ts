import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HERO_METRICS, PROFILE } from '../../core/data/profile';
import { Icon } from '../../shared/icon/icon';
import { CountUp, Reveal } from '../../shared/motion/directives';
import { Picture } from '../../shared/picture/picture';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Picture, RouterLink, CountUp, Reveal],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="hero-kicker" data-hero style="--i: 0">{{ p.availability }} · {{ p.location }}</p>
            <h1 class="hero-title" id="hero-title">
              <span class="line"><span style="--i: 0">Miguel Alessandro</span></span>
              <span class="line"><span style="--i: 1">López Tamagno</span></span>
            </h1>
            <p class="hero-role" data-hero style="--i: 1">{{ p.role }}</p>
            <p class="hero-lead" data-hero style="--i: 2">{{ p.lead }}</p>
            <div class="hero-actions" data-hero style="--i: 3">
              <a class="btn" routerLink="/" fragment="proyectos">Ver proyectos <app-icon name="arrowRight" class="arrow" /></a>
              <a class="btn btn-ghost" [href]="'mailto:' + p.email">Contactar</a>
              <a class="btn btn-ghost btn-icon" [href]="p.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" /></a>
              <a class="btn btn-ghost btn-icon" [href]="p.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon name="github" /></a>
            </div>
          </div>
          <div class="portrait">
            <app-picture name="avatar" alt="Retrato de Miguel López Tamagno" sizes="(max-width: 860px) 160px, 360px" [priority]="true" />
          </div>
        </div>

        <ul class="metrics" role="list" appReveal>
          @for (m of metrics; track m.value) {
            <li class="metric">
              <p class="metric-value"><span [appCountUp]="m.value">{{ m.value }}</span></p>
              <p class="metric-label">{{ m.label }}</p>
              <p class="metric-src">{{ m.source }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly p = PROFILE;
  protected readonly metrics = HERO_METRICS;

}
