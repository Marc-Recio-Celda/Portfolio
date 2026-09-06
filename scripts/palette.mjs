#!/usr/bin/env node
/**
 * AX-6 — el color se declara en un sitio, y sólo en uno.
 *
 * Por qué existe: la rampa viridis llegó a estar escrita DOS veces —en
 * tokens.css y, copiada, dentro del scatter—, y ninguna de las dos decía ser
 * la original. Un hecho con dos casas y sin dueño no da error: da una deriva
 * silenciosa el día que cambias una y olvidas la otra. Lo mismo pasaba con las
 * sombras, repartidas en tres componentes con tres valores casi iguales.
 * Mirar no lo caza; esto sí.
 *
 * Qué cuenta como literal de color: hex (#rgb, #rrggbb, #rrggbbaa) y las
 * funciones rgb()/hsl(). Fuera de src/styles/tokens.css, ninguno.
 *
 * Qué NO persigue, y se declara en vez de medirse (MLabs:AX-36):
 *   · Las palabras clave `black`, `white`, `transparent` y `currentColor`.
 *     En una máscara sólo cuenta el canal alfa, así que ahí `black` es
 *     ESTARCIDO, no paleta. Perseguirlas obligaría a una lista de excepciones
 *     por fichero, que es peor que la enfermedad.
 *   · color-mix(): no introduce color, lo deriva de tokens que ya existen.
 *     Si su primer argumento fuera un literal, el barrido lo caza igualmente
 *     porque el literal sigue siendo un literal.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const FUENTE = join(SRC, "styles", "tokens.css");
const EXT = /\.(astro|css|mdx|md|ts|js)$/;

/** #rgb | #rrggbb | #rrggbbaa, y rgb()/hsl() con o sin alfa. */
const LITERAL = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|hsl)a?\s*\(/g;

const ficheros = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.test(e)) ficheros.push(p);
  }
})(SRC);

console.log("AX-6 · el color vive en tokens.css, y en ningún otro sitio");
console.log(`       fuente declarada: ${relative(ROOT, FUENTE)}\n`);

let hallazgos = 0;
for (const f of ficheros.sort()) {
  if (f === FUENTE) continue;
  const lineas = readFileSync(f, "utf8").split("\n");
  lineas.forEach((linea, i) => {
    for (const m of linea.matchAll(LITERAL)) {
      hallazgos++;
      console.log(
        `FAIL  ${relative(ROOT, f)}:${i + 1}  ${m[0].trim()}   →  usa un token de tokens.css`,
      );
    }
  });
}

if (hallazgos) {
  console.log(`\n${hallazgos} literal(es) de color fuera de la fuente.`);
  process.exit(1);
}
console.log(`${ficheros.length - 1} ficheros barridos: ningún color fuera de la fuente.`);
