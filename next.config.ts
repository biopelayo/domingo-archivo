import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "domingo-archivo";
const basePath = isPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  // En GitHub Pages el sitio cuelga de /domingo-archivo
  basePath,
  assetPrefix: isPages ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    // Exponemos el basePath al cliente para que el helper withBasePath()
    // resuelva correctamente las rutas absolutas de imágenes que viven en
    // /public (catalog.json contiene rutas tipo "/images/...").
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withNextIntl(nextConfig);
