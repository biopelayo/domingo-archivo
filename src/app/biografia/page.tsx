import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";

import DomingoBubbles from "@/components/ui/DomingoBubbles";

export const metadata: Metadata = { title: "Biografía" };

type Bio = {
  nombre: string;
  lugar: string;
  tagline: string;
  fuente_tagline: string;
  facetas: { id: string; titulo: string; descripcion: string }[];
  contacto_artistico: { responsable: string; telefono: string; rol: string };
  heraldica: {
    paterno: { apellido: string; fuente_imagen: string };
    materno: { apellido: string; nota: string };
    linea_pelayo: { apellido: string; fuente_imagen: string };
  };
};

async function loadBio(): Promise<Bio> {
  const txt = await fs.readFile(
    path.join(process.cwd(), "public", "data", "biografia.json"),
    "utf-8"
  );
  return JSON.parse(txt);
}

async function listProfilePhotos(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), "public", "personal", "perfil");
    const entries = await fs.readdir(dir);
    return entries
      .filter((f) => /\.jpe?g$/i.test(f))
      .sort()
      .slice(0, 12)
      .map((f) => `/personal/perfil/${f}`);
  } catch {
    return [];
  }
}

function BioHeader() {
  const t = useTranslations("biografia");
  return (
    <>
      <p className="kicker mb-2">Archivo personal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

export default async function BiografiaPage() {
  const bio = await loadBio();
  const photos = await listProfilePhotos();

  return (
    <section className="section relative overflow-hidden">
      <DomingoBubbles theme="mixed" count={22} giant />
      <div className="container-page max-w-5xl relative" style={{ zIndex: 2 }}>
        <BioHeader />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <p className="lead text-xl" style={{ color: "var(--pel-ink)" }}>
              <strong>{bio.nombre}</strong> — {bio.lugar}.
            </p>
            <p className="lead mt-3" style={{ fontSize: "1.05rem" }}>
              <em>«{bio.tagline}»</em>
            </p>
            <p className="text-xs mt-2" style={{ color: "var(--pel-muted)" }}>
              {bio.fuente_tagline}
            </p>
          </div>
          <div className="card">
            <p className="kicker mb-2">Contacto artístico</p>
            <p className="text-lg" style={{ fontWeight: 700, color: "var(--pel-green)" }}>
              {bio.contacto_artistico.responsable}
            </p>
            <p style={{ color: "var(--pel-ink-soft)", fontSize: "0.9rem" }}>
              {bio.contacto_artistico.rol}
            </p>
            <p className="mt-2 text-lg">
              <a href={`tel:${bio.contacto_artistico.telefono.replace(/\s/g, "")}`}>
                {bio.contacto_artistico.telefono}
              </a>
            </p>
            <Link href="/encargos" className="btn btn-ghost mt-4 inline-flex" style={{ fontSize: "0.85rem" }}>
              Ir al formulario de encargos
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>Cinco facetas</h2>
        <div className="grid gap-4 mt-4 sm:grid-cols-2">
          {bio.facetas.map((f) => (
            <div key={f.id} className="card">
              <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Faceta</p>
              <h3 style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.1rem" }}>{f.titulo}</h3>
              <p className="lead mt-2" style={{ fontSize: "0.92rem" }}>{f.descripcion}</p>
            </div>
          ))}
        </div>

        {photos.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>Galería personal</h2>
            <p className="lead mt-2" style={{ fontSize: "0.92rem" }}>
              Fotografías procedentes del perfil web archivado.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {photos.map((src, i) => (
                <div key={src} className="card p-0 overflow-hidden" style={{ aspectRatio: "1", borderRadius: 12 }}>
                  <Image
                    src={src}
                    alt={`Fotografía personal ${i + 1}`}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 50vw, 25vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>Heráldica familiar</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="card text-center">
            <Image
              src={bio.heraldica.paterno.fuente_imagen}
              alt={`Escudo ${bio.heraldica.paterno.apellido}`}
              width={140}
              height={170}
              style={{ width: 140, height: "auto", margin: "0 auto" }}
            />
            <p className="kicker mt-3">Paterno</p>
            <p style={{ fontWeight: 700 }}>{bio.heraldica.paterno.apellido}</p>
          </div>
          <div className="card text-center">
            <div style={{ height: 170, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--pel-muted)" }}>
              (sin escudo en el archivo)
            </div>
            <p className="kicker mt-3">Materno</p>
            <p style={{ fontWeight: 700 }}>{bio.heraldica.materno.apellido}</p>
            <p className="text-xs mt-1" style={{ color: "var(--pel-muted)" }}>{bio.heraldica.materno.nota}</p>
          </div>
          <div className="card text-center">
            <Image
              src={bio.heraldica.linea_pelayo.fuente_imagen}
              alt={`Escudo ${bio.heraldica.linea_pelayo.apellido}`}
              width={140}
              height={170}
              style={{ width: 140, height: "auto", margin: "0 auto" }}
            />
            <p className="kicker mt-3">Línea materna del editor</p>
            <p style={{ fontWeight: 700 }}>{bio.heraldica.linea_pelayo.apellido}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
