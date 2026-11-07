import Link from "next/link";
import { CATEGORIES } from "@/data/resources";
import { SITE } from "@/lib/site";
import type { ContentFile } from "@/lib/content";
import { applyContent } from "@/data/resources";
import { Logo } from "./Logo";

export function Hero({ content }: { content: ContentFile }) {
  const settings = content.settings;
  const totalResources = applyContent(content).length;
  return (
    <section className="gsh-hero" aria-labelledby="hero-title">
      <div className="gsh-hero-inner">
        <div>
          <span className="gsh-tag">Welcome to {SITE.name}</span>
          <h1 id="hero-title">
            Minecraft resources.
            <br />
            <span>Made for creators.</span>
          </h1>
          <p>{SITE.tagline} Explore our growing collection of free and premium resources.</p>
          <div className="gsh-hero-btns">
            <Link className="gsh-btn" href="/category/plugin">
              Explore resources
            </Link>
            <a
              className="gsh-btn ghost"
              href={settings.discord || SITE.discord}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Join Discord
            </a>
          </div>
          <div className="gsh-stats">
            <div>
              <strong>{totalResources}+</strong>
              <span>Resources</span>
            </div>
            <div>
              <strong>{CATEGORIES.length}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>Free + Paid</strong>
              <span>For every creator</span>
            </div>
          </div>
        </div>

        <div className="gsh-hero-art" aria-hidden="true">
          <div className="gsh-hero-tile">
            <Logo className="gsh-hero-mark" />
            <span className="gsh-hero-name">
              Poke <b>Studio</b>
            </span>
          </div>
        </div>
      </div>

      <nav className="gsh-cats" aria-label="Resource categories">
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/category/${c.id}`}>
            <span>{c.num}</span>
            <strong>{c.label}</strong>
          </Link>
        ))}
      </nav>
    </section>
  );
}
