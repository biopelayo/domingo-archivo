"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight, Search } from "lucide-react";

type Piece = {
  id_pieza: string;
  archivo_master: string;
  fotografo: string;
  fecha_fotografia: string;
  resolucion_max_px: string;
  seccion: string;
  thumb: string;
  web: string;
  web_jpg: string;
  certeza: string;
  validacion_cientifica: string;
};

type Filter = "all" | "esc" | "otr";

export default function GalleryClient({ pieces }: { pieces: Piece[] }) {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return pieces.filter((p) => {
      if (filter === "esc" && p.seccion !== "1_ESCULTURAS") return false;
      if (filter === "otr" && p.seccion !== "2_OTRAS") return false;
      if (query) {
        const q = query.toLowerCase();
        if (!p.id_pieza.toLowerCase().includes(q) && !p.archivo_master.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [pieces, filter, query]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : Math.min(filtered.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? null : Math.max(0, i - 1)));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, filtered.length]);

  const open = openIndex !== null ? filtered[openIndex] : null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
          {(["all", "esc", "otr"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="btn"
              style={{
                background: filter === f ? "var(--pel-green)" : "transparent",
                color: filter === f ? "#fff" : "var(--pel-green)",
                border: `1px solid var(--pel-green)`,
                padding: "0.45rem 0.95rem",
                fontSize: "0.85rem",
              }}
              aria-pressed={filter === f}
            >
              {f === "all" ? t("filterAll") : f === "esc" ? t("filterEsc") : t("filterOtr")}
            </button>
          ))}
        </div>
        <div
          className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ border: "1px solid var(--pel-border)", background: "var(--pel-card)" }}
        >
          <Search size={16} style={{ color: "var(--pel-muted)" }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por ID o archivo…"
            className="bg-transparent outline-none text-sm"
            style={{ color: "var(--pel-ink)", minWidth: 200 }}
            aria-label="Buscar"
          />
        </div>
        <p className="ml-auto text-sm" style={{ color: "var(--pel-muted)" }}>
          {filtered.length} / {pieces.length}
        </p>
      </div>

      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {filtered.map((p, idx) => (
          <button
            key={p.id_pieza}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="card p-0 overflow-hidden group block text-left relative"
            style={{ aspectRatio: "2/3", borderRadius: 12 }}
            aria-label={`${t("openImage")} — ${p.id_pieza}`}
          >
            {p.thumb ? (
              <Image
                src={p.thumb}
                alt={p.id_pieza}
                width={267}
                height={400}
                sizes="(max-width: 640px) 50vw, 200px"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 320ms ease" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "var(--pel-green-4)" }} />
            )}
            <div
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ bottom: 0, left: 0, right: 0, padding: "8px 10px", color: "#fff", background: "linear-gradient(to top, rgba(0,0,0,.55), transparent)" }}
            >
              <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{p.id_pieza}</span>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.id_pieza}
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
            aria-label="Anterior"
            onClick={(e) => { e.stopPropagation(); setOpenIndex((i) => i === null ? null : Math.max(0, i - 1)); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full"
            style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={(e) => { e.stopPropagation(); setOpenIndex((i) => i === null ? null : Math.min(filtered.length - 1, i + 1)); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full"
            style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}
          >
            <ChevronRight size={22} />
          </button>
          <div className="max-w-5xl max-h-[90vh] grid md:grid-cols-3 gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="md:col-span-2">
              {open.web ? (
                <Image
                  src={open.web}
                  alt={open.id_pieza}
                  width={534}
                  height={800}
                  style={{ width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain", borderRadius: 10 }}
                  priority
                />
              ) : null}
            </div>
            <div className="px-3 text-white text-sm">
              <p className="kicker" style={{ color: "var(--pel-warm)" }}>{open.seccion === "1_ESCULTURAS" ? "Escultura" : "Otra pieza"}</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: 4 }}>{open.id_pieza}</h2>
              <p style={{ opacity: 0.7, marginTop: 4 }}>{open.archivo_master}</p>
              <ul className="space-y-1 mt-4" style={{ opacity: 0.92 }}>
                <li><strong>Fotografía:</strong> {open.fotografo || "—"}</li>
                <li><strong>Fecha foto:</strong> {open.fecha_fotografia || "—"}</li>
                <li><strong>Resolución:</strong> {open.resolucion_max_px} px</li>
                <li><strong>Certeza:</strong> {open.certeza || "pendiente"}</li>
                <li><strong>Validación:</strong> {open.validacion_cientifica}</li>
              </ul>
              <p className="mt-5 text-xs" style={{ opacity: 0.65 }}>
                Crédito: Reproducción · Domingo González de Lena Díaz. Fotografía · Amanda C. Blanco. 2026.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
