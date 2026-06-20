import Image from "next/image";
import { cn } from "@/lib/cn";
import type { HomeVisual as HomeVisualData, VisualTone } from "@/data/mock/home";

const toneClasses: Record<VisualTone, string> = {
  dark: "text-white",
  warm: "text-white",
  amber: "text-white",
  green: "text-white",
  soft: "text-[var(--color-ink)]",
  mono: "text-[var(--color-ink)]",
};



type HomeVisualProps = {
  visual: HomeVisualData;
  className?: string;
  imageSizes?: string;
  imageQuality?: number;
  labelClassName?: string;
  showLabel?: boolean;
  priority?: boolean;
};

export function HomeVisual({ visual, className, imageSizes, imageQuality, labelClassName, showLabel = true, priority = false }: HomeVisualProps) {
  const imageFit = visual.imageFit ?? "cover";

  return (
    <div className={cn("relative isolate overflow-hidden rounded-[var(--radius-md)]", toneClasses[visual.tone], className)}>
      {visual.imageSrc ? (
        <Image
          src={visual.imageSrc}
          alt={visual.imageAlt ?? visual.label}
          fill
          sizes={imageSizes ?? "(min-width: 1024px) 25vw, 50vw"}
          quality={imageQuality}
          loading={priority ? "eager" : undefined}
          preload={priority}
          className={cn(imageFit === "contain" ? "object-contain p-5 md:p-7" : "object-cover")}
          style={{ objectPosition: visual.imagePosition ?? "center" }}
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-20 " />
          <div className="absolute inset-0 opacity-15 " />
          <VisualMotif motif={visual.motif} />
        </>
      )}
      <div className="absolute inset-0 " />
      {showLabel ? <span className={cn("relative z-10 block text-xs font-semibold", labelClassName)}>{visual.label}</span> : null}
    </div>
  );
}

function VisualMotif({ motif }: { motif: HomeVisualData["motif"] }) {
  if (motif === "portrait") {
    return (
      <div className="absolute inset-x-0 bottom-0 z-0 mx-auto h-[82%] w-[76%] rounded-t-full ">
        <div className="absolute left-1/2 top-[16%] h-[34%] w-[42%] -translate-x-1/2 rounded-full bg-[rgb(12_12_13_/_0.35)]" />
        <div className="absolute bottom-0 left-1/2 h-[44%] w-[86%] -translate-x-1/2 rounded-t-[44%] bg-[rgb(12_12_13_/_0.5)]" />
      </div>
    );
  }

  if (motif === "drop") {
    return (
      <div className="absolute bottom-[16%] right-[13%] h-[62%] w-[38%] rounded-b-full rounded-t-[60%] bg-[linear-gradient(180deg,rgb(255_255_255_/_0.82),rgb(255_255_255_/_0.18))] shadow-[0_18px_40px_rgb(0_0_0_/_0.25)]" />
    );
  }

  if (motif === "bottle") {
    return (
      <div className="absolute bottom-[10%] right-[18%] h-[76%] w-[30%] rotate-[-13deg] rounded-b-[18px] rounded-t-[8px] bg-white shadow-[0_18px_42px_rgb(0_0_0_/_0.34)]">
        <div className="absolute -top-[10%] left-1/2 h-[14%] w-[46%] -translate-x-1/2 rounded-t-md bg-[var(--color-ink)]" />
        <div className="absolute inset-x-[16%] top-[20%] h-[60%] rounded-sm bg-[var(--color-ink)]" />
        <div className="absolute bottom-[12%] left-1/2 h-[5%] w-[48%] -translate-x-1/2 rounded-full bg-[var(--color-green-soft)]" />
      </div>
    );
  }

  if (motif === "bundle") {
    return (
      <div className="absolute bottom-[15%] right-[8%] flex h-[55%] w-[70%] items-end justify-end gap-2">
        <div className="h-[74%] w-[28%] rotate-[-8deg] rounded-md bg-[var(--color-ink)] shadow-[0_16px_36px_rgb(0_0_0_/_0.25)]" />
        <div className="h-full w-[32%] rounded-md bg-white shadow-[0_16px_36px_rgb(0_0_0_/_0.25)]" />
        <div className="h-[64%] w-[26%] rotate-[9deg] rounded-md bg-[var(--color-green)] shadow-[0_16px_36px_rgb(0_0_0_/_0.25)]" />
      </div>
    );
  }

  if (motif === "care") {
    return (
      <div className="absolute bottom-[14%] right-[14%] grid h-[58%] w-[58%] place-items-center rounded-full bg-[rgb(255_255_255_/_0.45)]">
        <div className="h-[62%] w-[28%] rounded-full bg-white shadow-[0_16px_34px_rgb(0_0_0_/_0.22)]" />
      </div>
    );
  }

  return (
    <div className="absolute bottom-[14%] right-[12%] h-[58%] w-[52%] rotate-[-5deg] rounded-md bg-white shadow-[0_18px_38px_rgb(0_0_0_/_0.28)]">
      <div className="absolute inset-x-[12%] top-[18%] h-[18%] rounded-full bg-[var(--color-green-soft)]" />
      <div className="absolute inset-x-[16%] bottom-[18%] h-[42%] rounded-sm bg-[var(--color-ink)]" />
    </div>
  );
}
