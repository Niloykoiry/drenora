"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Lenis default: smooth, but follows the wheel closely enough not to feel laggy.
        lerp: 0.1,
        smoothWheel: true,
        // Smooth-scroll in-page links (e.g. #reach-out) and clear the fixed header.
        anchors: { offset: -90 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
