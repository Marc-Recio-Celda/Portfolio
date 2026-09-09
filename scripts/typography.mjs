#!/usr/bin/env node
/**
 * Tipografía consistente entre páginas.
 *
 * Por qué existe: `/work/tfm` componía el apóstrofo curvo (’) y el resto del
 * sitio el recto ('), y no era un descuido al escribir — en la FUENTE todos
 * son rectos. Lo hacía smartypants, que Astro aplica al markdown pero no a
 * las páginas .astro ni a .mdx. Una incoherencia estructural: invisible en el
 * fuente, visible al navegar entre páginas.
 *
 * Por eso mide el HTML CONSTRUIDO y no la fuente: lo que importa es lo que
 * llega al lector, sea quien sea el que lo transformó por el camino.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

/** Pares que deben elegir un estilo y mantenerlo en todo el sitio. */
const ESTILOS = [
  { nombre: "apóstrofo", variantes: { recto: /&#39;|(?<=\w)'(?=\w|\s)/g, curvo: /’/g } },
  { nombre: "comilla doble", variantes: { recta: /&quot;|"(?=\w)/g, curva: /[“”]/g } },
];

const paginas = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith(".html")) paginas.push(p);
  }
})(DIST);

/** Sólo el cuerpo legible: fuera scripts, estilos y atributos. */
const prosa = (html) => {
  let h = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  h = h.replace(/<(script|style)[\s\S]*?<\/\1>/g, "");
  return h.replace(/<[^>]+>/g, " ");
};

console.log("Tipografía · un solo estilo de apóstrofo y comilla en todo el sitio\n");

let roto = 0;
for (const { nombre, variantes } of ESTILOS) {
  const total = {};
  const porPagina = [];
  for (const f of paginas.sort()) {
    const t = prosa(readFileSync(f, "utf8"));
    const fila = { pagina: relative(DIST, f), cuenta: {} };
    for (const [estilo, re] of Object.entries(variantes)) {
      const n = (t.match(re) || []).length;
      fila.cuenta[estilo] = n;
      total[estilo] = (total[estilo] || 0) + n;
    }
    if (Object.values(fila.cuenta).some((n) => n > 0)) porPagina.push(fila);
  }
  const usados = Object.entries(total).filter(([, n]) => n > 0);
  if (usados.length > 1) {
    roto++;
    console.log(`FAIL  ${nombre}: conviven ${usados.map(([e, n]) => `${e} (${n})`).join(" y ")}`);
    for (const f of porPagina) {
      const mezcla = Object.entries(f.cuenta).filter(([, n]) => n > 0);
      console.log(`         ${f.pagina.padEnd(30)} ${mezcla.map(([e, n]) => `${e}=${n}`).join("  ")}`);
    }
  } else {
    const [estilo, n] = usados[0] || ["ninguno", 0];
    console.log(`  ok  ${nombre.padEnd(14)} ${estilo} en las ${paginas.length} páginas (${n} usos)`);
  }
}

if (roto) {
  console.log(`\n${roto} estilo(s) mezclados entre páginas.`);
  process.exit(1);
}
console.log(`\nUn solo estilo por marca, en las ${paginas.length} páginas.`);
