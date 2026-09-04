---
title: "MLabs: a working methodology for AI agents"
kind: "Open source · methodology"
summary: "A public, versioned methodology for running real projects with AI agents doing the execution: three levels of governance, roles that keep logs and carry a written criterion for when to retire them, and checks that are not adopted until a planted fault has been seen to fire them."
status: "Public · tagged release"
order: 3
draft: false
deeper:
  href: "/how"
  label: "How I actually run it, day to day"
---

Most write-ups of "how I work with AI" are an essay. This one is a repository
you can clone, with a licence, a version tag and a set of rules that can be
checked by running a command.

**→ [MLabs on GitHub](https://github.com/Marc-Recio-Celda/MLabs)**

## Why it exists as its own thing

I had been building a personal knowledge and project system for a while, and
the rules governing it kept getting mixed up with the content they governed —
a flat list where a naming convention and a founding principle sit at the same
level. A flat list has no hierarchy, so when two rules conflict it protects
whichever one is most salient rather than whichever one matters most.

So the rules were pulled out into a separate, public artefact. What is left
behind is the operations centre — the knowledge, the projects, the record, all
private. The split is by owner, not by rate of change: **the methodology is a
constitution, and the operations centre is the country.** One is publishable and
generic; the other holds a decade of working knowledge and every project I'm
paid to do, and will never be published.

That separation is also the honest test of whether the method generalises. If
the rules only work with my content inside them, they are not a method.

## The shape

Governance runs on three levels, and blurring them is the failure the split was
made to fix.

- **Philosophy** — what the system optimises for, and what it refuses. A small
  set of clauses, one objective above them, and an explicit rule for which
  clause wins a tie. It breaks ties and nothing else does.
- **Axioms** — the rules that implement the clauses and may never be violated.
  Each one names the clause it serves and, where it exists, the command that
  checks it. **The coverage is regenerated from the rows themselves rather than
  written by hand**, so a clause that no rule implements shows up as a number
  instead of going unnoticed.
- **Decisions** — the concrete choices, with author, date, reasoning and what
  was discarded. These live in the private operations centre, never in the
  public repository.

The same three levels repeat one floor down inside a project, with its own
axioms and its own auditor. That is what makes the pattern reproducible rather
than bespoke: adopting it isn't copying one person's rules, it's instantiating
a shape.

## The parts I think are actually novel

**A role carries the criterion for retiring it, written before its first run.**
Every agent role keeps a log, and each has a threshold agreed in advance — how
many genuine findings before the next role may be hired, how many consecutive
empty runs before this one has stopped earning its place. The thresholds are
deliberately kept *out of the role's own brief*, because a role that knows what
retires it has a reason to manufacture the thing it is counted on. They are
numbers a human reads a log against, never arithmetic that fires by itself: a
threshold that acts on its own retires a role on the round that happened to be
quiet.

**A check is not adopted until a planted fault has been seen to fire it.** An
unverified check is worse than no check, because it reports success either way.
Each one ships with a deliberate fault that has been observed to trigger it, and
a test runner names any published check that has no plant behind it. The rule
extends to the plant itself: plant against the format rather than into it,
because a fault written in the file's own style reproduces the file's own blind
spot.

**Measurement has its own clause, with teeth.** Every metric declares whether it
exists to *steer* a decision or to *prove* something to someone with no reason
to believe us — one that does neither is a dashboard. A metric carries its
denominator. It has to be able to move in the bad direction, and the run where
it does is the reason it exists. And the unflattering counts — what was
rejected, withdrawn, never confirmed — go inside the number rather than in an
appendix.

**Containment is a mechanism, not a promise.** The repository ignores everything
by default and admits files only by explicit allowlist, so a new file is private
until it is named and the failure mode is safe. The allowlist doubles as the
release manifest, and the check that looks for personal data greps *what version
control tracks*, not what happens to be in the folder.

## What it does not have yet

Declared rather than discovered: **no invariant check currently runs without a
human deciding to run it.** The commands exist and each one has a plant behind
it; what is missing is the hook that fires them at a release without being
asked. It is written down as the gate on the current stage, in the repository,
where anyone evaluating it will see it before they see the claims.

Templates are staged behind a **cold-start test** — an agent, or a stranger,
given only this repository has to reach productive work. A stage that fails that
test is not done, and saying so in public is cheaper than discovering it later.

## Where I'd take it

The interesting open question is whether a second person can instantiate it,
which is not the same question as whether a machine can rebuild it from the
repository. Both are written down as open, both are being walked, and neither
has an answer yet. Until one does, the honest description is a methodology that
demonstrably runs one company of one — and is built, deliberately and from the
first commit, so that this is a testable claim rather than a flattering one.
