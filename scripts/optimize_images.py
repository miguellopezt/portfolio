"""Genera variantes responsive (AVIF + WebP) de las imágenes originales.

Uso:
    python scripts/optimize_images.py

Lee los originales de `src-img/` y escribe en `public/img/`:
    <nombre>-<ancho>.avif / <nombre>-<ancho>.webp
y genera `src/app/core/data/image-manifest.ts` (dimensiones + anchos) para
que el componente <app-picture> construya srcset/sizes sin adivinar.
Nunca amplía: si el original es más pequeño que un ancho, ese ancho se omite.
Añadir una imagen nueva = soltarla en `src-img/` y relanzar el script.
"""
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src-img"
OUT = ROOT / "public" / "img"
MANIFEST = ROOT / "src" / "app" / "core" / "data" / "image-manifest.ts"

# Anchos por defecto y excepciones por imagen
DEFAULT_WIDTHS = (480, 960, 1600)
WIDTHS = {
    "avatar": (192, 384, 640),
}
QUALITY = {"webp": 78, "avif": 55}


def variants(name: str, img: Image.Image):
    widths = WIDTHS.get(name, DEFAULT_WIDTHS)
    usable = [w for w in widths if w <= img.width] or [img.width]
    for w in usable:
        h = round(img.height * w / img.width)
        yield w, img.resize((w, h), Image.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    Image.MAX_IMAGE_PIXELS = None
    manifest: dict[str, tuple[int, int, list[int]]] = {}
    for path in sorted(SRC.iterdir()):
        if path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        name = path.stem
        img = ImageOps.exif_transpose(Image.open(path))
        img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
        if name == "og-cover":  # imagen para redes sociales: solo JPG 1200×630
            img.convert("RGB").save(OUT / "og-cover.jpg", "JPEG", quality=85, optimize=True)
            continue
        widths: list[int] = []
        for w, im in variants(name, img):
            widths.append(w)
            for fmt, q in QUALITY.items():
                dst = OUT / f"{name}-{w}.{fmt}"
                im.save(dst, fmt.upper(), quality=q, method=6) if fmt == "webp" else im.save(dst, fmt.upper(), quality=q)
                print(f"{dst.relative_to(ROOT)}  {dst.stat().st_size // 1024} KB")
        manifest[name] = (img.width, img.height, widths)

    write_manifest(manifest)


def write_manifest(manifest) -> None:
    lines = [
        "// Generado por scripts/optimize_images.py — no editar a mano.",
        "export interface ImageMeta { readonly w: number; readonly h: number; readonly widths: readonly number[]; }",
        "",
        "export const IMAGE_MANIFEST = {",
    ]
    for name, (w, h, widths) in sorted(manifest.items()):
        lines.append(f"  '{name}': {{ w: {w}, h: {h}, widths: [{', '.join(map(str, widths))}] }},")
    lines += ["} as const satisfies Record<string, ImageMeta>;", "", "export type ImageName = keyof typeof IMAGE_MANIFEST;", ""]
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text("\n".join(lines), encoding="utf-8")
    print(f"manifest → {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
