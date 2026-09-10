#!/usr/bin/env node
/**
 * Genera public/cv.pdf a partir de cv/cv.html, imprimiendo con Chromium.
 *
 * Por qué así: el PDF anterior era un binario sin fuente en el repositorio, de
 * modo que se quedó obsoleto en silencio — su resumen seguía siendo el párrafo
 * genérico que el sitio ya había retirado, y ningún diff podía enseñarlo.
 * Con una fuente HTML el CV se revisa leyendo el cambio, como todo lo demás.
 *
 * Uso: npm run cv
 */
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const SRC = path.join(ROOT, "cv", "cv.html");
const OUT = path.join(ROOT, "public", "cv.pdf");
const TXT = path.join(ROOT, "cv", "cv.txt");

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage();
await page.goto("file://" + SRC, { waitUntil: "load" });
await page.waitForTimeout(400);

await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  // Los márgenes los pone @page en la hoja: aquí a cero para no sumarlos dos veces.
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});

const paginas = await page.evaluate(() => Math.ceil(document.body.scrollHeight / (297 * 3.7795)));

/* Transcripción de texto, del mismo HTML que el PDF. Existe porque Chromium
   subsetea las fuentes al imprimir y su PDF no se puede extraer con un parser
   ingenuo — y porque quien criba perfiles LEE el CV, así que la revisión en
   frío necesita su contenido. Al salir de la misma fuente no puede discrepar. */
const texto = await page.evaluate(() => {
  const bloques = [];
  for (const el of document.body.children) {
    const t = el.innerText.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
    if (t) bloques.push(el.tagName === "H2" ? `\n${t.toUpperCase()}\n${"-".repeat(t.length)}` : t);
  }
  return bloques.join("\n\n");
});
fs.writeFileSync(TXT, texto + "\n");

await browser.close();

console.log(`cv.pdf generado · ${Math.round(fs.statSync(OUT).size / 1024)} KB · ≈${paginas} página(s)`);
console.log(`cv/cv.txt      · ${texto.split(/\s+/).length} palabras (transcripción para revisión)`);
