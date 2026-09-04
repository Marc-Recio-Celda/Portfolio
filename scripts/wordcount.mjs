#!/usr/bin/env node
/**
 * AX-9 — ninguna página pública pasa de 4 minutos de lectura.
 *
 * Cuenta la copia VISIBLE de cada página construida y falla por encima del
 * techo. Lee `dist/` y no `src/`, que es la única forma de contar lo que un
 * lector ve: los componentes dibujados aportan texto (etiquetas de diagrama,
 * celdas de tabla) que en la fuente no parece copia y en la página lo es.
 *
 * Techo, no banda: no hay mínimo. Una página breve ha acertado.
 *
 * La cifra: Brysbaert (2019), Journal of Memory and Language 109 —
 * metaanálisis de 190 estudios, lectura silenciosa de no-ficción en inglés
 * ≈238 ppm. Se usa 200 por prosa técnica, pantalla y una audiencia
 * mayoritariamente no nativa; el margen es deliberado y va hacia el lado
 * seguro.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const WPM = 200;
const CEILING = 800;
const DIST = "dist";

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name === "index.html") out.push(p);
  }
  return out;
}

/** Copia visible = lo que hay dentro de <main>. Nav y footer son hermanos
 *  suyos en el layout, así que quedan fuera sin tener que excluirlos.
 *
 *  ⚠️ Y se descuenta lo que existe en el DOM pero nadie lee: el <title> y el
 *  <desc> de cada SVG, y cualquier `visually-hidden`. Son texto para lectores
 *  de pantalla, no minutos de lectura — contarlos mide otra cosa y penaliza
 *  precisamente a la página que se ha molestado en ser accesible. */
export function countWords(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!main) return null;
  const text = main[1]
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, " ")
    .replace(/<([a-z]+)\b[^>]*\bclass="[^"]*\bvisually-hidden\b[^"]*"[^>]*>[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#\d+|[a-z]+);/g, " ");
  // Un token sin letra ni dígito no es una palabra: un guion largo suelto no
  // se lee, y contarlo mide puntuación en vez de tiempo de lectura.
  return text.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}

const rows = [];
for (const file of walk(DIST)) {
  const words = countWords(readFileSync(file, "utf8"));
  if (words === null) continue;
  const route = "/" + relative(DIST, file).replace(/index\.html$/, "").replace(/\/$/, "");
  rows.push({ route: route || "/", words, minutes: words / WPM });
}
rows.sort((a, b) => b.words - a.words);

const over = rows.filter((r) => r.words > CEILING);
const pad = Math.max(...rows.map((r) => r.route.length));

console.log(`AX-9 · techo ${CEILING} palabras (${(CEILING / WPM).toFixed(0)} min a ${WPM} ppm)\n`);
for (const r of rows) {
  const flag = r.words > CEILING ? "OVER " : "  ok ";
  console.log(`${flag} ${r.route.padEnd(pad)}  ${String(r.words).padStart(5)}  ${r.minutes.toFixed(1)} min`);
}

if (over.length) {
  console.log(`\n${over.length} de ${rows.length} páginas pasan del techo: ${over.map((r) => r.route).join(", ")}`);
  process.exit(1);
}
console.log(`\n${rows.length} páginas, todas dentro del techo.`);
