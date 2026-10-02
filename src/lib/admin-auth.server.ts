import { createHmac, timingSafeEqual } from "node:crypto";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";

const cookieName = "shubhpatra_admin_session";
const sessionSeconds = 60 * 60 * 8;

function setting(name: "ADMIN_USERNAME" | "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET") {
  return process.env[name];
}

function signature(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function constantTimeMatch(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

function sessionSecret() {
  const secret = setting("ADMIN_SESSION_SECRET");
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set to a random value of at least 32 characters.");
  }
  return secret;
}

export function verifyAdminCredentials(username: string, password: string) {
  const configuredUsername = setting("ADMIN_USERNAME");
  const configuredPassword = setting("ADMIN_PASSWORD");
  if (!configuredUsername || !configuredPassword) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be configured before signing in.");
  }
  return constantTimeMatch(username, configuredUsername) && constantTimeMatch(password, configuredPassword);
}

export function createAdminSession(username: string) {
  const payload = Buffer.from(
    JSON.stringify({ username, expiresAt: Date.now() + sessionSeconds * 1000 }),
  ).toString("base64url");
  const value = `${payload}.${signature(payload, sessionSecret())}`;
  setCookie(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env["NODE_ENV"] === "production",
    path: "/",
    maxAge: sessionSeconds,
  });
}

export function clearAdminSession() {
  deleteCookie(cookieName, { path: "/" });
}

export function getAdminSession() {
  const value = getCookie(cookieName);
  if (!value) return null;
  const [payload, receivedSignature] = value.split(".");
  if (!payload || !receivedSignature) return null;

  try {
    if (!constantTimeMatch(receivedSignature, signature(payload, sessionSecret()))) return null;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      username?: unknown;
      expiresAt?: unknown;
    };
    if (
      typeof session.username !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt < Date.now()
    ) {
      return null;
    }
    return { username: session.username };
  } catch {
    return null;
  }
}

export function requireAdmin() {
  const session = getAdminSession();
  if (!session) throw new Error("You must sign in to manage products.");
  return session;
}
