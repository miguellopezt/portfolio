import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild, viewChildren,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { PROFILE } from '../core/data/profile';
import { Icon } from '../shared/icon/icon';

export const NAV_SECTIONS = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'stack', label: 'Stack' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'contacto', label: 'Contacto' },
] as const;

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <div class="progress" aria-hidden="true"></div>
    <header class="nav" [class.is-scrolled]="scrolled()" [class.is-hidden]="hidden()" [class.is-open]="open()">
      <nav class="container" aria-label="Principal">
        <a class="brand" routerLink="/" (click)="open.set(false)" aria-label="Inicio">
          <span class="brand-mark">{{ profile.initials }}</span>
          <span class="brand-name">{{ profile.shortName }}</span>
        </a>
        <ul class="nav-links" #list>
          <li class="nav-indicator" #indicator aria-hidden="true"></li>
          @for (s of sections; track s.id) {
            <li>
              <a #link routerLink="/" [fragment]="s.id" [class.is-active]="active() === s.id"
                [attr.aria-current]="active() === s.id ? 'location' : null" (click)="open.set(false)">{{ s.label }}</a>
            </li>
          }
        </ul>
        <div class="nav-cta">
          <a class="btn btn-ghost btn-sm" [href]="profile.cv" target="_blank" rel="noopener">
            <app-icon name="file" /> CV
          </a>
          <button class="menu-btn" type="button" (click)="open.update((v) => !v)"
            [attr.aria-expanded]="open()" aria-label="Menú"><span></span></button>
        </div>
      </nav>
    </header>
  `,
})
export class Nav {
  protected readonly profile = PROFILE;
  protected readonly sections = NAV_SECTIONS;
  protected readonly scrolled = signal(false);
  protected readonly hidden = signal(false);
  protected readonly open = signal(false);
  protected readonly active = signal<string | null>(null);

  private readonly links = viewChildren<ElementRef<HTMLAnchorElement>>('link');
  private readonly indicator = viewChild.required<ElementRef<HTMLElement>>('indicator');
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const root = document.documentElement;
      let lastY = window.scrollY;
      let ticking = false;
      const update = () => {
        ticking = false;
        const y = window.scrollY;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0');
        this.scrolled.set(y > 24);
        if (!this.open()) this.hidden.set(y > lastY && y > 400);
        lastY = y;
      };
      const onScroll = () => {
        if (!ticking) requestAnimationFrame(update);
        ticking = true;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      update();

      // Sección activa
      let io: IntersectionObserver | undefined;
      const watch = () => {
        io?.disconnect();
        this.active.set(null);
        this.moveIndicator();
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
            this.moveIndicator();
          },
          { rootMargin: '-45% 0px -50% 0px' },
        );
        for (const s of this.sections) {
          const el = document.getElementById(s.id);
          if (el) io.observe(el);
        }
      };
      watch();
      const sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
        this.open.set(false);
        setTimeout(watch);
      });
      window.addEventListener('resize', () => this.moveIndicator(), { passive: true });

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        io?.disconnect();
        sub.unsubscribe();
      });
    });
  }

  private moveIndicator(): void {
    const ind = this.indicator().nativeElement;
    const i = this.sections.findIndex((s) => s.id === this.active());
    const link = this.links()[i]?.nativeElement;
    if (!link) {
      ind.style.opacity = '0';
      return;
    }
    ind.style.opacity = '1';
    ind.style.width = `${link.offsetWidth}px`;
    ind.style.transform = `translateX(${link.offsetLeft}px)`;
  }
}
