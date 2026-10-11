import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { About } from "@/components/shubhpatra/about";
import { CardsCatalogue } from "@/components/shubhpatra/cards-catalogue";
import { Collections } from "@/components/shubhpatra/collections";
import { Contact, SiteFooter } from "@/components/shubhpatra/contact";
import { Faq } from "@/components/shubhpatra/faq";
import { Highlights } from "@/components/shubhpatra/highlights";
import { Hero } from "@/components/shubhpatra/hero";
import { ProductModal } from "@/components/shubhpatra/product-modal";
import { ProductSection } from "@/components/shubhpatra/product-section";
import { SiteHeader } from "@/components/shubhpatra/site-header";
import { VideoModal } from "@/components/shubhpatra/video-modal";
import { VideoSection } from "@/components/shubhpatra/video-section";
import { useAdminCatalogue } from "@/hooks/use-admin-catalogue";
import {
  digitalInvitations,
  physicalCards,
  stationery,
  videoInvitations,
  type BaseProduct,
  type VideoProduct,
} from "@/data/products";

const title = "TheShubhmilan — Premium Indian Wedding Invitations";
const description =
  "Digital invitations, cinematic invitation films, day-of stationery and heirloom printed cards — crafted with temple arches, jaali screens and gold foil.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const [product, setProduct] = useState<BaseProduct | null>(null);
  const [video, setVideo] = useState<VideoProduct | null>(null);
  const adminProducts = useAdminCatalogue();

  return (
    <div className="bg-ivory min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Collections />
        <About />
        <ProductSection
          id="digital"
          eyebrow="Digital Invitations"
          title={
            <>
              Animated suites, <span className="font-display italic">shared in a tap</span>
            </>
          }
          lead="Illuminated arches, marigold borders and gold typography — delivered as MP4 and a shareable link."
          products={
            adminProducts.digital.length > 0 ? adminProducts.digital : digitalInvitations
          }
          excludeSaveTheDate
          onOpen={setProduct}
          viewAllHref="/digital-invite"
        />
        <ProductSection
          id="stationery"
          eyebrow="Stationery"
          title={
            <>
              Day-of details in <span className="font-display italic">perfect harmony</span>
            </>
          }
          lead="Welcome boards, seating charts, menus and thank-you notes finished in foil and handmade paper."
          products={
            adminProducts.stationery.length > 0 ? adminProducts.stationery : stationery
          }
          tone="dark"
          onOpen={setProduct}
        />
        <VideoSection
          onPlay={setVideo}
          videos={adminProducts.videos.length > 0 ? adminProducts.videos : videoInvitations}
        />
        <CardsCatalogue
          onOpen={setProduct}
          products={adminProducts.cards.length > 0 ? adminProducts.cards : physicalCards}
        />
        <Highlights />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <ProductModal product={product} onClose={() => setProduct(null)} />
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </div>
  );
}
