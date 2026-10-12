"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaWhatsapp } from "react-icons/fa6";
import { EASE } from "@/components/ui/Reveal";
import { CONTACT, LANGUAGES } from "@/data/site";

export default function FloatingActions() {
  return (
    <>
      <LanguageSwitcher />

      {/* Mobile-only WhatsApp bubble */}
      <motion.a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 1.4 }}
        className="fixed bottom-[74px] left-4 z-40 grid size-12 place-items-center rounded-full border border-gold bg-gold/14 text-white backdrop-blur-md md:hidden"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full border border-gold/50 [animation-duration:2.6s]"
        />
        <FaWhatsapp className="relative size-[22px]" />
      </motion.a>

      {/* Mobile-only sticky call bar */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
        className="fixed inset-x-0 bottom-0 z-40 grid h-[58px] grid-cols-2 md:hidden"
      >
        <a
          href={CONTACT.phoneHref}
          className="grid place-items-center bg-gold px-[6px] text-[16.38px] font-semibold text-white active:brightness-110"
        >
          {CONTACT.phoneDisplay}
        </a>
        <Link
          href={CONTACT.consultationHref}
          prefetch={false}
          className="grid place-items-center bg-ink px-[6px] text-[16.38px] font-semibold text-cream active:bg-ink-2"
        >
          Request Consultation
        </Link>
      </motion.div>
    </>
  );
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
      className="fixed bottom-[74px] right-[15px] z-40 md:bottom-5 md:right-5"
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute bottom-[calc(100%+8px)] right-0 w-[180px] origin-bottom-right overflow-hidden rounded-xl border border-white/10 bg-[#1c1c1c]/95 py-1.5 shadow-2xl backdrop-blur-xl"
          >
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <a
                  href={lang.href}
                  hrefLang={lang.code}
                  aria-current={lang.code === current.code ? "true" : undefined}
                  className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-white/80 transition-colors hover:bg-white/8 hover:text-white aria-[current]:text-white"
                >
                  <Image src={lang.flag} alt="" width={18} height={18} className="rounded-[3px]" />
                  {lang.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        className="flex h-12 items-center gap-2.5 rounded-xl border border-white/10 bg-[#1f1f1f]/90 px-4 text-[14px] font-medium text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-white/25"
      >
        <Image src={current.flag} alt="" width={16} height={16} className="rounded-[2px]" />
        {current.code.toUpperCase()}
        <FaChevronUp
          className={`size-[10px] text-white/50 transition-transform duration-400 ease-luxe ${open ? "" : "rotate-180"}`}
        />
      </button>
    </motion.div>
  );
}
