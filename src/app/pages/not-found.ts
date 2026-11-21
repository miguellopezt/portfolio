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
        <span class="eyebrow">Error 404 · Fuera del área de estudio</span>
        <h1 class="hero-title" style="margin-top: 1rem">Coordenadas<br /><span class="accent">sin datos.</span></h1>
        <p class="hero-lead">La página que buscas no existe o ha cambiado de ubicación.</p>
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
