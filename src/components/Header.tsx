"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem("gsh-theme") === "light") setLight(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", light);
    try {
      localStorage.setItem("gsh-theme", light ? "light" : "dark");
    } catch {
      /* ignore */
    }
  }, [light]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <>
      <a className="skip-navigation" href="#main">
        Skip to main content
      </a>

      <header className="gsh-navbar">
        <Link className="gsh-brand" href="/" aria-label="Galaxy Setup Pro home">
          <Logo />
          <span className="gsh-brand-text">
            GalaxySetup<b>Pro</b>
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="gsh-nav-links">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "active" : undefined}
                  {...(isActive(item.href) ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="gsh-nav-right">
          <button
            type="button"
            className="gsh-mode-btn"
            aria-label="Toggle light mode"
            onClick={() => setLight((v) => !v)}
          >
            {light ? "Dark" : "Light"}
          </button>
          <button
            type="button"
            className="gsh-hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`gsh-mobile-nav${open ? " open" : ""}`}>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="gsh-searchbar-wrap">
        <form className="gsh-search-form" role="search" onSubmit={submit}>
          <input
            type="text"
            name="q"
            placeholder="Search plugins, setups, maps, models, configs…"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
}
