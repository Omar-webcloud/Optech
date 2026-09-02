import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies, site } from "@/content/site";
import { WorkCard } from "@/components/sections/work";
import { FinalCta } from "@/components/sections/final-cta";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Selected work from Optech Labs — freight operations, digital health, fintech design systems and commerce. The problem each project started with and the numbers that moved.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Case studies — ${site.name}`,
    description:
      "The problem each project started with, and the numbers that moved.",
    url: `${site.url}/work`,
  },
};

export default function WorkIndex() {
  const totalResults = caseStudies.length;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Page head                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="blueprint relative border-b border-line pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="label flex items-center gap-2 text-ink-3">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-ink sm:min-h-0">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-line-strong">
                /
              </li>
              <li aria-current="page" className="text-ink">
                Work
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="display text-[clamp(2.5rem,6.4vw,4.5rem)] text-ink">
                Work that had to
                <br className="hidden sm:block" /> earn its budget.
              </h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
                Every engagement below started with a measurable problem. Each
                write-up covers what was actually wrong, the decision that
                changed it, and what happened afterwards.
              </p>
            </div>

            <dl className="flex shrink-0 gap-8 border-t border-line pt-6 lg:border-none lg:pt-0">
              <div className="flex flex-col gap-1">
                <dt className="label text-ink-3">Case studies</dt>
                <dd className="numeral text-3xl text-ink">{totalResults}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="label text-ink-3">Since</dt>
                <dd className="numeral text-3xl text-ink">{site.founded}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Grid                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-x-10 gap-y-16 lg:grid-cols-2">
            {caseStudies.map((study, i) => (
              <WorkCard
                key={study.slug}
                study={study}
                index={i}
                priority={i < 2}
              />
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="text-[0.9375rem] text-ink-2">
              Working on something similar?{" "}
              <span className="text-ink">We will tell you honestly whether we are a fit.</span>
            </p>
            <Link href="/#contact" className="btn btn-accent group h-11 px-5">
              Start a project
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
