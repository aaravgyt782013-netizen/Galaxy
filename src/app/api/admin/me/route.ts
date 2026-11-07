import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";

export async function GET() {
  const store = await cookies();
  const authenticated = verifySession(store.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ authenticated }, { headers: { "cache-control": "no-store" } });
}
