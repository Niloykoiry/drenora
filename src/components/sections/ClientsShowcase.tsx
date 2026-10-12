"use client";

import clsx from "clsx";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { EASE } from "@/components/ui/Reveal";
import { CLIENTS, RESULTS, type Client } from "@/data/site";

export default function ClientsShowcase() {
  const [active, setActive] = useState(0);
  const client = CLIENTS[active];

  return (
    <div className="flex w-full flex-col gap-10 md:gap-[60px]">
      <LayoutGroup>
        <div
          role="tablist"
          aria-label="Celebrity patients"
          className="flex flex-wrap items-center justify-center gap-[10px] px-[15px] md:gap-[14px]"
        >
          {CLIENTS.map((c, i) => {
            const selected = i === active;
            return (
              <motion.button
                key={c.name}
                layout
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`${c.name}, ${c.role}`}
                onClick={() => setActive(i)}
                transition={{ layout: { duration: 0.6, ease: EASE } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ borderRadius: 50 }}
                className={clsx(
                  "client-chip flex items-center p-1 transition-[box-shadow] duration-500 md:p-2",
                  selected
                    ? "pr-[14px] shadow-[0_0_0_1px_rgba(176,141,87,0.25),0_12px_40px_-18px_rgba(176,141,87,0.6)] md:pr-4"
                    : "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)]",
                )}
              >
                <motion.span
                  layout="position"
                  className="relative block size-12 shrink-0 overflow-hidden rounded-full md:size-20"
                >
                  <Image
                    src={c.avatar}
                    alt=""
                    fill
                    sizes="80px"
                    className={clsx(
                      "object-cover transition-[transform,filter] duration-700 ease-luxe",
                      selected ? "scale-100" : "scale-105 grayscale-[35%] hover:grayscale-0",
                    )}
                  />
                </motion.span>
                <AnimatePresence initial={false} mode="popLayout">
                  {selected && (
                    <motion.span
                      key="info"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE, delay: 0.15 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      className="flex flex-col whitespace-nowrap pl-[17px] text-left md:pl-7"
                    >
                      <span className="font-condensed text-[15px] font-medium leading-[1.2] text-white md:text-[24px]">
                        {c.name}
                      </span>
                      <span className="text-[14px] font-light leading-[1.2] text-white md:text-[20px]">
                        {c.role}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}

          <motion.div layout transition={{ layout: { duration: 0.6, ease: EASE } }}>
            <Link
              href={RESULTS.seeMoreHref}
              prefetch={false}
              className="client-chip grid size-[60px] place-items-center rounded-full px-3 text-center font-condensed text-[10px] font-semibold uppercase leading-[1.15] tracking-[0.6px] text-white underline underline-offset-2 transition-[transform,box-shadow] duration-500 ease-luxe hover:scale-105 hover:shadow-[0_0_0_1px_rgba(176,141,87,0.35)] md:size-[90px] md:p-[10px] md:text-[22px] md:font-medium md:leading-[1.4] md:tracking-[0.5px]"
            >
              See more
            </Link>
          </motion.div>
        </div>
      </LayoutGroup>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={client.name}
          role="tabpanel"
          aria-label={client.name}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <ClientTrack client={client} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const GAP = 13;
const COPIES = 3;
/** Seconds per full set, same pace as the live marquee. */
const LOOP_SECONDS = 25;

/**
 * Infinite auto-scrolling track that pauses on hover and can be dragged
 * (with a wrap-around so dragging never hits an edge).
 */
function ClientTrack({ client }: { client: Client }) {
  const setRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  // No per-frame work at all while the track is off screen.
  const inView = useInView(viewportRef, { margin: "200px" });
  const x = useMotionValue(0);
  const [setWidth, setSetWidth] = useState(0);
  const hovered = useRef(false);
  const drag = useRef<{ startX: number; startValue: number; moved: boolean } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;
    const measure = () => setSetWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wrap = (v: number) => {
    if (!setWidth) return v;
    const m = ((v % setWidth) + setWidth) % setWidth;
    return m === 0 ? 0 : m - setWidth;
  };

  useAnimationFrame((_, delta) => {
    if (!inView || !setWidth || hovered.current || drag.current || reduceMotion) return;
    x.set(wrap(x.get() - ((setWidth / LOOP_SECONDS) * Math.min(delta, 64)) / 1000));
  });

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { startX: e.clientX, startValue: x.get(), moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (d.moved) x.set(wrap(d.startValue + dx));
  };
  const endDrag = () => {
    // Keep the "moved" flag until the click that follows a drag is swallowed.
    setTimeout(() => (drag.current = null), 0);
  };

  const items = [
    { kind: "brief" as const, key: "brief" },
    ...client.images.map((src, i) => ({ kind: "image" as const, key: `${src}-${i}`, src })),
  ];

  return (
    <div
      ref={viewportRef}
      className="relative cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
      onPointerEnter={(e) => e.pointerType === "mouse" && (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        if (drag.current?.moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            ref={copy === 0 ? setRef : undefined}
            aria-hidden={copy > 0}
            className="flex shrink-0"
            style={{ gap: GAP, paddingRight: GAP }}
          >
            {items.map((item) =>
              item.kind === "brief" ? (
                <BriefCard key={item.key} client={client} hidden={copy > 0} />
              ) : (
                <div
                  key={item.key}
                  className="group relative h-[355px] w-[312px] shrink-0 overflow-hidden rounded-[14px] bg-ink-2 md:h-[450px] md:w-[420px]"
                >
                  <Image
                    src={item.src}
                    alt={copy > 0 ? "" : `${client.name} — result`}
                    fill
                    draggable={false}
                    sizes="(max-width: 767px) 312px, 420px"
                    className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-white/5" />
                </div>
              ),
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function BriefCard({ client, hidden }: { client: Client; hidden: boolean }) {
  return (
    <div className="flex h-[355px] w-[312px] shrink-0 flex-col justify-between rounded-[14px] bg-white/9 p-[14px] md:h-[450px] md:w-[420px] md:p-[30px]">
      <div>
        <h3 className="font-display text-[22px] font-semibold leading-[1.3] text-white">Brief</h3>
        <p className="mt-3 line-clamp-6 font-system text-[14px] leading-[1.6] text-muted md:mt-5 md:text-[16px]">
          {client.brief}
        </p>
      </div>
      <div>
        <h4 className="font-display text-[18px] font-semibold leading-[1.2] text-white">Services</h4>
        <div className="mt-4 flex flex-wrap gap-[10px] md:mt-[50px]">
          {client.services.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              prefetch={false}
              tabIndex={hidden ? -1 : undefined}
              draggable={false}
              className="rounded-[22px] border border-[#ddd] bg-[rgb(250_250_250/0.14)] p-[10px] text-[14px] font-medium leading-[1.65] text-white transition-colors duration-300 hover:border-gold hover:bg-gold/25"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
