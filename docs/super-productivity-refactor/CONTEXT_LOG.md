# Context Log — super-productivity → productivity-maxxing refactor project

> Purpose: crash-safe running log of every step taken in this project. If a session
> dies, a new session should read this file top-to-bottom and be able to resume.
> Updated and pushed at every step.

## Project goal

Clone https://github.com/super-productivity/super-productivity into the user's own
repo **`lormaigai/productivity-maxxing`** (NOT fable-five — fable-five is only a
temporary crash-safe backup location for these docs), then produce:

1. A **code-design refactor plan** (analyze codebase, propose highest-value refactors)
2. A **PRD** for the refactor work
3. An **eval plan**
4. A **smoke test plan**
5. A **UAT test plan**
6. A **series of prompts** to drive the work with subagents in future sessions

Decisions made by the user (2026-07-07):
- Target repo: `lormaigai/productivity-maxxing` (user typed URL `productive-maxing`; both spellings currently inaccessible — see blockers)
- Clone mode: **snapshot** — latest code as a fresh initial commit, not a full history mirror
- Refactor scope: **analyze & propose** — Claude analyzes the architecture and targets the highest-value design problems

## Blockers (action required from user)

- ❌ `lormaigai/productivity-maxxing` AND `lormaigai/productive-maxing` both return
  "not found or no access" from `add_repo`. The Claude GitHub app must be granted
  access to the target repo (GitHub → Settings → Applications → Claude app →
  Repository access, or via claude.ai GitHub settings). Until then, all work is
  backed up on `lormaigai/fable-five` branch `claude/super-productivity-refactor-vup4kp`.
- ❌ GitHub MCP server unauthenticated in this session → cannot create repos via API.

## Migration procedure once access is granted

1. `add_repo` owner=`lormaigai` repo=`productivity-maxxing` (or correct spelling)
2. Clone it; copy the super-productivity snapshot in (working tree only, no upstream `.git`)
3. Copy `docs/super-productivity-refactor/` from fable-five branch into the target repo (e.g. under `docs/refactor/`)
4. Commit + push; verify on GitHub; then this fable-five branch can be deleted

## Environment notes

- Snapshot clone location (ephemeral container): `/tmp/claude-0/-home-user-fable-five/ec9aa46b-12af-562f-a792-29c46d73db61/scratchpad/super-productivity` (shallow, depth 1)
- The container is ephemeral: anything not pushed to git is lost when the session ends.
- Backup branch: `lormaigai/fable-five` @ `claude/super-productivity-refactor-vup4kp`

## Step log

| # | Timestamp (UTC) | Step | Result |
|---|-----------------|------|--------|
| 1 | 2026-07-07 | Session start; tried `add_repo lormaigai/productive-maxing` | ❌ no access |
| 2 | 2026-07-07 | Asked user: target repo, clone mode, refactor scope | ✅ answers recorded above |
| 3 | 2026-07-07 | Tried `add_repo lormaigai/productivity-maxxing` | ❌ no access — blocker logged |
| 4 | 2026-07-07 | Started shallow clone of super-productivity into scratchpad (background) | ⏳ in progress |
| 5 | 2026-07-07 | Created docs structure + this context log; committing to backup branch | ⏳ |
