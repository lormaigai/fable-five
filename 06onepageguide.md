# 6. How I Should Use AI Better — One Page

Print this or pin it. Everything else in the repo is implementation detail.

## The core loop

**Context in → specific ask → format spec → check → fix line.** Every good interaction is this loop. When output disappoints, the cause is almost always in the first two steps — the model can't use context you didn't give it.

## 10 rules

1. **Start every session with the style header** (`00-style-header.md`). It prevents 80% of bad output before it happens.

2. **Give context like you're briefing a smart new hire.** Your situation, your constraints, what you've tried, what "good" looks like. The #1 upgrade available to you is pasting more relevant context, not finding magic words.

3. **Pick the mode deliberately.** Fast for disposable output you can judge; Deep for anything reused, published, graded, or shipped. Defaulting to Fast for important work is the most common self-inflicted wound.

4. **Make the model commit.** Demand a recommendation, a confidence level, and what would change its mind. A balanced survey is the model protecting itself, not helping you.

5. **Fix, don't restart, don't re-explain.** One targeted fix line (`04-anti-bad-output.md`) beats rewriting your prompt from scratch. But the same failure twice = start a fresh chat with the fix baked in.

6. **Verify load-bearing facts. Always.** Names, numbers, dates, citations, API calls. Fluent and confident is not the same as true, and fabrication reads exactly like good output. AI drafts; you fact-check the parts that carry weight.

7. **Stay the decision-maker.** AI structures trade-offs, generates options, and argues sides. Values calls, final judgment, and accountability are yours. If you can't evaluate an output at all, shrink the task until you can.

8. **Use AI against yourself.** Its most underused power isn't generating — it's critiquing: your draft, your plan, your reasoning, its own previous answer. Ask for the strongest case against your idea before you commit.

9. **Protect the struggle that makes you better.** For studying, AI generates questions and explains — you do the recall. For coding, understand every line you ship. If AI does the part that builds the skill, you're renting competence, not gaining it.

10. **Close the loop weekly.** Log wins and failures in one line as they happen; spend 15 minutes a week promoting what worked and fixing the worst prompt (`05-weekly-review.md`). A static prompt library rots; a reviewed one compounds.

## The 5-second output test

Before acting on any output, ask: **"Would this exact answer work for someone else with a different situation?"** If yes, it ignored your context — send a fix line. If no, run the use-case checklist and go.

## When things feel off

| Symptom | Do this |
|---|---|
| Output is fine but useless | Your ask was vague — state the decision/action the output must feed |
| Confident but wrong | Fix line #5 (fact audit), then verify yourself |
| Everything is agreeable | Fix line #6 — force it to argue against you |
| Long conversation getting worse | Context is polluted — extract what's good, start fresh |
| Same prompt keeps failing | It's a library bug — run P15, fix it permanently |
