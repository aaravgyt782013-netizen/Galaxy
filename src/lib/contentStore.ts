import { neon } from "@neondatabase/serverless";
import { PUBLISHED, normaliseContent, type ContentFile } from "@/lib/content";

let schemaReady: Promise<void> | undefined;

function database() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured. Add your Neon connection string to the Vercel environment variables.");
  return neon(url);
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = database();
      await sql`
        CREATE TABLE IF NOT EXISTS poke_studio_site_content (
          id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
          content JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
    })().catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  await schemaReady;
}

export async function getStoredContentState(): Promise<{ content: ContentFile; initialized: boolean }> {
  await ensureSchema();
  const sql = database();
  const rows = await sql`SELECT content FROM poke_studio_site_content WHERE id = 1 LIMIT 1`;
  if (!rows.length) return { content: PUBLISHED, initialized: false };
  const stored = rows[0].content;
  return {
    content: normaliseContent(typeof stored === "string" ? JSON.parse(stored) : stored),
    initialized: true,
  };
}

export async function getStoredContent(): Promise<ContentFile> {
  return (await getStoredContentState()).content;
}

export async function saveStoredContent(raw: unknown): Promise<ContentFile> {
  const content = normaliseContent(raw);
  await ensureSchema();
  const sql = database();
  await sql`
    INSERT INTO poke_studio_site_content (id, content, updated_at)
    VALUES (1, ${JSON.stringify(content)}::jsonb, NOW())
    ON CONFLICT (id)
    DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
  `;
  return content;
}

export async function getContentOrPublished(): Promise<ContentFile> {
  try {
    return await getStoredContent();
  } catch (error) {
    console.error("[content] Falling back to bundled content:", error);
    return PUBLISHED;
  }
}
