import { FaStar } from "react-icons/fa6";
import Carousel from "@/components/ui/Carousel";
import GlassButton from "@/components/ui/GlassButton";
import ParallaxBackground from "@/components/ui/ParallaxBackground";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";
import { PATIENT_CTAS, PATIENT_REVIEWS, STATE_OF_ART } from "@/data/site";
import ServiceCards from "./ServiceCards";

const headingClass =
  "font-display text-[22px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]";

export default function StateOfArt() {
  const [rowA, rowB, rowC] = STATE_OF_ART.rows;

  return (
    <section className="relative isolate overflow-hidden px-[10px] py-[50px] md:min-h-[900px] md:p-16">
      <ParallaxBackground
        src={STATE_OF_ART.background}
        className="bg-[#1d2125] opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[120px] bg-gradient-to-b from-transparent to-black/80"
      />

      <div className="mx-auto max-w-[1297px]">
        <div className="text-center">
          <SplitReveal text={STATE_OF_ART.title} className={headingClass} />
          <Reveal delay={0.15} y={20}>
            <p className="mx-auto mt-[15px] max-w-[830px] text-[16px] leading-[1.25] text-snow md:text-[22px] md:leading-[1.2]">
              {STATE_OF_ART.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-[31px] flex flex-col gap-5">
          <ServiceCards items={rowA} />
          <ServiceCards items={rowB} />
          <ServiceCards items={rowC} />
        </div>

        <SplitReveal
          text="what patients are saying"
          className={`${headingClass} mt-[60px] text-center md:mt-[79px]`}
        />

        <Carousel
          label="Patient reviews"
          className="mt-[16px]"
          emphasizeActive
          autoplayDelay={5000}
          slideClassName="basis-[86%] md:basis-[60%] lg:basis-[calc(100%-700px)]"
          slides={PATIENT_REVIEWS.map((review, i) => (
            <article
              key={i}
              className="glass-card flex h-[336px] flex-col justify-center gap-[72px] rounded-[22px] px-[10px] pb-3 pt-[37px] md:h-[360px] md:gap-[68px]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex gap-[2px] text-white" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, s) => (
                    <FaStar key={s} aria-hidden className="size-[13px]" />
                  ))}
                </span>
                <span className="font-display text-[12px] font-thin uppercase leading-none text-snow md:text-[14px]">
                  {review.location}
                </span>
              </div>
              <p className="px-1 text-center font-condensed text-[16px] leading-[1.5] text-white md:px-[45px] md:text-[22px] md:leading-[1.2]">
                {review.quote}
              </p>
            </article>
          ))}
        />

        <Reveal
          y={20}
          className="mt-[60px] flex flex-col items-center justify-center gap-5 md:mt-[85px] md:flex-row"
        >
          <GlassButton href={PATIENT_CTAS.primary.href} variant="dark">
            {PATIENT_CTAS.primary.label}
          </GlassButton>
          <GlassButton href={PATIENT_CTAS.secondary.href} variant="light">
            {PATIENT_CTAS.secondary.label}
          </GlassButton>
        </Reveal>
      </div>
    </section>
  );
}
