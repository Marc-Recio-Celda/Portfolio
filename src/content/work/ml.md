---
title: "Machine learning: supervised, unsupervised & ensembles"
kind: "Machine learning"
summary: "Four notebooks — data preparation, clustering, supervised methods and ensembles — each running end to end, with a study of PCA vs t-SNE vs UMAP."
thumb: "/work/umap.png"
thumbAlt: "UMAP projection of the Digits dataset from 64 dimensions to 2, with the ten digit classes forming separated clusters."
order: 4
draft: false
page:
  metaTitle: "Four notebooks, end to end · Marc Recio"
  metaDescription: "Supervised, unsupervised and ensembles, each notebook running top to bottom, and a close study of PCA, t-SNE and UMAP."
  label: "More work · 2025 · Machine learning"
  headline: "Four notebooks, <span class=\"accent-word\">end to end</span>."
  lead: "Supervised, unsupervised and ensembles, each notebook running top to bottom, and a close study of PCA, t-SNE and UMAP."
  chips: "<span class=\"chip\" style=\"--tone:var(--a-sage)\">Top grade</span><span class=\"tag\">MSc in Data Science · UOC</span>"
  shot:
    src: "/work/umap.png"
    alt: "UMAP projection of the Digits dataset from 64 dimensions to 2, the ten digit classes forming separate clusters"
    caption: "UMAP on the Digits dataset: 64 dimensions down to 2."
  blocks:
    - heading: "What it is"
      html: "<p>Four worked notebooks from my master's, collected in a public repository: data preparation, clustering, supervised methods and ensembles. GitHub renders each one with its plots, so the work reads without running anything.</p>"
    - heading: "How"
      html: "<ul><li>On imbalanced data, F1-macro as the target, with balanced class weights and the minority class's recall watched; TabPFN as a modern point of comparison.</li><li>Ensembles on a churn problem, opened by an audit of a language model's guesses against the data.</li><li>One conda environment for all four.</li></ul>"
    - heading: "What came out"
      html: "<p>The study of PCA, t-SNE and UMAP earned the course's top grade, <i>matrícula de honor</i>: no method wins everywhere. UMAP's distances cannot be read literally, and its runs repeat once the random state is fixed.</p>"
  paper: "<div class=\"blk paper reveal\">\n        <h2>A paper, reviewed</h2>\n        <p>UMAP is already the standard method in single-cell genomics. For the same course I reviewed its paper, McInnes et al. (2020), in a short talk, its claims set against my own runs on the Digits data, where t-SNE and UMAP group the same points differently.</p>\n        <div class=\"paper__cols\">\n          <div><p class=\"paper__k\">What it claims over t-SNE</p><ul><li>Better global structure.</li><li>Faster, and it scales to large datasets, as its benchmarks bear out.</li><li>More than two dimensions out, and reduction in general, not only a picture.</li></ul></div>\n          <div><p class=\"paper__k\">What the paper itself admits</p><ul><li>It can see structure where there is only noise, as in constellations.</li><li>It is stochastic: runs can differ.</li><li>Its axes cannot be interpreted: PCA or NMF when they must be.</li></ul></div>\n        </div>\n        <p class=\"paper__close\">Choose the model for the data, not for fashion: an embedding is for exploring, not a proof.</p>\n      </div>"
  stack: ["scikit-learn", "pandas", "TabPFN", "UMAP", "Jupyter"]
  actions:
    - href: "https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/machine-learning"
      label: "See the notebooks"
      dark: true
    - href: "/work/"
      label: "All the work"
      dark: false
---

Four worked notebooks spanning the supervised / unsupervised / ensemble toolkit,
collected in a public repository. Each runs top to bottom from one
`environment.yml`, and GitHub renders every one with its plots and tables inline —
so the work can be read without running anything.

**→ [See the notebooks on GitHub](https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/machine-learning)**

## Supervised methods

Classification with k-NN, SVM, logistic regression and decision trees, judged the
way the problem demands: on **imbalanced data** the optimisation target is
**F1-macro**, not accuracy, with `class_weight="balanced"` and minority-class
recall watched to keep real losses down. Evaluation is done properly — confusion
matrices, ROC / AUC, cross-validation — and includes **TabPFN**, a transformer for
tabular data, as a modern point of comparison.

## Ensembles, and a critical audit

Bagging (random forests, plus a balanced variant for skewed classes), boosting
(gradient boosting) and **stacking / cascading** of the base learners, on a B2B
churn problem. The notebook opens with a deliberately critical exercise:
**auditing a large language model's domain guesses against the data** — several of
the model's confident predictors collapse under the actual correlations, which is
exactly the point. Judgement over authority.

## Unsupervised learning

Clustering with k-means (choosing *k* by elbow and silhouette), DBSCAN and
hierarchical clustering read from dendrograms, plus anomaly detection with
Isolation Forest.

## Dimensionality reduction — PCA, t-SNE, UMAP

A close study of the three on the same data, for **criterion rather than a winner**
(this piece earned the course's top grade, *matrícula de honor*):

- **PCA is linear** — and that is its value: deterministic, interpretable axes,
  distances that mean something. When reproducibility and interpretability matter,
  linearity is a feature, not a limitation.
- **t-SNE** reveals local cluster structure but scales poorly and distorts global
  geometry.
- **UMAP** keeps local structure, represents global structure better and scales to
  large datasets (it has become standard in single-cell genomics) — with caveats
  read critically: distances in the embedding **cannot be taken literally**, and it
  is **stochastic but not irreproducible** (fixing `random_state` with a spectral
  initialisation makes runs reproducible; the instability people cite is a
  configuration issue, not an inherent flaw).

The throughline: there is no universally best model. The job is to read a problem's
features — interpretability? scale? linear structure? — and choose the method that
fits.

## Reproducibility

One conda environment for all four notebooks (`environment.yml`), created and
activated in three lines. The repository even carries its own
[`nexus/` index](https://github.com/Marc-Recio-Celda/DS-miniprojects/tree/main/nexus)
— my working system, applied to a real project.
