// Generado por scripts/optimize_images.py — no editar a mano.
export interface ImageMeta { readonly w: number; readonly h: number; readonly widths: readonly number[]; }

export const IMAGE_MANIFEST = {
  'agro-murcia': { w: 3200, h: 1545, widths: [480, 960, 1600] },
  'aire-1': { w: 1918, h: 1078, widths: [480, 960, 1600] },
  'aire-2': { w: 1919, h: 1055, widths: [480, 960, 1600] },
  'aire-3': { w: 1919, h: 1051, widths: [480, 960, 1600] },
  'avatar': { w: 1024, h: 1024, widths: [192, 384, 640] },
  'gradientestate-0': { w: 1920, h: 1080, widths: [480, 960, 1600] },
  'gradientestate-1': { w: 1919, h: 1079, widths: [480, 960, 1600] },
  'gradientestate-2': { w: 1300, h: 1056, widths: [480, 960] },
  'gradientestate-3': { w: 1337, h: 1075, widths: [480, 960] },
  'migracion-eeuu': { w: 3200, h: 1344, widths: [480, 960, 1600] },
  'parking-madrid': { w: 2362, h: 2362, widths: [480, 960, 1600] },
  'pnoa-1': { w: 512, h: 512, widths: [480] },
  'pnoa-2': { w: 512, h: 512, widths: [480] },
  'pnoa-3': { w: 512, h: 512, widths: [480] },
} as const satisfies Record<string, ImageMeta>;

export type ImageName = keyof typeof IMAGE_MANIFEST;
