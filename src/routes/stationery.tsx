import { createFileRoute, Outlet, useChildMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { CataloguePage, type CatalogueSection } from "@/components/shubhpatra/catalogue-page";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { useAdminCatalogue, useCatalogueTree } from "@/hooks/use-admin-catalogue";
import {
  stationerySubcategories,
  stationerySubcategoryDesigns,
  type BaseProduct,
} from "@/data/products";
import { slugify } from "@/lib/product.shared";

const title = "Stationery — The Shubhmilan";
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
  component: StationeryWrapper,
});

function StationeryWrapper() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) {
    return <Outlet />;
  }
  return <StationeryPage />;
}

function StationeryPage() {
  const search = Route.useSearch();
  const sub = search["sub"];
  const [product, setProduct] = useState<BaseProduct | null>(null);

  const { tree } = useCatalogueTree();
  const adminCatalogue = useAdminCatalogue();

  const sections: CatalogueSection[] = useMemo(() => {
    const stationeryRoot = tree?.categories.find(
      (c) => c.slug === "stationery" || c.name.toLowerCase().includes("stationery"),
    );

    if (stationeryRoot && stationeryRoot.subcategories.length > 0) {
      return stationeryRoot.subcategories.map((sc) => ({
        group: "Stationery",
        subcategory: sc.name,
        slug: sc.slug,
        image: sc.image,
        count: sc.productCount,
        href: `/stationery/${sc.slug}`,
      }));
    }

    return stationerySubcategories.map((subcategory) => {
      const slug = slugify(subcategory);
      return {
        group: "Stationery",
        subcategory,
        slug,
        count: 1,
        href: `/stationery/${slug}`,
      };
    });
  }, [tree]);

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
          sections={sections}
          getDesigns={(section) => {
            const matchingAdmin = adminCatalogue.stationery.filter(
              (p) =>
                slugify(p.subcategory) === (section.slug || slugify(section.subcategory)) ||
                p.subcategory.toLowerCase() === section.subcategory.toLowerCase(),
            );
            if (matchingAdmin.length > 0) return matchingAdmin;
            return stationerySubcategoryDesigns(section.subcategory);
          }}
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
