import contentJson from "@/data/content.json";

export type CategoryId = "plugin" | "setup" | "map" | "model" | "config" | "fork";

export type SiteSettings = {
  heroTag: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  discord: string;
  accent: string;
  accentHi: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  border: string;
};

export type ResourcePatch = {
  title?: string;
  category?: CategoryId;
  labels?: string[];
  url?: string;
  date?: string;
  youtubeUrl?: string;
};

export type CustomResource = {
  slug: string;
  title: string;
  category: CategoryId;
  date: string;
  url: string;
  labels: string[];
  summary?: string;
  youtubeUrl?: string;
  images?: string[];
};

export type ContentFile = {
  version: number;
  settings: SiteSettings;
  patches: Record<string, ResourcePatch>;
  hidden: string[];
  deleted: string[];
  custom: CustomResource[];
};

export const DEFAULT_SETTINGS: SiteSettings = {
  heroTag: "Welcome to Poke Studio",
  heroTitle: "Minecraft resources.",
  heroTitleAccent: "Made for creators.",
  heroSubtitle:
    "Your creative hub for Minecraft plugins, server setups, maps, models, panels, web code, scripts and configurations. Explore free and premium resources.",
  discord: "https://discord.gg/BYU8bkY6sz",
  accent: "#e63946",
  accentHi: "#ff6975",
  background: "#100e12",
  surface: "#19161b",
  surfaceAlt: "#211c22",
  text: "#fff8f7",
  muted: "#b9aeb0",
  border: "#382a2d",
};

/** The published content file that ships with the build. */
export const PUBLISHED: ContentFile = {
  version: contentJson.version ?? 2,
  settings: { ...DEFAULT_SETTINGS, ...(contentJson.settings as Partial<SiteSettings>) },
  patches: (contentJson.patches ?? {}) as Record<string, ResourcePatch>,
  hidden: (contentJson.hidden ?? []) as string[],
  deleted: ((contentJson as unknown as { deleted?: string[] }).deleted ?? []) as string[],
  custom: (contentJson.custom ?? []) as CustomResource[],
};

export const CATEGORY_IDS: CategoryId[] = [
  "plugin",
  "setup",
  "map",
  "model",
  "config",
  "fork",
];

export function isCategory(value: string): value is CategoryId {
  return (CATEGORY_IDS as string[]).includes(value);
}

/** Normalise anything coming from localStorage / JSON imports. */
export function normaliseContent(raw: unknown): ContentFile {
  const input = (raw ?? {}) as Partial<ContentFile>;
  const rawSettings = { ...DEFAULT_SETTINGS, ...(input.settings ?? {}) } as SiteSettings;
  const isHex = (v: unknown): v is string => typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v);
  const settings: SiteSettings = {
    ...rawSettings,
    accent: isHex(rawSettings.accent) ? rawSettings.accent : DEFAULT_SETTINGS.accent,
    accentHi: isHex(rawSettings.accentHi) ? rawSettings.accentHi : DEFAULT_SETTINGS.accentHi,
    background: isHex(rawSettings.background) ? rawSettings.background : DEFAULT_SETTINGS.background,
    surface: isHex(rawSettings.surface) ? rawSettings.surface : DEFAULT_SETTINGS.surface,
    surfaceAlt: isHex(rawSettings.surfaceAlt) ? rawSettings.surfaceAlt : DEFAULT_SETTINGS.surfaceAlt,
    text: isHex(rawSettings.text) ? rawSettings.text : DEFAULT_SETTINGS.text,
    muted: isHex(rawSettings.muted) ? rawSettings.muted : DEFAULT_SETTINGS.muted,
    border: isHex(rawSettings.border) ? rawSettings.border : DEFAULT_SETTINGS.border,
  };

  const patches: Record<string, ResourcePatch> = {};
  for (const [key, value] of Object.entries(input.patches ?? {})) {
    if (!value || typeof value !== "object") continue;
    const patch: ResourcePatch = {};
    if (typeof value.title === "string" && value.title.trim()) patch.title = value.title.trim();
    if (typeof value.category === "string" && isCategory(value.category)) patch.category = value.category;
    if (Array.isArray(value.labels)) patch.labels = value.labels.filter((l) => typeof l === "string" && l.trim());
    if (typeof value.url === "string" && value.url.trim()) patch.url = value.url.trim();
    if (typeof value.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.date)) patch.date = value.date;
    if (typeof value.youtubeUrl === "string" && value.youtubeUrl.trim()) patch.youtubeUrl = value.youtubeUrl.trim();
    if (Object.keys(patch).length) patches[key] = patch;
  }

  const custom = (input.custom ?? [])
    .filter((item): item is CustomResource => Boolean(item && typeof item === "object"))
    .map((item) => ({
      slug: String(item.slug ?? "").trim(),
      title: String(item.title ?? "").trim(),
      category: isCategory(String(item.category)) ? (item.category as CategoryId) : "plugin",
      date: /^\d{4}-\d{2}-\d{2}$/.test(String(item.date)) ? item.date : new Date().toISOString().slice(0, 10),
      url: String(item.url ?? "").trim(),
      labels: Array.isArray(item.labels) ? item.labels.filter((l) => typeof l === "string" && l.trim()) : [],
      summary: typeof item.summary === "string" ? item.summary : undefined,
      youtubeUrl: typeof item.youtubeUrl === "string" ? item.youtubeUrl.trim() : undefined,
      images: Array.isArray(item.images) ? item.images.filter((src) => typeof src === "string" && src.startsWith("data:image/")).slice(0, 5) : [],
    }))
    .filter((item) => item.slug && item.title);

  return {
    version: Number(input.version) || 1,
    settings,
    patches,
    hidden: Array.isArray(input.hidden) ? input.hidden.filter((s) => typeof s === "string") : [],
    deleted: Array.isArray(input.deleted) ? input.deleted.filter((s) => typeof s === "string") : [],
    custom,
  };
}
