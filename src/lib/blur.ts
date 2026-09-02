/**
 * Builds a 1×1 SVG data URL in the given colour, used as `blurDataURL` for
 * next/image. Cheaper and sharper than shipping real LQIP bitmaps, and it means
 * the placeholder always matches the artwork's dominant tone.
 */
export function tintBlur(hex: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="${hex}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
