"use client";

import clsx from "clsx";
import { useLenis } from "lenis/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import { EASE } from "@/components/ui/Reveal";
import SocialLinks from "@/components/ui/SocialLinks";
import { CONTACT, MENU_NAV, PRIMARY_NAV } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const lenis = useLenis();

  // Only touch React state when the threshold is actually crossed, not on
  // every scroll frame. Also fires when the browser restores a scroll position.
  const scrolledRef = useRef(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 50;
    if (next !== scrolledRef.current) {
      scrolledRef.current = next;
      setScrolled(next);
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      lenis?.stop();
      root.style.overflow = "hidden";
    } else {
      lenis?.start();
      root.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-gold/60 via-gold to-cream"
      />

      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-luxe",
          scrolled
            ? "bg-ink shadow-[0_5px_20px_0_rgba(0,0,0,0.1)]"
            : "bg-ink md:bg-transparent",
        )}
      >
        {/* Tablet & desktop */}
        <div className="relative hidden h-[100px] items-center justify-between px-[10px] md:flex">
          <Link
            href="/"
            aria-label="Dr. Samir Ghoraba — home"
            className="block size-[50px] transition-transform duration-700 ease-luxe hover:rotate-[10deg]"
          >
            <Image
              src="/media/brand/sg-logo-1.png"
              alt=""
              width={50}
              height={50}
              preload
            />
          </Link>

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <ul className="flex">
              {PRIMARY_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="group relative block px-5 py-[13px] text-[16px] font-semibold leading-5 text-white"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-5 bottom-[7px] h-px origin-center scale-x-0 bg-gold transition-transform duration-500 ease-luxe group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-[10px]">
            <div className="flex items-center gap-2">
              <a
                href={CONTACT.phoneHref}
                aria-label="Call"
                className="grid size-[34px] place-items-center rounded-full border border-white/12 bg-white/5 text-white transition-[transform,background-color,border-color] duration-400 ease-luxe hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15"
              >
                <FaPhone className="size-[13px]" />
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-[34px] place-items-center rounded-full border border-gold bg-gold/14 text-white transition-[transform,background-color] duration-400 ease-luxe hover:-translate-y-0.5 hover:bg-gold/40"
              >
                <FaWhatsapp className="size-[15px]" />
              </a>
            </div>
            <MenuButton onClick={() => setOpen(true)} />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex h-[70px] items-center justify-between p-[10px] md:hidden">
          <Link
            href="/"
            aria-label="Dr. Samir Ghoraba — home"
            className="block size-[50px]"
          >
            <Image
              src="/media/brand/sg-logo-1.png"
              alt=""
              width={50}
              height={50}
              preload
            />
          </Link>
          <Link href="/" className="flex flex-col items-center text-center">
            <span className="font-display text-[17.16px] uppercase leading-none tracking-[2.73px] text-cream">
              Samir Ghoraba
            </span>
            <span className="mt-[5px] text-[9.75px] uppercase leading-none tracking-[1.365px] text-gold">
              Facial Plastic Surgeon
            </span>
          </Link>
          <MenuButton onClick={() => setOpen(true)} />
        </div>
      </motion.header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      aria-haspopup="dialog"
      aria-controls="site-menu"
      className="group grid size-11 place-items-center rounded-full bg-black/5 transition-colors duration-400 hover:bg-white/10"
    >
      <span className="flex w-[24px] flex-col items-end gap-[6px]">
        <span className="h-[2px] w-full rounded-full bg-white" />
        <span className="h-[2px] w-full rounded-full bg-white transition-[width] duration-500 ease-luxe group-hover:w-2/3" />
        <span className="h-[2px] w-full rounded-full bg-white" />
      </span>
    </button>
  );
}

const ORIGIN = "calc(100% - 32px) 48px";

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-0 z-[60] overflow-y-auto bg-black"
          initial={{ clipPath: `circle(0% at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})` }}
          exit={{ clipPath: `circle(0% at ${ORIGIN})` }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            autoFocus
            className="fixed right-[10px] top-[13px] grid size-11 place-items-center rounded-full text-white transition-colors hover:text-gold md:top-[28px]"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
          >
            <span className="relative block size-6">
              <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </motion.button>

          <div className="flex min-h-full items-center justify-center px-6 py-24">
            <motion.div
              className="flex w-full max-w-[415px] flex-col items-center"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
              }}
            >
              <nav aria-label="Menu" className="w-full max-w-[394px]">
                <ul>
                  {[...PRIMARY_NAV.map((l) => ({ ...l, primary: true })), ...MENU_NAV].map(
                    (link) => (
                      <motion.li
                        key={link.label}
                        className={clsx("overflow-hidden", "primary" in link && "lg:hidden")}
                        variants={{
                          hidden: { opacity: 0, y: 24 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                        }}
                      >
                        <Link
                          href={link.href}
                          prefetch={false}
                          onClick={onClose}
                          className="group flex items-center gap-3 px-5 py-[10px] text-[20px] font-medium uppercase leading-5 text-white transition-colors duration-300 hover:text-gold"
                        >
                          <span
                            aria-hidden
                            className="h-px w-0 bg-gold transition-[width] duration-500 ease-luxe group-hover:w-5"
                          />
                          {link.label}
                        </Link>
                      </motion.li>
                    ),
                  )}
                </ul>
              </nav>

              <motion.span
                aria-hidden
                className="mt-[35px] block h-[2px] w-full origin-center bg-white"
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
                }}
              />

              <motion.p
                className="mt-[35px] font-display text-[22px] font-bold uppercase leading-none text-white"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                Follow Us
              </motion.p>

              <motion.div
                className="mt-5"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                <SocialLinks />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
