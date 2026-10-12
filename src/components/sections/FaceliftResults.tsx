import { Fragment } from "react";
import GlassButton from "@/components/ui/GlassButton";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";
import { RESULTS } from "@/data/site";
import ClientsShowcase from "./ClientsShowcase";

export default function FaceliftResults() {
  return (
    <section className="overflow-hidden py-[50px] md:py-[70px]">
      <div className="flex flex-col items-center px-[10px] text-center">
        <SplitReveal
          text={RESULTS.title}
          className="font-display text-[22px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
        />
        <Reveal delay={0.2} y={20}>
          <p className="mt-[15px] text-[16px] uppercase leading-[1.2] tracking-[2px] text-snow md:text-[22px]">
            {RESULTS.cities.map((city, i) => (
              <Fragment key={city}>
                {i > 0 && (
                  <span aria-hidden className="mx-3 text-gold">
                    |
                  </span>
                )}
                {city}
              </Fragment>
            ))}
          </p>
        </Reveal>
        <Reveal delay={0.3} y={20} className="mt-8 flex flex-wrap justify-center gap-[14px] md:mt-[41px] md:gap-5">
          <GlassButton href={RESULTS.ctaCelebrities.href} variant="dark" blur={false}>
            {RESULTS.ctaCelebrities.label}
          </GlassButton>
          <GlassButton href={RESULTS.ctaGallery.href} variant="light" blur={false}>
            {RESULTS.ctaGallery.label}
          </GlassButton>
        </Reveal>
      </div>

      <div className="mt-6 md:mt-[31px]">
        <ClientsShowcase />
      </div>
    </section>
  );
}
