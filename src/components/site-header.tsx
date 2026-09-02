"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Logo, ArrowRight } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Derive "which route was this drawer opened on" instead of resetting state
  // from an effect — the drawer closes automatically once the path changes.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = open && openedAt === pathname;

  const setDrawer = (next: boolean) => {
    setOpen(next);
    setOpenedAt(next ? pathname : null);
  };

  // Lock body scroll and support Escape while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setOpenedAt(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Backdrop only solidifies once the page has scrolled. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-transparent bg-canvas/0 backdrop-blur-0 transition-all duration-300 in-data-[scrolled=true]:border-line in-data-[scrolled=true]:bg-canvas/80 in-data-[scrolled=true]:backdrop-blur-xl"
      />

      <div className="shell relative">
        <div className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <Logo className="size-7 shrink-0 text-ink transition-transform duration-500 group-hover:rotate-90" />
            <span className="display text-[1.0625rem] tracking-tight text-ink">
              Optech<span className="text-ink-3">Labs</span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-2 text-[0.8125rem] font-medium text-ink-2 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:grid" />
            <Link
              href="/#contact"
              className="btn btn-accent hidden h-9 px-4 sm:inline-flex"
            >
              Book a call
              <ArrowRight className="size-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setDrawer(!isOpen)}
              className="grid size-11 place-items-center rounded-sm border border-line text-ink lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <svg
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                className="size-[18px]"
                aria-hidden="true"
              >
                <path
                  d="M3 5.5h12"
                  className={
                    isOpen
                      ? "origin-center translate-y-[3.5px] rotate-45 transition-transform duration-300"
                      : "transition-transform duration-300"
                  }
                />
                <path
                  d="M3 12.5h12"
                  className={
                    isOpen
                      ? "origin-center -translate-y-[3.5px] -rotate-45 transition-transform duration-300"
                      : "transition-transform duration-300"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Reading progress — driven by --scroll-progress from Enhancements. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent-fill opacity-0 transition-opacity duration-300 in-data-[scrolled=true]:opacity-100"
        style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!isOpen}
        className="relative border-b border-line bg-canvas lg:hidden"
      >
        <div className="shell py-5">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-line-faint py-3.5 text-base text-ink"
              >
                <span className="flex items-center gap-3">
                  <span className="label text-ink-3">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  {item.label}
                </span>
                <ArrowRight className="size-4 text-ink-3" />
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex items-center gap-3">
            <Link href="/#contact" className="btn btn-accent h-11 flex-1">
              Book a call
              <ArrowRight className="size-4" />
            </Link>
            <ThemeToggle className="shrink-0 sm:size-11" />
          </div>
        </div>
      </div>
    </header>
  );
}
