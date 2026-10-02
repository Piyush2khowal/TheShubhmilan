import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { VideoProduct } from "@/data/products";
import { whatsappLink } from "./enquiry";

function isEmbed(url: string) {
  return /youtube|youtu\.be|vimeo/.test(url);
}

/** Adds autoplay params so embeds start when the modal opens. */
function embedSrc(url: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}autoplay=1&rel=0`;
}

export function VideoModal({
  video,
  onClose,
}: {
  video: VideoProduct | null;
  onClose: () => void;
}) {
  if (!video || !video.videoUrl) return null;
  // Keyed so switching films remounts the player (fresh, reset state).
  return <VideoModalInner key={video.id} video={video} onClose={onClose} />;
}

function VideoModalInner({ video, onClose }: { video: VideoProduct; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop + reset playback whenever the modal closes/unmounts, and close on Esc.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      const element = videoRef.current;
      if (element) {
        element.pause();
        element.currentTime = 0;
        element.removeAttribute("src");
        element.load();
      }
    };
  }, [onClose]);

  const orientation = video.orientation ?? "landscape";
  const frame =
    orientation === "portrait"
      ? "aspect-[9/16] max-h-[78vh] w-auto mx-auto"
      : orientation === "square"
        ? "aspect-square max-h-[78vh] w-auto mx-auto"
        : "aspect-video w-full";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="bg-espresso/80 fixed inset-0 backdrop-blur-sm"
      />
      <div className="border-gold/50 bg-cream relative z-10 w-full max-w-4xl border p-3 sm:p-5">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="border-gold/50 text-brown hover:bg-gold hover:text-cream absolute -top-4 right-0 grid h-9 w-9 place-items-center border bg-cream sm:-right-4"
        >
          <X className="h-4 w-4" />
        </button>

        <div className={`bg-espresso overflow-hidden ${frame}`}>
          {isEmbed(video.videoUrl) ? (
            <iframe
              src={embedSrc(video.videoUrl)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.poster}
              controls
              controlsList="nodownload"
              autoPlay
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        <div className="grid gap-4 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="text-gold text-[0.62rem] tracking-[0.4em] uppercase">
              {video.collection} · {video.duration}
            </p>
            <h3 className="text-brown mt-2 text-2xl">{video.title}</h3>
            <p className="text-taupe mt-2 text-sm">{video.description}</p>
          </div>
          <a
            href={whatsappLink(video)}
            target="_blank"
            rel="noreferrer"
            className="bg-brown text-cream hover:bg-espresso px-6 py-3 text-center text-[0.7rem] tracking-[0.28em] uppercase transition-colors"
          >
            Enquire · {video.price}
          </a>
        </div>
      </div>
    </div>
  );
}
