import { FaAngleRight, FaPhone } from "react-icons/fa6";
import { Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import { CONTACT_SECTION, LOCATIONS } from "@/data/site";
import ContactForms from "./ContactForms";

export default function Contact() {
  return (
    <section id="reach-out" className="bg-ink px-5 pb-[94px] pt-[60px] md:px-16 md:pt-[84px]">
      <div className="mx-auto max-w-[1297px]">
        <div className="max-w-[620px] md:px-5">
          <Reveal y={12}>
            <p className="text-[10px] uppercase leading-[1.4] tracking-[1.4px] text-white">
              {CONTACT_SECTION.eyebrow}
            </p>
          </Reveal>
          <SplitReveal
            text={CONTACT_SECTION.title}
            className="mt-4 font-display text-[22px] font-thin uppercase leading-[1.3] tracking-[0.88px] text-white md:text-[32px] md:leading-[1.25] md:tracking-normal"
          />
          <Reveal delay={0.15} y={16}>
            <p className="mt-4 text-[14px] leading-[1.65] text-white">
              {CONTACT_SECTION.intro[0]}
              <br />
              {CONTACT_SECTION.intro[1]}
            </p>
          </Reveal>
        </div>

        <div className="mt-[50px] grid gap-[50px] md:px-[30px] lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-[100px]">
          <Reveal y={24} amount={0.05}>
            <ContactForms />
          </Reveal>

          <Stagger stagger={0.12} className="flex flex-col gap-[11px]">
            {LOCATIONS.map((loc) => (
              <StaggerItem key={loc.city}>
                <Spotlight className="glass-light no-backdrop flex min-h-[200px] flex-col justify-between rounded-[8px] !border-0 px-5 py-[22px] md:px-[26px] lg:min-h-[332px]">
                  <div>
                    <p className="text-[10px] uppercase leading-[1.4] tracking-[1.4px] text-white">
                      {loc.country}
                    </p>
                    <h3 className="mt-[6px] font-display text-[24px] font-thin uppercase leading-[1.2] text-white">
                      {loc.city}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-[10px] block h-px w-8 bg-white/12 transition-[width,background-color] duration-700 ease-luxe group-hover/spot:w-16 group-hover/spot:bg-gold"
                    />
                    <address className="mt-[10px] text-[14px] not-italic leading-[1.65] text-white">
                      {loc.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>

                  {/* Plain number on desktop, tappable pill on mobile (as on the live site). */}
                  <a
                    href={loc.phoneHref}
                    className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/42 bg-teal/42 py-[9px] pl-[13px] pr-4 text-[14px] font-semibold leading-[1.3] text-white md:border-0 md:bg-transparent md:p-0 md:transition-colors md:hover:text-gold"
                  >
                    <FaPhone aria-hidden className="size-3 md:hidden" />
                    {loc.phoneDisplay}
                    <FaAngleRight aria-hidden className="size-3 md:hidden" />
                  </a>
                </Spotlight>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
