import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { defaultCustomization, defaultDelivery, type BaseProduct } from "@/data/products";
import { whatsappLink } from "./enquiry";
import { BotanicalOrnament } from "./ornaments";

export function ProductModal({
  product,
  onClose,
}: {
  product: BaseProduct | null;
  onClose: () => void;
}) {
  if (!product) return null;
  return <ProductModalInner key={product.id} product={product} onClose={onClose} />;
}

function ProductModalInner({ product, onClose }: { product: BaseProduct; onClose: () => void }) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, ...(product.gallery ?? [])].filter(Boolean);
  const [active, setActive] = useState(0);
  const features = product.features ?? product.details;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const gridColsClass =
    images.length === 5
      ? "grid-cols-5"
      : images.length === 4
        ? "grid-cols-4"
        : images.length === 3
          ? "grid-cols-3"
          : images.length === 2
            ? "grid-cols-2"
            : "grid-cols-5";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="bg-espresso/70 fixed inset-0 backdrop-blur-sm"
      />
      <div className="border-gold/45 bg-cream relative z-10 my-0 max-h-full w-full max-w-5xl overflow-y-auto border sm:my-8 sm:max-h-[92vh]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="border-gold/50 text-brown hover:bg-brown hover:text-cream bg-cream/90 absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center border"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Main image + thumbnail gallery */}
          <div className="bg-beige/40 p-4 sm:p-6">
            <img
              src={images[active] ?? product.image}
              alt={product.title}
              className="h-64 w-full object-cover sm:h-96"
            />
            {images.length > 1 ? (
              <div className={`mt-3.5 grid gap-2 sm:gap-2.5 ${gridColsClass}`}>
                {images.map((image, index) => {
                  const isSelected = active === index;
                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-current={isSelected}
                      className={`relative aspect-square w-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-brown ring-2 ring-brown/40 shadow-sm opacity-100 scale-[1.02]"
                          : "border-gold/40 opacity-65 hover:border-brown/60 hover:opacity-100"
                      }`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="p-6 sm:p-9">
            {product.collection ? (
              <p className="text-gold text-[0.62rem] tracking-[0.4em] uppercase">
                {product.collection}
              </p>
            ) : null}
            <h3 className="text-brown mt-3 text-3xl leading-tight">{product.title}</h3>
            <p className="text-taupe mt-4 text-sm leading-relaxed">{product.description}</p>

            <div className="gold-rule mt-6 h-px w-full" />

            {/* Features */}
            <h4 className="text-brown mt-6 text-[0.62rem] tracking-[0.32em] uppercase">Features</h4>
            <ul className="mt-3 space-y-2.5">
              {features.map((detail) => (
                <li key={detail} className="text-taupe flex gap-3 text-sm">
                  <span className="text-gold">✦</span>
                  {detail}
                </li>
              ))}
            </ul>

            {/* Specifications */}
            {product.specs?.length ? (
              <>
                <h4 className="text-brown mt-7 text-[0.62rem] tracking-[0.32em] uppercase">
                  Specifications
                </h4>
                <dl className="border-gold/30 mt-3 divide-y divide-gold/20 border-y">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-[9rem_minmax(0,1fr)] gap-3 py-2"
                    >
                      <dt className="text-brown/70 text-xs tracking-[0.15em] uppercase">
                        {spec.label}
                      </dt>
                      <dd className="text-taupe text-sm">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}

            {/* Delivery + customization */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="border-gold/30 bg-beige/40 border p-4">
                <p className="text-brown text-[0.58rem] tracking-[0.3em] uppercase">Delivery</p>
                <p className="text-taupe mt-2 text-xs leading-relaxed">
                  {product.delivery ?? defaultDelivery}
                </p>
              </div>
              <div className="border-gold/30 bg-beige/40 border p-4">
                <p className="text-brown text-[0.58rem] tracking-[0.3em] uppercase">
                  Customisation
                </p>
                <p className="text-taupe mt-2 text-xs leading-relaxed">
                  {product.customization ?? defaultCustomization}
                </p>
              </div>
            </div>

            <p className="text-brown font-display mt-7 text-2xl">{product.price}</p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink(product)}
                target="_blank"
                rel="noreferrer"
                className="bg-brown text-cream hover:bg-espresso flex-1 px-6 py-3 text-center text-[0.7rem] tracking-[0.28em] uppercase transition-colors"
              >
                WhatsApp Enquiry
              </a>
              <a
                href="#contact"
                onClick={onClose}
                className="border-brown/45 text-brown hover:bg-beige flex-1 border px-6 py-3 text-center text-[0.7rem] tracking-[0.28em] uppercase transition-colors"
              >
                Enquire Now
              </a>
            </div>

            <BotanicalOrnament className="mt-7 opacity-70" />
          </div>
        </div>
      </div>
    </div>
  );
}
