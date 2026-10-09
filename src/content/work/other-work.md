---
title: "Data capture, databases & visualization"
kind: "Other work"
summary: "A scraper whose dataset is published on Zenodo with a DOI, plus the databases I model with and the tools I visualise data with."
thumb: "/work/viz.jpeg"
thumbAlt: "A Power BI dashboard of Spanish vehicle registrations: headline totals, distribution by province, vehicle origin and type, and registrations per year."
order: 6
draft: false
page:
  metaTitle: "Data capture & databases · Marc Recio"
  metaDescription: "A scraper whose dataset is published with a DOI, and the databases and charts I build around data."
  label: "More work · 2025 · Data engineering"
  headline: "Data capture <span class=\"accent-word\">&amp; databases</span>."
  lead: "A scraper whose dataset is published with a DOI, and the databases and charts I build around data."
  chips: "<span class=\"chip\" style=\"--tone:var(--a-sage)\">Published on Zenodo</span><span class=\"tag\">MSc in Data Science · UOC</span>"
  shot:
    src: "/work/viz.jpeg"
    alt: "A Power BI dashboard of Spanish vehicle registrations: totals, distribution by province, origin and type, and registrations per year"
    caption: "A Power BI dashboard of Spanish vehicle registrations."
  blocks:
    - heading: "What it is"
      html: "<p>A Selenium scraper that turns a public film site into clean tabular data, from the master's data-capture course, and the stores and charts the course went on to.</p>"
    - heading: "How"
      html: "<ul><li>A per-field <code>try/except</code>, so one missing element never aborts a film.</li><li>Explicit waits instead of brittle sleeps; output appended as it goes, so a run survives interruption.</li><li>The store chosen for the shape of the data: PostgreSQL and SQLite, or MongoDB, Cassandra, Redis and Neo4j.</li></ul>"
    - heading: "What came out"
      html: "<p><cite>Letterboxd 1000 Popular Movies Dataset</cite>, Recio Celda, M. &amp; Soriano Reos, J. (2025), Zenodo: 1,000 films by about 25 fields, CC BY-NC-SA 4.0.</p>"
  stack: ["Python", "Selenium", "SQL", "Power BI"]
  actions:
    - href: "https://doi.org/10.5281/zenodo.17578619"
      label: "The dataset"
      dark: true
    - href: "https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/web-scraping"
      label: "The code"
      dark: false
    - href: "/work/"
      label: "All the work"
      dark: false
---

## Featured — a published dataset

The data-capture side of the master's produced something citable: a **Selenium
scraper** that turns a public film site into clean tabular data, and the dataset it
built is **openly published on Zenodo with a DOI**.

> **Letterboxd 1000 Popular Movies Dataset** — Recio Celda, M. & Soriano Reos, J.
> (2025). Zenodo. [10.5281/zenodo.17578619](https://doi.org/10.5281/zenodo.17578619)
> · CC BY-NC-SA 4.0 — 1,000 films × ≈25 fields in a single CSV.

The scraper is built to behave: per-field `try/except` so one missing element never
aborts a film, explicit waits instead of brittle sleeps, and resumable
append-as-you-go output that survives interruptions.
[See the code](https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/web-scraping).

## Databases

Matching the store to the shape of the data — not the other way round — and knowing
the trade-offs (ACID vs. BASE, the CAP theorem) that make each paradigm the right
fit for a given problem.

- **Relational (SQL)** — PostgreSQL, SQLite, SQL Server: modelling, DDL / DML,
  advanced queries, and connecting from Python with SQLAlchemy.
- **NoSQL, by model** — document (MongoDB), column-family (Cassandra), key–value
  (Redis / Riak), graph (Neo4j).

## Data visualization

Turning the above into something readable: **Power BI**, **Flourish** and
**D3.js**, plus the Python and R plotting stacks (matplotlib, seaborn, plotly,
ggplot2, Shiny).
