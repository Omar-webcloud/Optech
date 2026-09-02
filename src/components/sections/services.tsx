import Link from "next/link";
import { services } from "@/content/site";
import { Icon, ArrowRight } from "@/components/icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { pad } from "@/lib/utils";

export function Services() {
  return (
    <Section id="services" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          index={1}
          label="What we do"
          title={
            <>
              Four disciplines,
              <br className="hidden sm:block" /> one accountable team.
            </>
          }
          lede="No handoffs between agencies, no translation loss between design and engineering. The people who scope the work are the people who ship it."
        />

        {/* Bordered grid — cells share hairlines instead of floating as cards. */}
        <div className="mt-14 grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2">
          {services.map((service, i) => (
            <article
              key={service.id}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="spotlight group relative flex flex-col gap-5 bg-canvas p-7 transition-colors duration-300 hover:bg-surface md:p-9"
            >
              {/* Index + icon row */}
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-sm border border-line bg-surface-2 text-ink transition-all duration-300 group-hover:border-accent-fill group-hover:bg-accent-fill group-hover:text-accent-ink">
                  <Icon name={service.icon} className="size-5" />
                </span>
                <span className="label text-ink-3">{pad(i + 1)}</span>
              </div>

              <div className="flex flex-col gap-2.5">
                <h3 className="display text-[1.375rem] text-ink">
                  {service.title}
                </h3>
                <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
                  {service.blurb}
                </p>
              </div>

              {/* Deliverable chips */}
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-line bg-surface-2 px-2 py-1 text-[0.6875rem] text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-line-faint pt-4">
                <span className="label text-ink-3">
                  Typically {service.timeline}
                </span>
                <ArrowRight className="size-4 text-ink-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </div>
            </article>
          ))}
        </div>

        {/* Inline CTA rail */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-line px-1 py-6 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-[0.9375rem] text-ink-2">
            Not sure which one you need?{" "}
            <span className="text-ink">That is what the first call is for.</span>
          </p>
          <Link href="#contact" className="btn btn-ghost group h-10 px-4">
            Scope my project
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
