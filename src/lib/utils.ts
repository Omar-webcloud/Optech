/**
 * Minimal class-name joiner. Kept dependency-free on purpose — the design
 * system relies on semantic tokens rather than long conditional class chains,
 * so `clsx`/`tailwind-merge` would be dead weight here.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Zero-pads a section index for the `[01]` spec-sheet numbering. */
export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
