import { useState } from "react";

import { brand } from "@/data/products";
import { whatsappLink } from "./enquiry";
import { BotanicalOrnament, GoldDivider, SectionHeading } from "./ornaments";
import { useReveal } from "./use-reveal";

const logoSrc = "/assets/logo/shubhpatra-logo.jpg";

export function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmitting(true);
  setSuccess(false);
  setError(null);

  const form = e.currentTarget;
  const formData = new FormData(form);

  formData.append("access_key", "b7db5af4-ecfc-44c7-b0cd-7b3ec994a4b2");
  formData.append("subject", "New TheShubhmilan Enquiry");
  formData.append("from_name", "TheShubhmilan Website");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      setSuccess(true);
      form.reset();
    } else {
      setError(result.message || "Something went wrong. Please try again.");
    }
  } catch {
    setError("Unable to send enquiry. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <section id="contact" className="bg-cream py-20 sm:py-28 border-t border-gold/20">
      <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
        <SectionHeading
          eyebrow="LET'S BEGIN"
          title="Your celebration deserves an invitation as beautiful as the occasion."
          lead="Share a few details with us and let's create something memorable together."
        />

        <div
          ref={ref}
          data-visible={visible}
          className="reveal mt-12 max-w-3xl mx-auto border border-gold/30 bg-ivory/30 p-8 sm:p-12 shadow-card"
        >
          {success ? (
            <div className="py-12 flex flex-col items-center">
              <span className="text-gold font-display text-4xl mb-4">✦</span>
              <h3 className="text-cocoa font-display text-2xl mb-4">Thank you for your enquiry</h3>
              <p className="text-brown/80 text-sm max-w-md leading-relaxed mb-8">
                We have received your details and will get in touch with a custom design proposal within one working day.
              </p>
              <BotanicalOrnament className="opacity-70 mb-8" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="bg-brown text-cream hover:bg-cocoa px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>
          ) : (
            <form
              name="enquiry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="grid gap-6 sm:grid-cols-2 text-left"
            >
              {/* Netlify Form Hidden Inputs */}
              <input type="hidden" name="form-name" value="enquiry" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              {/* 1. Full Name */}
              <div className="flex flex-col">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* 2. Email Address */}
              <div className="flex flex-col">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* 3. WhatsApp Number */}
              <div className="flex flex-col">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  required
                  placeholder="e.g. +91 99999 99999"
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* 4. Wedding Date */}
              <div className="flex flex-col">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  Wedding Date *
                </label>
                <input
                  type="date"
                  name="weddingDate"
                  required
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* 5. Celebration / Event Type */}
              <div className="flex flex-col">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  Celebration / Event Type *
                </label>
                <input
                  type="text"
                  name="eventType"
                  required
                  placeholder="e.g. Wedding, Roka, Grah Pravesh"
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* 7. Estimated Guest Count */}
              <div className="flex flex-col">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  Estimated Guest Count
                </label>
                <input
                  type="number"
                  name="guestCount"
                  placeholder="e.g. 250"
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* 6. Invitation Type */}
              <div className="flex flex-col sm:col-span-2">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  Invitation Type *
                </label>
                <select
                  name="invitationType"
                  required
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm focus:border-gold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" disabled selected>Select an option</option>
                  <option value="Digital Invitation">Digital Invitation</option>
                  <option value="Video Invitation">Video Invitation</option>
                  <option value="Physical Card">Physical Card</option>
                  <option value="Complete Wedding Suite">Complete Wedding Suite</option>
                  <option value="Not Sure Yet">Not Sure Yet</option>
                </select>
              </div>

              {/* 8. Message / Tell us about your celebration */}
              <div className="flex flex-col sm:col-span-2">
                <label className="text-taupe text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-2">
                  Message / Tell us about your celebration
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share any special motifs, wording preferences or custom ceremonies you'd like to include..."
                  className="bg-cream/10 border border-gold/30 px-4 py-3 text-cocoa font-body text-sm placeholder:text-taupe/30 focus:border-gold focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="sm:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-xs font-body">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <div className="sm:col-span-2 text-center mt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brown text-cream border border-brown hover:bg-cocoa hover:border-cocoa w-full sm:w-auto px-12 py-4 text-xs font-semibold tracking-[0.25em] uppercase transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "SUBMITTING..." : "BEGIN MY ENQUIRY"}
                </button>
                <p className="text-[0.65rem] text-taupe mt-4 tracking-wider uppercase">
                  Or directly chat via{" "}
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold hover:underline"
                  >
                    WhatsApp
                  </a>{" "}
                  · email us at{" "}
                  <a href={`mailto:${brand.email}`} className="text-gold hover:underline">
                    {brand.email}
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-green-night border-gold/25 border-t py-12">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <img
          src={logoSrc}
          alt={`${brand.name} crest`}
          width={64}
          height={64}
          className="border-gold/40 mx-auto h-14 w-14 rounded-full border object-cover"
        />
        <p className="text-ivory font-display mt-4 text-lg tracking-[0.4em]">{brand.name}</p>
        <p className="text-gold/80 mt-2 text-[0.6rem] tracking-[0.3em] uppercase">
          {brand.tagline}
        </p>
        <GoldDivider className="mt-6" />
        <p className="text-ivory/50 mt-6 text-[0.65rem] tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} {brand.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
