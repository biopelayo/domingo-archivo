import type { Metadata } from "next";
import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";

import PersonalGalleryClient, {
  type PersonalPhoto,
} from "@/components/gallery/PersonalGalleryClient";

export const metadata: Metadata = { title: "Galería" };

type PhotosFile = {
  actualizado?: string;
  total?: number;
  fotos: PersonalPhoto[];
};

async function loadPhotos(): Promise<PhotosFile> {
  const file = path.join(process.cwd(), "public", "data", "photos.json");
  try {
    const text = await fs.readFile(file, "utf-8");
    const data = JSON.parse(text) as PhotosFile;
    return { fotos: data.fotos ?? [], total: data.total, actualizado: data.actualizado };
  } catch {
    return { fotos: [] };
  }
}

function GaleriaHeader() {
  const t = useTranslations("personalGallery");
  return (
    <>
      <p className="kicker mb-2">{t("kicker")}</p>
      <h1 className="headline">{t("title")}</h1>
      <div className="h-divider" />
      <p className="lead text-lg mt-4">{t("subtitle")}</p>
    </>
  );
}

function CorpusLink() {
  const t = useTranslations("personalGallery");
  return (
    <p className="lead mt-4" style={{ fontSize: "0.95rem" }}>
      {t("corpusNote")}{" "}
      <Link href="/galeria/corpus" style={{ textDecoration: "underline" }}>
        {t("corpusLink")}
      </Link>
      .
    </p>
  );
}

export default async function GaleriaPersonalPage() {
  const data = await loadPhotos();
  return (
    <section className="section">
      <div className="container-page">
        <GaleriaHeader />
        <CorpusLink />
        <div className="mt-8">
          <PersonalGalleryClient photos={data.fotos} />
        </div>
      </div>
    </section>
  );
}
