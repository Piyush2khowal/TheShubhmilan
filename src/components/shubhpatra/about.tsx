import aboutImage1 from "@/assets/about_us/1st_image.png";
import aboutImage2 from "@/assets/about_us/2nd_image.jpeg";
import aboutImage3 from "@/assets/about_us/3rd_image.jpeg";

import { BotanicalOrnament, GoldDivider } from "./ornaments";
import { useReveal } from "./use-reveal";

export function About() {
  const { ref } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="bg-beige/50 py-20 sm:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-5 lg:px-8"
      >

        {/* =========================
            ABOUT TheShubhmilan
        ========================== */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Image */}
          <div className="border-gold/30 relative border p-3">
            <img
              src={aboutImage1}
              alt="TheShubhmilan wedding invitation"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-80 w-full object-cover sm:h-[430px]"
            />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <p className="text-taupe text-[0.7rem] tracking-[0.45em] uppercase">
              About TheShubhmilan
            </p>

            <h2 className="text-cocoa mt-4 text-3xl leading-tight sm:text-4xl">
              Where Every Celebration Begins with a Beautiful Story
            </h2>

            <GoldDivider className="mt-6 justify-start" />

            <div className="text-brown/80 mt-7 space-y-5 text-sm leading-relaxed sm:text-base">
              <p>
                At TheShubhmilan, we believe a wedding invitation is more than
                just a card — it is the first glimpse into your celebration,
                your traditions, and your love story.
              </p>

              <p>
                Rooted in the beauty of Indian culture and inspired by
                timeless craftsmanship, TheShubhmilan creates premium wedding
                invitations and luxury wedding stationery that make every
                celebration feel truly special.
              </p>

              <p>
                From elegant wedding cards and beautifully crafted inserts to
                shagun envelopes, gift packaging, tags, and personalised
                stationery, every detail is thoughtfully designed to
                complement your wedding aesthetic.
              </p>
            </div>
          </div>
        </div>


        {/* =========================
            OUR PHILOSOPHY
        ========================== */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Text */}
          <div className="min-w-0">
            <h2 className="text-cocoa text-3xl leading-tight sm:text-4xl">
              Our Philosophy
            </h2>

            <GoldDivider className="mt-6 justify-start" />

            <div className="text-brown/80 mt-7 space-y-5 text-sm leading-relaxed sm:text-base">
              <p className="text-cocoa font-medium">
                Beautiful beginnings deserve beautiful details.
              </p>

              <p>
                At TheShubhmilan, our aim is to turn your wedding vision into
                stationery that you will cherish long after the celebrations
                are over. Every design is created with attention to detail,
                quality, and the little touches that make your story
                unforgettable.
              </p>

              <p>
                TheShubhmilan — thoughtfully designed for your most beautiful
                beginnings.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="border-gold/30 relative border p-3">
            <img
              src={aboutImage2}
              alt="TheShubhmilan wedding stationery"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-72 w-full object-cover sm:h-[360px]"
            />
          </div>
        </div>


        {/* =========================
            CRAFTED FOR YOUR SPECIAL MOMENTS
        ========================== */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image */}
          <div className="border-gold/30 relative border p-3">
            <img
              src={aboutImage3}
              alt="TheShubhmilan wedding stationery collection"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-72 w-full object-cover sm:h-[360px]"
            />
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h2 className="text-cocoa text-3xl leading-tight sm:text-4xl">
              Crafted for Your Special Moments
            </h2>

            <GoldDivider className="mt-6 justify-start" />

            <div className="text-brown/80 mt-7 space-y-5 text-sm leading-relaxed sm:text-base">
              <p>
                We blend traditional Indian artistry with contemporary
                luxury, bringing together rich colours, intricate patterns,
                exquisite illustrations, elegant typography, and premium
                finishes.
              </p>

              <p>
                Whether your celebration is grand and royal, intimate and
                minimal, or deeply rooted in tradition, we create designs
                that feel uniquely yours.
              </p>
            </div>
          </div>
        </div>


        <BotanicalOrnament className="mt-16 opacity-60" />

      </div>
    </section>
  );
}