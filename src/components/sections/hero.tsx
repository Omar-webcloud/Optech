import Image from "next/image";
import Link from "next/link";
import { hero, caseStudies } from "@/content/site";
import { ArrowRight, Check } from "@/components/icons";
import { tintBlur } from "@/lib/blur";

const featured = caseStudies[0];

export function Hero() {
  return (
    <section className="blueprint relative overflow-hidden pt-28 md:pt-32 lg:pt-40">
      {/* Accent bloom behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[38rem] w-[70rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <div className="shell">
        <div className="grid items-start gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* ---------------------------------------------------------- */}
          {/* Copy                                                        */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-7 lg:pt-4">
            <div className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2.5 pr-3.5 backdrop-blur">
              <span className="relative flex size-1.5">
                <span className="pulse-dot absolute inline-flex size-full rounded-full bg-accent-fill" />
              </span>
              <span className="label text-ink-2">{hero.eyebrow}</span>
            </div>

            <h1 className="display mt-7 text-[clamp(2.25rem,5.4vw,4.25rem)] text-ink">
              {hero.headline.map((line, i) => (
                <span
                  key={line}
                  className="animate-rise block"
                  style={{ animationDelay: `${80 + i * 90}ms` }}
                >
                  {i === hero.headlineAccentIndex ? (
                    <span className="relative inline-block">
                      <span className="relative z-10">{line}</span>
                      {/* Hand-drawn underline, tuned to the text baseline. */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 300 16"
                        preserveAspectRatio="none"
                        className="absolute -bottom-0.5 left-0 h-[0.32em] w-full text-accent"
                      >
                        <path
                          d="M2 11.5c48-5.4 121-8.2 186-6.7 41 .9 82 3.6 110 7.2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p
              className="animate-rise mt-7 max-w-xl text-base leading-relaxed text-ink-2 md:text-[1.0625rem]"
              style={{ animationDelay: "380ms" }}
            >
              {hero.sub}
            </p>

            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "460ms" }}
            >
              <Link
                href={hero.primaryCta.href}
                className="btn btn-accent group h-12 px-6 text-[0.9375rem]"
              >
                {hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="btn btn-ghost group h-12 px-6 text-[0.9375rem]"
              >
                {hero.secondaryCta.label}
                <span className="label text-ink-3 transition-colors group-hover:text-ink-2">
                  04
                </span>
              </Link>
            </div>

            <ul
              className="animate-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5"
              style={{ animationDelay: "540ms" }}
            >
              {hero.reassurance.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[0.8125rem] text-ink-2"
                >
                  <Check className="size-3.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Visual                                                      */}
          {/* ---------------------------------------------------------- */}
          <div
            className="animate-rise relative lg:col-span-5"
            style={{ animationDelay: "300ms" }}
          >
            {/* Spec ticks above the panel */}
            <div className="mb-3 flex items-center justify-between">
              <span className="label text-ink-3">Live client build</span>
              <span className="label text-ink-3">{featured.year}</span>
            </div>

            <figure className="ticked panel relative overflow-hidden shadow-float">
              {/* Window chrome bar */}
              <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                </span>
                <span className="label mx-auto truncate text-ink-3">
                  {featured.client.toLowerCase()}.app / operations
                </span>
              </div>

              <Image
                src={featured.image}
                alt={featured.imageAlt}
                width={1400}
                height={782}
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 90vw, 100vw"
                placeholder="blur"
                blurDataURL={tintBlur(featured.tint)}
                className="h-auto w-full"
              />
            </figure>

            {/* Floating result chip */}
            <div className="ticked panel absolute -bottom-6 -left-5 hidden bg-canvas/95 px-4 py-3 shadow-float backdrop-blur-md sm:block lg:-left-12">
              <p className="numeral text-2xl text-accent">
                {featured.results[1].value}
              </p>
              <p className="mt-0.5 text-[0.6875rem] leading-tight text-ink-2">
                {featured.results[1].label}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Telemetry strip                                               */}
        {/* ------------------------------------------------------------ */}
        <dl className="mt-16 grid grid-cols-3 border-y border-line md:mt-20">
          {hero.telemetry.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col gap-1 py-5 ${
                i > 0 ? "border-l border-line pl-4 md:pl-6" : "pr-4"
              }`}
            >
              <dt className="label text-ink-3">{item.label}</dt>
              <dd className="numeral text-[clamp(1.5rem,3.4vw,2.25rem)] text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
