import clsx from "clsx";
import type { IconType } from "react-icons";
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { SOCIALS, type SocialKey } from "@/data/site";

const ICONS: Record<SocialKey, IconType> = {
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

/** Row of 40px outlined circles, as used in the menu and the footer. */
export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={clsx("flex items-center gap-[7px]", className)}>
      {SOCIALS.map(({ key, label, href }) => {
        const Icon = ICONS[key];
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-10 place-items-center rounded-full border-2 border-[rgb(245_246_247/0.16)] text-white transition-[transform,border-color,background-color,color] duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/15 hover:text-cream"
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
