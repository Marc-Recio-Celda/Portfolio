---
title: "Understanding UMAP"
kind: "Method study"
summary: "A close reading of the UMAP paper to understand how it differs from PCA and t-SNE, and when each is the right tool. Dimensionality reduction with judgement, not defaults."
thumb: "/work/umap.png"
thumbAlt: "UMAP projection of the Digits dataset from 64 dimensions to 2, with the ten digit classes forming separated clusters."
order: 4
draft: false
---

I studied UMAP for a machine-learning assignment: a close reading of the
original paper (McInnes, Healy & Melville) to understand not just *how* it works
but *when* it should be reached for. It is a relatively recent method that has
quickly become standard in fields like single-cell genomics, and I wanted a
first-principles grip on it rather than treating it as a black box. The study
earned the top grade (matrícula de honor) in the course.

## What UMAP does

UMAP is a non-linear dimensionality-reduction method with a strong mathematical
footing in Riemannian geometry and algebraic topology. In practice it builds a
weighted nearest-neighbour graph in the high-dimensional space and then lays that
graph out in low dimensions by minimising the cross-entropy between the two
representations.

Compared with **t-SNE**, the paper's natural point of comparison, UMAP offers:

- **Better preservation of global structure**, not only local neighbourhoods.
- **Much better computational scaling**: it projects hundreds of thousands of
  points in minutes where t-SNE and LargeVis become impractical.
- **Use as a general dimensionality-reduction step**, not only as a 2D
  visualisation tool.

## PCA, t-SNE, UMAP: choosing between them

The point of the study was the trade-offs, not a winner:

- **PCA is linear.** That is precisely its value when it matters: it is
  deterministic, its axes are interpretable, and distances in the projection
  carry a clear meaning. It cannot unfold a curved manifold, but when
  reproducibility and interpretability are the priority, its linearity is a
  feature, not a limitation.
- **t-SNE** excels at revealing local cluster structure but scales poorly and
  distorts global geometry.
- **UMAP** keeps local structure while representing global structure better and
  scaling to large datasets, at the cost of the interpretability caveats below.

## Reading it critically

The paper is honest about UMAP's weaknesses, and so was my study:

- UMAP assumes, almost dogmatically, that the data lie on a geometric manifold.
  Given that assumption, it can *find* structure where there is only noise; the
  paper likens it to seeing constellations in scattered stars.
- **Distances in a UMAP embedding cannot be read literally.** Cluster sizes and
  between-cluster gaps are not faithful; the layout is a hint, not a measurement.
- UMAP is **stochastic, but not irreproducible.** Its randomness comes from
  initialisation and optimisation, and fixing the seed (`random_state`, with a
  spectral initialisation) makes runs reproducible. The apparent instability
  people cite is a configuration issue, not an inherent flaw.

## What I took away

There is no universally best model. The data scientist's job is to read the
important features of a problem (is interpretability crucial? does it need to
scale? is the structure linear?) and pick the method that fits that specific
case. UMAP added a well-understood non-linear option to that toolkit, and the
study left me better equipped to choose deliberately rather than by default.
