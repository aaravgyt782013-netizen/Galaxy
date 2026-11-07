"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHead } from "@/components/SectionHead";
import { CATEGORIES, RESOURCES } from "@/data/resources";

function SearchInner() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((resource) => {
      const categoryOk = category === "all" || resource.category === category;
      if (!categoryOk) return false;
      if (!q) return true;
      return (
        resource.title.toLowerCase().includes(q) ||
        resource.key.toLowerCase().includes(q) ||
        resource.category.includes(q) ||
        resource.labels.some((l) => l.includes(q))
      );
    }).slice(0, 54);
  }, [query, category]);

  return (
    <main className="page_body feed-view" id="main">
      <div className="centered">
        <div className="gsh-search-page-form">
          <form className="gsh-search-form" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources…"
              aria-label="Search resources"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="post-filter-message">
          <span>
            {results.length} result{results.length === 1 ? "" : "s"}
            {query ? (
              <>
                {" "}for <b>&ldquo;{query}&rdquo;</b>
              </>
            ) : (
              " in the library"
            )}
          </span>
          <Link href="/">Clear →</Link>
        </div>

        <nav className="gsh-pager" aria-label="Filter by category">
          <button
            type="button"
            className={`gsh-filter${category === "all" ? " active" : ""}`}
            onClick={() => setCategory("all")}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`gsh-filter${category === c.id ? " active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>

        <SectionHead title="Search results" />

        {results.length === 0 ? (
          <p className="no-posts-message">
            Nothing matched that search. Try &ldquo;plugin&rdquo;, &ldquo;lifesteal&rdquo;,
            &ldquo;anticheat&rdquo; or &ldquo;spawn&rdquo;.
          </p>
        ) : (
          <div className="blog-posts">
            {results.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="page_body" id="main" />}>
      <SearchInner />
    </Suspense>
  );
}
