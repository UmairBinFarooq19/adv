#!/usr/bin/env python3
"""Generate scenic, themed SVG placeholders for AdventuresKashmir.
Layered Himalayan ridgelines + snow caps + optional lake/stars, tuned per theme
so each 'photo' reads as a real place, not a gray box. Deterministic per seed."""
import math, os, random

W, H = 1200, 800
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

# theme -> sky stops, ridge base color, has_lake, has_stars, sun color/pos
THEMES = {
    "dawn":    dict(sky=["#F6C88B", "#E88B6A", "#4A3A5A"], ridge="#2A2438", lake=False, stars=False, sun="#FFE9C2", sunpos=(0.72, 0.30)),
    "glacier": dict(sky=["#DDEBF2", "#9FC4D6", "#4A7C8C"], ridge="#22414C", lake=True,  stars=False, sun="#F4FBFF", sunpos=(0.28, 0.24)),
    "forest":  dict(sky=["#E7EFE4", "#A9C6AE", "#3E6B57"], ridge="#173E32", lake=False, stars=False, sun="#F3FBEF", sunpos=(0.30, 0.26)),
    "snow":    dict(sky=["#EAF2F8", "#CBDDEA", "#8FB0C6"], ridge="#4A6076", lake=False, stars=False, sun="#FFFFFF", sunpos=(0.70, 0.22)),
    "dusk":    dict(sky=["#3A4A78", "#5B4A78", "#241A34"], ridge="#171426", lake=True,  stars=True,  sun="#DCC8FF", sunpos=(0.22, 0.28)),
    "meadow":  dict(sky=["#F3E6C8", "#CDE0A8", "#6E9A5A"], ridge="#3C5A2E", lake=False, stars=False, sun="#FFF4D6", sunpos=(0.74, 0.28)),
}


def ridge(seed, y_base, amp, jag, n=14):
    """Return an SVG path string for a mountain ridgeline across the width."""
    rnd = random.Random(seed)
    pts = []
    for i in range(n + 1):
        x = W * i / n
        y = y_base + math.sin(i * jag + seed) * amp * 0.4 + rnd.uniform(-amp, amp)
        pts.append((x, y))
    d = f"M0,{H} L0,{pts[0][1]:.1f} "
    for (x, y) in pts:
        d += f"L{x:.1f},{y:.1f} "
    d += f"L{W},{H} Z"
    return d, pts


def snowcaps(pts, drop=60):
    """White caps sitting on the peaks of a ridgeline."""
    caps = ""
    for (x, y) in pts:
        if y < H * 0.55:  # only cap higher peaks
            w = 42
            caps += (
                f'<path d="M{x-w:.0f},{y+drop:.0f} '
                f'Q{x-w*0.4:.0f},{y+6:.0f} {x:.0f},{y:.0f} '
                f'Q{x+w*0.4:.0f},{y+6:.0f} {x+w:.0f},{y+drop:.0f} '
                f'Q{x:.0f},{y+drop*0.5:.0f} {x-w:.0f},{y+drop:.0f} Z" '
                f'fill="#F7FAFC" opacity="0.9"/>'
            )
    return caps


def hexa(c, a):
    return f"{c}{int(a*255):02x}"


def scene(name, theme, seed):
    t = THEMES[theme]
    s = t["sky"]
    sx, sy = t["sunpos"]
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">']
    parts.append(
        f'<defs><linearGradient id="sky{seed}" x1="0" y1="0" x2="0" y2="1">'
        f'<stop offset="0%" stop-color="{s[0]}"/><stop offset="55%" stop-color="{s[1]}"/>'
        f'<stop offset="100%" stop-color="{s[2]}"/></linearGradient>'
        f'<radialGradient id="sun{seed}" cx="50%" cy="50%" r="50%">'
        f'<stop offset="0%" stop-color="{hexa(t["sun"],0.95)}"/>'
        f'<stop offset="100%" stop-color="{hexa(t["sun"],0)}"/></radialGradient></defs>'
    )
    parts.append(f'<rect width="{W}" height="{H}" fill="url(#sky{seed})"/>')

    if t["stars"]:
        rnd = random.Random(seed * 7)
        for _ in range(60):
            x, y = rnd.uniform(0, W), rnd.uniform(0, H * 0.5)
            r = rnd.uniform(0.5, 1.6)
            parts.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r:.1f}" fill="#fff" opacity="{rnd.uniform(0.3,0.9):.2f}"/>')

    # sun / moon glow
    parts.append(f'<circle cx="{sx*W:.0f}" cy="{sy*H:.0f}" r="230" fill="url(#sun{seed})"/>')
    parts.append(f'<circle cx="{sx*W:.0f}" cy="{sy*H:.0f}" r="46" fill="{hexa(t["sun"],0.9)}"/>')

    # three layered ridgelines, back (lighter/hazy) to front (dark)
    layers = [
        (0.52, 70, 0.7, 0.35),
        (0.66, 90, 1.1, 0.6),
        (0.80, 80, 1.6, 1.0),
    ]
    base = t["ridge"]
    for i, (yb, amp, jag, op) in enumerate(layers):
        d, pts = ridge(seed + i * 3, H * yb, amp, jag)
        parts.append(f'<path d="{d}" fill="{base}" opacity="{op:.2f}"/>')
        if i >= 1:
            parts.append(snowcaps(pts))

    # lake reflection band
    if t["lake"]:
        parts.append(f'<rect x="0" y="{H*0.86:.0f}" width="{W}" height="{H*0.14:.0f}" fill="{hexa(s[2],0.55)}"/>')
        parts.append(f'<rect x="0" y="{H*0.86:.0f}" width="{W}" height="2" fill="#ffffff" opacity="0.25"/>')

    # soft vignette for depth
    parts.append(f'<rect width="{W}" height="{H}" fill="#0C1A15" opacity="0.05"/>')
    parts.append("</svg>")
    with open(os.path.join(OUT, name), "w") as f:
        f.write("".join(parts))


# ── Generate the full image set the Home page needs ──────────────────────────
jobs = [
    # hero slides
    ("hero-1.svg", "dawn", 11), ("hero-2.svg", "glacier", 23), ("hero-3.svg", "snow", 37),
    # featured packages
    ("pkg-gulmarg.svg", "snow", 41), ("pkg-sonamarg.svg", "glacier", 43), ("pkg-pahalgam.svg", "forest", 47),
    # skiing banner
    ("ski-banner.svg", "snow", 53),
    # destinations
    ("dest-gulmarg.svg", "snow", 61), ("dest-srinagar.svg", "glacier", 67), ("dest-pahalgam.svg", "forest", 71),
    ("dest-sonamarg.svg", "glacier", 73), ("dest-doodhpathri.svg", "meadow", 79), ("dest-leh.svg", "dusk", 83),
    # blogs
    ("blog-1.svg", "dawn", 91), ("blog-2.svg", "forest", 97), ("blog-3.svg", "dusk", 101),
    # instagram (mixed)
    ("ig-1.svg", "glacier", 103), ("ig-2.svg", "meadow", 107), ("ig-3.svg", "snow", 109),
    ("ig-4.svg", "dawn", 113), ("ig-5.svg", "dusk", 127), ("ig-6.svg", "forest", 131),
    # contact background
    ("contact-bg.svg", "dusk", 137),
]
for name, theme, seed in jobs:
    scene(name, theme, seed)
print(f"generated {len(jobs)} SVG placeholders into {OUT}")
