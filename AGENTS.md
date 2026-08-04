# AGENTS.md

> Instructions for AI agents working in this repository. **Read this at the start of every
> session.**
>
> **If you can only retain one section, retain §3 (invariants).** Every rule here exists
> because you could not deduce it by reading the repo — anything you could have, isn't here.

## 1. Workflow

- **Planning:** Marc's project chat decides design, copy and method.
- **Execution:** you. You write and edit **code**, of which you're the sole author.
- On a **design fork**, stop and lay it out. Don't decide silently.
- If the task is defined, **execute it without asking**. Mandatory consultation only kicks in
  when a constraint stops you from acting.

### Startup Protocol

Read `state.md` (§2) and report in a fixed format:

> 📍 State: block [Bn], last action [...], resume point [...]. Do we continue, or is there a
> change of front?

**Exception:** if Marc opens with a specific, self-contained question, answer it and *then*
report the state.

## 2. Source of Truth — Living Documents (READ-ONLY for your own initiative)

**They don't live in this repo.** They live in the **NEXUS** vault — its own git repo, cloned
**alongside this one** (neighbour rule, §5). Full literal path, so you never have to explore
anything:

```
../NEXUS/98_PROJECTS/Portfolio/nexus/
```

- `state.md` — definition, block status, **the Decision Log (`Dn`)**, active risks, resume
  point. ⚠️ This project keeps its decision log **inside** `state.md`: there is no separate
  `Decision_Log.md`, no `workflow.md`, no `definition.md`. Don't go looking for the
  template's other files and don't create them — they were never made here.
- `architecture.md` — the `AX-n` axioms. **This is the one that constrains your code** (§3).

**NEXUS has its own `AGENTS.md` at its root, and it governs you while you're inside that
repo.** Read it before writing anything there: it carries the permission table — almost
everything is 🔴 read-only, `98_PROJECTS/` included — and the origin rule that qualifies it.

**Why there and not here: the split is by owner, not by rate of change.** The code belongs to
the project and can have collaborators; `nexus/` is **Marc's** planning layer applied to it,
and nobody else writes `state.md`. Owners don't change when the workflow does; rates do.

> If `../NEXUS` doesn't exist on this machine, **don't stall and don't invent it**: carry on
> with what you have, say so explicitly in your reply, and don't claim to know where the
> project stands.

## 3. Execution Invariants (ALWAYS Respect These)

- **[AX-2] Every URL goes through `withBase()`** (`src/utils/url.ts`). The site deploys as a
  GitHub Pages *project site* under `/Portfolio`, not at the domain root. ⚠️ **A hardcoded
  `href="/work/…"` works in `dev` and breaks in production** — the failure is invisible until
  after the deploy. Applies to `<img src>` too, and to links written inside content files.
- **[AX-6] Zero hex values in components.** `src/styles/tokens.css` is the only source of
  colour, type and scale; if a token is missing, add it there. ⚠️ **The full viridis ramp
  (`--v0`…`--v5`) is reserved for the signature scatter plot and nothing else.** Everything
  else uses `--accent` / `--accent-deep`. Reaching for the ramp elsewhere destroys a
  deliberate visual hierarchy, and it reads as a fix rather than as the mistake it is.
- **[AX-4] Visible content is English, and only English.** Code comments are Spanish (§7);
  anything a visitor reads, never. ⚠️ **A screenshot counts as visible content** — a captured
  UI showing Spanish filenames breaks this axiom exactly as a Spanish paragraph would, and
  that is how it was broken before.
- **[Charter §5] Views are generated, not captured.** Structures that belong to the method —
  layer models, permission tables, flow diagrams — are **drawn as components** from the
  tokens, so they cost seconds to correct when the method moves. **Don't add a screenshot of
  a living system to explain something you could draw**: it is a view somebody then has to
  remember to update, and nobody does. The two photographs under `/how` are deliberate
  exceptions — the knowledge graph and one real decision log, neither of which can be
  redrawn.
- **[AX-1] Static site, zero client JS.** No `client:*` directive anywhere in `src/`. If a
  feature seems to need hydration, find the CSS / `<details>` / native-form version first.
  Adding hydration is a **decision (`Dn`)**, not an implementation detail.
- **[AX-5] Adding a project means adding a `.md`** to `src/content/work/`, never touching a
  component. The Zod schema in `src/content.config.ts` is the contract, so a new field means
  changing the schema first. `order` governs navigation; `kind` tags by **type of
  contribution**, never by course code — a reader knows "Machine learning", not "M2.891".
- **[AX-3] One source for metadata and contact:** `src/consts.ts`. No component repeats an
  email, a phone number or the positioning line.
- **Don't alter an axiom without an explicit `Dn`** that Marc requests. If something
  contradicts one, flag it and ask whether to log a decision that amends it.

## 4. Log — The Mailbox

§2's documents are read-only for your own **initiative**. When you detect something that
should change in one of them, don't change it: deposit it, signed, in the mailbox. Marc
integrates it.

⚠️ **This project has no mailbox of its own** — its `nexus/` holds only the two files in §2.
Until it has one, entries go to the vault's `99_SYSTEM/MAILBOX_agents.md` with the
destination `→ Portfolio/state.md`. **Don't create the file here to close the gap**: say so
and let Marc decide.

**Exception — the change's origin.** The block protects against your *initiative*, not your
hands. A change originated by Marc in the conversation you execute and record without asking
permission: transcribing is your job. One you originate **always** goes to the mailbox.

**Format:** `### [pendiente] → destination — title · (agent, date)`. **Revalidate before
proposing:** cite the file and line, and check the entry still holds.

### Incoherences — Passive Detection

If you **stumble** onto an incoherence, note it in the mailbox and **keep going**. Three
rules: **only what you cross** · **one line, no investigating** · **never fix it**.

## 5. Topology

- **Neighbour rule:** NEXUS and this repo are cloned at the same level, which is what makes
  §2's `../NEXUS` path resolve.
- Git: stable branch **`main`** — ⚠️ **not `master`**, unlike NEXUS, autocatalogue and
  aynimd. Working branch: **`portfolio`**; commit there freely.
- ⚠️ **`main` is the published branch: a push to it deploys to the world**
  (`.github/workflows/deploy.yml`, AX-7). Committing on `main` here isn't untidy, it's
  publishing. **Never commit on `main`, and never push** — Marc merges and pushes.
- **Never commit a build.** `dist/` and `.astro/` are generated and gitignored.
- No `push --force`, ever.

## 6. Commands

```bash
npm run dev      # dev server; the site lives under /Portfolio, not at the root
npm run build    # the real check — it catches what dev tolerates. Run it before handing over
npm run preview  # serve the built output
```

⚠️ **A dev server may already be running.** Astro refuses to start a second one and prints
the live URL and PID instead. Read that message before killing anything: it's usually the
server you wanted.

## 7. Code Conventions

- **Component comments in Spanish**, like the ones already there, and they explain *why the
  block exists* — the design intent behind it — not what the markup does. Visible content is
  still English-only (AX-4).
- Write code that reads like the code around it.
