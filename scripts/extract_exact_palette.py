"""
Extract *exact* (no quantization) color palette from design PNGs.

Goal:
- Find exact RGB/HEX values that appear in large, flat UI regions (backgrounds, buttons, accents),
  avoiding photos/gradients as much as possible.

Heuristics:
- Sample pixels and group by "flatness" using local variance (via downscaled blocks).
- Also extract saturated accent colors (high chroma) as likely CTA colors.

Outputs:
- Prints a markdown-friendly report to stdout.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image


@dataclass(frozen=True)
class RGB:
    r: int
    g: int
    b: int

    def hex(self) -> str:
        return f"#{self.r:02X}{self.g:02X}{self.b:02X}"


def rgb_from_pixel(px) -> RGB:
    if isinstance(px, int):
        # L mode
        return RGB(px, px, px)
    if len(px) >= 3:
        return RGB(int(px[0]), int(px[1]), int(px[2]))
    raise ValueError(f"Unexpected pixel format: {px!r}")


def to_hsv(r: int, g: int, b: int):
    # Minimal HSV for saturation detection (0..1)
    rf, gf, bf = r / 255.0, g / 255.0, b / 255.0
    mx = max(rf, gf, bf)
    mn = min(rf, gf, bf)
    delta = mx - mn
    s = 0.0 if mx == 0 else (delta / mx)
    v = mx
    return s, v


def iter_pixels(img: Image.Image) -> Iterable[RGB]:
    rgba = img.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            yield RGB(r, g, b)


def most_common_exact(colors: Iterable[RGB], limit: int = 12):
    counts: dict[RGB, int] = {}
    for c in colors:
        counts[c] = counts.get(c, 0) + 1
    items = sorted(counts.items(), key=lambda kv: kv[1], reverse=True)
    return items[:limit]


def extract_flat_region_mode(img: Image.Image, block: int = 8, sample_step: int = 1):
    """
    Identify pixels belonging to flat regions by checking per-block color spread.
    Then return exact most-common colors among those pixels.
    """
    rgba = img.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()

    flat_pixels: list[RGB] = []
    for by in range(0, h, block):
        for bx in range(0, w, block):
            # compute min/max per channel inside block
            mins = [255, 255, 255]
            maxs = [0, 0, 0]
            has_opaque = False
            for y in range(by, min(by + block, h), sample_step):
                for x in range(bx, min(bx + block, w), sample_step):
                    r, g, b, a = px[x, y]
                    if a == 0:
                        continue
                    has_opaque = True
                    mins[0] = min(mins[0], r)
                    mins[1] = min(mins[1], g)
                    mins[2] = min(mins[2], b)
                    maxs[0] = max(maxs[0], r)
                    maxs[1] = max(maxs[1], g)
                    maxs[2] = max(maxs[2], b)
            if not has_opaque:
                continue

            spread = max(maxs[0] - mins[0], maxs[1] - mins[1], maxs[2] - mins[2])
            # "flat" threshold: allow minor antialiasing
            if spread <= 6:
                # add pixels from this block
                for y in range(by, min(by + block, h), sample_step):
                    for x in range(bx, min(bx + block, w), sample_step):
                        r, g, b, a = px[x, y]
                        if a == 0:
                            continue
                        flat_pixels.append(RGB(r, g, b))

    return most_common_exact(flat_pixels, limit=12)


def extract_saturated_mode(img: Image.Image):
    """
    Extract likely accent colors: high saturation and not too dark/light.
    """
    rgba = img.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()
    sat_pixels: list[RGB] = []
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            s, v = to_hsv(r, g, b)
            if s >= 0.35 and 0.20 <= v <= 0.95:
                sat_pixels.append(RGB(r, g, b))
    return most_common_exact(sat_pixels, limit=12)


def main():
    root = Path("colors") / "The Kibbutz Page light and dark" / "The Kibbutz Page"
    imgs = [p for p in root.rglob("*.png") if "Dark mode" not in p.name]
    imgs = sorted(imgs)

    print("# Exact palette extraction (Light)\n")
    print(f"Found {len(imgs)} light PNGs.\n")

    for p in imgs:
        img = Image.open(p)
        flat = extract_flat_region_mode(img, block=10, sample_step=2)
        sat = extract_saturated_mode(img)

        print(f"## {p.as_posix()}\n")
        print("### Flat-region exact colors (top)\n")
        for c, n in flat[:10]:
            print(f"- `{c.hex()}` — {n}")
        if not flat:
            print("- (none)")
        print("\n### Saturated exact colors (top)\n")
        for c, n in sat[:10]:
            print(f"- `{c.hex()}` — {n}")
        if not sat:
            print("- (none)")
        print()


if __name__ == "__main__":
    main()


