import Link from "next/link";
import { nav, site, services } from "@/content/site";
import { Logo, ArrowRight } from "@/components/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-canvas-deep">
      <div className="shell">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          {/* Identity */}
          <div className="flex flex-col gap-5 md:col-span-5 lg:col-span-4">
            <Link href="/" className="flex min-h-11 w-fit items-center gap-2.5">
              <Logo className="size-7 text-ink" />
              <span className="display text-[1.0625rem] text-ink">
                Optech<span className="text-ink-3">Labs</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-ink-2">
              A senior product studio building revenue-critical web products for
              founders and SaaS teams since {site.founded}.
            </p>

            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {site.locations.map((location, i) => (
                <span key={location} className="label text-ink-3">
                  {location}
                  {i < site.locations.length - 1 ? (
                    <span aria-hidden="true" className="ml-2 text-line-strong">/</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3 lg:col-span-5 lg:col-start-6"
          >
            <div className="flex flex-col gap-1 lg:gap-2">
              <h3 className="label text-ink-3">Studio</h3>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink lg:min-h-9"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-1 lg:gap-2">
              <h3 className="label text-ink-3">Services</h3>
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/#services`}
                  className="flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink lg:min-h-9"
                >
                  {service.title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-1 lg:gap-2">
              <h3 className="label text-ink-3">Connect</h3>
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink lg:min-h-9"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Contact CTA */}
          <div className="flex flex-col gap-4 md:col-span-12 lg:col-span-3 lg:col-start-11 lg:items-end lg:text-right">
            <h3 className="label text-ink-3">Start a project</h3>
            <a
              href={`mailto:${site.email}`}
              className="display inline-flex min-h-11 items-center text-lg text-ink transition-colors hover:text-accent lg:min-h-0"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink lg:min-h-0"
            >
              {site.phone}
            </a>
            <Link
              href="/#contact"
              className="btn btn-ghost mt-1 h-10 w-fit px-4"
            >
              Book a call
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col-reverse gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ink-3">
            © {year} {site.name}
            <span aria-hidden="true" className="mx-2 text-line-strong">/</span>
            All rights reserved
          </p>

          <p className="label flex items-center gap-2 text-ink-3">
            <span className="relative flex size-1.5">
              <span className="pulse-dot absolute inline-flex size-full rounded-full bg-accent-fill" />
            </span>
            Available for Q4 projects
          </p>
        </div>
      </div>
    </footer>
  );
}
