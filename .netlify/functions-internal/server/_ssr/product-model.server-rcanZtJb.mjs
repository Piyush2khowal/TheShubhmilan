import { o as __toESM } from "../_runtime.mjs";
import { t as fallbackImage } from "./product.shared-CINkudJS.mjs";
import { t as require_mongoose } from "../_libs/mongoose+mpath+mquery+ms+sift.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-model.server-rcanZtJb.js
var import_mongoose = /* @__PURE__ */ __toESM(require_mongoose());
async function connectToDatabase() {
	const uri = process.env["MONGODB_URI"];
	if (!uri) throw new Error("MONGODB_URI is not configured. Add it to your server environment before using the admin page.");
	if (import_mongoose.default.connection.readyState === 1) return import_mongoose.default;
	if (!globalThis.mongooseConnection) globalThis.mongooseConnection = import_mongoose.default.connect(uri, { serverSelectionTimeoutMS: 5e3 });
	try {
		return await globalThis.mongooseConnection;
	} catch (error) {
		globalThis.mongooseConnection = void 0;
		throw error;
	}
}
var productSchema = new import_mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	category: {
		type: String,
		required: true,
		trim: true
	},
	collection: {
		type: String,
		trim: true,
		default: ""
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	image: {
		type: String,
		required: true,
		default: fallbackImage
	},
	images: {
		type: [String],
		default: []
	},
	details: {
		type: [String],
		default: []
	},
	specs: {
		type: [{
			label: {
				type: String,
				trim: true
			},
			value: {
				type: String,
				trim: true
			}
		}],
		default: []
	},
	delivery: {
		type: String,
		trim: true,
		default: ""
	},
	customization: {
		type: String,
		trim: true,
		default: ""
	},
	isActive: {
		type: Boolean,
		default: true
	},
	videoUrl: {
		type: String,
		trim: true,
		default: ""
	},
	duration: {
		type: String,
		trim: true,
		default: ""
	}
}, { timestamps: true });
var Product = import_mongoose.default.models["Product"] || import_mongoose.default.model("Product", productSchema);
function serializeProduct(product) {
	return {
		id: product._id.toString(),
		title: product.title,
		category: product.category,
		collection: product.collection ?? "",
		price: product.price,
		description: product.description,
		image: product.image || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
		images: product.images?.length ? product.images : [product.image || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80"],
		details: product.details ?? [],
		specs: Array.isArray(product.specs) ? product.specs.map((spec) => {
			const value = spec;
			return {
				label: typeof value.label === "string" ? value.label : "",
				value: typeof value.value === "string" ? value.value : ""
			};
		}).filter((spec) => spec.label && spec.value) : [],
		delivery: product.delivery ?? "",
		customization: product.customization ?? "",
		isActive: product.isActive ?? true,
		videoUrl: product.videoUrl ?? "",
		duration: product.duration ?? "",
		updatedAt: product.updatedAt.toISOString()
	};
}
async function listProducts() {
	await connectToDatabase();
	return (await Product.find().sort({ updatedAt: -1 }).lean()).map(serializeProduct);
}
async function listActiveProducts() {
	await connectToDatabase();
	return (await Product.find({ isActive: true }).sort({ updatedAt: -1 }).lean()).map(serializeProduct);
}
function normalizeProductValues(values) {
	const images = Array.from(new Set([values.image, ...values.images].filter(Boolean))).slice(0, 5);
	return {
		...values,
		image: images[0] || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
		images: images.length ? images : [fallbackImage],
		details: values.details.map((detail) => detail.trim()).filter(Boolean).slice(0, 8),
		specs: values.specs.map((spec) => ({
			label: spec.label.trim(),
			value: spec.value.trim()
		})).filter((spec) => spec.label && spec.value).slice(0, 6)
	};
}
async function createProduct(values) {
	await connectToDatabase();
	return serializeProduct(await Product.create(normalizeProductValues(values)));
}
async function updateProduct(id, values) {
	await connectToDatabase();
	const product = await Product.findByIdAndUpdate(id, normalizeProductValues(values), {
		new: true,
		runValidators: true
	});
	if (!product) throw new Error("This product no longer exists.");
	return serializeProduct(product);
}
async function deleteProduct(id) {
	await connectToDatabase();
	if (!await Product.findByIdAndDelete(id)) throw new Error("This product no longer exists.");
	return { id };
}
//#endregion
export { createProduct, deleteProduct, listActiveProducts, listProducts, updateProduct };
