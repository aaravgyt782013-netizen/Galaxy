"use client";

import { useEffect } from "react";
import { isPreviewMode, readLocalContent } from "@/lib/useAdminContent";

/**
 * When the site is opened with ?preview=1, apply the draft content from the admin
 * panel: accent colours from settings and the hero copy (via a small DOM patch so
 * statically rendered markup still shows the draft).
 */
export function PreviewTheme() {
  useEffect(() => {
    if (!isPreviewMode()) return;
    const draft = readLocalContent();
    if (!draft) return;

    const root = document.documentElement;
    root.style.setProperty("--accent", draft.settings.accent);
    root.style.setProperty("--accent-hi", draft.settings.accentHi);
    root.style.setProperty("--cube-l", draft.settings.accent);
    root.style.setProperty("--cube-t", draft.settings.accentHi);

    const badge = document.querySelector(".gsh-hero .gsh-tag");
    if (badge && draft.settings.heroTag) badge.textContent = draft.settings.heroTag;

    const heading = document.getElementById("hero-title");
    if (heading) {
      heading.innerHTML = "";
      heading.append(`${draft.settings.heroTitle}`);
      heading.append(document.createElement("br"));
      const span = document.createElement("span");
      span.textContent = draft.settings.heroTitleAccent;
      heading.append(span);
    }

    const sub = document.querySelector(".gsh-hero p");
    if (sub && draft.settings.heroSubtitle) sub.textContent = draft.settings.heroSubtitle;

    document.querySelectorAll<HTMLAnchorElement>('.gsh-hero-btns a[href*="discord.gg"]').forEach((a) => {
      if (draft.settings.discord) a.href = draft.settings.discord;
    });

    document.documentElement.dataset.preview = "admin-draft";
  }, []);

  return null;
}
