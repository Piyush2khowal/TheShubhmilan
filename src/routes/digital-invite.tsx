import { createFileRoute, Outlet, useChildMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import {
  CataloguePage,
  type CatalogueSection,
} from "@/components/shubhpatra/catalogue-page";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { useAdminCatalogue, useCatalogueTree } from "@/hooks/use-admin-catalogue";
import {
  digitalCatalogueGroups,
  digitalSubcategoryDesigns,
  type BaseProduct,
} from "@/data/products";
import { slugify } from "@/lib/product.shared";

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
  component: DigitalInviteWrapper,
});

function DigitalInviteWrapper() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) {
    return <Outlet />;
  }
  return <DigitalInvitePage />;
}

function DigitalInvitePage() {
  const search = Route.useSearch();
  const sub = search["sub"];
  const [product, setProduct] = useState<BaseProduct | null>(null);

  const { tree } = useCatalogueTree();
  const adminCatalogue = useAdminCatalogue();

  // Build sections from MongoDB catalogue tree, falling back to static groups
  const sections: CatalogueSection[] = useMemo(() => {
    const digitalRoot = tree?.categories.find(
      (c) => c.slug === "digital-invite" || c.name.toLowerCase().includes("digital"),
    );

    if (digitalRoot && digitalRoot.subcategories.length > 0) {
      return digitalRoot.subcategories.map((sc) => ({
        group: digitalRoot.name,
        subcategory: sc.name,
        slug: sc.slug,
        image: sc.image,
        count: sc.productCount,
        href: `/digital-invite/${sc.slug}`,
      }));
    }

    // Static fallback: ONE combined card per subcategory (Save the Date, Roka Ceremony, Engagement, etc.)
    return digitalCatalogueGroups.flatMap((g) =>
      g.subcategories.map((subcategory) => {
        const slug = slugify(subcategory);
        const count = subcategory === "Save the Date" ? 10 : 1;
        return {
          group: g.group,
          subcategory,
          slug,
          count,
          href: `/digital-invite/${slug}`,
        };
      }),
    );
  }, [tree]);

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
          sections={sections}
          getDesigns={(section) => {
            // Find in admin catalogue if available
            const matchingAdmin = adminCatalogue.digital.filter(
              (p) =>
                slugify(p.subcategory) === (section.slug || slugify(section.subcategory)) ||
                p.subcategory.toLowerCase() === section.subcategory.toLowerCase(),
            );
            if (matchingAdmin.length > 0) return matchingAdmin;
            return digitalSubcategoryDesigns(section.group ?? "", section.subcategory);
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
