# 5. Weekly Review — 15 Minutes That Compound

The library only stays good if it evolves with your actual usage. One 15-minute session per week. Pick a fixed slot (assumption: Sunday evening or Friday end-of-day works; put it in your calendar or it won't happen).

## During the week: the 5-second log

Reviews die when they require memory. So during the week, whenever an AI interaction is notably **great** or notably **bad**, add one line to `log.md` (create it in this repo, or use any notes app):

```text
[DATE] [PROMPT # or "ad-hoc"] [WIN/FAIL] one line on what happened
```

Examples:
```text
07-03 P3 WIN found the async bug in one shot after I included the caller code
07-04 P6 FAIL draft was generic sludge; my notes were 2 bullets — too thin an input
07-05 ad-hoc WIN "grade me like a TA" phrasing made feedback way more honest
```

That's the entire in-week burden. If you log nothing all week, the review is just steps 4–5.

## The weekly session (15 min)

**1. Scan the log (3 min).** Read the week's lines. Look for repeats: the same prompt failing twice, the same fix line pasted twice, the same phrasing winning twice.

**2. Promote wins (4 min).** Any ad-hoc phrasing that worked → merge it into the relevant prompt in `02-prompt-library.md`. Any fix line you pasted more than once → it graduates into the prompt (or the style header, if it applies everywhere).

**3. Fix one loser (5 min).** Pick the WORST performing prompt of the week — just one — and run it through **P15 (Prompt Improver)** with the actual bad outputs as evidence. Replace the old version. One prompt per week is enough; that's 52 evidence-based upgrades a year.

**4. Prune (1 min).** A prompt unused for ~4 weeks: still relevant? If your usage shifted, update the [use-case map](01-use-case-map.md) — add the new use case, demote the dead one. The map should describe what you DO, not what you planned.

**5. One experiment (2 min).** Write down one thing to try next week. Examples: use Deep mode where you defaulted to Fast; try a prompt on a different model; add a voice sample to P6; try P2's diagnostic before a study session. Next week, step 1 tells you if it worked.

## Monthly (first review of the month, +10 min)

- Re-read `00-style-header.md` — does it still match how you want AI to work with you? It drifts as you level up.
- Check the guardrails in `01-use-case-map.md`: did you catch yourself trusting unverified facts, or outsourcing recall while studying? Adjust behavior, not just prompts.
- Version bump: commit changes with a message like `library v1.3: sharpened P6, merged honesty line into header, retired P13`. Git history becomes the record of what you learned about working with AI.

## The one metric

If you track just one thing: **re-prompt rate** — how often the first output was usable vs. needed a fix line. It should trend down. If a prompt needs fixing every time you use it, the prompt is broken, not the model.
