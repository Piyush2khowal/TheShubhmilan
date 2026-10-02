import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as listPublicProducts } from "./product.server-BFclRhbs.mjs";
import { c as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-admin-catalogue-CmxhHQf2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function hashSeed(seed) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
/** Mulberry32 — tiny, fast, deterministic PRNG. */
function mulberry32(seed) {
	let a = seed;
	return function() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
/** SHUBHPATRA palette — cream/beige/sand/taupe/cocoa/espresso + muted gold + maroon accent. */
var PALETTES = [
	{
		bg: "#FBF6EC",
		bg2: "#F1E2C4",
		ink: "#4A3018",
		gold: "#B8863C",
		accent: "#7A2430",
		name: "Ivory & Gold"
	},
	{
		bg: "#F6ECDD",
		bg2: "#E7D3AC",
		ink: "#3E2A1A",
		gold: "#C79A52",
		accent: "#6B4A2C",
		name: "Beige Warmth"
	},
	{
		bg: "#F0E4CC",
		bg2: "#D8BB88",
		ink: "#3E2A1A",
		gold: "#AD7C3E",
		accent: "#5B3D22",
		name: "Sand & Cocoa"
	},
	{
		bg: "#EFE6D3",
		bg2: "#C9A874",
		ink: "#33210F",
		gold: "#B8863C",
		accent: "#7A1F2B",
		name: "Taupe Maroon"
	},
	{
		bg: "#F8F1E4",
		bg2: "#E2CDA0",
		ink: "#4A3018",
		gold: "#CBA45C",
		accent: "#8B6A45",
		name: "Cream Cocoa"
	},
	{
		bg: "#F3E7D6",
		bg2: "#DEC79B",
		ink: "#2F2013",
		gold: "#B8863C",
		accent: "#6B4A2C",
		name: "Espresso Gold"
	},
	{
		bg: "#FBF3E7",
		bg2: "#EAD6B0",
		ink: "#3E2A1A",
		gold: "#C79A52",
		accent: "#7A2430",
		name: "Ivory Maroon"
	},
	{
		bg: "#F4E9D8",
		bg2: "#D2B486",
		ink: "#33210F",
		gold: "#AD7C3E",
		accent: "#5B3D22",
		name: "Muted Gold"
	}
];
var LAYOUTS = [
	"arch-centered",
	"bordered-frame",
	"jaali-lattice",
	"minimal-line",
	"floral-corner",
	"geometric-diamond"
];
var BORDERS = [
	"double-rule",
	"dotted",
	"ornate-corner",
	"scalloped",
	"none"
];
var MOTIFS = [
	"floral-sprig",
	"paisley",
	"mandala-ring",
	"leaf-vine",
	"sun-arcs"
];
function motifPaths(motif, cx, cy, scale, gold) {
	const s = scale;
	switch (motif) {
		case "floral-sprig": return `
        <path d="M${cx} ${cy}c-${10 * s} -${18 * s} -${28 * s} -${22 * s} -${40 * s} -${14 * s}
                 c${10 * s} -${2 * s} ${18 * s} ${2 * s} ${22 * s} ${10 * s}
                 c${4 * s} -${10 * s} ${14 * s} -${16 * s} ${26 * s} -${16 * s}
                 c-${6 * s} ${10 * s} -${6 * s} ${22 * s} ${2 * s} ${30 * s}"
              fill="none" stroke="${gold}" stroke-width="1.1" stroke-linecap="round" />
        <circle cx="${cx}" cy="${cy}" r="${2.4 * s}" fill="${gold}" />`;
		case "paisley": return `
        <path d="M${cx} ${cy - 16 * s}
                 c${14 * s} 0 ${22 * s} ${10 * s} ${18 * s} ${22 * s}
                 c-${3 * s} ${9 * s} -${13 * s} ${13 * s} -${21 * s} ${9 * s}
                 c-${9 * s} -${4 * s} -${12 * s} -${14 * s} -${4 * s} -${20 * s}
                 c${5 * s} -${4 * s} ${3 * s} -${10 * s} -${7 * s} -${11 * s}z"
              fill="none" stroke="${gold}" stroke-width="1.1" />`;
		case "mandala-ring": return Array.from({ length: 8 }).map((_, i) => {
			const a = i / 8 * Math.PI * 2;
			const x = cx + Math.cos(a) * 14 * s;
			const y = cy + Math.sin(a) * 14 * s;
			return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${2 * s}" fill="none" stroke="${gold}" stroke-width="1" />`;
		}).join("") + `<circle cx="${cx}" cy="${cy}" r="${5 * s}" fill="none" stroke="${gold}" stroke-width="1" />`;
		case "leaf-vine": return `
        <path d="M${cx - 30 * s} ${cy} q${15 * s} -${14 * s} ${30 * s} 0 t${30 * s} 0"
              fill="none" stroke="${gold}" stroke-width="1" stroke-linecap="round" />
        <ellipse cx="${cx - 15 * s}" cy="${cy - 6 * s}" rx="${4 * s}" ry="${2 * s}" fill="${gold}" opacity="0.85" />
        <ellipse cx="${cx + 15 * s}" cy="${cy - 6 * s}" rx="${4 * s}" ry="${2 * s}" fill="${gold}" opacity="0.85" />`;
		default: return Array.from({ length: 5 }).map((_, i) => `<path d="M${cx - 20 * s + i * 10 * s} ${cy + 10 * s} q${5 * s} -${16 * s} ${10 * s} 0" fill="none" stroke="${gold}" stroke-width="1" stroke-linecap="round" />`).join("");
	}
}
function borderMarkup(border, w, h, gold) {
	const pad = 14;
	switch (border) {
		case "double-rule": return `
        <rect x="${pad}" y="${pad}" width="${w - 28}" height="${h - 28}" fill="none" stroke="${gold}" stroke-width="1" />
        <rect x="20" y="20" width="${w - 40}" height="${h - 40}" fill="none" stroke="${gold}" stroke-width="0.6" opacity="0.7" />`;
		case "dotted": return `<rect x="${pad}" y="${pad}" width="${w - 28}" height="${h - 28}" fill="none" stroke="${gold}" stroke-width="1.4" stroke-dasharray="1 5" stroke-linecap="round" />`;
		case "ornate-corner": {
			const c = 22;
			return [
				[
					pad,
					pad,
					1,
					1
				],
				[
					w - pad,
					pad,
					-1,
					1
				],
				[
					pad,
					h - pad,
					1,
					-1
				],
				[
					w - pad,
					h - pad,
					-1,
					-1
				]
			].map(([x, y, dx, dy]) => `<path d="M${x} ${y + c * dy} L${x} ${y} L${x + c * dx} ${y}" fill="none" stroke="${gold}" stroke-width="1.3" />`).join("");
		}
		case "scalloped": {
			const scallops = 10;
			const step = (w - 28) / scallops;
			let d = `M${pad} ${pad}`;
			for (let i = 0; i < scallops; i++) d += ` q${step / 2} 10 ${step} 0`;
			return `<path d="${d}" fill="none" stroke="${gold}" stroke-width="1" />
        <rect x="${pad}" y="${h - pad - 20}" width="${w - 28}" height="20" fill="none" stroke="${gold}" stroke-width="0.8" opacity="0.6" />`;
		}
		default: return "";
	}
}
function textLines(cx, cy, ink, gold, rng) {
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
function designStyleForSeed(seed) {
	const rng = mulberry32(hashSeed(seed));
	const palette = PALETTES[Math.floor(rng() * PALETTES.length)];
	const layout = LAYOUTS[Math.floor(rng() * LAYOUTS.length)];
	const border = BORDERS[Math.floor(rng() * BORDERS.length)];
	const motif = MOTIFS[Math.floor(rng() * MOTIFS.length)];
	return {
		paletteName: palette.name,
		layout,
		border,
		motif
	};
}
/** Render a unique invitation-style SVG preview for the given seed, as a data URI. */
function generateDesignSvg(seed) {
	const rng = mulberry32(hashSeed(seed));
	const W = 400;
	const H = 500;
	const palette = PALETTES[Math.floor(rng() * PALETTES.length)];
	const layout = LAYOUTS[Math.floor(rng() * LAYOUTS.length)];
	const border = BORDERS[Math.floor(rng() * BORDERS.length)];
	const motif = MOTIFS[Math.floor(rng() * MOTIFS.length)];
	const gradAngle = Math.floor(rng() * 360);
	let motifsMarkup = "";
	if (layout === "floral-corner") motifsMarkup = motifPaths(motif, 60, 60, 1, palette.gold) + motifPaths(motif, 340, 440, 1, palette.gold);
	else if (layout === "geometric-diamond") {
		const cx = W / 2;
		const cy = 90;
		motifsMarkup = `<path d="M${cx} 64 L226 ${cy} L${cx} 116 L174 ${cy} Z" fill="none" stroke="${palette.gold}" stroke-width="1.2" />` + motifPaths(motif, cx, cy, .8, palette.gold);
	} else if (layout === "jaali-lattice") {
		let lattice = "";
		for (let x = 40; x < 370; x += 26) for (let y = 60; y < 150; y += 26) lattice += `<path d="M${x} ${y}l13 13l-13 13l-13-13z" fill="none" stroke="${palette.gold}" stroke-width="0.6" opacity="0.55" />`;
		motifsMarkup = lattice;
	} else if (layout === "minimal-line") motifsMarkup = `<line x1="${W / 2 - 50}" y1="70" x2="250" y2="70" stroke="${palette.gold}" stroke-width="0.8" />` + motifPaths(motif, W / 2, 100, .9, palette.gold);
	else motifsMarkup = `<path d="M${W / 2 - 70} 140 Q${W / 2} 60 270 140" fill="none" stroke="${palette.gold}" stroke-width="1.2" />` + motifPaths(motif, W / 2, 100, 1, palette.gold);
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
    ${textLines(W / 2, 290, palette.ink, palette.gold, rng)}
    <circle cx="${W / 2}" cy="430" r="1.6" fill="${palette.accent}" />
    <path d="M${W / 2 - 24} 430 h48" stroke="${palette.gold}" stroke-width="0.6" opacity="0.7" />
  </svg>`;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
var cat_digital_default = "/assets/cat-digital-Bch-8H7m.jpg";
var cat_stationery_default = "/assets/cat-stationery-5F3X7Ont.jpg";
var cat_physical_default = "/assets/cat-physical-aGf9xzhg.jpg";
var card_green_default = "/assets/card-green-B-qjojWO.jpg";
var hero_invitation_default = "/assets/hero-invitation-Rli8fitM.jpg";
var COLLECTIONS = [
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
	"Taupe Garland"
];
var LAYOUT_LABEL = {
	"arch-centered": "arch layout",
	"bordered-frame": "framed layout",
	"jaali-lattice": "jaali lattice",
	"minimal-line": "minimal layout",
	"floral-corner": "floral corners",
	"geometric-diamond": "geometric layout"
};
var MOTIF_LABEL = {
	"floral-sprig": "floral sprig",
	paisley: "paisley motif",
	"mandala-ring": "mandala ring",
	"leaf-vine": "leaf vine",
	"sun-arcs": "sunburst arcs"
};
var DESCRIPTION_OPENERS = [
	"A refined composition built around a",
	"An elegant design finished with a",
	"A quietly luxurious layout featuring a",
	"A hand-styled preview with a",
	"A modern-heritage design centred on a",
	"A soft, considered layout with a"
];
var DESCRIPTION_CLOSERS = [
	"set in the TheShubhmilan cream, beige and gold palette.",
	"in warm cocoa and muted gold tones.",
	"with fine gold linework throughout.",
	"finished in ivory, taupe and espresso.",
	"styled with restrained gold detailing."
];
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
/** Cheap string hash used to vary numeric fields (price, index picks) deterministically. */
function pick(arr, seed, salt) {
	let h = 0;
	const s = seed + salt;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return arr[h % arr.length];
}
function generateDesigns(opts) {
	const { category, group, subcategory, count, basePrice, titleSuffix, startIndex = 0 } = opts;
	const subSlug = slugify(subcategory);
	const groupSlug = group ? slugify(group) : "general";
	const out = [];
	for (let i = 0; i < count; i++) {
		const n = startIndex + i;
		const id = `${category}-${groupSlug}-${subSlug}-gen-${n}`;
		const collection = pick(COLLECTIONS, id, "collection");
		const style = designStyleForSeed(id);
		const layoutLabel = LAYOUT_LABEL[style.layout] ?? "layout";
		const motifLabel = MOTIF_LABEL[style.motif] ?? "motif";
		const opener = pick(DESCRIPTION_OPENERS, id, "opener");
		const closer = pick(DESCRIPTION_CLOSERS, id, "closer");
		const priceValue = basePrice + 100 * (n % 9);
		const mainImage = generateDesignSvg(id);
		const product = {
			id,
			category,
			...group ? { group } : {},
			subcategory,
			collection,
			title: `${collection} ${subcategory} ${titleSuffix}`.replace(/\s+/g, " ").trim(),
			price: `From ₹${priceValue.toLocaleString("en-IN")}`,
			priceValue,
			image: mainImage,
			images: category === "stationery" ? [
				mainImage,
				cat_stationery_default,
				hero_invitation_default,
				cat_physical_default,
				card_green_default
			] : [
				mainImage,
				cat_digital_default,
				hero_invitation_default,
				card_green_default,
				cat_stationery_default
			],
			description: `${opener} ${motifLabel}, in a ${layoutLabel}, ${closer}`,
			details: [
				`${layoutLabel[0].toUpperCase()}${layoutLabel.slice(1)} with ${motifLabel}`,
				`${style.paletteName} palette`,
				"Fully customisable names, dates and text",
				"2 revision rounds included"
			],
			specs: [
				{
					label: "Style",
					value: layoutLabel
				},
				{
					label: "Palette",
					value: style.paletteName
				},
				{
					label: "Motif",
					value: motifLabel
				}
			],
			tags: [
				collection,
				subcategory,
				group ?? "",
				layoutLabel,
				motifLabel,
				style.paletteName
			].filter(Boolean)
		};
		if (opts.cardExtras) {
			const extras = opts.cardExtras(id);
			product.style = extras.style;
			product.colour = extras.colour;
			product.occasion = subcategory;
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
var cache = /* @__PURE__ */ new Map();
function topUpSubcategory(existing, opts, target = 25) {
	const cacheKey = `${opts.category}:${opts.group ?? ""}:${opts.subcategory}:${target}`;
	const cached = cache.get(cacheKey);
	if (cached) return [...existing.filter((p) => p.subcategory === opts.subcategory), ...cached];
	const curated = existing.filter((p) => p.subcategory === opts.subcategory && (!opts.group || p.group === opts.group));
	const deficit = Math.max(0, target - curated.length);
	const generated = generateDesigns({
		...opts,
		count: deficit,
		startIndex: curated.length
	});
	cache.set(cacheKey, generated);
	return [...curated, ...generated];
}
var cat_video_default = "/assets/cat-video-CAX3IVON.jpg";
var STD1_default = "/assets/STD1-DbsefGZb.png";
var STD1_1_default = "/assets/STD1_1-CNfJDkrV.png";
var STD1_2_default = "/assets/STD1_2-DfVeRJVz.png";
var STD1_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD2_default = "/assets/STD2-Uf_VBNSx.png";
var STD2_1_default = "/assets/STD2_1-BqJFusCQ.png";
var STD2_2_default = "/assets/STD2_2-C_TF49zV.png";
var STD2_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD3_default = "/assets/STD3-DvYQfjK3.png";
var STD3_1_default = "/assets/STD3_1-CkayCmI4.png";
var STD3_2_default = "/assets/STD3_2-umIdKTnz.png";
var STD3_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD4_default = "/assets/STD4-BbvFU2W2.png";
var STD4_1_default = "/assets/STD4_1-DC2ZqbbG.png";
var STD4_2_default = "/assets/STD4_2-DBnN0S-J.png";
var STD4_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD5_default = "/assets/STD5-DNw7J3em.png";
var STD5_1_default = "/assets/STD5_1-B09lz8pC.png";
var STD5_2_default = "/assets/STD5_2-0PIkoGtD.png";
var STD5_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD6_default = "/assets/STD6-ukiFHMr5.png";
var STD6_1_default = "/assets/STD6_1-Xh4uyL8V.png";
var STD6_2_default = "/assets/STD6_2-rU6yEI88.png";
var STD6_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD7_default = "/assets/STD7-By3EKL5v.png";
var STD7_1_default = "/assets/STD7_1-D4Xqrfjm.png";
var STD7_2_default = "/assets/STD7_2-D4bo2DIJ.png";
var STD7_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD8_default = "/assets/STD8-C2KuYKWl.png";
var STD8_1_default = "/assets/STD8_1-B2VgYk1r.png";
var STD8_2_default = "/assets/STD8_2-CWMfPPFZ.png";
var STD8_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD9_default = "/assets/STD9-DbDhbkJv.png";
var STD9_1_default = "/assets/STD9_1-lC8VLYpB.png";
var STD9_2_default = "/assets/STD9_2-uPdXufb9.png";
var STD9_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var STD10_default = "/assets/STD10-C9MeaJel.png";
var STD10_1_default = "/assets/STD10_1-DPqBwo1c.png";
var STD10_2_default = "/assets/STD10_2-D2hg8HiX.png";
var STD10_3_default = "/assets/STD1_3-oXSu9onH.jpg";
var VI_1_default = "/assets/VI_1-CaNaWg4-.mp4";
var VI_2_default = "/assets/VI_2-DRblfTcV.mp4";
var VI_3_default = "/assets/VI_3-CrO7Jur1.mp4";
var VI_4_default = "/assets/VI_4-Ds1r9S22.MP4";
var VI_5_default = "/assets/VI_5-Cg65YZUK.mp4";
var VI_6_default = "/assets/VI_6-CvL7tnOS.mp4";
var VI_7_default = "/assets/VI_7-CTOp1wrB.mp4";
var VI_8_default = "/assets/VI_8-DavHyLT_.mp4";
var VI_9_default = "/assets/VI_9-CxahTRJ6.mp4";
var VI_10_default = "/assets/VI_10-BVHamq0g.mp4";
var _1_image_default = "/assets/1_image-Cg9t_sOZ.png";
var _2_image_default = "/assets/2_image-DVmEeZct.png";
var _3_image_default = "/assets/3_image-CxjDEd_W.png";
var _4_image_default = "/assets/4_image-ChHA_ilH.png";
var _5_image_default = "/assets/5_image-CUADKlrD.png";
var brand = {
	name: "TheShubhmilan",
	tagline: "Wedding invites & stationery",
	owner: "Mustaqim",
	whatsapp: "919958577919",
	phone: "+91 99585 77919",
	email: "shubhpatra11@gmail.com",
	city: "Delhi",
	hours: "10 AM – 6 PM (Mon–Sat)",
	instagram: "https://instagram.com",
	heroImage: hero_invitation_default
};
var categories = [
	{
		id: "digital",
		name: "Digital Invite",
		href: "/digital-invite",
		blurb: "Wedding invitation PDFs, video invites, path & pooja, kids celebrations and digital stationery.",
		image: cat_digital_default,
		count: "Delivered in 48 hours"
	},
	{
		id: "stationery",
		name: "Stationery",
		href: "/stationery",
		blurb: "Signages, welcome notes, menus, itineraries, money envelopes, tags and wedding scrolls.",
		image: cat_stationery_default,
		count: "Print & foil finishes"
	},
	{
		id: "video",
		name: "Video Invitations",
		href: "/#video",
		blurb: "Animated invitation films for save the date, wedding and ring ceremony.",
		image: cat_video_default,
		count: "Square 1:1 previews"
	},
	{
		id: "cards",
		name: "Physical Cards",
		href: "/physical-cards",
		blurb: "Printed invitation cards — boxes, laser-cut covers, foil press and scrolls.",
		image: cat_physical_default,
		count: "25 designs"
	}
];
/** Digital Invite groups and their subcategories, exactly as per the brief. */
var digitalGroups = [
	{
		group: "Wedding Invitation PDF",
		subcategories: [
			"Save the Date",
			"Roka Ceremony",
			"Engagement",
			"Wedding Invite"
		]
	},
	{
		group: "Video Invite",
		subcategories: [
			"Save the Date",
			"Wedding",
			"Ring Ceremony / Engagement"
		]
	},
	{
		group: "Path & Pooja",
		subcategories: [
			"Ganesh Pooja",
			"Mata Ki Chowki",
			"Grah Pravesh / House Warming",
			"Satsang",
			"Naming Ceremony",
			"Michachmi Dukhdum",
			"Satyanarayana Katha",
			"Sunder Kand Path"
		]
	},
	{
		group: "Kids Celebration",
		subcategories: [
			"Baby Announcement",
			"Baby Birthday",
			"Baby Shower",
			"Naming Ceremony"
		]
	},
	{
		group: "Digital Stationery",
		subcategories: ["Wardrobe Planner"]
	}
];
/** Stationery subcategories, exactly as per the brief. */
var stationerySubcategories = [
	"Wedding Signages Design",
	"Welcome Notes",
	"Money Envelope Designs",
	"Thankyou Notes",
	"Menu Cards",
	"Itinerary Designs",
	"Keyjackets",
	"Luggage Tags",
	"Hamper Tags",
	"Wedding Scrolls"
];
/** Digital Invite groups, excluding "Video Invite" (handled by `videoInvitations`). */
var digitalCatalogueGroups = digitalGroups.filter((g) => g.group !== "Video Invite");
/**
* TO ADD A DESIGN: copy an object below, give it a unique `id`, set `group`
* and `subcategory` to one of the values in `digitalGroups`, and you're done.
* Placeholder imagery is used until the client shares the final artwork.
*/
var digitalInvitations = [
	{
		id: "dig-save-the-date",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Ivory Arch",
		title: "Save The Date Invitation PDF — Design 1",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD1_default,
		images: [
			STD1_default,
			STD1_1_default,
			STD1_2_default,
			STD1_3_default
		],
		description: "A graceful single-page save the date PDF featuring an elegant arch motif and delicate ceremonial typography.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-2",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Marigold Trail",
		title: "Save The Date Invitation PDF — Design 2",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD2_default,
		images: [
			STD2_default,
			STD2_1_default,
			STD2_2_default,
			STD2_3_default
		],
		description: "Warm festive palette with rich floral borders and clean, modern typesetting for your date announcement.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-3",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Gold Filigree",
		title: "Save The Date Invitation PDF — Design 3",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD3_default,
		images: [
			STD3_default,
			STD3_1_default,
			STD3_2_default,
			STD3_3_default
		],
		description: "Opulent gold filigree borders paired with regal calligraphy on warm ivory cardstock.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-4",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Jaali Screen",
		title: "Save The Date Invitation PDF — Design 4",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD4_default,
		images: [
			STD4_default,
			STD4_1_default,
			STD4_2_default,
			STD4_3_default
		],
		description: "Intricate architectural jaali patterns framing your celebration date in ceremonial splendor.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-5",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Botanical Line",
		title: "Save The Date Invitation PDF — Design 5",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD5_default,
		images: [
			STD5_default,
			STD5_1_default,
			STD5_2_default,
			STD5_3_default
		],
		description: "Hand-sketched botanical sprigs and minimal gold detailing for an understated, modern romance.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-6",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Maroon Zari",
		title: "Save The Date Invitation PDF — Design 6",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD6_default,
		images: [
			STD6_default,
			STD6_1_default,
			STD6_2_default,
			STD6_3_default
		],
		description: "Rich deep maroon accents with traditional zari weave styling and royal serif typography.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-7",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Sandstone Minimal",
		title: "Save The Date Invitation PDF — Design 7",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD7_default,
		images: [
			STD7_default,
			STD7_1_default,
			STD7_2_default,
			STD7_3_default
		],
		description: "Earthy sandstone undertones, crisp serif titles and plenty of breathable whitespace.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-8",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Peacock Motif",
		title: "Save The Date Invitation PDF — Design 8",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD8_default,
		images: [
			STD8_default,
			STD8_1_default,
			STD8_2_default,
			STD8_3_default
		],
		description: "Regal peacock feather line illustration surrounded by gentle gold shimmer and classic borders.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-9",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Lotus Bloom",
		title: "Save The Date Invitation PDF — Design 9",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD9_default,
		images: [
			STD9_default,
			STD9_1_default,
			STD9_2_default,
			STD9_3_default
		],
		description: "Serene sacred lotus blooms on fine cream texture with soft gold calligraphy.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-save-the-date-10",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Save the Date",
		collection: "Rangoli Dawn",
		title: "Save The Date Invitation PDF — Design 10",
		price: "From ₹1,299",
		priceValue: 1299,
		image: STD10_default,
		images: [
			STD10_default,
			STD10_1_default,
			STD10_2_default,
			STD10_3_default
		],
		description: "Intricate mandalas and geometric rangoli corners announcing the big day in timeless style.",
		details: [
			"1 designed page, print + share ready PDF",
			"Custom names, date and hashtag",
			"Matching WhatsApp status crop",
			"2 revision rounds included"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG"
			},
			{
				label: "Pages",
				value: "1"
			},
			{
				label: "Turnaround",
				value: "2–3 working days"
			}
		]
	},
	{
		id: "dig-roka",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Roka Ceremony",
		collection: "Ivory Arch",
		title: "Roka Ceremony Invitation PDF",
		price: "From ₹1,299",
		priceValue: 1299,
		image: cat_stationery_default,
		images: [
			cat_stationery_default,
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_physical_default
		],
		description: "A warm ivory and brown roka invitation with space for both families and the ceremony timing.",
		details: [
			"1–2 designed pages",
			"Both family names",
			"Venue and timing panel"
		]
	},
	{
		id: "dig-engagement",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Engagement",
		collection: "Maroon Bloom",
		title: "Engagement Invitation PDF",
		price: "From ₹1,499",
		priceValue: 1499,
		image: cat_physical_default,
		images: [
			cat_physical_default,
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_stationery_default
		],
		description: "Maroon florals on ivory with a ring-ceremony header and elegant serif typography.",
		details: [
			"1–2 designed pages",
			"Ring ceremony motif",
			"Dress code panel optional"
		]
	},
	{
		id: "dig-wedding-suite",
		category: "digital",
		group: "Wedding Invitation PDF",
		subcategory: "Wedding Invite",
		collection: "Heritage",
		title: "Wedding Invitation PDF Suite",
		price: "From ₹3,499",
		priceValue: 3499,
		image: hero_invitation_default,
		images: [
			hero_invitation_default,
			cat_digital_default,
			card_green_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "The centrepiece — a multi-page wedding invitation PDF with ceremony schedule, venue details and RSVP contact.",
		details: [
			"Up to 5 designed pages",
			"Ceremony-by-ceremony schedule",
			"Venue map / directions panel",
			"Print-ready and share-ready versions"
		],
		specs: [
			{
				label: "Format",
				value: "PDF + JPG set"
			},
			{
				label: "Pages",
				value: "Up to 5"
			},
			{
				label: "Languages",
				value: "English, Hindi, Urdu + more"
			}
		]
	},
	{
		id: "dig-ganesh-pooja",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Ganesh Pooja",
		collection: "Path & Pooja",
		title: "Ganesh Pooja Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: cat_digital_default,
		images: [
			cat_digital_default,
			card_green_default,
			hero_invitation_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "A serene ivory invitation for Ganesh Pooja with a hand-drawn temple arch.",
		details: [
			"1 designed page",
			"Pooja timing and venue",
			"Same-day express option"
		]
	},
	{
		id: "dig-mata-ki-chowki",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Mata Ki Chowki",
		collection: "Path & Pooja",
		title: "Mata Ki Chowki Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: card_green_default,
		images: [
			card_green_default,
			cat_digital_default,
			hero_invitation_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "Maroon and ivory chowki invitation with a soft gold border and diya motifs.",
		details: [
			"1 designed page",
			"Bhajan timing panel",
			"WhatsApp-optimised file size"
		]
	},
	{
		id: "dig-grah-pravesh",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Grah Pravesh / House Warming",
		collection: "Path & Pooja",
		title: "Grah Pravesh Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: cat_physical_default,
		images: [
			cat_physical_default,
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_stationery_default
		],
		description: "House-warming invitation with a doorway arch illustration and family name plate.",
		details: [
			"1 designed page",
			"Address and directions",
			"Optional map link"
		]
	},
	{
		id: "dig-satsang",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Satsang",
		collection: "Path & Pooja",
		title: "Satsang Invitation",
		price: "From ₹799",
		priceValue: 799,
		image: cat_stationery_default,
		images: [
			cat_stationery_default,
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_physical_default
		],
		description: "A calm, uncluttered satsang invitation in ivory with maroon devanagari typesetting.",
		details: [
			"1 designed page",
			"Hindi or English typesetting",
			"Timing and venue panel"
		]
	},
	{
		id: "dig-naming-ceremony-pooja",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Naming Ceremony",
		collection: "Path & Pooja",
		title: "Naming Ceremony Invitation (Pooja)",
		price: "From ₹899",
		priceValue: 899,
		image: hero_invitation_default,
		images: [
			hero_invitation_default,
			cat_digital_default,
			card_green_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "Naming ceremony invitation with a gentle floral wreath and space for the baby's name.",
		details: [
			"1 designed page",
			"Baby name reveal panel",
			"2 revision rounds"
		]
	},
	{
		id: "dig-michachmi",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Michachmi Dukhdum",
		collection: "Path & Pooja",
		title: "Michachmi Dukhdum Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: cat_digital_default,
		images: [
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "A traditional invitation layout for Michachmi Dukhdum in ivory and brown.",
		details: [
			"1 designed page",
			"Traditional layout",
			"Language of your choice"
		]
	},
	{
		id: "dig-satyanarayana-katha",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Satyanarayana Katha",
		collection: "Path & Pooja",
		title: "Satyanarayana Katha Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: card_green_default,
		images: [
			card_green_default,
			cat_digital_default,
			hero_invitation_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "Katha invitation with kalash motifs, maroon headings and ivory ground.",
		details: [
			"1 designed page",
			"Kalash motif border",
			"Timing and prasad note"
		]
	},
	{
		id: "dig-sunder-kand",
		category: "digital",
		group: "Path & Pooja",
		subcategory: "Sunder Kand Path",
		collection: "Path & Pooja",
		title: "Sunder Kand Path Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: cat_physical_default,
		images: [
			cat_physical_default,
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_stationery_default
		],
		description: "Sunder Kand Path invitation with a restrained arch frame and devanagari heading.",
		details: [
			"1 designed page",
			"Devanagari heading",
			"Venue and timing panel"
		]
	},
	{
		id: "dig-baby-announcement",
		category: "digital",
		group: "Kids Celebration",
		subcategory: "Baby Announcement",
		collection: "Kids Celebration",
		title: "Baby Announcement Card",
		price: "From ₹799",
		priceValue: 799,
		image: cat_stationery_default,
		images: [
			cat_stationery_default,
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_physical_default
		],
		description: "A soft ivory announcement card with room for the baby's name, date and weight.",
		details: [
			"1 designed page",
			"Photo frame option",
			"Square and story crops"
		]
	},
	{
		id: "dig-baby-birthday",
		category: "digital",
		group: "Kids Celebration",
		subcategory: "Baby Birthday",
		collection: "Kids Celebration",
		title: "Baby Birthday Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: cat_digital_default,
		images: [
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "A playful yet elegant birthday invitation with illustrated bunting in warm tones.",
		details: [
			"1 designed page",
			"Theme of your choice",
			"Photo insert option"
		]
	},
	{
		id: "dig-baby-shower",
		category: "digital",
		group: "Kids Celebration",
		subcategory: "Baby Shower",
		collection: "Kids Celebration",
		title: "Baby Shower Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: hero_invitation_default,
		images: [
			hero_invitation_default,
			cat_digital_default,
			card_green_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "Baby shower / godh bharai invitation with a floral arch and ivory backdrop.",
		details: [
			"1 designed page",
			"Godh bharai wording option",
			"Games / gifting note"
		]
	},
	{
		id: "dig-kids-naming",
		category: "digital",
		group: "Kids Celebration",
		subcategory: "Naming Ceremony",
		collection: "Kids Celebration",
		title: "Naming Ceremony Invitation",
		price: "From ₹899",
		priceValue: 899,
		image: cat_physical_default,
		images: [
			cat_physical_default,
			cat_digital_default,
			hero_invitation_default,
			card_green_default,
			cat_stationery_default
		],
		description: "Naming ceremony card for the family celebration, with a name-reveal panel.",
		details: [
			"1 designed page",
			"Name reveal panel",
			"Matching thank-you note option"
		]
	},
	{
		id: "dig-wardrobe-planner",
		category: "digital",
		group: "Digital Stationery",
		subcategory: "Wardrobe Planner",
		collection: "Digital Stationery",
		title: "Wedding Wardrobe Planner",
		price: "From ₹1,199",
		priceValue: 1199,
		image: card_green_default,
		images: [
			card_green_default,
			cat_digital_default,
			hero_invitation_default,
			cat_stationery_default,
			cat_physical_default
		],
		description: "A designed wardrobe planner listing every function, outfit, jewellery and footwear note in one shareable file.",
		details: [
			"Function-by-function planner",
			"Outfit, jewellery and footwear columns",
			"Editable PDF + printable version"
		]
	}
];
var stationery = [
	{
		id: "sta-signage",
		category: "stationery",
		subcategory: "Wedding Signages Design",
		collection: "Entryway",
		title: "Wedding Signage Design",
		price: "From ₹2,400",
		priceValue: 2400,
		image: cat_stationery_default,
		images: [
			cat_stationery_default,
			hero_invitation_default,
			cat_physical_default,
			card_green_default,
			cat_digital_default
		],
		description: "A sculpted arch-shaped signage design for entryways, in acrylic, mirror or board.",
		details: [
			"24×36 in standard",
			"Acrylic, mirror or MDF",
			"Print-ready artwork supplied"
		]
	},
	{
		id: "sta-welcome-note",
		category: "stationery",
		subcategory: "Welcome Notes",
		collection: "Hospitality",
		title: "Welcome Note",
		price: "From ₹85 / pc",
		priceValue: 85,
		image: hero_invitation_default,
		images: [
			hero_invitation_default,
			cat_stationery_default,
			cat_physical_default,
			card_green_default,
			cat_digital_default
		],
		description: "A room-drop welcome note on textured ivory stock with maroon foiled heading.",
		details: [
			"Min. order 50 pcs",
			"Textured ivory stock",
			"Optional envelope"
		]
	},
	{
		id: "sta-money-envelope",
		category: "stationery",
		subcategory: "Money Envelope Designs",
		collection: "Shagun",
		title: "Money Envelope Design",
		price: "From ₹35 / pc",
		priceValue: 35,
		image: cat_physical_default,
		images: [
			cat_physical_default,
			cat_stationery_default,
			hero_invitation_default,
			card_green_default,
			cat_digital_default
		],
		description: "Shagun envelopes with a fine botanical border and space for the family name.",
		details: [
			"Min. order 100 pcs",
			"Foil or flat print",
			"Standard note size"
		]
	},
	{
		id: "sta-thankyou-note",
		category: "stationery",
		subcategory: "Thankyou Notes",
		collection: "Farewell",
		title: "Thankyou Note",
		price: "From ₹95 / pc",
		priceValue: 95,
		image: cat_stationery_default,
		images: [
			cat_stationery_default,
			hero_invitation_default,
			cat_physical_default,
			card_green_default,
			cat_digital_default
		],
		description: "Folded thank-you notes with matching lined envelopes and a wax seal option.",
		details: [
			"Matching envelope liner",
			"Wax seal with monogram",
			"Min. order 50 pcs"
		]
	},
	{
		id: "sta-menu-card",
		category: "stationery",
		subcategory: "Menu Cards",
		collection: "Tabletop",
		title: "Menu Card",
		price: "From ₹75 / pc",
		priceValue: 75,
		image: hero_invitation_default,
		images: [
			hero_invitation_default,
			cat_stationery_default,
			cat_physical_default,
			card_green_default,
			cat_digital_default
		],
		description: "Textured stock menu cards with optional foil headings and deckled edges.",
		details: [
			"Min. order 50 pcs",
			"Hot-foil or letterpress",
			"Handmade paper option"
		]
	},
	{
		id: "sta-itinerary",
		category: "stationery",
		subcategory: "Itinerary Designs",
		collection: "Tabletop",
		title: "Itinerary Design",
		price: "From ₹110 / pc",
		priceValue: 110,
		image: card_green_default,
		images: [
			card_green_default,
			cat_stationery_default,
			hero_invitation_default,
			cat_physical_default,
			cat_digital_default
		],
		description: "A function-wise itinerary card guests can keep in their room or bag.",
		details: [
			"Single or concertina fold",
			"Function-wise timeline",
			"Acrylic version available"
		]
	},
	{
		id: "sta-keyjacket",
		category: "stationery",
		subcategory: "Keyjackets",
		collection: "Hospitality",
		title: "Keyjacket",
		price: "From ₹60 / pc",
		priceValue: 60,
		image: cat_digital_default,
		images: [
			cat_digital_default,
			cat_stationery_default,
			hero_invitation_default,
			cat_physical_default,
			card_green_default
		],
		description: "Hotel keycard jackets carrying the wedding monogram and guest name.",
		details: [
			"Fits standard keycards",
			"Monogram + guest name",
			"Min. order 100 pcs"
		]
	},
	{
		id: "sta-luggage-tag",
		category: "stationery",
		subcategory: "Luggage Tags",
		collection: "Hospitality",
		title: "Luggage Tag",
		price: "From ₹70 / pc",
		priceValue: 70,
		image: cat_physical_default,
		images: [
			cat_physical_default,
			cat_stationery_default,
			hero_invitation_default,
			card_green_default,
			cat_digital_default
		],
		description: "Ribboned luggage tags for arriving guests, in ivory board or leatherette.",
		details: [
			"Ivory board or leatherette",
			"Ribbon or elastic loop",
			"Min. order 50 pcs"
		]
	},
	{
		id: "sta-hamper-tag",
		category: "stationery",
		subcategory: "Hamper Tags",
		collection: "Gifting",
		title: "Hamper Tag",
		price: "From ₹35 / pc",
		priceValue: 35,
		image: cat_digital_default,
		images: [
			cat_digital_default,
			cat_stationery_default,
			hero_invitation_default,
			cat_physical_default,
			card_green_default
		],
		description: "Gift and hamper tags finished with silk ribbon for return gifts.",
		details: [
			"Silk or satin ribbon",
			"Foil or embossed",
			"Min. order 100 pcs"
		]
	},
	{
		id: "sta-wedding-scroll",
		category: "stationery",
		subcategory: "Wedding Scrolls",
		collection: "Heritage",
		title: "Wedding Scroll",
		price: "From ₹520",
		priceValue: 520,
		image: cat_stationery_default,
		images: [
			cat_stationery_default,
			hero_invitation_default,
			cat_physical_default,
			card_green_default,
			cat_digital_default
		],
		description: "A printed scroll in a capped cylinder, tied with zari thread — for special guests.",
		details: [
			"Brass or wooden caps",
			"Silk or paper scroll",
			"Zari thread tie"
		]
	}
];
var videoInvitations = [
	{
		id: "vid-vi-1",
		category: "video",
		group: "Video Invite",
		subcategory: "Save the Date",
		collection: "Save the Date",
		title: "Save The Date Teaser Film (VI 1)",
		price: "From ₹4,200",
		priceValue: 4200,
		image: card_green_default,
		poster: card_green_default,
		duration: "0:20",
		orientation: "portrait",
		videoUrl: VI_1_default,
		description: "A short, cinematic reveal of the date — ivory textures with maroon and soft gold typography.",
		details: [
			"Cinematic teaser",
			"Reels-ready 9:16 version",
			"48-hour turnaround"
		]
	},
	{
		id: "vid-vi-2",
		category: "video",
		group: "Video Invite",
		subcategory: "Wedding",
		collection: "Wedding",
		title: "Wedding Invitation Film (VI 2)",
		price: "From ₹6,500",
		priceValue: 6500,
		image: cat_video_default,
		poster: cat_video_default,
		duration: "0:45",
		orientation: "portrait",
		videoUrl: VI_2_default,
		description: "An illuminated arch opens onto your names, with diyas, florals and a live instrumental score.",
		details: [
			"Full celebration suite",
			"Original score",
			"3 revision rounds"
		]
	},
	{
		id: "vid-vi-3",
		category: "video",
		group: "Video Invite",
		subcategory: "Ring Ceremony / Engagement",
		collection: "Ring Ceremony",
		title: "Ring Ceremony Invitation Film (VI 3)",
		price: "From ₹5,400",
		priceValue: 5400,
		image: hero_invitation_default,
		poster: hero_invitation_default,
		duration: "0:35",
		orientation: "portrait",
		videoUrl: VI_3_default,
		description: "A vertical engagement film built for WhatsApp and Instagram, with ring motif animation.",
		details: [
			"Vertical 9:16 master",
			"Ring motif animation",
			"Voice-over option"
		]
	},
	{
		id: "vid-vi-4",
		category: "video",
		group: "Video Invite",
		subcategory: "Save the Date",
		collection: "Haldi Glow",
		title: "Haldi Ceremony Teaser Film (VI 4)",
		price: "From ₹3,800",
		priceValue: 3800,
		image: generateDesignSvg("vid-vi-4-poster"),
		poster: generateDesignSvg("vid-vi-4-poster"),
		duration: "0:18",
		orientation: "portrait",
		videoUrl: VI_4_default,
		description: "A sunlit, marigold-toned teaser announcing the haldi, built for Instagram.",
		details: [
			"18 seconds",
			"Vertical 9:16 master",
			"48-hour turnaround"
		]
	},
	{
		id: "vid-vi-5",
		category: "video",
		group: "Video Invite",
		subcategory: "Wedding",
		collection: "Mehendi Motion",
		title: "Mehendi Invitation Film (VI 5)",
		price: "From ₹4,600",
		priceValue: 4600,
		image: generateDesignSvg("vid-vi-5-poster"),
		poster: generateDesignSvg("vid-vi-5-poster"),
		duration: "0:30",
		orientation: "portrait",
		videoUrl: VI_5_default,
		description: "Hand-drawn henna line art animates across a warm cream and gold backdrop.",
		details: [
			"30 seconds",
			"Vertical 9:16 master",
			"2 revision rounds"
		]
	},
	{
		id: "vid-vi-6",
		category: "video",
		group: "Video Invite",
		subcategory: "Wedding",
		collection: "Sangeet Reveal",
		title: "Sangeet Night Invitation Film (VI 6)",
		price: "From ₹5,200",
		priceValue: 5200,
		image: generateDesignSvg("vid-vi-6-poster"),
		poster: generateDesignSvg("vid-vi-6-poster"),
		duration: "0:32",
		orientation: "portrait",
		videoUrl: VI_6_default,
		description: "A festive gold-foil reveal announcing the sangeet, scored with live percussion.",
		details: [
			"32 seconds",
			"Vertical 9:16 master",
			"Original score"
		]
	},
	{
		id: "vid-vi-7",
		category: "video",
		group: "Video Invite",
		subcategory: "Wedding",
		collection: "Reception Arch",
		title: "Reception Invitation Film (VI 7)",
		price: "From ₹5,800",
		priceValue: 5800,
		image: generateDesignSvg("vid-vi-7-poster"),
		poster: generateDesignSvg("vid-vi-7-poster"),
		duration: "0:40",
		orientation: "portrait",
		videoUrl: VI_7_default,
		description: "A grand illuminated arch parts to reveal the reception details, in gold and ivory.",
		details: [
			"40 seconds",
			"Vertical 9:16 master",
			"3 revision rounds"
		]
	},
	{
		id: "vid-vi-8",
		category: "video",
		group: "Video Invite",
		subcategory: "Ring Ceremony / Engagement",
		collection: "Ring Motion",
		title: "Ring Ceremony Teaser Film (VI 8)",
		price: "From ₹4,900",
		priceValue: 4900,
		image: generateDesignSvg("vid-vi-8-poster"),
		poster: generateDesignSvg("vid-vi-8-poster"),
		duration: "0:24",
		orientation: "portrait",
		videoUrl: VI_8_default,
		description: "Two rings interlock in gold linework over a soft beige gradient.",
		details: [
			"24 seconds",
			"Vertical 9:16 master",
			"Voice-over option"
		]
	},
	{
		id: "vid-vi-9",
		category: "video",
		group: "Video Invite",
		subcategory: "Save the Date",
		collection: "Lotus Bloom",
		title: "Save The Date Bloom Film (VI 9)",
		price: "From ₹4,000",
		priceValue: 4e3,
		image: generateDesignSvg("vid-vi-9-poster"),
		poster: generateDesignSvg("vid-vi-9-poster"),
		duration: "0:22",
		orientation: "portrait",
		videoUrl: VI_9_default,
		description: "A lotus motif blooms open around the date, in cream, taupe and muted gold.",
		details: [
			"22 seconds",
			"Vertical 9:16 master",
			"48-hour turnaround"
		]
	},
	{
		id: "vid-vi-10",
		category: "video",
		group: "Video Invite",
		subcategory: "Wedding",
		collection: "Baby Bloom",
		title: "Baby Shower Invitation Film (VI 10)",
		price: "From ₹3,600",
		priceValue: 3600,
		image: generateDesignSvg("vid-vi-10-poster"),
		poster: generateDesignSvg("vid-vi-10-poster"),
		duration: "0:20",
		orientation: "portrait",
		videoUrl: VI_10_default,
		description: "A soft floral wreath frames the godh bharai details in ivory and gold.",
		details: [
			"20 seconds",
			"Vertical 9:16 master",
			"2 revision rounds"
		]
	},
	{
		id: "vid-vi-11",
		category: "video",
		group: "Video Invite",
		subcategory: "Wedding",
		collection: "Upcoming Suite",
		title: "Video Invitation 11",
		price: "From ₹4,500",
		priceValue: 4500,
		image: generateDesignSvg("vid-vi-11-poster"),
		poster: generateDesignSvg("vid-vi-11-poster"),
		duration: "",
		orientation: "portrait",
		videoUrl: "",
		description: "New cinematic video invitation coming soon.",
		details: [
			"High-definition master",
			"Custom music score",
			"Coming soon"
		]
	},
	{
		id: "vid-vi-12",
		category: "video",
		group: "Video Invite",
		subcategory: "Wedding",
		collection: "Upcoming Suite",
		title: "Video Invitation 12",
		price: "From ₹4,500",
		priceValue: 4500,
		image: generateDesignSvg("vid-vi-12-poster"),
		poster: generateDesignSvg("vid-vi-12-poster"),
		duration: "",
		orientation: "portrait",
		videoUrl: "",
		description: "New cinematic video invitation coming soon.",
		details: [
			"High-definition master",
			"Custom music score",
			"Coming soon"
		]
	}
];
/**
* TO ADD A CARD: copy this template to the end of the array below, give it a
* unique `id`, and you're done — the grid, search, filters, sorting and
* Load More all pick it up automatically. No UI file needs editing.
*
* {
*   id: "pc-unique-slug",
*   category: "cards",
*   collection: "Heritage",         // design family
*   subcategory: "Wedding Invite",  // optional
*   title: "Card name",
*   price: "₹450",
*   priceValue: 450,                // number only — used for sort + price filter
*   image: myImportedImage,         // or "https://…"
*   gallery: [imgA, imgB],          // optional extra photos
*   style: "Box Card",              // filter
*   colour: "Ivory",                // filter
*   occasion: "Wedding",            // filter
*   material: "Velvet-wrapped rigid box",
*   size: "6×9 in",
*   description: "…",
*   details: ["…", "…"],
*   available: true,                // optional; false = made to order
* }
*
* TO REMOVE A CARD: delete its object. TO CHANGE price/image/text: edit it here.
*/
var physicalCards = [
	{
		id: "pc-heritage-velvet",
		category: "cards",
		collection: "Heritage",
		title: "Heritage Velvet Box Card",
		price: "₹450",
		priceValue: 450,
		image: _1_image_default,
		images: [
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default,
			_5_image_default
		],
		style: "Box Card",
		colour: "Maroon",
		material: "Velvet-wrapped rigid board with laser-cut lid",
		size: "6×9 in box",
		description: "A velvet box with a laser-cut arch lid and ivory inserts.",
		details: [
			"Velvet-wrapped rigid box",
			"Laser-cut arch lid",
			"3 inserts + 2 envelopes",
			"Min. order 100 pcs"
		],
		specs: [
			{
				label: "Style",
				value: "Box Card"
			},
			{
				label: "Material",
				value: "Velvet-wrapped rigid board"
			},
			{
				label: "Size",
				value: "6×9 in box"
			},
			{
				label: "Includes",
				value: "3 inserts + 2 envelopes"
			}
		]
	},
	{
		id: "pc-jaali-arch",
		category: "cards",
		collection: "Jaali",
		title: "Jaali Arch Laser-Cut Card",
		price: "₹280",
		priceValue: 280,
		image: _2_image_default,
		images: [
			_2_image_default,
			_1_image_default,
			_3_image_default,
			_4_image_default,
			_5_image_default
		],
		style: "Laser Cut",
		colour: "Ivory",
		material: "300 gsm ivory board, laser-cut jaali cover",
		size: "5×7 in",
		description: "An ivory jaali screen folds open to reveal the invitation in foiled script.",
		details: [
			"Laser-cut jaali cover",
			"Foiled script",
			"Matching lined envelope"
		],
		specs: [
			{
				label: "Style",
				value: "Laser Cut"
			},
			{
				label: "Material",
				value: "300 gsm ivory board"
			},
			{
				label: "Size",
				value: "5×7 in"
			},
			{
				label: "Finish",
				value: "Gold foil detailing"
			}
		]
	},
	{
		id: "pc-ivory-foil",
		category: "cards",
		collection: "Heritage",
		title: "Ivory Hot-Foil Invitation",
		price: "₹210",
		priceValue: 210,
		image: _3_image_default,
		images: [
			_3_image_default,
			_1_image_default,
			_2_image_default,
			_4_image_default,
			_5_image_default
		],
		style: "Foil Press",
		colour: "Ivory",
		material: "300 gsm handmade cotton paper, hot foil",
		size: "5×7 in",
		description: "Handmade cotton paper with a hot-foiled arch and botanical line ornaments.",
		details: [
			"300 gsm handmade paper",
			"Hot foil",
			"Deckled edges"
		],
		specs: [
			{
				label: "Style",
				value: "Foil Press"
			},
			{
				label: "Material",
				value: "300 gsm handmade cotton paper"
			},
			{
				label: "Size",
				value: "5×7 in"
			},
			{
				label: "Edges",
				value: "Hand-torn deckled edges"
			}
		]
	},
	{
		id: "pc-scroll-invite",
		category: "cards",
		collection: "Heritage",
		title: "Silk Scroll Invitation",
		price: "₹520",
		priceValue: 520,
		image: _4_image_default,
		images: [
			_4_image_default,
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_5_image_default
		],
		style: "Scroll",
		colour: "Ivory",
		material: "Silk scroll, brass-capped cylinder",
		size: "12 in scroll",
		description: "A silk scroll in a brass-capped cylinder, tied with zari thread.",
		details: [
			"Brass-capped cylinder",
			"Silk scroll print",
			"Zari thread tie"
		],
		specs: [
			{
				label: "Style",
				value: "Scroll"
			},
			{
				label: "Material",
				value: "Pure silk with brass casing"
			},
			{
				label: "Size",
				value: "12 in scroll"
			},
			{
				label: "Tie",
				value: "Handcrafted zari thread"
			}
		]
	},
	{
		id: "pc-maroon-gatefold",
		category: "cards",
		collection: "Heritage",
		title: "Maroon Gatefold Card",
		price: "₹340",
		priceValue: 340,
		image: _5_image_default,
		images: [
			_5_image_default,
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Gatefold",
		colour: "Maroon",
		material: "350 gsm board, foil-pressed pillars, magnet close",
		size: "5.5×8 in",
		description: "Twin gatefold doors with foiled pillars opening to the main card.",
		details: [
			"Gatefold with magnet close",
			"Foiled pillars",
			"2 inserts included"
		],
		specs: [
			{
				label: "Style",
				value: "Gatefold"
			},
			{
				label: "Material",
				value: "350 gsm premium board"
			},
			{
				label: "Size",
				value: "5.5×8 in"
			},
			{
				label: "Closure",
				value: "Concealed magnetic latch"
			}
		]
	},
	{
		id: "pc-brown-minimal",
		category: "cards",
		collection: "Modern Minimal",
		title: "Brown & Foil Minimal Card",
		price: "₹165",
		priceValue: 165,
		image: cat_physical_default,
		images: [
			cat_physical_default,
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Flat Card",
		colour: "Brown",
		material: "350 gsm board, single-colour foil",
		size: "5×7 in",
		description: "Warm brown board with a single foiled arch and letterpress typography.",
		details: [
			"350 gsm board",
			"Single-colour foil",
			"Min. order 100 pcs"
		],
		specs: [
			{
				label: "Style",
				value: "Flat Card"
			},
			{
				label: "Material",
				value: "350 gsm espresso board"
			},
			{
				label: "Size",
				value: "5×7 in"
			},
			{
				label: "Finish",
				value: "Matte metallic foil"
			}
		]
	},
	{
		id: "pc-royal-mughal",
		category: "cards",
		collection: "Mughal Heritage",
		title: "Royal Mughal Arch Hardbound Card",
		price: "₹390",
		priceValue: 390,
		image: generateDesignSvg("pc-royal-mughal"),
		images: [
			generateDesignSvg("pc-royal-mughal"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Hardbound",
		colour: "Ivory",
		material: "Hardbound book fold with embossed Mughal arch",
		size: "6×8.5 in",
		description: "An ornate Mughal arch doorway with intricate jali debossing and gilded border.",
		details: [
			"Hardbound padded cover",
			"Intricate jali debossing",
			"Butter paper divider",
			"Matching envelope"
		],
		specs: [
			{
				label: "Style",
				value: "Hardbound"
			},
			{
				label: "Material",
				value: "Padded matte board"
			},
			{
				label: "Size",
				value: "6×8.5 in"
			},
			{
				label: "Print",
				value: "Screen print & foil"
			}
		]
	},
	{
		id: "pc-gold-filigree",
		category: "cards",
		collection: "Gold Filigree",
		title: "Gold Filigree Velvet Box",
		price: "₹480",
		priceValue: 480,
		image: generateDesignSvg("pc-gold-filigree"),
		images: [
			generateDesignSvg("pc-gold-filigree"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Box Card",
		colour: "Gold",
		material: "Rigid box with gold filigree metal brooch",
		size: "7×10 in box",
		description: "A ceremonial box adorned with a metallic filigree crest and custom monogram.",
		details: [
			"Cast metal crest brooch",
			"Plush velvet interior",
			"Satin ribbon pull",
			"3 metallic inserts"
		],
		specs: [
			{
				label: "Style",
				value: "Box Card"
			},
			{
				label: "Material",
				value: "Handcrafted rigid board & velvet"
			},
			{
				label: "Size",
				value: "7×10 in box"
			},
			{
				label: "Brooch",
				value: "Custom electroplated brass"
			}
		]
	},
	{
		id: "pc-lotus-bloom",
		category: "cards",
		collection: "Lotus Bloom",
		title: "Lotus Bloom Laser-Cut Card",
		price: "₹295",
		priceValue: 295,
		image: generateDesignSvg("pc-lotus-bloom"),
		images: [
			generateDesignSvg("pc-lotus-bloom"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Laser Cut",
		colour: "Ivory",
		material: "Shimmer board with multi-layered lotus cutouts",
		size: "5×7.5 in",
		description: "Layered petals open outward in a blooming lotus motif revealing the wedding text.",
		details: [
			"Precision laser filigree",
			"Dual-tone shimmer paper",
			"Wax seal with monogram"
		],
		specs: [
			{
				label: "Style",
				value: "Laser Cut"
			},
			{
				label: "Material",
				value: "320 gsm pearlised board"
			},
			{
				label: "Size",
				value: "5×7.5 in"
			},
			{
				label: "Seal",
				value: "Custom botanical wax stamp"
			}
		]
	},
	{
		id: "pc-peacock-zardozi",
		category: "cards",
		collection: "Heritage",
		title: "Peacock Zardozi Embroidered Card",
		price: "₹550",
		priceValue: 550,
		image: generateDesignSvg("pc-peacock-zardozi"),
		images: [
			generateDesignSvg("pc-peacock-zardozi"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Box Card",
		colour: "Maroon",
		material: "Raw silk fabric with hand-embroidered peacock zardozi",
		size: "6.5×9 in",
		description: "Artisanal zardozi embroidery of peacock motifs executed on deep maroon silk.",
		details: [
			"Genuine metallic thread zardozi",
			"Raw silk hardbound cover",
			"Gilt-edged inserts"
		],
		specs: [
			{
				label: "Style",
				value: "Embroidered Box"
			},
			{
				label: "Material",
				value: "Raw silk on rigid structure"
			},
			{
				label: "Size",
				value: "6.5×9 in"
			},
			{
				label: "Craft",
				value: "Hand-embroidery"
			}
		]
	},
	{
		id: "pc-saffron-zari",
		category: "cards",
		collection: "Saffron Thread",
		title: "Saffron Zari Folded Invitation",
		price: "₹240",
		priceValue: 240,
		image: generateDesignSvg("pc-saffron-zari"),
		images: [
			generateDesignSvg("pc-saffron-zari"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Gatefold",
		colour: "Sand",
		material: "Textured saffron paper with woven zari border",
		size: "5.5×8 in",
		description: "Warm saffron textured paper bordered with metallic zari weave and devanagari motifs.",
		details: [
			"Zari brocade border trim",
			"Traditional shubh vivah heading",
			"2 ceremony inserts"
		],
		specs: [
			{
				label: "Style",
				value: "Gatefold"
			},
			{
				label: "Material",
				value: "300 gsm handmade saffron paper"
			},
			{
				label: "Size",
				value: "5.5×8 in"
			},
			{
				label: "Accent",
				value: "Woven zari ribbon"
			}
		]
	},
	{
		id: "pc-botanical-deckle",
		category: "cards",
		collection: "Botanical Line",
		title: "Botanical Deckled Edge Card",
		price: "₹195",
		priceValue: 195,
		image: generateDesignSvg("pc-botanical-deckle"),
		images: [
			generateDesignSvg("pc-botanical-deckle"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Flat Card",
		colour: "Ivory",
		material: "100% cotton rag paper with deckled edges",
		size: "5×7 in",
		description: "Fine-line botanical illustrations pressed into thick handmade cotton paper.",
		details: [
			"Deckled edges on 4 sides",
			"Blind deboss & gold foil",
			"Translucent vellum overlay"
		],
		specs: [
			{
				label: "Style",
				value: "Flat Card"
			},
			{
				label: "Material",
				value: "350 gsm pure cotton rag"
			},
			{
				label: "Size",
				value: "5×7 in"
			},
			{
				label: "Finish",
				value: "Deboss & hot foil"
			}
		]
	},
	{
		id: "pc-sandstone-minimal",
		category: "cards",
		collection: "Sandstone Minimal",
		title: "Sandstone Minimal Arch Card",
		price: "₹180",
		priceValue: 180,
		image: generateDesignSvg("pc-sandstone-minimal"),
		images: [
			generateDesignSvg("pc-sandstone-minimal"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Flat Card",
		colour: "Sand",
		material: "Warm sandstone textured board with die-cut arch top",
		size: "5×7.5 in",
		description: "Sculptural die-cut arched invitation card inspired by Rajasthani jharokhas.",
		details: [
			"Curved arch die-cut",
			"Minimalist serif typography",
			"Matching tone-on-tone envelope"
		],
		specs: [
			{
				label: "Style",
				value: "Die-Cut Arch"
			},
			{
				label: "Material",
				value: "350 gsm matte textured board"
			},
			{
				label: "Size",
				value: "5×7.5 in"
			},
			{
				label: "Shape",
				value: "Jharokha arch"
			}
		]
	},
	{
		id: "pc-kalash-gold",
		category: "cards",
		collection: "Kalash Gold",
		title: "Kalash Gold Foil Card",
		price: "₹225",
		priceValue: 225,
		image: generateDesignSvg("pc-kalash-gold"),
		images: [
			generateDesignSvg("pc-kalash-gold"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Foil Press",
		colour: "Maroon",
		material: "Deep crimson card with gleaming kalash and coconut motif",
		size: "5.5×8 in",
		description: "Auspicious kalash motifs rendered in reflective gold foil on rich crimson cardstock.",
		details: [
			"Reflective mirror gold foil",
			"Auspicious Sanskrit shlokas",
			"Gold-foiled envelope flap"
		],
		specs: [
			{
				label: "Style",
				value: "Foil Press"
			},
			{
				label: "Material",
				value: "350 gsm velvet touch board"
			},
			{
				label: "Size",
				value: "5.5×8 in"
			},
			{
				label: "Foil",
				value: "Mirror gloss gold"
			}
		]
	},
	{
		id: "pc-temple-lattice",
		category: "cards",
		collection: "Temple Lattice",
		title: "Temple Lattice Gatefold Card",
		price: "₹310",
		priceValue: 310,
		image: generateDesignSvg("pc-temple-lattice"),
		images: [
			generateDesignSvg("pc-temple-lattice"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Gatefold",
		colour: "Ivory",
		material: "Intricate laser-cut temple pillar lattice on ivory board",
		size: "6×8 in",
		description: "Temple pillar lattice gates swing open with a decorative gold bell charm.",
		details: [
			"Twin temple lattice panels",
			"Miniature metal bell ornament",
			"3 multi-event inserts"
		],
		specs: [
			{
				label: "Style",
				value: "Gatefold"
			},
			{
				label: "Material",
				value: "320 gsm imported board"
			},
			{
				label: "Size",
				value: "6×8 in"
			},
			{
				label: "Charm",
				value: "Antique gold bell"
			}
		]
	},
	{
		id: "pc-antique-rose",
		category: "cards",
		collection: "Antique Rose",
		title: "Antique Rose Embossed Card",
		price: "₹260",
		priceValue: 260,
		image: generateDesignSvg("pc-antique-rose"),
		images: [
			generateDesignSvg("pc-antique-rose"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Foil Press",
		colour: "Sand",
		material: "Soft dusty rose textured paper with multi-level embossing",
		size: "5×7 in",
		description: "Gentle rose garden garlands with multi-level sculpted emboss and rose-gold foiling.",
		details: [
			"Multi-level sculptured emboss",
			"Rose-gold foil highlights",
			"Lined blush envelope"
		],
		specs: [
			{
				label: "Style",
				value: "Embossed"
			},
			{
				label: "Material",
				value: "300 gsm textured paper"
			},
			{
				label: "Size",
				value: "5×7 in"
			},
			{
				label: "Finish",
				value: "Sculptured 3D emboss"
			}
		]
	},
	{
		id: "pc-espresso-velvet",
		category: "cards",
		collection: "Espresso Arch",
		title: "Espresso Velvet Trunk Box",
		price: "₹580",
		priceValue: 580,
		image: generateDesignSvg("pc-espresso-velvet"),
		images: [
			generateDesignSvg("pc-espresso-velvet"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Box Card",
		colour: "Brown",
		material: "Rich espresso velvet mini trunk with brass hasp closure",
		size: "7×9 in box",
		description: "Luxury miniature trunk wrapped in deep espresso velvet with brass clasp and sweets tray.",
		details: [
			"Brass hasp and hinge mechanism",
			"Removable mithaai tray",
			"Hardbound invitation book inside"
		],
		specs: [
			{
				label: "Style",
				value: "Trunk Box"
			},
			{
				label: "Material",
				value: "Wooden core & imported velvet"
			},
			{
				label: "Size",
				value: "7×9×2.5 in"
			},
			{
				label: "Hardware",
				value: "Antique brass hasp"
			}
		]
	},
	{
		id: "pc-cream-cascade",
		category: "cards",
		collection: "Cream Cascade",
		title: "Cream Cascade Foil Card",
		price: "₹235",
		priceValue: 235,
		image: generateDesignSvg("pc-cream-cascade"),
		images: [
			generateDesignSvg("pc-cream-cascade"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Flat Card",
		colour: "Ivory",
		material: "Tiered cascade inserts in warm cream and champagne tones",
		size: "5×7.5 in",
		description: "Staggered step-cut cards providing clean tabbed navigation through each wedding ceremony.",
		details: [
			"4 stepped ceremony tabs",
			"Champagne foil headings",
			"Silk belly band wrap"
		],
		specs: [
			{
				label: "Style",
				value: "Stepped Cascade"
			},
			{
				label: "Material",
				value: "300 gsm premium Italian board"
			},
			{
				label: "Size",
				value: "5×7.5 in"
			},
			{
				label: "Tabs",
				value: "4 graduated step cards"
			}
		]
	},
	{
		id: "pc-amber-court",
		category: "cards",
		collection: "Amber Court",
		title: "Amber Court Hardbound Suite",
		price: "₹370",
		priceValue: 370,
		image: generateDesignSvg("pc-amber-court"),
		images: [
			generateDesignSvg("pc-amber-court"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Hardbound",
		colour: "Gold",
		material: "Amber metallic cloth bound invitation book",
		size: "6×8 in",
		description: "An opulent cloth-bound book invitation evoking ancient royal court scrolls and registers.",
		details: [
			"Metallic woven bookcloth",
			"Gilded corners",
			"Custom calligraphy name plate"
		],
		specs: [
			{
				label: "Style",
				value: "Hardbound"
			},
			{
				label: "Material",
				value: "Bookcloth & greyboard"
			},
			{
				label: "Size",
				value: "6×8 in"
			},
			{
				label: "Corners",
				value: "Gilded metal protectors"
			}
		]
	},
	{
		id: "pc-taupe-garland",
		category: "cards",
		collection: "Taupe Garland",
		title: "Taupe Garland Laser-Cut Card",
		price: "₹275",
		priceValue: 275,
		image: generateDesignSvg("pc-taupe-garland"),
		images: [
			generateDesignSvg("pc-taupe-garland"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Laser Cut",
		colour: "Brown",
		material: "Taupe cardstock with continuous marigold garland fretwork",
		size: "5.5×7.5 in",
		description: "Continuous toran and garland fretwork laser cut along the border in earthy taupe.",
		details: [
			"Toran garland laser fretwork",
			"Soft gold foil background",
			"Matching envelope liner"
		],
		specs: [
			{
				label: "Style",
				value: "Laser Cut"
			},
			{
				label: "Material",
				value: "300 gsm taupe art board"
			},
			{
				label: "Size",
				value: "5.5×7.5 in"
			},
			{
				label: "Pattern",
				value: "Marigold toran"
			}
		]
	},
	{
		id: "pc-marigold-foil",
		category: "cards",
		collection: "Marigold Trail",
		title: "Marigold Motif Foil Invitation",
		price: "₹215",
		priceValue: 215,
		image: generateDesignSvg("pc-marigold-foil"),
		images: [
			generateDesignSvg("pc-marigold-foil"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Foil Press",
		colour: "Gold",
		material: "Festive golden marigold floral illustrations with raised foil",
		size: "5×7 in",
		description: "Cheerful marigolds celebrated in raised tactile gold foil on rich handmade paper.",
		details: [
			"Raised tactile foil print",
			"Traditional genda phool artwork",
			"Deckled envelope flap"
		],
		specs: [
			{
				label: "Style",
				value: "Foil Press"
			},
			{
				label: "Material",
				value: "300 gsm handmade paper"
			},
			{
				label: "Size",
				value: "5×7 in"
			},
			{
				label: "Finish",
				value: "Raised metallic foil"
			}
		]
	},
	{
		id: "pc-mughal-jaali",
		category: "cards",
		collection: "Jaali Screen",
		title: "Mughal Jaali Metallic Card",
		price: "₹320",
		priceValue: 320,
		image: generateDesignSvg("pc-mughal-jaali"),
		images: [
			generateDesignSvg("pc-mughal-jaali"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Laser Cut",
		colour: "Gold",
		material: "Metallic gold board with geometric Mughal jaali lattice",
		size: "6×8 in",
		description: "Geometric octagonal jaali geometry precision cut into reflective matte-gold board.",
		details: [
			"Octagonal Mughal jaali cut",
			"Matte metallic gold cardstock",
			"Ribbon closure"
		],
		specs: [
			{
				label: "Style",
				value: "Laser Cut"
			},
			{
				label: "Material",
				value: "350 gsm metallic board"
			},
			{
				label: "Size",
				value: "6×8 in"
			},
			{
				label: "Closure",
				value: "Hand-dyed silk ribbon"
			}
		]
	},
	{
		id: "pc-dawn-court",
		category: "cards",
		collection: "Dawn Court",
		title: "Dawn Court Regal Box",
		price: "₹495",
		priceValue: 495,
		image: generateDesignSvg("pc-dawn-court"),
		images: [
			generateDesignSvg("pc-dawn-court"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Box Card",
		colour: "Ivory",
		material: "Pearl ivory hardbox with royal darbar arch painting",
		size: "7×9 in box",
		description: "A stately invitation box featuring miniature court paintings and gold foil calligraphy.",
		details: [
			"Fine art miniature painting insert",
			"Padded velvet tray",
			"3 ceremony folders"
		],
		specs: [
			{
				label: "Style",
				value: "Box Card"
			},
			{
				label: "Material",
				value: "Padded rigid board"
			},
			{
				label: "Size",
				value: "7×9 in box"
			},
			{
				label: "Artwork",
				value: "Miniature court painting"
			}
		]
	},
	{
		id: "pc-vintage-zardozi",
		category: "cards",
		collection: "Vintage Zardozi",
		title: "Vintage Zardozi Silk Scroll",
		price: "₹560",
		priceValue: 560,
		image: generateDesignSvg("pc-vintage-zardozi"),
		images: [
			generateDesignSvg("pc-vintage-zardozi"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Scroll",
		colour: "Maroon",
		material: "Crimson raw silk scroll in carved rosewood case",
		size: "14 in scroll",
		description: "Royal farmaan style silk scroll with hand-stitched border housed in an engraved rosewood cylinder.",
		details: [
			"Engraved natural rosewood cylinder",
			"Raw silk scroll with zari trim",
			"Tassel tie"
		],
		specs: [
			{
				label: "Style",
				value: "Scroll"
			},
			{
				label: "Material",
				value: "Pure silk & carved rosewood"
			},
			{
				label: "Size",
				value: "14 in scroll"
			},
			{
				label: "Case",
				value: "Hand-carved wooden case"
			}
		]
	},
	{
		id: "pc-whispering-vine",
		category: "cards",
		collection: "Whispering Vine",
		title: "Whispering Vine Handmade Paper Card",
		price: "₹190",
		priceValue: 190,
		image: generateDesignSvg("pc-whispering-vine"),
		images: [
			generateDesignSvg("pc-whispering-vine"),
			_1_image_default,
			_2_image_default,
			_3_image_default,
			_4_image_default
		],
		style: "Flat Card",
		colour: "Ivory",
		material: "Botanical seed paper with delicate vine press",
		size: "5×7 in",
		description: "Plantable handmade cotton paper embedded with wildflower seeds and debossed vine borders.",
		details: [
			"Eco-friendly seed paper",
			"Blind letterpress debossing",
			"Plantable after celebration"
		],
		specs: [
			{
				label: "Style",
				value: "Flat Card"
			},
			{
				label: "Material",
				value: "Seed-embedded cotton paper"
			},
			{
				label: "Size",
				value: "5×7 in"
			},
			{
				label: "Feature",
				value: "Plantable wildflower seeds"
			}
		]
	}
];
[
	...digitalInvitations,
	...stationery,
	...videoInvitations,
	...physicalCards
];
/** Base "from" price used when generating extra designs for a digital subcategory. */
function digitalBasePrice(subcategory) {
	if (subcategory === "Wedding Invite") return 1799;
	if (subcategory === "Engagement" || subcategory === "Roka Ceremony") return 1499;
	if (subcategory === "Wardrobe Planner") return 899;
	return 1299;
}
/** Full, unique design set for one Digital Invite subcategory (curated + generated). */
function digitalSubcategoryDesigns(group, subcategory) {
	if (subcategory === "Save the Date") return digitalInvitations.filter((p) => p.subcategory === "Save the Date" && (!group || p.group === group));
	return topUpSubcategory(digitalInvitations, {
		category: "digital",
		group,
		subcategory,
		basePrice: digitalBasePrice(subcategory),
		titleSuffix: "Invitation PDF"
	});
}
/** Full, unique design set for one Stationery subcategory (curated + generated). */
function stationerySubcategoryDesigns(subcategory) {
	return topUpSubcategory(stationery, {
		category: "stationery",
		subcategory,
		basePrice: 220,
		titleSuffix: "Design"
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function ProductCard({ product, onOpen, tone = "light", className }) {
	const dark = tone === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group border-gold/35 relative flex flex-col border p-3 transition-all duration-500 hover:-translate-y-1", dark ? "bg-green/40 hover:border-gold/70" : "bg-card hover:border-gold/70", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "border-gold/70 absolute top-1.5 left-1.5 h-4 w-4 border-t border-l" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "border-gold/70 absolute right-1.5 bottom-1.5 h-4 w-4 border-r border-b" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onOpen(product),
				className: "block w-full overflow-hidden text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images?.[0] ?? product.image,
					alt: product.title,
					loading: "lazy",
					width: 1024,
					height: 1024,
					className: "h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] sm:h-64"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col px-3 pt-5 pb-3 text-center",
				children: [
					product.collection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gold text-[0.6rem] tracking-[0.35em] uppercase",
						children: product.collection
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: cn("mt-2 text-xl leading-snug", dark ? "text-ivory" : "text-green-deep"),
						children: product.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule mx-auto mt-3 h-px w-14" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-3 line-clamp-2 text-xs leading-relaxed", dark ? "text-ivory/70" : "text-brown/75"),
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("font-display text-lg", dark ? "text-gold-bright" : "text-brown"),
							children: product.price
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onOpen(product),
							className: cn("mt-4 w-full border py-2.5 text-[0.65rem] tracking-[0.3em] uppercase transition-colors", dark ? "border-gold/60 text-gold hover:bg-gold hover:text-green-deep" : "border-green/40 text-green-deep hover:bg-green-deep hover:text-ivory"),
							children: "View Details"
						})]
					})
				]
			})
		]
	});
}
/** Slim gold rule with a centre lozenge — used between sections. */
function GoldDivider({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-center gap-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gold-rule h-px w-16 sm:w-28" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gold text-xs tracking-[0.4em]",
				children: "✦"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gold-rule h-px w-16 sm:w-28" })
		]
	});
}
/** Botanical line ornament inspired by the SHUBHPATRA crest. */
function BotanicalOrnament({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 240 40",
		fill: "none",
		"aria-hidden": "true",
		className: cn("text-gold h-8 w-56", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M120 34c-14-10-30-14-46-14-10 0-18-4-22-11 8-1 15 2 19 8 4-8 12-12 21-12 7 0 13 3 17 8",
				stroke: "currentColor",
				strokeWidth: "1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M120 34c14-10 30-14 46-14 10 0 18-4 22-11-8-1-15 2-19 8-4-8-12-12-21-12-7 0-13 3-17 8",
				stroke: "currentColor",
				strokeWidth: "1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "120",
				cy: "35",
				r: "2",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M60 30c6-6 14-8 22-6M158 24c8-2 16 0 22 6",
				stroke: "currentColor",
				strokeWidth: "0.7"
			})
		]
	});
}
/** Section heading: eyebrow, display title, optional lead paragraph. */
function SectionHeading({ eyebrow, title, lead, tone = "light", className }) {
	const dark = tone === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("mx-auto max-w-2xl text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-[0.7rem] tracking-[0.45em] uppercase", dark ? "text-gold" : "text-brown/70"),
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: cn("mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl", dark ? "text-ivory" : "text-green-deep"),
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldDivider, { className: "mt-6" }),
			lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-6 text-sm leading-relaxed sm:text-base", dark ? "text-ivory/75" : "text-brown/80"),
				children: lead
			}) : null
		]
	});
}
/** Decorative arch frame used by the hero. */
function ArchFrame({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-gold/60 absolute -inset-3 rounded-t-[999px] border sm:-inset-5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-gold/35 absolute -inset-6 rounded-t-[999px] border sm:-inset-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-green-night/40 arch-mask relative overflow-hidden",
				children
			})
		]
	});
}
/** Opens WhatsApp with a pre-filled enquiry for a product (or a general one). */
function whatsappLink(product) {
	const message = product ? `Hello TheShubhmilan, I would like to enquire about "${product.title}" (${product.price}).` : "Hello TheShubhmilan, I would like to enquire about your wedding invitations.";
	return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}
/** Reveals an element once it scrolls into view (respects reduced motion). */
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setVisible(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -60px 0px"
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	return {
		ref,
		visible
	};
}
var logoSrc$1 = "/assets/logo/shubhpatra-logo.jpg";
function Contact() {
	const { ref, visible } = useReveal();
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		setSuccess(false);
		setError(null);
		const form = e.currentTarget;
		const formData = new FormData(form);
		formData.append("access_key", "b7db5af4-ecfc-44c7-b0cd-7b3ec994a4b2");
		formData.append("subject", "New TheShubhmilan Enquiry");
		formData.append("from_name", "TheShubhmilan Website");
		try {
			const result = await (await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData
			})).json();
			if (result.success) {
				setSuccess(true);
				form.reset();
			} else setError(result.message || "Something went wrong. Please try again.");
		} catch {
			setError("Unable to send enquiry. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "bg-cream py-20 sm:py-28 border-t border-gold/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-5 lg:px-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "LET'S BEGIN",
				title: "Your celebration deserves an invitation as beautiful as the occasion.",
				lead: "Share a few details with us and let's create something memorable together."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref,
				"data-visible": visible,
				className: "reveal mt-12 max-w-3xl mx-auto border border-gold/30 bg-ivory/30 p-8 sm:p-12 shadow-card",
				children: success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-12 flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold font-display text-4xl mb-4",
							children: "✦"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-cocoa font-display text-2xl mb-4",
							children: "Thank you for your enquiry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-brown/80 text-sm max-w-md leading-relaxed mb-8",
							children: "We have received your details and will get in touch with a custom design proposal within one working day."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotanicalOrnament, { className: "opacity-70 mb-8" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappLink(),
							target: "_blank",
							rel: "noreferrer",
							className: "bg-brown text-cream hover:bg-cocoa px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors",
							children: "Message on WhatsApp"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					name: "enquiry",
					method: "POST",
					"data-netlify": "true",
					"netlify-honeypot": "bot-field",
					onSubmit: handleSubmit,
					className: "grid gap-6 sm:grid-cols-2 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "hidden",
							name: "form-name",
							value: "enquiry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Don't fill this out if you're human: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "bot-field" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "Full Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								name: "name",
								required: true,
								placeholder: "e.g. Rahul Sharma",
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "Email Address *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								name: "email",
								required: true,
								placeholder: "name@example.com",
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "WhatsApp Number *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								name: "whatsapp",
								required: true,
								placeholder: "e.g. +91 99999 99999",
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "Wedding Date *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								name: "weddingDate",
								required: true,
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm focus:border-gold focus:outline-none transition-colors"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "Celebration / Event Type *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								name: "eventType",
								required: true,
								placeholder: "e.g. Wedding, Roka, Grah Pravesh",
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "Estimated Guest Count"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								name: "guestCount",
								placeholder: "e.g. 250",
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "Invitation Type *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: "invitationType",
								required: true,
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm focus:border-gold focus:outline-none transition-colors cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										selected: true,
										children: "Select an option"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Digital Invitation",
										children: "Digital Invitation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Video Invitation",
										children: "Video Invitation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Physical Card",
										children: "Physical Card"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Complete Wedding Suite",
										children: "Complete Wedding Suite"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Not Sure Yet",
										children: "Not Sure Yet"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2",
								children: "Message / Tell us about your celebration"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "message",
								rows: 4,
								placeholder: "Share any special motifs, wording preferences or custom ceremonies you'd like to include...",
								className: "bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors resize-none"
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-xs font-body",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2 text-center mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: submitting,
								className: "bg-brown text-cream border border-brown hover:bg-cocoa hover:border-cocoa w-full sm:w-auto px-12 py-4 text-xs font-semibold tracking-[0.25em] uppercase transition-colors cursor-pointer disabled:opacity-50",
								children: submitting ? "SUBMITTING..." : "BEGIN MY ENQUIRY"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[0.65rem] text-taupe mt-4 tracking-wider uppercase",
								children: [
									"Or directly chat via",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: whatsappLink(),
										target: "_blank",
										rel: "noreferrer",
										className: "text-gold hover:underline",
										children: "WhatsApp"
									}),
									" ",
									"· email us at",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `mailto:${brand.email}`,
										className: "text-gold hover:underline",
										children: brand.email
									})
								]
							})]
						})
					]
				})
			})]
		})
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-green-night border-gold/25 border-t py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 text-center lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logoSrc$1,
					alt: `${brand.name} crest`,
					width: 64,
					height: 64,
					className: "border-gold/40 mx-auto h-14 w-14 rounded-full border object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ivory font-display mt-4 text-lg tracking-[0.4em]",
					children: brand.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gold/80 mt-2 text-[0.6rem] tracking-[0.3em] uppercase",
					children: brand.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldDivider, { className: "mt-6" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-ivory/50 mt-6 text-[0.65rem] tracking-[0.2em] uppercase",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						brand.name,
						" · All rights reserved"
					]
				})
			]
		})
	});
}
function ProductModal({ product, onClose }) {
	if (!product) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductModalInner, {
		product,
		onClose
	}, product.id);
}
function ProductModalInner({ product, onClose }) {
	const images = product.images && product.images.length > 0 ? product.images : [product.image, ...product.gallery ?? []].filter(Boolean);
	const [active, setActive] = (0, import_react.useState)(0);
	const features = product.features ?? product.details;
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = previous;
		};
	}, [onClose]);
	const gridColsClass = images.length === 5 ? "grid-cols-5" : images.length === 4 ? "grid-cols-4" : images.length === 3 ? "grid-cols-3" : images.length === 2 ? "grid-cols-2" : "grid-cols-5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": product.title,
		className: "fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			onClick: onClose,
			className: "bg-espresso/70 fixed inset-0 backdrop-blur-sm"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-gold/45 bg-cream relative z-10 my-0 max-h-full w-full max-w-5xl overflow-y-auto border sm:my-8 sm:max-h-[92vh]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				"aria-label": "Close",
				className: "border-gold/50 text-brown hover:bg-brown hover:text-cream bg-cream/90 absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-0 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-beige/40 p-4 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: images[active] ?? product.image,
						alt: product.title,
						className: "h-64 w-full object-cover sm:h-96"
					}), images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-3.5 grid gap-2 sm:gap-2.5 ${gridColsClass}`,
						children: images.map((image, index) => {
							const isSelected = active === index;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActive(index),
								"aria-label": `View image ${index + 1}`,
								"aria-current": isSelected,
								className: `relative aspect-square w-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${isSelected ? "border-brown ring-2 ring-brown/40 shadow-sm opacity-100 scale-[1.02]" : "border-gold/40 opacity-65 hover:border-brown/60 hover:opacity-100"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image,
									alt: "",
									className: "h-full w-full object-cover"
								})
							}, `${image}-${index}`);
						})
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 sm:p-9",
					children: [
						product.collection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gold text-[0.62rem] tracking-[0.4em] uppercase",
							children: product.collection
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-brown mt-3 text-3xl leading-tight",
							children: product.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-taupe mt-4 text-sm leading-relaxed",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule mt-6 h-px w-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-brown mt-6 text-[0.62rem] tracking-[0.32em] uppercase",
							children: "Features"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2.5",
							children: features.map((detail) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-taupe flex gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold",
									children: "✦"
								}), detail]
							}, detail))
						}),
						product.specs?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-brown mt-7 text-[0.62rem] tracking-[0.32em] uppercase",
							children: "Specifications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "border-gold/30 mt-3 divide-y divide-gold/20 border-y",
							children: product.specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[9rem_minmax(0,1fr)] gap-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-brown/70 text-xs tracking-[0.15em] uppercase",
									children: spec.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-taupe text-sm",
									children: spec.value
								})]
							}, spec.label))
						})] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-gold/30 bg-beige/40 border p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-brown text-[0.58rem] tracking-[0.3em] uppercase",
									children: "Delivery"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-taupe mt-2 text-xs leading-relaxed",
									children: product.delivery ?? "Digital designs are delivered as files/links within 2–3 working days of approval. Printed orders are dispatched from Delhi in 8–12 working days after proof approval."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-gold/30 bg-beige/40 border p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-brown text-[0.58rem] tracking-[0.3em] uppercase",
									children: "Customisation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-taupe mt-2 text-xs leading-relaxed",
									children: product.customization ?? "Names, dates, ceremonies, languages, colours and motifs are fully customisable. Share your details on WhatsApp and we send a personalised proof."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-brown font-display mt-7 text-2xl",
							children: product.price
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: whatsappLink(product),
								target: "_blank",
								rel: "noreferrer",
								className: "bg-brown text-cream hover:bg-espresso flex-1 px-6 py-3 text-center text-[0.7rem] tracking-[0.28em] uppercase transition-colors",
								children: "WhatsApp Enquiry"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								onClick: onClose,
								className: "border-brown/45 text-brown hover:bg-beige flex-1 border px-6 py-3 text-center text-[0.7rem] tracking-[0.28em] uppercase transition-colors",
								children: "Enquire Now"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotanicalOrnament, { className: "mt-7 opacity-70" })
					]
				})]
			})]
		})]
	});
}
var logoSrc = "/assets/logo/shubhpatra-logo.jpg";
var links = [
	{
		href: "/#top",
		label: "Home"
	},
	{
		href: "/#about",
		label: "About Us"
	},
	{
		href: "/digital-invite",
		label: "Digital Invitations",
		route: true
	},
	{
		href: "/stationery",
		label: "Stationery",
		route: true
	},
	{
		href: "/#video",
		label: "Video Invitations"
	},
	{
		href: "/physical-cards",
		label: "Physical Cards",
		route: true
	},
	{
		href: "/#contact",
		label: "Contact"
	},
	{
		href: "/admin",
		label: "Admin",
		route: true
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled || open ? "bg-cream/95 shadow-card backdrop-blur" : "bg-transparent"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-rule absolute inset-x-0 bottom-0 h-px opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logoSrc,
							alt: `${brand.name} crest`,
							width: 48,
							height: 48,
							className: "border-gold/50 h-11 w-11 shrink-0 rounded-full border object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brown block truncate font-display text-lg tracking-[0.35em]",
								children: brand.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-taupe hidden text-[0.6rem] tracking-[0.3em] uppercase sm:block",
								children: "Wedding Invitations"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-5 lg:flex",
						children: [links.map((link) => "route" in link && link.route ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.href,
							search: { sub: void 0 },
							className: "text-brown/80 hover:text-gold text-[0.66rem] tracking-[0.2em] uppercase transition-colors",
							children: link.label
						}, link.href) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: link.href,
							className: "text-brown/80 hover:text-gold text-[0.66rem] tracking-[0.2em] uppercase transition-colors",
							children: link.label
						}, link.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappLink(),
							target: "_blank",
							rel: "noreferrer",
							className: "border-brown text-brown hover:bg-brown hover:text-cream border px-5 py-2 text-[0.66rem] tracking-[0.2em] uppercase transition-colors",
							children: "Enquire"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": open ? "Close menu" : "Open menu",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						className: "border-gold/50 text-brown grid h-10 w-10 shrink-0 place-items-center border lg:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-cream border-gold/25 border-t lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col px-5 py-4",
					children: [links.map((link) => "route" in link && link.route ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.href,
						search: { sub: void 0 },
						onClick: () => setOpen(false),
						className: "text-brown/85 hover:text-gold border-gold/15 border-b py-3 text-sm tracking-[0.2em] uppercase last:border-0",
						children: link.label
					}, link.href) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						onClick: () => setOpen(false),
						className: "text-brown/85 hover:text-gold border-gold/15 border-b py-3 text-sm tracking-[0.2em] uppercase last:border-0",
						children: link.label
					}, link.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: whatsappLink(),
						target: "_blank",
						rel: "noreferrer",
						className: "bg-brown text-cream mt-4 py-3 text-center text-xs tracking-[0.25em] uppercase",
						children: "WhatsApp Enquiry"
					})]
				})
			}) : null
		]
	});
}
var emptyCatalogues = {
	digital: [],
	stationery: [],
	cards: [],
	videos: []
};
function categoryId(value) {
	const normalized = value.toLowerCase();
	if (normalized.includes("video")) return "video";
	if (normalized.includes("station")) return "stationery";
	if (normalized.includes("physical") || normalized.includes("card")) return "cards";
	return "digital";
}
function toBaseProduct(product, category) {
	return {
		id: `admin-${product.id}`,
		title: product.title,
		collection: product.collection || "New arrival",
		price: `₹${product.price.toLocaleString("en-IN")}`,
		priceValue: product.price,
		image: product.image,
		images: product.images.length ? product.images : [product.image],
		description: product.description,
		details: product.details.length ? product.details : [product.description, "Personalisation available on request."],
		specs: product.specs.length ? product.specs : [{
			label: "Category",
			value: product.category
		}, ...product.collection ? [{
			label: "Collection",
			value: product.collection
		}] : []],
		...product.delivery ? { delivery: product.delivery } : {},
		...product.customization ? { customization: product.customization } : {},
		category,
		subcategory: "Admin Products",
		tags: [product.category, product.collection].filter(Boolean)
	};
}
function toCatalogues(products) {
	return products.filter((product) => product.isActive).reduce((catalogues, product) => {
		const category = categoryId(product.category);
		const base = toBaseProduct(product, category);
		if (category === "cards") catalogues.cards.push({
			...base,
			category: "cards",
			style: "Custom",
			colour: "Custom",
			material: "Made to order"
		});
		else if (category === "stationery") catalogues.stationery.push(base);
		else if (category === "video") catalogues.videos.push({
			...base,
			category: "video",
			videoUrl: product.videoUrl,
			poster: product.image,
			duration: product.duration || "New",
			orientation: "square"
		});
		else catalogues.digital.push(base);
		return catalogues;
	}, {
		digital: [],
		stationery: [],
		cards: [],
		videos: []
	});
}
/** Loads active MongoDB products for the public catalogue after hydration. */
function useAdminCatalogue() {
	const [catalogues, setCatalogues] = (0, import_react.useState)(emptyCatalogues);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		listPublicProducts().then((products) => {
			if (mounted) setCatalogues(toCatalogues(products));
		}).catch(() => void 0);
		return () => {
			mounted = false;
		};
	}, []);
	return catalogues;
}
//#endregion
export { useReveal as C, useAdminCatalogue as S, whatsappLink as T, hero_invitation_default as _, ProductCard as a, stationerySubcategories as b, SiteFooter as c, categories as d, cn as f, generateDesignSvg as g, digitalSubcategoryDesigns as h, GoldDivider as i, SiteHeader as l, digitalInvitations as m, BotanicalOrnament as n, ProductModal as o, digitalCatalogueGroups as p, Contact as r, SectionHeading as s, ArchFrame as t, brand as u, physicalCards as v, videoInvitations as w, stationerySubcategoryDesigns as x, stationery as y };
