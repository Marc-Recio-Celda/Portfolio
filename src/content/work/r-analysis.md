---
title: "Data analysis & statistics in R"
kind: "Statistics · R"
summary: "Cleaning, hypothesis testing, regression and ANOVA in R. What I'm proudest of is the interpretation: what the numbers mean, and where they stop meaning it."
order: 5
draft: false
page:
  metaTitle: "Statistics in R · Marc Recio"
  metaDescription: "Cleaning, tests, regression and ANOVA, read for what the numbers mean, and for where they stop meaning it."
  label: "More work · 2025 · Statistics"
  headline: "Statistics <span class=\"accent-word\">in R</span>."
  lead: "Cleaning, tests, regression and ANOVA, read for what the numbers mean, and for where they stop meaning it."
  chips: "<span class=\"tag\">MSc in Data Science · UOC</span>"
  shot:
    src: "/work/r-salary-boxplot.jpg"
    alt: "Box plots of gross annual salary for men and women in Spain, on a log scale, the women's box lower"
    caption: "Gross annual salary by sex, from the analysis's INE 2022 data, on a log scale."
  blocks:
    - heading: "What it is"
      html: "<p>Four analyses in R and the tidyverse, each an R Markdown document with its data, knitted so that GitHub renders them, plots and tables, without R.</p>"
    - heading: "How"
      html: "<ul><li>The Spanish pay gap, on INE's 2022 salary survey: the raw gap, about €6,472, barely moves once education, job, tenure and contract are controlled, about €6,131.</li><li>The nationality gap reverses its sign once controlled: Simpson's paradox, caught.</li><li>Tests also written by hand; ANOVA with its assumptions checked first.</li></ul>"
    - heading: "What came out"
      html: "<p>A gap that is structural, and a model honest about its limits: it explains about 36% of the variance, the survey may select, and sex is recorded as a binary.</p>"
  stack: ["R", "tidyverse", "R Markdown", "ANOVA"]
  actions:
    - href: "https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/data-analysis-r"
      label: "See the analyses"
      dark: true
    - href: "/work/"
      label: "All the work"
      dark: false
---

Four self-contained analyses in R (tidyverse), each an R Markdown document with its
data included so it runs end to end. Knitted to GitHub's document format, they
render — plots, tables and all — in the browser, no R required.

**→ [See the analyses on GitHub](https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/data-analysis-r)**

The strongest part of this course, for me, was never the mechanics — it was the
**interpretation**: turning a fitted model into a conclusion that is defensible,
and honest about its own limits.

## Featured — the Spanish gender pay gap

A linear- and logistic-regression study on real INE 2022 salary-survey data
([full analysis](https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/data-analysis-r/3-linear-regression)).
The reasoning matters more than the models:

- **Raw vs. adjusted gap.** A simple regression estimates women earn ≈€6,472 less;
  controlling for education, job type, tenure and contract, the *adjusted* gap
  barely moves (≈€6,131) — evidence the gap is **structural**, not explained by
  those differences.
- **A confounding trap, caught.** The raw nationality gap (foreigners −€5,547)
  **reverses sign** once the other variables are controlled (+€2,478): a textbook
  **Simpson's paradox**, because foreigners concentrate in lower-paid categories.
  The logistic model confirms nationality isn't significant — so it should be
  dropped, not over-read.
- **Honest limits.** The write-up flags what the model *can't* say: only ≈36 % of
  salary variance explained; possible survey selection bias; and that "sex" is
  recorded as a registered binary, which bounds any claim about the "gender" gap in
  a broader sense. It closes on SDG-5, not on overclaiming.

## The rest

- **Hypothesis testing** — Wilcoxon, paired *t* and proportion tests on
  sustainability indicators, each also **implemented by hand** to show the
  mechanics behind the function call, not just the call.
- **Data cleaning** — a real World-Sustainability (SDG) dataset: type and
  consistency checks, an outlier study, correlations and kNN imputation.
- **Preprocessing + ANOVA** — one-way and multifactor ANOVA on a fitness dataset,
  with each test's assumptions justified before it's used.
