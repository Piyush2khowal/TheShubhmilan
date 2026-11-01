import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import bannerPhysical from "@/assets/hero_banners/banner-physical-cards.jpg";
import bannerDigital from "@/assets/hero_banners/banner-digital-invites.jpg";
import bannerStationery from "@/assets/hero_banners/banner-stationery.jpg";

interface SlideData {
  id: string;
  heading: string;
  subtitle: string;
  href: "/physical-cards" | "/digital-invite" | "/stationery";
  image: string;
  alt: string;
}

const slides: SlideData[] = [
  {
    id: "physical-cards",
    heading: "Physical Cards",
    subtitle: "Every Love Story Deserves a Beautiful Beginning.",
    href: "/physical-cards",
    image: bannerPhysical,
    alt: "Physical Cards — Every Love Story Deserves a Beautiful Beginning. Indian wedding invitation stationery collection.",
  },
  {
    id: "digital-invites",
    heading: "Digital Invites",
    subtitle: "Send Love Before the Celebration Begins.",
    href: "/digital-invite",
    image: bannerDigital,
    alt: "Digital Invites — Send Love Before the Celebration Begins. Luxury animated wedding invites and phone suites.",
  },
  {
    id: "stationery",
    heading: "Digital & Physical Stationery",
    subtitle: "Crafted for Celebrations, Designed for Memories.",
    href: "/stationery",
    image: bannerStationery,
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
      className="relative w-full bg-[#fbf6ee] pt-16 sm:pt-20 lg:pt-24 select-none"
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
                {/* Visual Banner Container with Responsive Aspect Ratio */}
                <div className="relative w-full aspect-[19/10.5] max-h-[760px] min-h-[220px] sm:min-h-[360px] md:min-h-[460px] lg:min-h-[560px] bg-[#fbf6ee] flex items-center justify-center overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    width={1520}
                    height={840}
                    className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  />

                  {/* Subtle edge vignette to blend seamlessly */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#fbf6ee]/40 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#fbf6ee]/40 to-transparent" />
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
