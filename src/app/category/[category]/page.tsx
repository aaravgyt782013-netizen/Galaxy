import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHead } from "@/components/SectionHead";
import {
  CATEGORIES,
  RESOURCES,
  resourcesByCategory,
  type Category,
} from "@/data/resources";

const PAGE_SIZE = 12;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORIES.find((c) => c.id === category);
  if (!meta) return { title: "Category not found" };
  const count = resourcesByCategory(meta.id).length;
  return {
    title: `${meta.label} — ${count} free downloads`,
    description: `Download ${count} free Minecraft ${meta.label.toLowerCase()} for Paper, Spigot, Purpur and Folia servers.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const { page } = await searchParams;
  const meta = CATEGORIES.find((c) => c.id === category);
  if (!meta) notFound();

  const all = resourcesByCategory(meta.id as Category);
  const current = Math.max(1, Math.min(Number(page ?? 1) || 1, Math.max(1, Math.ceil(all.length / PAGE_SIZE))));
  const items = all.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));

  return (
    <main className="page_body feed-view" id="main">
      <div className="centered">
        <div className="post-filter-message">
          <span>
            Showing <b>{all.length}</b> free {meta.label.toLowerCase()} for Minecraft servers
          </span>
          <Link href="/">View all →</Link>
        </div>

        <SectionHead title={meta.label} />

        {items.length === 0 ? (
          <p className="no-posts-message">
            No resources in this category yet. Check back soon — new drops land every week.
          </p>
        ) : (
          <div className="blog-posts">
            {items.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        )}

        <nav className="gsh-pager" aria-label="Pagination">
          {current > 1 ? (
            <Link href={`/category/${meta.id}?page=${current - 1}`}>← Previous</Link>
          ) : (
            <span>← Previous</span>
          )}
          <span>
            Page {current} / {totalPages}
          </span>
          {current < totalPages ? (
            <Link href={`/category/${meta.id}?page=${current + 1}`}>Next →</Link>
          ) : (
            <span>Next →</span>
          )}
        </nav>

        <nav className="gsh-pager" aria-label="Other categories">
          {CATEGORIES.filter((c) => c.id !== meta.id).map((c) => (
            <Link key={c.id} href={`/category/${c.id}`}>
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
