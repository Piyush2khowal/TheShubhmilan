import type { BaseProduct } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  onOpen,
  tone = "light",
  className,
}: {
  product: BaseProduct;
  onOpen: (product: BaseProduct) => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <article
      className={cn(
        "group border-gold/35 relative flex flex-col border p-3 transition-all duration-500 hover:-translate-y-1",
        dark ? "bg-green/40 hover:border-gold/70" : "bg-card hover:border-gold/70",
        className,
      )}
    >
      <span className="border-gold/70 absolute top-1.5 left-1.5 h-4 w-4 border-t border-l" />
      <span className="border-gold/70 absolute right-1.5 bottom-1.5 h-4 w-4 border-r border-b" />

      <button
        type="button"
        onClick={() => onOpen(product)}
        className="block w-full overflow-hidden text-left"
      >
        <img
          src={product.images?.[0] ?? product.image}
          alt={product.title}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] sm:h-64"
        />
      </button>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3 text-center">
        {product.collection ? (
          <p className="text-gold text-[0.6rem] tracking-[0.35em] uppercase">
            {product.collection}
          </p>
        ) : null}
        <h3 className={cn("mt-2 text-xl leading-snug", dark ? "text-ivory" : "text-green-deep")}>
          {product.title}
        </h3>
        <div className="gold-rule mx-auto mt-3 h-px w-14" />
        <p
          className={cn(
            "mt-3 line-clamp-2 text-xs leading-relaxed",
            dark ? "text-ivory/70" : "text-brown/75",
          )}
        >
          {product.description}
        </p>
        <div className="mt-auto pt-5">
          <p className={cn("font-display text-lg", dark ? "text-gold-bright" : "text-brown")}>
            {product.price}
          </p>
          <button
            type="button"
            onClick={() => onOpen(product)}
            className={cn(
              "mt-4 w-full border py-2.5 text-[0.65rem] tracking-[0.3em] uppercase transition-colors",
              dark
                ? "border-gold/60 text-gold hover:bg-gold hover:text-green-deep"
                : "border-green/40 text-green-deep hover:bg-green-deep hover:text-ivory",
            )}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
