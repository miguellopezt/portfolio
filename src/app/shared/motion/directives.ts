import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from './motion.service';

/**
 * Revelado al hacer scroll. Variantes: '' (sube), 'left', 'right', 'scale', 'wipe'.
 * `revealIndex` escalona la entrada dentro de un grupo.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[attr.data-reveal]': 'variant() === "wipe" ? null : variant()',
    '[attr.data-wipe]': 'variant() === "wipe" ? "" : null',
  },
})
export class Reveal implements OnDestroy {
  readonly variant = input('', { alias: 'appReveal' });
  readonly revealIndex = input(0);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);
  private target: Element = this.el;

  constructor() {
    afterNextRender(() => {
      // --i solo en navegador: el DOM del prerender no soporta custom properties en bindings
      if (this.revealIndex()) this.el.style.setProperty('--i', String(this.revealIndex()));
      // Un elemento recortado al 100% (wipe) tiene área visible 0: se observa su contenedor
      this.target = this.variant() === 'wipe' ? (this.el.parentElement ?? this.el) : this.el;
      this.motion.onEnter(this.target, () => this.el.classList.add('in'));
    });
  }

  ngOnDestroy(): void {
    this.motion.unobserve(this.target);
  }
}

/** Brillo que sigue al puntero (variables --sx/--sy consumidas por `.spot`). */
@Directive({
  selector: '[appSpotlight]',
  host: { '(pointermove)': 'move($event)' },
})
export class Spotlight {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected move(e: PointerEvent): void {
    if (e.pointerType !== 'mouse') return;
    const r = this.el.getBoundingClientRect();
    this.el.style.setProperty('--sx', `${e.clientX - r.left}px`);
    this.el.style.setProperty('--sy', `${e.clientY - r.top}px`);
  }
}

/** Inclinación 3D sutil siguiendo el puntero (máx. `appTilt` grados). */
@Directive({
  selector: '[appTilt]',
  host: { '(pointermove)': 'move($event)', '(pointerleave)': 'reset()' },
})
export class Tilt {
  readonly max = input(5, { alias: 'appTilt' });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);

  protected move(e: PointerEvent): void {
    if (e.pointerType !== 'mouse' || this.motion.reduced()) return;
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const s = this.el.style;
    s.setProperty('--ry', `${((x - 0.5) * 2 * this.max()).toFixed(2)}deg`);
    s.setProperty('--rx', `${((0.5 - y) * 2 * this.max()).toFixed(2)}deg`);
    s.setProperty('--sx', `${(x * 100).toFixed(1)}%`);
    s.setProperty('--sy', `${(y * 100).toFixed(1)}%`);
  }

  protected reset(): void {
    this.el.style.setProperty('--rx', '0deg');
    this.el.style.setProperty('--ry', '0deg');
  }
}

/**
 * Contador animado. Respeta el formato del texto original ('70K+', '0,992', '<50 ms', '3.109'):
 * anima solo la parte numérica y conserva prefijos, sufijos y separadores.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly value = input.required<string>({ alias: 'appCountUp' });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);

  constructor() {
    afterNextRender(() => {
      const m = this.value().match(/^(\D*?)(\d[\d.,]*)(.*)$/);
      if (!m) return;
      const [, pre, num, post] = m;
      const decimals = num.includes(',') ? num.split(',')[1].length : 0;
      const thousands = !decimals && num.includes('.');
      const target = parseFloat(num.replace(/\./g, '').replace(',', '.'));
      if (!isFinite(target)) return;
      const fmt = (v: number) => {
        let s = v.toFixed(decimals).replace('.', ',');
        if (thousands) s = Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return pre + s + post;
      };
      if (this.motion.reduced()) return;
      this.el.textContent = fmt(0);
      this.motion.onEnter(this.el, () => {
        const t0 = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          this.el.textContent = fmt(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else this.el.textContent = this.value();
        };
        requestAnimationFrame(tick);
      });
    });
  }
}

export const MOTION = [Reveal, Spotlight, Tilt, CountUp] as const;
