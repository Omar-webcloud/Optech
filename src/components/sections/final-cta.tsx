import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/icons";

/**
 * High-contrast conversion band. Deliberately the only place on the page that
 * inverts to a solid accent field — nothing else competes with it.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-accent-fill text-accent-ink">
      {/* Faint engineering grid, drawn in the ink colour for contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="shell relative py-16 md:py-24">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="label opacity-70">Next step</p>

            <h2 className="display mt-5 text-[clamp(2.25rem,6vw,4rem)]">
              Twenty minutes to
              <br className="hidden sm:block" /> a real answer.
            </h2>

            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed opacity-80">
              Bring the problem, not a spec. We will tell you what it takes,
              what it costs, and whether we are the right team for it — on the
              call, not a week later.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="#contact"
              className="btn group h-13 bg-accent-ink px-7 py-4 text-[0.9375rem] text-accent-fill hover:opacity-90"
            >
              Book a 20-min call
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href={`mailto:${site.email}`}
              className="btn h-13 border border-accent-ink/25 px-7 py-4 text-[0.9375rem] text-accent-ink hover:bg-accent-ink/10"
            >
              Email us instead
            </a>
          </div>
        </div>

        {/* Availability ticker */}
        <div className="mt-12 flex flex-col gap-3 border-t border-accent-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="pulse-dot absolute inline-flex size-full rounded-full bg-accent-ink" />
            </span>
            Currently booking Q4 — 2 slots remaining
          </p>

          <p className="label opacity-60">
            Avg. reply time: under 6 business hours
          </p>
        </div>
      </div>
    </section>
  );
}
