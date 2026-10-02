import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CataloguePage, type CatalogueSection } from "@/components/shubhpatra/catalogue-page";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { useAdminCatalogue } from "@/hooks/use-admin-catalogue";
import {
  stationerySubcategories,
  stationerySubcategoryDesigns,
  type BaseProduct,
} from "@/data/products";

const title = "Stationery — TheShubhmilan";
const description =
  "Signages, welcome notes, menus, itineraries, money envelopes, tags and wedding scrolls — browse every design by category.";

export const Route = createFileRoute("/stationery")({
  validateSearch: (search: Record<string, unknown>) => ({
    sub: typeof search["sub"] === "string" ? search["sub"] : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: StationeryPage,
});

const sections: CatalogueSection[] = stationerySubcategories.map((subcategory) => ({
  subcategory,
}));

function StationeryPage() {
  const search = Route.useSearch();
  const sub = search["sub"];
  const [product, setProduct] = useState<BaseProduct | null>(null);
  const adminProducts = useAdminCatalogue();
  const catalogueSections = adminProducts.stationery.length
    ? [...sections, { group: "New Arrivals", subcategory: "Admin Products" }]
    : sections;

  return (
    <div className="bg-ivory min-h-screen">
      <SiteHeader />
      <main>
        <CataloguePage
          basePath="/stationery"
          categoryLabel="Stationery"
          eyebrow="Stationery"
          title={
            <>
              Day-of details, <span className="font-display italic">by category</span>
            </>
          }
          lead="Signages, welcome notes, menus, envelopes and scrolls — pick a category to see every design."
          sections={catalogueSections}
          getDesigns={(section) =>
            section.subcategory === "Admin Products"
              ? adminProducts.stationery
              : stationerySubcategoryDesigns(section.subcategory)
          }
          activeKey={sub}
          onOpen={setProduct}
        />
        <Contact />
      </main>
      <SiteFooter />
      <ProductModal product={product} onClose={() => setProduct(null)} />
    </div>
  );
}
