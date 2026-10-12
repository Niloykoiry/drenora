"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Card surface with a soft light that follows the cursor.
 * Pure CSS variables — no re-renders on pointer move.
 * Renders a link when `href` is given.
 */
export default function Spotlight({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  // Coalesce pointer events to one style write per frame (mice can fire 500+/s).
  const frame = useRef(0);
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  const classes = clsx("group/spot relative isolate block overflow-hidden", className);
  const light = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      style={{
        background:
          "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.09), transparent 45%)",
      }}
    />
  );

  if (href) {
    return (
      <Link href={href} prefetch={false} onPointerMove={onPointerMove} className={classes}>
        {light}
        {children}
      </Link>
    );
  }

  return (
    <div onPointerMove={onPointerMove} className={classes}>
      {light}
      {children}
    </div>
  );
}
