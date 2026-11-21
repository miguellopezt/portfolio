import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOFT_SKILLS, TIMELINE } from '../../core/data/profile';
import { Icon } from '../../shared/icon/icon';
import { Reveal, Spotlight } from '../../shared/motion/directives';

@Component({
  selector: 'app-journey',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal, Spotlight],
  template: `
    <section class="section" id="trayectoria" aria-labelledby="trayectoria-title">
      <div class="container">
        <header class="section-head" appReveal>
          <span class="eyebrow">04 — Trayectoria</span>
          <h2 class="section-title" id="trayectoria-title">Formación <span class="muted">y credenciales.</span></h2>
        </header>

        <div class="timeline-wrap">
          <div class="timeline" appReveal>
            <span class="timeline-fill" aria-hidden="true"></span>
            <ol class="tl-list">
            @for (t of timeline; track t.title; let i = $index) {
              <li class="tl-item" appReveal="left" [revealIndex]="i">
                <span class="tl-dot" aria-hidden="true"></span>
                <div class="tl-date">{{ t.date }}</div>
                <h3>{{ t.title }}</h3>
                <div class="tl-org">{{ t.org }}</div>
                <p>{{ t.text }}</p>
                @if (t.chips) {
                  <div class="chips">@for (c of t.chips; track c) { <span class="chip">{{ c }}</span> }</div>
                }
              </li>
            }
            </ol>
          </div>

          <div class="side-stack">
            <div class="side-card spot" appSpotlight appReveal="right">
              <h3>Idiomas</h3>
              <div class="lang">
                <div class="lang-row"><div><span>Español</span><span>Nativo</span></div><div class="bar"><i style="--w: 100%"></i></div></div>
                <div class="lang-row"><div><span>Inglés</span><span>B2 · Aptis (British Council)</span></div><div class="bar"><i style="--w: 72%"></i></div></div>
              </div>
            </div>
            <div class="side-card spot" appSpotlight appReveal="right" [revealIndex]="1">
              <h3>Más</h3>
              <ul class="facts">
                <li><app-icon name="award" /><span><b>Certificado Aptis General — B2</b>British Council, nivel MCER B2.</span></li>
                <li><app-icon name="users" /><span><b>Delegado de curso</b>4º del Grado en la UPM.</span></li>
                <li><app-icon name="car" /><span><b>Carnet B y vehículo propio</b>Disponibilidad total para desplazamientos.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="soft">
          @for (s of soft; track s.title; let i = $index) {
            <div class="soft-card spot" appSpotlight appReveal [revealIndex]="i">
              <img [src]="s.img" alt="" width="52" height="52" loading="lazy" />
              <div><h3>{{ s.title }}</h3><p>{{ s.text }}</p></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Journey {
  protected readonly timeline = TIMELINE;
  protected readonly soft = SOFT_SKILLS;
}
