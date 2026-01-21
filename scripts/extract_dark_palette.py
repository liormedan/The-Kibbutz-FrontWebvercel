"""
Extract exact Dark mode colors from design PNGs.
"""

from pathlib import Path
from PIL import Image
import sys
sys.path.insert(0, str(Path(__file__).parent))
from extract_exact_palette import extract_flat_region_mode, extract_saturated_mode

def main():
    root = Path("colors") / "The Kibbutz Page light and dark" / "The Kibbutz Page"
    dark_imgs = [p for p in root.rglob("*.png") if "Dark mode" in p.name]
    dark_imgs = sorted(dark_imgs)

    print("# Exact palette extraction (Dark Mode)\n")
    print(f"Found {len(dark_imgs)} dark PNGs.\n")

    for p in dark_imgs:
        img = Image.open(p)
        flat = extract_flat_region_mode(img, block=10, sample_step=2)
        sat = extract_saturated_mode(img)

        print(f"## {p.as_posix()}\n")
        print("### Flat-region exact colors (top)\n")
        for c, n in flat[:10]:
            print(f"- `{c.hex()}` ק {n}")
        if not flat:
            print("- (none)")
        print("\n### Saturated exact colors (top)\n")
        for c, n in sat[:10]:
            print(f"- `{c.hex()}` ק {n}")
        if not sat:
            print("- (none)")
        print()

if __name__ == "__main__":
    main()

