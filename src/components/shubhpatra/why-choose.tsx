import { whyChoose } from "@/data/site";
import { SectionHeading } from "./ornaments";
import { useReveal } from "./use-reveal";

export function WhyChoose() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="why" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose TheShubhmilan"
          title={
            <>
              Quietly crafted, <span className="font-display italic">carefully delivered</span>
            </>
          }
          lead="A small studio, a considered process and printing partners we have worked with for years."
        />
        <div ref={ref} className="mt-14 grid gap-px bg-gold/25 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item, index) => (
            <div
              key={item.title}
              data-visible={visible}
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              className="reveal bg-cream p-8"
            >
              <span className="text-gold font-display text-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-cocoa mt-3 text-xl leading-snug">{item.title}</h3>
              <p className="text-brown/75 mt-3 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
