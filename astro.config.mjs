// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site: https://marc-recio-celda.github.io/Portfolio/
  site: 'https://marc-recio-celda.github.io',

  base: '/Portfolio',
  integrations: [mdx()],

  // Smartypants sólo se aplica a .md, no a .astro ni .mdx, así que convertía
  // los apóstrofos de unas páginas y no de otras. Apagado, todo el sitio
  // compone el recto — el mismo que está escrito en la fuente.
  markdown: { smartypants: false },
});