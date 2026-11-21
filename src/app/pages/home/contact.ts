import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PROFILE } from '../../core/data/profile';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/motion/directives';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  template: `
    <section class="section" id="contacto" aria-labelledby="contacto-title">
      <div class="container">
        <div class="contact" appReveal="scale">
          <h2 id="contacto-title">Contacto</h2>
          <p>Busco prácticas en ingeniería de datos, GIS o Machine Learning. Si quieres hablar de un proyecto o una vacante, escríbeme.</p>
          <div class="contact-actions">
            <a class="btn" [href]="'mailto:' + p.email"><app-icon name="mail" /> Escríbeme</a>
            <button type="button" class="btn btn-ghost copy-btn" [class.is-copied]="copied()" (click)="copy()">
              <span class="idle"><app-icon name="copy" style="width: 16px; height: 16px; display: inline-grid; vertical-align: -3px" /> {{ p.email }}</span>
              <span class="ok"><app-icon name="check" style="width: 16px; height: 16px; display: inline-grid; vertical-align: -3px" /> Copiado</span>
            </button>
          </div>
          <div class="contact-actions" style="margin-top: 0.75rem">
            <a class="btn btn-ghost btn-sm" [href]="p.linkedin" target="_blank" rel="noopener"><app-icon name="linkedin" /> LinkedIn</a>
            <a class="btn btn-ghost btn-sm" [href]="p.github" target="_blank" rel="noopener"><app-icon name="github" /> GitHub</a>
            <a class="btn btn-ghost btn-sm" [href]="p.cv" target="_blank" rel="noopener"><app-icon name="file" /> Descargar CV</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly p = PROFILE;
  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.p.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      location.href = `mailto:${this.p.email}`;
    }
  }
}
