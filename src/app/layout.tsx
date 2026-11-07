import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";
import { PreviewTheme } from "@/components/PreviewTheme";
import { PUBLISHED } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://galaxy-setup-pro.vercel.app"),
  title: {
    default: "Galaxy Setup Pro",
    template: "%s | Galaxy Setup Pro",
  },
  description:
    "Free Minecraft plugins, server setups, maps, models, configs and server forks. Build your server and pay nothing.",
  keywords: [
    "Minecraft plugins",
    "free minecraft setups",
    "minecraft maps",
    "minecraft models",
    "server configs",
    "Paper plugins",
    "Spigot plugins",
  ],
  openGraph: {
    title: "Galaxy Setup Pro",
    description:
      "Plugins, ready-made setups, maps, models and configs for your Minecraft server.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const accentStyle = {
    "--accent": PUBLISHED.settings.accent,
    "--accent-hi": PUBLISHED.settings.accentHi,
    "--cube-l": PUBLISHED.settings.accent,
    "--cube-t": PUBLISHED.settings.accentHi,
  } as React.CSSProperties;

  return (
    <html lang="en" style={accentStyle}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap"
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
