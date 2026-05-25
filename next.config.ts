import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Dominio propio: paleotxomi.com (GitHub Pages con CNAME).
// El sitio se sirve desde la raíz del dominio, sin basePath.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    // El helper withBasePath() lo lee; con dominio propio queda vacío.
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default withNextIntl(nextConfig);
