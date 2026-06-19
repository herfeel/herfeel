import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "promo" | "urgent";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-[var(--color-surface)] text-[var(--color-black)]",
  promo: "bg-[var(--color-green-soft)] text-[var(--color-black)]",
  urgent: "bg-[var(--color-orange)] text-[var(--color-black)]",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium leading-none",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
