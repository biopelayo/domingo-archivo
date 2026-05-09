import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import { Calendar, FileText } from "lucide-react";

export const metadata: Metadata = { title: "Escritos" };

type Escrito = {
  id: string;
  titulo: string;
  fecha: string;
  tags: string[];
  extracto: string;
  fuente_original: string;
};

async function loadEscritos(): Promise<Escrito[]> {
  const txt = await fs.readFile(path.join(process.cwd(), "public", "data", "escritos.json"), "utf-8");
  return JSON.parse(txt);
}

function EscritosHeader() {
  const t = useTranslations("escritos");
  return (
    <>
      <p className="kicker mb-2">Archivo personal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default async function EscritosPage() {
  const list = await loadEscritos();
  const sorted = list.sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <section className="section">
      <div className="container-page max-w-4xl">
        <EscritosHeader />

        <div className="space-y-4 mt-8">
          {sorted.map((e) => (
            <article key={e.id} className="card">
              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: "var(--pel-warm)" }}>
                <Calendar size={14} /> <span style={{ fontWeight: 600 }}>{e.fecha}</span>
              </div>
              <h2 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.2rem" }}>{e.titulo}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {e.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "var(--pel-green-4)", color: "var(--pel-green)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote
                className="mt-3 pl-4"
                style={{ borderLeft: "3px solid var(--pel-warm)", color: "var(--pel-ink-soft)", fontStyle: "italic" }}
              >
                {e.extracto}
              </blockquote>
              <p className="text-xs mt-3 flex items-center gap-1" style={{ color: "var(--pel-muted)" }}>
                <FileText size={12} /> Fuente: <code>{e.fuente_original}</code>
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm" style={{ color: "var(--pel-muted)" }}>
          Los documentos originales (.docx, .pptx) están en el archivo personal `E:\Domingo_Organizado\06_Documentos_Personales\Filosofia_y_Trabajos\` y `Papa_Arte_Piedras\EXPOSICIÓN\`. Para publicación pública se convertirán a PDF en una pasada posterior, con revisión del autor.
        </p>
      </div>
    </section>
  );
}
