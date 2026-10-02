import { a as TSS_SERVER_FUNCTION, i as createServerFn, o as getServerFnById } from "./server-DkRTZiFo.mjs";
import { a as objectType, i as numberType, n as booleanType, o as stringType, r as literalType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product.server-BFclRhbs.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var getAdminSession = createServerFn({ method: "GET" }).handler(createSsrRpc("fd2c0168a388f0284ee0357cd82a48f05aae7ff38d86fd2d4633df5b09a449d8"));
var loginAdmin = createServerFn({ method: "POST" }).validator(credentialsInput).handler(createSsrRpc("feee7bd97dbf3833e8b32fd1107adba41f10744067174071a2637efff16ce8e8"));
var logoutAdmin = createServerFn({ method: "POST" }).handler(createSsrRpc("15c8bf4e877313cce3834706e27ceee272bd3c2c33921e34e66de406ea65aca2"));
var listPublicProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("9a76e042859842e7486a7c7b760c60f2d802a27638378c911bf5c34a6a9904fa"));
var listAdminProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("f4fc56b84f8a3738754f4d25339d6c05261fe58f2e26fee291aec67bc30e0edf"));
var createAdminProduct = createServerFn({ method: "POST" }).validator(productInput).handler(createSsrRpc("3e1d7f398e469c0d5f9d02e4d2c2d53a263d5c228e28d7bc312c313214c8a6af"));
var updateAdminProduct = createServerFn({ method: "POST" }).validator(productInput.extend({ id: stringType().regex(/^[a-f\d]{24}$/i, "Invalid product id.") })).handler(createSsrRpc("7fa8a55c0808447abaed59d7e5736d119bdfcba5417c96372f1ec39efaee9c19"));
var deleteAdminProduct = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().regex(/^[a-f\d]{24}$/i, "Invalid product id.") })).handler(createSsrRpc("a30cffcc66d1c069d24c8c4707334f14500f56608ccf3d4eb33a30477124a2a5"));
//#endregion
export { listPublicProducts as a, updateAdminProduct as c, listAdminProducts as i, deleteAdminProduct as n, loginAdmin as o, getAdminSession as r, logoutAdmin as s, createAdminProduct as t };
