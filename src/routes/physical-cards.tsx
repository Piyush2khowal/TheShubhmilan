import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { ProductCard } from "@/components/shubhpatra/product-card";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { SectionHeading } from "@/components/shubhpatra/ornaments";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { useAdminCatalogue } from "@/hooks/use-admin-catalogue";
import { physicalCards, type BaseProduct } from "@/data/products";

const title = "Physical Cards — TheShubhmilan";
const description =
  "Printed invitation cards — velvet boxes, laser-cut jaali, hot foil and scrolls — browse our complete 25-design catalogue.";

export const Route = createFileRoute("/physical-cards")({
  validateSearch: (search: Record<string, unknown>) => ({
    sub: typeof search["sub"] === "string" ? search["sub"] : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PhysicalCardsPage,
});

function PhysicalCardsPage() {
  const [product, setProduct] = useState<BaseProduct | null>(null);
  const [query, setQuery] = useState("");
  const adminProducts = useAdminCatalogue();
  const catalogueCards = [...adminProducts.cards, ...physicalCards];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return catalogueCards;
    return catalogueCards.filter((card) => {
      const haystack = [
        card.title,
        card.collection,
        card.description,
        card.style,
        card.colour,
        card.material,
        ...(card.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [catalogueCards, query]);

  return (
    <div className="bg-ivory min-h-screen">
      <SiteHeader />
      <main>
        <section className="bg-cream min-h-screen pt-28 pb-24 sm:pt-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Physical Cards"
              title={
                <>
                  The printed <span className="font-display italic">heirloom catalogue</span>
                </>
              }
              lead="Velvet boxes, laser-cut jaali, hot foil and handmade paper — explore our collection of 25 bespoke printed invitation cards."
            />

            <label className="border-gold/45 bg-card mx-auto mt-8 flex max-w-md items-center gap-3 border px-4 py-2.5">
              <Search className="text-brown/60 h-4 w-4 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search physical cards by name, material, style…"
                aria-label="Search physical cards"
                className="text-brown placeholder:text-brown/45 w-full bg-transparent text-sm outline-none"
              />
            </label>

            <p className="text-brown/60 mt-6 text-center text-xs tracking-[0.2em] uppercase">
              Showing {filtered.length} of {catalogueCards.length} designs
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((card) => (
                <ProductCard key={card.id} product={card} onOpen={setProduct} className="h-full" />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-taupe mt-12 text-center text-sm">
                No cards match “{query}” yet — try another search term.
              </p>
            )}
          </div>
        </section>
        <Contact />
      </main>
      <SiteFooter />
      <ProductModal product={product} onClose={() => setProduct(null)} />
    </div>
  );
}
