import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Database,
  Edit3,
  Eye,
  EyeOff,
  FolderTree,
  HelpCircle,
  ImageIcon,
  Layers,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  LogOut,
  Package,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import {
  createAdminCategory,
  createAdminProduct,
  deleteAdminCategory,
  deleteAdminProduct,
  fallbackImage,
  getAdminSession,
  listAdminCategories,
  listAdminProducts,
  loginAdmin,
  logoutAdmin,
  seedAdminCatalogue,
  toggleAdminCategoryActive,
  toggleAdminProductActive,
  type AdminCategory,
  type AdminProduct,
  updateAdminCategory,
  updateAdminProduct,
} from "@/lib/product.server";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Catalogue CMS — The Shubhmilan Admin" }] }),
  component: AdminPage,
});

/* ------------------------------------------------------------------ */
/* FORM INITIAL STATES                                                */
/* ------------------------------------------------------------------ */

const blankCategory = {
  name: "",
  slug: "",
  type: "category" as "category" | "subcategory",
  parentId: "" as string | null,
  description: "",
  image: "",
  active: true,
  displayOrder: 0,
};

const blankProduct = {
  name: "",
  title: "",
  slug: "",
  type: "digital",
  parentCategory: "Digital Invitations",
  categoryId: "",
  collection: "",
  price: 1299,
  description: "",
  image: "",
  images: ["", "", "", ""], // up to 4 additional gallery images
  details: ["", "", "", ""],
  specs: [
    { label: "Format", value: "PDF + JPG" },
    { label: "Turnaround", value: "2–3 working days" },
    { label: "", value: "" },
    { label: "", value: "" },
  ],
  delivery: "Delivered within 2–3 working days via WhatsApp and email.",
  customization: "Names, wedding dates, family details and colours are customizable.",
  active: true,
  featured: false,
  displayOrder: 0,
  videoUrl: "",
  duration: "",
};

type CategoryForm = typeof blankCategory;
type ProductForm = typeof blankProduct;

function AdminPage() {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showDbHelp, setShowDbHelp] = useState(false);

  const [activeTab, setActiveTab] = useState<"products" | "subcategories" | "categories">("products");

  // Category Modal / Form State
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [catEditingId, setCatEditingId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState<CategoryForm>(blankCategory);

  // Product Modal / Form State
  const [prodModalOpen, setProdModalOpen] = useState(false);
  const [prodEditingId, setProdEditingId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<ProductForm>(blankProduct);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Filters
  const [prodFilterSub, setProdFilterSub] = useState<string>("all");
  const [prodSearch, setProdSearch] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [cats, prods] = await Promise.all([listAdminCategories(), listAdminProducts()]);
      setCategories(cats);
      setProducts(prods);
    } catch (caught) {
      const msg = errorMessage(caught);
      setError(msg);
      if (msg.includes("MONGODB") || msg.includes("EBADNAME") || msg.includes("Atlas") || msg.includes("Hostname")) {
        setShowDbHelp(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getAdminSession()
      .then((session) => {
        if (session) {
          setAdminName(session.username);
          void loadData();
        } else {
          setLoading(false);
        }
      })
      .catch((caught) => {
        setError(errorMessage(caught));
        setLoading(false);
      })
      .finally(() => setAuthChecking(false));
  }, [loadData]);

  async function signOut() {
    await logoutAdmin();
    setAdminName(null);
    setCategories([]);
    setProducts([]);
    setMessage("");
  }

  // Top level categories
  const parentCategories = useMemo(
    () => categories.filter((c) => c.type === "category" && !c.parentId),
    [categories],
  );

  // Subcategories
  const subcategories = useMemo(
    () => categories.filter((c) => c.type === "subcategory" || Boolean(c.parentId)),
    [categories],
  );

  // Subcategories filtered by parent for the form
  const availableSubcategoriesForForm = useMemo(() => {
    if (!subcategories.length) return [];
    const parent = parentCategories.find((p) => p.name === prodForm.parentCategory);
    if (!parent) return subcategories;
    const subs = subcategories.filter((s) => s.parentId === parent.id);
    return subs.length ? subs : subcategories;
  }, [subcategories, parentCategories, prodForm.parentCategory]);

  // Filtered Products for the table
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (prodFilterSub !== "all") {
        const matchesCategory = p.categoryId === prodFilterSub || p.category === prodFilterSub;
        if (!matchesCategory) return false;
      }
      if (prodSearch.trim()) {
        const query = prodSearch.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(query) ||
          p.slug.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [products, prodFilterSub, prodSearch]);

  /* ---------------------------------------------------------------- */
  /* CATEGORY ACTIONS                                                 */
  /* ---------------------------------------------------------------- */

  function openNewCategory(type: "category" | "subcategory" = "category") {
    setCatForm({
      ...blankCategory,
      type,
      parentId: type === "subcategory" && parentCategories[0] ? parentCategories[0].id : null,
      displayOrder: (type === "category" ? parentCategories.length : subcategories.length) + 1,
    });
    setCatEditingId(null);
    setCatModalOpen(true);
    setError("");
    setMessage("");
  }

  function editCategory(cat: AdminCategory) {
    setCatForm({
      name: cat.name,
      slug: cat.slug,
      type: cat.type,
      parentId: cat.parentId,
      description: cat.description,
      image: cat.image,
      active: cat.active,
      displayOrder: cat.displayOrder,
    });
    setCatEditingId(cat.id);
    setCatModalOpen(true);
    setError("");
    setMessage("");
  }

  async function submitCategory(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      if (catEditingId) {
        const updated = await updateAdminCategory({
          data: { ...catForm, id: catEditingId, parentId: catForm.parentId || null },
        });
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setMessage(`Category “${updated.name}” updated successfully.`);
      } else {
        const created = await createAdminCategory({
          data: { ...catForm, parentId: catForm.parentId || null },
        });
        setCategories((prev) => [...prev, created]);
        setMessage(`Category “${created.name}” created successfully.`);
      }
      setCatModalOpen(false);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSaving(false);
    }
  }

  async function toggleCategory(cat: AdminCategory) {
    setError("");
    try {
      const updated = await toggleAdminCategoryActive({ data: { id: cat.id } });
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setMessage(`Category “${cat.name}” is now ${updated.active ? "active" : "deactivated (hidden)"}.`);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  async function deleteCat(cat: AdminCategory) {
    const confirmed = window.confirm(
      `Are you sure you want to remove category “${cat.name}”?\n\nIt will be safely soft-deleted from the public catalogue.`,
    );
    if (!confirmed) return;

    setError("");
    try {
      await deleteAdminCategory({ data: { id: cat.id, permanent: false } });
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      setMessage(`Category “${cat.name}” was removed.`);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  /* ---------------------------------------------------------------- */
  /* PRODUCT ACTIONS                                                  */
  /* ---------------------------------------------------------------- */

  function openNewProduct() {
    const defaultSub = subcategories[0];
    const defaultParent = parentCategories[0]?.name || "Digital Invitations";
    setProdForm({
      ...blankProduct,
      parentCategory: defaultParent,
      categoryId: defaultSub ? defaultSub.id : "",
      category: defaultSub ? defaultSub.name : "Digital Invitation",
      displayOrder: products.length + 1,
    });
    setProdEditingId(null);
    setShowAdvancedOptions(false);
    setProdModalOpen(true);
    setError("");
    setMessage("");
  }

  function editProduct(p: AdminProduct) {
    const parentName =
      p.parentCategoryName ||
      (p.type === "video" ? "Video Invitations" : p.type === "stationery" ? "Stationery" : p.type === "cards" ? "Physical Cards" : "Digital Invitations");

    setProdForm({
      name: p.name || p.title,
      title: p.name || p.title,
      slug: p.slug,
      type: p.type || "digital",
      parentCategory: parentName,
      categoryId: p.categoryId,
      collection: p.collection || "",
      price: p.price,
      description: p.description,
      image: p.image,
      images: [...p.images.slice(1), "", "", "", ""].slice(0, 4),
      details: [...p.details, "", "", "", ""].slice(0, 4),
      specs: [
        ...p.specs,
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
        { label: "", value: "" },
      ].slice(0, 4),
      delivery: p.delivery,
      customization: p.customization,
      active: p.active,
      featured: p.featured,
      displayOrder: p.displayOrder,
      videoUrl: p.videoUrl,
      duration: p.duration,
    });
    setProdEditingId(p.id);
    setShowAdvancedOptions(Boolean(p.collection || p.videoUrl || p.featured));
    setProdModalOpen(true);
    setError("");
    setMessage("");
  }

  async function submitProduct(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const matchedCat = categories.find((c) => c.id === prodForm.categoryId);
      const isVideo =
        prodForm.parentCategory.toLowerCase().includes("video") ||
        Boolean(prodForm.videoUrl) ||
        prodForm.type === "video";

      const galleryImages = [prodForm.image, ...prodForm.images].filter(Boolean);

      const payload = {
        name: prodForm.name,
        title: prodForm.name,
        slug: prodForm.slug,
        type: isVideo ? "video" : prodForm.type || "digital",
        categoryId: prodForm.categoryId || null,
        category: matchedCat ? matchedCat.name : prodForm.collection || "Digital Invitation",
        collection: prodForm.collection,
        price: Number(prodForm.price) || 0,
        description: prodForm.description,
        image: prodForm.image || galleryImages[0] || "",
        images: galleryImages,
        gallery: galleryImages,
        videoUrl: prodForm.videoUrl,
        duration: prodForm.duration,
        details: prodForm.details.filter(Boolean),
        specs: prodForm.specs.filter((s) => s.label && s.value),
        delivery: prodForm.delivery,
        customization: prodForm.customization,
        active: prodForm.active,
        isActive: prodForm.active,
        featured: prodForm.featured,
        displayOrder: Number(prodForm.displayOrder) || 0,
      };

      if (prodEditingId) {
        const updated = await updateAdminProduct({
          data: { ...payload, id: prodEditingId },
        });
        setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        setMessage(`Design “${updated.name}” updated successfully.`);
      } else {
        const created = await createAdminProduct({ data: payload });
        setProducts((prev) => [created, ...prev]);
        setMessage(`Design “${created.name}” created and saved to MongoDB.`);
      }
      setProdModalOpen(false);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSaving(false);
    }
  }

  async function toggleProduct(p: AdminProduct) {
    setError("");
    try {
      const updated = await toggleAdminProductActive({ data: { id: p.id } });
      setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setMessage(`Design “${p.name}” is now ${updated.active ? "active" : "deactivated (hidden)"}.`);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  async function deleteProd(p: AdminProduct) {
    const confirmed = window.confirm(
      `Are you sure you want to delete design “${p.name}”?\n\nIt will be soft-deleted and hidden from public display.`,
    );
    if (!confirmed) return;

    setError("");
    try {
      await deleteAdminProduct({ data: { id: p.id, permanent: false } });
      setProducts((prev) => prev.filter((item) => item.id !== p.id));
      setMessage(`Design “${p.name}” was deleted.`);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  async function handleSeedCatalogue() {
    if (
      !window.confirm(
        "Sync and populate existing catalogue designs (including all 10 Save the Date designs) into MongoDB?\n\nThis will safely skip items that already exist without creating duplicates.",
      )
    ) {
      return;
    }
    setSyncing(true);
    setError("");
    setMessage("");
    try {
      const res = await seedAdminCatalogue({ data: { force: true } });
      setMessage(res.message);
      await loadData();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSyncing(false);
    }
  }

  if (authChecking) {
    return <AdminLoading />;
  }

  if (!adminName) {
    return (
      <AdminLogin
        onSignedIn={(username) => {
          setAdminName(username);
          void loadData();
        }}
      />
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-brown sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-gold/40 pb-7">
          <div>
            <p className="text-gold text-[0.65rem] tracking-[0.35em] uppercase">The Shubhmilan CMS</p>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-brown">Catalogue Manager</h1>
            <p className="text-taupe mt-1 text-xs sm:text-sm">
              Manage database-driven categories, subcategories, and designs in MongoDB without editing code.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={syncing}
              onClick={() => void handleSeedCatalogue()}
              className="border-gold/60 text-cocoa hover:bg-gold/15 inline-flex items-center gap-2 border px-3.5 py-2 text-xs tracking-[0.16em] uppercase disabled:opacity-60 cursor-pointer"
              title="Populate or synchronize hardcoded designs into MongoDB"
            >
              <Database className="h-3.5 w-3.5 text-gold" />
              {syncing ? "Syncing..." : "Sync / Migrate MongoDB"}
            </button>
            <button
              type="button"
              onClick={() => void signOut()}
              className="border-brown/45 hover:bg-brown inline-flex items-center gap-2 border px-3.5 py-2 text-xs tracking-[0.16em] uppercase hover:text-cream cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
            <Link
              to="/digital-invite"
              className="bg-brown hover:bg-cocoa border border-brown px-3.5 py-2 text-xs tracking-[0.16em] uppercase text-cream cursor-pointer"
            >
              View Catalogue →
            </Link>
          </div>
        </header>

        {/* Status alerts */}
        {message ? (
          <div className="mt-5 flex items-center justify-between border border-gold/50 bg-beige/40 px-4 py-3 text-xs text-cocoa">
            <span>{message}</span>
            <button type="button" onClick={() => setMessage("")} className="text-brown hover:opacity-75 cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 border border-red-300 bg-red-50 p-4 text-xs text-red-800">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Database Connection Issue</p>
                  <p className="mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
              <button type="button" onClick={() => setError("")} className="text-red-700 hover:opacity-75 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            {showDbHelp ? (
              <div className="mt-3 border-t border-red-200 pt-3 text-[0.72rem] leading-relaxed text-red-900">
                <p className="font-semibold">How to resolve MongoDB Atlas connection in .env.local:</p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>
                    Open <strong>MongoDB Atlas</strong> (cloud.mongodb.com) and click <strong>Database</strong> &rarr; <strong>Connect</strong>.
                  </li>
                  <li>
                    Select <strong>Drivers (Node.js)</strong> and copy the complete URI string. It should look like:
                    <br />
                    <code className="bg-red-100 px-1 py-0.5 font-mono text-[0.68rem]">
                      mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.abcde.mongodb.net/&lt;dbname&gt;?retryWrites=true&w=majority
                    </code>
                  </li>
                  <li>
                    Ensure the cluster address does not end in literal &ldquo;....&rdquo; dots.
                  </li>
                  <li>
                    In Atlas &rarr; <strong>Network Access</strong>, ensure your IP or <code className="bg-red-100 px-1 font-mono">0.0.0.0/0</code> is added.
                  </li>
                  <li>
                    Paste the full URI into <code className="bg-red-100 px-1 font-mono">.env.local</code> as <code className="bg-red-100 px-1 font-mono">MONGODB_URI</code> and refresh this page.
                  </li>
                </ol>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* CMS Tabs Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-gold/30 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                activeTab === "products"
                  ? "border-b-2 border-brown bg-gold/15 font-semibold text-brown"
                  : "text-taupe hover:text-brown"
              }`}
            >
              <Package className="h-4 w-4 text-gold" /> Designs / Products ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("subcategories")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                activeTab === "subcategories"
                  ? "border-b-2 border-brown bg-gold/15 font-semibold text-brown"
                  : "text-taupe hover:text-brown"
              }`}
            >
              <FolderTree className="h-4 w-4 text-gold" /> Subcategories ({subcategories.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                activeTab === "categories"
                  ? "border-b-2 border-brown bg-gold/15 font-semibold text-brown"
                  : "text-taupe hover:text-brown"
              }`}
            >
              <Layers className="h-4 w-4 text-gold" /> Parent Categories ({parentCategories.length})
            </button>
          </div>

          <div>
            {activeTab === "products" ? (
              <button
                type="button"
                onClick={openNewProduct}
                className="bg-brown hover:bg-cocoa inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.18em] uppercase text-cream cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Design / Product
              </button>
            ) : activeTab === "subcategories" ? (
              <button
                type="button"
                onClick={() => openNewCategory("subcategory")}
                className="bg-brown hover:bg-cocoa inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.18em] uppercase text-cream cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Subcategory
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openNewCategory("category")}
                className="bg-brown hover:bg-cocoa inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.18em] uppercase text-cream cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Category
              </button>
            )}
          </div>
        </div>

        {/* SECTION 1: DESIGNS / PRODUCTS */}
        {activeTab === "products" && (
          <div className="mt-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border border-gold/30 bg-card p-4">
              <div className="flex flex-1 flex-wrap items-center gap-3">
                <div className="border-gold/40 flex min-w-60 max-w-sm flex-1 items-center gap-2 border bg-cream px-3 py-1.5 text-xs">
                  <Search className="h-3.5 w-3.5 text-taupe" />
                  <input
                    type="search"
                    placeholder="Search designs by title, slug, description..."
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    className="w-full bg-transparent outline-none placeholder:text-taupe/70"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-taupe">
                  <span>Filter by Subcategory:</span>
                  <select
                    value={prodFilterSub}
                    onChange={(e) => setProdFilterSub(e.target.value)}
                    className="border-gold/40 border bg-cream px-3 py-1.5 outline-none text-brown"
                  >
                    <option value="all">All Subcategories ({products.length})</option>
                    {subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => void loadData()}
                className="text-taupe hover:text-brown inline-flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>

            {loading ? (
              <div className="mt-8 grid min-h-60 place-items-center border border-gold/30 bg-card">
                <LoaderCircle className="h-6 w-6 animate-spin text-gold" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="mt-8 border border-dashed border-gold/45 bg-card p-12 text-center text-sm text-taupe">
                No designs found matching your filter. Click &ldquo;Add Design / Product&rdquo; or &ldquo;Sync / Migrate MongoDB&rdquo;.
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto border border-gold/35 bg-card shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-gold/30 bg-beige/30 uppercase tracking-[0.16em] text-taupe">
                    <tr>
                      <th className="px-4 py-3">Design</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3 text-center">Order</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/20 text-brown">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-cream/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image || fallbackImage}
                              alt=""
                              className="h-12 w-12 shrink-0 border border-gold/30 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = fallbackImage;
                              }}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-brown">{p.name || p.title}</span>
                                {p.videoUrl ? (
                                  <span className="bg-purple-100 text-purple-900 border border-purple-300 inline-flex items-center gap-1 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider">
                                    <Video className="h-2.5 w-2.5" /> Video
                                  </span>
                                ) : null}
                                {p.featured ? (
                                  <span className="bg-gold/20 text-cocoa border border-gold/50 inline-flex items-center gap-1 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider">
                                    <Star className="h-2.5 w-2.5 fill-gold text-gold" /> Featured
                                  </span>
                                ) : null}
                              </div>
                              <p className="text-taupe text-[0.65rem] font-mono mt-0.5">/{p.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-cocoa font-medium">{p.category || p.categoryName}</span>
                          {p.collection ? (
                            <span className="text-taupe block text-[0.68rem]">{p.collection}</span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 font-serif text-sm">₹{p.price.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 text-center font-mono">{p.displayOrder}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => void toggleProduct(p)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.68rem] tracking-wider uppercase border cursor-pointer ${
                              p.active
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : "bg-stone-100 text-stone-500 border-stone-300"
                            }`}
                            title="Click to activate or deactivate design"
                          >
                            {p.active ? (
                              <>
                                <Eye className="h-3 w-3 text-emerald-600" /> Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3 text-stone-400" /> Hidden
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => editProduct(p)}
                              className="border border-gold/45 p-1.5 text-cocoa hover:bg-cream cursor-pointer"
                              title="Edit design"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => void deleteProd(p)}
                              className="border border-red-200 p-1.5 text-red-700 hover:bg-red-50 cursor-pointer"
                              title="Delete design"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: SUBCATEGORIES */}
        {activeTab === "subcategories" && (
          <div className="mt-6">
            <div className="flex items-center justify-between border border-gold/30 bg-card p-4">
              <p className="text-xs text-taupe">
                Subcategories map to catalogue collections (e.g., Save the Date, Roka Ceremony, Engagement).
              </p>
              <button
                type="button"
                onClick={() => void loadData()}
                className="text-taupe hover:text-brown inline-flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>

            <div className="mt-6 overflow-x-auto border border-gold/35 bg-card shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-gold/30 bg-beige/30 uppercase tracking-[0.16em] text-taupe">
                  <tr>
                    <th className="px-4 py-3">Subcategory</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Parent Category</th>
                    <th className="px-4 py-3 text-center">Display Order</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/20 text-brown">
                  {subcategories.map((sub) => {
                    const parent = categories.find((c) => c.id === sub.parentId);
                    return (
                      <tr key={sub.id} className="hover:bg-cream/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {sub.image ? (
                              <img
                                src={sub.image}
                                alt=""
                                className="h-10 w-10 shrink-0 border border-gold/30 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = fallbackImage;
                                }}
                              />
                            ) : (
                              <div className="grid h-10 w-10 place-items-center border border-gold/30 bg-beige/40 text-gold">
                                <FolderTree className="h-4 w-4" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-sm text-brown">{sub.name}</p>
                              {sub.description ? (
                                <p className="text-taupe line-clamp-1 text-[0.68rem]">{sub.description}</p>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-[0.7rem] text-taupe">{sub.slug}</td>
                        <td className="px-4 py-3">
                          <span className="border-gold/40 border bg-beige/30 px-2 py-0.5 text-[0.68rem] uppercase tracking-wider text-cocoa">
                            {parent ? parent.name : sub.parentName || "Root"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-mono">{sub.displayOrder}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => void toggleCategory(sub)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.68rem] tracking-wider uppercase border cursor-pointer ${
                              sub.active
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : "bg-stone-100 text-stone-500 border-stone-300"
                            }`}
                          >
                            {sub.active ? (
                              <>
                                <Eye className="h-3 w-3 text-emerald-600" /> Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3 text-stone-400" /> Hidden
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => editCategory(sub)}
                              className="border border-gold/45 p-1.5 text-cocoa hover:bg-cream cursor-pointer"
                              title="Edit subcategory"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => void deleteCat(sub)}
                              className="border border-red-200 p-1.5 text-red-700 hover:bg-red-50 cursor-pointer"
                              title="Delete subcategory"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: PARENT CATEGORIES */}
        {activeTab === "categories" && (
          <div className="mt-6">
            <div className="flex items-center justify-between border border-gold/30 bg-card p-4">
              <p className="text-xs text-taupe">
                Top-level departments (e.g. Digital Invitations, Stationery, Physical Cards, Video Invitations).
              </p>
              <button
                type="button"
                onClick={() => void loadData()}
                className="text-taupe hover:text-brown inline-flex items-center gap-1.5 text-xs uppercase tracking-widest cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>

            <div className="mt-6 overflow-x-auto border border-gold/35 bg-card shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-gold/30 bg-beige/30 uppercase tracking-[0.16em] text-taupe">
                  <tr>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3 text-center">Display Order</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/20 text-brown">
                  {parentCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-cream/60 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-sm text-brown">{cat.name}</p>
                        {cat.description ? (
                          <p className="text-taupe line-clamp-1 text-[0.68rem]">{cat.description}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 font-mono text-[0.7rem] text-taupe">/{cat.slug}</td>
                      <td className="px-4 py-3 text-center font-mono">{cat.displayOrder}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => void toggleCategory(cat)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.68rem] tracking-wider uppercase border cursor-pointer ${
                            cat.active
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-stone-100 text-stone-500 border-stone-300"
                          }`}
                        >
                          {cat.active ? (
                            <>
                              <Eye className="h-3 w-3 text-emerald-600" /> Active
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 text-stone-400" /> Hidden
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => editCategory(cat)}
                            className="border border-gold/45 p-1.5 text-cocoa hover:bg-cream cursor-pointer"
                            title="Edit category"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void deleteCat(cat)}
                            className="border border-red-200 p-1.5 text-red-700 hover:bg-red-50 cursor-pointer"
                            title="Delete category"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CATEGORY / SUBCATEGORY MODAL */}
      {catModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/60 p-4 backdrop-blur-xs">
          <div className="border-gold/45 bg-card max-h-[90vh] w-full max-w-xl overflow-y-auto border p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gold/30 pb-3">
              <h2 className="font-serif text-xl text-brown">
                {catEditingId
                  ? `Edit ${catForm.type === "subcategory" ? "Subcategory" : "Category"}`
                  : `New ${catForm.type === "subcategory" ? "Subcategory" : "Category"}`}
              </h2>
              <button
                type="button"
                onClick={() => setCatModalOpen(false)}
                className="text-taupe hover:text-brown cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => void submitCategory(e)} className="mt-5 space-y-4">
              <Field label="Category / Subcategory Name">
                <input
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. Save the Date, Roka Ceremony, Wedding Invite"
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Type">
                  <select
                    value={catForm.type}
                    onChange={(e) =>
                      setCatForm({
                        ...catForm,
                        type: e.target.value as "category" | "subcategory",
                      })
                    }
                    className={inputClass}
                  >
                    <option value="subcategory">Subcategory (in catalogue)</option>
                    <option value="category">Parent Category</option>
                  </select>
                </Field>
                <Field label="Display Order">
                  <input
                    type="number"
                    value={catForm.displayOrder}
                    onChange={(e) => setCatForm({ ...catForm, displayOrder: Number(e.target.value) })}
                    className={inputClass}
                  />
                </Field>
              </div>

              {catForm.type === "subcategory" && (
                <Field label="Parent Category">
                  <select
                    value={catForm.parentId || ""}
                    onChange={(e) => setCatForm({ ...catForm, parentId: e.target.value || null })}
                    className={inputClass}
                  >
                    <option value="">None (Top Level)</option>
                    {parentCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label="Cover Image URL (optional)">
                <input
                  type="url"
                  value={catForm.image}
                  onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                  placeholder="https://... (or leave blank to use default design cover)"
                  className={inputClass}
                />
              </Field>

              <Field label="Description">
                <textarea
                  rows={3}
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  placeholder="Short description displayed on category cards."
                  className={`${inputClass} resize-y`}
                />
              </Field>

              <div className="flex items-center pt-2">
                <label className="flex cursor-pointer items-center gap-3 text-xs uppercase tracking-wider text-brown">
                  <input
                    type="checkbox"
                    checked={catForm.active}
                    onChange={(e) => setCatForm({ ...catForm, active: e.target.checked })}
                    className="accent-brown h-4 w-4"
                  />
                  Active on public website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gold/30 pt-4">
                <button
                  type="button"
                  onClick={() => setCatModalOpen(false)}
                  className="border border-brown/40 px-4 py-2 text-xs uppercase tracking-widest text-brown hover:bg-cream cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={saving}
                  className="bg-brown hover:bg-cocoa border border-brown px-6 py-2 text-xs uppercase tracking-widest text-cream disabled:opacity-60 cursor-pointer"
                >
                  {saving ? "Saving..." : catEditingId ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DESIGN / PRODUCT MODAL */}
      {prodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/60 p-4 backdrop-blur-xs">
          <div className="border-gold/45 bg-card max-h-[92vh] w-full max-w-3xl overflow-y-auto border p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gold/30 pb-3">
              <h2 className="font-serif text-2xl text-brown">
                {prodEditingId ? "Edit Design / Product" : "Add Design / Product"}
              </h2>
              <button
                type="button"
                onClick={() => setProdModalOpen(false)}
                className="text-taupe hover:text-brown cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => void submitProduct(e)} className="mt-5 space-y-4">
              {/* PRIMARY FIELDS */}
              <Field label="Design Name">
                <input
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value, title: e.target.value })}
                  placeholder="e.g. Save The Date Invitation PDF — Design 1"
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Parent Category">
                  <select
                    value={prodForm.parentCategory}
                    onChange={(e) => {
                      const newParent = e.target.value;
                      const parentObj = parentCategories.find((p) => p.name === newParent);
                      const matchingSubs = subcategories.filter((s) => s.parentId === parentObj?.id);
                      setProdForm({
                        ...prodForm,
                        parentCategory: newParent,
                        categoryId: matchingSubs[0]?.id || prodForm.categoryId,
                      });
                    }}
                    className={inputClass}
                  >
                    <option value="Digital Invitations">Digital Invitations</option>
                    <option value="Video Invitations">Video Invitations</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Physical Cards">Physical Cards</option>
                  </select>
                </Field>

                <Field label="Subcategory">
                  <select
                    required
                    value={prodForm.categoryId}
                    onChange={(e) => setProdForm({ ...prodForm, categoryId: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select Subcategory</option>
                    {availableSubcategoriesForForm.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Price (₹)">
                  <input
                    required
                    min="0"
                    type="number"
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Cover Image & Gallery */}
              <Field label="Cover Image URL">
                <input
                  required
                  type="url"
                  value={prodForm.image}
                  onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                  placeholder="https://... Cover image URL"
                  className={inputClass}
                />
              </Field>

              <div>
                <span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">
                  Additional Gallery Images (up to 4 thumbnails in modal)
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {prodForm.images.map((img, i) => (
                    <input
                      key={i}
                      type="url"
                      value={img}
                      onChange={(e) => {
                        const next = [...prodForm.images];
                        next[i] = e.target.value;
                        setProdForm({ ...prodForm, images: next });
                      }}
                      placeholder={`Gallery Image ${i + 2} URL`}
                      className={inputClass}
                    />
                  ))}
                </div>
              </div>

              {/* Image Preview */}
              <div className="border-gold/25 flex items-center gap-4 border bg-cream p-3">
                <img
                  src={prodForm.image || fallbackImage}
                  alt="Preview"
                  className="h-16 w-16 border border-gold/30 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <p className="text-taupe text-xs">
                  Cover thumbnail. When clicked on the website, this design opens in the interactive product detail
                  modal showing the cover and all gallery previews.
                </p>
              </div>

              <Field label="Description">
                <textarea
                  required
                  rows={3}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  placeholder="Describe design motif, elegance, and ceremony suitability."
                  className={`${inputClass} resize-y`}
                />
              </Field>

              {/* Video Fields (Highlighted if video or parent is video) */}
              <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
                <Field label="Video URL (optional for animated video invites)">
                  <input
                    type="url"
                    value={prodForm.videoUrl}
                    onChange={(e) => setProdForm({ ...prodForm, videoUrl: e.target.value })}
                    placeholder="MP4 or YouTube/Vimeo URL"
                    className={inputClass}
                  />
                </Field>
                <Field label="Video Duration">
                  <input
                    value={prodForm.duration}
                    onChange={(e) => setProdForm({ ...prodForm, duration: e.target.value })}
                    placeholder="e.g. 0:45"
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* COLLAPSIBLE ADVANCED OPTIONS */}
              <div className="border-t border-gold/30 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="text-cocoa hover:text-brown inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium cursor-pointer"
                >
                  {showAdvancedOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {showAdvancedOptions ? "Hide Advanced Options" : "Show Advanced Options"}
                </button>

                {showAdvancedOptions && (
                  <div className="mt-4 space-y-4 border border-gold/30 bg-beige/20 p-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Field label="Collection Name (optional)">
                        <input
                          value={prodForm.collection}
                          onChange={(e) => setProdForm({ ...prodForm, collection: e.target.value })}
                          placeholder="e.g. Ivory Arch"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="SEO Slug (URL-friendly)">
                        <input
                          value={prodForm.slug}
                          onChange={(e) => setProdForm({ ...prodForm, slug: e.target.value })}
                          placeholder="Auto-generated if blank"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Display Order">
                        <input
                          type="number"
                          value={prodForm.displayOrder}
                          onChange={(e) => setProdForm({ ...prodForm, displayOrder: Number(e.target.value) })}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    {/* Features */}
                    <div>
                      <span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">
                        Features / Highlights (up to 4 bullet points)
                      </span>
                      <div className="space-y-2">
                        {prodForm.details.map((feat, i) => (
                          <input
                            key={i}
                            value={feat}
                            onChange={(e) => {
                              const next = [...prodForm.details];
                              next[i] = e.target.value;
                              setProdForm({ ...prodForm, details: next });
                            }}
                            placeholder={`Feature ${i + 1}, e.g. 1 designed page, print + share ready PDF`}
                            className={inputClass}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Specifications */}
                    <div>
                      <span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">
                        Specifications (Label & Value pairs)
                      </span>
                      <div className="space-y-2">
                        {prodForm.specs.map((sp, i) => (
                          <div key={i} className="grid grid-cols-2 gap-2">
                            <input
                              value={sp.label}
                              onChange={(e) => {
                                const next = [...prodForm.specs];
                                const item = next[i] ?? { label: "", value: "" };
                                next[i] = { ...item, label: e.target.value };
                                setProdForm({ ...prodForm, specs: next });
                              }}
                              placeholder="Label, e.g. Format"
                              className={inputClass}
                            />
                            <input
                              value={sp.value}
                              onChange={(e) => {
                                const next = [...prodForm.specs];
                                const item = next[i] ?? { label: "", value: "" };
                                next[i] = { ...item, value: e.target.value };
                                setProdForm({ ...prodForm, specs: next });
                              }}
                              placeholder="Value, e.g. PDF + JPG"
                              className={inputClass}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery & Customization */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Delivery Information">
                        <textarea
                          rows={2}
                          value={prodForm.delivery}
                          onChange={(e) => setProdForm({ ...prodForm, delivery: e.target.value })}
                          className={`${inputClass} resize-y`}
                        />
                      </Field>
                      <Field label="Customization Information">
                        <textarea
                          rows={2}
                          value={prodForm.customization}
                          onChange={(e) => setProdForm({ ...prodForm, customization: e.target.value })}
                          className={`${inputClass} resize-y`}
                        />
                      </Field>
                    </div>

                    {/* Flags */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <label className="flex cursor-pointer items-center gap-2.5 text-xs uppercase tracking-wider text-brown">
                        <input
                          type="checkbox"
                          checked={prodForm.active}
                          onChange={(e) => setProdForm({ ...prodForm, active: e.target.checked })}
                          className="accent-brown h-4 w-4"
                        />
                        Active on public catalogue
                      </label>
                      <label className="flex cursor-pointer items-center gap-2.5 text-xs uppercase tracking-wider text-brown">
                        <input
                          type="checkbox"
                          checked={prodForm.featured}
                          onChange={(e) => setProdForm({ ...prodForm, featured: e.target.checked })}
                          className="accent-brown h-4 w-4"
                        />
                        Mark as Featured design
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gold/30 pt-4">
                <button
                  type="button"
                  onClick={() => setProdModalOpen(false)}
                  className="border border-brown/40 px-4 py-2 text-xs uppercase tracking-widest text-brown hover:bg-cream cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  disabled={saving}
                  className="bg-brown hover:bg-cocoa border border-brown px-6 py-2 text-xs uppercase tracking-widest text-cream disabled:opacity-60 cursor-pointer"
                >
                  {saving ? "Saving..." : prodEditingId ? "Save Changes" : "Add Design"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function AdminLogin({ onSignedIn }: { onSignedIn: (username: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const session = await loginAdmin({ data: { username, password } });
      onSignedIn(session.username);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5 py-10 text-brown">
      <form
        onSubmit={(event) => void submit(event)}
        className="w-full max-w-md border border-gold/35 bg-card p-7 shadow-card sm:p-9"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/55 text-gold">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <p className="text-gold mt-5 text-center text-[0.62rem] tracking-[0.32em] uppercase">The Shubhmilan</p>
        <h1 className="mt-2 text-center text-4xl">Admin sign in</h1>
        <p className="text-taupe mt-3 text-center text-sm leading-relaxed">
          Enter the credentials configured on the server to manage your catalogue.
        </p>
        <div className="mt-7 space-y-4">
          <Field label="Username">
            <input
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Password">
            <input
              autoComplete="current-password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        {error ? (
          <p role="alert" className="mt-4 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <button
          disabled={submitting}
          className="bg-brown hover:bg-cocoa mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-xs tracking-[0.22em] uppercase text-cream disabled:opacity-65 cursor-pointer"
        >
          <LogIn className="h-4 w-4" /> {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function AdminLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream">
      <LoaderCircle className="h-6 w-6 animate-spin text-gold" />
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "border-gold/40 focus:border-brown w-full border bg-cream px-3 py-2.5 text-sm outline-none transition-colors";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
