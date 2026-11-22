import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE } from '../../core/data/profile';
import { SeoService, personLd } from '../../core/seo.service';
import { About } from './about';
import { Contact } from './contact';
import { Hero } from './hero';
import { Journey } from './journey';
import { Projects } from './projects';
import { Stack } from './stack';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, About, Projects, Stack, Journey, Contact],
  template: `
    <app-hero />
    <app-about />
    <app-projects />
    <app-stack />
    <app-journey />
    <app-contact />
  `,
})
export class Home {
  constructor() {
    inject(SeoService).set({
      title: `${PROFILE.name} · Datos geoespaciales y Machine Learning`,
      description: PROFILE.description,
      path: '',
      type: 'profile',
      jsonLd: personLd(),
    });
  }
}
