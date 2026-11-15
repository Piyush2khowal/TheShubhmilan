/** True when a URL points at a video rather than a still image. */
export function isVideoSrc(url?: string | null): boolean {
  if (!url) return false;
  return /(\\.mp4|\\.webm|\\.mov|\\.m4v)(\?|#|$)/i.test(url) || /youtube|youtu\\.be|vimeo/.test(url);
}

/** Accepts http(s) URLs, site-relative paths, and protocol-relative URLs. */
export function isMediaSrc(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  return (
    /^https?:\/\//i.test(trimmed) ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("//")
  );
}

/**
 * Downscale common remote CDNs so catalogue thumbnails do not fetch full-resolution files.
 * Supports: Unsplash, Cloudinary, ImageKit, Netlify Image CDN.
 */
export function thumbnailSrc(url: string, width = 640): string {
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) return url;

  try {
    // Unsplash
    if (url.includes("images.unsplash.com")) {
      const parsed = new URL(url);
      parsed.searchParams.set("auto", "format");
      parsed.searchParams.set("fit", "crop");
      parsed.searchParams.set("w", String(width));
      parsed.searchParams.set("q", "75");
      return parsed.toString();
    }

    // Cloudinary — insert transformation before upload/ or image/upload/
    if (url.includes("res.cloudinary.com")) {
      const q = "q_auto:good";
      const f = "f_auto";
      const w = `w_${width}`;
      const transform = `${w},${f},${q},c_limit`;
      // Insert after /upload/ segment
      return url.replace(/\/upload\//, `/upload/${transform}/`);
    }

    // ImageKit
    if (url.includes("ik.imagekit.io")) {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}tr=w-${width},q-75,f-auto`;
    }

    // Netlify Image CDN (/_netlify/images)
    if (url.includes("netlify.app") || url.includes("netlify.com")) {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}w=${width}&q=75`;
    }
  } catch {
    return url;
  }

  return url;
}

export function isSaveTheDateLabel(value?: string | null): boolean {
  if (!value) return false;
  return /save[\s-]?the[\s-]?date/i.test(value);
}
