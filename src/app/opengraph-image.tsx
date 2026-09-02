import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
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
          background: "#08090a",
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
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
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
            background: "#cdff47",
            opacity: 0.14,
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "2px solid rgba(255,255,255,0.35)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                background: "#cdff47",
                display: "flex",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#f4f5f6",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              display: "flex",
              fontFamily: "Bricolage",
            }}
          >
            Optech
            <span style={{ color: "#6d737b" }}>Labs</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.06,
              color: "#f4f5f6",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              width: 1010,
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bricolage",
            }}
          >
            <span style={{ display: "flex" }}>Ship the product your</span>
            {/* Each headline line is its own flex row so Satori never reflows
                the accent word onto a line of its own. */}
            <span style={{ display: "flex", gap: 22 }}>
              <span style={{ display: "flex" }}>roadmap keeps</span>
              <span
                style={{
                  color: "#cdff47",
                  borderBottom: "6px solid #cdff47",
                  display: "flex",
                  paddingRight: 4,
                }}
              >
                postponing.
              </span>
            </span>
          </div>

          <div
            style={{
              fontSize: 27,
              color: "#a5aab1",
              maxWidth: 800,
              display: "flex",
              lineHeight: 1.4,
            }}
          >
            Web development &amp; UI/UX for founders and SaaS teams. Fixed
            scope, fixed price, median launch in six weeks.
          </div>
        </div>

        {/* Bottom stats */}
        <div
          style={{
            display: "flex",
            gap: 56,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          {[
            ["140+", "Products shipped"],
            ["6 wks", "Median launch"],
            ["94%", "Clients who return"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <div
                style={{
                  fontSize: 40,
                  color: "#f4f5f6",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  display: "flex",
                  fontFamily: "Bricolage",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 19,
                  color: "#6d737b",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                {label}
              </div>
            </div>
          ))}
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
