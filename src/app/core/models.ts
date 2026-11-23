import type { ImageName } from './data/image-manifest';
import type { IconName } from '../shared/icon/icons';

export interface Kpi {
  readonly value: string;
  readonly label: string;
}

export interface ProjectImage {
  readonly name: ImageName;
  readonly alt: string;
  readonly caption?: string;
}

export interface ProjectLink {
  readonly label: string;
  readonly url: string;
  readonly kind: 'live' | 'repo' | 'story';
}

export interface Step {
  readonly title: string;
  readonly text: string;
}

export interface Layer {
  readonly name: string;
  readonly items: readonly string[];
}

export type ProjectStatus = 'Producción' | 'En servicio' | 'TFG' | 'Académico';

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly kicker: string;
  readonly status: ProjectStatus;
  readonly icon: IconName;
  readonly featured: boolean;
  /** Resumen corto (tarjetas y meta description). */
  readonly summary: string;
  /** Párrafos de la tarjeta destacada en la home (admite <strong>). */
  readonly highlights: readonly string[];
  readonly kpis: readonly Kpi[];
  readonly tags: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly images: readonly ProjectImage[];
  /** Caso de estudio */
  readonly context: readonly string[];
  readonly approach: readonly Step[];
  readonly architecture?: readonly Layer[];
  readonly results: readonly string[];
}

export interface Domain {
  readonly title: string;
  readonly text: string;
  readonly icon: IconName;
}

export interface StackGroup {
  readonly title: string;
  readonly code: string;
  readonly items: readonly { readonly name: string; readonly devicon?: string; readonly icon?: IconName }[];
}

export interface TimelineItem {
  readonly date: string;
  readonly title: string;
  readonly org: string;
  readonly text: string;
  readonly chips?: readonly string[];
}
