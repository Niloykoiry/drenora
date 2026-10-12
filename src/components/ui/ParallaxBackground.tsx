"use client";

import clsx from "clsx";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

/** Full-bleed section background that drifts slower than the page. */
export default function ParallaxBackground({
  src,
  className,
  imageClassName,
  strength = 10,
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  /** Max drift as a percentage of the section height. */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 -z-20 overflow-hidden", className)}
    >
      <motion.div
        style={{ y, top: `-${strength + 2}%`, bottom: `-${strength + 2}%` }}
        className="absolute inset-x-0 will-change-transform"
      >
        <Image src={src} alt="" fill sizes="100vw" className={clsx("object-cover", imageClassName)} />
      </motion.div>
    </div>
  );
}
