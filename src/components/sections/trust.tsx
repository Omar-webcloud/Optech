import { clients, stats } from "@/content/site";

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="relative">
      <h2 id="trust-heading" className="sr-only">
        Client results and trust signals
      </h2>

      {/* ---------------------------------------------------------------- */}
      {/* Logo marquee                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-b border-line py-8">
        <div className="shell">
          <p className="label mb-6 text-center text-ink-3">
            Trusted by teams shipping at
          </p>
        </div>

        <div className="marquee-mask relative flex overflow-hidden">
          {/* Two identical tracks so the -50% translate loops seamlessly. */}
          {[0, 1].map((track) => (
            <div
              key={track}
              aria-hidden={track === 1}
              className="animate-marquee flex shrink-0 items-center gap-14 pr-14 motion-reduce:animate-none"
            >
              {clients.map((client) => (
                <span
                  key={`${track}-${client}`}
                  className="display shrink-0 text-[1.0625rem] tracking-[0.14em] text-ink-3 transition-colors duration-300 hover:text-ink"
                >
                  {client}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Stat grid                                                         */}
      {/* ---------------------------------------------------------------- */}
      <div className="shell">
        {/* Hairline grid: the gap-px + background trick draws perfectly even
            dividers at every breakpoint without per-cell border maths. */}
        <dl className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="group relative flex flex-col gap-2 bg-canvas py-8 pr-6 sm:px-6 sm:first:pl-0 lg:px-5 lg:first:pl-0"
            >
              <dt className="numeral text-[clamp(2.25rem,4.6vw,3.25rem)] leading-none text-ink transition-colors duration-300 group-hover:text-accent">
                {stat.value}
              </dt>
              <dd className="flex flex-col gap-1.5">
                <span className="label text-ink">{stat.label}</span>
                <span className="max-w-[22ch] text-[0.8125rem] leading-relaxed text-ink-2">
                  {stat.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
