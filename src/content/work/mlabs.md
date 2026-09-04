---
title: "MLabs: a working methodology for AI agents"
kind: "Open source · methodology"
summary: "The methodology my work runs on, published: agent roles that keep logs, and checks that aren't trusted until a planted fault has fired them."
status: "Public · tagged release"
order: 3
draft: false
deeper:
  href: "/how"
  label: "How I actually run it, day to day"
---

After years of studying, it grates on me to remember doing or learning something
and not be able to get it back. So I started by building a vault to hold
everything I know. On top of that knowledge a company has grown — a way of
working I intend to keep refining and running for the whole of my working life,
storing what I do and what I learn **so that every project starts from the
experience of the ones before it.**

This is the rulebook half of that, published on its own.

**→ [MLabs on GitHub](https://github.com/Marc-Recio-Celda/MLabs)**

## Why it is public and the rest is not

The rules were pulled out of the system they govern and released with a licence
and a version tag. What stays behind is the operations centre — the knowledge,
the projects, the record — and it will never be published: it holds a decade of
working knowledge and every project I'm paid to do.

That split is also the only honest test of whether the method generalises. **If
the rules only work with my content inside them, they are not a method**, and
publishing them separately is what makes that a question somebody can answer
rather than a claim I get to make.

## The parts I would defend

**A role carries the criterion for retiring it, written before its first run.**
Every agent role keeps a log, and each has a threshold agreed in advance: how
many real findings before the next role is worth hiring, how many empty runs
before this one has stopped earning its place. The thresholds are deliberately
kept *out of the role's own brief* — a role that knows what retires it has a
reason to manufacture the thing it is counted on. And they are numbers a human
reads a log against, never arithmetic that fires by itself, because a threshold
that acts alone retires a role on the round that happened to be quiet.

**A check is not adopted until a planted fault has been seen to fire it.** An
unverified check is worse than none, because it reports success either way. Each
one ships with a deliberate fault that has been observed to trigger it, and a
runner names any published check with no plant behind it.

**Containment is a mechanism, not a promise.** The repository ignores everything
by default and admits files only by explicit allowlist, so a new file is private
until it is named and the failure mode is safe. That allowlist doubles as the
release manifest, and the check for personal data greps *what version control
tracks*, not what happens to be sitting in the folder.

## What it does not have yet

Declared rather than discovered: **no invariant check currently runs without a
human deciding to run it.** The commands exist and each has a plant behind it;
the hook that fires them at a release, without being asked, does not. It is
written down in the repository as the gate on the current stage, where anyone
evaluating it will find it before they find the claims.

Whether a second person can pick this up is still open, and it is a different
question from whether a machine can rebuild it. Both are being walked. Until one
of them has an answer, the honest description is a methodology that
demonstrably runs one company of one — built from the first commit so that this
is testable rather than flattering.
