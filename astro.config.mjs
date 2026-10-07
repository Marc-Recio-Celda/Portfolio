// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// El subcamino de GitHub Pages, una vez: `base` y la redirección lo leen de aquí.
const base = '/Portfolio';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site: https://marc-recio-celda.github.io/Portfolio/
  site: 'https://marc-recio-celda.github.io',

  base,
  integrations: [mdx()],

  // La página del método se llamaba MLabs; quien guardó su dirección llega a
  // la de Aevifex, que la sustituye. Una redirección estática, sin JS (AX-1).
  // ⚠️ El destino lleva `base` a mano: Astro no lo añade a una redirección, y
  // sin él el enlace funciona en `dev` y se rompe en Pages (AX-2).
  redirects: { '/work/mlabs': `${base}/work/aevifex` },

  // Smartypants sólo se aplica a .md, no a .astro ni .mdx, así que convertía
  // los apóstrofos de unas páginas y no de otras. Apagado, todo el sitio
  // compone el recto — el mismo que está escrito en la fuente.
  markdown: { smartypants: false },
});