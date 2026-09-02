import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, site } from "@/content/site";
import { ArrowRight, Check } from "@/components/icons";
import { FinalCta } from "@/components/sections/final-cta";
import { tintBlur } from "@/lib/blur";
import { pad } from "@/lib/utils";

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

function getStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getStudy(slug);

  if (!study) return { title: "Case study not found" };

  const description = `${study.problem} — how Optech Labs solved it for ${study.client}.`;

  return {
    title: study.title,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${study.title} — ${site.name}`,
      description,
      url: `${site.url}/work/${study.slug}`,
      images: [{ url: study.image, width: 1400, height: 782, alt: study.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description,
      images: [study.image],
    },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getStudy(slug);

  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.problem,
    image: `${site.url}${study.image}`,
    datePublished: `${study.year}-01-01`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Head                                                              */}
      {/* ---------------------------------------------------------------- */}
      <article>
        <header className="blueprint relative border-b border-line pb-14 pt-32 md:pt-40">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="label flex flex-wrap items-center gap-2 text-ink-3">
                <li>
                  <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-ink sm:min-h-0">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-line-strong">/</li>
                <li>
                  <Link href="/work" className="inline-flex min-h-11 items-center transition-colors hover:text-ink sm:min-h-0">
                    Work
                  </Link>
                </li>
                <li aria-hidden="true" className="text-line-strong">/</li>
                <li aria-current="page" className="truncate text-ink">
                  {study.client}
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-3">
              <span className="label text-accent">[{pad(currentIndex + 1)}]</span>
              <span className="label text-ink-3">{study.sector}</span>
              <span aria-hidden="true" className="h-px w-12 bg-line" />
              <span className="label text-ink-3">{study.year}</span>
            </div>

            <h1 className="display mt-6 max-w-4xl text-[clamp(2.25rem,5.6vw,4rem)] text-ink">
              {study.title}
            </h1>

            {/* Fact rail */}
            <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
              <div className="flex flex-col gap-1.5 bg-canvas p-5">
                <dt className="label text-ink-3">Client</dt>
                <dd className="text-[0.9375rem] text-ink">{study.client}</dd>
              </div>
              <div className="flex flex-col gap-1.5 bg-canvas p-5">
                <dt className="label text-ink-3">Duration</dt>
                <dd className="text-[0.9375rem] text-ink">{study.duration}</dd>
              </div>
              <div className="flex flex-col gap-1.5 bg-canvas p-5">
                <dt className="label text-ink-3">Services</dt>
                <dd className="text-[0.9375rem] text-ink">
                  {study.services.join(", ")}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5 bg-canvas p-5">
                <dt className="label text-ink-3">Stack</dt>
                <dd className="text-[0.9375rem] text-ink">
                  {study.stack.join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Hero image                                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="shell -mt-px py-14 md:py-16">
          <figure className="ticked panel overflow-hidden shadow-float">
            <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
              </span>
              <span className="label mx-auto text-ink-3">
                {study.client.toLowerCase().replace(/\s+/g, "")}.com
              </span>
            </div>
            <Image
              src={study.image}
              alt={study.imageAlt}
              width={1400}
              height={782}
              priority
              sizes="(min-width: 1280px) 80rem, 100vw"
              placeholder="blur"
              blurDataURL={tintBlur(study.tint)}
              className="h-auto w-full"
            />
          </figure>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Results                                                           */}
        {/* ---------------------------------------------------------------- */}
        <section
          aria-labelledby="results-heading"
          className="border-y border-line bg-canvas-deep py-14"
        >
          <div className="shell">
            <h2 id="results-heading" className="label mb-8 text-ink-3">
              Outcome
            </h2>
            <dl className="grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
              {study.results.map((result) => (
                <div
                  key={result.label}
                  className="flex flex-col gap-2 bg-canvas-deep py-6 sm:px-6 sm:first:pl-0"
                >
                  <dt className="numeral text-[clamp(2.25rem,5vw,3.25rem)] leading-none text-accent">
                    {result.value}
                  </dt>
                  <dd className="text-[0.9375rem] text-ink-2">{result.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Narrative                                                         */}
        {/* ---------------------------------------------------------------- */}
        <div className="shell py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Problem / solution summary */}
            <aside className="lg:col-span-4">
              <div className="flex flex-col gap-8 lg:sticky lg:top-28">
                <div className="flex flex-col gap-3">
                  <h2 className="label text-accent">The problem</h2>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {study.problem}
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-line pt-8">
                  <h2 className="label text-accent">What we did</h2>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {study.solution}
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-line pt-8">
                  <h2 className="label text-ink-3">Scope</h2>
                  <ul className="flex flex-col gap-2">
                    {study.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-2 text-[0.875rem] text-ink-2"
                      >
                        <Check className="size-3.5 shrink-0 text-accent" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Long-form */}
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-12">
                {study.narrative.map((block, i) => (
                  <section key={block.heading} className="flex flex-col gap-4">
                    <div className="flex items-baseline gap-4">
                      <span className="label shrink-0 text-ink-3">
                        {pad(i + 1)}
                      </span>
                      <h2 className="display text-[clamp(1.375rem,2.6vw,1.875rem)] text-ink">
                        {block.heading}
                      </h2>
                    </div>
                    <p className="pl-0 text-[1.0625rem] leading-[1.75] text-ink-2 sm:pl-[2.75rem]">
                      {block.body}
                    </p>
                  </section>
                ))}

                {study.quote ? (
                  <figure className="ticked panel mt-2 flex flex-col gap-5 bg-surface p-7 md:p-9">
                    <blockquote className="display text-[clamp(1.125rem,2.4vw,1.5rem)] leading-snug text-ink">
                      “{study.quote.text}”
                    </blockquote>
                    <figcaption className="flex items-center gap-3 border-t border-line pt-5 text-[0.875rem]">
                      <span className="font-medium text-ink">
                        {study.quote.name}
                      </span>
                      <span aria-hidden="true" className="text-line-strong">/</span>
                      <span className="text-ink-3">{study.quote.role}</span>
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ---------------------------------------------------------------- */}
      {/* Next project                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-line py-14">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="label text-ink-3">Next case study</span>
              <Link
                href={`/work/${next.slug}`}
                className="display group max-w-xl text-[clamp(1.5rem,3.4vw,2.25rem)] text-ink transition-colors hover:text-accent"
              >
                {next.title}
                <ArrowRight className="ml-3 inline size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>

            <Link href="/work" className="btn btn-ghost h-10 shrink-0 px-4">
              All work
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
