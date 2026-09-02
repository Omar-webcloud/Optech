import { process } from "@/content/site";
import { Check } from "@/components/icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { pad } from "@/lib/utils";

export function Process() {
  return (
    <Section id="process" className="bg-canvas-deep py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          index={2}
          label="How it works"
          title={
            <>
              A process you can
              <br className="hidden sm:block" /> hold us to.
            </>
          }
          lede="Every phase has a dated deliverable and a demo. If a week passes without something you can open in a browser, something has gone wrong."
        />

        {/* Desktop: horizontal stepper. Mobile: vertical timeline. */}
        <ol className="mt-14 grid grid-cols-1 gap-0 md:grid-cols-4">
          {process.map((phase, i) => (
            <li
              key={phase.step}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="group relative flex gap-5 pb-9 md:flex-col md:gap-0 md:pb-0 md:pr-6"
            >
              {/* --- Rail (mobile: vertical line, desktop: horizontal) --- */}
              <div className="relative flex shrink-0 flex-col items-center md:h-auto md:w-full md:flex-row">
                <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-[0.6875rem] font-medium text-ink transition-colors duration-300 group-hover:border-accent-fill group-hover:bg-accent-fill group-hover:text-accent-ink md:size-8">
                  {pad(i + 1)}
                </span>

                {/* Connector */}
                <span
                  aria-hidden="true"
                  className={`bg-line ${
                    i === process.length - 1
                      ? "w-px flex-1 md:hidden"
                      : "w-px flex-1 md:h-px md:w-full md:flex-1"
                  }`}
                />
              </div>

              {/* --- Content --- */}
              <div className="flex flex-col gap-3 pt-0.5 md:pt-6">
                <div className="flex flex-col gap-1">
                  <span className="label text-accent">{phase.duration}</span>
                  <h3 className="display text-[1.25rem] text-ink">
                    {phase.step}
                  </h3>
                </div>

                <p className="max-w-[30ch] text-[0.875rem] leading-relaxed text-ink-2">
                  {phase.summary}
                </p>

                <ul className="mt-1 flex flex-col gap-1.5">
                  {phase.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-center gap-2 text-[0.8125rem] text-ink-2"
                    >
                      <Check className="size-3 shrink-0 text-ink-3" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Guarantee bar */}
        <div
          data-reveal
          className="ticked panel mt-4 flex flex-col gap-4 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:mt-10"
        >
          <div className="flex flex-col gap-1">
            <p className="display text-[1.0625rem] text-ink">
              Fixed scope. Fixed price. Dated timeline.
            </p>
            <p className="text-[0.875rem] text-ink-2">
              Agreed in writing after discovery — before a line of code is
              written.
            </p>
          </div>
          <span className="label shrink-0 rounded-sm border border-accent-fill/40 bg-accent-soft px-3 py-2 text-accent">
            Our commitment
          </span>
        </div>
      </div>
    </Section>
  );
}
