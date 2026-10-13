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
    default: "OPTECH | Web Design & Development Studio",
    template: "%s | OPTECH",
  },
  description:
    "OPTECH is an independent web design and development studio creating memorable digital experiences, custom websites, and products for ambitious brands.",
  keywords: [
    "web design studio",
    "web development studio",
    "creative agency",
    "digital experiences",
    "website design and development",
    "product design",
    "UI UX design",
  ],
  category: "technology",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  applicationName: site.name,
  referrer: "strict-origin-when-cross-origin",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/optech-emblem-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/optech-emblem-180.png", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "OPTECH | Web Design & Development Studio",
    description:
      "An independent design and development studio creating memorable digital experiences, custom websites, and products for ambitious brands.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OPTECH — independent web design and development studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPTECH | Web Design & Development Studio",
    description:
      "An independent design and development studio creating memorable digital experiences for ambitious brands.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#f7f7f5" },
  ],
  colorScheme: "light",
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
    var theme = stored || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  document.documentElement.classList.add('js');
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
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
