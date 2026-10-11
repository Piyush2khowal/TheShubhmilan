import { useEffect, useState } from "react";

import type { BaseProduct, CardProduct, CategoryId, VideoProduct } from "@/data/products";
import {
  listPublicCatalogueTree,
  listPublicProducts,
  type AdminProduct,
} from "@/lib/product.server";

type AdminCatalogues = {
  digital: BaseProduct[];
  stationery: BaseProduct[];
  cards: CardProduct[];
  videos: VideoProduct[];
  all: BaseProduct[];
};

const emptyCatalogues: AdminCatalogues = {
  digital: [],
  stationery: [],
  cards: [],
  videos: [],
  all: [],
};

function categoryId(product: AdminProduct): Extract<CategoryId, "digital" | "stationery" | "cards" | "video"> {
  const normalized = (product.type || product.category || "").toLowerCase();
  if (normalized.includes("video") || Boolean(product.videoUrl)) return "video";
  if (normalized.includes("station")) return "stationery";
  if (normalized.includes("physical") || normalized.includes("card")) return "cards";
  return "digital";
}

export function toBaseProduct(product: AdminProduct): BaseProduct {
  const cat = categoryId(product);
  const images =
    product.gallery?.length ? product.gallery : product.images?.length ? product.images : [product.image];

  return {
    id: product.id,
    title: product.name || product.title,
    collection: product.collection || "Bespoke Collection",
    price: `₹${product.price.toLocaleString("en-IN")}`,
    priceValue: product.price,
    image: product.image || images[0] || "",
    images,
    gallery: images,
    description: product.description,
    details: product.details?.length
      ? product.details
      : [product.description, "Personalisation available on request."],
    features: product.details?.length ? product.details : undefined,
    specs: product.specs?.length
      ? product.specs
      : [
          { label: "Category", value: product.category || product.categoryName || "Invitation" },
          ...(product.collection ? [{ label: "Collection", value: product.collection }] : []),
        ],
    ...(product.delivery ? { delivery: product.delivery } : {}),
    ...(product.customization ? { customization: product.customization } : {}),
    category: cat,
    subcategory: product.categoryName || product.category || "Design",
    tags: [product.category, product.categoryName, product.collection, product.slug].filter(
      Boolean,
    ) as string[],
  };
}

function toCatalogues(products: AdminProduct[]): AdminCatalogues {
  const result: AdminCatalogues = {
    digital: [],
    stationery: [],
    cards: [],
    videos: [],
    all: [],
  };

  for (const product of products) {
    if (!product.active && !product.isActive) continue;
    const cat = categoryId(product);
    const base = toBaseProduct(product);
    result.all.push(base);

    if (cat === "cards") {
      result.cards.push({
        ...base,
        category: "cards",
        style: "Bespoke",
        colour: "Ivory & Gold",
        material: "Handcrafted Cotton & Foil",
      });
    } else if (cat === "stationery") {
      result.stationery.push(base);
    } else if (cat === "video") {
      result.videos.push({
        ...base,
        category: "video",
        videoUrl: product.videoUrl,
        poster: product.image,
        duration: product.duration || "0:45",
        orientation: "square",
      });
    } else {
      result.digital.push(base);
    }
  }

  return result;
}

/** Loads active MongoDB products for the public catalogue. */
export function useAdminCatalogue() {
  const [catalogues, setCatalogues] = useState<AdminCatalogues>(emptyCatalogues);

  useEffect(() => {
    let mounted = true;
    void listPublicProducts()
      .then((products) => {
        if (mounted && Array.isArray(products)) {
          setCatalogues(toCatalogues(products));
        }
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  return catalogues;
}

/** Loads public hierarchy category tree (categories + subcategories + counts). */
export function useCatalogueTree() {
  const [tree, setTree] = useState<Awaited<ReturnType<typeof listPublicCatalogueTree>> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    void listPublicCatalogueTree()
      .then((data) => {
        if (mounted) {
          setTree(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { tree, loading };
}
