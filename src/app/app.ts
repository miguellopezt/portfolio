import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer';
import { Nav } from './layout/nav';
import { TopoBackground } from './layout/topo-background';
import { Lightbox } from './shared/lightbox/lightbox';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Nav, Footer, TopoBackground, Lightbox],
  template: `
    <a class="skip-link" href="#main">Saltar al contenido</a>
    <div class="bg" aria-hidden="true"></div>
    <app-topo-background />
    <app-nav />
    <main id="main"><router-outlet /></main>
    <app-footer />
    <app-lightbox />
  `,
})
export class App {
  constructor() {
    inject(ViewportScroller).setOffset([0, 72]);
    afterNextRender(() => {
      const root = document.documentElement;
      // Dispara la coreografía de entrada del hero una vez hidratado
      requestAnimationFrame(() => root.classList.add('ready'));
    });
  }
}
