#!/usr/bin/env python3
"""
Image Optimizer — reduces all PNG images in a directory to ≤512KB.
Strategies (in order):
  1. Quantize to 256 colors (PNG8) — keeps dimensions, ~60-80% reduction
  2. Downscale max dimension to 800px — if still >512KB
  3. Downscale further to 600px — if still >512KB
  4. Save as JPEG quality 85 — last resort

Usage:
  python optimize_images.py <directory> [--max-size 512] [--skip-thumbnails]
  python optimize_images.py --download-logo   # download + optimize nutrichat logo
"""

import os, sys, glob, urllib.request
from PIL import Image

LOGO_URL = "https://bmitech.ru/assets/images/logos/nutrichat.png"
LOGO_DEST = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "www", "dev.healora.ru", "public", "images", "nutrichat.png")

def download_logo():
    print(f"Downloading logo from {LOGO_URL}...")
    os.makedirs(os.path.dirname(LOGO_DEST), exist_ok=True)
    urllib.request.urlretrieve(LOGO_URL, LOGO_DEST)
    sz = os.path.getsize(LOGO_DEST)
    print(f"Downloaded {LOGO_DEST} ({sz/1024:.1f}K)")
    res = optimize_file(LOGO_DEST)
    if res:
        print(f"  → {human_size(res['original'])} → {human_size(res['final'])} ({res['method']})")
    else:
        print("  already ≤512KB")

MAX_KB = 512
MAX_BYTES = MAX_KB * 1024

def human_size(b):
    if b < 1024:
        return f"{b}B"
    kb = b / 1024
    if kb < 1024:
        return f"{kb:.1f}K"
    return f"{kb/1024:.1f}M"

def optimize_file(filepath, dry_run=False):
    original_size = os.path.getsize(filepath)
    if original_size <= MAX_BYTES:
        return None  # already fine

    img = Image.open(filepath).convert("RGB")
    w, h = img.size
    name = os.path.basename(filepath)

    # Strategy 1: Quantize to PNG8 palette
    img_q = img.quantize(256, method=Image.Quantize.MEDIANCUT)
    temp_png = filepath + ".tmp.png"
    img_q.save(temp_png, "PNG")
    sz = os.path.getsize(temp_png)

    # Strategy 2-4: progressive downscale + lossy if needed
    scales = [800, 600, 500, 400]
    scale_idx = 0

    while sz > MAX_BYTES and scale_idx < len(scales):
        max_dim = scales[scale_idx]
        scale_idx += 1
        nw, nh = w, h
        if max(nw, nh) > max_dim:
            ratio = max_dim / max(nw, nh)
            nw, nh = int(nw * ratio), int(nh * ratio)

        # Try quantized
        resized = img.resize((nw, nh), Image.LANCZOS)
        resized_q = resized.quantize(256, method=Image.Quantize.MEDIANCUT)
        resized_q.save(temp_png, "PNG")
        sz = os.path.getsize(temp_png)

    # Last resort: JPEG quality 85
    if sz > MAX_BYTES:
        nw, nh = 500, 500
        if w > 500 or h > 500:
            ratio = 500 / max(w, h)
            nw, nh = int(w * ratio), int(h * ratio)
        resized = img.resize((nw, nh), Image.LANCZOS)
        jpg_path = filepath.replace(".png", ".jpg")
        resized.save(jpg_path, "JPEG", quality=85, optimize=True)
        sz = os.path.getsize(jpg_path)
        os.remove(temp_png)
        os.remove(filepath)
        methods = f"quantize+scale({max_dim})" if scale_idx > 0 else "quantize"
        return {
            "file": name,
            "original": original_size,
            "final": sz,
            "method": f"JPEG q85 ({nw}x{nh})",
            "new_path": jpg_path,
        }

    # Success — replace with quantized version
    os.remove(temp_png)
    os.remove(filepath)
    img_q.save(filepath, "PNG", optimize=True)
    final_size = os.path.getsize(filepath)
    methods = f"quantize+scale({scales[scale_idx-1] if scale_idx > 0 else 'none'})"

    return {
        "file": name,
        "original": original_size,
        "final": final_size,
        "method": methods,
    }

def main():
    args = sys.argv[1:]
    if "--download-logo" in args:
        download_logo()
        return
    if not args:
        print("Usage: python optimize_images.py <directory> [--max-size 512] [--skip-thumbnails]")
        print("       python optimize_images.py --download-logo")
        sys.exit(1)

    target_dir = args[0]
    skip_thumbnails = "--skip-thumbnails" in args

    if not os.path.isdir(target_dir):
        print(f"Error: directory not found: {target_dir}")
        sys.exit(1)

    files = sorted(glob.glob(os.path.join(target_dir, "*.png")))
    if not files:
        print(f"No PNG files found in {target_dir}")
        sys.exit(0)

    results = []
    for f in files:
        # Skip if in a thumbnail subfolder
        if skip_thumbnails and ("32_32" in f or "150_150" in f):
            continue
        res = optimize_file(f)
        if res:
            results.append(res)

    print(f"\n{'='*60}")
    print(f"Optimized {len(results)} of {len(files)} files in {target_dir}")
    print(f"{'='*60}")
    if results:
        print(f"{'File':40s} {'Before':>10s} {'After':>10s} {'Method':30s}")
        print("-"*90)
        for r in results:
            print(f"{r['file']:40s} {human_size(r['original']):>10s} {human_size(r['final']):>10s} {r['method']:30s}")

if __name__ == "__main__":
    main()
