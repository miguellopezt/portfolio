import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABOUT, DOMAINS } from '../../core/data/profile';
import { Icon } from '../../shared/icon/icon';
import { Reveal, Spotlight } from '../../shared/motion/directives';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal, Spotlight],
  template: `
    <section class="section" id="perfil" aria-labelledby="perfil-title">
      <div class="container">
        <header class="section-head" appReveal>
          <span class="eyebrow">01 — Perfil</span>
          <h2 class="section-title" id="perfil-title">Del dato en bruto <span class="muted">al producto en producción.</span></h2>
        </header>

        <div class="about-grid">
          <div class="about-text">
            @for (p of about.paragraphs; track $index) {
              <p appReveal [revealIndex]="$index" [innerHTML]="p"></p>
            }
          </div>
          <figure class="quote spot" appSpotlight appReveal="right">
            <div class="quote-mark" aria-hidden="true">“</div>
            <blockquote>{{ about.quote }}</blockquote>
            <figcaption>— Visión técnica</figcaption>
            <div class="sectors" aria-label="Sectores de aplicación">
              @for (s of about.sectors; track s) { <span class="chip">{{ s }}</span> }
            </div>
          </figure>
        </div>

        <div class="domains">
          @for (d of domains; track d.title; let i = $index) {
            <article class="domain spot" appSpotlight appReveal [revealIndex]="i % 3">
              <span class="num">0{{ i + 1 }}</span>
              <div class="domain-icon"><app-icon [name]="d.icon" /></div>
              <h3>{{ d.title }}</h3>
              <p>{{ d.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly about = ABOUT;
  protected readonly domains = DOMAINS;
}
