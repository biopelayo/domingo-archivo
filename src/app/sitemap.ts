import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://biopelayo.github.io/domingo-archivo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/biografia",
    "/exposicion",
    "/micologia",
    "/escritos",
    "/musica",
    "/trilineal",
    "/galeria",
    "/catalogo",
    "/mapa",
    "/investigacion",
    "/recursos",
    "/encargos",
    "/contacto",
  ];
  return paths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1.0 : 0.7,
  }));
}
