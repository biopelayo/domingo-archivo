import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Download } from "lucide-react";
import { useTranslations } from "next-intl";

import { RESOURCE_CATEGORIES } from "@/data/resources";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Enlaces, datasets, normativa y bibliografía para investigación, prensa, docencia y administración cultural.",
};

function ResourcesHeader() {
  const t = useTranslations("resources");
  return (
    <>
      <p className="kicker mb-2">Trilineal</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

function CategoryBlock({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="pt-10 border-t" style={{ borderColor: "var(--pel-border)" }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--pel-green)" }}>
        {label}
      </h2>
      {children}
    </section>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function isDownload(href: string) {
  return /\.(json|geojson|bib|csv|pdf|zip|svg)$/i.test(href);
}

export default function ResourcesPage() {
  const t = useTranslations("resources.categories");
  return (
    <section className="section">
      <div className="container-page max-w-5xl">
        <ResourcesHeader />

        <nav aria-label="Índice de recursos" className="mt-8 card">
          <p className="kicker mb-2">Índice</p>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {RESOURCE_CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="font-medium">
                  {t(c.i18nKey)} <span style={{ color: "var(--pel-muted)" }}>({c.links.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-6 mt-6">
          {RESOURCE_CATEGORIES.map((cat) => (
            <CategoryBlock key={cat.id} id={cat.id} label={t(cat.i18nKey)}>
              <ul className="grid sm:grid-cols-2 gap-3">
                {cat.links.map((link) => {
                  const ext = isExternal(link.href);
                  const dl = isDownload(link.href);
                  const Icon = dl ? Download : ext ? ExternalLink : null;
                  const inner = (
                    <>
                      <span className="flex-1">
                        <p style={{ color: "var(--pel-green)", fontWeight: 700 }}>{link.title}</p>
                        <p className="text-sm mt-1" style={{ color: "var(--pel-ink-soft)" }}>
                          {link.description}
                        </p>
                        {link.source && (
                          <p className="text-xs mt-1" style={{ color: "var(--pel-muted)" }}>
                            {link.source}
                          </p>
                        )}
                      </span>
                      {Icon && (
                        <Icon size={16} className="mt-1 shrink-0" style={{ color: "var(--pel-warm)" }} />
                      )}
                    </>
                  );
                  return (
                    <li key={link.href} className="card">
                      {ext ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-start gap-2"
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link href={link.href} className="flex items-start gap-2">
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </CategoryBlock>
          ))}
        </div>

        <div className="mt-12">
          <p className="kicker mb-2">Próximamente</p>
          <ul className="lead space-y-2 list-disc pl-6">
            <li>Carpeta de prensa lista para descargar: 8 imágenes y textos cortos en ES y EN.</li>
            <li>Catálogo razonado en PDF.</li>
            <li>Modelos 3D fotogramétricos navegables de 8 piezas.</li>
            <li>Materiales escolares en lectura fácil para Primaria y ESO.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
