import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { physicalCards, type BaseProduct, type CardProduct } from "@/data/products";
import { ProductCard } from "./product-card";
import { SectionHeading } from "./ornaments";

const PAGE_SIZE = 12;

type Sort = "featured" | "price-asc" | "price-desc" | "title";

const priceBands = [
  { id: "all", label: "All Prices", test: () => true },
  { id: "under-200", label: "Under ₹200", test: (v: number) => v < 200 },
  { id: "200-400", label: "₹200 – ₹400", test: (v: number) => v >= 200 && v <= 400 },
  { id: "400-700", label: "₹400 – ₹700", test: (v: number) => v > 400 && v <= 700 },
  { id: "700-plus", label: "₹700 +", test: (v: number) => v > 700 },
] as const;

export function CardsCatalogue({
  onOpen,
  products = physicalCards,
}: {
  onOpen: (product: BaseProduct) => void;
  products?: CardProduct[];
}) {
  const [query, setQuery] = useState("");
  const [occasion, setOccasion] = useState("All");
  const [style, setStyle] = useState("All");
  const [colour, setColour] = useState("All");
  const [band, setBand] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [shown, setShown] = useState(PAGE_SIZE);

  // Filter options are derived from the data — new cards appear automatically.
  const options = useMemo(() => {
    const unique = (values: (string | undefined)[]) => [
      "All",
      ...Array.from(new Set(values.filter(Boolean) as string[])).sort(),
    ];
    return {
      occasions: unique(products.map((c) => c.occasion)),
      styles: unique(products.map((c) => c.style)),
      colours: unique(products.map((c) => c.colour)),
    };
  }, [products]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const priceTest = priceBands.find((b) => b.id === band)?.test ?? (() => true);

    const list = products.filter((card) => {
      if (occasion !== "All" && card.occasion !== occasion) return false;
      if (style !== "All" && card.style !== style) return false;
      if (colour !== "All" && card.colour !== colour) return false;
      if (!priceTest(card.priceValue ?? 0)) return false;
      if (term) {
        const haystack = [
          card.title,
          card.collection,
          card.description,
          card.style,
          card.colour,
          card.occasion,
          card.material,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0));
    if (sort === "price-desc") sorted.sort((a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0));
    if (sort === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [products, query, occasion, style, colour, band, sort]);

  const visibleCards = filtered.slice(0, shown);

  const reset = () => setShown(PAGE_SIZE);

  const chip = (active: boolean) =>
    `border px-4 py-2 text-[0.62rem] tracking-[0.22em] uppercase transition-colors ${
      active ? "border-brown bg-brown text-cream" : "border-gold/50 text-brown hover:border-brown"
    }`;

  const filterRow = (
    label: string,
    values: readonly string[],
    current: string,
    set: (value: string) => void,
  ) => (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <span className="text-brown/60 mr-1 text-[0.6rem] tracking-[0.3em] uppercase">{label}</span>
      {values.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => {
            set(option);
            reset();
          }}
          className={chip(current === option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <section id="cards" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Physical Cards"
          title={
            <>
              The printed <span className="font-display italic">heirloom catalogue</span>
            </>
          }
          lead="Velvet boxes, laser-cut jaali, hot foil and handmade paper — search, filter and enquire on any design."
        />

        <div className="border-gold/35 mt-12 space-y-4 border-y py-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="border-gold/45 bg-card flex items-center gap-3 border px-4 py-2.5">
              <Search className="text-brown/60 h-4 w-4 shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  reset();
                }}
                placeholder="Search designs, materials, occasions…"
                aria-label="Search physical cards"
                className="text-brown placeholder:text-brown/45 w-full bg-transparent text-sm outline-none"
              />
            </label>

            <label className="flex shrink-0 items-center gap-3">
              <span className="text-brown/60 text-[0.6rem] tracking-[0.3em] uppercase">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                className="border-gold/50 text-brown bg-card border px-3 py-2 text-xs tracking-[0.15em] uppercase"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price · Low to High</option>
                <option value="price-desc">Price · High to Low</option>
                <option value="title">Name · A to Z</option>
              </select>
            </label>
          </div>

          {filterRow("Occasion", options.occasions, occasion, setOccasion)}
          {filterRow("Style", options.styles, style, setStyle)}
          {filterRow("Colour", options.colours, colour, setColour)}
          {filterRow(
            "Price",
            priceBands.map((b) => b.label),
            priceBands.find((b) => b.id === band)?.label ?? "All Prices",
            (label) => setBand(priceBands.find((b) => b.label === label)?.id ?? "all"),
          )}
        </div>

        <p className="text-brown/60 mt-5 text-center text-xs tracking-[0.2em] uppercase">
          Showing {visibleCards.length} of {filtered.length} designs
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {visibleCards.map((card) => (
            <ProductCard key={card.id} product={card} onOpen={onOpen} className="h-full" />
          ))}
        </div>

        {visibleCards.length < filtered.length ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShown((value) => value + PAGE_SIZE)}
              className="border-brown text-brown hover:bg-brown hover:text-cream border px-10 py-3.5 text-[0.7rem] tracking-[0.3em] uppercase transition-colors"
            >
              Load More Cards
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <p className="text-taupe mt-12 text-center text-sm">
            No cards match this combination yet — try another filter or search term.
          </p>
        ) : null}
      </div>
    </section>
  );
}
