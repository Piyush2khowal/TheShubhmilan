# Client assets

Drop the client's real files here, then reference them from `src/data/products.ts`
as plain strings (no import needed for files in `public/`):

```
public/assets/logo/            -> "/assets/logo/shubhpatra.png"
public/assets/digital/         -> "/assets/digital/dig-001.jpg"
public/assets/stationery/      -> "/assets/stationery/sta-001.jpg"
public/assets/physical-cards/  -> "/assets/physical-cards/pc-001.jpg"
public/assets/videos/          -> "/assets/videos/video-001.mp4"
public/assets/videos/posters/  -> "/assets/videos/posters/video-001.jpg"
```

Vertical (9:16) invitation videos are supported — the player keeps the real
aspect ratio; the grid thumbnail stays 1:1.
