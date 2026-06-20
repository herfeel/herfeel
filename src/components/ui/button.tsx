import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "promo" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-transparent bg-[var(--color-ink)] text-white hover:-translate-y-0.5 hover:border-[var(--color-button-hover-border)] hover:bg-[var(--color-green-soft)] hover:text-black",
  secondary: "bg-white text-black ring-1 ring-[var(--color-border)] hover:bg-[var(--color-surface)]",
  promo: "bg-[var(--color-green-soft)] text-black hover:bg-[var(--color-green)]",
  ghost: "bg-transparent text-black hover:bg-[var(--color-surface)]",
};

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type NativeButtonProps = SharedButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkButtonProps = SharedButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-pill)] px-5 py-2 text-sm font-medium leading-none transition-[background-color,border-color,color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)] disabled:pointer-events-none disabled:bg-[var(--color-border)] disabled:text-[color:var(--color-muted)] disabled:hover:translate-y-0",
    variantClasses[variant],
    className,
  );

  if ("href" in props) {
    const { href, ...linkProps } = props as LinkButtonProps;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
