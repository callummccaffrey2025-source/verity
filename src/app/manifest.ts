import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Verity",
    short_name: "Verity",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#10b981",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
