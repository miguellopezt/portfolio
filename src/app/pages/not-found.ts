import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { Icon } from '../shared/icon/icon';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <section class="hero not-found">
      <div class="container">
        <span class="eyebrow">Error 404</span>
        <h1 class="hero-title" style="margin-top: 1rem">Página no encontrada</h1>
        <p class="hero-lead">Esta dirección no existe o ha cambiado.</p>
        <a class="btn" routerLink="/"><app-icon name="arrowLeft" /> Volver al inicio</a>
      </div>
    </section>
  `,
})
export class NotFound {
  constructor() {
    inject(SeoService).set({ title: 'Página no encontrada', description: 'Esta página no existe.', path: '404' });
  }
}
