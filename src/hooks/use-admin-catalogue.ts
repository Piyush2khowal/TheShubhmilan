import { useEffect, useState } from "react";

import type { BaseProduct, CardProduct, CategoryId, VideoProduct } from "@/data/products";
import { listPublicProducts, type AdminProduct } from "@/lib/product.server";

type AdminCatalogues = {
  digital: BaseProduct[];
  stationery: BaseProduct[];
  cards: CardProduct[];
  videos: VideoProduct[];
};

const emptyCatalogues: AdminCatalogues = { digital: [], stationery: [], cards: [], videos: [] };

function categoryId(value: string): Extract<CategoryId, "digital" | "stationery" | "cards" | "video"> {
  const normalized = value.toLowerCase();
  if (normalized.includes("video")) return "video";
  if (normalized.includes("station")) return "stationery";
  if (normalized.includes("physical") || normalized.includes("card")) return "cards";
  return "digital";
}

function toBaseProduct(product: AdminProduct, category: CategoryId): BaseProduct {
  return {
    id: `admin-${product.id}`,
    title: product.title,
    collection: product.collection || "New arrival",
    price: `₹${product.price.toLocaleString("en-IN")}`,
    priceValue: product.price,
    image: product.image,
    images: product.images.length ? product.images : [product.image],
    description: product.description,
    details: product.details.length ? product.details : [product.description, "Personalisation available on request."],
    specs: product.specs.length
      ? product.specs
      : [
          { label: "Category", value: product.category },
          ...(product.collection ? [{ label: "Collection", value: product.collection }] : []),
        ],
    ...(product.delivery ? { delivery: product.delivery } : {}),
    ...(product.customization ? { customization: product.customization } : {}),
    category,
    subcategory: "Admin Products",
    tags: [product.category, product.collection].filter(Boolean),
  };
}

function toCatalogues(products: AdminProduct[]): AdminCatalogues {
  return products.filter((product) => product.isActive).reduce<AdminCatalogues>((catalogues, product) => {
    const category = categoryId(product.category);
    const base = toBaseProduct(product, category);

    if (category === "cards") {
      catalogues.cards.push({
        ...base,
        category: "cards",
        style: "Custom",
        colour: "Custom",
        material: "Made to order",
      });
    } else if (category === "stationery") {
      catalogues.stationery.push(base);
    } else if (category === "video") {
      catalogues.videos.push({
        ...base,
        category: "video",
        videoUrl: product.videoUrl,
        poster: product.image,
        duration: product.duration || "New",
        orientation: "square",
      });
    } else {
      catalogues.digital.push(base);
    }
    return catalogues;
  }, { digital: [], stationery: [], cards: [], videos: [] });
}

/** Loads active MongoDB products for the public catalogue after hydration. */
export function useAdminCatalogue() {
  const [catalogues, setCatalogues] = useState<AdminCatalogues>(emptyCatalogues);

  useEffect(() => {
    let mounted = true;
    void listPublicProducts()
      .then((products) => {
        if (mounted) setCatalogues(toCatalogues(products));
      })
      // Curated products remain visible if MongoDB is temporarily unavailable.
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, []);

  return catalogues;
}
