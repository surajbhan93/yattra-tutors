import localFont from "next/font/local";

export const lora = localFont({
  src: [
    { path: "../fonts/lora/lora-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/lora/lora-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/lora/lora-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/lora/lora-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/lora/lora-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/lora/lora-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/lora/lora-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/lora/lora-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-lora",
  display: "swap",
});

export const dmSans = localFont({
  src: [
    { path: "../fonts/dm-sans/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-sans/dm-sans-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/dm-sans/dm-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/dm-sans/dm-sans-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/dm-sans/dm-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/dm-sans/dm-sans-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/dm-sans/dm-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/dm-sans/dm-sans-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display/playfair-display-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/playfair-display/playfair-display-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});
