"use client";

import { useEffect } from "react";
import { isPreviewMode } from "@/lib/useAdminContent";

/** Preview the currently published shared settings when requested from the admin panel. */
export function PreviewTheme() {
  useEffect(() => {
    if (!isPreviewMode()) return;

    let active = true;
    fetch("/api/content", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Could not load preview content")))
      .then((data) => {
        if (!active || !data?.content?.settings) return;
        const settings = data.content.settings;
        const root = document.documentElement;
        root.style.setProperty("--accent", settings.accent);
        root.style.setProperty("--accent-hi", settings.accentHi);
        root.style.setProperty("--cube-l", settings.accent);
        root.style.setProperty("--cube-t", settings.accentHi);

        const badge = document.querySelector(".gsh-hero .gsh-tag");
        if (badge && settings.heroTag) badge.textContent = settings.heroTag;

        const heading = document.getElementById("hero-title");
        if (heading) {
          heading.innerHTML = "";
          heading.append(settings.heroTitle || "");
          heading.append(document.createElement("br"));
          const span = document.createElement("span");
          span.textContent = settings.heroTitleAccent || "";
          heading.append(span);
        }

        const sub = document.querySelector(".gsh-hero p");
        if (sub && settings.heroSubtitle) sub.textContent = settings.heroSubtitle;

        document.querySelectorAll<HTMLAnchorElement>('.gsh-hero-btns a[href*="discord.gg"]').forEach((a) => {
          if (settings.discord) a.href = settings.discord;
        });
        document.documentElement.dataset.preview = "shared-content";
      })
      .catch((error) => console.error("[preview] Could not load shared content:", error));

    return () => { active = false; };
  }, []);

  return null;
}
