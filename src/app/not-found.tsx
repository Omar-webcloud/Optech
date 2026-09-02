import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { caseStudies } from "@/content/site";

export default function NotFound() {
  return (
    <section className="blueprint relative flex min-h-[70vh] items-center py-32">
      <div className="shell">
        <div className="flex max-w-2xl flex-col gap-6">
          <span className="label text-accent">Error 404</span>

          <h1 className="display text-[clamp(2.5rem,7vw,4.5rem)] text-ink">
            This page moved,
            <br /> or never shipped.
          </h1>

          <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink-2">
            The link you followed does not resolve. Here are the routes that
            definitely do.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-accent group h-12 px-6">
              Back to home
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/work" className="btn btn-ghost h-12 px-6">
              Browse case studies
            </Link>
          </div>

          <ul className="mt-8 flex flex-col border-t border-line">
            {caseStudies.slice(0, 3).map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="label text-ink-3">{study.client}</span>
                    <span className="truncate text-[0.9375rem] text-ink transition-colors group-hover:text-accent">
                      {study.title}
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-ink-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
