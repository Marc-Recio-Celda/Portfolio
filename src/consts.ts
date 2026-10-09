// Site constants — single source for metadata and language.
export const SITE = {
  name: "Marc Recio",
  // Positioning line (tunable). Used in the hero and in metadata.
  tagline: "Data scientist bringing rigorous ML and data engineering to plant genomics",
  description:
    "Portfolio of Marc Recio, data scientist with a background in plant breeding and molecular biology: classical ML, databases and data engineering applied to problems in plant genomics.",
  // Content language (confirmed: English, for international research PIs).
  lang: "en",
  // Canonical URL — GitHub Pages project site.
  url: "https://marc-recio-celda.github.io/Portfolio",
} as const;

// Contact + social links.
export const LINKS = {
  email: "marcreciocel@gmail.com",
  phone: "+34 655 37 03 77",
  github: "https://github.com/Marc-Recio-Celda",
  linkedin: "https://www.linkedin.com/in/marc-recio-05b085211/",
  // CV lives in public/. Provided by Marc.
  cv: "/cv.pdf",
} as const;
