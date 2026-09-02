import Link from "next/link";
import { faqs } from "@/content/site";
import { Plus, ArrowRight } from "@/components/icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { pad } from "@/lib/utils";

export function Faq() {
  return (
    <Section id="faq" className="bg-canvas-deep py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky heading rail */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                index={6}
                label="Questions"
                title="The things people ask before signing."
              />

              <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
                Straight answers, including the ones about money. If something
                is missing, ask us directly — we answer in a day.
              </p>

              <Link
                href="#contact"
                className="btn btn-ghost group mt-6 h-10 px-4"
              >
                Ask a question
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Accordion — native <details>, works without JavaScript. */}
          <div className="lg:col-span-8">
            <div className="border-t border-line">
              {faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  name="faq"
                  className="group border-b border-line"
                >
                  <summary className="flex items-start gap-4 py-5 pr-2 transition-colors duration-200 hover:text-accent md:gap-6">
                    <span className="label mt-1 shrink-0 text-ink-3 transition-colors group-open:text-accent">
                      {pad(i + 1)}
                    </span>

                    <h3 className="display flex-1 text-[1.0625rem] leading-snug text-ink transition-colors group-hover:text-accent group-open:text-accent md:text-[1.1875rem]">
                      {faq.q}
                    </h3>

                    <span
                      aria-hidden="true"
                      className="accordion-icon mt-0.5 grid size-7 shrink-0 place-items-center rounded-sm border border-line text-ink-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-line-strong"
                    >
                      <Plus className="size-3.5" />
                    </span>
                  </summary>

                  <div className="accordion-body">
                    <div>
                      <p className="max-w-2xl pb-6 pl-[2.75rem] pr-10 text-[0.9375rem] leading-relaxed text-ink-2 md:pl-[3.5rem]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
