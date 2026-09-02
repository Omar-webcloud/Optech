import { differentiators } from "@/content/site";
import { Icon } from "@/components/icons";
import { Section, SectionHeader } from "@/components/ui/section";

export function Why() {
  return (
    <Section id="why" className="bg-canvas-deep py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          index={4}
          label="Why Optech"
          title={
            <>
              What agencies promise,
              <br className="hidden sm:block" /> written down as terms.
            </>
          }
          lede="Every studio claims quality and speed. These are the specific commitments we put in the contract — and the reason clients come back."
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              className="spotlight group relative flex flex-col gap-4 bg-canvas-deep p-7 transition-colors duration-300 hover:bg-surface"
            >
              <span className="grid size-10 place-items-center rounded-sm border border-line bg-surface-2 text-accent transition-all duration-300 group-hover:border-accent-fill group-hover:bg-accent-fill group-hover:text-accent-ink">
                <Icon name={item.icon} className="size-[18px]" />
              </span>

              <h3 className="display text-[1.125rem] text-ink">{item.title}</h3>

              <p className="text-[0.875rem] leading-relaxed text-ink-2">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
