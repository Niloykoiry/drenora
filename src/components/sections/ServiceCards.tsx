import clsx from "clsx";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import type { Service } from "@/data/site";

/**
 * A row of joined glass panels. Two-up rows sit inside a narrower frame and
 * stay side by side on mobile; three-up rows stack on mobile.
 */
export default function ServiceCards({
  items,
  className,
  wide = false,
}: {
  items: Service[];
  className?: string;
  /** Use the full-width frame (three-up row on the live site). */
  wide?: boolean;
}) {
  const three = items.length === 3;

  return (
    <Stagger
      stagger={0.12}
      className={clsx(
        "mx-auto grid w-full",
        three ? "max-w-[1296px] md:grid-cols-3" : "grid-cols-2",
        !three && (wide ? "max-w-[1216px]" : "max-w-[1168px]"),
        className,
      )}
    >
      {items.map((item, i) => {
        const first = i === 0;
        const last = i === items.length - 1;
        return (
          <StaggerItem key={item.title} className="h-full">
            <Spotlight
              href={item.href}
              className={clsx(
                "glass-light h-full transition-[background-color,border-color] duration-500 ease-luxe hover:border-white/25 hover:bg-white/[0.12]",
                three
                  ? "pb-[27px] pt-[25px]"
                  : "pb-[25px] pt-5 md:pt-[29px]",
                three
                  ? clsx(
                      first && "rounded-t-[22px] md:rounded-r-none md:rounded-l-[22px] md:rounded-br-[2px]",
                      last && "rounded-b-[22px] md:rounded-l-none md:rounded-r-[22px]",
                    )
                  : clsx(
                      first && "rounded-l-[22px] rounded-br-[2px]",
                      last && "rounded-r-[22px]",
                    ),
              )}
            >
              <div
                className={clsx(
                  "flex justify-center px-2 text-center md:items-start",
                  !three && "min-h-[3.6em] items-center text-[16px] md:min-h-[2.4em] md:text-[22px]",
                  three && "text-[16px] md:text-[22px]",
                )}
              >
                <h3 className="font-display font-bold uppercase leading-[1.2] text-snow transition-[letter-spacing] duration-700 ease-luxe group-hover/spot:tracking-[0.04em]">
                  {item.titleLines
                    ? item.titleLines.map((line, n) => (
                        <span key={line} className="block">
                          {line}
                          {n < item.titleLines!.length - 1 ? " " : null}
                        </span>
                      ))
                    : item.title}
                </h3>
              </div>
              <p
                className={clsx(
                  "text-justify font-condensed text-white",
                  three
                    ? "mt-6 px-[17px] text-[16px] leading-[1.55] md:px-[33px] md:text-[18px] md:leading-[24.7px]"
                    : "mt-6 px-[11px] text-[16px] leading-[1.6] md:mt-[33px] md:px-[44px] md:text-[20px] md:leading-[26.4px]",
                )}
              >
                {item.description}
              </p>
            </Spotlight>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
