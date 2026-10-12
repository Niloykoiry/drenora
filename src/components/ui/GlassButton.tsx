import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type GlassButtonProps = {
  href: string;
  children: ReactNode;
  /** "dark" = the live site's glass_one, "light" = glass_two. */
  variant?: "dark" | "light";
  /** Turn off for buttons over the flat page colour (blur would be invisible but costly). */
  blur?: boolean;
  className?: string;
};

/**
 * Pill CTA. Matches the live sizing (24px × 72px padding, condensed caps)
 * and adds a light sweep + press feedback on hover.
 */
export default function GlassButton({
  href,
  children,
  variant = "dark",
  blur = true,
  className,
}: GlassButtonProps) {
  return (
    <Link
      href={href}
      // Target pages aren't built yet; viewport prefetching would just 404 on every scroll pass.
      prefetch={false}
      className={clsx(
        "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full text-center font-condensed font-medium uppercase text-white",
        "transition-[transform,background-color,border-color,box-shadow] duration-500 ease-luxe active:scale-[0.97]",
        "px-4 py-[15px] text-[16px] leading-none md:px-[72px] md:py-6",
        variant === "dark"
          ? "glass-dark hover:border-white/30 hover:bg-black/50 md:text-[22px]"
          : "glass-light hover:border-white/30 hover:bg-white/[0.14] md:text-[24px]",
        "hover:shadow-[0_10px_40px_-12px_rgba(176,141,87,0.45)]",
        !blur && "no-backdrop",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-[left,opacity] duration-700 ease-luxe group-hover:left-[120%] group-hover:opacity-100"
      />
      {children}
    </Link>
  );
}
