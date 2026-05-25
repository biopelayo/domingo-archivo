# Índice · Exposición Domingo González de Lena
## La Esquina del Peso · Oviedo

**Última actualización:** 24 may 2026.
**Estado:** v4 — listo para enviar a regencia, prensa y para imprenta. Pendiente solo de fechas reales y datos de Domingo.

Este archivo lista todos los documentos y entregables generados para la exposición. Sirve de mapa para navegar la carpeta.

---

## 1 · Plan maestro

| Archivo | Propósito |
|---------|-----------|
| [`EXPO_CAFE_DEL_PESO.md`](./EXPO_CAFE_DEL_PESO.md) | Plan maestro: contexto, estado, identidad, todas las decisiones |
| [`STYLE_GUIDE_EXPO.md`](./STYLE_GUIDE_EXPO.md) | Identidad visual: paleta, tipografía, motivo cierva, reglas |

## 2 · Contrato y fichas

| Archivo | Propósito |
|---------|-----------|
| [`CONTRATO_CESION_OBRAS.md`](./CONTRATO_CESION_OBRAS.md) | Borrador del contrato Domingo-Local. Anexo I con las 24 piezas. **Aviso:** revisar con asesor antes de firmar. |
| [`FICHAS_DE_SALA.md`](./FICHAS_DE_SALA.md) | 24 cartelas A5, una por pieza |

## 3 · Comunicación · documentos

| Archivo | Para qué |
|---------|----------|
| [`DOSSIER_EXPO.md`](./DOSSIER_EXPO.md) | Dossier 1-2 páginas para adjuntar a prensa y TPA |
| [`NOTA_PRENSA.md`](./NOTA_PRENSA.md) | Texto para LNE, El Comercio, RTPA, Asturies24 |
| [`EMAIL_ALBA_VAZQUEZ.md`](./EMAIL_ALBA_VAZQUEZ.md) | Mensaje a Alba Vázquez (Onda Cero) por LinkedIn / X |
| [`EMAIL_TPA.md`](./EMAIL_TPA.md) | Email para el programa *Pieces* (RTPA) |
| [`EMAIL_INAUGURACION_PRIVADA.md`](./EMAIL_INAUGURACION_PRIVADA.md) | Invitaciones a la inauguración privada (3 versiones: formal, WhatsApp, DM) |
| [`CALENDARIO_PUBLICACION.md`](./CALENDARIO_PUBLICACION.md) | Plan W-4 → W+1, con versión Txomi + bio y post fijado de Bluesky |
| [`GUION_INAUGURACION.md`](./GUION_INAUGURACION.md) | Guion 8-12 min para Domingo + Pelayo en la inauguración |
| [`CAMBIOS_ES_JSON.md`](./CAMBIOS_ES_JSON.md) | Lista de textos a tocar en `messages/es.json` (lo lleva Pelayo) |

## 4 · Identidad visual

Todos los SVG en [`public/expo/`](./public/expo/). PNG a 300 DPI generados en [`public/expo/png/`](./public/expo/png/).

| Pieza | SVG | PNG (DPI alto) |
|-------|-----|----------------|
| Cartel A2 (594×420 mm) | `cartel.svg` | `cartel.png` (3508 px de ancho) |
| Logo del autor | `logo.svg` | `logo.png` (1600 px) |
| Logo de la exposición | `logo-expo.svg` | `logo-expo.png` (2000 px) |
| Logo cuadrado IG | `logo-cuadrado-instagram.svg` | `logo-cuadrado-instagram.png` (1080×1080) |
| Pasapáginas (50×200 mm) | `pasapaginas.svg` | `pasapaginas.png` (591 px) |
| Octavilla A6 (105×148 mm) | `octavilla.svg` | `octavilla.png` (1240 px) |
| Motivo cierva aislado | `motivo-cierva.svg` | `motivo-cierva.png` (1200 px) |
| Mapa de Asturias con 7 cuevas | `mapa-cuevas-asturias.svg` | `mapa-cuevas-asturias.png` (2000 px) |
| Marcapáginas 1 · Venus gravetienses | `marcapaginas-1-venus-gravetienses.svg` | `marcapaginas-1-venus-gravetienses.png` |
| Marcapáginas 2 · Arte franco-cantábrico | `marcapaginas-2-arte-franco-cantabrico.svg` | `marcapaginas-2-arte-franco-cantabrico.png` |
| Marcapáginas 3 · Cierva trilineal | `marcapaginas-3-cierva-trilineal.svg` | `marcapaginas-3-cierva-trilineal.png` |
| Marcapáginas 4 · 5 cuevas UNESCO Asturias | `marcapaginas-4-cuevas-unesco-asturias.svg` | `marcapaginas-4-cuevas-unesco-asturias.png` |

Regenerar los PNG en cualquier momento:
```bash
node scripts/svg-to-png.mjs
```

## 5 · Portfolio web dentro del sitio de Domingo

| Ruta pública | Archivo |
|--------------|---------|
| `/` (banner verde de aviso) | `src/components/home/ExpoActualBanner.tsx` |
| `/exposicion/la-esquina-del-peso` | `src/app/exposicion/la-esquina-del-peso/page.tsx` |

Cuando Pelayo cierre las fechas reales, hay que sustituir `[21 de junio]`, `[30 de junio]`, `[sábado 21]` y `[19:30]` en estos dos archivos.

## 6 · Scripts auxiliares

| Archivo | Propósito |
|---------|-----------|
| `scripts/svg-to-png.mjs` | Convierte los SVG de `public/expo/` a PNG (300 DPI) |
| `scripts/sync-data-from-dossier.mjs` | Existente: sincronización de datos del dossier (no relacionado con la expo del Café) |

---

## 7 · Pendiente

### De Pelayo

- **Fechas reales** (asumido 21-30 jun · inauguración sábado 21 a las 19:30).
- **Capacidad real del local** (asumido 24 — confirmar tras visita).
- **Datos de Domingo:** año de cada pieza, técnica exacta, peso, dimensiones #8 y Venus.
- **Lista de invitados** a la inauguración privada (sugerencia: ≤ 30).
- **Foto del taller** si quiere reel/teaser (W-2 / W-4).

### De Domingo

- Confirmar motivo de la pieza #8 (en exposicion.json aparece como «Sin determinar»).
- Dimensiones y datos completos de la Venus del cuerno.
- Año aproximado de cada pieza (basta con rangos: 2009, 2010-2012, 2015...).

### De la regencia de La Esquina del Peso

- Fecha de inauguración y de cierre.
- Capacidad para colgar 24 piezas.
- Si autorizan inauguración privada el día anterior y en qué horario.
- Coste del vino y picoteos para la privada.
- Si hay restricciones para colgar en pared (peso máximo, tornillos, etc.).

### De los medios

- Confirmar contacto en *Pieces* (RTPA) tras envío del email.
- Confirmar Alba Vázquez (Onda Cero) tras DM.

### Verificación humana antes de imprimir marcapáginas

Los textos de los 4 marcapáginas temáticos se redactaron con base de conocimiento general (cultura Gravetiense, sitio UNESCO 310, abrigo de La Lluera). El investigador automático falló dos veces por sobrecarga del servidor de Anthropic. **Antes de imprimir conviene revisar a mano:**

- **Marcapáginas 1 (Venus gravetienses):** datación 33.000-22.000 AP del Gravetiense; algunas fuentes acotan a 28.000-22.000. La Venus de Hohle Fels (Alemania) es Auriñaciense, no Gravetiense estricta, pero suele incluirse en la tradición.
- **Marcapáginas 2 (Arte franco-cantábrico):** cronología 40.000-12.000 AP; algunas fuentes acotan a 35.000-11.000.
- **Marcapáginas 3 (Cierva trilineal):** la etimología «trilineal» (tres líneas paralelas del trazo) se basa en los estudios de Fortea Pérez de la cueva. Pelayo o Domingo pueden afinar el matiz exacto.
- **Marcapáginas 4 (UNESCO 2008):** sitio oficial «Cueva de Altamira y arte rupestre paleolítico del norte de España», ID UNESCO 310. Ampliación en 2008 (32.ª sesión, Quebec, julio). Las 5 cuevas asturianas: Tito Bustillo, La Peña de Candamo, Pindal, Llonín, Covaciella.

---

## 8 · Cómo convertir el dossier a PDF

**Opción A · Pandoc (si está instalado):**
```bash
pandoc DOSSIER_EXPO.md -o dossier.pdf
```

**Opción B · VS Code:**
- Instalar la extensión «Markdown PDF» de yzane.
- Abrir el `.md`, click derecho → «Markdown PDF: Export (pdf)».

**Opción C · Navegador (más fácil):**
- Abrir el `.md` en VS Code con la vista de previsualización.
- `Ctrl+P` → «Guardar como PDF».

---

## 9 · Orden de envíos (recomendado)

| Cuándo | Qué |
|--------|-----|
| Ahora (W-4) | Confirmar fechas con la regencia. Imprimir cartel, pasapáginas y octavillas. |
| W-3 lunes | Post de anuncio en redes propias (versión Txomi). Etiquetar @laesquinadelpeso. |
| W-3 martes | Enviar a Alba Vázquez (DM LinkedIn y X). |
| W-3 miércoles | Enviar a *Pieces* (RTPA) por email. Copia a `noticias@rtpa.es`. |
| W-3 jueves | Enviar nota de prensa a LNE, El Comercio, Asturies24. |
| W-2 | Avance pieza estrella. Cerrar invitados privados. |
| W-1 | Recordatorio víspera + actualizar bio y post fijado de Bluesky. |
| Día -1 (vie 20) | Inauguración privada 19:30. |
| Día D (sáb 21) | Inauguración pública 19:30. Stories en directo. |
| Día +1 (dom 22) | Post de agradecimiento. |
| W+1 a W+2 | 2 posts de mantenimiento durante la expo. Cierre 30 jun. |
