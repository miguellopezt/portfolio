import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IMAGE_MANIFEST, ImageName } from '../../core/data/image-manifest';

const srcset = (name: string, widths: readonly number[], ext: string) =>
  widths.map((w) => `img/${name}-${w}.${ext} ${w}w`).join(', ');

/** URL de la variante más grande (para el lightbox). */
export const fullSrc = (name: ImageName) => {
  const { widths } = IMAGE_MANIFEST[name];
  return `img/${name}-${widths[widths.length - 1]}.webp`;
};

/** <picture> con AVIF + WebP, dimensiones intrínsecas (sin CLS) y carga diferida por defecto. */
@Component({
  selector: 'app-picture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <picture>
      <source type="image/avif" [attr.srcset]="avif()" [attr.sizes]="sizes()" />
      <img
        [src]="fallback()"
        [attr.srcset]="webp()"
        [attr.sizes]="sizes()"
        [alt]="alt()"
        [width]="meta().w"
        [height]="meta().h"
        [attr.loading]="priority() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="priority() ? 'high' : null"
        decoding="async"
      />
    </picture>
  `,
})
export class Picture {
  readonly name = input.required<ImageName>();
  readonly alt = input.required<string>();
  readonly sizes = input('100vw');
  readonly priority = input(false);

  protected readonly meta = computed(() => IMAGE_MANIFEST[this.name()]);
  protected readonly avif = computed(() => srcset(this.name(), this.meta().widths, 'avif'));
  protected readonly webp = computed(() => srcset(this.name(), this.meta().widths, 'webp'));
  protected readonly fallback = computed(() => {
    const w = this.meta().widths;
    return `img/${this.name()}-${w[Math.min(1, w.length - 1)]}.webp`;
  });
}
