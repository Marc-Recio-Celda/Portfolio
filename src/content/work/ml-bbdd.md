---
title: "ML, databases & data-visualization tools"
kind: "Tools I've used"
summary: "A quick reference to the machine-learning algorithms I have worked with, the databases I studied and the tools I visualise data with across the master's, enough to show I know what each is for. The worked notebooks and detailed notes live in my NEXUS vault."
thumb: "/work/viz.jpeg"
thumbAlt: "A Power BI dashboard of Spanish vehicle registrations: headline totals, distribution by province, vehicle origin and type, and registrations per year."
order: 3
draft: false
---

## Machine learning

**Supervised classification**

- k-Nearest Neighbours (KNN)
- Support Vector Machines (SVM)
- Logistic regression
- Decision trees
- Ensembles: Random Forest and a balanced variant for imbalanced classes
  (bagging), Gradient Boosting (boosting), plus stacking and cascading of the
  base learners above

**Supervised regression**

- Linear and regularised (Ridge) regression
- TabPFN, a transformer-based model for tabular data

**Unsupervised clustering**

- k-means, choosing *k* with the elbow method and silhouette score
- DBSCAN (density-based)
- Hierarchical clustering, read off dendrograms

**Dimensionality reduction**

- PCA (linear), t-SNE and UMAP (non-linear), compared on the same data

**Supporting work**

- Anomaly detection with Isolation Forest
- Exploratory data analysis, preprocessing and feature engineering as the
  groundwork underneath all of the above

## Databases

The point is matching the store to the shape of the data, not the other way
round, knowing the trade-offs (ACID vs. BASE, the CAP theorem) that make each
paradigm the right fit for a given problem.

**Relational (SQL)**

- PostgreSQL, SQLite, SQL Server: modelling, DDL/DML, advanced queries, and
  connecting from Python with SQLAlchemy

**NoSQL, by model**

- Document: MongoDB
- Column-family: Cassandra
- Key–value: Riak / Redis
- Graph: Neo4j

## Data visualisation

Tools I have worked with to turn the above into something readable: **Power BI**,
**Flourish** and **D3.js**, plus the Python and R plotting stacks
(matplotlib, seaborn, plotly, ggplot2, Shiny).
