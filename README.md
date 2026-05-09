# Archivo personal · Domingo González de Lena Díaz

Sitio web del archivo personal de Domingo González de Lena Díaz: arte paleolítico asturiano, micología, escritos, música y biografía. Editado por su hijo Pelayo González de Lena Rodríguez.

**URL pública:** https://biopelayo.github.io/domingo-archivo/

## Stack

Next.js 16 (App Router) · Tailwind v4 · next-intl · framer-motion · react-leaflet · recharts · dark mode con persistencia local. Despliegue como sitio estático en GitHub Pages mediante GitHub Actions.

## Desarrollo local

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # genera out/ para GitHub Pages
```

Para construir como en producción (con `basePath: /domingo-archivo`):

```bash
GITHUB_ACTIONS=true npm run build
```

## Datos del sitio

- `public/data/exposicion.json` — 25 piezas reales del proyecto expositivo de Domingo, en 8 cuevas asturianas.
- `public/data/precios.json` — tabla de precios vigente (52 referencias).
- `public/data/biografia.json` — datos biográficos y contacto.
- `public/data/escritos.json` — 7 ensayos publicados.
- `public/data/catalog.json` — corpus fotográfico (120 piezas).
- `public/data/sites.geojson` — yacimientos del Nalón ovetense + cuevas UNESCO Asturias.
- `public/data/kpis.json` — indicadores del proyecto Trilineal.

## Despliegue

Cada `git push` a `main` dispara el workflow `.github/workflows/deploy.yml`:

1. `npm ci` + `npm run build` con `basePath` ajustado.
2. Sube el contenido de `out/` como artefacto.
3. Lo despliega a GitHub Pages.

Hay además un cron semanal (lunes 04:00 UTC) que rehace el build para refrescar los datos de OpenAlex en `/investigacion`.

## Contacto

- **Encargos artísticos** (reservas y piezas a medida): Domingo González de Lena Díaz · 662 58 57 98 · domingodelena@gmail.com
- **Coordinación editorial y archivo digital:** Pelayo González de Lena Rodríguez · bio.pelayo@gmail.com

## Licencias

- Datos descriptivos bajo CC BY 4.0.
- Imágenes del corpus fotográfico (Amanda C. Blanco) bajo CC BY-NC-SA 4.0, cesión pendiente de firma.
- Texto y código fuente del sitio: ver `LICENSE` (MIT).
