#!/usr/bin/env node
/**
 * Cold packet — lo que ve un desconocido, y NADA más.
 *
 * Por qué existe: pedirle a un agente que "haga como si no supiera nada" no
 * funciona si tiene el repositorio delante — los comentarios del código, los
 * mensajes de commit y el vault explican POR QUÉ cada decisión es correcta, y
 * ese es justo el contexto que un lector externo no tiene. Un revisor que
 * puede leer la justificación deja de ser un revisor.
 *
 * Así que el aislamiento se construye, no se pide: este guion genera una
 * carpeta con el texto renderizado y las capturas de cada página, y el revisor
 * sólo abre esa carpeta. Todo lo que no sale por el navegador queda fuera por
 * construcción, no por buena voluntad.
 *
 * Uso:  node scripts/cold-packet.mjs [carpeta-destino]
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const DIST = path.join(ROOT, "dist");
const OUT = path.resolve(process.argv[2] || path.join(ROOT, ".cold-packet"));
const BASE = "/Portfolio";
const PORT = 4399;

if (!fs.existsSync(DIST)) {
  console.error("No hay dist/. Corre `npm run build` primero.");
  process.exit(1);
}

/* ---------- servidor mínimo, igual que Pages ---------- */
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".pdf": "application/pdf", ".woff2": "font/woff2", ".ico": "image/x-icon" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.startsWith(BASE)) p = p.slice(BASE.length);
  let f = path.join(DIST, p);
  if (!f.startsWith(DIST)) { res.writeHead(403).end(); return; }
  try { if (fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); }
  catch { if (fs.existsSync(f + "/index.html")) f = f + "/index.html"; }
  try {
    res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
    res.end(fs.readFileSync(f));
  } catch { res.writeHead(404).end("404"); }
});

/* ---------- texto visible, en orden de lectura ---------- */
const visible = (html) => {
  const cut = (tag) => {
    const i = html.indexOf(`<${tag}`);
    if (i < 0) return "";
    const j = html.indexOf(`</${tag}>`, i);
    return j < 0 ? "" : html.slice(i, j);
  };
  let h = cut("main") + "\n<!--PIE-->\n" + cut("footer");
  h = h.replace(/<(script|style)[\s\S]*?<\/\1>/g, "");
  // Texto sólo para lector de pantalla: un visitante vidente no lo ve.
  h = h.replace(/<[^>]*class="[^"]*visually-hidden[^"]*"[^>]*>[\s\S]*?<\/[a-z]+>/g, "");
  h = h.replace(/<h1[^>]*>/g, "\n\n# ").replace(/<h2[^>]*>/g, "\n\n## ")
       .replace(/<h3[^>]*>/g, "\n\n### ").replace(/<!--PIE-->/g, "\n\n--- PIE DE PÁGINA ---");
  h = h.replace(/<(p|li|figcaption|dt|dd|td|th|tr|blockquote|div|section)[^>]*>/g, "\n");
  h = h.replace(/<a [^>]*href="([^"]*)"[^>]*>/g, "[enlace → $1] ");
  h = h.replace(/<img [^>]*alt="([^"]*)"[^>]*>/g, "\n[IMAGEN: $1]\n");
  h = h.replace(/<[^>]+>/g, " ");
  h = h.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
       .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
       .replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&[a-z]+;/g, " ");
  return h.split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim()).filter(Boolean).join("\n");
};

/* ---------- recorrido ---------- */
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, e);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (e === "index.html") pages.push("/" + path.relative(DIST, path.dirname(p)).replace(/\\/g, "/"));
  }
})(DIST);
pages.sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const slug = (r) => (r === "/" ? "home" : r.replace(/^\//, "").replace(/\//g, "-"));

server.listen(PORT, async () => {
  let shots = true;
  let chromium;
  try { ({ chromium } = await import("playwright-core")); }
  catch { shots = false; }

  let browser = null;
  if (shots) {
    try { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }); }
    catch { shots = false; }
  }

  const mapa = [];
  for (const [i, route] of pages.entries()) {
    const n = String(i + 1).padStart(2, "0");
    const html = fs.readFileSync(path.join(DIST, route === "/" ? "" : route, "index.html"), "utf8");
    const txt = visible(html);
    const words = (txt.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
    fs.writeFileSync(path.join(OUT, `${n}-${slug(route)}.txt`),
      `PÁGINA: ${BASE}${route === "/" ? "/" : route}\n${"=".repeat(60)}\n\n${txt}\n`);
    mapa.push(`  ${BASE}${route === "/" ? "/" : route}  (${words} palabras)  →  ${n}-${slug(route)}.txt`);

    if (browser) {
      for (const w of [1280, 390]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${PORT}${BASE}${route}`, { waitUntil: "load" });
        // Recorrer entera: dispara las imágenes diferidas y agota las
        // animaciones de scroll, que es lo que hace un lector real.
        await page.evaluate(async () => {
          const h = document.body.scrollHeight;
          for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
          window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 250));
        });
        await page.waitForTimeout(900);
        await page.screenshot({ path: path.join(OUT, `${n}-${slug(route)}-${w}.png`), fullPage: true });
        await ctx.close();
      }
    }
  }
  if (browser) await browser.close();

  const cv = path.join(DIST, "cv.pdf");
  const cvNota = fs.existsSync(cv)
    ? `El sitio ofrece un CV en PDF (${Math.round(fs.statSync(cv).size / 1024)} KB). NO está en este paquete:
   júzgalo como lo que es, un enlace que aún no has abierto.`
    : "El sitio no ofrece CV descargable.";

  fs.writeFileSync(path.join(OUT, "00-LEEME.txt"),
`PAQUETE FRÍO — el portfolio tal y como lo recibe un desconocido
${"=".repeat(64)}

Esto es TODO lo que sale por el navegador: el texto visible de cada página en
orden de lectura, y una captura de página completa a 1280 px (escritorio) y a
390 px (móvil).

QUÉ NO ESTÁ AQUÍ, Y ES DELIBERADO
  · el código fuente y sus comentarios
  · el historial de cambios y su razonamiento
  · cualquier nota interna del autor sobre por qué tomó cada decisión
Nada de eso lo ve quien llega desde un correo, así que nada de eso puede
entrar en una valoración honesta. Si te falta un porqué, ESO ES EL HALLAZGO:
significa que la página no lo está diciendo.

${cvNota}

LAS ${pages.length} PÁGINAS
${mapa.join("\n")}

Generado: ${new Date().toISOString().slice(0, 16).replace("T", " ")}
Capturas: ${browser ? "sí" : "NO — playwright-core no disponible; sólo texto"}
`);

  console.log(`Paquete frío en ${OUT}`);
  console.log(`  ${pages.length} páginas · texto${browser ? " + capturas 1280/390" : " (sin capturas)"}`);
  server.close();
});
