import { Play } from "lucide-react";
import { useState } from "react";

import { videoInvitations, type VideoProduct } from "@/data/products";
import { SectionHeading } from "./ornaments";
import { useReveal } from "./use-reveal";

/** Initially visible films, and how many each "Load More" click reveals. */
const INITIAL = 8;
const STEP = 2;

export function VideoSection({
  onPlay,
  videos = videoInvitations,
}: {
  onPlay: (video: VideoProduct) => void;
  videos?: VideoProduct[];
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [shown, setShown] = useState(INITIAL);

  const films = videos.slice(0, shown);

  return (
    <section id="video" className="bg-beige/45 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Video Invitations"
          title={
            <>
              Invitation films, <span className="font-display italic">scored & storyboarded</span>
            </>
          }
          lead="Illustrated frames, live instrumentation and a warm beige-and-gold grade — made to be watched twice."
        />

        <p className="text-brown/60 mt-8 text-center text-xs tracking-[0.2em] uppercase">
          Showing {films.length} of {videos.length} films
        </p>

        <div ref={ref} className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {films.map((video, index) => (
            <div
              key={video.id}
              data-visible={visible}
              style={{ transitionDelay: `${(index % 4) * 90}ms` }}
              className="reveal"
            >
              {/* 1:1 square thumbnail on every breakpoint */}
              <button
                type="button"
                onClick={() => {
                  if (video.videoUrl) onPlay(video);
                }}
                aria-label={video.videoUrl ? `Play ${video.title}` : `${video.title} (Coming Soon)`}
                className="group border-gold/35 hover:border-gold/70 relative block aspect-square w-full overflow-hidden border bg-card transition-colors cursor-pointer"
              >
                <img
                  src={video.poster}
                  alt={video.title}
                  loading={index < 4 ? "eager" : "lazy"}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {video.videoUrl ? (
                  <span className="border-gold/80 bg-cream/70 text-brown absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur transition-transform duration-500 group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </span>
                ) : (
                  <span className="border-gold/40 bg-cream/85 text-brown/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border px-2.5 py-1 text-[0.6rem] tracking-[0.2em] uppercase backdrop-blur">
                    Coming Soon
                  </span>
                )}
                {video.duration ? (
                  <span className="bg-cream/85 text-brown border-gold/40 absolute right-2 bottom-2 border px-2 py-0.5 text-[0.6rem] tracking-[0.2em]">
                    {video.duration}
                  </span>
                ) : null}
              </button>

              {/* Name (and optional price) below the card */}
              <div className="pt-3 text-center">
                {video.collection ? (
                  <p className="text-gold text-[0.55rem] tracking-[0.35em] uppercase">
                    {video.collection}
                  </p>
                ) : null}
                <h3 className="text-brown mt-1 text-base leading-snug sm:text-lg">{video.title}</h3>
                {video.price ? (
                  <p className="text-taupe font-display mt-1 text-sm">{video.price}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {shown < videos.length ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShown((value) => value + STEP)}
              className="border-brown text-brown hover:bg-brown hover:text-cream border px-10 py-3.5 text-[0.7rem] tracking-[0.3em] uppercase transition-colors"
            >
              Load More Films
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
