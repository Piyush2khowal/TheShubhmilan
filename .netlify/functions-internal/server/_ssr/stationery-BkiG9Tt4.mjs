import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as Route } from "./router-DhRtu1Xg.mjs";
import { S as useAdminCatalogue, b as stationerySubcategories, c as SiteFooter, l as SiteHeader, o as ProductModal, r as Contact, x as stationerySubcategoryDesigns } from "./use-admin-catalogue-CmxhHQf2.mjs";
import { t as CataloguePage } from "./catalogue-page-CJ8F2-HK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stationery-BkiG9Tt4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sections = stationerySubcategories.map((subcategory) => ({ subcategory }));
function StationeryPage() {
	const sub = Route.useSearch()["sub"];
	const [product, setProduct] = (0, import_react.useState)(null);
	const adminProducts = useAdminCatalogue();
	const catalogueSections = adminProducts.stationery.length ? [...sections, {
		group: "New Arrivals",
		subcategory: "Admin Products"
	}] : sections;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ivory min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CataloguePage, {
				basePath: "/stationery",
				categoryLabel: "Stationery",
				eyebrow: "Stationery",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Day-of details, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display italic",
					children: "by category"
				})] }),
				lead: "Signages, welcome notes, menus, envelopes and scrolls — pick a category to see every design.",
				sections: catalogueSections,
				getDesigns: (section) => section.subcategory === "Admin Products" ? adminProducts.stationery : stationerySubcategoryDesigns(section.subcategory),
				activeKey: sub,
				onOpen: setProduct
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
export { StationeryPage as component };
