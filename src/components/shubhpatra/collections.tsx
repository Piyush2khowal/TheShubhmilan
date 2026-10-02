import { categories } from "@/data/products";
import { SectionHeading } from "./ornaments";
import { useReveal } from "./use-reveal";

export function Collections() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="collections" className="bg-ivory relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our Collections"
          title={
            <>
              Four ways to say <span className="font-display italic">shubh aarambh</span>
            </>
          }
          lead="Every collection shares one language — arches, jaali screens and inked botanicals — interpreted for screen, film, table and paper."
        />

        <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.href}
              data-visible={visible}
              style={{ transitionDelay: `${index * 110}ms` }}
              className="reveal group border-gold/40 bg-green-deep relative block overflow-hidden border"
            >
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-64 w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 sm:h-72"
                />
                <div className="from-green-night via-green-night/40 absolute inset-0 bg-gradient-to-t to-transparent" />
                <span className="border-gold/70 absolute inset-3 border" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                <p className="text-gold text-[0.58rem] tracking-[0.35em] uppercase">
                  {category.count}
                </p>
                <h3 className="text-ivory mt-2 text-2xl leading-tight">{category.name}</h3>
                <div className="gold-rule mx-auto mt-3 h-px w-12" />
                <p className="text-ivory/70 mt-3 text-xs leading-relaxed">{category.blurb}</p>
                <span className="text-gold mt-4 inline-block text-[0.6rem] tracking-[0.3em] uppercase">
                  Explore →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
