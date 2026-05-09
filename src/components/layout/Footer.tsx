import Link from "next/link";
import { useTranslations } from "next-intl";

import LogoMark from "@/components/ui/LogoMark";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-16"
      style={{
        background: "var(--pel-card)",
        borderTop: "1px solid var(--pel-border)",
      }}
    >
      <div className="container-page py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <LogoMark size={42} />
            <div>
              <p style={{ color: "var(--pel-green)", fontWeight: 700, fontSize: "1.05rem" }}>
                Domingo González de Lena Díaz
              </p>
              <p style={{ color: "var(--pel-muted)", fontSize: "0.8rem" }}>
                Archivo personal
              </p>
            </div>
          </div>
          <p className="lead" style={{ fontSize: "0.92rem" }}>
            {t("credits")}
          </p>
          <p className="mt-3" style={{ fontSize: "0.78rem", color: "var(--pel-muted)" }}>
            {t("license")}
          </p>
        </div>

        <div>
          <p className="kicker mb-3">Archivo personal</p>
          <ul className="space-y-1.5 text-sm" style={{ color: "var(--pel-ink-soft)" }}>
            <li><Link href="/biografia">{tNav("biografia")}</Link></li>
            <li><Link href="/exposicion">{tNav("exposicion")}</Link></li>
            <li><Link href="/micologia">{tNav("micologia")}</Link></li>
            <li><Link href="/escritos">{tNav("escritos")}</Link></li>
            <li><Link href="/musica">{tNav("musica")}</Link></li>
            <li><Link href="/encargos">{tNav("commissions")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="kicker mb-3">Proyecto Trilineal (ECoC 2031)</p>
          <ul className="space-y-1.5 text-sm" style={{ color: "var(--pel-ink-soft)" }}>
            <li><Link href="/trilineal">{tNav("trilineal")}</Link></li>
            <li><Link href="/galeria">{tNav("gallery")}</Link></li>
            <li><Link href="/catalogo">{tNav("catalog")}</Link></li>
            <li><Link href="/mapa">{tNav("map")}</Link></li>
            <li><Link href="/investigacion">{tNav("research")}</Link></li>
            <li><Link href="/recursos">{tNav("resources")}</Link></li>
          </ul>
        </div>
      </div>

      <div
        className="container-page py-4 flex flex-col md:flex-row justify-between gap-2"
        style={{ borderTop: "1px solid var(--pel-border)", fontSize: "0.78rem", color: "var(--pel-muted)" }}
      >
        <p>© {year} Archivo Domingo González de Lena. {t("rights")}</p>
        <p>@pelamovic</p>
      </div>
    </footer>
  );
}
