"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import GlassButton from "@/components/ui/GlassButton";
import { EASE, SplitReveal } from "@/components/ui/Reveal";
import { HERO } from "@/data/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Stop decoding 1080p frames while the hero is off screen or the tab is hidden.
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sync = () => {
      if (inView && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[709px] flex-col items-center justify-end overflow-hidden px-[10px] pb-5 pt-[90px] md:min-h-[800px] md:px-[120px] md:py-16"
    >
      <motion.div
        aria-hidden
        style={{ scale: videoScale, y: videoY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO.video.poster}
          className="size-full object-cover"
        >
          <source
            media="(max-width: 767px)"
            src={HERO.video.mobile}
            type="video/mp4"
          />
          <source src={HERO.video.desktop} type="video/mp4" />
        </video>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#1d2125]/50" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink/60"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex w-full max-w-[1185px] flex-col items-center gap-5 px-[10px] text-center"
      >
        <SplitReveal
          as="h1"
          immediate
          delay={0.45}
          text={HERO.title}
          className="font-display text-[22px] font-thin uppercase leading-[1.3] text-snow md:text-[38px]"
        />
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.95 }}
          className="max-w-[706px] text-[16px] leading-[1.2] text-snow md:text-[22px]"
        >
          {HERO.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="hidden md:block"
        >
          <GlassButton href="#reach-out" variant="light">
            get in touch
          </GlassButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
