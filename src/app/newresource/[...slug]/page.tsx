import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { SectionHead } from "@/components/SectionHead";
import { getArticle } from "@/data/articles";
import { coverStyle, getResource, relatedResources, resourceHref } from "@/data/resources";
import { getContentOrPublished } from "@/lib/contentStore";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

function youtubeEmbedUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    let id = "";
    if (url.hostname === "youtu.be" || url.hostname === "www.youtu.be") id = url.pathname.slice(1);
    else if (url.hostname.endsWith("youtube.com")) {
      if (url.pathname === "/watch") id = url.searchParams.get("v") ?? "";
      else if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/")) id = url.pathname.split("/")[2] ?? "";
    }
    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentOrPublished();
  const resource = getResource(slug.join("/"), content);
  if (!resource) return { title: "Resource not found" };
  return {
    title: resource.title,
    alternates: { canonical: resourceHref(resource.slug) },
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
  const content = await getContentOrPublished();
  const resource = getResource(slug.join("/"), content);
  if (!resource) notFound();
  if (slug.some((part) => part.endsWith(".html"))) permanentRedirect(resourceHref(resource.slug));

  const article = getArticle(resource.key, resource.title, resource.category);
  const related = relatedResources(resource, 3, content);
  const videoUrl = youtubeEmbedUrl(resource.youtubeUrl);

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
                {article.kicker ? <p className="gsh-post-kicker">{article.kicker}</p> : null}
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
                href={content.settings.discord || SITE.discord}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Get support
              </a>
            </div>

            <div className="post-body">
              {resource.images?.length ? (
                <section className="gsh-resource-gallery" aria-label="Resource images">
                  <h2>Resource gallery</h2>
                  <div className="gsh-resource-gallery-grid">
                    {resource.images.map((src, index) => (
                      <a key={index} href={src} target="_blank" rel="noopener noreferrer">
                        <img src={src} alt={resource.title + " preview " + (index + 1)} loading="lazy" />
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
              {videoUrl ? (
                <section className="gsh-resource-video" aria-label="Resource showcase video">
                  <h2>Watch the showcase</h2>
                  <div className="gsh-resource-video-frame">
                    <iframe
                      src={videoUrl}
                      title={`${resource.title} YouTube showcase`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </section>
              ) : null}
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
                Minecraft is a trademark of Mojang Studios. Galaxy Setup Pro is an
                independent Minecraft resource platform and is not affiliated with
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
                        href={resourceHref(item.slug)}
                        style={coverStyle(item)}
                        aria-label={item.title}
                      />
                    </div>
                    <div className="post">
                      <h2 className="post-title">
                        <Link href={resourceHref(item.slug)}>{item.title}</Link>
                      </h2>
                    </div>
                  </div>
                  <div className="gsh-card-footer">
                    <span className="gsh-card-meta">{item.category}</span>
                    <Link className="gsh-get-btn" href={resourceHref(item.slug)}>
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
