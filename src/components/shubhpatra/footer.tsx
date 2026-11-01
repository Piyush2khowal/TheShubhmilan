import { Link } from "@tanstack/react-router";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";

import { brand } from "@/data/products";
import { whatsappLink } from "./enquiry";
import { GoldDivider } from "./ornaments";

const logoSrc = "/assets/logo/theshubhmilan_logo.png";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#201815] text-[#e8dfd5] border-t border-gold/30 overflow-hidden">
      {/* Subtle background ornament glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-gold) 0%, transparent 60%)",
        }}
      />

      {/* Top Banner Ribbon */}
      <div className="relative border-b border-gold/20 py-4 px-5 text-center">
        <p className="font-display text-[0.68rem] tracking-[0.45em] uppercase text-gold/90 font-medium">
          Shubh · Aarambh · Sanskar
        </p>
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-12 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Identity (Col 1: span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <img
                src={logoSrc}
                alt={`${brand.name} crest`}
                width={60}
                height={60}
                className="h-14 w-14 rounded-full border border-gold/60 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <span className="block font-display text-xl tracking-[0.3em] uppercase text-cream font-medium">
                  {brand.name}
                </span>
                <span className="block font-script text-gold/90 text-sm tracking-wide">
                  Wedding Invites &amp; Stationery
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm font-body leading-relaxed text-[#c7b9ab] max-w-sm">
              The Shubhmilan is a premier Indian wedding stationery studio crafting heirloom
              printed invitation boxes, animated digital suites, and exquisite day-of event
              stationery. Rooted in sacred traditions and designed with timeless elegance.
            </p>

            {/* Social Media Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold/80 hover:border-gold hover:text-cream hover:bg-gold/20 transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold/80 hover:border-gold hover:text-cream hover:bg-gold/20 transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.948 2.796.948 3.182 0 5.768-2.586 5.769-5.767.001-3.182-2.585-5.734-5.769-5.734zm7.982 5.765c-.002 4.398-3.58 7.973-7.981 7.973-1.393 0-2.714-.366-3.874-1.008l-4.558 1.196 1.218-4.444c-.722-1.223-1.109-2.63-1.11-4.084.002-4.398 3.58-7.973 7.983-7.973 4.402.001 7.982 3.576 7.982 7.973zm2.018 0c0-5.514-4.486-10-10-10s-10 4.486-10 10c0 1.761.459 3.418 1.264 4.864l-1.346 4.914 5.039-1.321c1.396.764 2.99 1.203 4.683 1.203 5.514 0 10-4.486 10-10z" />
                </svg>
              </a>

              <a
                href={`mailto:${brand.email}`}
                aria-label="Send an email enquiry"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold/80 hover:border-gold hover:text-cream hover:bg-gold/20 transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>

              <a
                href={`tel:${brand.phone}`}
                aria-label="Call our studio"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold/80 hover:border-gold hover:text-cream hover:bg-gold/20 transition-all"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 2: span 2) */}
          <div className="lg:col-span-2 text-left">
            <h3 className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-gold">
              Quick Links
            </h3>
            <div className="gold-rule mt-3 mb-4 h-px w-8" />
            <ul className="space-y-2.5 text-sm font-body">
              <li>
                <Link
                  to="/"
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/#about"
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/#collections"
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  Our Collections
                </a>
              </li>
              <li>
                <a
                  href="/#video"
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  Video Invitations
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  FAQ &amp; Delivery
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  Custom Request
                </a>
              </li>
            </ul>
          </div>

          {/* Categories & Collections (Col 3: span 3) */}
          <div className="lg:col-span-3 text-left">
            <h3 className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-gold">
              Collections
            </h3>
            <div className="gold-rule mt-3 mb-4 h-px w-8" />
            <ul className="space-y-2.5 text-sm font-body">
              <li>
                <Link
                  to="/physical-cards"
                  search={{ sub: undefined }}
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  <span className="font-medium text-cream">Physical Cards</span>
                  <span className="block text-xs text-[#a8998a]">
                    Velvet Boxes, Jaali &amp; Scrolls
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/digital-invite"
                  search={{ sub: undefined }}
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  <span className="font-medium text-cream">Digital Invitations</span>
                  <span className="block text-xs text-[#a8998a]">
                    PDF Suites, Save the Dates, Pooja
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/stationery"
                  search={{ sub: undefined }}
                  className="text-[#c7b9ab] hover:text-gold transition-colors block py-0.5"
                >
                  <span className="font-medium text-cream">Stationery &amp; Signages</span>
                  <span className="block text-xs text-[#a8998a]">
                    Welcome Boards, Menus, Envelopes
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information & WhatsApp CTA (Col 4: span 3) */}
          <div className="lg:col-span-3 text-left">
            <h3 className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-gold">
              Contact &amp; Studio
            </h3>
            <div className="gold-rule mt-3 mb-4 h-px w-8" />

            <div className="space-y-3 text-sm font-body text-[#c7b9ab]">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-1" />
                <span>Delhi, India · Pan-India &amp; Worldwide Dispatch</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold mt-1" />
                <a
                  href={`tel:${brand.phone}`}
                  className="hover:text-gold transition-colors font-medium text-cream"
                >
                  {brand.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold mt-1" />
                <a
                  href={`mailto:${brand.email}`}
                  className="hover:text-gold transition-colors break-all"
                >
                  {brand.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold mt-1" />
                <span>{brand.hours}</span>
              </div>
            </div>

            {/* Prominent WhatsApp Enquiry Button */}
            <div className="mt-5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-center gap-2.5 rounded-none bg-gradient-to-r from-gold to-gold-bright px-5 py-3.5 font-display text-xs font-semibold tracking-[0.2em] uppercase text-[#1d1410] shadow-md transition-all duration-300 hover:brightness-110 hover:shadow-gold cursor-pointer"
              >
                <svg
                  className="h-4 w-4 text-[#1d1410] transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.948 2.796.948 3.182 0 5.768-2.586 5.769-5.767.001-3.182-2.585-5.734-5.769-5.734zm7.982 5.765c-.002 4.398-3.58 7.973-7.981 7.973-1.393 0-2.714-.366-3.874-1.008l-4.558 1.196 1.218-4.444c-.722-1.223-1.109-2.63-1.11-4.084.002-4.398 3.58-7.973 7.983-7.973 4.402.001 7.982 3.576 7.982 7.973zm2.018 0c0-5.514-4.486-10-10-10s-10 4.486-10 10c0 1.761.459 3.418 1.264 4.864l-1.346 4.914 5.039-1.321c1.396.764 2.99 1.203 4.683 1.203 5.514 0 10-4.486 10-10z" />
                </svg>
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 mb-8">
          <GoldDivider className="opacity-40" />
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row text-xs font-body text-[#9b8b7d]">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved. Crafted for sacred
            celebrations across India and worldwide.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-display text-[0.68rem] tracking-[0.2em] uppercase text-gold hover:text-gold-bright transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
