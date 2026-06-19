import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionTone = "white" | "surface" | "ink";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-[var(--color-white)] text-[var(--color-ink)]",
  surface: "bg-[var(--color-surface)] text-[var(--color-ink)]",
  ink: "bg-[var(--color-ink)] text-[var(--color-white)]",
};

export type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: SectionTone;
};

export function Section({ className, tone = "white", ...props }: SectionProps) {
  return <section className={cn("py-[var(--space-16)]", toneClasses[tone], className)} {...props} />;
}
