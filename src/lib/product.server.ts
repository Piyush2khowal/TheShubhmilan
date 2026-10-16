import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export { fallbackImage, slugify, type AdminCategory, type AdminProduct } from "./product.shared";

/* ------------------------------------------------------------------ */
/* AUTH & VALIDATORS                                                  */
/* ------------------------------------------------------------------ */

const credentialsInput = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

const imageUrl = z.string().trim().url("Enter a valid image URL.").or(z.literal(""));

const specificationInput = z.object({
  label: z.string().trim().max(50),
  value: z.string().trim().max(120),
});

const categoryInput = z.object({
  name: z.string().trim().min(2, "Enter a category name.").max(100),
  slug: z.string().trim().max(100).optional().default(""),
  type: z.enum(["category", "subcategory"]).default("category"),
  parentId: z.string().trim().nullable().optional().default(null),
  description: z.string().trim().max(500).default(""),
  image: imageUrl.default(""),
  active: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

const productInput = z.object({
  name: z.string().trim().min(2, "Enter a product name.").max(150).optional(),
  title: z.string().trim().min(2, "Enter a product name.").max(150).optional(),
  slug: z.string().trim().max(150).optional().default(""),
  type: z.string().trim().max(50).default("digital"),
  categoryId: z.string().trim().nullable().optional().default(null),
  parentId: z.string().trim().nullable().optional().default(null),
  category: z.string().trim().max(100).default("Digital Invitation"),
  collection: z.string().trim().max(100).default(""),
  price: z.number().nonnegative("Price cannot be negative.").default(0),
  description: z.string().trim().min(5, "Add a description.").max(1200),
  image: imageUrl.default(""),
  images: z.array(imageUrl).max(10).default([]),
  gallery: z.array(imageUrl).max(10).default([]),
  details: z.array(z.string().trim().max(250)).max(12).default([]),
  specs: z.array(specificationInput).max(10).default([]),
  delivery: z.string().trim().max(500).default(""),
  customization: z.string().trim().max(500).default(""),
  active: z.boolean().default(true),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  videoUrl: z.string().trim().url("Enter a valid video URL.").or(z.literal("")).default(""),
  duration: z.string().trim().max(30).default(""),
});

/* ------------------------------------------------------------------ */
/* ADMIN AUTH SERVER FUNCTIONS                                        */
/* ------------------------------------------------------------------ */

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSession: getSession } = await import("./admin-auth.server");
  return getSession();
});

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(credentialsInput)
  .handler(async ({ data }) => {
    const { createAdminSession, verifyAdminCredentials } = await import("./admin-auth.server");
    if (!verifyAdminCredentials(data.username, data.password)) {
      throw new Error("Invalid username or password.");
    }
    createAdminSession(data.username);
    return { username: data.username };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { clearAdminSession } = await import("./admin-auth.server");
  clearAdminSession();
});

/* ------------------------------------------------------------------ */
/* PUBLIC CATALOGUE SERVER FUNCTIONS                                  */
/* ------------------------------------------------------------------ */

export const listPublicCatalogueTree = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getCatalogueTree } = await import("./catalogue-model.server");
    const tree = await getCatalogueTree();
    if (tree.categories.length > 0) return tree;
  } catch {
    // If DB is offline or empty, use fallback below
  }

  // Graceful fallback from static definitions
  const { digitalCatalogueGroups, stationerySubcategories } = await import("@/data/products");
  const { slugify } = await import("./product.shared");

  return {
    categories: [
      {
        id: "digital-invite",
        name: "Digital Invitations",
        slug: "digital-invite",
        description: "Wedding invitation PDFs, path & pooja, kids celebrations and digital stationery.",
        image: "",
        displayOrder: 1,
        subcategories: digitalCatalogueGroups.flatMap((g) =>
          g.subcategories.map((sub, i) => ({
            id: `sub-${slugify(sub)}`,
            name: sub,
            slug: slugify(sub),
            description: `${sub} designs`,
            image: "",
            displayOrder: i + 1,
            productCount: sub === "Save the Date" ? 10 : 1,
          })),
        ),
      },
      {
        id: "stationery",
        name: "Stationery",
        slug: "stationery",
        description:
          "Signages, welcome notes, menus, itineraries, money envelopes, tags and wedding scrolls.",
        image: "",
        displayOrder: 2,
        subcategories: stationerySubcategories.map((sub, i) => ({
          id: `sub-${slugify(sub)}`,
          name: sub,
          slug: slugify(sub),
          description: `${sub} designs`,
          image: "",
          displayOrder: i + 1,
          productCount: 1,
        })),
      },
    ],
  };
});

export const listPublicProducts = createServerFn({ method: "GET" })
  .validator(
    z
      .object({
        categorySlug: z.string().optional(),
        categoryId: z.string().optional(),
        type: z.string().optional(),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    try {
      const { listActiveProducts } = await import("./catalogue-model.server");
      const products = await listActiveProducts(data);
      if (products.length > 0) return products;
    } catch {
      // Catch DB offline, fallback to static products
    }

    // Static fallback
    const { digitalInvitations, stationery, physicalCards, videoInvitations } = await import("@/data/products");
    const { slugify, fallbackImage } = await import("./product.shared");

    const all = [
      ...digitalInvitations.map((p, index) => ({
        id: p.id,
        name: p.title,
        title: p.title,
        slug: slugify(p.title || p.id),
        type: "digital",
        categoryId: slugify(p.subcategory || "digital"),
        categoryName: p.subcategory || "Digital Invitation",
        category: p.subcategory || "Digital Invitation",
        collection: p.collection || "",
        price: p.priceValue || 1299,
        description: p.description || "",
        image: p.image || fallbackImage,
        images: p.images || [p.image || fallbackImage],
        gallery: p.images || [p.image || fallbackImage],
        details: p.details || [],
        specs: p.specs || [],
        delivery: p.delivery || "",
        customization: p.customization || "",
        active: true,
        isActive: true,
        featured: index < 4,
        displayOrder: index + 1,
        videoUrl: "",
        duration: "",
        updatedAt: new Date().toISOString(),
      })),
      ...stationery.map((p, index) => ({
        id: p.id,
        name: p.title,
        title: p.title,
        slug: slugify(p.title || p.id),
        type: "stationery",
        categoryId: slugify(p.subcategory || "stationery"),
        categoryName: p.subcategory || "Stationery",
        category: p.subcategory || "Stationery",
        collection: p.collection || "",
        price: p.priceValue || 499,
        description: p.description || "",
        image: p.image || fallbackImage,
        images: p.images || [p.image || fallbackImage],
        gallery: p.images || [p.image || fallbackImage],
        details: p.details || [],
        specs: p.specs || [],
        delivery: p.delivery || "",
        customization: p.customization || "",
        active: true,
        isActive: true,
        featured: false,
        displayOrder: index + 1,
        videoUrl: "",
        duration: "",
        updatedAt: new Date().toISOString(),
      })),
      ...videoInvitations.map((p, index) => ({
        id: p.id,
        name: p.title,
        title: p.title,
        slug: slugify(p.title || p.id),
        type: "video",
        categoryId: "video-invitations",
        categoryName: "Video Invitations",
        category: "Video Invitations",
        collection: p.collection || "",
        price: p.priceValue || 1999,
        description: p.description || "",
        image: p.poster || fallbackImage,
        images: [p.poster || fallbackImage],
        gallery: [p.poster || fallbackImage],
        details: p.details || [],
        specs: p.specs || [],
        delivery: p.delivery || "",
        customization: p.customization || "",
        active: true,
        isActive: true,
        featured: false,
        displayOrder: index + 1,
        videoUrl: p.videoUrl || "",
        duration: p.duration || "",
        updatedAt: new Date().toISOString(),
      })),
      ...physicalCards.map((p, index) => ({
        id: p.id,
        name: p.title,
        title: p.title,
        slug: slugify(p.title || p.id),
        type: "cards",
        categoryId: "physical-cards",
        categoryName: "Physical Cards",
        category: "Physical Cards",
        collection: p.collection || "",
        price: p.priceValue || 2499,
        description: p.description || "",
        image: p.image || fallbackImage,
        images: p.images || [p.image || fallbackImage],
        gallery: p.images || [p.image || fallbackImage],
        details: p.details || [],
        specs: p.specs || [],
        delivery: p.delivery || "",
        customization: p.customization || "",
        active: true,
        isActive: true,
        featured: false,
        displayOrder: index + 1,
        videoUrl: "",
        duration: "",
        updatedAt: new Date().toISOString(),
      })),
    ];

    if (data?.categorySlug) {
      const slugMatch = slugify(data.categorySlug);
      return all.filter(
        (p) =>
          slugify(p.categoryName) === slugMatch ||
          slugify(p.categoryId) === slugMatch ||
          slugify(p.type) === slugMatch,
      );
    }

    if (data?.type) {
      return all.filter((p) => p.type === data.type);
    }

    return all;
  });

/* ------------------------------------------------------------------ */
/* ADMIN CATEGORY SERVER FUNCTIONS                                    */
/* ------------------------------------------------------------------ */

export const listAdminCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./admin-auth.server");
  requireAdmin();
  const { listCategories } = await import("./catalogue-model.server");
  return listCategories();
});

export const createAdminCategory = createServerFn({ method: "POST" })
  .validator(categoryInput)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { createCategory } = await import("./catalogue-model.server");
    return createCategory(data);
  });

export const updateAdminCategory = createServerFn({ method: "POST" })
  .validator(categoryInput.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { id, ...values } = data;
    const { updateCategory } = await import("./catalogue-model.server");
    return updateCategory(id, values);
  });

export const deleteAdminCategory = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1), permanent: z.boolean().default(false) }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { deleteCategory } = await import("./catalogue-model.server");
    return deleteCategory(data.id, data.permanent);
  });

export const toggleAdminCategoryActive = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { toggleCategoryActive } = await import("./catalogue-model.server");
    return toggleCategoryActive(data.id);
  });

/* ------------------------------------------------------------------ */
/* ADMIN PRODUCT SERVER FUNCTIONS                                     */
/* ------------------------------------------------------------------ */

export const listAdminProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./admin-auth.server");
  requireAdmin();
  const { listProducts } = await import("./catalogue-model.server");
  return listProducts();
});

export const createAdminProduct = createServerFn({ method: "POST" })
  .validator(productInput)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { createProduct } = await import("./catalogue-model.server");
    return createProduct(data);
  });

export const updateAdminProduct = createServerFn({ method: "POST" })
  .validator(productInput.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { id, ...values } = data;
    const { updateProduct } = await import("./catalogue-model.server");
    return updateProduct(id, values);
  });

export const deleteAdminProduct = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1), permanent: z.boolean().default(false) }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { deleteProduct } = await import("./catalogue-model.server");
    return deleteProduct(data.id, data.permanent);
  });

export const toggleAdminProductActive = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { toggleProductActive } = await import("./catalogue-model.server");
    return toggleProductActive(data.id);
  });

export const seedAdminCatalogue = createServerFn({ method: "POST" })
  .validator(z.object({ force: z.boolean().default(false) }).optional())
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { seedCatalogueData } = await import("./catalogue-seed.server");
    return seedCatalogueData({ force: data?.force });
  });
