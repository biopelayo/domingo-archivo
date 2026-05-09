import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, Building2, Calendar, BookOpen, AlertTriangle, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  loadAllQueries,
  authorList,
  workUrl,
  searchUrl,
  type QueryBundle,
} from "@/lib/openalex";

import YearChart from "@/components/research/YearChart";
import OaSplit from "@/components/research/OaSplit";

export const metadata: Metadata = {
  title: "Qué se publica sobre estos temas",
  description:
    "Una mirada en directo a la investigación académica sobre arte paleolítico cantábrico, cierva trilineal y los yacimientos del Nalón.",
};

// Export estático: los datos de OpenAlex se descargan en build time.
// El próximo refresh llega cuando se ejecute el workflow de GitHub Actions
// (cron semanal o push a main).

function ResearchHeader() {
  const t = useTranslations("research");
  return (
    <>
      <p className="kicker mb-2">Investigación</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

function ComoFunciona() {
  const t = useTranslations("research");
  return (
    <div className="card mt-6">
      <div className="flex items-center gap-2 mb-2">
        <Search size={18} style={{ color: "var(--pel-warm)" }} />
        <p className="kicker" style={{ color: "var(--pel-warm)" }}>{t("comoFuncionaTitle")}</p>
      </div>
      <p className="lead" style={{ fontSize: "0.95rem" }}>{t("comoFuncionaBody")}</p>
      <p className="lead mt-3" style={{ fontSize: "0.92rem", color: "var(--pel-ink-soft)" }}>
        {t("methodNote")}
      </p>
    </div>
  );
}

function QuerySection({ bundle }: { bundle: QueryBundle }) {
  const { query, total, topWorks, byYear, topInstitutions, oaSplit, error } = bundle;
  return (
    <article className="space-y-4 pt-10 border-t" style={{ borderColor: "var(--pel-border)" }}>
      <header>
        <p className="kicker" style={{ color: "var(--pel-warm)" }}>Búsqueda</p>
        <h2 className="text-2xl font-bold" style={{ color: "var(--pel-green)" }}>
          {query.label}
        </h2>
        {query.description && (
          <p className="lead text-sm mt-1" style={{ color: "var(--pel-ink-soft)" }}>{query.description}</p>
        )}
        <details className="mt-2 text-xs">
          <summary style={{ color: "var(--pel-muted)", cursor: "pointer" }}>
            Ver palabras de la búsqueda
          </summary>
          <code
            className="inline-block mt-2 px-2 py-1 rounded"
            style={{ background: "var(--pel-green-4)", color: "var(--pel-green)" }}
          >
            {query.search}
          </code>
        </details>
      </header>

      {error ? (
        <div className="card flex items-start gap-2" style={{ color: "#B5341E" }}>
          <AlertTriangle size={16} className="mt-0.5" />
          <div>
            <p className="font-bold">OpenAlex no respondió a esta búsqueda.</p>
            <p className="text-xs" style={{ color: "var(--pel-muted)" }}>
              Vuelve a cargar la página dentro de un par de minutos.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="card">
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--pel-warm)" }}>
                <FileText size={16} /> <span style={{ fontWeight: 600 }}>Artículos encontrados</span>
              </div>
              <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "2rem", lineHeight: 1.05 }}>
                {total.toLocaleString("es-ES")}
              </p>
              <a
                href={searchUrl(query)}
                target="_blank"
                rel="noreferrer"
                className="text-xs"
                style={{ color: "var(--pel-green)" }}
              >
                Ver la búsqueda en OpenAlex <ExternalLink size={11} className="inline" />
              </a>
            </div>
            <div className="card md:col-span-1">
              <div className="flex items-center gap-2 text-sm mb-2" style={{ color: "var(--pel-warm)" }}>
                <Calendar size={16} /> <span style={{ fontWeight: 600 }}>Cuándo se publican</span>
              </div>
              <YearChart data={byYear} />
            </div>
            <div className="card md:col-span-1">
              <div className="flex items-center gap-2 text-sm mb-2" style={{ color: "var(--pel-warm)" }}>
                <BookOpen size={16} /> <span style={{ fontWeight: 600 }}>¿Se pueden leer gratis?</span>
              </div>
              <OaSplit data={oaSplit} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "var(--pel-warm)" }}>
                <FileText size={16} /> <span style={{ fontWeight: 600 }}>Los seis artículos más citados</span>
              </div>
              <ol className="space-y-3">
                {topWorks.length === 0 && <li className="text-sm" style={{ color: "var(--pel-muted)" }}>Sin resultados.</li>}
                {topWorks.map((w) => {
                  const u = workUrl(w);
                  const title = w.display_name || w.title || w.id;
                  const journal = w.primary_location?.source?.display_name;
                  return (
                    <li key={w.id} className="text-sm">
                      <p style={{ color: "var(--pel-green)", fontWeight: 600 }}>
                        {u ? (
                          <a href={u} target="_blank" rel="noreferrer">{title}</a>
                        ) : (
                          title
                        )}
                      </p>
                      <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.82rem", marginTop: 2 }}>
                        {authorList(w)} {w.publication_year ? `· ${w.publication_year}` : ""}
                        {journal ? ` · ${journal}` : ""}
                      </p>
                      <p style={{ color: "var(--pel-muted)", fontSize: "0.78rem", marginTop: 1 }}>
                        Citas: {w.cited_by_count?.toLocaleString("es-ES") ?? 0}
                        {w.open_access?.is_oa ? " · acceso libre" : ""}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "var(--pel-warm)" }}>
                <Building2 size={16} /> <span style={{ fontWeight: 600 }}>Universidades y centros que más publican</span>
              </div>
              <ol className="space-y-2">
                {topInstitutions.length === 0 && <li className="text-sm" style={{ color: "var(--pel-muted)" }}>Sin datos.</li>}
                {topInstitutions.map((inst, i) => (
                  <li key={inst.name + i} className="text-sm flex justify-between gap-2">
                    <span style={{ color: "var(--pel-ink-soft)" }}>
                      <span style={{ color: "var(--pel-warm)", fontWeight: 700, marginRight: 6 }}>{i + 1}.</span>
                      {inst.name}
                    </span>
                    <span style={{ color: "var(--pel-green)", fontWeight: 700 }}>{inst.works}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default async function ResearchPage() {
  const bundles = await loadAllQueries();
  const updated = new Date();
  return (
    <section className="section">
      <div className="container-page">
        <ResearchHeader />
        <ComoFunciona />

        <p className="text-xs mt-4" style={{ color: "var(--pel-muted)" }}>
          Estos datos se vuelven a pedir a OpenAlex automáticamente cada 24 horas. Última carga: {updated.toLocaleString("es-ES")}.
        </p>

        <div className="mt-8 space-y-12">
          {bundles.map((b) => (
            <QuerySection key={b.query.id} bundle={b} />
          ))}
        </div>

        <div className="mt-16">
          <p className="kicker mb-2">Y de aquí a dónde</p>
          <ul className="lead space-y-2 list-disc pl-6">
            <li>Cuando salga un artículo nuevo en alguno de estos temas, aparecerá aquí solo, sin tocar nada.</li>
            <li>Si quieres leer alguno, pincha en el título: te llevará al PDF abierto si lo hay, o a su DOI.</li>
            <li>Para guardar la bibliografía completa en Zotero, ve a la página de recursos.</li>
          </ul>
          <p className="mt-6">
            <Link href="/recursos" className="btn btn-ghost">Ir a recursos curados</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
