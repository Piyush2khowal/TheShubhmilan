import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as Route$2 } from "./router-DhRtu1Xg.mjs";
import { S as useAdminCatalogue, c as SiteFooter, h as digitalSubcategoryDesigns, l as SiteHeader, o as ProductModal, p as digitalCatalogueGroups, r as Contact } from "./use-admin-catalogue-CmxhHQf2.mjs";
import { t as CataloguePage } from "./catalogue-page-CJ8F2-HK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/digital-invite-CdESL0kC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sections = digitalCatalogueGroups.flatMap((g) => g.subcategories.map((subcategory) => ({
	group: g.group,
	subcategory
})));
function DigitalInvitePage() {
	const sub = Route$2.useSearch()["sub"];
	const [product, setProduct] = (0, import_react.useState)(null);
	const adminProducts = useAdminCatalogue();
	const catalogueSections = adminProducts.digital.length ? [...sections, {
		group: "New Arrivals",
		subcategory: "Admin Products"
	}] : sections;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ivory min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CataloguePage, {
				basePath: "/digital-invite",
				categoryLabel: "Digital Invitations",
				eyebrow: "Digital Invitations",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Choose your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display italic",
					children: "celebration"
				})] }),
				lead: "From save-the-dates to path & pooja and kids' celebrations — pick a category to see every design.",
				sections: catalogueSections,
				getDesigns: (section) => section.subcategory === "Admin Products" ? adminProducts.digital : digitalSubcategoryDesigns(section.group ?? "", section.subcategory),
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
export { DigitalInvitePage as component };
