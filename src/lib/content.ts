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
};

export type ResourcePatch = {
  title?: string;
  category?: CategoryId;
  labels?: string[];
  url?: string;
  date?: string;
};

export type CustomResource = {
  slug: string;
  title: string;
  category: CategoryId;
  date: string;
  url: string;
  labels: string[];
  summary?: string;
};

export type ContentFile = {
  version: number;
  settings: SiteSettings;
  patches: Record<string, ResourcePatch>;
  hidden: string[];
  custom: CustomResource[];
};

export const DEFAULT_SETTINGS: SiteSettings = {
  heroTag: "Free downloads",
  heroTitle: "Build your server.",
  heroTitleAccent: "Pay nothing.",
  heroSubtitle:
    "Plugins, ready-made setups, maps, models and configs for your Minecraft server. New resources are added regularly.",
  discord: "https://discord.gg/p2YqHYHDXU",
  accent: "#7c3aed",
  accentHi: "#a78bfa",
};

/** The published content file that ships with the build. */
export const PUBLISHED: ContentFile = {
  version: contentJson.version ?? 1,
  settings: { ...DEFAULT_SETTINGS, ...(contentJson.settings as Partial<SiteSettings>) },
  patches: (contentJson.patches ?? {}) as Record<string, ResourcePatch>,
  hidden: (contentJson.hidden ?? []) as string[],
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
  const settings = { ...DEFAULT_SETTINGS, ...(input.settings ?? {}) } as SiteSettings;

  const patches: Record<string, ResourcePatch> = {};
  for (const [key, value] of Object.entries(input.patches ?? {})) {
    if (!value || typeof value !== "object") continue;
    const patch: ResourcePatch = {};
    if (typeof value.title === "string" && value.title.trim()) patch.title = value.title.trim();
    if (typeof value.category === "string" && isCategory(value.category)) patch.category = value.category;
    if (Array.isArray(value.labels)) patch.labels = value.labels.filter((l) => typeof l === "string" && l.trim());
    if (typeof value.url === "string" && value.url.trim()) patch.url = value.url.trim();
    if (typeof value.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.date)) patch.date = value.date;
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
    }))
    .filter((item) => item.slug && item.title);

  return {
    version: Number(input.version) || 1,
    settings,
    patches,
    hidden: Array.isArray(input.hidden) ? input.hidden.filter((s) => typeof s === "string") : [],
    custom,
  };
}
