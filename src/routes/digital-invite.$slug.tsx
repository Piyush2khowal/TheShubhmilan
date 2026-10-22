import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { SubcategoryCatalogue, type CatalogueSection } from "@/components/shubhpatra/catalogue-page";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { toBaseProduct } from "@/hooks/use-admin-catalogue";
import { listPublicProducts, type AdminProduct } from "@/lib/product.server";
import { digitalSubcategoryDesigns, type BaseProduct } from "@/data/products";

export const Route = createFileRoute("/digital-invite/$slug")({
  head: ({ params }) => {
    const formatted = (params.slug || "Collection")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${formatted} — Digital Invitations | The Shubhmilan` },
        {
          name: "description",
          content: `Browse our curated collection of ${formatted} digital wedding invitations.`,
        },
      ],
    };
  },
  component: DigitalInviteSubcategoryPage,
});

function DigitalInviteSubcategoryPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<BaseProduct | null>(null);
  const [dbProducts, setDbProducts] = useState<AdminProduct[] | null>(null);

  useEffect(() => {
    let mounted = true;
    void listPublicProducts({ data: { categorySlug: slug } })
      .then((items) => {
        if (mounted && Array.isArray(items)) {
          setDbProducts(items);
        }
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, [slug]);

  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const section: CatalogueSection = {
    group: "Wedding Invitation PDF",
    subcategory: formattedTitle,
    slug,
  };

  const designs: BaseProduct[] =
    dbProducts && dbProducts.length > 0
      ? dbProducts.map(toBaseProduct)
      : digitalSubcategoryDesigns("Wedding Invitation PDF", formattedTitle);

  return (
    <div className="bg-ivory min-h-screen">
      <SiteHeader />
      <main>
        <SubcategoryCatalogue
          basePath="/digital-invite"
          categoryLabel="Digital Invitations"
          section={section}
          designs={designs}
          onOpen={setProduct}
        />
        <Contact />
      </main>
      <SiteFooter />
      <ProductModal product={product} onClose={() => setProduct(null)} />
    </div>
  );
}
