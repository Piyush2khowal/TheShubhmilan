# Shubh Patra: Elegant Indian Invitations

I want to create a new premium Indian wedding invitation website called SHUBHPATRA.

I am providing my existing Ivory Vows website source code as the technical foundation/reference. Do NOT modify, overwrite, or depend on the original Ivory Vows website. Create SHUBHPATRA as a separate independent website.

Use the existing Ivory Vows architecture and functionality where useful, but redesign the visual identity so SHUBHPATRA feels like a different premium Indian wedding brand.

SHUBHPATRA categories:

1. Digital Invitations

2. Stationery

3. Video Invitations

4. Physical Cards

PRODUCT MANAGEMENT:

- Products must be stored in a centralized, easy-to-edit data structure.

- I must be able to easily add, edit, or remove products without changing the main UI code.

- Physical Cards will eventually contain 40+ products, so the system must support a large catalogue.

- Do NOT generate fake duplicate designs automatically.

- Each real product should be an individual product entry with its own image, title, price, description and details.

- Digital Invitations and Stationery can contain multiple designs/categories.

- Video Invitations should support video files/URLs with poster/thumbnail images.

- Physical Cards should support 40+ cards and easy addition/removal.

DESIGN DIRECTION:

SHUBHPATRA should look premium, rich, ceremonial and Indian-inspired rather than like a Western bridal website.

Color palette:

- Deep Green: #1C4533

- Dark Green: #123024

- Ivory: #F7EAE1

- Peach: #F8D3B9

- Brown: #5F3122

- Gold: #D9A441

- Bright Gold: #F0C05A

Use the SHUBHPATRA logo I provide.

VISUAL STYLE:

- Deep green should be an important primary surface.

- Use ivory and peach for light sections.

- Use brown for text where appropriate.

- Use gold mainly for premium borders, dividers, ornaments and highlights.

- Use elegant Indian-inspired architectural/arch motifs.

- Use refined botanical line ornaments.

- Avoid simply copying the Ivory Vows visual design.

- Create a distinct SHUBHPATRA identity.

HERO:

Create a centered premium hero rather than simply copying the Ivory Vows two-column hero.

Use an elegant arch frame inspired by the SHUBHPATRA logo.

The hero should feel like a luxury Indian wedding invitation.

COLLECTIONS:

Create one unified "Our Collections" section showing all four categories:

- Digital Invitations

- Stationery

- Video Invitations

- Physical Cards

Each category should have its own visual treatment.

PRODUCT CARDS:

Create elegant premium product cards with subtle gold borders/ornaments.

Do not use exactly the same card styling as Ivory Vows.

VIDEO INVITATIONS:

Give video products a more cinematic appearance.

Use a poster image, play button and video duration.

Clicking a video should open a suitable video viewer/modal.

PHYSICAL CARDS:

This category will eventually contain 40+ physical wedding cards.

Create a catalogue-style grid with:

- image

- title

- price

- view details

- optional filters/sorting

- pagination or Load More

Make sure adding the 41st, 50th or 100th card does not require changing the UI code.

RESPONSIVE:

The website must work properly on desktop, tablet and mobile.

FUNCTIONALITY:

Preserve useful existing functionality from Ivory Vows such as:

- navigation

- responsive mobile menu

- product/category modals

- product details

- WhatsApp enquiry

- contact/enquiry functionality

- animations

- smooth scrolling

However, redesign the visual presentation for SHUBHPATRA.

IMPORTANT:

First inspect the uploaded Ivory Vows codebase and understand its existing structure.

Then create a separate SHUBHPATRA implementation.

Do not blindly rewrite everything.

Reuse stable functionality where appropriate while creating a new visual identity.

Build the website in a clean, maintainable way so I can continue adding real wedding card designs, stationery designs, videos and physical cards later.   Use https://ivoryvows.in/ as the reference website. Please inspect its design, layout, interactions, product/category structure and responsive behavior. I want to create a separate SHUBHPATRA website using the existing website as a technical and functional reference, but with a completely distinct SHUBHPATRA visual identity. Do not modify or replace the original Ivory Vows website.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://shubhpatra.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ee36d34-6cc1-45a9-94ca-0041f4968338).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
# TheShubhmilan

## Product database

The `/admin` page manages products in MongoDB through Mongoose. For local development, copy `.env.example` to `.env.local` and set the following server-only variable. For production, add this variable in your Node-compatible hosting provider's environment settings.

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

Run `npm run dev` and visit `/admin` to add, edit, or delete database products. If an image URL is left empty, the app stores a temporary Unsplash image URL.

The admin login uses `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` from `.env.local`. Set all three values locally and in production. Product management requests require the signed admin session; public pages only read active products.
