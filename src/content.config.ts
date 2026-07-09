import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Collection `work` — piezas de detalle de la landing.
 * Etiqueta por TIPO/contribución (kind), nunca por número. `status` opcional
 * (p. ej. "In progress"). `order` gobierna el orden en la navegación.
 */
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    kind: z.string(),
    summary: z.string(),
    status: z.string().optional(),
    thumb: z.string().optional(),
    thumbAlt: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
