import { ChevronDown } from "lucide-react";

import heroImage from "@/assets/Templates/hero-invitation.jpg";
import { brand } from "@/data/products";
import { whatsappLink } from "./enquiry";
import { ArchFrame, BotanicalOrnament, GoldDivider } from "./ornaments";

const logoSrc = "/assets/logo/shubhpatra-logo.jpg";

export function Hero() {
  return (
    <section id="top" className="bg-cream relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, color-mix(in oklab, var(--color-beige) 90%, transparent), transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <img
          src={logoSrc}
          alt={`${brand.name} logo`}
          width={96}
          height={96}
          className="border-gold/40 mx-auto h-16 w-16 rounded-full border object-cover sm:h-20 sm:w-20"
        />
        <p className="text-taupe mt-6 text-[0.65rem] tracking-[0.5em] uppercase">
          Shubh · Aarambh · Sanskar
        </p>

        <ArchFrame className="mx-auto mt-8 w-[14rem] sm:w-[18rem]">
          <img
            src={heroImage}
            alt="Cream and beige Indian wedding invitation with gold foil arch"
            width={1024}
            height={1280}
            className="h-[18rem] w-full object-cover sm:h-[23rem]"
          />
        </ArchFrame>

        <h1 className="text-cocoa mt-12 text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
          Invitations worthy of
          <span className="text-brown block font-display italic">a sacred beginning</span>
        </h1>

        <GoldDivider className="mt-7" />

        <p className="text-brown/75 mx-auto mt-7 max-w-xl text-sm leading-relaxed sm:text-base">
          {brand.name} crafts digital invitations, invitation films, day-of stationery and printed
          cards — hand-drawn arches and botanicals in warm beige, cream and brown.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#digital"
            className="bg-cocoa text-cream hover:bg-brown w-full px-8 py-3.5 text-[0.72rem] tracking-[0.3em] uppercase transition-colors sm:w-auto"
          >
            Explore Invitations
          </a>
          <a
            href="#collections"
            className="border-cocoa/40 text-cocoa hover:bg-beige w-full border px-8 py-3.5 text-[0.72rem] tracking-[0.3em] uppercase transition-colors sm:w-auto"
          >
            Explore Collections
          </a>
        </div>

        <BotanicalOrnament className="mx-auto mt-12 opacity-70" />

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="text-taupe hover:text-brown mt-6 inline-flex items-center gap-2 text-[0.62rem] tracking-[0.3em] uppercase"
        >
          Enquire on WhatsApp
        </a>
        <a
          href="#collections"
          className="text-taupe/70 hover:text-brown mt-6 flex flex-col items-center gap-1 text-[0.6rem] tracking-[0.3em] uppercase"
        >
          Scroll
          <ChevronDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
