import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";
import { PreviewTheme } from "@/components/PreviewTheme";
import { getContentOrPublished } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Poke Studio",
    template: "%s | Poke Studio",
  },
  description:
    "Poke Studio is your creative hub for free and premium Minecraft plugins, server setups, maps, models, panels, web code, scripts and configurations.",
  applicationName: "Poke Studio",
  keywords: [
    "Poke Studio",
    "Minecraft plugins",
    "Minecraft server setups",
    "Minecraft maps",
    "Minecraft models",
    "Minecraft server panels",
    "Minecraft scripts",
    "server configs",
  ],
  openGraph: {
    title: "Poke Studio",
    description:
      "Discover Minecraft plugins, server setups, maps, models, panels, scripts and more at Poke Studio.",
    siteName: "Poke Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poke Studio",
    description:
      "Your creative hub for Minecraft resources, server setups, plugins and more.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContentOrPublished();
  const accentStyle = {
    "--accent": content.settings.accent,
    "--accent-hi": content.settings.accentHi,
    "--cube-l": content.settings.accent,
    "--cube-t": content.settings.accentHi,
  } as React.CSSProperties;

  return (
    <html lang="en" style={accentStyle}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('gsh-theme')==='light'){document.documentElement.classList.add('light-mode');}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <div className="page">
          <Header />
          {children}
          <Footer />
        </div>
        <ScrollTop />
        <PreviewTheme />
      </body>
    </html>
  );
}
