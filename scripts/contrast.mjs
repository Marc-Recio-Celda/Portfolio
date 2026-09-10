#!/usr/bin/env node
/**
 * AX-12 — cada suelo se comprueba, no se estima.
 *
 * Las atmósferas por capítulo tiñen el fondo. Un tinte que baja el contraste
 * por debajo del umbral no se ve venir mirando: se ve midiendo. WCAG 2 AA
 * pide 4,5:1 para texto normal y 3:1 para texto grande.
 *
 * Resuelve las mezclas `color-mix(in srgb, A p%, B)` declaradas en el sistema
 * y calcula la ratio contra la tinta. No lee el navegador: lee los tokens, que
 * es donde se decide el color — si un componente inventara un valor fuera de
 * tokens.css estaría rompiendo AX-6, y eso lo caza otra comprobación.
 */
import { readFileSync } from "node:fs";

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;

const hex = (h) => {
  const v = h.replace("#", "");
  const n = v.length === 3 ? v.split("").map((c) => c + c).join("") : v;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};

/** Luminancia relativa, WCAG 2.x */
const luminance = ([r, g, b]) => {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** color-mix(in srgb, A p%, B) — mezcla en sRGB, que es lo que declara el token */
const mix = (a, p, b) => a.map((c, i) => Math.round((c * p + b[i] * (100 - p)) / 100));

// Primitivas, leídas del sistema y no transcritas.
const tokens = readFileSync("src/styles/tokens.css", "utf8");
const val = (name) => {
  const m = tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!m) throw new Error(`falta el token --${name} en tokens.css`);
  return hex(m[1]);
};

const paper = val("paper");
const ink = val("ink");
const muted = val("muted");
const accent = val("accent");
const accentDeep = val("accent-deep");

// Los suelos que el sitio declara, por atmósfera.
const grounds = [
  ["neutral · ground-2", mix(paper, 100, paper)],
  ["neutral · tint", mix(accent, 6, paper)],
  ["lab · ground-2", mix(accent, 7, paper)],
  ["lab · tint", mix(accent, 11, paper)],
  ["method · ground-2", mix(accentDeep, 6, paper)],
  ["method · tint", mix(accentDeep, 9, paper)],
  ["cover", mix(accent, 6, paper)],
];

const inks = [
  ["ink", ink, AA_NORMAL],
  ["muted", muted, AA_NORMAL],
  ["accent-deep", accentDeep, AA_NORMAL],
  ["accent (large only)", accent, AA_LARGE],
];

console.log(`AX-12 · contraste de cada suelo contra la tinta que lo pisa`);
console.log(`       WCAG 2 AA: ${AA_NORMAL}:1 texto normal · ${AA_LARGE}:1 texto grande\n`);

let bad = 0;
for (const [gname, g] of grounds) {
  for (const [iname, i, min] of inks) {
    const r = ratio(g, i);
    const ok = r >= min;
    if (!ok) bad++;
    console.log(
      `${ok ? "  ok " : "FAIL "} ${gname.padEnd(20)} × ${iname.padEnd(20)} ${r.toFixed(2)}:1  (mín ${min})`,
    );
  }
}

if (bad) {
  console.log(`\n${bad} par(es) por debajo del umbral.`);
  process.exit(1);
}
console.log(`\n${grounds.length * inks.length} pares, todos por encima del umbral.`);
