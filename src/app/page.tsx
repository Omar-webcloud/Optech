import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Why } from "@/components/sections/why";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Contact } from "@/components/sections/contact";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "OPTECH | Web Design & Development Studio",
  description:
    "OPTECH is an independent creative studio turning ambitious ideas into memorable digital experiences through web design, development, and product design.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "OPTECH",
    title: "OPTECH | Web Design & Development Studio",
    description:
      "An independent creative studio turning ambitious ideas into memorable digital experiences through thoughtful design and development.",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OPTECH — independent web design and development studio",
      },
    ],
  },
};

/**
 * The landing page is ordered as a conversion funnel, matching the brief:
 * hook → trust → offer → process → proof → differentiation → objections → convert.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Trust />
      <Services />
      <Process />
      <Work />
      <Why />
      <Testimonials />
      <Faq />
      <Contact />
      <FinalCta />
    </>
  );
}
