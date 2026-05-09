"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type PersonalPhoto = {
  slug: string;
  anho: number;
  carpeta_origen: string;
  src_1600: string;
  src_1600_webp: string;
  src_800: string;
  src_800_webp: string;
  src_400: string;
  src_400_webp: string;
  alt: string;
  categoria: string;
};

type Filtro = "todas" | "cronologica" | "campo" | "viajes";

const ETIQUETAS_CARPETA: Record<string, string> = {
  PELA_Napoles: "Nápoles, octubre de 2010",
  Pravia: "Pravia, septiembre de 2011",
  WeTransfer: "Encargo recibido, mayo de 2009",
};

export default function PersonalGalleryClient({ photos }: { photos: PersonalPhoto[] }) {
  const t = useTranslations("personalGallery");
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtradas = useMemo(() => {
    let lista = photos.slice();
    if (filtro === "campo") {
      lista = lista.filter((p) => p.carpeta_origen === "Pravia");
    } else if (filtro === "viajes") {
      lista = lista.filter((p) => p.categoria === "viajes");
    }
    if (filtro === "cronologica") {
      lista.sort((a, b) => a.anho - b.anho || a.slug.localeCompare(b.slug));
    }
    return lista;
  }, [photos, filtro]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? null : Math.min(filtradas.length - 1, i + 1)));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? null : Math.max(0, i - 1)));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, filtradas.length]);

  const open = openIndex !== null ? filtradas[openIndex] : null;

  const filtros: { id: Filtro; label: string }[] = [
    { id: "todas", label: t("filterAll") },
    { id: "cronologica", label: t("filterChrono") },
    { id: "campo", label: t("filterField") },
    { id: "viajes", label: t("filterTravel") },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className="btn"
              style={{
                background: filtro === f.id ? "var(--pel-green)" : "transparent",
                color: filtro === f.id ? "#fff" : "var(--pel-green)",
                border: "1px solid var(--pel-green)",
                padding: "0.45rem 0.95rem",
                fontSize: "0.85rem",
              }}
              aria-pressed={filtro === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="ml-auto text-sm" style={{ color: "var(--pel-muted)" }}>
          {filtradas.length} / {photos.length}
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {filtradas.map((p, idx) => (
          <button
            key={`${p.carpeta_origen}-${p.slug}`}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="card p-0 overflow-hidden block text-left relative"
            style={{ aspectRatio: "4/3", borderRadius: 12 }}
            aria-label={`${t("openImage")}: ${p.alt}`}
          >
            <Image
              src={p.src_400}
              alt={p.alt}
              width={400}
              height={300}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                padding: "8px 10px",
                color: "#fff",
                background: "linear-gradient(to top, rgba(0,0,0,.55), transparent)",
                fontSize: "0.78rem",
              }}
            >
              <span>{ETIQUETAS_CARPETA[p.carpeta_origen] ?? p.carpeta_origen}</span>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(15, 26, 20, 0.92)" }}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label={t("closeImage")}
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 p-2 rounded-full"
            style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}
          >
            <X size={22} />
          </button>
          <button
            type="button"
            aria-label={t("prev")}
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : Math.max(0, i - 1)));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full"
            style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : Math.min(filtradas.length - 1, i + 1)));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full"
            style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}
          >
            <ChevronRight size={22} />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] grid md:grid-cols-3 gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:col-span-2">
              <Image
                src={open.src_1600}
                alt={open.alt}
                width={1600}
                height={1200}
                sizes="(max-width: 1024px) 90vw, 1000px"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: 10,
                }}
                priority
              />
            </div>
            <div className="px-3 text-white text-sm">
              <p className="kicker" style={{ color: "var(--pel-warm)" }}>
                {ETIQUETAS_CARPETA[open.carpeta_origen] ?? open.carpeta_origen}
              </p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: 4 }}>
                {open.anho}
              </h2>
              <p style={{ opacity: 0.8, marginTop: 8, lineHeight: 1.45 }}>{open.alt}</p>
              <p className="mt-5 text-xs" style={{ opacity: 0.65 }}>
                {t("creditLine")}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
