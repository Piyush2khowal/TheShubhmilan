import { c as getCookie, l as setCookie$1, s as deleteCookie$1 } from "./server-DkRTZiFo.mjs";
import { createHmac, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth.server-8-3RAmLJ.js
var cookieName = "shubhpatra_admin_session";
var sessionSeconds = 28800;
function setting(name) {
	return process.env[name];
}
function signature(value, secret) {
	return createHmac("sha256", secret).update(value).digest("base64url");
}
function constantTimeMatch(actual, expected) {
	const actualBuffer = Buffer.from(actual);
	const expectedBuffer = Buffer.from(expected);
	return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}
function sessionSecret() {
	const secret = setting("ADMIN_SESSION_SECRET");
	if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set to a random value of at least 32 characters.");
	return secret;
}
function verifyAdminCredentials(username, password) {
	const configuredUsername = setting("ADMIN_USERNAME");
	const configuredPassword = setting("ADMIN_PASSWORD");
	if (!configuredUsername || !configuredPassword) throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be configured before signing in.");
	return constantTimeMatch(username, configuredUsername) && constantTimeMatch(password, configuredPassword);
}
function createAdminSession(username) {
	const payload = Buffer.from(JSON.stringify({
		username,
		expiresAt: Date.now() + sessionSeconds * 1e3
	})).toString("base64url");
	const value = `${payload}.${signature(payload, sessionSecret())}`;
	setCookie$1(cookieName, value, {
		httpOnly: true,
		sameSite: "lax",
		secure: true,
		path: "/",
		maxAge: sessionSeconds
	});
}
function clearAdminSession() {
	deleteCookie$1(cookieName, { path: "/" });
}
function getAdminSession() {
	const value = getCookie(cookieName);
	if (!value) return null;
	const [payload, receivedSignature] = value.split(".");
	if (!payload || !receivedSignature) return null;
	try {
		if (!constantTimeMatch(receivedSignature, signature(payload, sessionSecret()))) return null;
		const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
		if (typeof session.username !== "string" || typeof session.expiresAt !== "number" || session.expiresAt < Date.now()) return null;
		return { username: session.username };
	} catch {
		return null;
	}
}
function requireAdmin() {
	const session = getAdminSession();
	if (!session) throw new Error("You must sign in to manage products.");
	return session;
}
//#endregion
export { clearAdminSession, createAdminSession, getAdminSession, requireAdmin, verifyAdminCredentials };
