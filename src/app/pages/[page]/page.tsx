import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { SITE } from "@/lib/site";

type PageContent = {
  title: string;
  body: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
};

const PAGES: Record<string, PageContent> = {
  "about-us": {
    title: "About Us",
    body: [
      {
        type: "p",
        text: "Poke Studio is an independent Minecraft resource showcase. We collect and share free plugins, ready-made server setups, maps, 3D models and configuration packs for server owners who are just getting started.",
      },
      {
        type: "p",
        text: "Every resource page explains what the resource does, who made it and how to install it safely. We are not the developer of the plugins listed here — we link back to the original authors and their official marketplaces whenever possible.",
      },
      { type: "h2", text: "What we publish" },
      {
        type: "ul",
        items: [
          "Plugins for Paper, Spigot, Purpur and Folia servers",
          "Complete server setups for Lifesteal, Practice, BoxPvP, Survival and more",
          "Lobby, spawn and arena maps",
          "3D model and texture packs for ItemsAdder, Oraxen, Nexo and ModelEngine",
          "GUI, menu and shop configuration packs",
          "Server forks and performance orientated software",
        ],
      },
      { type: "h2", text: "Our promise" },
      {
        type: "p",
        text: "Free means free. Nothing on this site is behind a paywall, and we never ask for your account details. If you enjoy a resource, support its original developer through their official store page.",
      },
    ],
  },
  "contact-us": {
    title: "Contact Us",
    body: [
      {
        type: "p",
        text: "Found a broken download, a resource that should be credited differently, or want to submit your own build? The fastest way to reach us is Discord.",
      },
      { type: "h2", text: "Where to find us" },
      {
        type: "ul",
        items: [
          `Discord: ${SITE.discord}`,
          `YouTube: ${SITE.youtube}`,
          `Instagram: ${SITE.instagram}`,
        ],
      },
      {
        type: "p",
        text: "For takedown requests, include the resource title, the URL on this site, and proof that you own the original work. We respond to every legitimate request.",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    body: [
      {
        type: "p",
        text: "Poke Studio is a resource catalogue. We do not require an account to browse or download anything on this site.",
      },
      { type: "h2", text: "What we collect" },
      {
        type: "ul",
        items: [
          "No account data — there are no sign ups",
          "No advertising identifiers",
          "Anonymous, aggregated page analytics only",
          "A single local storage key to remember your light/dark theme choice",
        ],
      },
      { type: "h2", text: "Third party links" },
      {
        type: "p",
        text: "Download buttons link to external hosts and original developer pages. Those sites have their own privacy policies, and we encourage you to read them before downloading anything.",
      },
      { type: "h2", text: "Contact" },
      {
        type: "p",
        text: "Questions about this policy can be sent to our Discord community.",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    body: [
      {
        type: "p",
        text: "Poke Studio is not affiliated with Mojang Studios, Microsoft, PaperMC, SpigotMC or any plugin developer listed on this site.",
      },
      {
        type: "p",
        text: "Minecraft is a trademark of Mojang Studios. Plugin names, builds, artwork and trademarks belong to their respective owners. We share resources for educational and community purposes only.",
      },
      { type: "h2", text: "Use at your own risk" },
      {
        type: "ul",
        items: [
          "Always scan files before running them on a live server",
          "Test on a staging server before going public",
          "Keep regular backups of your world and configuration",
          "Support developers by buying premium resources from official stores",
        ],
      },
      { type: "h2", text: "Takedown requests" },
      {
        type: "p",
        text: "If you own a resource and want it removed from this catalogue, contact us with proof of ownership and we will action the request quickly.",
      },
    ],
  },
  "support-my-work": {
    title: "Support My Work",
    body: [
      {
        type: "p",
        text: "If the resources on this site helped you launch your server, you can support the project. Every contribution goes back into hosting, storage and new free drops.",
      },
      { type: "h2", text: "Ways to help" },
      {
        type: "ul",
        items: [
          "Join the Discord and share your server with the community",
          "Subscribe on YouTube and leave a comment on the resource videos",
          "Credit Poke Studio when you use a free setup",
          "Buy premium resources from the original developers",
        ],
      },
      {
        type: "p",
        text: "Donation links are published inside the Discord server so that everything stays in one moderated place.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page: rawPage } = await params;
  const page = rawPage.replace(/\.html$/i, "");
  const content = PAGES[page];
  return { title: content ? content.title : "Page not found" };
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: rawPage } = await params;
  const page = rawPage.replace(/\.html$/i, "");
  const content = PAGES[page];
  if (!content) notFound();
  if (rawPage !== page) permanentRedirect(`/pages/${page}`);

  return (
    <main className="page_body item-view" id="main">
      <div className="main-container">
        <article className="post-wrapper">
          <h1 className="post-title">{content.title}</h1>
          <div className="post-body">
            {content.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items?.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}

            <div className="gsh-download-row">
              <span className="gsh-download-label">Browse the library</span>
              <Link className="gsh-btn" href="/">
                Back home
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
