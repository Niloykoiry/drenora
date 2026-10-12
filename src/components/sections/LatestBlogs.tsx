import Image from "next/image";
import Link from "next/link";
import GlassButton from "@/components/ui/GlassButton";
import { Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { BLOGS_CTA, LATEST_BLOGS } from "@/data/site";

export default function LatestBlogs() {
  return (
    <section className="py-[50px] md:py-16">
      <SplitReveal
        text="Latest Blogs"
        className="text-center font-display text-[22px] font-thin uppercase leading-[1.25] text-snow md:text-[38px]"
      />

      <Stagger
        stagger={0.12}
        className="mt-4 grid gap-4 px-5 md:grid-cols-2 md:px-[10px] lg:grid-cols-3"
      >
        {LATEST_BLOGS.map((post) => (
          <StaggerItem key={post.href}>
            <article className="group flex h-full flex-col border border-[#2a2a2a] bg-ink-2 transition-[border-color,transform,box-shadow] duration-500 ease-luxe hover:-translate-y-1 hover:border-[#3d3d3d] hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
              <Link
                href={post.href}
                prefetch={false}
                tabIndex={-1}
                aria-hidden
                className="relative block h-[240px] overflow-hidden md:h-[350px]"
              >
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 458px"
                  className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.05]"
                />
              </Link>
              <div className="flex flex-1 flex-col border-t border-[#2a2a2a] px-6 pb-[26px] pt-6">
                <p className="text-[10px] uppercase leading-none tracking-[1.4px] text-[#8a857d]">
                  {post.date}
                </p>
                <h3 className="mt-[10px] line-clamp-2 font-display text-[19px] font-medium leading-[1.25] text-snow">
                  <Link
                    href={post.href}
                    prefetch={false}
                    className="underline decoration-1 underline-offset-[3px] transition-[text-decoration-color,color] duration-300 hover:text-cream hover:decoration-gold"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-[9px] line-clamp-1 text-[12px] leading-[1.7] text-[#a8a29a]">
                  {post.excerpt}
                </p>
                <Link
                  href={post.href}
                  prefetch={false}
                  className="mt-[27px] inline-flex w-fit items-center gap-1.5 font-display text-[10px] font-medium uppercase leading-none tracking-[1.2px] text-white"
                >
                  read more
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal y={20} className="mt-[50px] flex justify-center md:mt-[65px]">
        <GlassButton href={BLOGS_CTA.href} variant="dark" blur={false}>
          {BLOGS_CTA.label}
        </GlassButton>
      </Reveal>
    </section>
  );
}
