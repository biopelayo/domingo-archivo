import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";

import CorpusDashboard from "@/components/dashboard/CorpusDashboard";

export const metadata: Metadata = { title: "Cifras del corpus" };

async function loadJson(name: string) {
  const file = path.join(process.cwd(), "public", "data", name);
  return JSON.parse(await fs.readFile(file, "utf-8"));
}

function CatalogHeader() {
  const t = useTranslations("catalog");
  return (
    <>
      <p className="kicker mb-2">Trilineal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default async function CatalogPage() {
  const [pieces, kpis] = await Promise.all([loadJson("catalog.json"), loadJson("kpis.json")]);
  return (
    <section className="section">
      <div className="container-page">
        <CatalogHeader />
        <div className="mt-8">
          <CorpusDashboard pieces={pieces} kpis={kpis} />
        </div>
      </div>
    </section>
  );
}
