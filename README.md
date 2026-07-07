# AI Command Center

A personal, model-agnostic prompt library and workflow system. Works with Claude, ChatGPT, Gemini, or any other capable model — nothing here depends on a specific provider.

## Assumptions (edit these if wrong)

This system was built on these labeled assumptions:

- **Use cases:** studying, coding, writing, planning, research, content ideas, design.
- **Style:** direct, detailed, not too formal, practical, creative, step-by-step but not bloated.
- **You** are a solo user (not a team), you work in English, and you want outputs you can act on the same day.

If any of these are off, fix them in `00-style-header.md` — every prompt inherits from it.

## What's in here

| File | What it is |
|---|---|
| [`00-style-header.md`](00-style-header.md) | The reusable style + anti-bad-output block you paste at the top of any session |
| [`01-use-case-map.md`](01-use-case-map.md) | Your AI use-case map — what to use AI for, and what not to |
| [`02-prompt-library.md`](02-prompt-library.md) | The top 15 reusable prompts, each with Fast and Deep modes |
| [`03-quality-checklists.md`](03-quality-checklists.md) | Per-use-case checklists to judge outputs in under 30 seconds |
| [`04-anti-bad-output.md`](04-anti-bad-output.md) | Named failure modes and the exact lines that stop them |
| [`05-weekly-review.md`](05-weekly-review.md) | The 15-minute weekly routine that improves this library over time |
| [`06-one-page-guide.md`](06-one-page-guide.md) | The one-page "how I should use AI better" guide |

## How to use it (60 seconds)

1. **Start a session** by pasting the block from `00-style-header.md`. That sets your style and blocks generic output for everything after it.
2. **Pick a prompt** from `02-prompt-library.md`. Use **Fast mode** when you need an answer now; **Deep mode** when the output matters or will be reused.
3. **Fill the `[BRACKETS]`**, paste, run.
4. **Check the output** against the matching checklist in `03-quality-checklists.md`. If it fails, use a fix-it line from `04-anti-bad-output.md` instead of re-explaining from scratch.
5. **Once a week**, run the routine in `05-weekly-review.md` to promote what worked and fix what didn't.

## Conventions

- `[LIKE THIS]` = fill in before sending. Everything else is copy-paste as-is.
- Every prompt states its output format so you never get a wall of text you didn't ask for.
- Fast mode = one screen of output, no follow-up questions. Deep mode = allowed to ask up to 3 clarifying questions first, then go long.
