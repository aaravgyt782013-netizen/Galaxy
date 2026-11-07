import crypto from "node:crypto";

export const ADMIN_USER = process.env.ADMIN_USER || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "galaxy123";
export const SESSION_COOKIE = "gsp_admin";

/** True when the deployment is relying on the demo password (should be changed in prod). */
export const USING_DEMO_PASSWORD = !process.env.ADMIN_PASSWORD;

function secret(): string {
  return process.env.ADMIN_SECRET || `${ADMIN_USER}:${ADMIN_PASSWORD}:gsp`;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Stateless session token: <expiry>.<hmac> */
export function createSession(ttlMs = 1000 * 60 * 60 * 12): string {
  const expiry = String(Date.now() + ttlMs);
  return `${expiry}.${sign(expiry)}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiry, mac] = token.split(".");
  if (!expiry || !mac) return false;
  if (Number(expiry) < Date.now()) return false;
  const expected = sign(expiry);
  if (mac.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
}

export function checkCredentials(user: string, password: string): boolean {
  const safeEqual = (a: string, b: string) => {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  };
  return safeEqual(user, ADMIN_USER) && safeEqual(password, ADMIN_PASSWORD);
}
