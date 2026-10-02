import { BotanicalOrnament, GoldDivider } from "./ornaments";
import { useReveal } from "./use-reveal";

const items = [
  {
    num: "01",
    title: "ROOTED IN TRADITION",
    text: "Indian celebrations, beautifully expressed through timeless design.",
  },
  {
    num: "02",
    title: "MADE FOR YOUR STORY",
    text: "Every invitation is shaped around your celebration, style and special moments.",
  },
  {
    num: "03",
    title: "BEAUTIFUL TO SHARE",
    text: "A refined experience made to delight your family, friends and every guest.",
  },
];

export function Highlights() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="brand-story" className="bg-cream/40 py-16 sm:py-20 border-t border-gold/20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-taupe text-[0.65rem] tracking-[0.4em] uppercase block mb-3 font-body">
            WHY TheShubhmilan
          </span>
          <h2 className="text-cocoa font-display text-3xl sm:text-4xl">
            Made for Moments That Matter
          </h2>
          <p className="text-brown/75 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
            From the first invitation to the final celebration, every detail is thoughtfully designed around your story.
          </p>
          <GoldDivider className="mt-6" />
        </div>

        <div
          ref={ref}
          data-visible={visible}
          className="reveal grid gap-8 md:grid-cols-3 mt-10"
        >
          {items.map((item) => (
            <div
              key={item.num}
              className="border border-gold/20 bg-ivory/20 p-8 flex flex-col items-center text-center relative transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 group"
            >
              {/* Subtle top index marker */}
              <span className="text-gold font-display text-sm tracking-widest block mb-2 select-none">
                {item.num}
              </span>
              
              {/* Title with small uppercase letter-spacing */}
              <h3 className="text-cocoa font-body text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                {item.title}
              </h3>
              
              {/* Thin elegant internal border highlight */}
              <span className="w-8 h-px bg-gold/30 mb-4 group-hover:w-16 transition-all duration-500" />
              
              <p className="text-brown/80 text-sm leading-relaxed max-w-[240px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Small centered Indian-inspired line art detail */}
        <div className="flex justify-center mt-12 opacity-50">
          <BotanicalOrnament />
        </div>
      </div>
    </section>
  );
}
