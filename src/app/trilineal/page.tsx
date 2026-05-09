import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Proyecto Trilineal · ECoC 2031" };

const ENLACES = [
  { href: "/galeria/corpus", labelKey: "verGaleriaCorpus", body: "120 fotografías Fujifilm X-T4 sobre obra de Domingo." },
  { href: "/catalogo", labelKey: "verDashboard", body: "Cuántas piezas hay, en qué estado de catalogación están y cuáles ya están validadas." },
  { href: "/mapa", labelKey: "verMapa", body: "Yacimientos del concejo de Oviedo + UNESCO Asturias." },
  { href: "/investigacion", labelKey: "verInvestigacion", body: "Qué se está publicando ahora mismo en el mundo académico sobre arte paleolítico cantábrico, cierva trilineal y los yacimientos del Nalón." },
  { href: "/recursos", labelKey: "verRecursos", body: "Enlaces seleccionados, datasets, BibTeX." },
];

function TriHeader() {
  const t = useTranslations("trilineal");
  return (
    <>
      <p className="kicker mb-2">Capa institucional</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default function TrilinealPage() {
  const t = useTranslations("trilineal");
  return (
    <section className="section">
      <div className="container-page max-w-5xl">
        <TriHeader />

        <p className="lead mt-6" style={{ color: "var(--pel-ink)" }}>{t("intro")}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {ENLACES.map((e) => (
            <Link key={e.href} href={e.href} className="card group">
              <div className="flex items-start justify-between gap-3">
                <h3 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.05rem" }}>
                  {t(e.labelKey)}
                </h3>
                <ArrowRight size={18} style={{ color: "var(--pel-warm)", flexShrink: 0 }} />
              </div>
              <p className="lead mt-2" style={{ fontSize: "0.9rem" }}>{e.body}</p>
            </Link>
          ))}
        </div>

        <div className="card mt-10">
          <p className="kicker mb-2">Dossier institucional (Quarto)</p>
          <p className="lead" style={{ fontSize: "0.95rem" }}>
            Carta institucional, one-pager, dossier corto, dossier técnico, catálogo razonado, deck 12 slides y paper-like report en inglés. Compilan a HTML, PDF y revealjs desde fuentes versionables.
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--pel-muted)" }}>
            Repositorio: <code>D:\Antigravity\proyecto-domingo\01_dossier\</code>
          </p>
        </div>
      </div>
    </section>
  );
}
