import {
  digitalGroups,
  digitalInvitations,
  physicalCards,
  stationery,
  stationerySubcategories,
  videoInvitations,
  type BaseProduct,
} from "@/data/products";
import { connectToDatabase } from "./mongodb.server";
import { CategoryModel, ProductModel } from "./catalogue-model.server";
import { slugify } from "./product.shared";

export async function seedCatalogueData(options: { force?: boolean } = {}) {
  await connectToDatabase();

  const totalCategories = await CategoryModel.countDocuments({ isDeleted: { $ne: true } });
  const totalProducts = await ProductModel.countDocuments({ isDeleted: { $ne: true } });

  if (totalCategories > 0 && totalProducts > 0 && !options.force) {
    return {
      message: "Catalogue already initialized. Skipped seed to prevent overwriting existing CMS data.",
      categoriesCount: totalCategories,
      productsCount: totalProducts,
    };
  }

  // 1. Root categories
  const rootDefinitions = [
    {
      name: "Digital Invitations",
      slug: "digital-invite",
      description: "Wedding invitation PDFs, path & pooja, kids celebrations and digital stationery.",
      displayOrder: 1,
    },
    {
      name: "Stationery",
      slug: "stationery",
      description: "Signages, welcome notes, menus, itineraries, money envelopes, tags and scrolls.",
      displayOrder: 2,
    },
    {
      name: "Physical Cards",
      slug: "physical-cards",
      description: "Printed invitation cards — boxes, laser-cut covers, foil press and scrolls.",
      displayOrder: 3,
    },
    {
      name: "Video Invitations",
      slug: "video-invitations",
      description: "Animated invitation films for save the date, wedding and ring ceremonies.",
      displayOrder: 4,
    },
  ];

  const rootCategoryMap = new Map<string, any>();

  for (const def of rootDefinitions) {
    let cat = await CategoryModel.findOne({ slug: def.slug, isDeleted: { $ne: true } });
    if (!cat) {
      cat = await CategoryModel.create({
        name: def.name,
        slug: def.slug,
        type: "category",
        parentId: null,
        description: def.description,
        active: true,
        displayOrder: def.displayOrder,
      });
    }
    rootCategoryMap.set(def.slug, cat);
  }

  const digitalRoot = rootCategoryMap.get("digital-invite")!;
  const stationeryRoot = rootCategoryMap.get("stationery")!;
  const physicalRoot = rootCategoryMap.get("physical-cards")!;
  const videoRoot = rootCategoryMap.get("video-invitations")!;

  // 2. Subcategories for Digital Invitations
  const subcategoryMap = new Map<string, any>();
  let digitalOrder = 1;

  for (const group of digitalGroups) {
    if (group.group === "Video Invite") continue;
    for (const subName of group.subcategories) {
      const slug = slugify(subName);
      let sub = await CategoryModel.findOne({ slug, isDeleted: { $ne: true } });
      if (!sub) {
        sub = await CategoryModel.create({
          name: subName,
          slug,
          type: "subcategory",
          parentId: digitalRoot._id,
          description: `${subName} designs — elegant typography and bespoke layouts.`,
          active: true,
          displayOrder: digitalOrder++,
        });
      }
      subcategoryMap.set(subName.toLowerCase(), sub);
    }
  }

  // Subcategories for Stationery
  let statOrder = 1;
  for (const subName of stationerySubcategories) {
    const slug = slugify(subName);
    let sub = await CategoryModel.findOne({ slug, isDeleted: { $ne: true } });
    if (!sub) {
      sub = await CategoryModel.create({
        name: subName,
        slug,
        type: "subcategory",
        parentId: stationeryRoot._id,
        description: `${subName} — printed on luxury cardstock with foil accents.`,
        active: true,
        displayOrder: statOrder++,
      });
    }
    subcategoryMap.set(subName.toLowerCase(), sub);
  }

  // Subcategories for Physical Cards
  const physicalSubs = ["Boxed Invitations", "Laser Cut Jaali", "Scroll Invitations", "Foil Pressed Cards"];
  let physOrder = 1;
  for (const subName of physicalSubs) {
    const slug = slugify(subName);
    let sub = await CategoryModel.findOne({ slug, isDeleted: { $ne: true } });
    if (!sub) {
      sub = await CategoryModel.create({
        name: subName,
        slug,
        type: "subcategory",
        parentId: physicalRoot._id,
        description: `Handcrafted heirloom ${subName.toLowerCase()}.`,
        active: true,
        displayOrder: physOrder++,
      });
    }
    subcategoryMap.set(subName.toLowerCase(), sub);
  }

  // Subcategories for Video Invitations
  const videoSubs = ["Save the Date Films", "Wedding Films", "Ring Ceremony Films"];
  let vidOrder = 1;
  for (const subName of videoSubs) {
    const slug = slugify(subName);
    let sub = await CategoryModel.findOne({ slug, isDeleted: { $ne: true } });
    if (!sub) {
      sub = await CategoryModel.create({
        name: subName,
        slug,
        type: "subcategory",
        parentId: videoRoot._id,
        description: `Bespoke animated ${subName.toLowerCase()}.`,
        active: true,
        displayOrder: vidOrder++,
      });
    }
    subcategoryMap.set(subName.toLowerCase(), sub);
  }

  // 3. Products
  let importedCount = 0;

  async function importProduct(p: BaseProduct, defaultParentCat: any, type: string, order: number) {
    const slug = slugify(p.title || p.id);
    const existing = await ProductModel.findOne({
      $or: [{ slug }, { title: p.title }, { name: p.title }],
      isDeleted: { $ne: true },
    });

    if (existing) {
      return;
    }

    const subcategoryObj = p.subcategory ? subcategoryMap.get(p.subcategory.toLowerCase()) : null;
    const categoryId = subcategoryObj ? subcategoryObj._id : defaultParentCat._id;

    const gallery = Array.isArray(p.images) && p.images.length
      ? p.images
      : p.image
        ? [p.image]
        : [];

    await ProductModel.create({
      name: p.title,
      title: p.title,
      slug,
      type,
      categoryId,
      parentId: categoryId,
      category: p.subcategory || defaultParentCat.name,
      collection: p.collection || "",
      collectionName: p.collection || "",
      price: p.priceValue || (typeof p.price === "number" ? p.price : 1299),
      description: p.description || "",
      image: p.image || gallery[0] || "",
      images: gallery,
      gallery,
      details: Array.isArray(p.details) ? p.details : [],
      specs: Array.isArray(p.specs) ? p.specs : [],
      delivery: p.delivery || "",
      customization: p.customization || "",
      active: true,
      isActive: true,
      featured: order <= 4,
      displayOrder: order,
      videoUrl: (p as any).videoUrl || "",
      duration: (p as any).duration || "",
      isDeleted: false,
    });
    importedCount++;
  }

  // Import digital invitations (including all 10 Save the Date designs)
  for (let i = 0; i < digitalInvitations.length; i++) {
    const item = digitalInvitations[i]!;
    await importProduct(item, digitalRoot, "digital", i + 1);
  }

  // Update Save the Date category image to STD1's image
  const saveTheDateCat = subcategoryMap.get("save the date");
  if (saveTheDateCat && digitalInvitations[0]?.image) {
    saveTheDateCat.image = digitalInvitations[0].image;
    await saveTheDateCat.save();
  }

  // Import stationery items
  for (let i = 0; i < stationery.length; i++) {
    const item = stationery[i]!;
    await importProduct(item, stationeryRoot, "stationery", i + 1);
  }

  // Import video invitations
  for (let i = 0; i < videoInvitations.length; i++) {
    const item = videoInvitations[i]!;
    await importProduct(item as any, videoRoot, "video", i + 1);
  }

  // Import physical cards
  for (let i = 0; i < physicalCards.length; i++) {
    const item = physicalCards[i]!;
    await importProduct(item as any, physicalRoot, "cards", i + 1);
  }

  const updatedCategoriesCount = await CategoryModel.countDocuments({ isDeleted: { $ne: true } });
  const updatedProductsCount = await ProductModel.countDocuments({ isDeleted: { $ne: true } });

  return {
    message: `Successfully migrated ${importedCount} items into MongoDB catalogue CMS.`,
    categoriesCount: updatedCategoriesCount,
    productsCount: updatedProductsCount,
  };
}
