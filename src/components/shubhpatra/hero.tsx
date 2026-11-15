import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface SlideData {
  id: string;
  heading: string;
  subtitle: string;
  href: "/physical-cards" | "/digital-invite" | "/stationery";
  /** WebP source served from /public/assets/banners/ */
  webp: string;
  /** Original JPEG fallback kept in src/assets/hero_banners/ */
  jpeg: string;
  alt: string;
}

const slides: SlideData[] = [
  {
    id: "physical-cards",
    heading: "Physical Cards",
    subtitle: "Every Love Story Deserves a Beautiful Beginning.",
    href: "/physical-cards",
    webp: "/assets/banners/banner-physical-cards.webp",
    jpeg: "/assets/banners/banner-physical-cards.jpeg",
    alt: "Physical Cards — Every Love Story Deserves a Beautiful Beginning. Indian wedding invitation stationery collection.",
  },
  {
    id: "digital-invites",
    heading: "Digital Invites",
    subtitle: "Send Love Before the Celebration Begins.",
    href: "/digital-invite",
    webp: "/assets/banners/banner-digital-invites.webp",
    jpeg: "/assets/banners/banner-digital-invites.jpeg",
    alt: "Digital Invites — Send Love Before the Celebration Begins. Luxury animated wedding invites and phone suites.",
  },
  {
    id: "stationery",
    heading: "Digital & Physical Stationery",
    subtitle: "Crafted for Celebrations, Designed for Memories.",
    href: "/stationery",
    webp: "/assets/banners/banner-stationery.webp",
    jpeg: "/assets/banners/banner-stationery.jpeg",
    alt: "Digital & Physical Stationery — Crafted for Celebrations, Designed for Memories. Wedding signage, menus, and stationery.",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Automatic sliding with pause on hover
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    if (e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="top"
      aria-label="Featured Collections Carousel"
      className="relative w-full bg-[#fbf6ee] pt-14 sm:pt-16 lg:pt-[4.5rem] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Accessible Title */}
      <h1 className="sr-only">
        The Shubhmilan — Luxury Indian Wedding Invitations, Digital Suites & Heirloom Stationery
      </h1>

      {/* Main Full-Width Carousel Container */}
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-full flex-shrink-0"
              aria-hidden={index !== current}
            >
              <Link
                to={slide.href}
                search={{ sub: undefined }}
                className="group block relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                title={`${slide.heading} — ${slide.subtitle}`}
              >
                {/*
                  Exact image ratio: 1520 × 663 px.
                  object-cover fills the frame on every breakpoint — no letterboxing, no blurring.
                  min-h values ensure comfortable height on small screens.
                */}
                <div className="relative w-full aspect-[1520/663] min-h-[200px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[480px] overflow-hidden bg-[#fbf6ee]">
                  <picture>
                    {/* WebP — 93–133 KB, served from public/assets/banners/ */}
                    <source
                      srcSet={slide.webp}
                      type="image/webp"
                    />
                    {/* JPEG fallback — original quality preserved */}
                    <img
                      src={slide.jpeg}
                      alt={slide.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding={index === 0 ? "sync" : "async"}
                      width={1520}
                      height={663}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.012]"
                      style={{ imageRendering: "auto" }}
                    />
                  </picture>
                </div>

                {/* Accessible text content */}
                <div className="sr-only">
                  <h2>{slide.heading}</h2>
                  <p>{slide.subtitle}</p>
                  <span>Click to explore {slide.heading}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows: Left and Right */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cream/90 text-cocoa shadow-md border border-gold/40 backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:text-gold hover:scale-105 hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 -translate-x-0.5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cream/90 text-cocoa shadow-md border border-gold/40 backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:text-gold hover:scale-105 hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 translate-x-0.5" />
        </button>

        {/* Pagination Indicators: exactly 3 dots */}
        <div
          className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Carousel slide pagination"
        >
          {slides.map((slide, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}: ${slide.heading}`}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? "w-8 h-2.5 bg-cocoa border border-gold/80 shadow-sm"
                    : "w-2.5 h-2.5 bg-cocoa/30 hover:bg-cocoa/60 border border-transparent"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Elegant Gold Divider at the bottom of the hero slider */}
      <div className="gold-rule h-px w-full opacity-60" />
    </section>
  );
}
