import type { Metadata } from "next";
import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import { Hammer, Leaf, Mountain, ArrowUpRight } from "lucide-react";

import DomingoBubbles from "@/components/ui/DomingoBubbles";
import Timeline, { type TimelineItem } from "@/components/biografia/Timeline";

export const metadata: Metadata = { title: "Biografía" };

type CronologiaEntry = TimelineItem & {
  incierto?: boolean;
};

type Bio = {
  nombre: string;
  nombre_completo?: string;
  lugar: string;
  datos_publicos?: {
    lugar_nacimiento?: string;
    anho_nacimiento?: number;
    fecha_nacimiento_completa?: string;
  };
  cronologia: CronologiaEntry[];
};

async function loadBio(): Promise<Bio> {
  const txt = await fs.readFile(
    path.join(process.cwd(), "public", "data", "biografia.json"),
    "utf-8"
  );
  return JSON.parse(txt);
}

export default async function BiografiaPage() {
  const bio = await loadBio();
  const t = await getTranslations("biografia");

  const hitos = bio.cronologia
    .filter((h) => h.incierto !== true)
    .sort((a, b) => a.anho - b.anho);

  const nombre = bio.nombre_completo ?? bio.nombre;
  const lugarNac = bio.datos_publicos?.lugar_nacimiento ?? "Pajares (Lena)";
  const anhoNac = bio.datos_publicos?.anho_nacimiento ?? 1959;

  const facetas = [
    { id: "escultor", Icon: Hammer, label: t("facetas.escultor") },
    { id: "micologo", Icon: Leaf, label: t("facetas.micologo") },
    { id: "naturalista", Icon: Mountain, label: t("facetas.naturalista") },
  ];

  const enlaces = [
    { href: "/exposicion", label: "Arte paleolítico" },
    { href: "/encargos", label: "Encargos" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <section className="section relative overflow-hidden">
      <DomingoBubbles theme="mixed" count={18} giant />
      <div className="container-page max-w-4xl relative" style={{ zIndex: 2 }}>
        {/* Hero */}
        <header>
          <p className="kicker mb-2">{t("titulo")}</p>
          <h1 className="headline">{nombre}</h1>
          <div className="h-divider" />
          <p
            className="lead text-lg mt-4"
            style={{ color: "var(--pel-ink)" }}
          >
            {t("subtitulo", { lugar: lugarNac, anho: String(anhoNac) })}
          </p>
          <p className="lead mt-3">{t("intro")}</p>

          {/* Facetas con icono */}
          <ul className="flex flex-wrap gap-2 mt-5" aria-label="Facetas">
            {facetas.map(({ id, Icon, label }) => (
              <li
                key={id}
                className="inline-flex items-center gap-2"
                style={{
                  background: "var(--pel-green-4)",
                  color: "var(--pel-green)",
                  border: "1px solid var(--pel-green-3)",
                  padding: "0.4rem 0.85rem",
                  borderRadius: 999,
                  fontSize: "0.88rem",
                  fontWeight: 600,
                }}
              >
                <Icon size={16} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </header>

        {/* Timeline */}
        <section className="mt-12" aria-labelledby="timeline-titulo">
          <h2
            id="timeline-titulo"
            className="text-2xl font-bold"
            style={{ color: "var(--pel-green)" }}
          >
            {t("timeline_titulo")}
          </h2>
          <p
            className="mt-1"
            style={{ color: "var(--pel-muted)", fontSize: "0.88rem" }}
          >
            {hitos.length} hitos documentados.
          </p>
          <Timeline items={hitos} />
        </section>

        {/* Para saber más */}
        <section className="mt-16" aria-labelledby="saber-mas-titulo">
          <h2
            id="saber-mas-titulo"
            className="text-2xl font-bold"
            style={{ color: "var(--pel-green)" }}
          >
            {t("para_saber_mas_titulo")}
          </h2>
          <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>
            {t("para_saber_mas_intro")}
          </p>
          <div className="grid gap-3 mt-4 sm:grid-cols-3">
            {enlaces.map((e) => (
              <Link key={e.href} href={e.href} className="card group">
                <div className="flex items-center justify-between gap-2">
                  <span
                    style={{
                      color: "var(--pel-green)",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {e.label}
                  </span>
                  <ArrowUpRight
                    size={18}
                    style={{ color: "var(--pel-warm)" }}
                    aria-hidden
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
