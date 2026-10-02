/**
 * Generates the bulk of each subcategory's catalogue on demand.
 *
 * A handful of designs per subcategory are hand-authored in `products.ts`
 * with real copy — those are always shown first. This module tops each
 * subcategory up to the target count (25) with additional designs built
 * from small word-pools + the deterministic SVG generator, so every
 * catalogue reads as genuinely different pieces rather than repeated
 * placeholders, without shipping hundreds of image files.
 *
 * Generation is lazy: nothing here runs until a catalogue page actually
 * asks for a specific subcategory's designs, so the homepage never pays
 * the cost of generating catalogues it doesn't render.
 */

import { generateDesignSvg, designStyleForSeed } from "@/lib/design-svg";
import type { BaseProduct, CardProduct, CategoryId } from "./products";

import digitalImg from "@/assets/Templates/cat-digital.jpg";
import stationeryImg from "@/assets/Templates/cat-stationery.jpg";
import physicalImg from "@/assets/Templates/cat-physical.jpg";
import cardGreenImg from "@/assets/Templates/card-green.jpg";
import heroImg from "@/assets/Templates/hero-invitation.jpg";

export const TARGET_PER_SUBCATEGORY = 25;

const COLLECTIONS = [
  "Ivory Arch",
  "Marigold Trail",
  "Gold Filigree",
  "Jaali Screen",
  "Botanical Line",
  "Maroon Zari",
  "Sandstone Minimal",
  "Peacock Motif",
  "Lotus Bloom",
  "Rangoli Dawn",
  "Kalash Gold",
  "Heritage Weave",
  "Temple Lattice",
  "Saffron Thread",
  "Mughal Frame",
  "Dawn Court",
  "Vintage Zardozi",
  "Whispering Vine",
  "Copper Leaf",
  "Antique Rose",
  "Cream Cascade",
  "Amber Court",
  "Espresso Arch",
  "Taupe Garland",
] as const;

const LAYOUT_LABEL: Record<string, string> = {
  "arch-centered": "arch layout",
  "bordered-frame": "framed layout",
  "jaali-lattice": "jaali lattice",
  "minimal-line": "minimal layout",
  "floral-corner": "floral corners",
  "geometric-diamond": "geometric layout",
};

const MOTIF_LABEL: Record<string, string> = {
  "floral-sprig": "floral sprig",
  paisley: "paisley motif",
  "mandala-ring": "mandala ring",
  "leaf-vine": "leaf vine",
  "sun-arcs": "sunburst arcs",
};

const DESCRIPTION_OPENERS = [
  "A refined composition built around a",
  "An elegant design finished with a",
  "A quietly luxurious layout featuring a",
  "A hand-styled preview with a",
  "A modern-heritage design centred on a",
  "A soft, considered layout with a",
];

const DESCRIPTION_CLOSERS = [
  "set in the TheShubhmilan cream, beige and gold palette.",
  "in warm cocoa and muted gold tones.",
  "with fine gold linework throughout.",
  "finished in ivory, taupe and espresso.",
  "styled with restrained gold detailing.",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Cheap string hash used to vary numeric fields (price, index picks) deterministically. */
function pick<T>(arr: readonly T[], seed: string, salt: string): T {
  let h = 0;
  const s = seed + salt;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return arr[h % arr.length]!;
}

export interface GenerateOptions {
  category: CategoryId;
  group?: string;
  subcategory: string;
  /** How many generated designs to add (existing curated ones are supplied separately). */
  count: number;
  /** Base price used to compute a spread of realistic prices. */
  basePrice: number;
  /** Suffix appended to generated titles, e.g. "Invitation PDF" / "Design" / "Card". */
  titleSuffix: string;
  /** Starting index — keeps ids stable/unique when topping up an existing list. */
  startIndex?: number;
  /** Extra fields merged onto every generated CardProduct (style/colour). */
  cardExtras?: (seed: string) => Pick<CardProduct, "style" | "colour">;
}

export function generateDesigns(opts: GenerateOptions): BaseProduct[] {
  const { category, group, subcategory, count, basePrice, titleSuffix, startIndex = 0 } = opts;
  const subSlug = slugify(subcategory);
  const groupSlug = group ? slugify(group) : "general";
  const out: BaseProduct[] = [];

  for (let i = 0; i < count; i++) {
    const n = startIndex + i;
    const id = `${category}-${groupSlug}-${subSlug}-gen-${n}`;
    const collection = pick(COLLECTIONS, id, "collection");
    const style = designStyleForSeed(id);
    const layoutLabel = LAYOUT_LABEL[style.layout] ?? "layout";
    const motifLabel = MOTIF_LABEL[style.motif] ?? "motif";
    const opener = pick(DESCRIPTION_OPENERS, id, "opener");
    const closer = pick(DESCRIPTION_CLOSERS, id, "closer");

    const priceStep = 100 * (n % 9);
    const priceValue = basePrice + priceStep;

    const mainImage = generateDesignSvg(id);
    const product: BaseProduct = {
      id,
      category,
      ...(group ? { group } : {}),
      subcategory,
      collection,
      title: `${collection} ${subcategory} ${titleSuffix}`.replace(/\s+/g, " ").trim(),
      price: `From ₹${priceValue.toLocaleString("en-IN")}`,
      priceValue,
      image: mainImage,
      images:
        category === "stationery"
          ? [mainImage, stationeryImg, heroImg, physicalImg, cardGreenImg]
          : [mainImage, digitalImg, heroImg, cardGreenImg, stationeryImg],
      description: `${opener} ${motifLabel}, in a ${layoutLabel}, ${closer}`,
      details: [
        `${layoutLabel[0]!.toUpperCase()}${layoutLabel.slice(1)} with ${motifLabel}`,
        `${style.paletteName} palette`,
        "Fully customisable names, dates and text",
        "2 revision rounds included",
      ],
      specs: [
        { label: "Style", value: layoutLabel },
        { label: "Palette", value: style.paletteName },
        { label: "Motif", value: motifLabel },
      ],
      tags: [
        collection,
        subcategory,
        group ?? "",
        layoutLabel,
        motifLabel,
        style.paletteName,
      ].filter(Boolean) as string[],
    };

    if (opts.cardExtras) {
      const extras = opts.cardExtras(id);
      (product as CardProduct).style = extras.style;
      (product as CardProduct).colour = extras.colour;
      (product as CardProduct).occasion = subcategory;
    }

    out.push(product);
  }

  return out;
}

/**
 * Tops an existing (curated) product list up to `TARGET_PER_SUBCATEGORY` for
 * one subcategory, generating only the deficit. Memoised per subcategory so
 * repeated renders (search/filter re-renders) don't regenerate the SVGs.
 */
const cache = new Map<string, BaseProduct[]>();

export function topUpSubcategory(
  existing: BaseProduct[],
  opts: Omit<GenerateOptions, "count" | "startIndex">,
  target: number = TARGET_PER_SUBCATEGORY,
): BaseProduct[] {
  const cacheKey = `${opts.category}:${opts.group ?? ""}:${opts.subcategory}:${target}`;
  const cached = cache.get(cacheKey);
  if (cached) return [...existing.filter((p) => p.subcategory === opts.subcategory), ...cached];

  const curated = existing.filter(
    (p) => p.subcategory === opts.subcategory && (!opts.group || p.group === opts.group),
  );
  const deficit = Math.max(0, target - curated.length);
  const generated = generateDesigns({ ...opts, count: deficit, startIndex: curated.length });
  cache.set(cacheKey, generated);
  return [...curated, ...generated];
}
