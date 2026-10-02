import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as fallbackImage } from "./product.shared-CINkudJS.mjs";
import { c as updateAdminProduct, i as listAdminProducts, n as deleteAdminProduct, o as loginAdmin, r as getAdminSession, s as logoutAdmin, t as createAdminProduct } from "./product.server-BFclRhbs.mjs";
import { d as LockKeyhole, f as LoaderCircle, i as Plus, l as LogOut, n as Trash2, o as PenLine, p as Image, s as PackagePlus, u as LogIn } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-vOolJX6z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var blankProduct = {
	title: "",
	category: "Digital Invitation",
	collection: "",
	price: 0,
	description: "",
	image: "",
	images: [
		"",
		"",
		"",
		"",
		""
	],
	details: [
		"",
		"",
		"",
		""
	],
	specs: [
		{
			label: "",
			value: ""
		},
		{
			label: "",
			value: ""
		},
		{
			label: "",
			value: ""
		},
		{
			label: "",
			value: ""
		}
	],
	delivery: "",
	customization: "",
	isActive: true,
	videoUrl: "",
	duration: ""
};
function AdminPage() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)(blankProduct);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [authChecking, setAuthChecking] = (0, import_react.useState)(true);
	const [adminName, setAdminName] = (0, import_react.useState)(null);
	const loadProducts = (0, import_react.useCallback)(async () => {
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
	(0, import_react.useEffect)(() => {
		getAdminSession().then((session) => {
			if (session) {
				setAdminName(session.username);
				loadProducts();
			} else setLoading(false);
		}).catch((caught) => {
			setError(errorMessage(caught));
			setLoading(false);
		}).finally(() => setAuthChecking(false));
	}, [loadProducts]);
	async function signOut() {
		await logoutAdmin();
		setAdminName(null);
		setProducts([]);
		resetForm();
		setMessage("");
	}
	if (authChecking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoading, {});
	if (!adminName) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, { onSignedIn: (username) => {
		setAdminName(username);
		loadProducts();
	} });
	function resetForm() {
		setForm(blankProduct);
		setEditingId(null);
		setError("");
	}
	async function submit(event) {
		event.preventDefault();
		setSaving(true);
		setError("");
		setMessage("");
		try {
			if (editingId) {
				const saved = await updateAdminProduct({ data: {
					...form,
					id: editingId
				} });
				setProducts((items) => items.map((item) => item.id === saved.id ? saved : item));
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
	function edit(product) {
		setForm({
			title: product.title,
			category: product.category,
			collection: product.collection,
			price: product.price,
			description: product.description,
			image: product.image,
			images: [
				...product.images,
				"",
				"",
				"",
				"",
				""
			].slice(0, 5),
			details: [
				...product.details,
				"",
				"",
				"",
				""
			].slice(0, 4),
			specs: [
				...product.specs,
				{
					label: "",
					value: ""
				},
				{
					label: "",
					value: ""
				},
				{
					label: "",
					value: ""
				},
				{
					label: "",
					value: ""
				}
			].slice(0, 4),
			delivery: product.delivery,
			customization: product.customization,
			isActive: product.isActive,
			videoUrl: product.videoUrl,
			duration: product.duration
		});
		setEditingId(product.id);
		setError("");
		setMessage("");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	async function remove(product) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-cream px-5 py-10 text-brown sm:px-8 lg:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-5 border-b border-gold/40 pb-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gold text-[0.65rem] tracking-[0.34em] uppercase",
						children: "TheShubhmilan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-4xl sm:text-5xl",
						children: "Product Manager"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-taupe mt-2 max-w-xl text-sm leading-relaxed",
						children: "Add, update, or remove the products saved in your MongoDB catalogue."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden text-xs text-taupe sm:inline",
							children: ["Signed in as ", adminName]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void signOut(),
							className: "border-brown/45 hover:bg-brown inline-flex items-center gap-2 border px-4 py-2 text-xs tracking-[0.18em] uppercase hover:text-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "border-brown/45 hover:bg-brown border px-4 py-2 text-xs tracking-[0.18em] uppercase hover:text-cream",
							children: "View website"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-9 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "h-fit border border-gold/35 bg-card p-5 shadow-card sm:p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePlus, { className: "h-5 w-5 text-gold" }),
								" ",
								editingId ? "Edit product" : "New product"
							]
						}), editingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: resetForm,
							className: "text-taupe hover:text-brown text-xs tracking-widest uppercase",
							children: "Cancel"
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 space-y-4",
						onSubmit: (event) => void submit(event),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Product name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									value: form.title,
									onChange: (e) => setForm({
										...form,
										title: e.target.value
									}),
									className: inputClass,
									placeholder: "e.g. Royal Garden Invite"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Category",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: form.category,
										onChange: (e) => setForm({
											...form,
											category: e.target.value
										}),
										className: inputClass,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Digital Invitation" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Stationery" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Physical Card" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Video Invitation" })
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Price (₹)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										min: "0",
										type: "number",
										value: form.price,
										onChange: (e) => setForm({
											...form,
											price: Number(e.target.value)
										}),
										className: inputClass
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Collection (optional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.collection,
									onChange: (e) => setForm({
										...form,
										collection: e.target.value
									}),
									className: inputClass,
									placeholder: "Royal Garden"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe",
									children: "Image URLs — up to 5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: form.images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										value: image,
										onChange: (e) => {
											const images = [...form.images];
											images[index] = e.target.value;
											setForm({
												...form,
												images
											});
										},
										className: inputClass,
										placeholder: index === 0 ? "Cover image URL (optional)" : `Gallery image ${index + 1} URL`
									}, index))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-taupe mt-2 text-xs",
									children: "The first image is the cover. Leave all fields blank to use the temporary image."
								})
							] }),
							form.category === "Video Invitation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-[minmax(0,1fr)_7rem]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Video URL",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										value: form.videoUrl,
										onChange: (e) => setForm({
											...form,
											videoUrl: e.target.value
										}),
										className: inputClass,
										placeholder: "MP4, YouTube, or Vimeo URL"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Duration",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.duration,
										onChange: (e) => setForm({
											...form,
											duration: e.target.value
										}),
										className: inputClass,
										placeholder: "0:45"
									})
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-gold/20 flex h-28 items-center gap-4 overflow-hidden border bg-cream p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: form.images[0] || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
									alt: "Product preview",
									className: "h-full w-20 object-cover",
									onError: (e) => {
										e.currentTarget.src = fallbackImage;
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-taupe flex items-center gap-2 text-xs leading-relaxed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4 shrink-0 text-gold" }), " The product detail window shows the cover plus up to four gallery thumbnails."]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									required: true,
									rows: 4,
									value: form.description,
									onChange: (e) => setForm({
										...form,
										description: e.target.value
									}),
									className: `${inputClass} resize-y`,
									placeholder: "Describe materials, style, and what is included."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe",
								children: "Features — up to 4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: form.details.map((detail, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: detail,
									onChange: (e) => {
										const details = [...form.details];
										details[index] = e.target.value;
										setForm({
											...form,
											details
										});
									},
									className: inputClass,
									placeholder: `Feature ${index + 1}, e.g. Custom names and date`
								}, index))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe",
								children: "Specifications — up to 4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: form.specs.map((spec, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: spec.label,
										onChange: (e) => {
											const specs = [...form.specs];
											specs[index] = {
												...specs[index] ?? {
													label: "",
													value: ""
												},
												label: e.target.value
											};
											setForm({
												...form,
												specs
											});
										},
										className: inputClass,
										placeholder: "Label, e.g. Format"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: spec.value,
										onChange: (e) => {
											const specs = [...form.specs];
											specs[index] = {
												...specs[index] ?? {
													label: "",
													value: ""
												},
												value: e.target.value
											};
											setForm({
												...form,
												specs
											});
										},
										className: inputClass,
										placeholder: "Value, e.g. PDF + JPG"
									})]
								}, index))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Delivery",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: form.delivery,
										onChange: (e) => setForm({
											...form,
											delivery: e.target.value
										}),
										className: `${inputClass} resize-y`,
										placeholder: "e.g. Delivered within 2–3 working days"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Customisation",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: form.customization,
										onChange: (e) => setForm({
											...form,
											customization: e.target.value
										}),
										className: `${inputClass} resize-y`,
										placeholder: "e.g. Names, dates and colours are customisable"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.isActive,
									onChange: (e) => setForm({
										...form,
										isActive: e.target.checked
									}),
									className: "accent-brown h-4 w-4"
								}), " Show this product as active"]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700",
								children: error
							}) : null,
							message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								className: "border border-gold/45 bg-cream px-3 py-2 text-sm text-cocoa",
								children: message
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: saving,
								className: "bg-brown hover:bg-cocoa inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-xs tracking-[0.22em] uppercase text-cream disabled:cursor-wait disabled:opacity-65",
								children: [
									saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : editingId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
									" ",
									saving ? "Saving…" : editingId ? "Save changes" : "Add product"
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl",
							children: "Saved products"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-taupe text-xs tracking-widest uppercase",
							children: [products.length, " total"]
						})]
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid min-h-64 place-items-center border border-gold/30 bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-gold" })
					}) : null,
					!loading && !error && products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-taupe mt-6 border border-dashed border-gold/45 bg-card px-6 py-16 text-center text-sm",
						children: "No MongoDB products yet. Use the form to create your first one."
					}) : null,
					!loading && products.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "overflow-hidden border border-gold/30 bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: product.title,
								className: "h-40 w-full object-cover",
								onError: (e) => {
									e.currentTarget.src = fallbackImage;
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-gold text-[0.58rem] tracking-[0.25em] uppercase",
											children: product.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 text-xl leading-tight",
											children: product.title
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `mt-1 h-2 w-2 rounded-full ${product.isActive ? "bg-emerald-500" : "bg-stone-300"}`,
											title: product.isActive ? "Active" : "Hidden"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-taupe mt-2 line-clamp-2 text-xs leading-relaxed",
										children: product.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center justify-between border-t border-gold/20 pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-lg",
											children: ["₹", product.price.toLocaleString("en-IN")]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => edit(product),
												className: "border border-gold/45 p-2 text-cocoa hover:bg-cream",
												"aria-label": `Edit ${product.title}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3.5 w-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => void remove(product),
												className: "border border-red-200 p-2 text-red-700 hover:bg-red-50",
												"aria-label": `Delete ${product.title}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})]
										})]
									})
								]
							})]
						}, product.id))
					}) : null
				] })]
			})]
		})
	});
}
function AdminLogin({ onSignedIn }) {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function submit(event) {
		event.preventDefault();
		setSubmitting(true);
		setError("");
		try {
			onSignedIn((await loginAdmin({ data: {
				username,
				password
			} })).username);
		} catch (caught) {
			setError(errorMessage(caught));
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-cream px-5 py-10 text-brown",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void submit(event),
			className: "w-full max-w-md border border-gold/35 bg-card p-7 shadow-card sm:p-9",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/55 text-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gold mt-5 text-center text-[0.62rem] tracking-[0.32em] uppercase",
					children: "TheShubhmilan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-center text-4xl",
					children: "Admin sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-taupe mt-3 text-center text-sm leading-relaxed",
					children: "Enter the credentials configured on the server to manage your catalogue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Username",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoComplete: "username",
							required: true,
							value: username,
							onChange: (e) => setUsername(e.target.value),
							className: inputClass
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoComplete: "current-password",
							required: true,
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: inputClass
						})
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-4 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: submitting,
					className: "bg-brown hover:bg-cocoa mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-xs tracking-[0.22em] uppercase text-cream disabled:opacity-65",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }),
						" ",
						submitting ? "Signing in…" : "Sign in"
					]
				})
			]
		})
	});
}
function AdminLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-gold" })
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-[0.65rem] tracking-[0.2em] uppercase text-taupe",
			children: label
		}), children]
	});
}
var inputClass = "border-gold/40 focus:border-brown w-full border bg-cream px-3 py-2.5 text-sm outline-none transition-colors";
function errorMessage(error) {
	return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
//#endregion
export { AdminPage as component };
