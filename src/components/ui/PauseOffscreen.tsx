"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Stops infinite CSS animations inside while they are off screen, so the
 * browser neither produces frames nor keeps GPU layers for loops nobody can
 * see. Toggles a data attribute directly — no React re-renders.
 */
export default function PauseOffscreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting),
      { rootMargin: "150px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
