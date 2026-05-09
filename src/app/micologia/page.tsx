import type { Metadata } from "next";
import Image from "next/image";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Download, Calendar, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

import DomingoBubbles from "@/components/ui/DomingoBubbles";

export const metadata: Metadata = { title: "Micología y docencia" };

const CURSOS = [
  { ano: 2013, lugar: "Oviedo", material: "Libreto «Iniciación a la micología» (PDF)" },
  { ano: 2014, lugar: "Oviedo (San Claudio)", material: "Carteles, contenido del programa, fichas de setas, NOTAS" },
  { ano: 2015, lugar: "Oviedo", material: "Cartel curso 2015" },
];

async function listSetas(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), "public", "micologia", "setas");
    const files = await fs.readdir(dir);
    return files.filter((f) => /\.jpe?g$/i.test(f)).sort().map((f) => `/micologia/setas/${f}`);
  } catch {
    return [];
  }
}

function MicHeader() {
  const t = useTranslations("micologia");
  return (
    <>
      <p className="kicker mb-2">Archivo personal · setas</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default async function MicologiaPage() {
  const setas = await listSetas();
  return (
    <section className="section relative overflow-hidden">
      <DomingoBubbles theme="mushroom" count={26} giant />
      <div className="container-page max-w-5xl relative" style={{ zIndex: 2 }}>
        <MicHeader />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 card">
            <div className="flex items-center gap-2 mb-2" style={{ color: "var(--pel-warm)" }}>
              <BookOpen size={18} /> <span className="kicker" style={{ color: "var(--pel-warm)" }}>Libreto</span>
            </div>
            <h2 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.3rem" }}>
              «Iniciación a la micología»
            </h2>
            <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
              30+ páginas: clasificación de hongos, partes del carpóforo, especies comestibles, especies tóxicas, claves de búsqueda y degustación. Autor: Domingo González de Lena Díaz, 2013.
            </p>
            <p className="mt-3 text-sm" style={{ color: "var(--pel-ink-soft)" }}>
              Subtítulo del propio libreto: «Algunas claves para la búsqueda, recolección, reconocimiento y degustación de las setas».
            </p>
            <a
              href="/micologia/libreto-iniciacion-micologia.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-5 inline-flex"
            >
              <Download size={16} /> Descargar PDF
            </a>
          </div>
          <div className="card">
            <Image
              src="/micologia/libreto-portada.jpg"
              alt="Portada del libreto"
              width={400}
              height={560}
              style={{ width: "100%", height: "auto", borderRadius: 8 }}
            />
            <p className="text-xs text-center mt-2" style={{ color: "var(--pel-muted)" }}>
              Portada original
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>Cursos impartidos</h2>
        <ul className="grid sm:grid-cols-3 gap-4 mt-4">
          {CURSOS.map((c) => (
            <li key={c.ano} className="card">
              <div className="flex items-center gap-2 mb-1" style={{ color: "var(--pel-warm)" }}>
                <Calendar size={16} /> <span className="kicker" style={{ color: "var(--pel-warm)" }}>Curso</span>
              </div>
              <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "2rem" }}>{c.ano}</p>
              <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.9rem" }}>{c.lugar}</p>
              <p className="text-sm mt-2" style={{ color: "var(--pel-ink-soft)" }}>{c.material}</p>
            </li>
          ))}
        </ul>

        {setas.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>Galería de setas</h2>
            <p className="lead mt-2" style={{ fontSize: "0.92rem" }}>
              {setas.length} fotografías de la colección de Domingo (subset de las 4500 imágenes en `02_Micologia/`).
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
              {setas.map((src, i) => (
                <div key={src} className="card p-0 overflow-hidden" style={{ aspectRatio: "1", borderRadius: 8 }}>
                  <Image
                    src={src}
                    alt={`Seta ${i + 1}`}
                    width={300}
                    height={300}
                    sizes="(max-width: 640px) 50vw, 20vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
