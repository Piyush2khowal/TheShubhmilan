import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as Search } from "../_libs/lucide-react.mjs";
import { S as useAdminCatalogue, a as ProductCard, c as SiteFooter, l as SiteHeader, o as ProductModal, r as Contact, s as SectionHeading, v as physicalCards } from "./use-admin-catalogue-CmxhHQf2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/physical-cards-CVe5IuST.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PhysicalCardsPage() {
	const [product, setProduct] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const catalogueCards = [...useAdminCatalogue().cards, ...physicalCards];
	const filtered = (0, import_react.useMemo)(() => {
		const term = query.trim().toLowerCase();
		if (!term) return catalogueCards;
		return catalogueCards.filter((card) => {
			return [
				card.title,
				card.collection,
				card.description,
				card.style,
				card.colour,
				card.material,
				...card.tags ?? []
			].filter(Boolean).join(" ").toLowerCase().includes(term);
		});
	}, [catalogueCards, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ivory min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-cream min-h-screen pt-28 pb-24 sm:pt-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-5 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Physical Cards",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["The printed ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display italic",
								children: "heirloom catalogue"
							})] }),
							lead: "Velvet boxes, laser-cut jaali, hot foil and handmade paper — explore our collection of 25 bespoke printed invitation cards."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "border-gold/45 bg-card mx-auto mt-8 flex max-w-md items-center gap-3 border px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "text-brown/60 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "search",
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search physical cards by name, material, style…",
								"aria-label": "Search physical cards",
								className: "text-brown placeholder:text-brown/45 w-full bg-transparent text-sm outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-brown/60 mt-6 text-center text-xs tracking-[0.2em] uppercase",
							children: [
								"Showing ",
								filtered.length,
								" of ",
								catalogueCards.length,
								" designs"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
							children: filtered.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
								product: card,
								onOpen: setProduct,
								className: "h-full"
							}, card.id))
						}),
						filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-taupe mt-12 text-center text-sm",
							children: [
								"No cards match “",
								query,
								"” yet — try another search term."
							]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductModal, {
				product,
				onClose: () => setProduct(null)
			})
		]
	});
}
//#endregion
export { PhysicalCardsPage as component };
