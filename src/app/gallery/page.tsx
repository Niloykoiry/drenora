import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CLIENTS } from "@/data/site";

export const metadata: Metadata = {
  title: "Surgery Case Gallery | Dr. Enora Nilomi",
  description:
    "Browse patient case stories and images from Dr. Enora Nilomi's surgery gallery.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-[1297px] px-5 pb-16 pt-[130px] md:px-10 md:pb-24 md:pt-[170px]">
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[1.2px] text-[#a8a29a] transition-colors hover:text-gold"
        >
          Home
        </Link>
        <p className="mt-8 text-[10px] uppercase leading-[1.4] tracking-[1.4px] text-gold">
          Patient results
        </p>
        <h1 className="mt-3 font-display text-[28px] font-thin uppercase leading-[1.2] text-snow md:text-[42px]">
          All Surgery Cases
        </h1>
        <p className="mt-4 max-w-[700px] text-[14px] leading-[1.7] text-[#a8a29a] md:text-[16px]">
          Browse patient case stories and images from the gallery. Select a
          result on the homepage to view its details, or explore the cases
          below.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {CLIENTS.map((client) => (
            <article
              key={client.name}
              className="overflow-hidden border border-white/10 bg-ink-2"
            >
              <div className="grid grid-cols-2 gap-1">
                {client.images.map((image, index) => (
                  <figure
                    key={image}
                    className={`relative overflow-hidden bg-ink ${
                      index === 0
                        ? "col-span-2 aspect-[16/10]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${client.name} case image ${index + 1}`}
                      fill
                      sizes="(max-width: 767px) 100vw, 600px"
                      className="object-cover transition-transform duration-700 ease-luxe hover:scale-[1.03]"
                    />
                  </figure>
                ))}
              </div>
              <div className="p-5 md:p-7">
                <p className="text-[10px] uppercase leading-[1.4] tracking-[1.4px] text-gold">
                  {client.role}
                </p>
                <h2 className="mt-2 font-display text-[22px] font-medium leading-[1.25] text-snow md:text-[26px]">
                  {client.name}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#a8a29a]">
                  {client.brief}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
