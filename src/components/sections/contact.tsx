"use client";

import { useActionState, useId, useRef, useEffect } from "react";
import Link from "next/link";
import { submitLead } from "@/app/actions";
import { emptyLeadState } from "@/lib/leads";
import { site, projectTypes, budgetRanges } from "@/content/site";
import { ArrowRight, Check } from "@/components/icons";
import { pad } from "@/lib/utils";

const fieldBase =
  "w-full rounded-sm border bg-surface px-3.5 py-3 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-ink-3 focus:border-accent-fill focus:outline-none";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="text-[0.75rem] text-red-400" role="alert">
      {children}
    </p>
  );
}

export function Contact() {
  const [state, formAction, pending] = useActionState(
    submitLead,
    emptyLeadState,
  );
  const uid = useId();
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen-reader users are told it worked.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  const f = (n: string) => `${uid}-${n}`;

  return (
    <section
      id="contact"
      className="blueprint relative scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 opacity-[0.06] blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------------------------------------------------------- */}
          {/* Pitch column                                                */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="label flex items-center gap-2.5 text-ink-3">
                <span className="text-accent">[{pad(7)}]</span>
                <span>Start here</span>
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>

            <h2 className="display mt-5 text-[clamp(2rem,5.2vw,3.5rem)] text-ink">
              Tell us what you
              <br className="hidden sm:block" /> are trying to ship.
            </h2>

            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
              One form, one reply, no sales sequence. You will hear back from a
              senior engineer or designer within one business day — with a
              genuine opinion on your project, not a brochure.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5 border-t border-line pt-8">
              {[
                "A reply within one business day",
                "A fixed quote after a 20-minute call",
                "No obligation, no retainer pitch",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.9375rem] text-ink-2"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2 border-t border-line pt-8">
              <span className="label text-ink-3">Prefer email?</span>
              <a
                href={`mailto:${site.email}`}
                className="display inline-flex min-h-11 w-fit items-center text-lg text-ink transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Form column                                                 */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-7">
            <div className="ticked panel bg-surface/60 p-6 backdrop-blur-sm md:p-9">
              {state.status === "success" ? (
                /* ---------------- Success state ---------------- */
                <div
                  ref={successRef}
                  tabIndex={-1}
                  className="flex min-h-[26rem] flex-col items-center justify-center gap-5 text-center outline-none"
                >
                  <span className="grid size-14 place-items-center rounded-full border border-accent-fill bg-accent-soft text-accent">
                    <Check className="size-7" />
                  </span>

                  <div className="flex flex-col gap-2.5">
                    <h3 className="display text-2xl text-ink">
                      Message received.
                    </h3>
                    <p className="mx-auto max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
                      {state.message} In the meantime, here is the case study
                      closest to what you described.
                    </p>
                  </div>

                  <Link
                    href="/work"
                    className="btn btn-ghost group mt-1 h-11 px-5"
                  >
                    Browse case studies
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              ) : (
                /* ---------------- Form ---------------- */
                <form action={formAction} noValidate className="flex flex-col gap-5">
                  {state.errors.form ? (
                    <div
                      role="alert"
                      className="rounded-sm border border-red-500/40 bg-red-500/10 px-4 py-3 text-[0.875rem] text-red-300"
                    >
                      {state.errors.form}
                    </div>
                  ) : null}

                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={f("name")}
                        className="label text-ink-2"
                      >
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id={f("name")}
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        defaultValue={state.values.name}
                        aria-invalid={!!state.errors.name}
                        aria-describedby={
                          state.errors.name ? f("name-error") : undefined
                        }
                        className={`${fieldBase} ${
                          state.errors.name ? "border-red-500/60" : "border-line"
                        }`}
                        placeholder="Jordan Reyes"
                      />
                      <FieldError id={f("name-error")}>
                        {state.errors.name}
                      </FieldError>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={f("email")}
                        className="label text-ink-2"
                      >
                        Work email <span className="text-accent">*</span>
                      </label>
                      <input
                        id={f("email")}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        defaultValue={state.values.email}
                        aria-invalid={!!state.errors.email}
                        aria-describedby={
                          state.errors.email ? f("email-error") : undefined
                        }
                        className={`${fieldBase} ${
                          state.errors.email
                            ? "border-red-500/60"
                            : "border-line"
                        }`}
                        placeholder="jordan@company.com"
                      />
                      <FieldError id={f("email-error")}>
                        {state.errors.email}
                      </FieldError>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor={f("company")} className="label text-ink-2">
                      Company{" "}
                      <span className="normal-case tracking-normal text-ink-3">
                        (optional)
                      </span>
                    </label>
                    <input
                      id={f("company")}
                      name="company"
                      type="text"
                      autoComplete="organization"
                      defaultValue={state.values.company}
                      className={`${fieldBase} border-line`}
                      placeholder="Northwind"
                    />
                  </div>

                  {/* Project type + budget */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={f("projectType")}
                        className="label text-ink-2"
                      >
                        Project type
                      </label>
                      <select
                        id={f("projectType")}
                        name="projectType"
                        defaultValue={state.values.projectType}
                        className={`${fieldBase} border-line appearance-none bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%236d737b' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
                        }}
                      >
                        <option value="">Select one…</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <FieldError id={f("projectType-error")}>
                        {state.errors.projectType}
                      </FieldError>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={f("budget")}
                        className="label text-ink-2"
                      >
                        Budget range
                      </label>
                      <select
                        id={f("budget")}
                        name="budget"
                        defaultValue={state.values.budget}
                        className={`${fieldBase} border-line appearance-none bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%236d737b' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
                        }}
                      >
                        <option value="">Select one…</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      <FieldError id={f("budget-error")}>
                        {state.errors.budget}
                      </FieldError>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor={f("message")} className="label text-ink-2">
                      What are you building?{" "}
                      <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id={f("message")}
                      name="message"
                      required
                      rows={4}
                      defaultValue={state.values.message}
                      aria-invalid={!!state.errors.message}
                      aria-describedby={
                        state.errors.message ? f("message-error") : undefined
                      }
                      className={`${fieldBase} resize-y ${
                        state.errors.message
                          ? "border-red-500/60"
                          : "border-line"
                      }`}
                      placeholder="A sentence or two on the goal, the deadline, and what is blocking you today."
                    />
                    <FieldError id={f("message-error")}>
                      {state.errors.message}
                    </FieldError>
                  </div>

                  {/* Honeypot — hidden from users, irresistible to bots.
                      `hidden` keeps it out of the a11y tree and tab order. */}
                  <div
                    hidden
                    aria-hidden="true"
                    className="absolute left-[-9999px] size-px overflow-hidden"
                  >
                    <label htmlFor={f("website")}>
                      Do not fill this in
                      <input
                        id={f("website")}
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[28ch] text-[0.75rem] leading-relaxed text-ink-3">
                      We reply to every enquiry. No mailing list, ever.
                    </p>

                    <button
                      type="submit"
                      disabled={pending}
                      className="btn btn-accent group h-12 w-full px-6 text-[0.9375rem] sm:w-auto"
                    >
                      {pending ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="size-4 animate-spin rounded-full border-2 border-accent-ink/25 border-t-accent-ink"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send project brief
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Live region so assistive tech announces the pending state. */}
                  <p aria-live="polite" className="sr-only">
                    {pending ? "Sending your message" : ""}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
