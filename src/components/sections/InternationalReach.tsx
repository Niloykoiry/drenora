import Image from "next/image";
import PauseOffscreen from "@/components/ui/PauseOffscreen";
import { Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { REACH, SEO_PARAGRAPH } from "@/data/site";

/** sg-map-pinned.png is 1600×783. */
const MAP_RATIO = 1600 / 783;

export default function InternationalReach() {
  return (
    <>
      <section className="py-[50px] md:py-16">
        <div className="px-5 text-center">
          <SplitReveal
            text={REACH.title}
            className="font-display text-[22px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
          />
          <Reveal delay={0.15} y={20}>
            <p className="mt-4 text-[14px] leading-[1.4] text-snow md:text-[22px] md:leading-[1.2]">
              {REACH.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="relative mx-[10px] mt-[30px] h-[294px] overflow-hidden [--map-h:294px] md:mx-0 md:h-[720px] md:[--map-h:720px]">
          <Reveal y={0} duration={1.6} amount={0.1} className="absolute inset-0">
           <PauseOffscreen className="absolute inset-0">
            {/* Box sized like background-size: cover, so the pulses stay glued to the pins. */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `max(100%, calc(var(--map-h) * ${MAP_RATIO}))`,
                aspectRatio: `${MAP_RATIO}`,
              }}
            >
              <Image
                src={REACH.map}
                alt="World map showing the countries Dr. Ghoraba's patients travel from"
                fill
                sizes="(max-width: 767px) 600px, 100vw"
                className="object-cover"
              />
              {REACH.pins.map(([left, top], i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute size-[18px] animate-pin-pulse rounded-full border border-gold/80 bg-gold/20 md:size-[22px]"
                  style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${(i % 6) * 0.4}s` }}
                />
              ))}
            </div>
           </PauseOffscreen>
          </Reveal>
          <div aria-hidden className="absolute inset-0 bg-ink/30" />

          <Stagger
            stagger={0.04}
            amount={0.4}
            className="absolute inset-x-0 bottom-[10px] mx-auto flex max-w-[1100px] flex-wrap justify-center gap-[6px] px-[10px] md:bottom-[70px] md:gap-[10px]"
          >
            {REACH.countries.map((country) => (
              <StaggerItem key={country}>
                <span className="glass-light block rounded-full px-[10px] py-[5px] text-[10px] font-semibold leading-[1.3] text-white transition-colors duration-400 hover:border-gold/70 hover:bg-gold/20 md:px-4 md:py-[6px] md:text-[18px]">
                  {country}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-[1188px] px-6 pb-[50px] pt-6">
        <Reveal y={16}>
          <p className="font-roboto text-[16px] leading-[1.65] text-[#7a7a7a]">{SEO_PARAGRAPH}</p>
        </Reveal>
      </section>
    </>
  );
}
