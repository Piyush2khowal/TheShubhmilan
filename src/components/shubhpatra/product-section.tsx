import { Link } from "@tanstack/react-router";
import { useState } from "react";

import type { BaseProduct } from "@/data/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { SectionHeading } from "./ornaments";
import { useReveal } from "./use-reveal";

/** Generic grid section — works for any list in src/data/products.ts. */
export function ProductSection({
  id,
  eyebrow,
  title,
  lead,
  products,
  tone = "light",
  onOpen,
  className,
  initial = 9,
  step = 9,
  viewAllHref,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  products: BaseProduct[];
  tone?: "light" | "dark";
  onOpen: (product: BaseProduct) => void;
  className?: string;
  /** How many products to show before the first "Load More". */
  initial?: number;
  /** How many more each "Load More" click reveals. */
  step?: number;
  /** When set, shows a "Browse Full Catalogue" link to the full category page. */
  viewAllHref?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [shown, setShown] = useState(initial);
  const dark = tone === "dark";
  const list = products.slice(0, shown);

  return (
    <section id={id} className={cn("py-20 sm:py-28", dark ? "bg-beige/45" : "bg-cream", className)}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
        <p className="text-brown/60 mt-8 text-center text-xs tracking-[0.2em] uppercase">
          Showing {list.length} of {products.length} designs
        </p>
        <div
          ref={ref}
          className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {list.map((product, index) => (
            <div
              key={product.id}
              data-visible={visible}
              style={{ transitionDelay: `${(index % 3) * 120}ms` }}
              className="reveal"
            >
              <ProductCard product={product} onOpen={onOpen} className="h-full" />
            </div>
          ))}
        </div>

        {shown < products.length ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShown((value) => value + step)}
              className="border-brown text-brown hover:bg-brown hover:text-cream border px-10 py-3.5 text-[0.7rem] tracking-[0.3em] uppercase transition-colors"
            >
              Load More
            </button>
          </div>
        ) : null}

        {viewAllHref ? (
          <div className="mt-6 text-center">
            <Link
              to={viewAllHref}
              className="text-gold hover:text-brown inline-block text-[0.68rem] tracking-[0.3em] uppercase underline-offset-4 hover:underline"
            >
              Browse Full Catalogue →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
