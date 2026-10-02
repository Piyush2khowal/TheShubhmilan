import { useState } from "react";

import { faqs } from "@/data/site";
import { SectionHeading } from "./ornaments";
import { useReveal } from "./use-reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          lead="Everything you need to know about our digital invitations and services."
        />
        <div
          ref={ref}
          data-visible={visible}
          className="reveal border-gold/30 mt-12 border-t"
        >
          {faqs.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-gold/30 border-b">
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpen(active ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left cursor-pointer group"
                >
                  <span className="text-cocoa font-display text-base tracking-wide transition-colors group-hover:text-gold sm:text-lg">
                    {item.q}
                  </span>
                  <span className="text-gold flex h-6 w-6 shrink-0 items-center justify-center font-display text-2xl font-light select-none">
                    {active ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-brown/80 pb-6 text-sm leading-relaxed sm:text-base max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
