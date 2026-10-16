import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import {
  SubcategoryCatalogue,
  type CatalogueSection,
} from "@/components/shubhpatra/catalogue-page";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { toBaseProduct, useAdminCatalogue, useCatalogueTree } from "@/hooks/use-admin-catalogue";
import { listPublicProducts, type AdminProduct } from "@/lib/product.server";
import {
  stationerySubcategories,
  stationerySubcategoryDesigns,
  type BaseProduct,
} from "@/data/products";
import { topUpSubcategory } from "@/data/design-generator";
import { slugify } from "@/lib/product.shared";

function formatFallbackTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const Route = createFileRoute("/stationery/$slug")({
  head: ({ params }) => {
    const rawSlug = params.slug || "";
    const matchedStatic = stationerySubcategories.find((s) => slugify(s) === rawSlug);
    const formatted = matchedStatic || formatFallbackTitle(rawSlug || "Collection");

    return {
      meta: [
        { title: `${formatted} — Stationery | TheShubhmilan` },
        {
          name: "description",
          content: `Browse our curated collection of ${formatted} wedding stationery designs.`,
        },
        { property: "og:title", content: `${formatted} — Stationery | TheShubhmilan` },
        {
          property: "og:description",
          content: `Browse our curated collection of ${formatted} wedding stationery designs.`,
        },
      ],
    };
  },
  component: StationerySubcategoryPage,
});

function StationerySubcategoryPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<BaseProduct | null>(null);
  const [dbProducts, setDbProducts] = useState<AdminProduct[] | null>(null);

  const { tree } = useCatalogueTree();
  const adminCatalogue = useAdminCatalogue();

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

  // Resolve canonical subcategory metadata
  const stationeryRoot = useMemo(() => {
    return tree?.categories.find(
      (c) => c.slug === "stationery" || c.name.toLowerCase().includes("stationery"),
    );
  }, [tree]);

  const matchedTreeSub = useMemo(() => {
    return stationeryRoot?.subcategories.find(
      (sc) => sc.slug === slug || slugify(sc.name) === slug,
    );
  }, [stationeryRoot, slug]);

  const matchedStaticSub = useMemo(() => {
    return stationerySubcategories.find((s) => slugify(s) === slug);
  }, [slug]);

  const canonicalTitle = matchedTreeSub?.name || matchedStaticSub || formatFallbackTitle(slug);

  const section: CatalogueSection = useMemo(
    () => ({
      group: "Stationery",
      subcategory: canonicalTitle,
      slug,
      image: matchedTreeSub?.image,
    }),
    [canonicalTitle, slug, matchedTreeSub?.image],
  );

  const designs: BaseProduct[] = useMemo(() => {
    // 1. If direct DB query returned matching products for this category slug
    if (dbProducts && dbProducts.length > 0) {
      const dbBase = dbProducts.map(toBaseProduct);
      return topUpSubcategory(dbBase, {
        category: "stationery",
        subcategory: canonicalTitle,
        basePrice: 220,
        titleSuffix: "Design",
      });
    }

    // 2. If admin catalogue has matching stationery items for this subcategory
    const matchingAdmin = adminCatalogue.stationery.filter(
      (p) =>
        slugify(p.subcategory) === slug ||
        p.subcategory.toLowerCase() === canonicalTitle.toLowerCase(),
    );

    if (matchingAdmin.length > 0) {
      return topUpSubcategory(matchingAdmin, {
        category: "stationery",
        subcategory: canonicalTitle,
        basePrice: 220,
        titleSuffix: "Design",
      });
    }

    // 3. Fall back to curated stationery design topped up to full subcategory catalogue
    return stationerySubcategoryDesigns(canonicalTitle);
  }, [dbProducts, adminCatalogue.stationery, slug, canonicalTitle]);

  return (
    <div className="bg-ivory min-h-screen">
      <SiteHeader />
      <main>
        <SubcategoryCatalogue
          basePath="/stationery"
          categoryLabel="Stationery"
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
