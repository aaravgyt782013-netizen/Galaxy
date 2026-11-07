"use client";

import { useEffect, useRef, useState } from "react";
import { PUBLISHED, normaliseContent, type ContentFile } from "./content";

export const ADMIN_STORAGE_KEY = "gsp-admin-content";
export const PREVIEW_PARAM = "preview";

export function readLocalContent(): ContentFile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return null;
    return normaliseContent(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeLocalContent(content: ContentFile): void {
  window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(content));
}

/** Admin content is loaded from and saved to the shared Neon-backed API. */
export function useAdminContent(): [
  ContentFile,
  (next: ContentFile) => void,
  boolean,
  "loading" | "saved" | "saving" | "error",
] {
  const [content, setContent] = useState<ContentFile>(PUBLISHED);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState<"loading" | "saved" | "saving" | "error">("loading");
  const saveQueue = useRef<Promise<void>>(Promise.resolve());
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/content", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data?.error || "Could not load shared content");
        return data;
      })
      .then(async (data) => {
        if (!active) return;
        if (data?.initialized === false) {
          const legacyDraft = readLocalContent();
          if (legacyDraft) {
            setContent(legacyDraft);
            setSaveState("saving");
            const migration = await fetch("/api/content", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              credentials: "same-origin",
              body: JSON.stringify({ content: legacyDraft }),
            });
            const migrationData = await migration.json().catch(() => ({}));
            if (!migration.ok) throw new Error(migrationData?.error || "Could not migrate the previous browser draft");
            window.localStorage.removeItem(ADMIN_STORAGE_KEY);
            setSaveState("saved");
            return;
          }
        }
        if (data?.content) setContent(normaliseContent(data.content));
        setSaveState("saved");
      })
      .catch((error) => {
        console.error("[admin] Shared content load failed:", error);
        if (active) setSaveState("error");
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => { active = false; };
  }, []);

  const update = (next: ContentFile) => {
    const normalised = normaliseContent(next);
    setContent(normalised);
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);

    // Debounce typing and serialize writes so rapid edits stay efficient and ordered.
    saveTimer.current = setTimeout(() => {
      saveQueue.current = saveQueue.current
        .catch(() => undefined)
        .then(async () => {
          const response = await fetch("/api/content", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ content: normalised }),
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(data?.error || "Could not save shared content");
          setSaveState("saved");
        })
        .catch((error) => {
          console.error("[admin] Shared content save failed:", error);
          setSaveState("error");
        });
    }, 450);
  };

  useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
  }, []);

  return [content, update, loaded, saveState];
}

/** Whether the site should render the local preview draft. Kept for compatibility. */
export function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get(PREVIEW_PARAM) === "1";
  } catch {
    return false;
  }
}
