import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = "OPTECH — independent web design and development studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, rendered at build time with the real brand typefaces.
 *
 * Satori needs static TTF/OTF — it cannot parse woff2, and variable fonts trip
 * its glyph lookup — so the repo vendors single-weight TTFs of the same
 * families the site loads. Reading them from disk keeps the render fully
 * offline, with no font CDN anywhere in the build path.
 */
export default async function OpengraphImage() {
  const fontDir = join(process.cwd(), "src", "fonts");
  const [display, body] = await Promise.all([
    readFile(join(fontDir, "BricolageGrotesque-SemiBold.ttf")),
    readFile(join(fontDir, "Geist-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f5",
          padding: "72px",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        {/* Grid field */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(10,11,13,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,11,13,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            display: "flex",
          }}
        />

        {/* Accent bloom */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 380,
            width: 700,
            height: 480,
            background: "#171717",
            opacity: 0.08,
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 30,
              color: "#0a0b0d",
              fontWeight: 600,
              letterSpacing: "0.18em",
              display: "flex",
              fontFamily: "Bricolage",
            }}
          >
            OPTECH
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.06,
              color: "#0a0b0d",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              width: 1010,
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bricolage",
            }}
          >
            <span style={{ display: "flex" }}>Digital experiences</span>
            {/* Each headline line is its own flex row so Satori never reflows
                the accent word onto a line of its own. */}
            <span style={{ display: "flex", gap: 22 }}>
              <span style={{ display: "flex" }}>people</span>
              <span
                style={{
                  color: "#171717",
                  borderBottom: "6px solid #171717",
                  display: "flex",
                  paddingRight: 4,
                }}
              >
                remember.
              </span>
            </span>
          </div>

          <div
            style={{
              fontSize: 27,
              color: "#4b4f55",
              maxWidth: 800,
              display: "flex",
              lineHeight: 1.4,
            }}
          >
            Independent web design, development, and product design studio.
          </div>
        </div>

        {/* Brand and contact */}
        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: "1px solid rgba(10,11,13,0.12)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#4b4f55",
              display: "flex",
              letterSpacing: "0.08em",
            }}
          >
            optech.vercel.app
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#4b4f55",
              display: "flex",
            }}
          >
            {site.email}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, style: "normal", weight: 600 },
        { name: "Geist", data: body, style: "normal", weight: 400 },
      ],
    },
  );
}
