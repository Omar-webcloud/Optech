import { testimonials } from "@/content/site";
import { Section, SectionHeader } from "@/components/ui/section";

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 24V13.4C0 6.4 3.9 1.9 11.2 0l1.6 3.6C8.4 5.2 6.2 7.9 6.1 11.6H12V24H0Zm19 0V13.4C19 6.4 22.9 1.9 30.2 0l1.6 3.6c-4.4 1.6-6.6 4.3-6.7 8H31V24H19Z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="overflow-hidden py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          index={5}
          label="In their words"
          title="What clients say when we are not in the room."
          lede="Verbatim quotes from the people who signed off the budget and lived with the result."
        />
      </div>

      {/* Horizontal scroll rail — native scroll-snap, no JS carousel. */}
      <div
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Client testimonials, scroll horizontally"
        tabIndex={0}
      >
        {/* Leading spacer aligns the first card with the content shell. */}
        <div
          aria-hidden="true"
          className="w-[max(1.25rem,calc((100vw-84rem)/2+1.25rem))] shrink-0 md:w-[max(2rem,calc((100vw-84rem)/2+2rem))] xl:w-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]"
        />

        {testimonials.map((item) => (
          <figure
            key={item.name}
            className="panel flex w-[min(84vw,25rem)] shrink-0 snap-start flex-col gap-6 p-7 transition-colors duration-300 hover:border-line-strong"
          >
            <div className="flex items-start justify-between gap-4">
              <QuoteMark className="size-6 shrink-0 text-accent/45" />
              <span className="label shrink-0 rounded-sm border border-line bg-surface-2 px-2 py-1 text-ink-2">
                {item.metric}
              </span>
            </div>

            <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink">
              {item.quote}
            </blockquote>

            <figcaption className="flex items-center gap-3 border-t border-line pt-5">
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface-2 text-[0.6875rem] font-medium tracking-wide text-ink-2"
              >
                {item.initials}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[0.875rem] font-medium text-ink">
                  {item.name}
                </span>
                <span className="truncate text-[0.75rem] text-ink-3">
                  {item.role}, {item.company}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}

        <div aria-hidden="true" className="w-5 shrink-0 md:w-8" />
      </div>

      <div className="shell">
        <p className="label flex items-center gap-2 text-ink-3">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className="size-3.5"
            aria-hidden="true"
          >
            <path d="M2 8h12M10 4l4 4-4 4" />
          </svg>
          Scroll for more
        </p>
      </div>
    </Section>
  );
}
