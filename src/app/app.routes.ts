import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  {
    path: 'proyectos/:slug',
    loadComponent: () => import('./pages/project/project-page').then((m) => m.ProjectPage),
  },
  { path: '404', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
