import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { SectionHead } from "@/components/SectionHead";
import { getArticle } from "@/data/articles";
import { RESOURCES, coverStyle, getResource, relatedResources } from "@/data/resources";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return RESOURCES.map((resource) => ({
    slug: resource.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug.join("/"));
  if (!resource) return { title: "Resource not found" };
  return {
    title: resource.title,
    description: `Download ${resource.title} — free Minecraft ${resource.category} for Paper, Spigot and Purpur servers.`,
    openGraph: {
      title: resource.title,
      description: `Free Minecraft ${resource.category} download from Galaxy Setup Pro.`,
      type: "article",
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const resource = getResource(slug.join("/"));
  if (!resource) notFound();

  const article = getArticle(resource.key, resource.title, resource.category);
  const related = relatedResources(resource, 3);

  return (
    <main className="page_body item-view" id="main">
      <div className="main-container">
        <article className="post-wrapper">
          <div
            className="gsh-post-cover"
            style={coverStyle(resource)}
            role="img"
            aria-label={`${resource.title} cover`}
          />

          <div style={{ padding: "1.6rem 0 0" }}>
            <p className="byline post-labels" style={{ position: "static", marginBottom: ".6rem" }}>
              {resource.labels.map((label) => (
                <Link key={label} href={`/category/${resource.category}`} rel="tag">
                  {label}
                </Link>
              ))}
            </p>

            <h1 className="post-title">{resource.title}</h1>

            {article.kicker || article.sub ? (
              <div className="gsh-post-banner" style={{ marginTop: "1rem" }}>
                {article.kicker ? <h1>{article.kicker}</h1> : null}
                {article.sub ? <p>{article.sub}</p> : null}
              </div>
            ) : null}

            <div className="gsh-download-row">
              <span className="gsh-download-label">
                Free download · Minecraft Java Edition
              </span>
              <a
                className="gsh-btn"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download now
              </a>
              <a
                className="gsh-btn ghost"
                href={SITE.discord}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get support
              </a>
            </div>

            <div className="post-body">
              <ArticleBody article={article} />

              <div className="gsh-download-row">
                <span className="gsh-download-label">
                  Ready to install on your server?
                </span>
                <a
                  className="gsh-btn"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it now
                </a>
              </div>

              <p className="tr-caption">
                Minecraft is a trademark of Mojang Studios. GalaxySetupPro is an
                independent Minecraft resource showcase and is not affiliated with
                Mojang or Microsoft.
              </p>
            </div>
          </div>
        </article>

        {related.length > 0 ? (
          <div style={{ marginTop: "3rem" }}>
            <SectionHead title="Related drops" />
            <div className="blog-posts related-grid">
              {related.map((item) => (
                <article className="post-wrapper" key={item.slug}>
                  <div className="slide">
                    <div className="snippet-thumbnail-container">
                      <Link
                        className="snippet-thumbnail"
                        href={`/resource/${item.slug}`}
                        style={coverStyle(item)}
                        aria-label={item.title}
                      />
                    </div>
                    <div className="post">
                      <h2 className="post-title">
                        <Link href={`/resource/${item.slug}`}>{item.title}</Link>
                      </h2>
                    </div>
                  </div>
                  <div className="gsh-card-footer">
                    <span className="gsh-card-meta">{item.category}</span>
                    <Link className="gsh-get-btn" href={`/resource/${item.slug}`}>
                      GET IT NOW
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
