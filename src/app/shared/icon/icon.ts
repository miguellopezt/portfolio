import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICONS, IconName } from './icons';

type Shape = { tag: string; a: Record<string, string> };

/** Convierte el marcado del icono en formas tipadas (una sola vez por icono). */
const cache = new Map<IconName, Shape[]>();
function shapes(name: IconName): Shape[] {
  let s = cache.get(name);
  if (!s) {
    s = [...ICONS[name].matchAll(/<(\w+)([^>]*?)\/?>/g)].map(([, tag, attrs]) => ({
      tag,
      a: Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, k, v]) => [k, v])),
    }));
    cache.set(name, s);
  }
  return s;
}

/**
 * Icono SVG inline renderizado estructuralmente (compatible con el prerender y sin
 * saltarse el saneado de Angular). Decorativo por defecto; pasa `label` para hacerlo accesible.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon',
    '[attr.aria-hidden]': 'label() ? null : "true"',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() ?? null',
  },
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="stroke()" stroke-linecap="round" stroke-linejoin="round">
      @for (s of shapes(); track $index) {
        @switch (s.tag) {
          @case ('path') { <svg:path [attr.d]="s.a['d']" /> }
          @case ('circle') { <svg:circle [attr.cx]="s.a['cx']" [attr.cy]="s.a['cy']" [attr.r]="s.a['r']" /> }
          @case ('ellipse') { <svg:ellipse [attr.cx]="s.a['cx']" [attr.cy]="s.a['cy']" [attr.rx]="s.a['rx']" [attr.ry]="s.a['ry']" /> }
          @case ('rect') {
            <svg:rect [attr.x]="s.a['x'] ?? null" [attr.y]="s.a['y'] ?? null" [attr.width]="s.a['width']"
              [attr.height]="s.a['height']" [attr.rx]="s.a['rx'] ?? null" />
          }
          @case ('line') { <svg:line [attr.x1]="s.a['x1']" [attr.y1]="s.a['y1']" [attr.x2]="s.a['x2']" [attr.y2]="s.a['y2']" /> }
          @case ('polyline') { <svg:polyline [attr.points]="s.a['points']" /> }
          @case ('polygon') { <svg:polygon [attr.points]="s.a['points']" /> }
        }
      }
    </svg>
  `,
  styles: `:host { display: inline-grid; place-items: center; } svg { width: 100%; height: 100%; }`,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly label = input<string>();
  readonly stroke = input(1.75);
  protected readonly shapes = computed(() => shapes(this.name()));
}
