import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import NalonMap from "@/components/map/NalonMap";

export const metadata: Metadata = { title: "Mapa del Nalón ovetense" };

function MapHeader() {
  const t = useTranslations("map");
  return (
    <>
      <p className="kicker mb-2">Trilineal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default function MapPage() {
  return (
    <section className="section">
      <div className="container-page">
        <MapHeader />
        <div className="mt-8 card p-2">
          <NalonMap />
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-green)" }}>Yacimientos del Nalón ovetense</p>
            <p style={{ color: "var(--pel-ink-soft)" }}>La Lluera (San Juan de Priorio) y La Viña (Manzaneda).</p>
          </div>
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-green-2)" }}>Cuevas UNESCO Asturias</p>
            <p style={{ color: "var(--pel-ink-soft)" }}>Tito Bustillo, Candamo, El Pindal, Llonín, Covaciella.</p>
          </div>
          <div className="card">
            <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Oviedo / Uviéu</p>
            <p style={{ color: "var(--pel-ink-soft)" }}>Referencia urbana del proyecto.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
