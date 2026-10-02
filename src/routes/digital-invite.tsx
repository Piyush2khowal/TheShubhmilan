import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CataloguePage, type CatalogueSection } from "@/components/shubhpatra/catalogue-page";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { useAdminCatalogue } from "@/hooks/use-admin-catalogue";
import {
  digitalCatalogueGroups,
  digitalSubcategoryDesigns,
  type BaseProduct,
} from "@/data/products";

const title = "Digital Invitations — TheShubhmilan";
const description =
  "Wedding invitation PDFs, path & pooja, kids celebrations and digital stationery — browse every design by category.";

export const Route = createFileRoute("/digital-invite")({
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
  component: DigitalInvitePage,
});

const sections: CatalogueSection[] = digitalCatalogueGroups.flatMap((g) =>
  g.subcategories.map((subcategory) => ({ group: g.group, subcategory })),
);

function DigitalInvitePage() {
  const search = Route.useSearch();
  const sub = search["sub"];
  const [product, setProduct] = useState<BaseProduct | null>(null);
  const adminProducts = useAdminCatalogue();
  const catalogueSections = adminProducts.digital.length
    ? [...sections, { group: "New Arrivals", subcategory: "Admin Products" }]
    : sections;

  return (
    <div className="bg-ivory min-h-screen">
      <SiteHeader />
      <main>
        <CataloguePage
          basePath="/digital-invite"
          categoryLabel="Digital Invitations"
          eyebrow="Digital Invitations"
          title={
            <>
              Choose your <span className="font-display italic">celebration</span>
            </>
          }
          lead="From save-the-dates to path & pooja and kids' celebrations — pick a category to see every design."
          sections={catalogueSections}
          getDesigns={(section) =>
            section.subcategory === "Admin Products"
              ? adminProducts.digital
              : digitalSubcategoryDesigns(section.group ?? "", section.subcategory)
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
