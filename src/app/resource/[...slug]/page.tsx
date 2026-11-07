import { notFound, permanentRedirect } from "next/navigation";
import { getResource, resourceHref } from "@/data/resources";
import { getContentOrPublished } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export default async function LegacyResourcePage({
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
