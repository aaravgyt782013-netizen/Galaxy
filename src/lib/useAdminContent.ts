"use client";

import { useEffect, useState } from "react";
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

/** Content currently being edited in the admin panel (falls back to the published file). */
export function useAdminContent(): [ContentFile, (next: ContentFile) => void, boolean] {
  const [content, setContent] = useState<ContentFile>(PUBLISHED);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = readLocalContent();
    if (stored) setContent(stored);
    setLoaded(true);
  }, []);

  const update = (next: ContentFile) => {
    setContent(next);
    writeLocalContent(next);
  };

  return [content, update, loaded];
}

/** Whether the public site should render the local draft instead of the published content. */
export function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get(PREVIEW_PARAM) === "1";
  } catch {
    return false;
  }
}
