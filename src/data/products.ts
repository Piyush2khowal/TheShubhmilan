/**
 * SHUBHPATRA — central product catalogue.
 *
 * HOW TO EDIT
 * -----------
 * Everything the site shows comes from this file. To add a product, append an
 * object to the relevant array. To remove one, delete its object. The UI reads
 * these arrays generically, so a catalogue of 40, 100 or 500 designs needs no
 * UI changes (grids, search, filters, sorting and Load More adapt automatically).
 *
 * Images: drop a file in `src/assets/` and `import` it at the top of this file,
 * or paste any absolute image URL as a string.
 */

import { topUpSubcategory, TARGET_PER_SUBCATEGORY } from "./design-generator";
import { generateDesignSvg } from "@/lib/design-svg";

// Templates  

import digitalImg from "@/assets/Templates/cat-digital.jpg";
import stationeryImg from "@/assets/Templates/cat-stationery.jpg";
import videoImg from "@/assets/Templates/cat-video.jpg";
import physicalImg from "@/assets/Templates/cat-physical.jpg";
import cardGreenImg from "@/assets/Templates/card-green.jpg";
import heroImg from "@/assets/Templates/hero-invitation.jpg";


/* ------------------------------------------------------------------ */
/* SAVE THE DATE IMAGES (STD1 – STD10)                                */
/* How to add new designs in the future:                              */
/* 1. Put the new folder in `src/assets/digital_invitations/save_the_date/STD11/` */
/* 2. Include 4 images inside: STD11.png, STD11_1.png, STD11_2.png, STD11_3.jpg */
/* 3. Import the 4 images below and add a new entry to `digitalInvitations` */
/* ------------------------------------------------------------------ */

// STD1
import std1_1 from "@/assets/digital_invitations/save_the_date/STD1/STD1.png";
import std1_2 from "@/assets/digital_invitations/save_the_date/STD1/STD1_1.png";
import std1_3 from "@/assets/digital_invitations/save_the_date/STD1/STD1_2.png";
import std1_4 from "@/assets/digital_invitations/save_the_date/STD1/STD1_3.jpg";

// STD2
import std2_1 from "@/assets/digital_invitations/save_the_date/STD2/STD2.png";
import std2_2 from "@/assets/digital_invitations/save_the_date/STD2/STD2_1.png";
import std2_3 from "@/assets/digital_invitations/save_the_date/STD2/STD2_2.png";
import std2_4 from "@/assets/digital_invitations/save_the_date/STD2/STD2_3.jpg";

// STD3
import std3_1 from "@/assets/digital_invitations/save_the_date/STD3/STD3.png";
import std3_2 from "@/assets/digital_invitations/save_the_date/STD3/STD3_1.png";
import std3_3 from "@/assets/digital_invitations/save_the_date/STD3/STD3_2.png";
import std3_4 from "@/assets/digital_invitations/save_the_date/STD3/STD3_3.jpg";

// STD4
import std4_1 from "@/assets/digital_invitations/save_the_date/STD4/STD4.png";
import std4_2 from "@/assets/digital_invitations/save_the_date/STD4/STD4_1.png";
import std4_3 from "@/assets/digital_invitations/save_the_date/STD4/STD4_2.png";
import std4_4 from "@/assets/digital_invitations/save_the_date/STD4/STD4_3.jpg";

// STD5
import std5_1 from "@/assets/digital_invitations/save_the_date/STD5/STD5.png";
import std5_2 from "@/assets/digital_invitations/save_the_date/STD5/STD5_1.png";
import std5_3 from "@/assets/digital_invitations/save_the_date/STD5/STD5_2.png";
import std5_4 from "@/assets/digital_invitations/save_the_date/STD5/STD5_3.jpg";

// STD6
import std6_1 from "@/assets/digital_invitations/save_the_date/STD6/STD6.png";
import std6_2 from "@/assets/digital_invitations/save_the_date/STD6/STD6_1.png";
import std6_3 from "@/assets/digital_invitations/save_the_date/STD6/STD6_2.png";
import std6_4 from "@/assets/digital_invitations/save_the_date/STD6/STD6_3.jpg";

// STD7
import std7_1 from "@/assets/digital_invitations/save_the_date/STD7/STD7.png";
import std7_2 from "@/assets/digital_invitations/save_the_date/STD7/STD7_1.png";
import std7_3 from "@/assets/digital_invitations/save_the_date/STD7/STD7_2.png";
import std7_4 from "@/assets/digital_invitations/save_the_date/STD7/STD7_3.jpg";

// STD8
import std8_1 from "@/assets/digital_invitations/save_the_date/STD8/STD8.png";
import std8_2 from "@/assets/digital_invitations/save_the_date/STD8/STD8_1.png";
import std8_3 from "@/assets/digital_invitations/save_the_date/STD8/STD8_2.png";
import std8_4 from "@/assets/digital_invitations/save_the_date/STD8/STD8_3.jpg";

// STD9
import std9_1 from "@/assets/digital_invitations/save_the_date/STD9/STD9.png";
import std9_2 from "@/assets/digital_invitations/save_the_date/STD9/STD9_1.png";
import std9_3 from "@/assets/digital_invitations/save_the_date/STD9/STD9_2.png";
import std9_4 from "@/assets/digital_invitations/save_the_date/STD9/STD9_3.jpg";

// STD10
import std10_1 from "@/assets/digital_invitations/save_the_date/STD10/STD10.png";
import std10_2 from "@/assets/digital_invitations/save_the_date/STD10/STD10_1.png";
import std10_3 from "@/assets/digital_invitations/save_the_date/STD10/STD10_2.png";
import std10_4 from "@/assets/digital_invitations/save_the_date/STD10/STD10_3.jpg";

/* ------------------------------------------------------------------ */
/* VIDEO INVITATIONS ASSETS                                           */
/* VI_1 to VI_10 connected. VI_11 and VI_12 empty until files arrive. */
/* ------------------------------------------------------------------ */


// VI_1
import vi1Video from "@/assets/video_invitation/VI_1.mp4";

// VI_2
import vi2Video from "@/assets/video_invitation/VI_2.mp4";

// VI_3
import vi3Video from "@/assets/video_invitation/VI_3.mp4";

// VI_4
import vi4Video from "@/assets/video_invitation/VI_4.MP4";

// VI_5
import vi5Video from "@/assets/video_invitation/VI_5.mp4";

// VI_6
import vi6Video from "@/assets/video_invitation/VI_6.mp4";

// VI_7
import vi7Video from "@/assets/video_invitation/VI_7.mp4";

// VI_8
import vi8Video from "@/assets/video_invitation/VI_8.mp4";

// VI_9
import vi9Video from "@/assets/video_invitation/VI_9.mp4";

// VI_10
import vi10Video from "@/assets/video_invitation/VI_10.mp4";

// VI_11 — EMPTY (add import when client provides VI_11.mp4)
// VI_12 — EMPTY (add import when client provides VI_12.mp4)

// Digital invites and Stationary images


//physical cards images
import card01 from "@/assets/physical_cards/1_image.png";
import card02 from "@/assets/physical_cards/2_image.png";
import card03 from "@/assets/physical_cards/3_image.png";
import card04 from "@/assets/physical_cards/4_image.png";
import card05 from "@/assets/physical_cards/5_image.png";

export type CategoryId = "digital" | "stationery" | "video" | "cards" | "logo";

export interface BaseProduct {
  /** Unique, stable slug — also the product page URL. */
  id: string;
  title: string;
  /** Small label above the title, e.g. the design family. */
  collection?: string;
  /** Display price, written exactly as it should appear. */
  price: string;
  /** Numeric value used for sorting + price filters. */
  priceValue?: number;
  image: string;
  /** Array of images for multi-image gallery (e.g. 5 card photos). */
  images?: string[];
  /** Extra images shown as thumbnails on the product page. */
  gallery?: string[];
  description: string;
  /** Bullet points shown on the product page. */
  details: string[];
  /** Specification rows, e.g. { label: "Size", value: "5×7 in" }. */
  specs?: { label: string; value: string }[];
  /** Feature bullets. Falls back to `details` when omitted. */
  features?: string[];
  /** Delivery/turnaround note. Falls back to `defaultDelivery`. */
  delivery?: string;
  /** Personalisation note. Falls back to `defaultCustomization`. */
  customization?: string;
  /** Top-level category this design belongs to. */
  category: CategoryId;
  /** Group inside a category, e.g. "Path & Pooja". */
  group?: string;
  /** Subcategory, e.g. "Ganesh Pooja" — drives catalogue filters. */
  subcategory?: string;
  /** Occasion tag used by the Physical Cards filters. */
  occasion?: string;
  /** Free-form search tags (style, colour, motif…) — matched by catalogue search. */
  tags?: string[];
}

export interface VideoProduct extends BaseProduct {
  /** MP4/WebM file URL, or a YouTube/Vimeo embed URL. */
  videoUrl: string;
  /** Poster/thumbnail image shown before playback. */
  poster: string;
  /** Duration label, e.g. "0:45". */
  duration: string;
  /** Frame shape of the film. Defaults to "landscape". */
  orientation?: "landscape" | "portrait" | "square";
}

export interface CardProduct extends BaseProduct {
  /** Used by the catalogue filters. */
  style: string;
  colour: string;
  material?: string;
  size?: string;
  /** Set to false to show the card as made-to-order. */
  available?: boolean;
}

/**
 * Fallbacks used by the product page whenever a product does not define its
 * own `delivery` / `customization` text. Edit once, applies everywhere.
 */
export const defaultDelivery =
  "Digital designs are delivered as files/links within 2–3 working days of approval. Printed orders are dispatched from Delhi in 8–12 working days after proof approval.";
export const defaultCustomization =
  "Names, dates, ceremonies, languages, colours and motifs are fully customisable. Share your details on WhatsApp and we send a personalised proof.";

export const brand = {
  name: "TheShubhmilan",
  tagline: "Wedding invites & stationery",
  owner: "Mustaqim",
  whatsapp: "919958577919",
  phone: "+91 99585 77919",
  email: "shubhpatra11@gmail.com",
  city: "Delhi",
  hours: "10 AM – 6 PM (Mon–Sat)",
  instagram: "https://instagram.com",
  heroImage: heroImg,
};

/* ------------------------------------------------------------------ */
/* CATEGORY + SUBCATEGORY TAXONOMY (from the client brief)             */
/* ------------------------------------------------------------------ */

export interface CategoryDef {
  id: CategoryId;
  name: string;
  /** Route the category card / navigation links to. */
  href: string;
  blurb: string;
  image: string;
  count: string;
}

export const categories: CategoryDef[] = [
  {
    id: "digital",
    name: "Digital Invite",
    href: "/digital-invite",
    blurb:
      "Wedding invitation PDFs, video invites, path & pooja, kids celebrations and digital stationery.",
    image: digitalImg,
    count: "Delivered in 48 hours",
  },
  {
    id: "stationery",
    name: "Stationery",
    href: "/stationery",
    blurb:
      "Signages, welcome notes, menus, itineraries, money envelopes, tags and wedding scrolls.",
    image: stationeryImg,
    count: "Print & foil finishes",
  },
  {
    id: "video",
    name: "Video Invitations",
    href: "/#video",
    blurb: "Animated invitation films for save the date, wedding and ring ceremony.",
    image: videoImg,
    count: "Square 1:1 previews",
  },
  {
    id: "cards",
    name: "Physical Cards",
    href: "/physical-cards",
    blurb: "Printed invitation cards — boxes, laser-cut covers, foil press and scrolls.",
    image: physicalImg,
    count: "25 designs",
  },
];

/** Digital Invite groups and their subcategories, exactly as per the brief. */
export const digitalGroups: { group: string; subcategories: string[] }[] = [
  {
    group: "Wedding Invitation PDF",
    subcategories: ["Save the Date", "Roka Ceremony", "Engagement", "Wedding Invite"],
  },
  {
    group: "Video Invite",
    subcategories: ["Save the Date", "Wedding", "Ring Ceremony / Engagement"],
  },
  {
    group: "Path & Pooja",
    subcategories: [
      "Ganesh Pooja",
      "Mata Ki Chowki",
      "Grah Pravesh / House Warming",
      "Satsang",
      "Naming Ceremony",
      "Michachmi Dukhdum",
      "Satyanarayana Katha",
      "Sunder Kand Path",
    ],
  },
  {
    group: "Kids Celebration",
    subcategories: ["Baby Announcement", "Baby Birthday", "Baby Shower", "Naming Ceremony"],
  },
  { group: "Digital Stationery", subcategories: ["Wardrobe Planner"] },
];

/** Stationery subcategories, exactly as per the brief. */
export const stationerySubcategories = [
  "Wedding Signages Design",
  "Welcome Notes",
  "Money Envelope Designs",
  "Thankyou Notes",
  "Menu Cards",
  "Itinerary Designs",
  "Keyjackets",
  "Luggage Tags",
  "Hamper Tags",
  "Wedding Scrolls",
];

/** Digital Invite groups, excluding "Video Invite" (handled by `videoInvitations`). */
export const digitalCatalogueGroups = digitalGroups.filter((g) => g.group !== "Video Invite");

/* ------------------------------------------------------------------ */
/* 1. DIGITAL INVITATIONS (PDF / pooja / kids / digital stationery)    */
/* ------------------------------------------------------------------ */

/**
 * TO ADD A DESIGN: copy an object below, give it a unique `id`, set `group`
 * and `subcategory` to one of the values in `digitalGroups`, and you're done.
 * Placeholder imagery is used until the client shares the final artwork.
 */
export const digitalInvitations: BaseProduct[] = [
  // =================================================================
  // SAVE THE DATE (10 DESIGNS: STD1 – STD10)
  // Each design folder contains 4 gallery images of the SAME design.
  // The first image is the primary catalogue cover.
  // To add STD11 in the future, copy one block below and increment the number.
  // =================================================================

  // STD1
  {
    id: "dig-save-the-date",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Ivory Arch",
    title: "Save The Date Invitation PDF — Design 1",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std1_1,
    images: [std1_1, std1_2, std1_3, std1_4],
    description:
      "A graceful single-page save the date PDF featuring an elegant arch motif and delicate ceremonial typography.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD2
  {
    id: "dig-save-the-date-2",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Marigold Trail",
    title: "Save The Date Invitation PDF — Design 2",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std2_1,
    images: [std2_1, std2_2, std2_3, std2_4],
    description:
      "Warm festive palette with rich floral borders and clean, modern typesetting for your date announcement.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD3
  {
    id: "dig-save-the-date-3",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Gold Filigree",
    title: "Save The Date Invitation PDF — Design 3",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std3_1,
    images: [std3_1, std3_2, std3_3, std3_4],
    description:
      "Opulent gold filigree borders paired with regal calligraphy on warm ivory cardstock.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD4
  {
    id: "dig-save-the-date-4",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Jaali Screen",
    title: "Save The Date Invitation PDF — Design 4",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std4_1,
    images: [std4_1, std4_2, std4_3, std4_4],
    description:
      "Intricate architectural jaali patterns framing your celebration date in ceremonial splendor.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD5
  {
    id: "dig-save-the-date-5",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Botanical Line",
    title: "Save The Date Invitation PDF — Design 5",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std5_1,
    images: [std5_1, std5_2, std5_3, std5_4],
    description:
      "Hand-sketched botanical sprigs and minimal gold detailing for an understated, modern romance.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD6
  {
    id: "dig-save-the-date-6",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Maroon Zari",
    title: "Save The Date Invitation PDF — Design 6",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std6_1,
    images: [std6_1, std6_2, std6_3, std6_4],
    description:
      "Rich deep maroon accents with traditional zari weave styling and royal serif typography.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD7
  {
    id: "dig-save-the-date-7",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Sandstone Minimal",
    title: "Save The Date Invitation PDF — Design 7",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std7_1,
    images: [std7_1, std7_2, std7_3, std7_4],
    description:
      "Earthy sandstone undertones, crisp serif titles and plenty of breathable whitespace.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD8
  {
    id: "dig-save-the-date-8",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Peacock Motif",
    title: "Save The Date Invitation PDF — Design 8",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std8_1,
    images: [std8_1, std8_2, std8_3, std8_4],
    description:
      "Regal peacock feather line illustration surrounded by gentle gold shimmer and classic borders.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD9
  {
    id: "dig-save-the-date-9",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Lotus Bloom",
    title: "Save The Date Invitation PDF — Design 9",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std9_1,
    images: [std9_1, std9_2, std9_3, std9_4],
    description:
      "Serene sacred lotus blooms on fine cream texture with soft gold calligraphy.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },

  // STD10
  {
    id: "dig-save-the-date-10",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Rangoli Dawn",
    title: "Save The Date Invitation PDF — Design 10",
    price: "From ₹1,299",
    priceValue: 1299,
    image: std10_1,
    images: [std10_1, std10_2, std10_3, std10_4],
    description:
      "Intricate mandalas and geometric rangoli corners announcing the big day in timeless style.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },
  {
    id: "dig-roka",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Roka Ceremony",
    collection: "Ivory Arch",
    title: "Roka Ceremony Invitation PDF",
    price: "From ₹1,299",
    priceValue: 1299,
    image: stationeryImg,
    images: [stationeryImg, digitalImg, heroImg, cardGreenImg, physicalImg],
    description:
      "A warm ivory and brown roka invitation with space for both families and the ceremony timing.",
    details: ["1–2 designed pages", "Both family names", "Venue and timing panel"],
  },
  {
    id: "dig-engagement",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Engagement",
    collection: "Maroon Bloom",
    title: "Engagement Invitation PDF",
    price: "From ₹1,499",
    priceValue: 1499,
    image: physicalImg,
    images: [physicalImg, digitalImg, heroImg, cardGreenImg, stationeryImg],
    description:
      "Maroon florals on ivory with a ring-ceremony header and elegant serif typography.",
    details: ["1–2 designed pages", "Ring ceremony motif", "Dress code panel optional"],
  },
  {
    id: "dig-wedding-suite",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Wedding Invite",
    collection: "Heritage",
    title: "Wedding Invitation PDF Suite",
    price: "From ₹3,499",
    priceValue: 3499,
    image: heroImg,
    images: [heroImg, digitalImg, cardGreenImg, stationeryImg, physicalImg],
    description:
      "The centrepiece — a multi-page wedding invitation PDF with ceremony schedule, venue details and RSVP contact.",
    details: [
      "Up to 5 designed pages",
      "Ceremony-by-ceremony schedule",
      "Venue map / directions panel",
      "Print-ready and share-ready versions",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG set" },
      { label: "Pages", value: "Up to 5" },
      { label: "Languages", value: "English, Hindi, Urdu + more" },
    ],
  },
  {
    id: "dig-ganesh-pooja",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Ganesh Pooja",
    collection: "Path & Pooja",
    title: "Ganesh Pooja Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: digitalImg,
    images: [digitalImg, cardGreenImg, heroImg, stationeryImg, physicalImg],
    description: "A serene ivory invitation for Ganesh Pooja with a hand-drawn temple arch.",
    details: ["1 designed page", "Pooja timing and venue", "Same-day express option"],
  },
  {
    id: "dig-mata-ki-chowki",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Mata Ki Chowki",
    collection: "Path & Pooja",
    title: "Mata Ki Chowki Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: cardGreenImg,
    images: [cardGreenImg, digitalImg, heroImg, stationeryImg, physicalImg],
    description: "Maroon and ivory chowki invitation with a soft gold border and diya motifs.",
    details: ["1 designed page", "Bhajan timing panel", "WhatsApp-optimised file size"],
  },
  {
    id: "dig-grah-pravesh",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Grah Pravesh / House Warming",
    collection: "Path & Pooja",
    title: "Grah Pravesh Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: physicalImg,
    images: [physicalImg, digitalImg, heroImg, cardGreenImg, stationeryImg],
    description: "House-warming invitation with a doorway arch illustration and family name plate.",
    details: ["1 designed page", "Address and directions", "Optional map link"],
  },
  {
    id: "dig-satsang",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Satsang",
    collection: "Path & Pooja",
    title: "Satsang Invitation",
    price: "From ₹799",
    priceValue: 799,
    image: stationeryImg,
    images: [stationeryImg, digitalImg, heroImg, cardGreenImg, physicalImg],
    description:
      "A calm, uncluttered satsang invitation in ivory with maroon devanagari typesetting.",
    details: ["1 designed page", "Hindi or English typesetting", "Timing and venue panel"],
  },
  {
    id: "dig-naming-ceremony-pooja",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Naming Ceremony",
    collection: "Path & Pooja",
    title: "Naming Ceremony Invitation (Pooja)",
    price: "From ₹899",
    priceValue: 899,
    image: heroImg,
    images: [heroImg, digitalImg, cardGreenImg, stationeryImg, physicalImg],
    description:
      "Naming ceremony invitation with a gentle floral wreath and space for the baby's name.",
    details: ["1 designed page", "Baby name reveal panel", "2 revision rounds"],
  },
  {
    id: "dig-michachmi",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Michachmi Dukhdum",
    collection: "Path & Pooja",
    title: "Michachmi Dukhdum Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: digitalImg,
    images: [digitalImg, heroImg, cardGreenImg, stationeryImg, physicalImg],
    description: "A traditional invitation layout for Michachmi Dukhdum in ivory and brown.",
    details: ["1 designed page", "Traditional layout", "Language of your choice"],
  },
  {
    id: "dig-satyanarayana-katha",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Satyanarayana Katha",
    collection: "Path & Pooja",
    title: "Satyanarayana Katha Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: cardGreenImg,
    images: [cardGreenImg, digitalImg, heroImg, stationeryImg, physicalImg],
    description: "Katha invitation with kalash motifs, maroon headings and ivory ground.",
    details: ["1 designed page", "Kalash motif border", "Timing and prasad note"],
  },
  {
    id: "dig-sunder-kand",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Sunder Kand Path",
    collection: "Path & Pooja",
    title: "Sunder Kand Path Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: physicalImg,
    images: [physicalImg, digitalImg, heroImg, cardGreenImg, stationeryImg],
    description: "Sunder Kand Path invitation with a restrained arch frame and devanagari heading.",
    details: ["1 designed page", "Devanagari heading", "Venue and timing panel"],
  },
  {
    id: "dig-baby-announcement",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Baby Announcement",
    collection: "Kids Celebration",
    title: "Baby Announcement Card",
    price: "From ₹799",
    priceValue: 799,
    image: stationeryImg,
    images: [stationeryImg, digitalImg, heroImg, cardGreenImg, physicalImg],
    description: "A soft ivory announcement card with room for the baby's name, date and weight.",
    details: ["1 designed page", "Photo frame option", "Square and story crops"],
  },
  {
    id: "dig-baby-birthday",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Baby Birthday",
    collection: "Kids Celebration",
    title: "Baby Birthday Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: digitalImg,
    images: [digitalImg, heroImg, cardGreenImg, stationeryImg, physicalImg],
    description:
      "A playful yet elegant birthday invitation with illustrated bunting in warm tones.",
    details: ["1 designed page", "Theme of your choice", "Photo insert option"],
  },
  {
    id: "dig-baby-shower",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Baby Shower",
    collection: "Kids Celebration",
    title: "Baby Shower Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: heroImg,
    images: [heroImg, digitalImg, cardGreenImg, stationeryImg, physicalImg],
    description: "Baby shower / godh bharai invitation with a floral arch and ivory backdrop.",
    details: ["1 designed page", "Godh bharai wording option", "Games / gifting note"],
  },
  {
    id: "dig-kids-naming",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Naming Ceremony",
    collection: "Kids Celebration",
    title: "Naming Ceremony Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: physicalImg,
    images: [physicalImg, digitalImg, heroImg, cardGreenImg, stationeryImg],
    description: "Naming ceremony card for the family celebration, with a name-reveal panel.",
    details: ["1 designed page", "Name reveal panel", "Matching thank-you note option"],
  },
  {
    id: "dig-wardrobe-planner",
    category: "digital",
    group: "Digital Stationery",
    subcategory: "Wardrobe Planner",
    collection: "Digital Stationery",
    title: "Wedding Wardrobe Planner",
    price: "From ₹1,199",
    priceValue: 1199,
    image: cardGreenImg,
    images: [cardGreenImg, digitalImg, heroImg, stationeryImg, physicalImg],
    description:
      "A designed wardrobe planner listing every function, outfit, jewellery and footwear note in one shareable file.",
    details: [
      "Function-by-function planner",
      "Outfit, jewellery and footwear columns",
      "Editable PDF + printable version",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. STATIONERY                                                       */
/* ------------------------------------------------------------------ */

export const stationery: BaseProduct[] = [
  {
    id: "sta-signage",
    category: "stationery",
    subcategory: "Wedding Signages Design",
    collection: "Entryway",
    title: "Wedding Signage Design",
    price: "From ₹2,400",
    priceValue: 2400,
    image: stationeryImg,
    images: [stationeryImg, heroImg, physicalImg, cardGreenImg, digitalImg],
    description:
      "A sculpted arch-shaped signage design for entryways, in acrylic, mirror or board.",
    details: ["24×36 in standard", "Acrylic, mirror or MDF", "Print-ready artwork supplied"],
  },
  {
    id: "sta-welcome-note",
    category: "stationery",
    subcategory: "Welcome Notes",
    collection: "Hospitality",
    title: "Welcome Note",
    price: "From ₹85 / pc",
    priceValue: 85,
    image: heroImg,
    images: [heroImg, stationeryImg, physicalImg, cardGreenImg, digitalImg],
    description: "A room-drop welcome note on textured ivory stock with maroon foiled heading.",
    details: ["Min. order 50 pcs", "Textured ivory stock", "Optional envelope"],
  },
  {
    id: "sta-money-envelope",
    category: "stationery",
    subcategory: "Money Envelope Designs",
    collection: "Shagun",
    title: "Money Envelope Design",
    price: "From ₹35 / pc",
    priceValue: 35,
    image: physicalImg,
    images: [physicalImg, stationeryImg, heroImg, cardGreenImg, digitalImg],
    description: "Shagun envelopes with a fine botanical border and space for the family name.",
    details: ["Min. order 100 pcs", "Foil or flat print", "Standard note size"],
  },
  {
    id: "sta-thankyou-note",
    category: "stationery",
    subcategory: "Thankyou Notes",
    collection: "Farewell",
    title: "Thankyou Note",
    price: "From ₹95 / pc",
    priceValue: 95,
    image: stationeryImg,
    images: [stationeryImg, heroImg, physicalImg, cardGreenImg, digitalImg],
    description: "Folded thank-you notes with matching lined envelopes and a wax seal option.",
    details: ["Matching envelope liner", "Wax seal with monogram", "Min. order 50 pcs"],
  },
  {
    id: "sta-menu-card",
    category: "stationery",
    subcategory: "Menu Cards",
    collection: "Tabletop",
    title: "Menu Card",
    price: "From ₹75 / pc",
    priceValue: 75,
    image: heroImg,
    images: [heroImg, stationeryImg, physicalImg, cardGreenImg, digitalImg],
    description: "Textured stock menu cards with optional foil headings and deckled edges.",
    details: ["Min. order 50 pcs", "Hot-foil or letterpress", "Handmade paper option"],
  },
  {
    id: "sta-itinerary",
    category: "stationery",
    subcategory: "Itinerary Designs",
    collection: "Tabletop",
    title: "Itinerary Design",
    price: "From ₹110 / pc",
    priceValue: 110,
    image: cardGreenImg,
    images: [cardGreenImg, stationeryImg, heroImg, physicalImg, digitalImg],
    description: "A function-wise itinerary card guests can keep in their room or bag.",
    details: ["Single or concertina fold", "Function-wise timeline", "Acrylic version available"],
  },
  {
    id: "sta-keyjacket",
    category: "stationery",
    subcategory: "Keyjackets",
    collection: "Hospitality",
    title: "Keyjacket",
    price: "From ₹60 / pc",
    priceValue: 60,
    image: digitalImg,
    images: [digitalImg, stationeryImg, heroImg, physicalImg, cardGreenImg],
    description: "Hotel keycard jackets carrying the wedding monogram and guest name.",
    details: ["Fits standard keycards", "Monogram + guest name", "Min. order 100 pcs"],
  },
  {
    id: "sta-luggage-tag",
    category: "stationery",
    subcategory: "Luggage Tags",
    collection: "Hospitality",
    title: "Luggage Tag",
    price: "From ₹70 / pc",
    priceValue: 70,
    image: physicalImg,
    images: [physicalImg, stationeryImg, heroImg, cardGreenImg, digitalImg],
    description: "Ribboned luggage tags for arriving guests, in ivory board or leatherette.",
    details: ["Ivory board or leatherette", "Ribbon or elastic loop", "Min. order 50 pcs"],
  },
  {
    id: "sta-hamper-tag",
    category: "stationery",
    subcategory: "Hamper Tags",
    collection: "Gifting",
    title: "Hamper Tag",
    price: "From ₹35 / pc",
    priceValue: 35,
    image: digitalImg,
    images: [digitalImg, stationeryImg, heroImg, physicalImg, cardGreenImg],
    description: "Gift and hamper tags finished with silk ribbon for return gifts.",
    details: ["Silk or satin ribbon", "Foil or embossed", "Min. order 100 pcs"],
  },
  {
    id: "sta-wedding-scroll",
    category: "stationery",
    subcategory: "Wedding Scrolls",
    collection: "Heritage",
    title: "Wedding Scroll",
    price: "From ₹520",
    priceValue: 520,
    image: stationeryImg,
    images: [stationeryImg, heroImg, physicalImg, cardGreenImg, digitalImg],
    description:
      "A printed scroll in a capped cylinder, tied with zari thread — for special guests.",
    details: ["Brass or wooden caps", "Silk or paper scroll", "Zari thread tie"],
  },
];

/* ------------------------------------------------------------------ */
/* 3. VIDEO INVITATIONS                                               */
/* VI_1 to VI_10 use the actual uploaded MP4 video files.             */
/* VI_11 and VI_12 are reserved empty slots until client files arrive.*/
/* ------------------------------------------------------------------ */

// VIDEO INVITATIONS
// VI_1
// VI_2
// VI_3
// VI_4
// VI_5
// VI_6
// VI_7
// VI_8
// VI_9
// VI_10
// VI_11 — EMPTY
// VI_12 — EMPTY

export const videoInvitations: VideoProduct[] = [
  // VI_1
  {
    id: "vid-vi-1",
    category: "video",
    group: "Video Invite",
    subcategory: "Save the Date",
    collection: "Save the Date",
    title: "Save The Date Teaser Film (VI 1)",
    price: "From ₹4,200",
    priceValue: 4200,
    image: cardGreenImg,
    poster: cardGreenImg,
    duration: "0:20",
    orientation: "portrait",
    videoUrl: vi1Video,
    description:
      "A short, cinematic reveal of the date — ivory textures with maroon and soft gold typography.",
    details: ["Cinematic teaser", "Reels-ready 9:16 version", "48-hour turnaround"],
  },

  // VI_2
  {
    id: "vid-vi-2",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Wedding",
    title: "Wedding Invitation Film (VI 2)",
    price: "From ₹6,500",
    priceValue: 6500,
    image: videoImg,
    poster: videoImg,
    duration: "0:45",
    orientation: "portrait",
    videoUrl: vi2Video,
    description:
      "An illuminated arch opens onto your names, with diyas, florals and a live instrumental score.",
    details: ["Full celebration suite", "Original score", "3 revision rounds"],
  },

  // VI_3
  {
    id: "vid-vi-3",
    category: "video",
    group: "Video Invite",
    subcategory: "Ring Ceremony / Engagement",
    collection: "Ring Ceremony",
    title: "Ring Ceremony Invitation Film (VI 3)",
    price: "From ₹5,400",
    priceValue: 5400,
    image: heroImg,
    poster: heroImg,
    duration: "0:35",
    orientation: "portrait",
    videoUrl: vi3Video,
    description:
      "A vertical engagement film built for WhatsApp and Instagram, with ring motif animation.",
    details: ["Vertical 9:16 master", "Ring motif animation", "Voice-over option"],
  },

  // VI_4
  {
    id: "vid-vi-4",
    category: "video",
    group: "Video Invite",
    subcategory: "Save the Date",
    collection: "Haldi Glow",
    title: "Haldi Ceremony Teaser Film (VI 4)",
    price: "From ₹3,800",
    priceValue: 3800,
    image: generateDesignSvg("vid-vi-4-poster"),
    poster: generateDesignSvg("vid-vi-4-poster"),
    duration: "0:18",
    orientation: "portrait",
    videoUrl: vi4Video,
    description: "A sunlit, marigold-toned teaser announcing the haldi, built for Instagram.",
    details: ["18 seconds", "Vertical 9:16 master", "48-hour turnaround"],
  },

  // VI_5
  {
    id: "vid-vi-5",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Mehendi Motion",
    title: "Mehendi Invitation Film (VI 5)",
    price: "From ₹4,600",
    priceValue: 4600,
    image: generateDesignSvg("vid-vi-5-poster"),
    poster: generateDesignSvg("vid-vi-5-poster"),
    duration: "0:30",
    orientation: "portrait",
    videoUrl: vi5Video,
    description: "Hand-drawn henna line art animates across a warm cream and gold backdrop.",
    details: ["30 seconds", "Vertical 9:16 master", "2 revision rounds"],
  },

  // VI_6
  {
    id: "vid-vi-6",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Sangeet Reveal",
    title: "Sangeet Night Invitation Film (VI 6)",
    price: "From ₹5,200",
    priceValue: 5200,
    image: generateDesignSvg("vid-vi-6-poster"),
    poster: generateDesignSvg("vid-vi-6-poster"),
    duration: "0:32",
    orientation: "portrait",
    videoUrl: vi6Video,
    description: "A festive gold-foil reveal announcing the sangeet, scored with live percussion.",
    details: ["32 seconds", "Vertical 9:16 master", "Original score"],
  },

  // VI_7
  {
    id: "vid-vi-7",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Reception Arch",
    title: "Reception Invitation Film (VI 7)",
    price: "From ₹5,800",
    priceValue: 5800,
    image: generateDesignSvg("vid-vi-7-poster"),
    poster: generateDesignSvg("vid-vi-7-poster"),
    duration: "0:40",
    orientation: "portrait",
    videoUrl: vi7Video,
    description:
      "A grand illuminated arch parts to reveal the reception details, in gold and ivory.",
    details: ["40 seconds", "Vertical 9:16 master", "3 revision rounds"],
  },

  // VI_8
  {
    id: "vid-vi-8",
    category: "video",
    group: "Video Invite",
    subcategory: "Ring Ceremony / Engagement",
    collection: "Ring Motion",
    title: "Ring Ceremony Teaser Film (VI 8)",
    price: "From ₹4,900",
    priceValue: 4900,
    image: generateDesignSvg("vid-vi-8-poster"),
    poster: generateDesignSvg("vid-vi-8-poster"),
    duration: "0:24",
    orientation: "portrait",
    videoUrl: vi8Video,
    description: "Two rings interlock in gold linework over a soft beige gradient.",
    details: ["24 seconds", "Vertical 9:16 master", "Voice-over option"],
  },

  // VI_9
  {
    id: "vid-vi-9",
    category: "video",
    group: "Video Invite",
    subcategory: "Save the Date",
    collection: "Lotus Bloom",
    title: "Save The Date Bloom Film (VI 9)",
    price: "From ₹4,000",
    priceValue: 4000,
    image: generateDesignSvg("vid-vi-9-poster"),
    poster: generateDesignSvg("vid-vi-9-poster"),
    duration: "0:22",
    orientation: "portrait",
    videoUrl: vi9Video,
    description: "A lotus motif blooms open around the date, in cream, taupe and muted gold.",
    details: ["22 seconds", "Vertical 9:16 master", "48-hour turnaround"],
  },

  // VI_10
  {
    id: "vid-vi-10",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Baby Bloom",
    title: "Baby Shower Invitation Film (VI 10)",
    price: "From ₹3,600",
    priceValue: 3600,
    image: generateDesignSvg("vid-vi-10-poster"),
    poster: generateDesignSvg("vid-vi-10-poster"),
    duration: "0:20",
    orientation: "portrait",
    videoUrl: vi10Video,
    description: "A soft floral wreath frames the godh bharai details in ivory and gold.",
    details: ["20 seconds", "Vertical 9:16 master", "2 revision rounds"],
  },

  // VI_11 — EMPTY
  // Client has not provided this video yet. Remains empty until actual file is provided.
  {
    id: "vid-vi-11",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Upcoming Suite",
    title: "Video Invitation 11",
    price: "From ₹4,500",
    priceValue: 4500,
    image: generateDesignSvg("vid-vi-11-poster"),
    poster: generateDesignSvg("vid-vi-11-poster"),
    duration: "",
    orientation: "portrait",
    videoUrl: "", // EMPTY: connect imported VI_11.mp4 when received
    description: "New cinematic video invitation coming soon.",
    details: ["High-definition master", "Custom music score", "Coming soon"],
  },

  // VI_12 — EMPTY
  // Client has not provided this video yet. Remains empty until actual file is provided.
  {
    id: "vid-vi-12",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Upcoming Suite",
    title: "Video Invitation 12",
    price: "From ₹4,500",
    priceValue: 4500,
    image: generateDesignSvg("vid-vi-12-poster"),
    poster: generateDesignSvg("vid-vi-12-poster"),
    duration: "",
    orientation: "portrait",
    videoUrl: "", // EMPTY: connect imported VI_12.mp4 when received
    description: "New cinematic video invitation coming soon.",
    details: ["High-definition master", "Custom music score", "Coming soon"],
  },
];

/* ------------------------------------------------------------------ */
/* 4. PHYSICAL CARDS — add as many entries as you like                 */
/* ------------------------------------------------------------------ */

/**
 * TO ADD A CARD: copy this template to the end of the array below, give it a
 * unique `id`, and you're done — the grid, search, filters, sorting and
 * Load More all pick it up automatically. No UI file needs editing.
 *
 * {
 *   id: "pc-unique-slug",
 *   category: "cards",
 *   collection: "Heritage",         // design family
 *   subcategory: "Wedding Invite",  // optional
 *   title: "Card name",
 *   price: "₹450",
 *   priceValue: 450,                // number only — used for sort + price filter
 *   image: myImportedImage,         // or "https://…"
 *   gallery: [imgA, imgB],          // optional extra photos
 *   style: "Box Card",              // filter
 *   colour: "Ivory",                // filter
 *   occasion: "Wedding",            // filter
 *   material: "Velvet-wrapped rigid box",
 *   size: "6×9 in",
 *   description: "…",
 *   details: ["…", "…"],
 *   available: true,                // optional; false = made to order
 * }
 *
 * TO REMOVE A CARD: delete its object. TO CHANGE price/image/text: edit it here.
 */

export const physicalCards: CardProduct[] = [
  {
    id: "pc-heritage-velvet",
    category: "cards",
    collection: "Heritage",
    title: "Heritage Velvet Box Card",
    price: "₹450",
    priceValue: 450,
    image: card01,
    images: [card01, card02, card03, card04, card05],
    style: "Box Card",
    colour: "Maroon",
    material: "Velvet-wrapped rigid board with laser-cut lid",
    size: "6×9 in box",
    description: "A velvet box with a laser-cut arch lid and ivory inserts.",
    details: [
      "Velvet-wrapped rigid box",
      "Laser-cut arch lid",
      "3 inserts + 2 envelopes",
      "Min. order 100 pcs",
    ],
    specs: [
      { label: "Style", value: "Box Card" },
      { label: "Material", value: "Velvet-wrapped rigid board" },
      { label: "Size", value: "6×9 in box" },
      { label: "Includes", value: "3 inserts + 2 envelopes" },
    ],
  },
  {
    id: "pc-jaali-arch",
    category: "cards",
    collection: "Jaali",
    title: "Jaali Arch Laser-Cut Card",
    price: "₹280",
    priceValue: 280,
    image: card02,
    images: [card02, card01, card03, card04, card05],
    style: "Laser Cut",
    colour: "Ivory",
    material: "300 gsm ivory board, laser-cut jaali cover",
    size: "5×7 in",
    description: "An ivory jaali screen folds open to reveal the invitation in foiled script.",
    details: ["Laser-cut jaali cover", "Foiled script", "Matching lined envelope"],
    specs: [
      { label: "Style", value: "Laser Cut" },
      { label: "Material", value: "300 gsm ivory board" },
      { label: "Size", value: "5×7 in" },
      { label: "Finish", value: "Gold foil detailing" },
    ],
  },
  {
    id: "pc-ivory-foil",
    category: "cards",
    collection: "Heritage",
    title: "Ivory Hot-Foil Invitation",
    price: "₹210",
    priceValue: 210,
    image: card03,
    images: [card03, card01, card02, card04, card05],
    style: "Foil Press",
    colour: "Ivory",
    material: "300 gsm handmade cotton paper, hot foil",
    size: "5×7 in",
    description: "Handmade cotton paper with a hot-foiled arch and botanical line ornaments.",
    details: ["300 gsm handmade paper", "Hot foil", "Deckled edges"],
    specs: [
      { label: "Style", value: "Foil Press" },
      { label: "Material", value: "300 gsm handmade cotton paper" },
      { label: "Size", value: "5×7 in" },
      { label: "Edges", value: "Hand-torn deckled edges" },
    ],
  },
  {
    id: "pc-scroll-invite",
    category: "cards",
    collection: "Heritage",
    title: "Silk Scroll Invitation",
    price: "₹520",
    priceValue: 520,
    image: card04,
    images: [card04, card01, card02, card03, card05],
    style: "Scroll",
    colour: "Ivory",
    material: "Silk scroll, brass-capped cylinder",
    size: "12 in scroll",
    description: "A silk scroll in a brass-capped cylinder, tied with zari thread.",
    details: ["Brass-capped cylinder", "Silk scroll print", "Zari thread tie"],
    specs: [
      { label: "Style", value: "Scroll" },
      { label: "Material", value: "Pure silk with brass casing" },
      { label: "Size", value: "12 in scroll" },
      { label: "Tie", value: "Handcrafted zari thread" },
    ],
  },
  {
    id: "pc-maroon-gatefold",
    category: "cards",
    collection: "Heritage",
    title: "Maroon Gatefold Card",
    price: "₹340",
    priceValue: 340,
    image: card05,
    images: [card05, card01, card02, card03, card04],
    style: "Gatefold",
    colour: "Maroon",
    material: "350 gsm board, foil-pressed pillars, magnet close",
    size: "5.5×8 in",
    description: "Twin gatefold doors with foiled pillars opening to the main card.",
    details: ["Gatefold with magnet close", "Foiled pillars", "2 inserts included"],
    specs: [
      { label: "Style", value: "Gatefold" },
      { label: "Material", value: "350 gsm premium board" },
      { label: "Size", value: "5.5×8 in" },
      { label: "Closure", value: "Concealed magnetic latch" },
    ],
  },
  {
    id: "pc-brown-minimal",
    category: "cards",
    collection: "Modern Minimal",
    title: "Brown & Foil Minimal Card",
    price: "₹165",
    priceValue: 165,
    image: physicalImg,
    images: [physicalImg, card01, card02, card03, card04],
    style: "Flat Card",
    colour: "Brown",
    material: "350 gsm board, single-colour foil",
    size: "5×7 in",
    description: "Warm brown board with a single foiled arch and letterpress typography.",
    details: ["350 gsm board", "Single-colour foil", "Min. order 100 pcs"],
    specs: [
      { label: "Style", value: "Flat Card" },
      { label: "Material", value: "350 gsm espresso board" },
      { label: "Size", value: "5×7 in" },
      { label: "Finish", value: "Matte metallic foil" },
    ],
  },
  {
    id: "pc-royal-mughal",
    category: "cards",
    collection: "Mughal Heritage",
    title: "Royal Mughal Arch Hardbound Card",
    price: "₹390",
    priceValue: 390,
    image: generateDesignSvg("pc-royal-mughal"),
    images: [generateDesignSvg("pc-royal-mughal"), card01, card02, card03, card04],
    style: "Hardbound",
    colour: "Ivory",
    material: "Hardbound book fold with embossed Mughal arch",
    size: "6×8.5 in",
    description: "An ornate Mughal arch doorway with intricate jali debossing and gilded border.",
    details: ["Hardbound padded cover", "Intricate jali debossing", "Butter paper divider", "Matching envelope"],
    specs: [
      { label: "Style", value: "Hardbound" },
      { label: "Material", value: "Padded matte board" },
      { label: "Size", value: "6×8.5 in" },
      { label: "Print", value: "Screen print & foil" },
    ],
  },
  {
    id: "pc-gold-filigree",
    category: "cards",
    collection: "Gold Filigree",
    title: "Gold Filigree Velvet Box",
    price: "₹480",
    priceValue: 480,
    image: generateDesignSvg("pc-gold-filigree"),
    images: [generateDesignSvg("pc-gold-filigree"), card01, card02, card03, card04],
    style: "Box Card",
    colour: "Gold",
    material: "Rigid box with gold filigree metal brooch",
    size: "7×10 in box",
    description: "A ceremonial box adorned with a metallic filigree crest and custom monogram.",
    details: ["Cast metal crest brooch", "Plush velvet interior", "Satin ribbon pull", "3 metallic inserts"],
    specs: [
      { label: "Style", value: "Box Card" },
      { label: "Material", value: "Handcrafted rigid board & velvet" },
      { label: "Size", value: "7×10 in box" },
      { label: "Brooch", value: "Custom electroplated brass" },
    ],
  },
  {
    id: "pc-lotus-bloom",
    category: "cards",
    collection: "Lotus Bloom",
    title: "Lotus Bloom Laser-Cut Card",
    price: "₹295",
    priceValue: 295,
    image: generateDesignSvg("pc-lotus-bloom"),
    images: [generateDesignSvg("pc-lotus-bloom"), card01, card02, card03, card04],
    style: "Laser Cut",
    colour: "Ivory",
    material: "Shimmer board with multi-layered lotus cutouts",
    size: "5×7.5 in",
    description: "Layered petals open outward in a blooming lotus motif revealing the wedding text.",
    details: ["Precision laser filigree", "Dual-tone shimmer paper", "Wax seal with monogram"],
    specs: [
      { label: "Style", value: "Laser Cut" },
      { label: "Material", value: "320 gsm pearlised board" },
      { label: "Size", value: "5×7.5 in" },
      { label: "Seal", value: "Custom botanical wax stamp" },
    ],
  },
  {
    id: "pc-peacock-zardozi",
    category: "cards",
    collection: "Heritage",
    title: "Peacock Zardozi Embroidered Card",
    price: "₹550",
    priceValue: 550,
    image: generateDesignSvg("pc-peacock-zardozi"),
    images: [generateDesignSvg("pc-peacock-zardozi"), card01, card02, card03, card04],
    style: "Box Card",
    colour: "Maroon",
    material: "Raw silk fabric with hand-embroidered peacock zardozi",
    size: "6.5×9 in",
    description: "Artisanal zardozi embroidery of peacock motifs executed on deep maroon silk.",
    details: ["Genuine metallic thread zardozi", "Raw silk hardbound cover", "Gilt-edged inserts"],
    specs: [
      { label: "Style", value: "Embroidered Box" },
      { label: "Material", value: "Raw silk on rigid structure" },
      { label: "Size", value: "6.5×9 in" },
      { label: "Craft", value: "Hand-embroidery" },
    ],
  },
  {
    id: "pc-saffron-zari",
    category: "cards",
    collection: "Saffron Thread",
    title: "Saffron Zari Folded Invitation",
    price: "₹240",
    priceValue: 240,
    image: generateDesignSvg("pc-saffron-zari"),
    images: [generateDesignSvg("pc-saffron-zari"), card01, card02, card03, card04],
    style: "Gatefold",
    colour: "Sand",
    material: "Textured saffron paper with woven zari border",
    size: "5.5×8 in",
    description: "Warm saffron textured paper bordered with metallic zari weave and devanagari motifs.",
    details: ["Zari brocade border trim", "Traditional shubh vivah heading", "2 ceremony inserts"],
    specs: [
      { label: "Style", value: "Gatefold" },
      { label: "Material", value: "300 gsm handmade saffron paper" },
      { label: "Size", value: "5.5×8 in" },
      { label: "Accent", value: "Woven zari ribbon" },
    ],
  },
  {
    id: "pc-botanical-deckle",
    category: "cards",
    collection: "Botanical Line",
    title: "Botanical Deckled Edge Card",
    price: "₹195",
    priceValue: 195,
    image: generateDesignSvg("pc-botanical-deckle"),
    images: [generateDesignSvg("pc-botanical-deckle"), card01, card02, card03, card04],
    style: "Flat Card",
    colour: "Ivory",
    material: "100% cotton rag paper with deckled edges",
    size: "5×7 in",
    description: "Fine-line botanical illustrations pressed into thick handmade cotton paper.",
    details: ["Deckled edges on 4 sides", "Blind deboss & gold foil", "Translucent vellum overlay"],
    specs: [
      { label: "Style", value: "Flat Card" },
      { label: "Material", value: "350 gsm pure cotton rag" },
      { label: "Size", value: "5×7 in" },
      { label: "Finish", value: "Deboss & hot foil" },
    ],
  },
  {
    id: "pc-sandstone-minimal",
    category: "cards",
    collection: "Sandstone Minimal",
    title: "Sandstone Minimal Arch Card",
    price: "₹180",
    priceValue: 180,
    image: generateDesignSvg("pc-sandstone-minimal"),
    images: [generateDesignSvg("pc-sandstone-minimal"), card01, card02, card03, card04],
    style: "Flat Card",
    colour: "Sand",
    material: "Warm sandstone textured board with die-cut arch top",
    size: "5×7.5 in",
    description: "Sculptural die-cut arched invitation card inspired by Rajasthani jharokhas.",
    details: ["Curved arch die-cut", "Minimalist serif typography", "Matching tone-on-tone envelope"],
    specs: [
      { label: "Style", value: "Die-Cut Arch" },
      { label: "Material", value: "350 gsm matte textured board" },
      { label: "Size", value: "5×7.5 in" },
      { label: "Shape", value: "Jharokha arch" },
    ],
  },
  {
    id: "pc-kalash-gold",
    category: "cards",
    collection: "Kalash Gold",
    title: "Kalash Gold Foil Card",
    price: "₹225",
    priceValue: 225,
    image: generateDesignSvg("pc-kalash-gold"),
    images: [generateDesignSvg("pc-kalash-gold"), card01, card02, card03, card04],
    style: "Foil Press",
    colour: "Maroon",
    material: "Deep crimson card with gleaming kalash and coconut motif",
    size: "5.5×8 in",
    description: "Auspicious kalash motifs rendered in reflective gold foil on rich crimson cardstock.",
    details: ["Reflective mirror gold foil", "Auspicious Sanskrit shlokas", "Gold-foiled envelope flap"],
    specs: [
      { label: "Style", value: "Foil Press" },
      { label: "Material", value: "350 gsm velvet touch board" },
      { label: "Size", value: "5.5×8 in" },
      { label: "Foil", value: "Mirror gloss gold" },
    ],
  },
  {
    id: "pc-temple-lattice",
    category: "cards",
    collection: "Temple Lattice",
    title: "Temple Lattice Gatefold Card",
    price: "₹310",
    priceValue: 310,
    image: generateDesignSvg("pc-temple-lattice"),
    images: [generateDesignSvg("pc-temple-lattice"), card01, card02, card03, card04],
    style: "Gatefold",
    colour: "Ivory",
    material: "Intricate laser-cut temple pillar lattice on ivory board",
    size: "6×8 in",
    description: "Temple pillar lattice gates swing open with a decorative gold bell charm.",
    details: ["Twin temple lattice panels", "Miniature metal bell ornament", "3 multi-event inserts"],
    specs: [
      { label: "Style", value: "Gatefold" },
      { label: "Material", value: "320 gsm imported board" },
      { label: "Size", value: "6×8 in" },
      { label: "Charm", value: "Antique gold bell" },
    ],
  },
  {
    id: "pc-antique-rose",
    category: "cards",
    collection: "Antique Rose",
    title: "Antique Rose Embossed Card",
    price: "₹260",
    priceValue: 260,
    image: generateDesignSvg("pc-antique-rose"),
    images: [generateDesignSvg("pc-antique-rose"), card01, card02, card03, card04],
    style: "Foil Press",
    colour: "Sand",
    material: "Soft dusty rose textured paper with multi-level embossing",
    size: "5×7 in",
    description: "Gentle rose garden garlands with multi-level sculpted emboss and rose-gold foiling.",
    details: ["Multi-level sculptured emboss", "Rose-gold foil highlights", "Lined blush envelope"],
    specs: [
      { label: "Style", value: "Embossed" },
      { label: "Material", value: "300 gsm textured paper" },
      { label: "Size", value: "5×7 in" },
      { label: "Finish", value: "Sculptured 3D emboss" },
    ],
  },
  {
    id: "pc-espresso-velvet",
    category: "cards",
    collection: "Espresso Arch",
    title: "Espresso Velvet Trunk Box",
    price: "₹580",
    priceValue: 580,
    image: generateDesignSvg("pc-espresso-velvet"),
    images: [generateDesignSvg("pc-espresso-velvet"), card01, card02, card03, card04],
    style: "Box Card",
    colour: "Brown",
    material: "Rich espresso velvet mini trunk with brass hasp closure",
    size: "7×9 in box",
    description: "Luxury miniature trunk wrapped in deep espresso velvet with brass clasp and sweets tray.",
    details: ["Brass hasp and hinge mechanism", "Removable mithaai tray", "Hardbound invitation book inside"],
    specs: [
      { label: "Style", value: "Trunk Box" },
      { label: "Material", value: "Wooden core & imported velvet" },
      { label: "Size", value: "7×9×2.5 in" },
      { label: "Hardware", value: "Antique brass hasp" },
    ],
  },
  {
    id: "pc-cream-cascade",
    category: "cards",
    collection: "Cream Cascade",
    title: "Cream Cascade Foil Card",
    price: "₹235",
    priceValue: 235,
    image: generateDesignSvg("pc-cream-cascade"),
    images: [generateDesignSvg("pc-cream-cascade"), card01, card02, card03, card04],
    style: "Flat Card",
    colour: "Ivory",
    material: "Tiered cascade inserts in warm cream and champagne tones",
    size: "5×7.5 in",
    description: "Staggered step-cut cards providing clean tabbed navigation through each wedding ceremony.",
    details: ["4 stepped ceremony tabs", "Champagne foil headings", "Silk belly band wrap"],
    specs: [
      { label: "Style", value: "Stepped Cascade" },
      { label: "Material", value: "300 gsm premium Italian board" },
      { label: "Size", value: "5×7.5 in" },
      { label: "Tabs", value: "4 graduated step cards" },
    ],
  },
  {
    id: "pc-amber-court",
    category: "cards",
    collection: "Amber Court",
    title: "Amber Court Hardbound Suite",
    price: "₹370",
    priceValue: 370,
    image: generateDesignSvg("pc-amber-court"),
    images: [generateDesignSvg("pc-amber-court"), card01, card02, card03, card04],
    style: "Hardbound",
    colour: "Gold",
    material: "Amber metallic cloth bound invitation book",
    size: "6×8 in",
    description: "An opulent cloth-bound book invitation evoking ancient royal court scrolls and registers.",
    details: ["Metallic woven bookcloth", "Gilded corners", "Custom calligraphy name plate"],
    specs: [
      { label: "Style", value: "Hardbound" },
      { label: "Material", value: "Bookcloth & greyboard" },
      { label: "Size", value: "6×8 in" },
      { label: "Corners", value: "Gilded metal protectors" },
    ],
  },
  {
    id: "pc-taupe-garland",
    category: "cards",
    collection: "Taupe Garland",
    title: "Taupe Garland Laser-Cut Card",
    price: "₹275",
    priceValue: 275,
    image: generateDesignSvg("pc-taupe-garland"),
    images: [generateDesignSvg("pc-taupe-garland"), card01, card02, card03, card04],
    style: "Laser Cut",
    colour: "Brown",
    material: "Taupe cardstock with continuous marigold garland fretwork",
    size: "5.5×7.5 in",
    description: "Continuous toran and garland fretwork laser cut along the border in earthy taupe.",
    details: ["Toran garland laser fretwork", "Soft gold foil background", "Matching envelope liner"],
    specs: [
      { label: "Style", value: "Laser Cut" },
      { label: "Material", value: "300 gsm taupe art board" },
      { label: "Size", value: "5.5×7.5 in" },
      { label: "Pattern", value: "Marigold toran" },
    ],
  },
  {
    id: "pc-marigold-foil",
    category: "cards",
    collection: "Marigold Trail",
    title: "Marigold Motif Foil Invitation",
    price: "₹215",
    priceValue: 215,
    image: generateDesignSvg("pc-marigold-foil"),
    images: [generateDesignSvg("pc-marigold-foil"), card01, card02, card03, card04],
    style: "Foil Press",
    colour: "Gold",
    material: "Festive golden marigold floral illustrations with raised foil",
    size: "5×7 in",
    description: "Cheerful marigolds celebrated in raised tactile gold foil on rich handmade paper.",
    details: ["Raised tactile foil print", "Traditional genda phool artwork", "Deckled envelope flap"],
    specs: [
      { label: "Style", value: "Foil Press" },
      { label: "Material", value: "300 gsm handmade paper" },
      { label: "Size", value: "5×7 in" },
      { label: "Finish", value: "Raised metallic foil" },
    ],
  },
  {
    id: "pc-mughal-jaali",
    category: "cards",
    collection: "Jaali Screen",
    title: "Mughal Jaali Metallic Card",
    price: "₹320",
    priceValue: 320,
    image: generateDesignSvg("pc-mughal-jaali"),
    images: [generateDesignSvg("pc-mughal-jaali"), card01, card02, card03, card04],
    style: "Laser Cut",
    colour: "Gold",
    material: "Metallic gold board with geometric Mughal jaali lattice",
    size: "6×8 in",
    description: "Geometric octagonal jaali geometry precision cut into reflective matte-gold board.",
    details: ["Octagonal Mughal jaali cut", "Matte metallic gold cardstock", "Ribbon closure"],
    specs: [
      { label: "Style", value: "Laser Cut" },
      { label: "Material", value: "350 gsm metallic board" },
      { label: "Size", value: "6×8 in" },
      { label: "Closure", value: "Hand-dyed silk ribbon" },
    ],
  },
  {
    id: "pc-dawn-court",
    category: "cards",
    collection: "Dawn Court",
    title: "Dawn Court Regal Box",
    price: "₹495",
    priceValue: 495,
    image: generateDesignSvg("pc-dawn-court"),
    images: [generateDesignSvg("pc-dawn-court"), card01, card02, card03, card04],
    style: "Box Card",
    colour: "Ivory",
    material: "Pearl ivory hardbox with royal darbar arch painting",
    size: "7×9 in box",
    description: "A stately invitation box featuring miniature court paintings and gold foil calligraphy.",
    details: ["Fine art miniature painting insert", "Padded velvet tray", "3 ceremony folders"],
    specs: [
      { label: "Style", value: "Box Card" },
      { label: "Material", value: "Padded rigid board" },
      { label: "Size", value: "7×9 in box" },
      { label: "Artwork", value: "Miniature court painting" },
    ],
  },
  {
    id: "pc-vintage-zardozi",
    category: "cards",
    collection: "Vintage Zardozi",
    title: "Vintage Zardozi Silk Scroll",
    price: "₹560",
    priceValue: 560,
    image: generateDesignSvg("pc-vintage-zardozi"),
    images: [generateDesignSvg("pc-vintage-zardozi"), card01, card02, card03, card04],
    style: "Scroll",
    colour: "Maroon",
    material: "Crimson raw silk scroll in carved rosewood case",
    size: "14 in scroll",
    description: "Royal farmaan style silk scroll with hand-stitched border housed in an engraved rosewood cylinder.",
    details: ["Engraved natural rosewood cylinder", "Raw silk scroll with zari trim", "Tassel tie"],
    specs: [
      { label: "Style", value: "Scroll" },
      { label: "Material", value: "Pure silk & carved rosewood" },
      { label: "Size", value: "14 in scroll" },
      { label: "Case", value: "Hand-carved wooden case" },
    ],
  },
  {
    id: "pc-whispering-vine",
    category: "cards",
    collection: "Whispering Vine",
    title: "Whispering Vine Handmade Paper Card",
    price: "₹190",
    priceValue: 190,
    image: generateDesignSvg("pc-whispering-vine"),
    images: [generateDesignSvg("pc-whispering-vine"), card01, card02, card03, card04],
    style: "Flat Card",
    colour: "Ivory",
    material: "Botanical seed paper with delicate vine press",
    size: "5×7 in",
    description: "Plantable handmade cotton paper embedded with wildflower seeds and debossed vine borders.",
    details: ["Eco-friendly seed paper", "Blind letterpress debossing", "Plantable after celebration"],
    specs: [
      { label: "Style", value: "Flat Card" },
      { label: "Material", value: "Seed-embedded cotton paper" },
      { label: "Size", value: "5×7 in" },
      { label: "Feature", value: "Plantable wildflower seeds" },
    ],
  },
];

export const allProducts: BaseProduct[] = [
  ...digitalInvitations,
  ...stationery,
  ...videoInvitations,
  ...physicalCards,
];

/** Look up any product (any category) by its id — used by the product page. */
export function productById(id: string): BaseProduct | undefined {
  return allProducts.find((product) => product.id === id);
}

/** True when the product is a video invitation (has a playable file). */
export function isVideoProduct(product: BaseProduct): product is VideoProduct {
  return (product as VideoProduct).videoUrl !== undefined;
}

/* ------------------------------------------------------------------ */
/* CATALOGUE GENERATION — tops each subcategory up to a full, unique   */
/* set of designs on demand (see src/data/design-generator.ts).        */
/* ------------------------------------------------------------------ */

/** Base "from" price used when generating extra designs for a digital subcategory. */
function digitalBasePrice(subcategory: string): number {
  if (subcategory === "Wedding Invite") return 1799;
  if (subcategory === "Engagement" || subcategory === "Roka Ceremony") return 1499;
  if (subcategory === "Wardrobe Planner") return 899;
  return 1299;
}

/** Full, unique design set for one Digital Invite subcategory (curated + generated). */
export function digitalSubcategoryDesigns(group: string, subcategory: string): BaseProduct[] {
  // Save the Date uses exclusively the actual client designs (STD1–STD10)
  if (subcategory === "Save the Date") {
    return digitalInvitations.filter(
      (p) => p.subcategory === "Save the Date" && (!group || p.group === group),
    );
  }

  return topUpSubcategory(digitalInvitations, {
    category: "digital",
    group,
    subcategory,
    basePrice: digitalBasePrice(subcategory),
    titleSuffix: "Invitation PDF",
  });
}

/** Full, unique design set for one Stationery subcategory (curated + generated). */
export function stationerySubcategoryDesigns(subcategory: string): BaseProduct[] {
  return topUpSubcategory(stationery, {
    category: "stationery",
    subcategory,
    basePrice: 220,
    titleSuffix: "Design",
  });
}

export { TARGET_PER_SUBCATEGORY };
