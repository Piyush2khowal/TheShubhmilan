import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Slim gold rule with a centre lozenge — used between sections. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="gold-rule h-px w-16 sm:w-28" />
      <span className="text-gold text-xs tracking-[0.4em]">✦</span>
      <span className="gold-rule h-px w-16 sm:w-28" />
    </div>
  );
}

/** Botanical line ornament inspired by the SHUBHPATRA crest. */
export function BotanicalOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 40"
      fill="none"
      aria-hidden="true"
      className={cn("text-gold h-8 w-56", className)}
    >
      <path
        d="M120 34c-14-10-30-14-46-14-10 0-18-4-22-11 8-1 15 2 19 8 4-8 12-12 21-12 7 0 13 3 17 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M120 34c14-10 30-14 46-14 10 0 18-4 22-11-8-1-15 2-19 8-4-8-12-12-21-12-7 0-13 3-17 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="120" cy="35" r="2" fill="currentColor" />
      <path d="M60 30c6-6 14-8 22-6M158 24c8-2 16 0 22 6" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

/** Section heading: eyebrow, display title, optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string | undefined;
  tone?: "light" | "dark";
  className?: string | undefined;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p
        className={cn(
          "text-[0.7rem] tracking-[0.45em] uppercase",
          dark ? "text-gold" : "text-brown/70",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl",
          dark ? "text-ivory" : "text-green-deep",
        )}
      >
        {title}
      </h2>
      <GoldDivider className="mt-6" />
      {lead ? (
        <p
          className={cn(
            "mt-6 text-sm leading-relaxed sm:text-base",
            dark ? "text-ivory/75" : "text-brown/80",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** Decorative arch frame used by the hero. */
export function ArchFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <div className="border-gold/60 absolute -inset-3 rounded-t-[999px] border sm:-inset-5" />
      <div className="border-gold/35 absolute -inset-6 rounded-t-[999px] border sm:-inset-10" />
      <div className="bg-green-night/40 arch-mask relative overflow-hidden">{children}</div>
    </div>
  );
}
