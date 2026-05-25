# Email a imprenta · Especificaciones técnicas

**Para enviar a:** imprenta local de Oviedo (sugerencias en sección 4).

---

## 1 · Texto del email

**Asunto:** Presupuesto · cartel A2, pasapáginas, octavillas y marcapáginas · Exposición arte paleolítico en La Esquina del Peso

---

Buenas tardes,

Necesitamos un presupuesto para imprimir el material de una exposición individual en **La Esquina del Peso** (calle del Peso 1, Oviedo), prevista del **21 al 30 de junio de 2026**.

Las piezas a imprimir, todas con la misma identidad visual (verde botánico sobre papel crudo, ver más abajo):

| Pieza | Tamaño | Tirada | Material |
|-------|--------|--------|----------|
| Cartel | A2 (594×420 mm) | 5 | Papel verjurado o reciclado 200-250 g/m² |
| Pasapáginas (marcador) | 50×200 mm | 200 | Cartulina 300 g/m² |
| Octavilla (flyer) | A6 (105×148 mm) | 300 | Papel 170 g/m² |
| Marcapáginas temáticos (4 modelos) | 50×200 mm | 50 unidades × 4 = 200 | Cartulina 300 g/m² |

**Total estimado de piezas: 705.**

**Especificaciones técnicas:**

- **Impresión:** una sola tinta (verde botánico `#2D6A4F`) más un acento ocasional coral (`#D4845A`). Total: dos tintas directas, o cuatricromía (CMYK) si resulta más económica.
- **Acabado:** **mate o sin acabado** (sin laminado brillante).
- **Sangrado:** 3 mm en todas las piezas.
- **Formato de archivo de entrega:** PDF/X-1a y PNG en 300 DPI. Disponemos también de los SVG originales por si necesitáis vectorial.
- **Fuentes:** todas trazadas a curvas en los PDF.

**Plazo:** necesitamos las piezas **antes del lunes 15 de junio** (para preparar el montaje del fin de semana del 20-21).

Adjuntamos el cartel y un marcapáginas como muestra. Si necesitáis el resto de archivos o pruebas físicas previas, los enviamos enseguida.

Quedamos a la espera del presupuesto y del plazo de producción.

Un saludo cordial,

**Pelayo González de Lena Rodríguez**
Coordinación · bio.pelayo@gmail.com · [móvil]

**Domingo González de Lena Díaz**
Autor · 662 58 57 98

---

## 2 · Archivos a adjuntar al email

Todos en `D:\Antigravity\proyecto-domingo-web\public\expo\`. PNG en `png/`, SVG en la carpeta padre.

| Pieza | Archivo PDF (a generar) | PNG 300 DPI | SVG original |
|-------|-------------------------|-------------|--------------|
| Cartel A2 | `cartel.pdf` (pendiente) | `png/cartel.png` (3508 px) | `cartel.svg` |
| Pasapáginas | `pasapaginas.pdf` (pendiente) | `png/pasapaginas.png` | `pasapaginas.svg` |
| Octavilla A6 | `octavilla.pdf` (pendiente) | `png/octavilla.png` | `octavilla.svg` |
| Marcapáginas 1 · Venus | `marcapaginas-1.pdf` | `png/marcapaginas-1-venus-gravetienses.png` | `marcapaginas-1-venus-gravetienses.svg` |
| Marcapáginas 2 · Franco-cantábrico | `marcapaginas-2.pdf` | `png/marcapaginas-2-arte-franco-cantabrico.png` | `marcapaginas-2-arte-franco-cantabrico.svg` |
| Marcapáginas 3 · Cierva trilineal | `marcapaginas-3.pdf` | `png/marcapaginas-3-cierva-trilineal.png` | `marcapaginas-3-cierva-trilineal.svg` |
| Marcapáginas 4 · UNESCO Asturias | `marcapaginas-4.pdf` | `png/marcapaginas-4-cuevas-unesco-asturias.png` | `marcapaginas-4-cuevas-unesco-asturias.svg` |

**Conversión SVG → PDF (Linux/macOS o WSL):**

```bash
for f in public/expo/*.svg; do
  out="${f%.svg}.pdf"
  rsvg-convert -f pdf -o "$out" "$f"
done
```

Alternativa en Windows: abrir el SVG en Inkscape y exportar a PDF (Archivo → Guardar como → PDF).

## 3 · Especificación de colores (Pantone aproximado)

| Color | HEX | Pantone aproximado | CMYK aprox |
|-------|-----|--------------------|-----|
| Verde botánico | `#2D6A4F` | Pantone 7728 C | C82 M37 Y79 K30 |
| Coral cálido | `#D4845A` | Pantone 7578 C | C13 M55 Y66 K1 |
| Tinta texto | `#1B1B1B` | Black 6 C | C30 M0 Y0 K100 |
| Papel | `#FAFAF7` | (papel crudo natural) | — |

**Recomendación de papel:** verjurado natural sin blanquear o reciclado de tono ligeramente crudo (no blanco puro). Pedir muestras antes de tirada definitiva.

## 4 · Imprentas sugeridas en Oviedo

(Sugerencias para que Pelayo cierre presupuesto comparando 2-3 opciones. Verificar antes datos actuales.)

1. **Imprenta Mercantil** · Oviedo · papelería e imprenta clásica.
2. **Imprenta Asturiana** · Polígono de Olloniego · pliego rotativa.
3. **Print Solution / OnlinePrinters / Pixartprinting** (online, plazo 3-5 días) si la imprenta local no llega.

## 5 · Variables a confirmar antes del envío

- **Fechas reales** (asumido «21 al 30 de junio»; sustituir en cartel, pasapáginas, octavilla, marcapáginas 3 si menciona; ahora mismo todos los SVG llevan `[fecha]` como placeholder en el cartel, pasapáginas y octavilla).
- **Hora exacta** de la inauguración (asumido 19:30).
- **Tirada definitiva** según aforo esperado.
- **Si añadimos QR** en el cartel (lleva al portfolio web `paleotxomi.com/exposicion/la-esquina-del-peso`). Se puede generar y añadir al cartel antes de enviar a imprenta.

## 6 · Próximos pasos

1. Pelayo confirma fechas reales y tirada.
2. Sustituir placeholders en los SVG.
3. Generar PDFs desde los SVG.
4. Enviar email con adjuntos a 2-3 imprentas.
5. Comparar presupuesto y plazo.
6. Encargar.
