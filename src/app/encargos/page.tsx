import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Phone, AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import CommissionsForm from "@/components/forms/CommissionsForm";

export const metadata: Metadata = { title: "Encargos" };

type Precios = {
  fuente: string;
  moneda: string;
  contacto_reservas: { nombre: string; telefono: string };
  rangos: { minimo: number; maximo: number };
  piedras_pequenas: number;
  piezas: { ref: string; precio: number }[];
  leyenda_referencias: Record<string, string>;
};

async function loadPrecios(): Promise<Precios> {
  const txt = await fs.readFile(path.join(process.cwd(), "public", "data", "precios.json"), "utf-8");
  return JSON.parse(txt);
}

function ComHeader() {
  const t = useTranslations("commissions");
  return (
    <>
      <p className="kicker mb-2">Archivo personal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("lead")}</p>
    </>
  );
}

export default async function CommissionsPage() {
  const precios = await loadPrecios();
  const ordenadas = [...precios.piezas].sort((a, b) => b.precio - a.precio);
  const t = await getTranslations("commissions");

  return (
    <section className="section">
      <div className="container-page max-w-4xl">
        <ComHeader />

        <div className="card mt-6 grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <p className="kicker mb-1" style={{ color: "var(--pel-warm)" }}>Reservas y encargos</p>
            <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.4rem" }}>
              {precios.contacto_reservas.nombre}
            </p>
            <p className="lead" style={{ fontSize: "0.95rem" }}>
              Las piezas se reservan llamando directamente. El formulario de abajo es opcional, para registrar la solicitud por escrito.
            </p>
          </div>
          <a
            href={`tel:${precios.contacto_reservas.telefono.replace(/\s/g, "")}`}
            className="btn btn-primary justify-center"
            style={{ fontSize: "1.05rem" }}
          >
            <Phone size={16} /> {precios.contacto_reservas.telefono}
          </a>
        </div>

        <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>
          {t("preciosTitle")}
        </h2>
        <p className="lead mt-2" style={{ fontSize: "0.95rem" }}>{t("preciosNota")}</p>
        <p className="text-xs mt-1" style={{ color: "var(--pel-muted)" }}>Fuente: {precios.fuente}.</p>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="card text-center">
            <p className="kicker">Mínimo</p>
            <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.6rem" }}>{precios.rangos.minimo} €</p>
          </div>
          <div className="card text-center">
            <p className="kicker">Máximo</p>
            <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.6rem" }}>{precios.rangos.maximo} €</p>
          </div>
          <div className="card text-center">
            <p className="kicker">Piedras pequeñas</p>
            <p style={{ color: "var(--pel-warm)", fontWeight: 700, fontSize: "1.6rem" }}>{precios.piedras_pequenas} €</p>
          </div>
        </div>

        <div className="card mt-4 p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--pel-green-4)", color: "var(--pel-green)" }}>
                <th className="text-left p-2">Referencia</th>
                <th className="text-left p-2">Familia</th>
                <th className="text-right p-2">Precio (€)</th>
              </tr>
            </thead>
            <tbody>
              {ordenadas.map((p) => {
                const familia = p.ref.match(/^[A-Z]+/)?.[0] ?? "";
                const desc = precios.leyenda_referencias[familia] ?? "";
                return (
                  <tr key={p.ref} style={{ borderTop: "1px solid var(--pel-border)" }}>
                    <td className="p-2" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--pel-warm)" }}>
                      {p.ref}
                    </td>
                    <td className="p-2" style={{ color: "var(--pel-ink-soft)" }}>{desc}</td>
                    <td className="p-2 text-right" style={{ fontWeight: 700, color: "var(--pel-green)" }}>{p.precio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs flex items-center gap-1" style={{ color: "var(--pel-muted)" }}>
          <AlertCircle size={12} /> Las claves de familia (S, B, C, P, etc.) son provisionales; pendientes de confirmar con el autor.
        </p>

        <h2 className="text-2xl font-bold mt-12" style={{ color: "var(--pel-green)" }}>
          Solicitud por escrito
        </h2>
        <CommissionsForm />

        <p className="mt-6 text-sm" style={{ color: "var(--pel-muted)" }}>
          Tus datos solo se usan para responder a tu solicitud. No se almacenan en bases de datos públicas.
        </p>
      </div>
    </section>
  );
}
