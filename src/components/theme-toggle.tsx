"use client";

import { useSyncExternalStore, useCallback } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "optech-theme";

/** Subscribers notified whenever the theme changes in this tab or another. */
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep multiple tabs in sync.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/**
 * The DOM is the source of truth: the boot script in the root layout sets
 * `data-theme` before first paint, so reading it here avoids both a flash and
 * a hydration mismatch.
 */
function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

/** Server render assumes the documented default. */
function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";

    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private mode — the choice simply won't persist. */
    }
    emit();
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      className={`group relative grid size-11 place-items-center rounded-sm border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink sm:size-9 ${className ?? ""}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title="Switch theme"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        className="size-[17px]"
        aria-hidden="true"
      >
        {/* Sun/moon hybrid: the mask circle slides away in light mode. */}
        <circle cx="10" cy="10" r="4" />
        <g className="origin-center transition-opacity duration-300 light:opacity-100 dark:opacity-0">
          <path d="M10 1.6v1.8M10 16.6v1.8M18.4 10h-1.8M3.4 10H1.6M15.94 4.06l-1.27 1.27M5.33 14.67l-1.27 1.27M15.94 15.94l-1.27-1.27M5.33 5.33 4.06 4.06" />
        </g>
        <circle
          cx="14.2"
          cy="6.6"
          r="4"
          fill="var(--canvas)"
          stroke="none"
          className="transition-opacity duration-300 dark:opacity-100 light:opacity-0"
        />
      </svg>
    </button>
  );
}
