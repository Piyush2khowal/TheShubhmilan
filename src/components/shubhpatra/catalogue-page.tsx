import { Link } from "@tanstack/react-router";
import { Search, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

import { generateDesignSvg } from "@/lib/design-svg";
import { TARGET_PER_SUBCATEGORY, type BaseProduct, type CardProduct } from "@/data/products";
import { ProductCard } from "./product-card";
import { SectionHeading } from "./ornaments";

export interface CatalogueSection {
  /** Optional group label, e.g. "Path & Pooja". Omit for a flat taxonomy. */
  group?: string;
  subcategory: string;
}

const PAGE_SIZE = 25;

function slug(value?: string) {
  return (value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Stable key identifying a section, even when the same subcategory name repeats under two groups. */
export function sectionKey(section: CatalogueSection) {
  return section.group
    ? `${slug(section.group)}--${slug(section.subcategory)}`
    : slug(section.subcategory);
}

function haystackOf(product: BaseProduct) {
  const card = product as CardProduct;
  return [
    product.title,
    product.collection,
    product.description,
    product.category,
    product.group,
    product.subcategory,
    card.style,
    card.colour,
    card.occasion,
    ...(product.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function CataloguePage({
  basePath,
  categoryLabel,
  eyebrow,
  title,
  lead,
  sections,
  getDesigns,
  activeKey,
  onOpen,
}: {
  basePath: string;
  categoryLabel: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  sections: CatalogueSection[];
  getDesigns: (section: CatalogueSection) => BaseProduct[];
  activeKey?: string | undefined;
  onOpen: (product: BaseProduct) => void;
}) {
  const activeSection = sections.find((s) => sectionKey(s) === activeKey);

  if (!activeSection) {
    return (
      <CategoryGridView
        basePath={basePath}
        categoryLabel={categoryLabel}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        sections={sections}
      />
    );
  }

  return (
    <SubcategoryCatalogue
      basePath={basePath}
      categoryLabel={categoryLabel}
      section={activeSection}
      designs={getDesigns(activeSection)}
      onOpen={onOpen}
    />
  );
}

function CategoryGridView({
  basePath,
  categoryLabel,
  eyebrow,
  title,
  lead,
  sections,
}: {
  basePath: string;
  categoryLabel: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  sections: CatalogueSection[];
}) {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => {
    const map = new Map<string, CatalogueSection[]>();
    for (const section of sections) {
      const key = section.group ?? categoryLabel;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(section);
    }
    return Array.from(map.entries());
  }, [sections, categoryLabel]);

  const term = query.trim().toLowerCase();

  return (
    <section className="bg-cream min-h-screen pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

        <label className="border-gold/45 bg-card mx-auto mt-10 flex max-w-md items-center gap-3 border px-4 py-2.5">
          <Search className="text-brown/60 h-4 w-4 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${categoryLabel.toLowerCase()} categories…`}
            aria-label={`Search ${categoryLabel} categories`}
            className="text-brown placeholder:text-brown/45 w-full bg-transparent text-sm outline-none"
          />
        </label>

        {groups.map(([groupLabel, groupSections]) => {
          const visible = groupSections.filter(
            (s) => !term || (s.subcategory + " " + (s.group ?? "")).toLowerCase().includes(term),
          );
          if (visible.length === 0) return null;
          return (
            <div key={groupLabel} className="mt-14">
              {groupLabel !== categoryLabel ? (
                <h3 className="text-brown/70 text-center text-[0.65rem] tracking-[0.4em] uppercase">
                  {groupLabel}
                </h3>
              ) : null}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {visible.map((section) => {
                  const key = sectionKey(section);
                  const thumb = generateDesignSvg(`${basePath}-${key}-cover`);
                  return (
                    <Link
                      key={key}
                      to={basePath}
                      search={{ sub: key }}
                      className="group border-gold/35 hover:border-gold/70 relative block overflow-hidden border bg-card transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="relative">
                        <img
                          src={thumb}
                          alt={section.subcategory}
                          loading="lazy"
                          className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-48"
                        />
                        <div className="from-espresso via-espresso/25 absolute inset-0 bg-gradient-to-t to-transparent" />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-brown text-base leading-snug sm:text-lg">
                          {section.subcategory}
                        </h3>
                        <p className="text-taupe mt-1 text-[0.62rem] tracking-[0.25em] uppercase">
                          {TARGET_PER_SUBCATEGORY} designs
                        </p>
                        <span className="text-gold mt-2 inline-block text-[0.6rem] tracking-[0.3em] uppercase">
                          Explore →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SubcategoryCatalogue({
  basePath,
  categoryLabel,
  section,
  designs,
  onOpen,
}: {
  basePath: string;
  categoryLabel: string;
  section: CatalogueSection;
  designs: BaseProduct[];
  onOpen: (product: BaseProduct) => void;
}) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return designs;
    return designs.filter((product) => haystackOf(product).includes(term));
  }, [designs, query]);

  const visible = filtered.slice(0, shown);

  return (
    <section className="bg-cream min-h-screen pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Link
          to={basePath}
          className="text-taupe hover:text-brown inline-flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Categories
        </Link>

        <SectionHeading
          eyebrow={`${categoryLabel}${section.group ? ` · ${section.group}` : ""}`}
          title={<>{section.subcategory}</>}
          lead={`Browse every ${section.subcategory} design — search, then load more to see the full catalogue.`}
          className="mt-6"
        />

        <label className="border-gold/45 bg-card mx-auto mt-8 flex max-w-md items-center gap-3 border px-4 py-2.5">
          <Search className="text-brown/60 h-4 w-4 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShown(PAGE_SIZE);
            }}
            placeholder="Search by name, style, colour, motif…"
            aria-label={`Search ${section.subcategory} designs`}
            className="text-brown placeholder:text-brown/45 w-full bg-transparent text-sm outline-none"
          />
        </label>

        <p className="text-brown/60 mt-6 text-center text-xs tracking-[0.2em] uppercase">
          Showing {visible.length} of {filtered.length} designs
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={onOpen} className="h-full" />
          ))}
        </div>

        {visible.length < filtered.length ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShown((value) => Math.min(value + PAGE_SIZE, filtered.length))}
              className="border-brown text-brown hover:bg-brown hover:text-cream border px-10 py-3.5 text-[0.7rem] tracking-[0.3em] uppercase transition-colors"
            >
              Load More Designs
            </button>
          </div>
        ) : null}

        {filtered.length === 0 ? (
          <p className="text-taupe mt-12 text-center text-sm">
            No designs match “{query}” yet — try another search term.
          </p>
        ) : null}
      </div>
    </section>
  );
}
