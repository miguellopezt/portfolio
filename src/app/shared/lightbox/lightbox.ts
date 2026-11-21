import {
  ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, Injectable, computed, effect, inject, signal, viewChild,
} from '@angular/core';
import type { ProjectImage } from '../../core/models';
import { Icon } from '../icon/icon';
import { fullSrc } from '../picture/picture';

/** Estado global del visor de imágenes. */
@Injectable({ providedIn: 'root' })
export class LightboxService {
  private readonly doc = inject(DOCUMENT);
  readonly images = signal<readonly ProjectImage[]>([]);
  readonly index = signal(0);
  readonly isOpen = signal(false);

  open(images: readonly ProjectImage[], index = 0): void {
    this.transition(() => {
      this.images.set(images);
      this.index.set(index);
      this.isOpen.set(true);
    });
  }

  close(): void {
    this.transition(() => this.isOpen.set(false));
  }

  step(delta: number): void {
    const n = this.images().length;
    if (n > 1) this.index.update((i) => (i + delta + n) % n);
  }

  /** Usa View Transitions si el navegador las soporta. */
  private transition(fn: () => void): void {
    const d = this.doc as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduced = d.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (d.startViewTransition && !reduced) d.startViewTransition(fn);
    else fn();
  }
}

@Component({
  selector: 'app-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <dialog #dlg class="lightbox" [class.single]="lb.images().length < 2" aria-label="Visor de imágenes"
      (close)="lb.isOpen() && lb.close()" (click)="backdrop($event)" (keydown)="key($event)">
      @if (current(); as img) {
        <figure class="lb-figure">
          <img [src]="src()" [alt]="img.alt" [class.swap]="true" #image />
          <figcaption class="lb-caption">
            <span class="lb-count">{{ lb.index() + 1 }} / {{ lb.images().length }}</span>
            <span>{{ img.caption ?? img.alt }}</span>
          </figcaption>
        </figure>
      }
      <button class="lb-btn lb-close" type="button" (click)="lb.close()" aria-label="Cerrar"><app-icon name="close" /></button>
      <button class="lb-btn lb-prev" type="button" (click)="lb.step(-1)" aria-label="Imagen anterior"><app-icon name="chevronLeft" /></button>
      <button class="lb-btn lb-next" type="button" (click)="lb.step(1)" aria-label="Imagen siguiente"><app-icon name="chevronRight" /></button>
    </dialog>
  `,
})
export class Lightbox {
  protected readonly lb = inject(LightboxService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');
  private readonly image = viewChild<ElementRef<HTMLImageElement>>('image');
  protected readonly current = computed(() => this.lb.images()[this.lb.index()]);
  protected readonly src = computed(() => (this.current() ? fullSrc(this.current()!.name) : ''));

  constructor() {
    effect(() => {
      const d = this.dialog().nativeElement;
      if (this.lb.isOpen() && !d.open) d.showModal();
      if (!this.lb.isOpen() && d.open) d.close();
    });
    // Reinicia la animación de cambio de imagen
    effect(() => {
      this.lb.index();
      const el = this.image()?.nativeElement;
      if (!el) return;
      el.classList.remove('swap');
      void el.offsetWidth;
      el.classList.add('swap');
    });
  }

  protected backdrop(e: MouseEvent): void {
    const t = e.target as HTMLElement;
    if (t === this.dialog().nativeElement || t.classList.contains('lb-figure')) this.lb.close();
  }

  protected key(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.lb.step(1);
    if (e.key === 'ArrowLeft') this.lb.step(-1);
  }
}
