import { DOCUMENT, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Servicio central de movimiento: un único IntersectionObserver compartido para
 * todos los revelados, y la preferencia de movimiento reducido del usuario.
 * En el servidor (prerender) no hace nada: el HTML sale completo y visible.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly doc = inject(DOCUMENT);
  readonly reduced = signal(false);

  private observer?: IntersectionObserver;
  private readonly callbacks = new WeakMap<Element, () => void>();

  constructor() {
    if (!this.isBrowser) return;
    const mq = this.doc.defaultView!.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced.set(mq.matches);
    mq.addEventListener('change', (e) => this.reduced.set(e.matches));
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.callbacks.get(entry.target)?.();
          this.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
  }

  /** Ejecuta `cb` una sola vez cuando `el` entra en el viewport. */
  onEnter(el: Element, cb: () => void): void {
    if (!this.observer || this.reduced()) return cb();
    this.callbacks.set(el, cb);
    this.observer.observe(el);
  }

  unobserve(el: Element): void {
    this.observer?.unobserve(el);
    this.callbacks.delete(el);
  }
}
