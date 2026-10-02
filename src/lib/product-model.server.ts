import mongoose, { Schema, type InferSchemaType } from "mongoose";

import { connectToDatabase } from "./mongodb.server";
import { fallbackImage, type AdminProduct } from "./product.shared";

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    collection: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, default: fallbackImage },
    images: { type: [String], default: [] },
    details: { type: [String], default: [] },
    specs: {
      type: [{ label: { type: String, trim: true }, value: { type: String, trim: true } }],
      default: [],
    },
    delivery: { type: String, trim: true, default: "" },
    customization: { type: String, trim: true, default: "" },
    isActive: { type: Boolean, default: true },
    videoUrl: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

type ProductDocument = InferSchemaType<typeof productSchema>;
type ProductValues = Omit<AdminProduct, "id" | "updatedAt">;

const Product =
  (mongoose.models["Product"] as mongoose.Model<ProductDocument>) ||
  mongoose.model<ProductDocument>("Product", productSchema);

function serializeProduct(product: {
  _id: { toString(): string };
  title: string;
  category: string;
  collection?: string;
  price: number;
  description: string;
  image?: string;
  images?: string[];
  details?: string[];
  specs?: unknown;
  delivery?: string;
  customization?: string;
  isActive?: boolean;
  videoUrl?: string;
  duration?: string;
  updatedAt: Date;
}): AdminProduct {
  return {
    id: product._id.toString(),
    title: product.title,
    category: product.category,
    collection: product.collection ?? "",
    price: product.price,
    description: product.description,
    image: product.image || fallbackImage,
    images: product.images?.length ? product.images : [product.image || fallbackImage],
    details: product.details ?? [],
    specs: Array.isArray(product.specs)
      ? product.specs
          .map((spec) => {
            const value = spec as { label?: unknown; value?: unknown };
            return {
              label: typeof value.label === "string" ? value.label : "",
              value: typeof value.value === "string" ? value.value : "",
            };
          })
          .filter((spec) => spec.label && spec.value)
      : [],
    delivery: product.delivery ?? "",
    customization: product.customization ?? "",
    isActive: product.isActive ?? true,
    videoUrl: product.videoUrl ?? "",
    duration: product.duration ?? "",
    updatedAt: product.updatedAt.toISOString(),
  };
}

export async function listProducts() {
  await connectToDatabase();
  const products = await Product.find().sort({ updatedAt: -1 }).lean();
  return products.map(serializeProduct);
}

export async function listActiveProducts() {
  await connectToDatabase();
  const products = await Product.find({ isActive: true }).sort({ updatedAt: -1 }).lean();
  return products.map(serializeProduct);
}

function normalizeProductValues(values: ProductValues) {
  const images = Array.from(new Set([values.image, ...values.images].filter(Boolean))).slice(0, 5);
  return {
    ...values,
    image: images[0] || fallbackImage,
    images: images.length ? images : [fallbackImage],
    details: values.details.map((detail) => detail.trim()).filter(Boolean).slice(0, 8),
    specs: values.specs
      .map((spec) => ({ label: spec.label.trim(), value: spec.value.trim() }))
      .filter((spec) => spec.label && spec.value)
      .slice(0, 6),
  };
}

export async function createProduct(values: ProductValues) {
  await connectToDatabase();
  const product = await Product.create(normalizeProductValues(values));
  return serializeProduct(product);
}

export async function updateProduct(id: string, values: ProductValues) {
  await connectToDatabase();
  const product = await Product.findByIdAndUpdate(
    id,
    normalizeProductValues(values),
    { new: true, runValidators: true },
  );
  if (!product) throw new Error("This product no longer exists.");
  return serializeProduct(product);
}

export async function deleteProduct(id: string) {
  await connectToDatabase();
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("This product no longer exists.");
  return { id };
}
