import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/content/site";
import { ArrowRight } from "@/components/icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { tintBlur } from "@/lib/blur";
import { pad } from "@/lib/utils";
import type { CaseStudy } from "@/content/site";

export function WorkCard({
  study,
  index,
  priority = false,
}: {
  study: CaseStudy;
  index: number;
  priority?: boolean;
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
      className="group relative flex flex-col"
    >
      <Link
        href={`/work/${study.slug}`}
        className="flex flex-col gap-5 rounded-md outline-offset-4"
        aria-label={`Read the ${study.client} case study: ${study.title}`}
      >
        {/* Visual */}
        <div className="ticked panel relative overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2">
            <span className="label truncate text-ink-3">
              {study.client.toLowerCase().replace(/\s+/g, "")}.com
            </span>
            <span className="label ml-auto shrink-0 text-ink-3">
              {study.year}
            </span>
          </div>

          <div className="relative overflow-hidden">
            <Image
              src={study.image}
              alt={study.imageAlt}
              width={1400}
              height={782}
              priority={priority}
              sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
              placeholder="blur"
              blurDataURL={tintBlur(study.tint)}
              className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
            />

            {/* Hover veil + prompt */}
            <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-canvas/85 via-canvas/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="btn btn-accent h-9 px-3.5 text-[0.8125rem]">
                Read case study
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="label text-accent">[{pad(index + 1)}]</span>
            <span className="label text-ink-3">{study.sector}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>

          <h3 className="display text-[1.375rem] leading-snug text-ink transition-colors duration-300 group-hover:text-accent md:text-[1.5rem]">
            {study.title}
          </h3>

          <p className="max-w-lg text-[0.9375rem] leading-relaxed text-ink-2">
            {study.problem}
          </p>
        </div>
      </Link>

      {/* Results strip */}
      <dl className="mt-5 grid grid-cols-3 border-t border-line pt-4">
        {study.results.map((result, i) => (
          <div
            key={result.label}
            className={`flex flex-col gap-1 ${
              i > 0 ? "border-l border-line pl-3" : "pr-3"
            }`}
          >
            <dt className="numeral text-[1.375rem] leading-none text-ink">
              {result.value}
            </dt>
            <dd className="text-[0.6875rem] leading-tight text-ink-3">
              {result.label}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function Work() {
  const featured = caseStudies.slice(0, 4);

  return (
    <Section id="work" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          index={3}
          label="Selected work"
          title={
            <>
              Proof, not a
              <br className="hidden sm:block" /> portfolio wall.
            </>
          }
          lede="Four engagements, the problem each one started with, and the numbers that moved. Every project links to a full write-up."
          action={
            <Link
              href="/work"
              className="btn btn-ghost group hidden h-10 shrink-0 px-4 lg:inline-flex"
            >
              All case studies
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />

        <div className="mt-14 grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {featured.map((study, i) => (
            <WorkCard
              key={study.slug}
              study={study}
              index={i}
              priority={i === 0}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:hidden">
          <Link href="/work" className="btn btn-ghost h-11 px-5">
            All case studies
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
