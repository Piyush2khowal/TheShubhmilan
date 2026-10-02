/**
 * Programmatic SVG "design preview" generator.
 *
 * SHUBHPATRA needs dozens of visually distinct catalogue thumbnails per
 * subcategory without shipping hundreds of raster images. Every design is
 * instead rendered as a small, deterministic SVG built from a seed string
 * (the product id) — same id always produces the same artwork, different
 * ids fan out across layouts, borders, motifs and palettes.
 *
 * The result stays lightweight (a few hundred bytes of markup per design,
 * generated on demand — nothing is fetched or bundled as an asset) while
 * still reading as a real invitation-style preview: framed, bordered,
 * ornamented and set with placeholder calligraphy lines.
 */

/** Simple string hash → 32-bit int, used to seed the PRNG. */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Mulberry32 — tiny, fast, deterministic PRNG. */
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** SHUBHPATRA palette — cream/beige/sand/taupe/cocoa/espresso + muted gold + maroon accent. */
const PALETTES = [
  {
    bg: "#FBF6EC",
    bg2: "#F1E2C4",
    ink: "#4A3018",
    gold: "#B8863C",
    accent: "#7A2430",
    name: "Ivory & Gold",
  },
  {
    bg: "#F6ECDD",
    bg2: "#E7D3AC",
    ink: "#3E2A1A",
    gold: "#C79A52",
    accent: "#6B4A2C",
    name: "Beige Warmth",
  },
  {
    bg: "#F0E4CC",
    bg2: "#D8BB88",
    ink: "#3E2A1A",
    gold: "#AD7C3E",
    accent: "#5B3D22",
    name: "Sand & Cocoa",
  },
  {
    bg: "#EFE6D3",
    bg2: "#C9A874",
    ink: "#33210F",
    gold: "#B8863C",
    accent: "#7A1F2B",
    name: "Taupe Maroon",
  },
  {
    bg: "#F8F1E4",
    bg2: "#E2CDA0",
    ink: "#4A3018",
    gold: "#CBA45C",
    accent: "#8B6A45",
    name: "Cream Cocoa",
  },
  {
    bg: "#F3E7D6",
    bg2: "#DEC79B",
    ink: "#2F2013",
    gold: "#B8863C",
    accent: "#6B4A2C",
    name: "Espresso Gold",
  },
  {
    bg: "#FBF3E7",
    bg2: "#EAD6B0",
    ink: "#3E2A1A",
    gold: "#C79A52",
    accent: "#7A2430",
    name: "Ivory Maroon",
  },
  {
    bg: "#F4E9D8",
    bg2: "#D2B486",
    ink: "#33210F",
    gold: "#AD7C3E",
    accent: "#5B3D22",
    name: "Muted Gold",
  },
] as const;

const LAYOUTS = [
  "arch-centered",
  "bordered-frame",
  "jaali-lattice",
  "minimal-line",
  "floral-corner",
  "geometric-diamond",
] as const;

const BORDERS = ["double-rule", "dotted", "ornate-corner", "scalloped", "none"] as const;

const MOTIFS = ["floral-sprig", "paisley", "mandala-ring", "leaf-vine", "sun-arcs"] as const;

export interface DesignStyle {
  paletteName: string;
  layout: (typeof LAYOUTS)[number];
  border: (typeof BORDERS)[number];
  motif: (typeof MOTIFS)[number];
}

function motifPaths(
  motif: (typeof MOTIFS)[number],
  cx: number,
  cy: number,
  scale: number,
  gold: string,
) {
  const s = scale;
  switch (motif) {
    case "floral-sprig":
      return `
        <path d="M${cx} ${cy}c-${10 * s} -${18 * s} -${28 * s} -${22 * s} -${40 * s} -${14 * s}
                 c${10 * s} -${2 * s} ${18 * s} ${2 * s} ${22 * s} ${10 * s}
                 c${4 * s} -${10 * s} ${14 * s} -${16 * s} ${26 * s} -${16 * s}
                 c-${6 * s} ${10 * s} -${6 * s} ${22 * s} ${2 * s} ${30 * s}"
              fill="none" stroke="${gold}" stroke-width="1.1" stroke-linecap="round" />
        <circle cx="${cx}" cy="${cy}" r="${2.4 * s}" fill="${gold}" />`;
    case "paisley":
      return `
        <path d="M${cx} ${cy - 16 * s}
                 c${14 * s} 0 ${22 * s} ${10 * s} ${18 * s} ${22 * s}
                 c-${3 * s} ${9 * s} -${13 * s} ${13 * s} -${21 * s} ${9 * s}
                 c-${9 * s} -${4 * s} -${12 * s} -${14 * s} -${4 * s} -${20 * s}
                 c${5 * s} -${4 * s} ${3 * s} -${10 * s} -${7 * s} -${11 * s}z"
              fill="none" stroke="${gold}" stroke-width="1.1" />`;
    case "mandala-ring":
      return (
        Array.from({ length: 8 })
          .map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x = cx + Math.cos(a) * 14 * s;
            const y = cy + Math.sin(a) * 14 * s;
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${2 * s}" fill="none" stroke="${gold}" stroke-width="1" />`;
          })
          .join("") +
        `<circle cx="${cx}" cy="${cy}" r="${5 * s}" fill="none" stroke="${gold}" stroke-width="1" />`
      );
    case "leaf-vine":
      return `
        <path d="M${cx - 30 * s} ${cy} q${15 * s} -${14 * s} ${30 * s} 0 t${30 * s} 0"
              fill="none" stroke="${gold}" stroke-width="1" stroke-linecap="round" />
        <ellipse cx="${cx - 15 * s}" cy="${cy - 6 * s}" rx="${4 * s}" ry="${2 * s}" fill="${gold}" opacity="0.85" />
        <ellipse cx="${cx + 15 * s}" cy="${cy - 6 * s}" rx="${4 * s}" ry="${2 * s}" fill="${gold}" opacity="0.85" />`;
    case "sun-arcs":
    default:
      return Array.from({ length: 5 })
        .map(
          (_, i) =>
            `<path d="M${cx - 20 * s + i * 10 * s} ${cy + 10 * s} q${5 * s} -${16 * s} ${10 * s} 0" fill="none" stroke="${gold}" stroke-width="1" stroke-linecap="round" />`,
        )
        .join("");
  }
}

function borderMarkup(border: (typeof BORDERS)[number], w: number, h: number, gold: string) {
  const pad = 14;
  switch (border) {
    case "double-rule":
      return `
        <rect x="${pad}" y="${pad}" width="${w - pad * 2}" height="${h - pad * 2}" fill="none" stroke="${gold}" stroke-width="1" />
        <rect x="${pad + 6}" y="${pad + 6}" width="${w - (pad + 6) * 2}" height="${h - (pad + 6) * 2}" fill="none" stroke="${gold}" stroke-width="0.6" opacity="0.7" />`;
    case "dotted":
      return `<rect x="${pad}" y="${pad}" width="${w - pad * 2}" height="${h - pad * 2}" fill="none" stroke="${gold}" stroke-width="1.4" stroke-dasharray="1 5" stroke-linecap="round" />`;
    case "ornate-corner": {
      const c = 22;
      const corners: [number, number, number, number][] = [
        [pad, pad, 1, 1],
        [w - pad, pad, -1, 1],
        [pad, h - pad, 1, -1],
        [w - pad, h - pad, -1, -1],
      ];
      return corners
        .map(
          ([x, y, dx, dy]) =>
            `<path d="M${x} ${y + c * dy} L${x} ${y} L${x + c * dx} ${y}" fill="none" stroke="${gold}" stroke-width="1.3" />`,
        )
        .join("");
    }
    case "scalloped": {
      const scallops = 10;
      const step = (w - pad * 2) / scallops;
      let d = `M${pad} ${pad}`;
      for (let i = 0; i < scallops; i++) {
        d += ` q${step / 2} 10 ${step} 0`;
      }
      return `<path d="${d}" fill="none" stroke="${gold}" stroke-width="1" />
        <rect x="${pad}" y="${h - pad - 20}" width="${w - pad * 2}" height="20" fill="none" stroke="${gold}" stroke-width="0.8" opacity="0.6" />`;
    }
    case "none":
    default:
      return "";
  }
}

function textLines(cx: number, cy: number, ink: string, gold: string, rng: () => number) {
  const titleW = 60 + rng() * 30;
  const subW = 40 + rng() * 20;
  return `
    <rect x="${cx - titleW / 2}" y="${cy - 4}" width="${titleW}" height="6" rx="3" fill="${ink}" opacity="0.85" />
    <rect x="${cx - subW / 2}" y="${cy + 12}" width="${subW}" height="3.5" rx="1.75" fill="${ink}" opacity="0.55" />
    <line x1="${cx - 20}" y1="${cy + 24}" x2="${cx + 20}" y2="${cy + 24}" stroke="${gold}" stroke-width="0.8" />`;
}

/**
 * Build a deterministic style (palette/layout/border/motif) for a seed —
 * exposed so callers can also use these facets as searchable tags.
 */
export function designStyleForSeed(seed: string): DesignStyle {
  const rng = mulberry32(hashSeed(seed));
  const palette = PALETTES[Math.floor(rng() * PALETTES.length)]!;
  const layout = LAYOUTS[Math.floor(rng() * LAYOUTS.length)]!;
  const border = BORDERS[Math.floor(rng() * BORDERS.length)]!;
  const motif = MOTIFS[Math.floor(rng() * MOTIFS.length)]!;
  return { paletteName: palette.name, layout, border, motif };
}

/** Render a unique invitation-style SVG preview for the given seed, as a data URI. */
export function generateDesignSvg(seed: string): string {
  const rng = mulberry32(hashSeed(seed));
  const W = 400;
  const H = 500;
  const palette = PALETTES[Math.floor(rng() * PALETTES.length)]!;
  const layout = LAYOUTS[Math.floor(rng() * LAYOUTS.length)]!;
  const border = BORDERS[Math.floor(rng() * BORDERS.length)]!;
  const motif = MOTIFS[Math.floor(rng() * MOTIFS.length)]!;
  const gradAngle = Math.floor(rng() * 360);

  let motifsMarkup = "";
  if (layout === "floral-corner") {
    motifsMarkup =
      motifPaths(motif, 60, 60, 1, palette.gold) +
      motifPaths(motif, W - 60, H - 60, 1, palette.gold);
  } else if (layout === "geometric-diamond") {
    const cx = W / 2;
    const cy = 90;
    motifsMarkup =
      `<path d="M${cx} ${cy - 26} L${cx + 26} ${cy} L${cx} ${cy + 26} L${cx - 26} ${cy} Z" fill="none" stroke="${palette.gold}" stroke-width="1.2" />` +
      motifPaths(motif, cx, cy, 0.8, palette.gold);
  } else if (layout === "jaali-lattice") {
    let lattice = "";
    for (let x = 40; x < W - 30; x += 26) {
      for (let y = 60; y < 150; y += 26) {
        lattice += `<path d="M${x} ${y}l13 13l-13 13l-13-13z" fill="none" stroke="${palette.gold}" stroke-width="0.6" opacity="0.55" />`;
      }
    }
    motifsMarkup = lattice;
  } else if (layout === "minimal-line") {
    motifsMarkup =
      `<line x1="${W / 2 - 50}" y1="70" x2="${W / 2 + 50}" y2="70" stroke="${palette.gold}" stroke-width="0.8" />` +
      motifPaths(motif, W / 2, 100, 0.9, palette.gold);
  } else {
    // arch-centered
    motifsMarkup =
      `<path d="M${W / 2 - 70} 140 Q${W / 2} 60 ${W / 2 + 70} 140" fill="none" stroke="${palette.gold}" stroke-width="1.2" />` +
      motifPaths(motif, W / 2, 100, 1, palette.gold);
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="g" gradientTransform="rotate(${gradAngle})">
        <stop offset="0%" stop-color="${palette.bg}" />
        <stop offset="100%" stop-color="${palette.bg2}" />
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)" />
    ${borderMarkup(border, W, H, palette.gold)}
    ${motifsMarkup}
    ${textLines(W / 2, H / 2 + 40, palette.ink, palette.gold, rng)}
    <circle cx="${W / 2}" cy="${H - 70}" r="1.6" fill="${palette.accent}" />
    <path d="M${W / 2 - 24} ${H - 70} h48" stroke="${palette.gold}" stroke-width="0.6" opacity="0.7" />
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
