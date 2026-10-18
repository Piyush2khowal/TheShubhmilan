export const fallbackImage =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80";

export function slugify(text: string): string {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function matchStationerySubcategory(
  product: {
    subcategory?: string;
    category?: string;
    categoryName?: string;
    type?: string;
    categoryId?: string;
  },
  targetSlugOrName: string,
): boolean {
  if (product.type && product.type !== "stationery") {
    return false;
  }
  const targetSlug = slugify(targetSlugOrName);
  const targetName = targetSlugOrName.trim().toLowerCase();

  const sub = product.subcategory || product.categoryName || product.category || "";
  const subSlug = slugify(sub);
  const subName = sub.trim().toLowerCase();

  if (
    subSlug === targetSlug ||
    subName === targetName ||
    (product.categoryId ? slugify(product.categoryId) === targetSlug : false)
  ) {
    return true;
  }

  // Handle singular/plural variations (e.g., "signages" vs "signage")
  const normalize = (s: string) => s.replace(/signages/g, "signage");
  if (normalize(subSlug) === normalize(targetSlug)) {
    return true;
  }

  return false;
}

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  type: "category" | "subcategory";
  parentId: string | null;
  parentName?: string;
  description: string;
  image: string;
  active: boolean;
  displayOrder: number;
  isDeleted?: boolean;
  productCount?: number;
  createdAt?: string;
  updatedAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  title: string;
  slug: string;
  type: string;
  categoryId: string;
  categoryName?: string;
  parentId?: string | null;
  parentCategoryName?: string;
  category: string;
  collection: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  gallery: string[];
  details: string[];
  specs: { label: string; value: string }[];
  delivery: string;
  customization: string;
  active: boolean;
  isActive: boolean;
  featured: boolean;
  displayOrder: number;
  videoUrl: string;
  duration: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt: string;
};
