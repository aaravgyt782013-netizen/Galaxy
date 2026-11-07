import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { getStoredContentState, saveStoredContent } from "@/lib/contentStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const state = await getStoredContentState();
    return NextResponse.json(state, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("[api/content] GET failed:", error);
    return NextResponse.json(
      { error: "Shared content storage is unavailable. Check the DATABASE_URL environment variable and Neon database." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function PUT(request: Request) {
  const store = await cookies();
  if (!verifySession(store.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  let body: { content?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !body.content || typeof body.content !== "object") {
    return NextResponse.json({ error: "A valid content object is required" }, { status: 400 });
  }

  try {
    const content = await saveStoredContent(body.content);
    return NextResponse.json({ ok: true, content }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("[api/content] PUT failed:", error);
    return NextResponse.json(
      { error: "Could not save shared content. Check the Neon DATABASE_URL and database access." },
      { status: 503 },
    );
  }
}
