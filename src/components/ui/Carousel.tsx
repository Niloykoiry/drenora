"use client";

import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, type ReactNode } from "react";

type CarouselProps = {
  slides: ReactNode[];
  /** Width of each slide (Tailwind basis classes). */
  slideClassName: string;
  label: string;
  autoplayDelay?: number;
  /** Shrink and dim the slides that are not centred. */
  emphasizeActive?: boolean;
  align?: "center" | "start";
  className?: string;
};

export default function Carousel({
  slides,
  slideClassName,
  label,
  autoplayDelay = 5000,
  emphasizeActive = false,
  align = "center",
  className,
}: CarouselProps) {
  const [emblaRef, api] = useEmblaCarousel(
    { loop: true, align, duration: 34 },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={emblaRef} className="overflow-hidden py-[10px]">
        <div className="-ml-5 flex touch-pan-y">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className={clsx("min-w-0 shrink-0 grow-0 pl-5", slideClassName)}
            >
              <div
                className={clsx(
                  "h-full transition-[transform,opacity] duration-700 ease-luxe",
                  emphasizeActive && i !== selected && "scale-[0.94] opacity-50",
                )}
              >
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* With loop + one-slide steps there is one snap per slide. */}
      {slides.length > 1 && (
        <div className="mt-[14px] flex justify-center gap-[14px]">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected}
              onClick={() => api?.scrollTo(i)}
              className={clsx(
                "h-[10px] rounded-full transition-[width,background-color] duration-500 ease-luxe",
                i === selected ? "w-7 bg-white/85" : "w-[10px] bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
