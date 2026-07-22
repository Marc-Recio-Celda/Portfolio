---
title: "Machine learning: supervised, unsupervised & ensembles"
kind: "Machine learning"
summary: "Four notebooks from the master's ML course — data preparation, clustering, supervised methods and ensembles — each running end to end from a single environment and rendered with its outputs on GitHub. Includes a study of PCA vs t-SNE vs UMAP."
thumb: "/work/umap.png"
thumbAlt: "UMAP projection of the Digits dataset from 64 dimensions to 2, with the ten digit classes forming separated clusters."
order: 3
draft: false
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
