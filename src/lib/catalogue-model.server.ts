import mongoose, { Schema, type InferSchemaType } from "mongoose";

import { connectToDatabase } from "./mongodb.server";
import {
  fallbackImage,
  slugify,
  type AdminCategory,
  type AdminProduct,
} from "./product.shared";

/* ------------------------------------------------------------------ */
/* 1. CATEGORY SCHEMA                                                  */
/* ------------------------------------------------------------------ */

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, index: true },
    type: {
      type: String,
      enum: ["category", "subcategory"],
      default: "category",
      index: true,
    },
    parentId: {
      type: Schema.Types.Mixed,
      default: null,
      ref: "Category",
    },
    description: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: fallbackImage },
    active: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

type CategoryDocument = InferSchemaType<typeof categorySchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const CategoryModel =
  (mongoose.models["Category"] as mongoose.Model<CategoryDocument>) ||
  mongoose.model<CategoryDocument>("Category", categorySchema);

/* ------------------------------------------------------------------ */
/* 2. PRODUCT / DESIGN SCHEMA                                          */
/* ------------------------------------------------------------------ */

const productSchema = new Schema(
  {
    name: { type: String, trim: true },
    title: { type: String, trim: true }, // backward-compatibility
    slug: { type: String, required: true, trim: true, index: true },
    type: { type: String, trim: true, default: "digital", index: true },
    categoryId: {
      type: Schema.Types.Mixed,
      default: null,
      ref: "Category",
      index: true,
    },
    parentId: {
      type: Schema.Types.Mixed,
      default: null,
      ref: "Category",
    },
    category: { type: String, trim: true, default: "Digital Invitation" },
    collectionName: { type: String, trim: true, default: "" },
    collection: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, default: fallbackImage },
    images: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    details: { type: [String], default: [] },
    specs: {
      type: [{ label: { type: String, trim: true }, value: { type: String, trim: true } }],
      default: [],
    },
    delivery: { type: String, trim: true, default: "" },
    customization: { type: String, trim: true, default: "" },
    active: { type: Boolean, default: true, index: true },
    isActive: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    videoUrl: { type: String, trim: true, default: "" },
    duration: { type: String, trim: true, default: "" },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

type ProductDocument = InferSchemaType<typeof productSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const ProductModel =
  (mongoose.models["Product"] as mongoose.Model<ProductDocument>) ||
  mongoose.model<ProductDocument>("Product", productSchema);

/* ------------------------------------------------------------------ */
/* 3. SERIALIZERS                                                      */
/* ------------------------------------------------------------------ */

function inferredCategoryType(doc: any): "category" | "subcategory" {
  if (doc.type === "subcategory" || doc.type === "category") return doc.type;
  return doc.parentId ? "subcategory" : "category";
}

function inferredProductType(doc: any, categoryName = "", parentName = ""): string {
  if (doc.videoUrl) return "video";
  const blob = `${doc.type || ""} ${categoryName} ${parentName} ${doc.category || ""}`.toLowerCase();
  if (blob.includes("video")) return "video";
  if (blob.includes("station")) return "stationery";
  if (blob.includes("physical") || blob.includes("card")) return "cards";
  if (doc.type) return doc.type;
  return "digital";
}

export function serializeCategory(doc: any): AdminCategory {
  const id = doc._id ? doc._id.toString() : String(doc.id || "");
  const parentIdStr = doc.parentId
    ? typeof doc.parentId === "object" && doc.parentId._id
      ? doc.parentId._id.toString()
      : doc.parentId.toString()
    : null;

  return {
    id,
    name: doc.name || "",
    slug: doc.slug || slugify(doc.name || "category"),
    type: inferredCategoryType(doc),
    parentId: parentIdStr,
    parentName:
      doc.parentId && typeof doc.parentId === "object" && doc.parentId.name
        ? doc.parentId.name
        : undefined,
    description: doc.description || "",
    image: doc.image || fallbackImage,
    active: doc.active ?? true,
    displayOrder: typeof doc.displayOrder === "number" ? doc.displayOrder : 0,
    isDeleted: Boolean(doc.isDeleted),
    productCount: doc.productCount,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
  };
}

export function serializeProduct(doc: any): AdminProduct {
  const id = doc._id ? doc._id.toString() : String(doc.id || "");
  const name = doc.name || doc.title || "Untitled Design";
  const gallery = Array.isArray(doc.gallery) && doc.gallery.length
    ? doc.gallery
    : Array.isArray(doc.images) && doc.images.length
      ? doc.images
      : [doc.image || fallbackImage];

  const categoryIdStr = doc.categoryId
    ? typeof doc.categoryId === "object" && doc.categoryId._id
      ? doc.categoryId._id.toString()
      : doc.categoryId.toString()
    : "";

  const parentIdStr = doc.parentId
    ? typeof doc.parentId === "object" && doc.parentId._id
      ? doc.parentId._id.toString()
      : doc.parentId.toString()
    : null;

  const categoryName =
    doc.categoryId && typeof doc.categoryId === "object" && doc.categoryId.name
      ? doc.categoryId.name
      : doc.category || "Digital Invitation";

  const parentCategoryName =
    doc.categoryId &&
    typeof doc.categoryId === "object" &&
    doc.categoryId.parentId &&
    typeof doc.categoryId.parentId === "object" &&
    doc.categoryId.parentId.name
      ? doc.categoryId.parentId.name
      : undefined;

  const isActive = doc.active ?? doc.isActive ?? true;

  return {
    id,
    name,
    title: name,
    slug: doc.slug || slugify(name),
    type: inferredProductType(doc, categoryName, parentCategoryName),
    categoryId: categoryIdStr,
    categoryName,
    parentId: parentIdStr,
    parentCategoryName,
    category: categoryName,
    collection: doc.collection || doc.collectionName || "",
    price: typeof doc.price === "number" ? doc.price : 0,
    description: doc.description || "",
    image: doc.image || gallery[0] || fallbackImage,
    images: gallery,
    gallery,
    details: Array.isArray(doc.details) ? doc.details : [],
    specs: Array.isArray(doc.specs)
      ? doc.specs.map((s: any) => ({
          label: typeof s?.label === "string" ? s.label : "",
          value: typeof s?.value === "string" ? s.value : "",
        }))
      : [],
    delivery: doc.delivery || "",
    customization: doc.customization || "",
    active: isActive,
    isActive,
    featured: Boolean(doc.featured),
    displayOrder: typeof doc.displayOrder === "number" ? doc.displayOrder : 0,
    videoUrl: doc.videoUrl || "",
    duration: doc.duration || "",
    isDeleted: Boolean(doc.isDeleted),
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* 4. CATEGORY CRUD                                                    */
/* ------------------------------------------------------------------ */

export async function listCategories(filter: {
  activeOnly?: boolean;
  type?: "category" | "subcategory";
  parentId?: string | null;
  includeDeleted?: boolean;
} = {}) {
  await connectToDatabase();
  const query: Record<string, any> = {};

  if (!filter.includeDeleted) {
    query["isDeleted"] = { $ne: true };
  }
  if (filter.activeOnly) {
    query["active"] = true;
  }
  if (filter.type) {
    query["type"] = filter.type;
  }
  if (filter.parentId !== undefined) {
    query["parentId"] = filter.parentId;
  }

  const docs = await CategoryModel.find(query)
    .populate("parentId", "name slug")
    .sort({ displayOrder: 1, name: 1 })
    .lean();

  return docs.map(serializeCategory);
}

export async function getCategoryBySlug(slug: string) {
  await connectToDatabase();
  const doc = await CategoryModel.findOne({
    slug: slug.toLowerCase().trim(),
    isDeleted: { $ne: true },
  })
    .populate("parentId", "name slug")
    .lean();

  return doc ? serializeCategory(doc) : null;
}

export async function getCategoryById(id: string) {
  await connectToDatabase();
  const doc = await CategoryModel.findById(id).populate("parentId", "name slug").lean();
  return doc ? serializeCategory(doc) : null;
}

export async function createCategory(values: {
  name: string;
  slug?: string;
  type?: "category" | "subcategory";
  parentId?: string | null;
  description?: string;
  image?: string;
  active?: boolean;
  displayOrder?: number;
}) {
  await connectToDatabase();
  const baseSlug = slugify(values.slug || values.name);
  let finalSlug = baseSlug;
  let suffix = 1;
  while (await CategoryModel.exists({ slug: finalSlug, isDeleted: { $ne: true } })) {
    finalSlug = `${baseSlug}-${suffix++}`;
  }

  const category = await CategoryModel.create({
    name: values.name.trim(),
    slug: finalSlug,
    type: values.type || "category",
    parentId: values.parentId || null,
    description: (values.description || "").trim(),
    image: values.image || fallbackImage,
    active: values.active ?? true,
    displayOrder: values.displayOrder ?? 0,
    isDeleted: false,
  });

  const populated = await CategoryModel.findById(category._id).populate("parentId", "name slug").lean();
  return serializeCategory(populated);
}

export async function updateCategory(
  id: string,
  values: {
    name?: string;
    slug?: string;
    type?: "category" | "subcategory";
    parentId?: string | null;
    description?: string;
    image?: string;
    active?: boolean;
    displayOrder?: number;
  },
) {
  await connectToDatabase();
  const update: Record<string, any> = {};

  if (values.name !== undefined) update["name"] = values.name.trim();
  if (values.slug !== undefined) {
    const desired = slugify(values.slug);
    const existing = await CategoryModel.findOne({
      _id: { $ne: id },
      slug: desired,
      isDeleted: { $ne: true },
    });
    if (existing) {
      update["slug"] = `${desired}-${Date.now().toString().slice(-4)}`;
    } else {
      update["slug"] = desired;
    }
  }
  if (values.type !== undefined) update["type"] = values.type;
  if (values.parentId !== undefined) update["parentId"] = values.parentId || null;
  if (values.description !== undefined) update["description"] = values.description.trim();
  if (values.image !== undefined) update["image"] = values.image.trim() || fallbackImage;
  if (values.active !== undefined) update["active"] = values.active;
  if (values.displayOrder !== undefined) update["displayOrder"] = values.displayOrder;

  const doc = await CategoryModel.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  })
    .populate("parentId", "name slug")
    .lean();

  if (!doc) throw new Error("Category not found.");
  return serializeCategory(doc);
}

export async function deleteCategory(id: string, permanent = false) {
  await connectToDatabase();
  if (permanent) {
    const doc = await CategoryModel.findByIdAndDelete(id);
    if (!doc) throw new Error("Category not found.");
    return { id, permanent: true };
  } else {
    const doc = await CategoryModel.findByIdAndUpdate(
      id,
      { isDeleted: true, active: false },
      { new: true },
    );
    if (!doc) throw new Error("Category not found.");
    return { id, permanent: false };
  }
}

export async function toggleCategoryActive(id: string) {
  await connectToDatabase();
  const current = await CategoryModel.findById(id);
  if (!current) throw new Error("Category not found.");
  current.active = !current.active;
  await current.save();
  return serializeCategory(current);
}

/* ------------------------------------------------------------------ */
/* 5. PRODUCT CRUD                                                     */
/* ------------------------------------------------------------------ */

export async function listProducts(filter: {
  activeOnly?: boolean;
  categoryId?: string;
  categorySlug?: string;
  type?: string;
  featuredOnly?: boolean;
  includeDeleted?: boolean;
} = {}) {
  await connectToDatabase();
  const query: Record<string, any> = {};

  if (!filter.includeDeleted) {
    query["isDeleted"] = { $ne: true };
  }
  if (filter.activeOnly) {
    query["$and"] = [
      {
        $or: [
          { active: true },
          { isActive: true, active: { $ne: false } },
          { active: { $exists: false }, isActive: { $exists: false } },
        ],
      },
    ];
  }
  if (filter.featuredOnly) {
    query["featured"] = true;
  }
  if (filter.type) {
    query["type"] = filter.type;
  }

  if (filter.categorySlug) {
    const slug = filter.categorySlug.toLowerCase().trim();
    const category = await CategoryModel.findOne({
      slug,
      isDeleted: { $ne: true },
    }).lean();

    const nameFromSlug = slug.replace(/-/g, " ");
    const escapedName = nameFromSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const nameRegex = new RegExp(`^${escapedName}$`, "i");
    const or: Record<string, unknown>[] = [{ category: nameRegex }, { subcategory: nameRegex }];

    if (category) {
      const categoryId = category._id;
      const categoryIdStr = categoryId.toString();
      const children = await CategoryModel.find({
        parentId: { $in: [categoryId, categoryIdStr] },
        isDeleted: { $ne: true },
      })
        .select("_id")
        .lean();
      const childIds = children.map((child) => child._id);
      const childIdStrings = childIds.map((id) => id.toString());
      const escapedCategoryName = String(category.name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      or.push(
        { categoryId },
        { categoryId: categoryIdStr },
        { parentId: categoryId },
        { parentId: categoryIdStr },
        { category: new RegExp(`^${escapedCategoryName}$`, "i") },
      );
      if (childIds.length) {
        or.push(
          { categoryId: { $in: [...childIds, ...childIdStrings] } },
          { parentId: { $in: [...childIds, ...childIdStrings] } },
        );
      }
    }

    query["$or"] = or;
  } else if (filter.categoryId) {
    query["$or"] = [{ categoryId: filter.categoryId }, { parentId: filter.categoryId }];
  }

  const products = await ProductModel.find(query)
    .populate({
      path: "categoryId",
      populate: { path: "parentId", select: "name slug" },
    })
    .sort({ displayOrder: 1, updatedAt: -1 })
    .lean();

  return products.map(serializeProduct);
}

export async function listActiveProducts(filter?: {
  categoryId?: string;
  categorySlug?: string;
  type?: string;
}) {
  return listProducts({ activeOnly: true, ...filter });
}

export async function getProductBySlug(slug: string) {
  await connectToDatabase();
  const product = await ProductModel.findOne({
    slug: slug.toLowerCase().trim(),
    isDeleted: { $ne: true },
  })
    .populate({
      path: "categoryId",
      populate: { path: "parentId", select: "name slug" },
    })
    .lean();

  return product ? serializeProduct(product) : null;
}

export async function getProductById(id: string) {
  await connectToDatabase();
  const product = await ProductModel.findById(id)
    .populate({
      path: "categoryId",
      populate: { path: "parentId", select: "name slug" },
    })
    .lean();

  return product ? serializeProduct(product) : null;
}

function normalizeProductValues(values: any) {
  const name = (values.name || values.title || "").trim();
  const images = Array.from(
    new Set([values.image, ...(values.gallery || []), ...(values.images || [])].filter(Boolean)),
  ).slice(0, 5);

  const primaryImage = images[0] || fallbackImage;

  return {
    name,
    title: name,
    slug: slugify(values.slug || name || "design"),
    type: values.type || "digital",
    categoryId: values.categoryId || null,
    parentId: values.parentId || values.categoryId || null,
    category: values.category || values.categoryName || "Digital Invitation",
    collection: (values.collection || "").trim(),
    collectionName: (values.collection || "").trim(),
    price: typeof values.price === "number" ? Math.max(0, values.price) : 0,
    description: (values.description || "").trim(),
    image: primaryImage,
    images: images.length ? images : [primaryImage],
    gallery: images.length ? images : [primaryImage],
    details: Array.isArray(values.details)
      ? values.details.map((d: any) => String(d).trim()).filter(Boolean).slice(0, 8)
      : [],
    specs: Array.isArray(values.specs)
      ? values.specs
          .map((s: any) => ({
            label: String(s?.label || "").trim(),
            value: String(s?.value || "").trim(),
          }))
          .filter((s: any) => s.label && s.value)
          .slice(0, 6)
      : [],
    delivery: (values.delivery || "").trim(),
    customization: (values.customization || "").trim(),
    active: values.active ?? values.isActive ?? true,
    isActive: values.active ?? values.isActive ?? true,
    featured: Boolean(values.featured),
    displayOrder: typeof values.displayOrder === "number" ? values.displayOrder : 0,
    videoUrl: (values.videoUrl || "").trim(),
    duration: (values.duration || "").trim(),
    isDeleted: false,
  };
}

export async function createProduct(values: any) {
  await connectToDatabase();
  const normalized = normalizeProductValues(values);

  // Generate unique slug
  let finalSlug = normalized.slug;
  let counter = 1;
  while (await ProductModel.exists({ slug: finalSlug, isDeleted: { $ne: true } })) {
    finalSlug = `${normalized.slug}-${counter++}`;
  }
  normalized.slug = finalSlug;

  const product = await ProductModel.create(normalized);
  const populated = await ProductModel.findById(product._id)
    .populate({
      path: "categoryId",
      populate: { path: "parentId", select: "name slug" },
    })
    .lean();

  return serializeProduct(populated);
}

export async function updateProduct(id: string, values: any) {
  await connectToDatabase();
  const normalized = normalizeProductValues(values);

  if (values.slug) {
    const desired = slugify(values.slug);
    const existing = await ProductModel.findOne({
      _id: { $ne: id },
      slug: desired,
      isDeleted: { $ne: true },
    });
    if (existing) {
      normalized.slug = `${desired}-${Date.now().toString().slice(-4)}`;
    } else {
      normalized.slug = desired;
    }
  }

  const product = await ProductModel.findByIdAndUpdate(id, normalized, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: "categoryId",
      populate: { path: "parentId", select: "name slug" },
    })
    .lean();

  if (!product) throw new Error("This product no longer exists.");
  return serializeProduct(product);
}

export async function deleteProduct(id: string, permanent = false) {
  await connectToDatabase();
  if (permanent) {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) throw new Error("This product no longer exists.");
    return { id, permanent: true };
  } else {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { isDeleted: true, active: false, isActive: false },
      { new: true },
    );
    if (!product) throw new Error("This product no longer exists.");
    return { id, permanent: false };
  }
}

export async function toggleProductActive(id: string) {
  await connectToDatabase();
  const current = await ProductModel.findById(id);
  if (!current) throw new Error("This product no longer exists.");
  const newState = !(current.active ?? current.isActive ?? true);
  current.active = newState;
  current.isActive = newState;
  await current.save();
  return serializeProduct(current);
}

/* ------------------------------------------------------------------ */
/* 6. FULL HIERARCHY TREE                                              */
/* ------------------------------------------------------------------ */

export type PublicCatalogueTree = {
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    displayOrder: number;
    subcategories: {
      id: string;
      name: string;
      slug: string;
      description: string;
      image: string;
      displayOrder: number;
      productCount: number;
    }[];
  }[];
};

export async function getCatalogueTree(): Promise<PublicCatalogueTree> {
  await connectToDatabase();

  const [allCategories, products] = await Promise.all([
    CategoryModel.find({ active: { $ne: false }, isDeleted: { $ne: true } })
      .sort({ displayOrder: 1, name: 1 })
      .lean(),
    ProductModel.find({
      isDeleted: { $ne: true },
      $or: [
        { active: true },
        { isActive: true, active: { $ne: false } },
        { active: { $exists: false }, isActive: { $exists: false } },
      ],
    })
      .select("_id categoryId parentId image category")
      .lean(),
  ]);

  const categories = allCategories.filter((cat) => inferredCategoryType(cat) === "category" && !cat.parentId);
  const subcategories = allCategories.filter(
    (cat) => inferredCategoryType(cat) === "subcategory" || Boolean(cat.parentId),
  );

  const countMap = new Map<string, { count: number; coverImage?: string }>();
  const bump = (key: string, image?: string) => {
    if (!key) return;
    const current = countMap.get(key) || { count: 0 };
    countMap.set(key, {
      count: current.count + 1,
      coverImage: current.coverImage || image,
    });
  };

  for (const p of products) {
    if (p.categoryId) bump(p.categoryId.toString(), p.image);
    if (p.parentId) bump(p.parentId.toString(), p.image);
    if (p.category) bump(slugify(String(p.category)), p.image);
  }

  const result: PublicCatalogueTree = {
    categories: categories.map((cat) => {
      const catId = cat._id.toString();
      const subs = subcategories
        .filter((sub) => {
          const pId = sub.parentId ? sub.parentId.toString() : "";
          return pId === catId;
        })
        .map((sub) => {
          const subId = sub._id.toString();
          const info = countMap.get(subId);
          return {
            id: subId,
            name: sub.name,
            slug: sub.slug,
            description: sub.description || "",
            image: sub.image && sub.image !== fallbackImage ? sub.image : (info?.coverImage || sub.image || fallbackImage),
            displayOrder: sub.displayOrder,
            productCount: info?.count || 0,
          };
        });

      return {
        id: catId,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "",
        image: cat.image || fallbackImage,
        displayOrder: cat.displayOrder,
        subcategories: subs,
      };
    }),
  };

  return result;
}
