import GlassButton from "@/components/ui/GlassButton";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";
import { BLOGS_CTA, LATEST_BLOGS } from "@/data/site";
import BlogModalGrid from "./BlogModalGrid";

export default function LatestBlogs() {
  return (
    <section className="py-[50px] md:py-16">
      <SplitReveal
        text="Latest Blogs"
        className="text-center font-display text-[22px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
      />

      <BlogModalGrid posts={LATEST_BLOGS} />

      <Reveal y={20} className="mt-[50px] flex justify-center md:mt-[65px]">
        <GlassButton href={BLOGS_CTA.href} variant="dark" blur={false}>
          {BLOGS_CTA.label}
        </GlassButton>
      </Reveal>
    </section>
  );
}
