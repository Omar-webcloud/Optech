"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement layer, mounted once at the root.
 *
 * Deliberately implemented with native browser APIs instead of an animation
 * library: it keeps the client bundle tiny and means the page is fully readable
 * and usable if this component never runs at all.
 *
 * Responsibilities:
 *  1. Reveal-on-scroll via IntersectionObserver (elements marked `data-reveal`).
 *  2. Pointer spotlight coordinates for `.spotlight` cards.
 *  3. Scroll-progress custom property for the header progress bar.
 */
export function Enhancements() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ---------------------------------------------------------------- */
    /* 1. Reveal on scroll                                              */
    /* ---------------------------------------------------------------- */
    let observer: IntersectionObserver | undefined;

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );

      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => observer?.observe(el));
    }

    /* ---------------------------------------------------------------- */
    /* 2. Pointer spotlight                                             */
    /* ---------------------------------------------------------------- */
    const onPointerMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    // Fine pointers only — this is pure decoration and irrelevant on touch.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    /* ---------------------------------------------------------------- */
    /* 3. Scroll progress                                               */
    /* ---------------------------------------------------------------- */
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const progress = max > 0 ? doc.scrollTop / max : 0;
        doc.style.setProperty("--scroll-progress", progress.toFixed(4));
        doc.dataset.scrolled = doc.scrollTop > 16 ? "true" : "false";
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
