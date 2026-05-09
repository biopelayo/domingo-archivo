import type { Metadata } from "next";
import { Download, Music } from "lucide-react";
import { useTranslations } from "next-intl";

export const metadata: Metadata = { title: "Música" };

const PARTITURAS = [
  {
    titulo: "Cuando te vín la fonte",
    file: "/personal/musica/cuando-te-vi-la-fonte.mscz",
    nota: "Canción tradicional asturiana. Partitura editada en MuseScore por Domingo, 2014.",
  },
  {
    titulo: "No vengas a deshora galán a verme",
    file: "/personal/musica/no-vengas-a-deshora-galan.mscz",
    nota: "Canción tradicional asturiana. Partitura editada en MuseScore por Domingo, 2014.",
  },
];

function MusHeader() {
  const t = useTranslations("musica");
  return (
    <>
      <p className="kicker mb-2">Archivo personal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default function MusicaPage() {
  const t = useTranslations("musica");
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <MusHeader />

        <ul className="space-y-4 mt-8">
          {PARTITURAS.map((p) => (
            <li key={p.titulo} className="card">
              <div className="flex items-start gap-3">
                <Music size={22} style={{ color: "var(--pel-warm)", marginTop: 4, flexShrink: 0 }} />
                <div className="flex-1">
                  <h2 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.15rem" }}>{p.titulo}</h2>
                  <p className="lead mt-2" style={{ fontSize: "0.92rem" }}>{p.nota}</p>
                  <a href={p.file} download className="btn btn-ghost mt-3 inline-flex" style={{ fontSize: "0.85rem" }}>
                    <Download size={14} /> {t("downloadMscz")}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm" style={{ color: "var(--pel-muted)" }}>
          {t("playerNota")}
        </p>

        <div className="card mt-8">
          <p className="kicker mb-2">{t("presentacionTitle")}</p>
          <p className="lead" style={{ fontSize: "0.95rem" }}>{t("presentacionBody")}</p>
        </div>
      </div>
    </section>
  );
}
