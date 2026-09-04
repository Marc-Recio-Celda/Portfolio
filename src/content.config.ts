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
    // Enlace opcional a una página propia del proyecto (p. ej. el proceso del
    // TFM). Va por el esquema y no en el markdown porque la URL tiene que
    // pasar por withBase(): un href escrito a mano rompe en producción (AX-2).
    deeper: z
      .object({
        href: z.string(),
        label: z.string(),
      })
      .optional(),
  }),
});

export const collections = { work };
