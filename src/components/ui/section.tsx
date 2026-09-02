import { cn, pad } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Spec-sheet section header: a numbered monospace label, a display heading and
 * an optional lede. The numbering is what makes the page read as an engineering
 * document rather than a generic marketing stack.
 */
export function SectionHeader({
  index,
  label,
  title,
  lede,
  align = "left",
  className,
  action,
}: {
  index: number;
  label: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full items-center gap-4",
          centered && "justify-center",
        )}
      >
        <span className="label flex items-center gap-2.5 text-ink-3">
          <span className="text-accent">[{pad(index)}]</span>
          <span>{label}</span>
        </span>
        <span
          aria-hidden="true"
          className={cn("h-px flex-1 bg-line", centered && "max-w-24")}
        />
      </div>

      <div
        className={cn(
          "flex w-full flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
          centered && "lg:flex-col lg:items-center",
        )}
      >
        <h2
          className={cn(
            "display max-w-2xl text-[clamp(2rem,5.2vw,3.5rem)] text-ink",
            centered && "max-w-3xl",
          )}
        >
          {title}
        </h2>

        {lede ? (
          <p
            className={cn(
              "max-w-md text-[0.9375rem] leading-relaxed text-ink-2",
              centered && "max-w-2xl text-center text-base",
            )}
          >
            {lede}
          </p>
        ) : null}

        {action}
      </div>
    </div>
  );
}

/** Consistent vertical rhythm + a top hairline for every major band. */
export function Section({
  id,
  children,
  className,
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        bordered && "border-t border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}
