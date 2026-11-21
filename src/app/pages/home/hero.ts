import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HERO_METRICS, PROFILE } from '../../core/data/profile';
import { Icon } from '../../shared/icon/icon';
import { CountUp, Reveal } from '../../shared/motion/directives';
import { MotionService } from '../../shared/motion/motion.service';
import { Picture } from '../../shared/picture/picture';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Picture, RouterLink, CountUp, Reveal],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div class="hero-meta" data-hero style="--i: 0">
              <span class="status"><span class="status-dot"></span>{{ p.availability }}</span>
              <span>{{ p.coords }}</span>
            </div>
            <h1 class="hero-title" id="hero-title">
              <span class="line"><span style="--i: 0">Miguel Alessandro</span></span>
              <span class="line"><span style="--i: 1" class="accent">López Tamagno</span></span>
            </h1>
            <p class="hero-role" data-hero style="--i: 1">
              <span>{{ p.role }}</span><span class="sep" aria-hidden="true"></span>
              <span class="typer" aria-live="off">{{ typed() }}</span>
            </p>
            <p class="hero-lead" data-hero style="--i: 2">{{ p.lead }}</p>
            <div class="hero-actions" data-hero style="--i: 3">
              <a class="btn" routerLink="/" fragment="proyectos">Ver proyectos <app-icon name="arrowRight" class="arrow" /></a>
              <a class="btn btn-ghost" [href]="'mailto:' + p.email"><app-icon name="mail" /> Contactar</a>
              <a class="btn btn-ghost btn-icon" [href]="p.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" /></a>
              <a class="btn btn-ghost btn-icon" [href]="p.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon name="github" /></a>
            </div>
          </div>
          <div class="portrait">
            <div class="portrait-orbit" aria-hidden="true"></div>
            <div class="portrait-ring" aria-hidden="true"></div>
            <div class="portrait-img">
              <app-picture name="avatar" alt="Retrato de Miguel López Tamagno" sizes="(max-width: 860px) 168px, 320px" [priority]="true" />
            </div>
            <div class="portrait-tag t1" aria-hidden="true"><b>XGBoost</b> · inferencia &lt;50 ms</div>
            <div class="portrait-tag t2" aria-hidden="true"><b>YOLO OBB</b> · mAP@50 0,992</div>
          </div>
        </div>

        <ul class="metrics" role="list" appReveal style="margin-top: clamp(3rem, 7vw, 5rem)">
          @for (m of metrics; track m.value) {
            <li class="metric">
              <p class="metric-value"><span [appCountUp]="m.value">{{ m.value }}</span></p>
              <p class="metric-label">{{ m.label }}<span class="metric-src">{{ m.source }}</span></p>
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
  protected readonly typed = signal<string>(PROFILE.focus[0]);
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (this.motion.reduced()) return;
      // Efecto máquina de escribir rotando los focos de trabajo
      const words = PROFILE.focus;
      let w = 0, i = words[0].length, deleting = true, timer = 0;
      const step = () => {
        const word = words[w];
        i += deleting ? -1 : 1;
        this.typed.set(word.slice(0, i));
        let delay = deleting ? 28 : 55;
        if (!deleting && i === word.length) { deleting = true; delay = 2200; }
        else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
        timer = window.setTimeout(step, delay);
      };
      timer = window.setTimeout(step, 3200);
      this.destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
