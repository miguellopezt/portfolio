import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { MotionService } from '../shared/motion/motion.service';

/* ---------- Ruido Perlin 3D (Ken Perlin, "Improved Noise", 2002) ---------- */
const P = new Uint8Array(512);
{
  const p = Array.from({ length: 256 }, (_, i) => i);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255];
}
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + t * (b - a);
function grad(h: number, x: number, y: number, z: number) {
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
}
function noise3(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
  const u = fade(x), v = fade(y), w = fade(z);
  const A = P[X] + Y, AA = P[A] + Z, AB = P[A + 1] + Z, B = P[X + 1] + Y, BA = P[B] + Z, BB = P[B + 1] + Z;
  return lerp(
    lerp(lerp(grad(P[AA] & 15, x, y, z), grad(P[BA] & 15, x - 1, y, z), u),
      lerp(grad(P[AB] & 15, x, y - 1, z), grad(P[BB] & 15, x - 1, y - 1, z), u), v),
    lerp(lerp(grad(P[AA + 1] & 15, x, y, z - 1), grad(P[BA + 1] & 15, x - 1, y, z - 1), u),
      lerp(grad(P[AB + 1] & 15, x, y - 1, z - 1), grad(P[BB + 1] & 15, x - 1, y - 1, z - 1), u), v),
    w,
  );
}

/**
 * Fondo de isolíneas topográficas. Campo escalar = fBm de Perlin 3D (z = tiempo)
 * + una "colina" gaussiana bajo el cursor; las curvas se extraen con marching squares.
 * Se pausa fuera del hero, con la pestaña oculta y con movimiento reducido (frame estático).
 */
@Component({
  selector: 'app-topo-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #c id="topo" aria-hidden="true"></canvas>`,
  host: { style: 'display: contents' },
})
export class TopoBackground {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('c');
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const win = window;
    const root = document.documentElement;

    const LEVELS = 14;
    const MAJOR_EVERY = 5;
    let W = 0, H = 0, cols = 0, rows = 0, cell = 16, dpr = 1;
    let field = new Float32Array(0);
    let raf = 0, last = 0, t = Math.random() * 100;
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, s: 0, ts: 0 };

    const resize = () => {
      dpr = Math.min(win.devicePixelRatio || 1, 1.5);
      W = win.innerWidth; H = win.innerHeight;
      cell = W < 700 ? 20 : 15;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      cols = Math.ceil(W / cell) + 2; rows = Math.ceil(H / cell) + 2;
      field = new Float32Array(cols * rows);
      draw();
    };

    const sample = () => {
      const sc = 0.0024;
      const r2 = 160 * 160;
      for (let j = 0; j < rows; j++) {
        const y = j * cell;
        for (let i = 0; i < cols; i++) {
          const x = i * cell;
          let v = noise3(x * sc, y * sc, t) * 0.75 + noise3(x * sc * 2.1, y * sc * 2.1, t * 1.3 + 9) * 0.25;
          if (mouse.s > 0.001) {
            const dx = x - mouse.x, dy = y - mouse.y;
            v += 0.42 * mouse.s * Math.exp(-(dx * dx + dy * dy) / (2 * r2));
          }
          field[j * cols + i] = v;
        }
      }
    };

    // Interpolación lineal sobre la arista de la celda
    const ip = (a: number, b: number, lv: number) => (a === b ? 0.5 : (lv - a) / (b - a));

    const contour = (lv: number) => {
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i], b = field[j * cols + i + 1];
          const c = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
          const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          const x = i * cell, y = j * cell;
          const top = () => [x + cell * ip(a, b, lv), y] as const;
          const right = () => [x + cell, y + cell * ip(b, c, lv)] as const;
          const bottom = () => [x + cell * ip(d, c, lv), y + cell] as const;
          const left = () => [x, y + cell * ip(a, d, lv)] as const;
          const seg = (p: readonly [number, number], q: readonly [number, number]) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
          switch (idx) {
            case 1: case 14: seg(left(), bottom()); break;
            case 2: case 13: seg(bottom(), right()); break;
            case 3: case 12: seg(left(), right()); break;
            case 4: case 11: seg(top(), right()); break;
            case 6: case 9: seg(top(), bottom()); break;
            case 7: case 8: seg(left(), top()); break;
            case 5: seg(left(), top()); seg(bottom(), right()); break;
            case 10: seg(top(), right()); seg(left(), bottom()); break;
          }
        }
      }
    };

    function draw() {
      sample();
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      ctx!.lineJoin = 'round';
      for (let k = 0; k < LEVELS; k++) {
        const lv = -0.55 + (k / (LEVELS - 1)) * 1.25;
        const major = k % MAJOR_EVERY === 0;
        ctx!.beginPath();
        contour(lv);
        const h = k / (LEVELS - 1); // más brillo en cotas altas
        ctx!.strokeStyle = `rgba(94, 234, 212, ${(major ? 0.2 : 0.075) + h * 0.12})`;
        ctx!.lineWidth = major ? 1.15 : 0.7;
        ctx!.stroke();
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / 30) return; // ~30 fps es suficiente para un fondo
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (win.scrollY > H * 1.2 || document.hidden) return;
      t += dt * 0.045;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      mouse.s += (mouse.ts - mouse.s) * 0.05;
      draw();
    };

    const onScroll = () => {
      const k = Math.min(1, win.scrollY / (H * 0.9));
      root.style.setProperty('--topo-opacity', (1 - k * 0.7).toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouse.tx = e.clientX; mouse.ty = e.clientY; mouse.ts = 1;
      if (mouse.x < -1e3) { mouse.x = e.clientX; mouse.y = e.clientY; }
    };
    const onLeave = () => (mouse.ts = 0);

    resize();
    onScroll();
    win.addEventListener('resize', resize, { passive: true });
    win.addEventListener('scroll', onScroll, { passive: true });
    if (!this.motion.reduced()) {
      win.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(loop);
    }

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(raf);
      win.removeEventListener('resize', resize);
      win.removeEventListener('scroll', onScroll);
      win.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    });
  }
}
