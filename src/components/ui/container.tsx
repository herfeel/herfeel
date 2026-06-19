import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container)] px-[var(--gutter-mobile)] md:px-[var(--gutter-tablet)] lg:px-[var(--gutter-desktop)]",
        className,
      )}
      {...props}
    />
  );
}
