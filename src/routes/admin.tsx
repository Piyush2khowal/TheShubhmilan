import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit3, ImageIcon, LoaderCircle, LockKeyhole, LogIn, LogOut, PackagePlus, Plus, Trash2, X } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

import {
  createAdminProduct,
  deleteAdminProduct,
  fallbackImage,
  getAdminSession,
  listAdminProducts,
  loginAdmin,
  logoutAdmin,
  type AdminProduct,
  updateAdminProduct,
} from "@/lib/product.server";

const blankProduct = {
  title: "",
  category: "Digital Invitation",
  collection: "",
  price: 0,
  description: "",
  image: "",
  images: ["", "", "", "", ""],
  details: ["", "", "", ""],
  specs: [
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ],
  delivery: "",
  customization: "",
  isActive: true,
  videoUrl: "",
  duration: "",
};

type ProductForm = typeof blankProduct;

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Product Manager — TheShubhmilan" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState<ProductForm>(blankProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [authChecking, setAuthChecking] = useState(true);
  const [adminName, setAdminName] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProducts(await listAdminProducts());
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getAdminSession()
      .then((session) => {
        if (session) {
          setAdminName(session.username);
          void loadProducts();
        } else {
          setLoading(false);
        }
      })
      .catch((caught) => {
        setError(errorMessage(caught));
        setLoading(false);
      })
      .finally(() => setAuthChecking(false));
  }, [loadProducts]);

  async function signOut() {
    await logoutAdmin();
    setAdminName(null);
    setProducts([]);
    resetForm();
    setMessage("");
  }

  if (authChecking) {
    return <AdminLoading />;
  }

  if (!adminName) {
    return <AdminLogin onSignedIn={(username) => { setAdminName(username); void loadProducts(); }} />;
  }

  function resetForm() {
    setForm(blankProduct);
    setEditingId(null);
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      if (editingId) {
        const saved = await updateAdminProduct({ data: { ...form, id: editingId } });
        setProducts((items) => items.map((item) => (item.id === saved.id ? saved : item)));
        setMessage("Product updated.");
      } else {
        const saved = await createAdminProduct({ data: form });
        setProducts((items) => [saved, ...items]);
        setMessage("Product added to MongoDB.");
      }
      resetForm();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSaving(false);
    }
  }

  function edit(product: AdminProduct) {
    setForm({
      title: product.title,
      category: product.category,
      collection: product.collection,
      price: product.price,
      description: product.description,
      image: product.image,
      images: [...product.images, "", "", "", "", ""].slice(0, 5),
      details: [...product.details, "", "", "", ""].slice(0, 4),
      specs: [...product.specs, { label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }].slice(0, 4),
      delivery: product.delivery,
      customization: product.customization,
      isActive: product.isActive,
      videoUrl: product.videoUrl,
      duration: product.duration,
    });
    setEditingId(product.id);
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(product: AdminProduct) {
    if (!window.confirm(`Delete “${product.title}”? This cannot be undone.`)) return;
    setError("");
    setMessage("");
    try {
      await deleteAdminProduct({ data: { id: product.id } });
      setProducts((items) => items.filter((item) => item.id !== product.id));
      if (editingId === product.id) resetForm();
      setMessage("Product deleted.");
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-10 text-brown sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-gold/40 pb-7">
          <div>
            <p className="text-gold text-[0.65rem] tracking-[0.34em] uppercase">TheShubhmilan</p>
            <h1 className="mt-2 text-4xl sm:text-5xl">Product Manager</h1>
            <p className="text-taupe mt-2 max-w-xl text-sm leading-relaxed">
              Add, update, or remove the products saved in your MongoDB catalogue.
            </p>
          </div>
          <div className="flex items-center gap-3"><span className="hidden text-xs text-taupe sm:inline">Signed in as {adminName}</span><button type="button" onClick={() => void signOut()} className="border-brown/45 hover:bg-brown inline-flex items-center gap-2 border px-4 py-2 text-xs tracking-[0.18em] uppercase hover:text-cream"><LogOut className="h-3.5 w-3.5" /> Sign out</button><Link to="/" className="border-brown/45 hover:bg-brown border px-4 py-2 text-xs tracking-[0.18em] uppercase hover:text-cream">View website</Link></div>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
          <section className="h-fit border border-gold/35 bg-card p-5 shadow-card sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-2xl"><PackagePlus className="h-5 w-5 text-gold" /> {editingId ? "Edit product" : "New product"}</h2>
              {editingId ? <button type="button" onClick={resetForm} className="text-taupe hover:text-brown text-xs tracking-widest uppercase">Cancel</button> : null}
            </div>
            <form className="mt-6 space-y-4" onSubmit={(event) => void submit(event)}>
              <Field label="Product name"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="e.g. Royal Garden Invite" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category"><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}><option>Digital Invitation</option><option>Stationery</option><option>Physical Card</option><option>Video Invitation</option></select></Field>
                <Field label="Price (₹)"><input required min="0" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={inputClass} /></Field>
              </div>
              <Field label="Collection (optional)"><input value={form.collection} onChange={(e) => setForm({ ...form, collection: e.target.value })} className={inputClass} placeholder="Royal Garden" /></Field>
              <div><span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Image URLs — up to 5</span><div className="grid gap-3 sm:grid-cols-2">{form.images.map((image, index) => <input key={index} type="url" value={image} onChange={(e) => { const images = [...form.images]; images[index] = e.target.value; setForm({ ...form, images }); }} className={inputClass} placeholder={index === 0 ? "Cover image URL (optional)" : `Gallery image ${index + 1} URL`} />)}</div><p className="text-taupe mt-2 text-xs">The first image is the cover. Leave all fields blank to use the temporary image.</p></div>
              {form.category === "Video Invitation" ? <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_7rem]"><Field label="Video URL"><input type="url" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} className={inputClass} placeholder="MP4, YouTube, or Vimeo URL" /></Field><Field label="Duration"><input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={inputClass} placeholder="0:45" /></Field></div> : null}
              <div className="border-gold/20 flex h-28 items-center gap-4 overflow-hidden border bg-cream p-2">
                <img src={form.images[0] || fallbackImage} alt="Product preview" className="h-full w-20 object-cover" onError={(e) => { e.currentTarget.src = fallbackImage; }} />
                <p className="text-taupe flex items-center gap-2 text-xs leading-relaxed"><ImageIcon className="h-4 w-4 shrink-0 text-gold" /> The product detail window shows the cover plus up to four gallery thumbnails.</p>
              </div>
              <Field label="Description"><textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-y`} placeholder="Describe materials, style, and what is included." /></Field>
              <div><span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Features — up to 4</span><div className="space-y-2">{form.details.map((detail, index) => <input key={index} value={detail} onChange={(e) => { const details = [...form.details]; details[index] = e.target.value; setForm({ ...form, details }); }} className={inputClass} placeholder={`Feature ${index + 1}, e.g. Custom names and date`} />)}</div></div>
              <div><span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">Specifications — up to 4</span><div className="space-y-2">{form.specs.map((spec, index) => <div key={index} className="grid gap-2 sm:grid-cols-2"><input value={spec.label} onChange={(e) => { const specs = [...form.specs]; const current = specs[index] ?? { label: "", value: "" }; specs[index] = { ...current, label: e.target.value }; setForm({ ...form, specs }); }} className={inputClass} placeholder="Label, e.g. Format" /><input value={spec.value} onChange={(e) => { const specs = [...form.specs]; const current = specs[index] ?? { label: "", value: "" }; specs[index] = { ...current, value: e.target.value }; setForm({ ...form, specs }); }} className={inputClass} placeholder="Value, e.g. PDF + JPG" /></div>)}</div></div>
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Delivery"><textarea rows={3} value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })} className={`${inputClass} resize-y`} placeholder="e.g. Delivered within 2–3 working days" /></Field><Field label="Customisation"><textarea rows={3} value={form.customization} onChange={(e) => setForm({ ...form, customization: e.target.value })} className={`${inputClass} resize-y`} placeholder="e.g. Names, dates and colours are customisable" /></Field></div>
              <label className="flex cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-brown h-4 w-4" /> Show this product as active</label>
              {error ? <p role="alert" className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
              {message ? <p role="status" className="border border-gold/45 bg-cream px-3 py-2 text-sm text-cocoa">{message}</p> : null}
              <button disabled={saving} className="bg-brown hover:bg-cocoa inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-xs tracking-[0.22em] uppercase text-cream disabled:cursor-wait disabled:opacity-65">
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : editingId ? <Edit3 className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {saving ? "Saving…" : editingId ? "Save changes" : "Add product"}
              </button>
            </form>
          </section>

          <section>
            <div className="flex items-center justify-between"><h2 className="text-2xl">Saved products</h2><span className="text-taupe text-xs tracking-widest uppercase">{products.length} total</span></div>
            {loading ? <div className="mt-6 grid min-h-64 place-items-center border border-gold/30 bg-card"><LoaderCircle className="h-6 w-6 animate-spin text-gold" /></div> : null}
            {!loading && !error && products.length === 0 ? <div className="text-taupe mt-6 border border-dashed border-gold/45 bg-card px-6 py-16 text-center text-sm">No MongoDB products yet. Use the form to create your first one.</div> : null}
            {!loading && products.length > 0 ? <div className="mt-6 grid gap-4 sm:grid-cols-2">{products.map((product) => <article key={product.id} className="overflow-hidden border border-gold/30 bg-card"><img src={product.image} alt={product.title} className="h-40 w-full object-cover" onError={(e) => { e.currentTarget.src = fallbackImage; }} /><div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-gold text-[0.58rem] tracking-[0.25em] uppercase">{product.category}</p><h3 className="mt-1 text-xl leading-tight">{product.title}</h3></div><span className={`mt-1 h-2 w-2 rounded-full ${product.isActive ? "bg-emerald-500" : "bg-stone-300"}`} title={product.isActive ? "Active" : "Hidden"} /></div><p className="text-taupe mt-2 line-clamp-2 text-xs leading-relaxed">{product.description}</p><div className="mt-4 flex items-center justify-between border-t border-gold/20 pt-3"><span className="font-display text-lg">₹{product.price.toLocaleString("en-IN")}</span><div className="flex gap-2"><button type="button" onClick={() => edit(product)} className="border border-gold/45 p-2 text-cocoa hover:bg-cream" aria-label={`Edit ${product.title}`}><Edit3 className="h-3.5 w-3.5" /></button><button type="button" onClick={() => void remove(product)} className="border border-red-200 p-2 text-red-700 hover:bg-red-50" aria-label={`Delete ${product.title}`}><Trash2 className="h-3.5 w-3.5" /></button></div></div></div></article>)}</div> : null}
          </section>
        </div>
      </div>
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
      <form onSubmit={(event) => void submit(event)} className="w-full max-w-md border border-gold/35 bg-card p-7 shadow-card sm:p-9">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/55 text-gold"><LockKeyhole className="h-5 w-5" /></div>
        <p className="text-gold mt-5 text-center text-[0.62rem] tracking-[0.32em] uppercase">TheShubhmilan</p>
        <h1 className="mt-2 text-center text-4xl">Admin sign in</h1>
        <p className="text-taupe mt-3 text-center text-sm leading-relaxed">Enter the credentials configured on the server to manage your catalogue.</p>
        <div className="mt-7 space-y-4"><Field label="Username"><input autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} /></Field><Field label="Password"><input autoComplete="current-password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} /></Field></div>
        {error ? <p role="alert" className="mt-4 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        <button disabled={submitting} className="bg-brown hover:bg-cocoa mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-xs tracking-[0.22em] uppercase text-cream disabled:opacity-65"><LogIn className="h-4 w-4" /> {submitting ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}

function AdminLoading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><LoaderCircle className="h-6 w-6 animate-spin text-gold" /></main>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm"><span className="mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe">{label}</span>{children}</label>;
}

const inputClass = "border-gold/40 focus:border-brown w-full border bg-cream px-3 py-2.5 text-sm outline-none transition-colors";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
