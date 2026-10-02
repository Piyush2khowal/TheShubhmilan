import { testimonials } from "@/data/site";
import { SectionHeading } from "./ornaments";
import { useReveal } from "./use-reveal";

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="bg-beige/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Kind words from <span className="font-display italic">our families</span>
            </>
          }
        />
        <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              data-visible={visible}
              style={{ transitionDelay: `${index * 110}ms` }}
              className="reveal border-gold/30 bg-card border p-8"
            >
              <span className="text-gold font-display text-4xl leading-none">“</span>
              <blockquote className="text-brown/85 mt-3 text-sm leading-relaxed">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-cocoa font-display text-lg">{item.name}</p>
                <p className="text-taupe mt-1 text-[0.6rem] tracking-[0.28em] uppercase">
                  {item.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
