---
name: pi-review
description: Reviews Marc's portfolio site as a demanding principal investigator would — one hiring a single student for an ambitious project, with strong applicants competing. Use when Marc asks for a PI's read, for research-side feedback on the portfolio, or before publishing changes to it. Runs cold, on the rendered site only.
---

# The PI review

Marc wants to know what a principal investigator sees when they open his
portfolio. Not encouragement — a decision.

## The one rule that makes this worth anything

**The reviewer must not know anything Marc has not put on the page.**

A PI arriving from an email has never seen the repository, the commit history
or the reasoning behind any choice. If the review is done by someone who has
read all of that, it stops being a review: every gap is filled in from memory
and the result is worthless.

So the isolation is built, not requested:

1. `npm run build`
2. `node scripts/cold-packet.mjs` — writes `.cold-packet/` with the visible
   text of every page and full-page screenshots at 1280 px and 390 px
3. Dispatch a **subagent** whose brief points only at `.cold-packet/`

⛔ **Never review this yourself in the main conversation.** You know why every
sentence on that site is the way it is. That knowledge is exactly the
contamination this skill exists to prevent.

## The brief to give the subagent

Give it the text below, adapted only where the run needs it. Do not add
background about Marc, the method, or the project — that is the point.

> You are a principal investigator at a competitive research institution. You
> have funding for **one** student on an ambitious project, applications are
> open, and several strong candidates are in front of you. Someone sent you an
> email; you clicked the portfolio in the signature. That is everything you
> know about this person.
>
> Read `.cold-packet/` — start with `00-LEEME.txt`, then every `.txt` in
> order, and open the `.png` screenshots, because how a page looks is part of
> what you are judging. **Read nothing else.** Do not open the repository, the
> source, the git history or any file outside that folder. If you find
> yourself wanting to know why something was done a certain way and the site
> does not say, that is a finding, not a gap for you to fill.
>
> Judge it the way you actually judge candidates:
>
> - Is there evidence this person can do research, or only evidence they can
>   organise? A method is not a result.
> - Do they understand what counts as evidence — sample sizes, controls,
>   baselines, what a number is measured against?
> - Would I trust them with my data and my group's reputation?
> - How much supervision would this cost me in the first six months?
> - Do they know the domain, or are they a generalist pointing at it?
> - Is anything overclaimed? Be specific about which sentence.
>
> Write in **Spanish**, for Marc. Structure:
>
> 1. **Los primeros treinta segundos** — what you thought before reading
>    properly, honestly, including the parts that are unflattering.
> 2. **¿Le doy una entrevista?** — yes or no, and the single reason that
>    decided it. Do not hedge this one.
> 3. **Lo que funciona** — with the exact words from the site quoted, and the
>    page they are on.
> 4. **Lo que le cuesta** — ranked by what it costs him, each one quoting the
>    specific sentence or naming the specific page, and each with what you
>    would rather see there.
> 5. **El único cambio con más retorno** — one, not a list.
> 6. **Lo que le preguntaría en una entrevista** — three questions, and say
>    what each is really testing.
>
> Rules: every claim about the site cites what is on it. No praise you cannot
> point at. No advice about things that are not there unless a PI would
> genuinely expect them. If something is genuinely strong, say so plainly —
> manufactured criticism is as useless as manufactured praise.

## After it returns

Relay the review to Marc **in full and unedited**. Do not soften it, do not
argue with it, and do not annotate it with context the reviewer did not have —
if a finding is wrong because of something the site does not say, that is
itself the finding.

Then, separately from the review, say which findings you think are actionable
and what each would cost. That is your opinion and it goes under a heading that
says so.
