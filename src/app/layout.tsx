import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Enhancements } from "@/components/enhancements";
import "./globals.css";

/**
 * Fonts are self-hosted from npm rather than fetched from Google at build time.
 * This removes a network dependency from the build, guarantees reproducible CI
 * output, and keeps the font on our own origin for privacy and performance.
 */
const bricolage = localFont({
  src: "../fonts/BricolageGrotesque-Variable.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Optech Labs is a senior web development and UI/UX studio for founders and SaaS teams. Fixed scope, fixed price, median launch in six weeks.",
  keywords: [
    "web development agency",
    "UI UX design studio",
    "Next.js development",
    "product design agency",
    "SaaS web design",
    "conversion optimisation",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "A senior product studio for founders and SaaS teams. We design and build revenue-critical web products in weeks, not quarters.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description:
      "A senior product studio for founders and SaaS teams. Fixed scope, fixed price, median launch in six weeks.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Runs before paint to resolve the theme and mark the document as JS-enabled.
 * Without this the page would flash the wrong theme on load, and reveal
 * animations would hide content permanently for no-JS visitors.
 */
const bootScript = `
(function () {
  try {
    var stored = localStorage.getItem('optech-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersLight ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  document.documentElement.classList.add('js');
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: bootScript }}
          // Theme must resolve before first paint to avoid a flash.
        />
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="btn btn-accent sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:h-10 focus:px-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Enhancements />
      </body>
    </html>
  );
}
