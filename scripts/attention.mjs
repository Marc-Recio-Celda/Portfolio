#!/usr/bin/env node
/**
 * AX-9 — ninguna página pública gasta más de 4 minutos de atención.
 *
 * El presupuesto es ATENCIÓN, no texto. Una página puede gastarlo en prosa, en
 * figuras o (más adelante) en vídeo; lo que no puede es pasarse. Contar sólo
 * palabras medía una de las tres formas de gastarlo y dejaba las otras gratis.
 *
 * Lee `dist/` y no `src/`: los componentes dibujados aportan texto que en la
 * fuente no parece copia y en la página lo es.
 *
 * ⚠️ Dos números y no se parecen en nada:
 *   · 200 ppm es MEDIDO — Brysbaert (2019), Journal of Memory and Language 109,
 *     metaanálisis de 190 estudios: no-ficción en inglés ≈238 ppm. Se baja a
 *     200 por prosa técnica, pantalla y audiencia mayoritariamente no nativa.
 *   · 12 s por figura es DECLARADO, no medido. Nadie lo ha cronometrado aquí.
 *     Va dicho en la salida, porque un número inventado presentado como medido
 *     es exactamente lo que AX-36 prohíbe.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const WPM = 200;                 // medido
const SECONDS_PER_FIGURE = 12;   // declarado
const BUDGET_SECONDS = 240;      // 4 minutos
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

/** Lo visible = lo que hay dentro de <main>. Nav y footer son hermanos suyos
 *  en el layout, así que quedan fuera sin excluirlos a mano.
 *
 *  ⚠️ Se descuenta lo que existe en el DOM y nadie lee: <title> y <desc> de
 *  cada SVG, y cualquier `visually-hidden`. Es texto para lectores de
 *  pantalla, no minutos de lectura — contarlo penaliza a la página que se ha
 *  molestado en ser accesible. */
export function measure(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!main) return null;
  const body = main[1];

  const figures = (body.match(/<figure\b/g) || []).length;

  const text = body
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, " ")
    .replace(/<([a-z]+)\b[^>]*\bclass="[^"]*\bvisually-hidden\b[^"]*"[^>]*>[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|lt|gt|quot|#\d+|[a-z]+);/g, " ");

  // Un token sin letra ni dígito no es una palabra: un guion largo suelto no
  // se lee, y contarlo mide puntuación en vez de tiempo.
  const words = text.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;

  return {
    words,
    figures,
    seconds: (words / WPM) * 60 + figures * SECONDS_PER_FIGURE,
  };
}

const rows = [];
for (const file of walk(DIST)) {
  const m = measure(readFileSync(file, "utf8"));
  if (!m) continue;
  const route = "/" + relative(DIST, file).replace(/index\.html$/, "").replace(/\/$/, "");
  rows.push({ route: route || "/", ...m });
}
rows.sort((a, b) => b.seconds - a.seconds);

const over = rows.filter((r) => r.seconds > BUDGET_SECONDS);
const pad = Math.max(...rows.map((r) => r.route.length));

console.log(
  `AX-9 · presupuesto ${BUDGET_SECONDS} s de atención por página\n` +
    `       texto a ${WPM} ppm (medido) · ${SECONDS_PER_FIGURE} s por figura (declarado, no medido)\n`,
);
for (const r of rows) {
  const flag = r.seconds > BUDGET_SECONDS ? "OVER " : "  ok ";
  console.log(
    // Se redondea HACIA ARRIBA, no al más cercano: en un techo, mostrar 240
    // junto a un OVER es irreconciliable para quien lo lee. El número que se
    // enseña nunca puede parecer más cumplidor que el que se compara.
    `${flag} ${r.route.padEnd(pad)}  ${String(Math.ceil(r.seconds)).padStart(4)} s   ` +
      `${String(r.words).padStart(4)} palabras + ${r.figures} fig`,
  );
}

if (over.length) {
  console.log(`\n${over.length} de ${rows.length} páginas se pasan: ${over.map((r) => r.route).join(", ")}`);
  process.exit(1);
}
console.log(`\n${rows.length} páginas, todas dentro del presupuesto.`);
