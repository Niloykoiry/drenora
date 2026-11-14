import { FAQS } from "@/data/site";
import {
  Reveal,
  SplitReveal,
  Stagger,
  StaggerItem,
} from "@/components/ui/Reveal";

export default function Faq() {
  return (
    <section className="bg-ink-2 py-[50px] md:py-16">
      <div className="mx-auto max-w-[1000px] px-5 md:px-8">
        <SplitReveal
          text="Frequently Asked Questions"
          className="text-center font-display text-[22px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
        />
        <Reveal delay={0.1} y={16}>
          <p className="mt-4 text-center text-[14px] leading-[1.6] text-[#a8a29a] md:text-[16px]">
            Quick answers for patients planning a consultation or visit.
          </p>
        </Reveal>

        <Stagger
          stagger={0.08}
          className="mx-auto mt-8 max-w-[850px] border-t border-white/10 md:mt-10"
        >
          {FAQS.map(({ question, answer }) => (
            <StaggerItem key={question}>
              <details className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-display text-[16px] leading-[1.4] text-snow marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:py-6 md:text-[19px]">
                  <span>{question}</span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[24px] font-light leading-none text-gold transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[740px] pb-5 pr-8 text-[14px] leading-[1.7] text-[#a8a29a] md:pb-6 md:text-[15px]">
                  {answer}
                </p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
