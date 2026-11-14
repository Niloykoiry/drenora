"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { BlogPost } from "@/data/site";

export default function BlogModalGrid({ posts }: { posts: BlogPost[] }) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedPost && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [selectedPost]);

  return (
    <>
      <Stagger
        stagger={0.12}
        className="mt-4 grid gap-4 px-5 md:grid-cols-2 md:px-[10px] lg:grid-cols-3"
      >
        {posts.map((post) => (
          <StaggerItem key={post.href}>
            <article className="group flex h-full flex-col border border-[#2a2a2a] bg-ink-2 transition-[border-color,transform,box-shadow] duration-500 ease-luxe hover:-translate-y-1 hover:border-[#3d3d3d] hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Read ${post.title}`}
                onClick={() => setSelectedPost(post)}
                className="relative block h-[380px] w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold md:h-[520px]"
              >
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 458px"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.05]"
                />
              </button>
              <div className="flex flex-1 flex-col border-t border-[#2a2a2a] px-6 pb-[26px] pt-6">
                <p className="text-[10px] uppercase leading-none tracking-[1.4px] text-[#8a857d]">
                  {post.date}
                </p>
                <h3 className="mt-[10px] line-clamp-2 font-display text-[19px] font-medium leading-[1.25] text-snow">
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setSelectedPost(post)}
                    className="text-left underline decoration-1 underline-offset-[3px] transition-[text-decoration-color,color] duration-300 hover:text-cream hover:decoration-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    {post.title}
                  </button>
                </h3>
                <p className="mt-[9px] line-clamp-1 text-[12px] leading-[1.7] text-[#a8a29a]">
                  {post.excerpt}
                </p>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setSelectedPost(post)}
                  className="mt-[27px] inline-flex w-fit items-center gap-1.5 font-display text-[10px] font-medium uppercase leading-none tracking-[1.2px] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  read more
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </button>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <dialog
        ref={dialogRef}
        aria-labelledby="blog-dialog-title"
        aria-describedby="blog-dialog-excerpt"
        data-lenis-prevent
        onClose={() => setSelectedPost(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialogRef.current?.close();
          }
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto border-0 bg-black/80 p-4 text-snow md:p-8"
      >
        {selectedPost && (
          <article className="relative mx-auto my-2 w-full max-w-[860px] overflow-hidden border border-white/10 bg-ink-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:my-8">
            <div className="relative h-[220px] md:h-[360px]">
              <Image
                src={selectedPost.image}
                alt={selectedPost.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 860px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-2/80 via-transparent to-black/20"
              />
              <button
                type="button"
                aria-label="Close article details"
                onClick={() => dialogRef.current?.close()}
                className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/20 bg-black/60 text-[26px] leading-none text-white transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                <span aria-hidden>×</span>
              </button>
            </div>

            <div className="px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
              <p className="text-[10px] uppercase leading-none tracking-[1.4px] text-[#8a857d]">
                {selectedPost.date}
              </p>
              <h2
                id="blog-dialog-title"
                className="mt-3 font-display text-[24px] font-medium leading-[1.25] text-snow md:text-[34px]"
              >
                {selectedPost.title}
              </h2>
              <p
                id="blog-dialog-excerpt"
                className="mt-4 text-[14px] leading-[1.7] text-[#c5beb4] md:text-[16px]"
              >
                {selectedPost.excerpt.replace(/…$/, ".")}
              </p>

              <div className="mt-7 space-y-6">
                {selectedPost.details.map((section) => (
                  <section key={section.heading}>
                    <h3 className="font-display text-[17px] font-medium text-cream md:text-[19px]">
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-2 text-[14px] leading-[1.75] text-[#a8a29a] md:text-[15px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <Link
                  href={selectedPost.href}
                  prefetch={false}
                  className="inline-flex items-center gap-2 font-display text-[11px] font-medium uppercase tracking-[1.2px] text-white transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                >
                  Read full article
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}
