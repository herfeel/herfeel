"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/lib/cn";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "scale";
  trigger?: "early" | "content";
} & Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  childVariant?: "slide" | "scale";
  trigger?: "early" | "content";
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

function useRevealInView(trigger: "early" | "content" = "content") {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const entryOffset = trigger === "early" ? 0.92 : 0.82;

    if (rect.top <= viewportHeight * entryOffset) {
      setIsVisible(true);
      setIsReady(true);
      return;
    }

    setIsReady(true);

    if (!globalThis.IntersectionObserver) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new globalThis.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: trigger === "early" ? "0px 0px -8% 0px" : "0px 0px -18% 0px",
        threshold: 0.01,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [trigger]);

  return { ref, isReady, isVisible };
}

export function RevealSection({
  children,
  className,
  variant,
  trigger,
  ...props
}: RevealSectionProps) {
  const { ref, isReady, isVisible } = useRevealInView(trigger);

  return (
    <section
      ref={ref}
      className={cn("reveal-root", className)}
      data-reveal-kind="section"
      data-reveal-ready={isReady ? "true" : "false"}
      data-reveal-visible={isVisible ? "true" : "false"}
      data-reveal-variant={variant ?? "default"}
      {...props}
    >
      {children}
    </section>
  );
}

export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, isReady, isVisible } = useRevealInView("early");

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={cn("reveal-root", className)}
      data-reveal-kind="hero"
      data-reveal-ready={isReady ? "true" : "false"}
      data-reveal-visible={isVisible ? "true" : "false"}
    >
      {children}
    </div>
  );
}

export function StaggerReveal({
  children,
  className,
  childClassName,
  childVariant,
  trigger,
  ...props
}: StaggerRevealProps) {
  const { ref, isReady, isVisible } = useRevealInView(trigger);

  const wrappedChildren = Children.map(children, (child, index) =>
    <div
      key={index}
      className={cn("reveal-item", childClassName)}
      data-reveal-variant={childVariant ?? "slide"}
      style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
    >
      {child}
    </div>,
  );

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={cn("reveal-root", className)}
      data-reveal-kind="stagger"
      data-reveal-ready={isReady ? "true" : "false"}
      data-reveal-visible={isVisible ? "true" : "false"}
      {...props}
    >
      {wrappedChildren}
    </div>
  );
}

export function RevealItem({ children, className, variant }: { children: ReactNode; className?: string; variant?: "slide" | "scale" }) {
  return (
    <div className={cn("reveal-item", className)} data-reveal-variant={variant ?? "slide"}>
      {children}
    </div>
  );
}
