import type { Metadata } from "next";
import Image from "next/image";
import Contact from "@/components/sections/Contact";
import BlogModalGrid from "@/components/sections/BlogModalGrid";
import Recognition from "@/components/sections/Recognition";
import { Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import {
  ABOUT_PAGE,
  LATEST_BLOGS,
  RECOGNIZED_BY,
} from "@/data/site";

export const metadata: Metadata = {
  title: "About Dr. Enora Nilomi | Plastic & Reconstructive Surgeon",
  description:
    "Learn about Dr. Enora Nilomi's surgical interests, approach to consultation, and professional affiliations.",
};

export default function AboutDrEnoraPage() {
  return (
    <main>
      <section className="relative isolate min-h-[calc(100svh-70px)] overflow-hidden bg-ink md:min-h-[650px]">
        <Image
          src={ABOUT_PAGE.hero.image}
          alt={ABOUT_PAGE.hero.imageAlt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[center_35%] grayscale"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10"
        />
        <div className="relative mx-auto flex min-h-[calc(100svh-70px)] max-w-[1297px] flex-col justify-center px-5 pt-[70px] md:min-h-[650px] md:px-10 md:pt-[100px]">
          <Reveal y={20}>
            <p className="text-[10px] uppercase leading-[1.4] tracking-[1.5px] text-white/75 md:text-[12px]">
              {ABOUT_PAGE.hero.subtitle}
            </p>
            <h1 className="mt-3 max-w-[760px] font-display text-[32px] font-thin uppercase leading-[1.15] text-white md:text-[58px]">
              {ABOUT_PAGE.hero.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink-2 px-5 py-14 md:px-10 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/media/backgrounds/background-02.jpg')] bg-cover bg-center opacity-[0.12] grayscale"
        />
        <div className="relative mx-auto grid max-w-[1188px] items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] md:gap-16">
          <div>
            <Reveal y={12}>
              <p className="text-[10px] uppercase leading-[1.4] tracking-[1.4px] text-gold">
                {ABOUT_PAGE.profile.eyebrow}
              </p>
            </Reveal>
            <SplitReveal
              text={ABOUT_PAGE.profile.title}
              className="mt-3 font-display text-[26px] font-thin uppercase leading-[1.2] text-snow md:text-[38px]"
            />
            {ABOUT_PAGE.profile.paragraphs.map((paragraph) => (
              <Reveal key={paragraph} y={16} delay={0.1}>
                <p className="mt-5 max-w-[660px] text-[14px] leading-[1.8] text-[#dedbd6] md:text-[16px]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal y={24} className="relative mx-auto w-full max-w-[470px]">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <Image
                src={ABOUT_PAGE.profile.image}
                alt={ABOUT_PAGE.profile.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 470px"
                className="object-cover object-center grayscale-[20%]"
              />
            </div>
            <span
              aria-hidden
              className="absolute -bottom-3 -left-3 -z-10 h-2/3 w-2/3 border border-gold/45"
            />
          </Reveal>
        </div>
      </section>

      <Recognition />

      <section className="px-5 py-14 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1188px]">
          <SplitReveal
            text={ABOUT_PAGE.approachTitle}
            className="text-center font-display text-[24px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
          />
          <Stagger
            stagger={0.1}
            className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3"
          >
            {ABOUT_PAGE.approaches.map((item, index) => (
              <StaggerItem key={item.title}>
                <article className="h-full border border-white/10 bg-ink-2 p-6 md:min-h-[190px] md:p-7">
                  <p className="font-display text-[11px] tracking-[1.3px] text-gold">
                    0{index + 1}
                  </p>
                  <h2 className="mt-4 font-display text-[18px] font-medium leading-[1.3] text-snow md:text-[20px]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#a8a29a] md:text-[14px]">
                    {item.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-ink-2 px-5 py-14 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1188px]">
          <SplitReveal
            text={ABOUT_PAGE.affiliationsTitle}
            className="text-center font-display text-[24px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-[680px] text-center text-[14px] leading-[1.6] text-[#a8a29a]">
              {ABOUT_PAGE.affiliationsIntro}
            </p>
          </Reveal>
          <Stagger
            stagger={0.05}
            className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-12 md:grid-cols-4 md:gap-4"
          >
            {RECOGNIZED_BY.map((logo) => (
              <StaggerItem key={logo.src}>
                <div className="grid aspect-[4/3] place-items-center bg-[#f5f4f1] p-4 md:p-6">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={137}
                    height={137}
                    sizes="(max-width: 767px) 40vw, 260px"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-14 md:py-24">
        <SplitReveal
          text={ABOUT_PAGE.articlesTitle}
          className="text-center font-display text-[24px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
        />
        <BlogModalGrid posts={LATEST_BLOGS} />
      </section>

      <Contact />
    </main>
  );
}
