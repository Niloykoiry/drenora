import Image from "next/image";
import PauseOffscreen from "@/components/ui/PauseOffscreen";
import { Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { FOUNDER_OF, RECOGNIZED_BY } from "@/data/site";

const headingClass =
  "font-display text-[18px] font-thin uppercase leading-[1.3] text-snow md:text-[32px]";

export default function Recognition() {
  return (
    <section className="px-[10px] md:px-16">
      <div className="mx-auto grid max-w-[1040px] gap-5 py-[50px] md:grid-cols-2 md:py-[70px]">
        <div className="flex min-w-0 flex-col items-center gap-5 p-[10px]">
          <SplitReveal text="Recognized By" className={headingClass} />
          <Reveal className="w-full" delay={0.15}>
            <PauseOffscreen>
              <LogoMarquee />
            </PauseOffscreen>
          </Reveal>
        </div>

        <div className="order-first flex min-w-0 flex-col items-center gap-5 p-[10px] md:order-none">
          <SplitReveal text="Founder of" className={headingClass} />
          <Stagger className="grid grid-cols-3 gap-5" stagger={0.12}>
            {FOUNDER_OF.map((logo) => (
              <StaggerItem key={logo.src}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={150}
                  sizes="150px"
                  className="size-[96px] opacity-90 transition-[opacity,transform] duration-500 ease-luxe hover:scale-105 hover:opacity-100 md:size-[150px]"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/** Continuous, seamless logo strip — replaces the stepping Swiper of the live site. */
function LogoMarquee() {
  const loop = [...RECOGNIZED_BY, ...RECOGNIZED_BY];
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
      <ul
        className="flex w-max animate-marquee [--marquee-duration:38s] group-hover:[animation-play-state:paused]"
        aria-label="Recognitions"
      >
        {loop.map((logo, i) => (
          <li
            key={`${logo.src}-${i}`}
            aria-hidden={i >= RECOGNIZED_BY.length}
            className="shrink-0 pr-6 md:pr-10"
          >
            <Image
              src={logo.src}
              alt={i >= RECOGNIZED_BY.length ? "" : logo.alt}
              width={137}
              height={137}
              sizes="137px"
              className="size-[96px] opacity-85 transition-opacity duration-500 hover:opacity-100 md:size-[137px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
