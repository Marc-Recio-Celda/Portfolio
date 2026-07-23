---
title: "Data-science thesis"
kind: "Master's thesis"
summary: "My data-science master's thesis, with the TomsBioLab research group: an automated pipeline that turns grapevine-genomics papers into an evidence-graded gene catalogue — LLMs to read the papers, deterministic code for the calls that must be reproducible, and a human expert in the loop. Built to feed the PlantaeViz platform."
status: "In progress"
order: 1
draft: false
---

The anchor of my data-science master's (UOC), developed with the **TomsBioLab**
research group: a computational-genomics project where the machine-learning and
data-engineering methods I've been building meet a real curation problem in plant
genomics.

## The problem

Knowledge about grapevine (*Vitis vinifera*) genes is scattered across thousands of
papers. The field's reference catalogue — from the Integrape COST action — curates
around 3,000 genes on a published **6-level evidence scale** (Navarro-Payá et al.,
2022), from *hypothetical* up to *experimentally validated in grapevine*. But roughly
three-quarters of those genes sit at the lower, *putative* tiers, and only about 8 %
carry a written description of function. Raising that evidence and filling those gaps
means reading the literature by hand — which doesn't scale.

## The approach

Given a scientific paper (PDF/XML), the pipeline pairs large language models with
deterministic code across four steps:

- **Extract, with a human check.** LLMs identify the *Vitis vinifera* genes in the
  paper and their IDs. This is the most critical step — everything downstream rests on
  it — so a human stays in the loop to confirm the genes before anything is built on
  them.
- **Decide the level by rule, not by opinion.** The model doesn't assign the evidence
  level. Instead it answers a set of structured yes/no questions, and deterministic,
  tested code turns those booleans into the level on the 6-level scale — a precise,
  repeatable mapping instead of a model's guess.
- **Characterize.** A separate step extracts the descriptive features that genuinely
  need language understanding and can't be derived by rule.
- **Emit.** The result is a new catalogue row, mapped straight into the PlantaeViz
  database.

## Engineering for trust

The point isn't to trust the model — it's to make its output something a scientist can
check, correct and reproduce.

- **A human expert stays in charge.** At every stage the paper's own author, or a
  curator, can override the pipeline — the genes it assigned, the evidence level, or the
  extracted characteristics — whenever they judge the model got it wrong. Human review
  guards accuracy; the automation just does the heavy lifting.
- **Rules over opinions, so it's auditable.** Because the evidence level comes from
  tested code over the model's yes/no answers — not from the model's own judgment —
  every level is reproducible and traceable back to the facts behind it. No black boxes.
- **Model-agnostic and portable.** Providers sit behind a single interface, so any lab
  can run the whole pipeline locally on its own, more powerful reasoning model if it has
  one — though the base model already performs very well. The model it ships with was
  chosen after benchmarking many candidates, not by default.

## Status, and where it's going

The thesis is in progress, and I'm deliberately not posting results yet. If they hold,
the extended catalogue and the classifier are intended to be published as part of the
**PlantaeViz** platform — including a web app where a researcher uploads a paper and
gets evidence-graded classifications back, ready to review and correct.

Happy to discuss the work before then — [email me](mailto:marcreciocel@gmail.com).
