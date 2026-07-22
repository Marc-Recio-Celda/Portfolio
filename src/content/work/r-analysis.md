---
title: "Data analysis & statistics in R"
kind: "Statistics · R"
summary: "Four end-to-end analyses from the statistics course — cleaning, hypothesis testing, regression and ANOVA — worked in R with the tidyverse. What I'm proudest of here is the interpretation: reading what the numbers actually mean, and where they stop meaning it."
order: 4
draft: false
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

- **Raw vs. adjusted gap.** A simple regression estimates women earn ~€6,472 less;
  controlling for education, job type, tenure and contract, the *adjusted* gap
  barely moves (~€6,131) — evidence the gap is **structural**, not explained by
  those differences.
- **A confounding trap, caught.** The raw nationality gap (foreigners −€5,547)
  **reverses sign** once the other variables are controlled (+€2,478): a textbook
  **Simpson's paradox**, because foreigners concentrate in lower-paid categories.
  The logistic model confirms nationality isn't significant — so it should be
  dropped, not over-read.
- **Honest limits.** The write-up flags what the model *can't* say: only ~36 % of
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
