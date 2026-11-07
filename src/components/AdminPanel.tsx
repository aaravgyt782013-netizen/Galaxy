"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, applyContent, cleanResourceSlug, resourceHref, type Resource } from "@/data/resources";
import {
  DEFAULT_SETTINGS,
  PUBLISHED,
  type CategoryId,
  type ContentFile,
  type CustomResource,
} from "@/lib/content";
import { useAdminContent } from "@/lib/useAdminContent";

type Tab = "resources" | "new" | "settings" | "publish";

const emptyDraft = (): CustomResource => ({
  slug: `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/new-resource`,
  title: "",
  category: "plugin",
  date: new Date().toISOString().slice(0, 10),
  url: "",
  labels: ["plugin", "free download"],
  summary: "",
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function AdminPanel() {
  const [content, setContent, loaded, saveState] = useAdminContent();
  const [tab, setTab] = useState<Tab>("resources");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | CategoryId | "hidden" | "custom">("all");
  const [editing, setEditing] = useState<Resource | null>(null);
  const [draft, setDraft] = useState<CustomResource>(emptyDraft);
  const [slugTouched, setSlugTouched] = useState(false);
  const [toast, setToast] = useState("");

  const resources = useMemo(() => applyContent(content), [content]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (filter === "custom" && !r.isCustom) return false;
      if (filter === "hidden") return false;
      if (filter !== "all" && filter !== "custom" && (r.category as string) !== filter) return false;
      if (!q) return true;
      return r.title.toLowerCase().includes(q) || r.slug.toLowerCase().includes(q);
    });
  }, [resources, query, filter]);

  const hiddenList = useMemo(
    () => applyContent({ ...content, hidden: [] }).filter((r) => content.hidden.includes(r.slug)),
    [content],
  );

  const isEditingDraft = content.custom.some((c) => c.slug === draft.slug);

  const flash = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const savePatch = (slug: string, patch: Record<string, unknown>) => {
    const next: ContentFile = {
      ...content,
      patches: { ...content.patches, [slug]: { ...(content.patches[slug] ?? {}), ...patch } },
    };
    setContent(next);
    flash("Saving globally…");
  };

  const resetPatch = (slug: string) => {
    const patches = { ...content.patches };
    delete patches[slug];
    setContent({ ...content, patches });
    flash("Reverted to original");
  };

  const toggleHidden = (slug: string) => {
    const hidden = content.hidden.includes(slug)
      ? content.hidden.filter((s) => s !== slug)
      : [...content.hidden, slug];
    setContent({ ...content, hidden });
    flash(content.hidden.includes(slug) ? "Restored" : "Hidden from site");
  };

  const addCustom = () => {
    if (!draft.title.trim() || !draft.slug.trim()) {
      flash("Title aur slug zaroori hai");
      return;
    }
    const slug = cleanResourceSlug(draft.slug.trim());
    const item: CustomResource = {
      ...draft,
      slug,
      title: draft.title.trim(),
      labels: draft.labels.length ? draft.labels : [draft.category],
      summary: draft.summary?.trim() || undefined,
    };
    const isUpdate = content.custom.some((c) => c.slug === slug);
    if (!isUpdate && resources.some((r) => r.slug === slug)) {
      flash("Ye slug pehle se maujood hai");
      return;
    }
    setContent({
      ...content,
      custom: isUpdate
        ? content.custom.map((c) => (c.slug === slug ? item : c))
        : [item, ...content.custom],
    });
    setDraft(emptyDraft());
    setSlugTouched(false);
    setTab("resources");
    flash(isUpdate ? "Resource updated" : "Resource added");
  };

  const removeCustom = (slug: string) => {
    setContent({ ...content, custom: content.custom.filter((c) => c.slug !== slug) });
    flash("Deleted");
  };

  const resetAll = () => {
    if (!window.confirm("Saari admin changes undo karni hain?")) return;
    setContent(PUBLISHED);
    flash("Reset to published content");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
    flash("content.json downloaded");
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      flash("Content backup copied");
    } catch {
      flash("Copy failed — download button use karein");
    }
  };

  const importJson = async (file: File) => {
    try {
      const text = await file.text();
      const { normaliseContent } = await import("@/lib/content");
      setContent(normaliseContent(JSON.parse(text)));
      flash("content.json imported");
    } catch {
      flash("Invalid JSON file");
    }
  };

  if (!loaded) return <p className="admin-muted">Loading content…</p>;

  return (
    <div className="admin-body">
      {toast ? <div className="admin-toast">{toast}</div> : null}

      <p className={`admin-muted admin-save-status ${saveState}`} role="status" aria-live="polite">
        {saveState === "saving" ? "Saving changes to the shared database…" : null}
        {saveState === "saved" ? "All changes synced globally." : null}
        {saveState === "error" ? "Shared sync failed. Check DATABASE_URL, Neon access, and your admin session." : null}
      </p>

      <div className="admin-stats">
        <div>
          <strong>{resources.length}</strong>
          <span>Live resources</span>
        </div>
        <div>
          <strong>{content.custom.length}</strong>
          <span>Added by you</span>
        </div>
        <div>
          <strong>{Object.keys(content.patches).length}</strong>
          <span>Edited</span>
        </div>
        <div>
          <strong>{content.hidden.length}</strong>
          <span>Hidden</span>
        </div>
      </div>

      <nav className="admin-tabs">
        {([
          ["resources", "Resources"],
          ["new", "Add new"],
          ["settings", "Site settings"],
          ["publish", "Publish"],
        ] as [Tab, string][]).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`gsh-filter${tab === id ? " active" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === "resources" ? (
        <>
          <div className="admin-toolbar">
            <input
              className="admin-input"
              placeholder="Search by title or slug…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="admin-input admin-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
              <option value="custom">Added by me</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          {filter === "hidden" ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {hiddenList.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="admin-muted">
                      Kuch bhi hidden nahi hai.
                    </td>
                  </tr>
                ) : (
                  hiddenList.map((r) => (
                    <tr key={r.slug}>
                      <td>{r.title}</td>
                      <td className="admin-mono">{r.slug}</td>
                      <td className="admin-actions">
                        <button type="button" className="gsh-filter" onClick={() => toggleHidden(r.slug)}>
                          Restore
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {visible.slice(0, 100).map((r) => (
                  <tr key={r.slug}>
                    <td>
                      <div className="admin-title">
                        {r.isCustom ? <span className="admin-badge">NEW</span> : null}
                        {content.patches[r.slug] ? <span className="admin-badge edit">EDIT</span> : null}
                        {r.title}
                      </div>
                      <div className="admin-mono">{r.slug}</div>
                    </td>
                    <td>
                      <select
                        className="admin-input admin-select small"
                        value={r.category}
                        onChange={(e) => savePatch(r.slug, { category: e.target.value })}
                        disabled={r.isCustom}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="admin-mono">{r.date}</td>
                    <td className="admin-actions">
                      <button
                        type="button"
                        className="gsh-filter"
                        onClick={() => {
                          if (r.isCustom) {
                            const source = content.custom.find((c) => c.slug === r.slug);
                            if (source) setDraft({ ...source, summary: source.summary ?? "" });
                            setSlugTouched(true);
                            setTab("new");
                          } else {
                            setEditing(r);
                          }
                        }}
                      >
                        Edit
                      </button>
                      <a
                        className="gsh-filter"
                        href={resourceHref(r.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                      {r.isCustom ? (
                        <button
                          type="button"
                          className="gsh-filter danger"
                          onClick={() => removeCustom(r.slug)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="gsh-filter danger"
                          onClick={() => toggleHidden(r.slug)}
                        >
                          Hide
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {visible.length > 100 ? (
            <p className="admin-muted">Showing first 100 of {visible.length}. Narrow the search to see more.</p>
          ) : null}
        </>
      ) : null}

      {tab === "new" ? (
        <div className="admin-form">
          <h2 className="admin-h2">{isEditingDraft ? "Edit resource" : "Add new resource"}</h2>

          <label className="admin-field">
            <span>Title</span>
            <input
              className="admin-input"
              value={draft.title}
              onChange={(e) => {
                const title = e.target.value;
                setDraft((d) => ({
                  ...d,
                  title,
                  slug: slugTouched
                    ? d.slug
                    : `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${slugify(title) || "new-resource"}`,
                }));
              }}
              placeholder="E.g. AntiLag Pro Minecraft Plugin"
            />
          </label>

          <label className="admin-field">
            <span>Slug (URL path)</span>
            <input
              className="admin-input admin-mono"
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setDraft((d) => ({ ...d, slug: e.target.value }));
              }}
            />
          </label>

          <div className="admin-row">
            <label className="admin-field">
              <span>Category</span>
              <select
                className="admin-input admin-select"
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value as CategoryId }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Date</span>
              <input
                className="admin-input"
                type="date"
                value={draft.date}
                onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
              />
            </label>
          </div>

          <label className="admin-field">
            <span>Download / source URL</span>
            <input
              className="admin-input"
              value={draft.url}
              onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
              placeholder="https://www.spigotmc.org/resources/…"
            />
          </label>

          <label className="admin-field">
            <span>Card excerpt (optional)</span>
            <textarea
              className="admin-input admin-textarea"
              value={draft.summary ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
              placeholder="Ek do line ka description jo card par dikhega."
            />
          </label>

          <label className="admin-field">
            <span>Labels (comma separated)</span>
            <input
              className="admin-input"
              value={draft.labels.join(", ")}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  labels: e.target.value.split(",").map((l) => l.trim()).filter(Boolean),
                }))
              }
            />
          </label>

          <div className="admin-row">
            <button type="button" className="gsh-btn" onClick={addCustom}>
              {isEditingDraft ? "Update resource" : "Add resource"}
            </button>
            <button
              type="button"
              className="gsh-filter"
              onClick={() => {
                setDraft(emptyDraft());
                setSlugTouched(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      ) : null}

      {tab === "settings" ? (
        <div className="admin-settings-workspace">
          <section className="admin-form">
            <div className="admin-section-heading"><div><span className="admin-eyebrow">SITE IDENTITY</span><h2 className="admin-h2">Homepage content</h2></div><p className="admin-muted">Update the words visitors see across the homepage.</p></div>
            <label className="admin-field"><span>Hero badge</span><input className="admin-input" value={content.settings.heroTag} onChange={(e) => setContent({ ...content, settings: { ...content.settings, heroTag: e.target.value } })} /></label>
            <label className="admin-field"><span>Hero headline</span><input className="admin-input" value={content.settings.heroTitle} onChange={(e) => setContent({ ...content, settings: { ...content.settings, heroTitle: e.target.value } })} /></label>
            <label className="admin-field"><span>Hero headline accent</span><input className="admin-input" value={content.settings.heroTitleAccent} onChange={(e) => setContent({ ...content, settings: { ...content.settings, heroTitleAccent: e.target.value } })} /></label>
            <label className="admin-field"><span>Hero subtitle</span><textarea className="admin-input admin-textarea" value={content.settings.heroSubtitle} onChange={(e) => setContent({ ...content, settings: { ...content.settings, heroSubtitle: e.target.value } })} /></label>
            <label className="admin-field"><span>Discord invite</span><input className="admin-input" value={content.settings.discord} onChange={(e) => setContent({ ...content, settings: { ...content.settings, discord: e.target.value } })} /></label>
          </section>
          <section className="admin-form admin-theme-editor">
            <div className="admin-section-heading"><div><span className="admin-eyebrow">DESIGN SYSTEM</span><h2 className="admin-h2">Live theme studio</h2></div><p className="admin-muted">Choose a colour or enter its exact HEX value. Changes sync to the shared site settings.</p></div>
            <div className="admin-theme-preview" style={{ background: content.settings.background, color: content.settings.text, borderColor: content.settings.border }}>
              <div className="admin-preview-top"><span className="admin-preview-dot" style={{background:content.settings.accent}}/><strong>Poke Studio</strong><span className="admin-preview-label">LIVE PALETTE</span></div>
              <div className="admin-preview-content" style={{background:content.settings.surface,borderColor:content.settings.border}}><span style={{color:content.settings.accentHi}}>CREATOR RESOURCE HUB</span><h3>Build something <b style={{color:content.settings.accent}}>great.</b></h3><p style={{color:content.settings.muted}}>Preview your surface, typography and primary action colours.</p><button type="button" style={{background:content.settings.accent,color:"#ffffff"}}>Primary button</button></div>
              <div className="admin-preview-swatches">{[["Primary",content.settings.accent],["Highlight",content.settings.accentHi],["Background",content.settings.background],["Surface",content.settings.surface],["Text",content.settings.text]].map(([label,color])=><span key={label}><i style={{background:color}}/>{label}</span>)}</div>
            </div>
            <div className="admin-color-grid">
              {([
                ["Primary / brand", "accent", "Buttons, links and brand elements"],
                ["Accent highlight", "accentHi", "Highlights, badges and hover states"],
                ["Page background", "background", "Main website canvas"],
                ["Card / panel", "surface", "Cards, navbar and panels"],
                ["Raised surface", "surfaceAlt", "Secondary cards, tabs and inputs"],
                ["Main text", "text", "Headings and readable content"],
                ["Muted text", "muted", "Descriptions and supporting labels"],
                ["Borders", "border", "Dividers, outlines and card edges"],
              ] as const).map(([label,key,hint]) => (
                <label className="admin-color-field" key={key}><span className="admin-color-heading">{label}</span><span className="admin-color-hint">{hint}</span><span className="admin-color-control"><input aria-label={label+" picker"} type="color" value={content.settings[key]} onChange={(e)=>setContent({...content,settings:{...content.settings,[key]:e.target.value}})} /><input aria-label={label+" HEX value"} className="admin-input admin-hex-input" value={content.settings[key]} maxLength={7} spellCheck={false} onChange={(e)=>{const value=e.target.value;if(/^#[0-9a-fA-F]{6}$/.test(value))setContent({...content,settings:{...content.settings,[key]:value}});}} /></span></label>
              ))}
            </div>
            <div className="admin-theme-actions"><button type="button" className="gsh-filter" onClick={()=>setContent({...content,settings:{...content.settings,...DEFAULT_SETTINGS}})}>Reset palette</button><span className="admin-muted">Enter a valid 6-digit HEX code, such as #E63946.</span></div>
          </section>
        </div>
      ) : null}
      {tab === "publish" ? (
        <div className="admin-form">
          <h2 className="admin-h2">Publish</h2>
          <p className="admin-muted">
            Admin changes are saved to the shared Neon database and appear on the public website for
            every visitor automatically. No JSON replacement or redeployment is needed. You can still
            download or import a JSON backup below.
          </p>

          <div className="admin-row">
            <button type="button" className="gsh-btn" onClick={exportJson}>
              Download content.json
            </button>
            <button type="button" className="gsh-filter" onClick={copyJson}>
              Copy JSON
            </button>
            <label className="gsh-filter admin-upload">
              Import JSON
              <input
                type="file"
                accept="application/json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) importJson(file);
                  e.target.value = "";
                }}
              />
            </label>
            <button type="button" className="gsh-filter danger" onClick={resetAll}>
              Reset all changes
            </button>
          </div>

          <pre className="admin-pre">{JSON.stringify(content, null, 2).slice(0, 4000)}</pre>
        </div>
      ) : null}

      {editing ? (
        <div className="admin-modal" role="dialog" aria-modal="true">
          <div className="admin-modal-card">
            <h2 className="admin-h2">Edit resource</h2>
            <p className="admin-mono">{editing.slug}</p>

            <label className="admin-field">
              <span>Title</span>
              <input
                className="admin-input"
                defaultValue={editing.title}
                id="edit-title"
              />
            </label>

            <label className="admin-field">
              <span>Download URL</span>
              <input className="admin-input" defaultValue={editing.url} id="edit-url" />
            </label>

            <label className="admin-field">
              <span>Date</span>
              <input className="admin-input" type="date" defaultValue={editing.date} id="edit-date" />
            </label>

            <label className="admin-field">
              <span>Labels (comma separated)</span>
              <input className="admin-input" defaultValue={editing.labels.join(", ")} id="edit-labels" />
            </label>

            <div className="admin-row">
              <button
                type="button"
                className="gsh-btn"
                onClick={() => {
                  const read = (id: string) =>
                    (document.getElementById(id) as HTMLInputElement | null)?.value ?? "";
                  savePatch(editing.slug, {
                    title: read("edit-title").trim(),
                    url: read("edit-url").trim(),
                    date: read("edit-date"),
                    labels: read("edit-labels")
                      .split(",")
                      .map((l) => l.trim())
                      .filter(Boolean),
                  });
                  setEditing(null);
                }}
              >
                Save changes
              </button>
              <button
                type="button"
                className="gsh-filter"
                onClick={() => {
                  resetPatch(editing.slug);
                  setEditing(null);
                }}
              >
                Revert original
              </button>
              <button type="button" className="gsh-filter" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
