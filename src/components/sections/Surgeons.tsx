import Carousel from "@/components/ui/Carousel";
import GlassButton from "@/components/ui/GlassButton";
import ParallaxBackground from "@/components/ui/ParallaxBackground";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";
import { SURGEONS } from "@/data/site";
import ServiceCards from "./ServiceCards";

const headingClass =
  "mx-auto max-w-[440px] font-display text-[22px] font-thin uppercase leading-[1.25] text-snow md:leading-none md:text-[38px]";

export default function Surgeons() {
  return (
    <section className="relative isolate overflow-hidden px-[10px] py-[50px] md:min-h-[900px] md:p-16">
      <ParallaxBackground src={SURGEONS.background} className="bg-black opacity-30" />

      <div className="mx-auto max-w-[1297px]">
        <div className="text-center">
          <SplitReveal text={SURGEONS.title} className={headingClass} />
          <Reveal delay={0.15} y={20}>
            <p className="mx-auto mt-4 max-w-[830px] text-[16px] leading-[1.25] text-snow md:text-[22px] md:leading-[1.2]">
              {SURGEONS.subtitle}
            </p>
          </Reveal>
        </div>

        <ServiceCards items={SURGEONS.programs} wide className="mt-[30px]" />

        <SplitReveal
          text={SURGEONS.reviewsTitle}
          className={`${headingClass} mt-[60px] text-center md:mt-[79px]`}
        />

        <Carousel
          label="Surgeon testimonials"
          className="mt-4 md:px-[10px]"
          autoplayDelay={3500}
          align="start"
          slideClassName="basis-full md:basis-1/2"
          slides={SURGEONS.reviews.map((review, i) => (
            <figure
              key={i}
              className="glass-dark flex h-full flex-col items-center justify-center gap-[23px] rounded-[22px] px-[25px] py-[25px] text-center transition-colors duration-500 hover:border-white/25 md:px-[55px]"
            >
              <blockquote className="font-condensed text-[16px] leading-[1.6] text-white md:text-[20px] md:leading-[25px]">
                {review.quote}
              </blockquote>
              <figcaption className="font-condensed text-[16px] leading-[1.2] text-white md:text-[20px]">
                {review.role}
              </figcaption>
            </figure>
          ))}
        />

        <Reveal
          y={20}
          className="mt-[60px] flex flex-col items-center justify-center gap-5 md:mt-[85px] md:flex-row"
        >
          <GlassButton href={SURGEONS.ctas.primary.href} variant="dark">
            {SURGEONS.ctas.primary.label}
          </GlassButton>
          <GlassButton href={SURGEONS.ctas.secondary.href} variant="light">
            {SURGEONS.ctas.secondary.label}
          </GlassButton>
        </Reveal>
      </div>
    </section>
  );
}
