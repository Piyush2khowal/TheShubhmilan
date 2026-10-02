import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export { fallbackImage, type AdminProduct } from "./product.shared";

const credentialsInput = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

const imageUrl = z.string().trim().url("Enter a valid image URL.").or(z.literal(""));
const specificationInput = z.object({
  label: z.string().trim().max(50),
  value: z.string().trim().max(120),
});

const productInput = z.object({
  title: z.string().trim().min(2, "Enter a product name.").max(120),
  category: z.string().trim().min(2, "Enter a category.").max(60),
  collection: z.string().trim().max(80).default(""),
  price: z.number().nonnegative("Price cannot be negative."),
  description: z.string().trim().min(10, "Add a short description.").max(600),
  image: imageUrl,
  images: z.array(imageUrl).max(5).default([]),
  details: z.array(z.string().trim().max(180)).max(8).default([]),
  specs: z.array(specificationInput).max(6).default([]),
  delivery: z.string().trim().max(500).default(""),
  customization: z.string().trim().max(500).default(""),
  isActive: z.boolean().default(true),
  videoUrl: z.string().trim().url("Enter a valid video URL.").or(z.literal("")),
  duration: z.string().trim().max(20).default(""),
});

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

export const listPublicProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { listActiveProducts } = await import("./product-model.server");
  return listActiveProducts();
});

export const listAdminProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./admin-auth.server");
  requireAdmin();
  const { listProducts } = await import("./product-model.server");
  return listProducts();
});

export const createAdminProduct = createServerFn({ method: "POST" })
  .validator(productInput)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { createProduct } = await import("./product-model.server");
    return createProduct(data);
  });

export const updateAdminProduct = createServerFn({ method: "POST" })
  .validator(productInput.extend({ id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid product id.") }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { id, ...values } = data;
    const { updateProduct } = await import("./product-model.server");
    return updateProduct(id, values);
  });

export const deleteAdminProduct = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid product id.") }))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    requireAdmin();
    const { deleteProduct } = await import("./product-model.server");
    return deleteProduct(data.id);
  });
