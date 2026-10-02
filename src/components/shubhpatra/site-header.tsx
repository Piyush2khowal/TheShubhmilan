import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { brand } from "@/data/products";
import { whatsappLink } from "./enquiry";

const logoSrc = "/assets/logo/shubhpatra-logo.jpg";

const links = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/digital-invite", label: "Digital Invitations", route: true },
  { href: "/stationery", label: "Stationery", route: true },
  { href: "/#video", label: "Video Invitations" },
  { href: "/physical-cards", label: "Physical Cards", route: true },
  { href: "/#contact", label: "Contact" },
  { href: "/admin", label: "Admin", route: true },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-cream/95 shadow-card backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="gold-rule absolute inset-x-0 bottom-0 h-px opacity-70" />
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img
            src={logoSrc}
            alt={`${brand.name} crest`}
            width={48}
            height={48}
            className="border-gold/50 h-11 w-11 shrink-0 rounded-full border object-cover"
          />
          <span className="min-w-0">
            <span className="text-brown block truncate font-display text-lg tracking-[0.35em]">
              {brand.name}
            </span>
            <span className="text-taupe hidden text-[0.6rem] tracking-[0.3em] uppercase sm:block">
              Wedding Invitations
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) =>
            "route" in link && link.route ? (
              <Link
                key={link.href}
                to={link.href}
                search={{ sub: undefined }}
                className="text-brown/80 hover:text-gold text-[0.66rem] tracking-[0.2em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-brown/80 hover:text-gold text-[0.66rem] tracking-[0.2em] uppercase transition-colors"
              >
                {link.label}
              </a>
            ),
          )}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="border-brown text-brown hover:bg-brown hover:text-cream border px-5 py-2 text-[0.66rem] tracking-[0.2em] uppercase transition-colors"
          >
            Enquire
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="border-gold/50 text-brown grid h-10 w-10 shrink-0 place-items-center border lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="bg-cream border-gold/25 border-t lg:hidden">
          <nav className="flex flex-col px-5 py-4">
            {links.map((link) =>
              "route" in link && link.route ? (
                <Link
                  key={link.href}
                  to={link.href}
                  search={{ sub: undefined }}
                  onClick={() => setOpen(false)}
                  className="text-brown/85 hover:text-gold border-gold/15 border-b py-3 text-sm tracking-[0.2em] uppercase last:border-0"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-brown/85 hover:text-gold border-gold/15 border-b py-3 text-sm tracking-[0.2em] uppercase last:border-0"
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="bg-brown text-cream mt-4 py-3 text-center text-xs tracking-[0.25em] uppercase"
            >
              WhatsApp Enquiry
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
