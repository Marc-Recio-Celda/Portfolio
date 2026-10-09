import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Collection `work` — piezas de detalle de la landing.
 * Etiqueta por TIPO/contribución (kind), nunca por número. `status` opcional
 * (p. ej. "In progress"). `order` gobierna el orden en la navegación.
 */
const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
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
    // Atmósfera de la página (AX-12): cambia el SUELO, nunca el acento.
    // "lab" tira a teal y da aire botánico a lo de genética vegetal; "method"
    // tira a índigo. Sin valor, el suelo neutro del sistema.
    theme: z.enum(["lab", "method"]).optional(),
    deeper: z
      .object({
        href: z.string(),
        label: z.string(),
      })
      .optional(),
    // La página propia de un proyecto pequeño (D30), con las palabras de su maqueta tal
    // cual. Sin `page`, el proyecto no se construye con la plantilla de `work/[...slug]`.
    page: z
      .object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        label: z.string(),
        headline: z.string(),
        full: z.string().nullable().optional(),
        lead: z.string(),
        chips: z.string(),
        shot: z.object({ src: z.string(), alt: z.string(), caption: z.string() }),
        blocks: z.array(z.object({ heading: z.string(), html: z.string() })),
        paper: z.string().nullable().optional(),
        stack: z.array(z.string()),
        actions: z.array(z.object({ href: z.string(), label: z.string(), dark: z.boolean() })),
      })
      .optional(),
  }),
});

export const collections = { work };
