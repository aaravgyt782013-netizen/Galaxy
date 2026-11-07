import { NextResponse } from "next/server";
import { SESSION_COOKIE, checkCredentials, createSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  let user = "";
  let password = "";

  try {
    const body = await request.json();
    user = String(body?.user ?? "");
    password = String(body?.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!checkCredentials(user, password)) {
    return NextResponse.json({ error: "Galat username ya password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.VERCEL === "1" || process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
