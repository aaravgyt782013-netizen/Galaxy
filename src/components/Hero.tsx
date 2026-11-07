import Link from "next/link";
import { CATEGORIES, TOTAL_RESOURCES } from "@/data/resources";
import { SITE } from "@/lib/site";
import { PUBLISHED } from "@/lib/content";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="gsh-hero" aria-labelledby="hero-title">
      <div className="gsh-hero-inner">
        <div>
          <span className="gsh-tag">{PUBLISHED.settings.heroTag}</span>
          <h1 id="hero-title">
            {PUBLISHED.settings.heroTitle}
            <br />
            <span>{PUBLISHED.settings.heroTitleAccent}</span>
          </h1>
          <p>{PUBLISHED.settings.heroSubtitle}</p>
          <div className="gsh-hero-btns">
            <Link className="gsh-btn" href="/category/plugin">
              Browse plugins
            </Link>
            <a
              className="gsh-btn ghost"
              href={PUBLISHED.settings.discord || SITE.discord}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Join Discord
            </a>
          </div>
          <div className="gsh-stats">
            <div>
              <strong>{TOTAL_RESOURCES}+</strong>
              <span>Free resources</span>
            </div>
            <div>
              <strong>{CATEGORIES.length}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Free</span>
            </div>
          </div>
        </div>

        <div className="gsh-hero-art" aria-hidden="true">
          <div className="gsh-hero-tile">
            <Logo className="gsh-hero-mark" />
            <span className="gsh-hero-name">
              Galaxysetup<b>Pro</b>
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
