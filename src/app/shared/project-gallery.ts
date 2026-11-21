import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import type { ProjectImage } from '../core/models';
import { Icon } from './icon/icon';
import { LightboxService } from './lightbox/lightbox';
import { Reveal, Tilt } from './motion/directives';
import { Picture } from './picture/picture';

/** Imagen principal con inclinación 3D + miniaturas; abre el visor a pantalla completa. */
@Component({
  selector: 'app-project-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Picture, Icon, Tilt, Reveal],
  template: `
    <button type="button" class="media-main" [appTilt]="4" appReveal="wipe"
      (click)="lb.open(images(), selected())" [attr.aria-label]="'Ampliar: ' + current().alt">
      @for (img of images(); track img.name; let i = $index) {
        @if (i === selected()) {
          <app-picture [name]="img.name" [alt]="img.alt" [sizes]="sizes()" [priority]="priority()" />
        }
      }
      <span class="media-zoom"><app-icon name="expand" style="width: 13px; height: 13px" /> Ampliar</span>
    </button>
    @if (images().length > 1) {
      <div class="media-thumbs">
        @for (img of images(); track img.name; let i = $index) {
          <button type="button" (click)="selected.set(i)" (mouseenter)="selected.set(i)"
            [attr.aria-current]="i === selected()" [attr.aria-label]="'Ver ' + (img.caption ?? img.alt)">
            <app-picture [name]="img.name" alt="" sizes="160px" />
          </button>
        }
      </div>
    }
  `,
  host: { class: 'project-media' },
})
export class ProjectGallery {
  readonly images = input.required<readonly ProjectImage[]>();
  readonly sizes = input('(max-width: 900px) 100vw, 560px');
  readonly priority = input(false);
  protected readonly selected = signal(0);
  protected readonly current = computed(() => this.images()[this.selected()]);
  protected readonly lb = inject(LightboxService);
}
