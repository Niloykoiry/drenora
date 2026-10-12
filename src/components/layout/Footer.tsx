import { Reveal } from "@/components/ui/Reveal";
import SocialLinks from "@/components/ui/SocialLinks";
import { FOOTER } from "@/data/site";

export default function Footer() {
  return (
    <footer
      className="relative flex min-h-[540px] flex-col items-center bg-ink bg-no-repeat px-[10px] pb-[100px] pt-[155px] text-center md:pb-[60px]"
      style={{
        backgroundImage: `url(${FOOTER.background})`,
        backgroundSize: "80% auto",
        backgroundPosition: "50% 10%",
      }}
    >
      <Reveal y={20}>
        <p className="text-[33px] font-bold uppercase leading-none tracking-[1.5px] text-[rgb(245_246_247/0.64)]">
          {FOOTER.name}
        </p>
      </Reveal>
      <Reveal delay={0.1} y={16}>
        <p className="mt-[17px] text-[14px] leading-[1.65] text-[rgb(245_246_247/0.64)]">
          {FOOTER.tagline[0]}
          <br />
          {FOOTER.tagline[1]}
        </p>
      </Reveal>
      <Reveal delay={0.2} y={16}>
        <SocialLinks className="mt-[21px] justify-center" />
      </Reveal>
      <p className="mt-10 text-[14px] leading-[1.65] text-[rgb(245_246_247/0.64)]">
        {FOOTER.copyright}
      </p>
    </footer>
  );
}
