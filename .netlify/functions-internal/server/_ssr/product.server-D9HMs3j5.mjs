import { a as TSS_SERVER_FUNCTION, i as createServerFn } from "./server-DkRTZiFo.mjs";
import { a as objectType, i as numberType, n as booleanType, o as stringType, r as literalType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product.server-D9HMs3j5.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var credentialsInput = objectType({
	username: stringType().trim().min(1),
	password: stringType().min(1)
});
var imageUrl = stringType().trim().url("Enter a valid image URL.").or(literalType(""));
var specificationInput = objectType({
	label: stringType().trim().max(50),
	value: stringType().trim().max(120)
});
var productInput = objectType({
	title: stringType().trim().min(2, "Enter a product name.").max(120),
	category: stringType().trim().min(2, "Enter a category.").max(60),
	collection: stringType().trim().max(80).default(""),
	price: numberType().nonnegative("Price cannot be negative."),
	description: stringType().trim().min(10, "Add a short description.").max(600),
	image: imageUrl,
	images: arrayType(imageUrl).max(5).default([]),
	details: arrayType(stringType().trim().max(180)).max(8).default([]),
	specs: arrayType(specificationInput).max(6).default([]),
	delivery: stringType().trim().max(500).default(""),
	customization: stringType().trim().max(500).default(""),
	isActive: booleanType().default(true),
	videoUrl: stringType().trim().url("Enter a valid video URL.").or(literalType("")),
	duration: stringType().trim().max(20).default("")
});
var getAdminSession_createServerFn_handler = createServerRpc({
	id: "fd2c0168a388f0284ee0357cd82a48f05aae7ff38d86fd2d4633df5b09a449d8",
	name: "getAdminSession",
	filename: "src/lib/product.server.ts"
}, (opts) => getAdminSession.__executeServer(opts));
var getAdminSession = createServerFn({ method: "GET" }).handler(getAdminSession_createServerFn_handler, async () => {
	const { getAdminSession: getSession } = await import("./admin-auth.server-8-3RAmLJ.mjs");
	return getSession();
});
var loginAdmin_createServerFn_handler = createServerRpc({
	id: "feee7bd97dbf3833e8b32fd1107adba41f10744067174071a2637efff16ce8e8",
	name: "loginAdmin",
	filename: "src/lib/product.server.ts"
}, (opts) => loginAdmin.__executeServer(opts));
var loginAdmin = createServerFn({ method: "POST" }).validator(credentialsInput).handler(loginAdmin_createServerFn_handler, async ({ data }) => {
	const { createAdminSession, verifyAdminCredentials } = await import("./admin-auth.server-8-3RAmLJ.mjs");
	if (!verifyAdminCredentials(data.username, data.password)) throw new Error("Invalid username or password.");
	createAdminSession(data.username);
	return { username: data.username };
});
var logoutAdmin_createServerFn_handler = createServerRpc({
	id: "15c8bf4e877313cce3834706e27ceee272bd3c2c33921e34e66de406ea65aca2",
	name: "logoutAdmin",
	filename: "src/lib/product.server.ts"
}, (opts) => logoutAdmin.__executeServer(opts));
var logoutAdmin = createServerFn({ method: "POST" }).handler(logoutAdmin_createServerFn_handler, async () => {
	const { clearAdminSession } = await import("./admin-auth.server-8-3RAmLJ.mjs");
	clearAdminSession();
});
var listPublicProducts_createServerFn_handler = createServerRpc({
	id: "9a76e042859842e7486a7c7b760c60f2d802a27638378c911bf5c34a6a9904fa",
	name: "listPublicProducts",
	filename: "src/lib/product.server.ts"
}, (opts) => listPublicProducts.__executeServer(opts));
var listPublicProducts = createServerFn({ method: "GET" }).handler(listPublicProducts_createServerFn_handler, async () => {
	const { listActiveProducts } = await import("./product-model.server-rcanZtJb.mjs");
	return listActiveProducts();
});
var listAdminProducts_createServerFn_handler = createServerRpc({
	id: "f4fc56b84f8a3738754f4d25339d6c05261fe58f2e26fee291aec67bc30e0edf",
	name: "listAdminProducts",
	filename: "src/lib/product.server.ts"
}, (opts) => listAdminProducts.__executeServer(opts));
var listAdminProducts = createServerFn({ method: "GET" }).handler(listAdminProducts_createServerFn_handler, async () => {
	const { requireAdmin } = await import("./admin-auth.server-8-3RAmLJ.mjs");
	requireAdmin();
	const { listProducts } = await import("./product-model.server-rcanZtJb.mjs");
	return listProducts();
});
var createAdminProduct_createServerFn_handler = createServerRpc({
	id: "3e1d7f398e469c0d5f9d02e4d2c2d53a263d5c228e28d7bc312c313214c8a6af",
	name: "createAdminProduct",
	filename: "src/lib/product.server.ts"
}, (opts) => createAdminProduct.__executeServer(opts));
var createAdminProduct = createServerFn({ method: "POST" }).validator(productInput).handler(createAdminProduct_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin-auth.server-8-3RAmLJ.mjs");
	requireAdmin();
	const { createProduct } = await import("./product-model.server-rcanZtJb.mjs");
	return createProduct(data);
});
var updateAdminProduct_createServerFn_handler = createServerRpc({
	id: "7fa8a55c0808447abaed59d7e5736d119bdfcba5417c96372f1ec39efaee9c19",
	name: "updateAdminProduct",
	filename: "src/lib/product.server.ts"
}, (opts) => updateAdminProduct.__executeServer(opts));
var updateAdminProduct = createServerFn({ method: "POST" }).validator(productInput.extend({ id: stringType().regex(/^[a-f\d]{24}$/i, "Invalid product id.") })).handler(updateAdminProduct_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin-auth.server-8-3RAmLJ.mjs");
	requireAdmin();
	const { id, ...values } = data;
	const { updateProduct } = await import("./product-model.server-rcanZtJb.mjs");
	return updateProduct(id, values);
});
var deleteAdminProduct_createServerFn_handler = createServerRpc({
	id: "a30cffcc66d1c069d24c8c4707334f14500f56608ccf3d4eb33a30477124a2a5",
	name: "deleteAdminProduct",
	filename: "src/lib/product.server.ts"
}, (opts) => deleteAdminProduct.__executeServer(opts));
var deleteAdminProduct = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().regex(/^[a-f\d]{24}$/i, "Invalid product id.") })).handler(deleteAdminProduct_createServerFn_handler, async ({ data }) => {
	const { requireAdmin } = await import("./admin-auth.server-8-3RAmLJ.mjs");
	requireAdmin();
	const { deleteProduct } = await import("./product-model.server-rcanZtJb.mjs");
	return deleteProduct(data.id);
});
//#endregion
export { createAdminProduct_createServerFn_handler, deleteAdminProduct_createServerFn_handler, getAdminSession_createServerFn_handler, listAdminProducts_createServerFn_handler, listPublicProducts_createServerFn_handler, loginAdmin_createServerFn_handler, logoutAdmin_createServerFn_handler, updateAdminProduct_createServerFn_handler };
