import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "domingo-archivo";

const nextConfig: NextConfig = {
  output: "export",
  // En GitHub Pages el sitio cuelga de /domingo-archivo
  basePath: isPages ? `/${repoName}` : "",
  assetPrefix: isPages ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
