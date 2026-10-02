import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowLeft, r as Search } from "../_libs/lucide-react.mjs";
import { a as ProductCard, g as generateDesignSvg, s as SectionHeading } from "./use-admin-catalogue-CmxhHQf2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue-page-CJ8F2-HK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 25;
function slug(value) {
	return (value ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
/** Stable key identifying a section, even when the same subcategory name repeats under two groups. */
function sectionKey(section) {
	return section.group ? `${slug(section.group)}--${slug(section.subcategory)}` : slug(section.subcategory);
}
function haystackOf(product) {
	const card = product;
	return [
		product.title,
		product.collection,
		product.description,
		product.category,
		product.group,
		product.subcategory,
		card.style,
		card.colour,
		card.occasion,
		...product.tags ?? []
	].filter(Boolean).join(" ").toLowerCase();
}
function CataloguePage({ basePath, categoryLabel, eyebrow, title, lead, sections, getDesigns, activeKey, onOpen }) {
	const activeSection = sections.find((s) => sectionKey(s) === activeKey);
	if (!activeSection) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryGridView, {
		basePath,
		categoryLabel,
		eyebrow,
		title,
		lead,
		sections
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubcategoryCatalogue, {
		basePath,
		categoryLabel,
		section: activeSection,
		designs: getDesigns(activeSection),
		onOpen
	});
}
function CategoryGridView({ basePath, categoryLabel, eyebrow, title, lead, sections }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const section of sections) {
			const key = section.group ?? categoryLabel;
			if (!map.has(key)) map.set(key, []);
			map.get(key).push(section);
		}
		return Array.from(map.entries());
	}, [sections, categoryLabel]);
	const term = query.trim().toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream min-h-screen pt-28 pb-24 sm:pt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow,
					title,
					lead
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "border-gold/45 bg-card mx-auto mt-10 flex max-w-md items-center gap-3 border px-4 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "text-brown/60 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: `Search ${categoryLabel.toLowerCase()} categories…`,
						"aria-label": `Search ${categoryLabel} categories`,
						className: "text-brown placeholder:text-brown/45 w-full bg-transparent text-sm outline-none"
					})]
				}),
				groups.map(([groupLabel, groupSections]) => {
					const visible = groupSections.filter((s) => !term || (s.subcategory + " " + (s.group ?? "")).toLowerCase().includes(term));
					if (visible.length === 0) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14",
						children: [groupLabel !== categoryLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-brown/70 text-center text-[0.65rem] tracking-[0.4em] uppercase",
							children: groupLabel
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
							children: visible.map((section) => {
								const key = sectionKey(section);
								const thumb = generateDesignSvg(`${basePath}-${key}-cover`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: basePath,
									search: { sub: key },
									className: "group border-gold/35 hover:border-gold/70 relative block overflow-hidden border bg-card transition-all duration-500 hover:-translate-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: thumb,
											alt: section.subcategory,
											loading: "lazy",
											className: "h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-48"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "from-espresso via-espresso/25 absolute inset-0 bg-gradient-to-t to-transparent" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-brown text-base leading-snug sm:text-lg",
												children: section.subcategory
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-taupe mt-1 text-[0.62rem] tracking-[0.25em] uppercase",
												children: [25, " designs"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-gold mt-2 inline-block text-[0.6rem] tracking-[0.3em] uppercase",
												children: "Explore →"
											})
										]
									})]
								}, key);
							})
						})]
					}, groupLabel);
				})
			]
		})
	});
}
function SubcategoryCatalogue({ basePath, categoryLabel, section, designs, onOpen }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [shown, setShown] = (0, import_react.useState)(PAGE_SIZE);
	const filtered = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		if (!term) return designs;
		return designs.filter((product) => haystackOf(product).includes(term));
	}, [designs, query]);
	const visible = filtered.slice(0, shown);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream min-h-screen pt-28 pb-24 sm:pt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-5 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: basePath,
					className: "text-taupe hover:text-brown inline-flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Back to Categories"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: `${categoryLabel}${section.group ? ` · ${section.group}` : ""}`,
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: section.subcategory }),
					lead: `Browse every ${section.subcategory} design — search, then load more to see the full catalogue.`,
					className: "mt-6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "border-gold/45 bg-card mx-auto mt-8 flex max-w-md items-center gap-3 border px-4 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "text-brown/60 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: query,
						onChange: (event) => {
							setQuery(event.target.value);
							setShown(PAGE_SIZE);
						},
						placeholder: "Search by name, style, colour, motif…",
						"aria-label": `Search ${section.subcategory} designs`,
						className: "text-brown placeholder:text-brown/45 w-full bg-transparent text-sm outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-brown/60 mt-6 text-center text-xs tracking-[0.2em] uppercase",
					children: [
						"Showing ",
						visible.length,
						" of ",
						filtered.length,
						" designs"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
					children: visible.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
						product,
						onOpen,
						className: "h-full"
					}, product.id))
				}),
				visible.length < filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShown((value) => Math.min(value + PAGE_SIZE, filtered.length)),
						className: "border-brown text-brown hover:bg-brown hover:text-cream border px-10 py-3.5 text-[0.7rem] tracking-[0.3em] uppercase transition-colors",
						children: "Load More Designs"
					})
				}) : null,
				filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-taupe mt-12 text-center text-sm",
					children: [
						"No designs match “",
						query,
						"” yet — try another search term."
					]
				}) : null
			]
		})
	});
}
//#endregion
export { CataloguePage as t };
