---
title: "Data capture, databases & visualization"
kind: "Other work"
summary: "A Selenium scraper whose dataset is now published on Zenodo with a DOI, plus a working reference of the databases I model with and the tools I visualize data with across the master's."
thumb: "/work/viz.jpeg"
thumbAlt: "A Power BI dashboard of Spanish vehicle registrations: headline totals, distribution by province, vehicle origin and type, and registrations per year."
order: 5
draft: false
---

## Featured — a published dataset

The data-capture side of the master's produced something citable: a **Selenium
scraper** that turns a public film site into clean tabular data, and the dataset it
built is **openly published on Zenodo with a DOI**.

> **Letterboxd 1000 Popular Movies Dataset** — Recio Celda, M. & Soriano Reos, J.
> (2025). Zenodo. [10.5281/zenodo.17578619](https://doi.org/10.5281/zenodo.17578619)
> · CC BY-NC-SA 4.0 — 1,000 films × ~25 fields in a single CSV.

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
