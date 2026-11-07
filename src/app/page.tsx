import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHead } from "@/components/SectionHead";
import { applyContent } from "@/data/resources";
import { getContentOrPublished } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContentOrPublished();
  const resources = applyContent(content);
  const latest = resources.slice(0, 12);

  return (
    <main className="page_body feed-view" id="main">
      <div className="centered">
        <Hero content={content} />

        <SectionHead title="Latest drops" id="latest-drops" />
        <div className="blog-posts">
          {latest.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>

        <nav className="gsh-pager" aria-label="Pagination">
          <span>Page 1</span>
          <Link href="/category/plugin">Browse all {resources.length} resources →</Link>
        </nav>
      </div>
    </main>
  );
}
