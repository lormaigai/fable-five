# 1. My AI Use-Case Map

What I use AI for, what "good" looks like in each area, and which prompt to grab. Prompts live in [`02-prompt-library.md`](02-prompt-library.md).

## The map

| # | Use case | I use AI to… | "Good output" means… | Prompts |
|---|----------|--------------|----------------------|---------|
| 1 | **Studying** | Understand hard concepts, prep for tests, retain material | I can explain it back and answer questions cold | P1, P2 |
| 2 | **Coding** | Debug, build features, review my code | It runs, I understand it, and it didn't grow extra complexity | P3, P4, P5 |
| 3 | **Writing** | Draft from my ideas, edit/tighten my drafts | Sounds like me, says something specific, half the length I feared | P6, P7 |
| 4 | **Planning** | Turn goals into plans, plan my week | Concrete next actions with realistic sizes, not a wish list | P8, P9 |
| 5 | **Research** | Get oriented on a topic, compare options and decide | I know the landscape, the trade-offs, and what I'd verify | P10, P11 |
| 6 | **Content ideas** | Generate angles, turn one idea into many pieces | At least 3 ideas I'd genuinely make, not listicle sludge | P12, P13 |
| 7 | **Design** | Get direction, critique what I made | Specific visual decisions I can execute, not "make it clean" | P14 |
| 8 | **Meta** | Improve my own prompts and this library | Next version of a prompt measurably beats the old one | P15 |

## Decision rule: Fast mode or Deep mode?

Use **Fast** when any of these are true:
- You need it in the next 10 minutes.
- The output is disposable (you'll act on it once and throw it away).
- You already know the domain and just need the work done.

Use **Deep** when any of these are true:
- The output will be reused, published, or built on.
- Being wrong is expensive (a decision, a grade, production code).
- You're new to the domain and can't judge a shallow answer.

## What I should NOT use AI for (guardrails)

- **Sole source for facts that matter** — AI drafts, I verify names, numbers, dates, citations.
- **Decisions that are really about my values** — AI structures the trade-offs; I make the call.
- **Skipping the struggle when the struggle is the point** — for studying, generate practice and explanations, don't have it do the recall for me.
- **Anything I couldn't roughly check** — if I can't evaluate the output at all, I shrink the task until I can.

**Assumption:** these eight areas match the "studying, coding, writing, planning, research, content ideas, design" list, plus a meta category because a prompt library needs one. Add/remove rows as your usage changes — that's a weekly-review action.
