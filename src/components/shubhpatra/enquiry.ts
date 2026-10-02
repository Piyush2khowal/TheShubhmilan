import { brand, type BaseProduct } from "@/data/products";

/** Opens WhatsApp with a pre-filled enquiry for a product (or a general one). */
export function whatsappLink(product?: Pick<BaseProduct, "title" | "price">) {
  const message = product
    ? `Hello TheShubhmilan, I would like to enquire about "${product.title}" (${product.price}).`
    : "Hello TheShubhmilan, I would like to enquire about your wedding invitations.";
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}
