import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../core/data/profile';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <p>© {{ year }} {{ profile.name }}</p>
        <div class="footer-links">
          <a [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a [href]="profile.github" target="_blank" rel="noopener">GitHub</a>
          <a [href]="profile.cv" target="_blank" rel="noopener">CV</a>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
