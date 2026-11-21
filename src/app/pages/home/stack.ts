import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MARQUEE, STACK } from '../../core/data/profile';
import { Icon } from '../../shared/icon/icon';
import { Reveal, Spotlight } from '../../shared/motion/directives';

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal, Spotlight],
  template: `
    <section class="section" id="stack" aria-labelledby="stack-title">
      <div class="container">
        <header class="section-head" appReveal>
          <span class="eyebrow">03 — Stack</span>
          <h2 class="section-title" id="stack-title">Herramientas <span class="muted">de punta a punta.</span></h2>
        </header>
        <div class="stack-grid">
          @for (g of stack; track g.title; let i = $index) {
            <div class="stack-col spot" appSpotlight appReveal [revealIndex]="i">
              <h3><span class="mono">{{ g.code }}</span>{{ g.title }}</h3>
              <ul class="stack-list">
                @for (it of g.items; track it.name) {
                  <li>
                    @if (it.devicon) { <i [class]="it.devicon" aria-hidden="true"></i> }
                    @else if (it.icon) { <span class="ico"><app-icon [name]="it.icon" /></span> }
                    {{ it.name }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">
          @for (rep of [0, 1]; track rep) {
            @for (m of marquee; track m) { <span>{{ m }}</span> }
          }
        </div>
      </div>
    </section>
  `,
})
export class Stack {
  protected readonly stack = STACK;
  protected readonly marquee = MARQUEE;
}
