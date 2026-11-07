import { notFound, permanentRedirect } from "next/navigation";
import { getResource, resourceHref } from "@/data/resources";
import { getContentOrPublished } from "@/lib/contentStore";

// Resolve historical Blogger-style resource URLs such as /2026/11/example.html.
// All recognized legacy links are permanently redirected to their clean canonical URL.
export const dynamic = "force-dynamic";

export default async function LegacyPublicResourcePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const content = await getContentOrPublished();
  const resource = getResource(slug.join("/"), content);

  if (!resource) notFound();
  permanentRedirect(resourceHref(resource.slug));
}
