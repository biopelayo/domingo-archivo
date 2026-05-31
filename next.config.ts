import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Servido en GitHub Pages bajo subpath /domingo-archivo (sin dominio propio).
// El sitio vive en https://biopelayo.github.io/domingo-archivo/.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/domingo-archivo",
  assetPrefix: "/domingo-archivo",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/domingo-archivo",
  },
};

export default withNextIntl(nextConfig);
