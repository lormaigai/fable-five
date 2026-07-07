# 2. The Prompt Library — Top 15 Reusable Prompts

Every prompt is copy-paste ready. Fill anything in `[BRACKETS]`, delete lines that don't apply. All prompts assume the [style header](00-style-header.md) is active; if it isn't, paste it first.

**Fast mode** = one screen of output, no clarifying questions, best-guess assumptions labeled.
**Deep mode** = may ask up to 3 clarifying questions first, then goes thorough.

Jump to: [Studying](#studying) · [Coding](#coding) · [Writing](#writing) · [Planning](#planning) · [Research](#research) · [Content](#content-ideas) · [Design](#design) · [Meta](#meta)

---

## Studying

### P1 — Concept Explainer

**Fast:**
```text
Explain [CONCEPT] to me. My current level: [WHAT I ALREADY KNOW / COURSE CONTEXT].

Format:
1. One-sentence plain-language definition.
2. The core mechanism — how/why it works, in under 150 words.
3. One concrete worked example with real numbers/objects (not "imagine a thing").
4. The #1 misconception people have about it, and why it's wrong.
No analogies to "recipes" or "libraries" unless they map exactly. If the concept has math, show the math.
```

**Deep:**
```text
Teach me [CONCEPT] until I could pass an exam question on it. My level: [WHAT I ALREADY KNOW]. Context: [COURSE/TEXTBOOK/GOAL].

Ask up to 3 questions to pin down my gaps, then:
1. Explain it in layers: intuition → precise definition → mechanism → edge cases.
2. Two worked examples: one standard, one tricky.
3. Connect it to 2–3 things I already know (from my stated level).
4. Give me 3 self-test questions of increasing difficulty. Don't show answers yet — wait for my attempts, then grade them honestly and correct specifically what I got wrong.
Rules: no skipping steps in derivations; if a simplification hides something important, say so.
```

### P2 — Exam Prep / Quiz Me

**Fast:**
```text
Quiz me on [TOPIC/CHAPTER]. Source material: [PASTE NOTES/SYLLABUS or name the standard curriculum].

Give me 5 questions matching realistic exam style: mix of recall, application, and one integrative question. One at a time — wait for my answer before the next. Grade each answer bluntly: what's right, what's missing, what a grader would deduct for. Track my score.
```

**Deep:**
```text
Be my exam-prep coach for [EXAM] on [DATE]. Material: [PASTE SYLLABUS/NOTES/TOPIC LIST].

1. First, ask me 5 rapid diagnostic questions across the material to find my weak spots.
2. Based on my answers, rank topics: solid / shaky / missing.
3. Build a prep plan for the remaining days: what to study when, weighted toward shaky+missing and high-exam-weight topics.
4. Then drill me on the weakest topic: question → my answer → blunt correction → harder follow-up. Interleave earlier topics every ~5 questions so I don't lose them.
Rules: realistic exam-style questions only. If my answer is partially right, don't say "great" — say exactly which part earns marks.
```

---

## Coding

### P3 — Debug This

**Fast:**
```text
Debug this. 

What it should do: [EXPECTED BEHAVIOR]
What actually happens: [ACTUAL BEHAVIOR / EXACT ERROR MESSAGE]
Environment: [LANGUAGE, VERSION, RUNTIME/FRAMEWORK]
Code:
[PASTE MINIMAL RELEVANT CODE]

Give me: (1) most likely cause with the specific line, (2) the fix as a diff or corrected snippet, (3) one-line explanation of why it broke. If you can't tell from what I pasted, name the ONE thing to check or log next — don't list ten possibilities.
```

**Deep:**
```text
Help me root-cause a bug properly, not just patch it.

Expected: [EXPECTED BEHAVIOR]
Actual: [ACTUAL / FULL ERROR + STACK TRACE]
Environment: [LANGUAGE, VERSIONS, OS, FRAMEWORK]
What I've already tried: [ATTEMPTS AND RESULTS]
Code:
[PASTE CODE — include the callers, not just the failing function]

Process:
1. State your top 2 hypotheses ranked by likelihood, each with the evidence for it.
2. For the top hypothesis, give me a cheap experiment (log line, test input, assertion) that would confirm or kill it.
3. After I report back, iterate until confirmed.
4. Then: the fix, why it's the right layer to fix at, and what test would have caught this.
Rules: don't rewrite my code wholesale. Don't suggest "update your dependencies" unless you can say which one and why.
```

### P4 — Build a Feature / Script

**Fast:**
```text
Write me [WHAT: script/function/component] in [LANGUAGE/STACK] that [EXACT BEHAVIOR].

Inputs: [WHAT IT RECEIVES]  Outputs: [WHAT IT PRODUCES]
Constraints: [PERFORMANCE/DEPENDENCY/STYLE CONSTRAINTS, e.g. "stdlib only"]

Rules: complete and runnable as-is, no placeholders like "// handle errors here" — handle them. Simplest structure that works: no classes/abstractions unless the problem forces them. After the code, list in ≤3 bullets: assumptions you made, and the one edge case most likely to bite me.
```

**Deep:**
```text
Help me build [FEATURE] in [STACK]. Existing context: [PASTE RELEVANT EXISTING CODE / DESCRIBE THE CODEBASE].

Requirements: [BEHAVIOR, USERS, SCALE, CONSTRAINTS]

Process:
1. Ask up to 3 questions if requirements are ambiguous in ways that change the design.
2. Propose the design in ≤10 lines: components, data flow, and the ONE decision that's actually contentious, with your pick and why.
3. Wait for my OK, then implement in full — runnable, error handling included, matching my existing code's style.
4. End with: how to test it manually in 2 minutes, and what you'd cut if this is over-engineered.
Rules: fewest moving parts that meet the requirements. Flag anything you wrote that you're less than sure about.
```

### P5 — Review My Code

**Fast:**
```text
Review this code. Context: [WHAT IT DOES / WHERE IT RUNS].

[PASTE CODE]

Find real problems only: bugs, edge cases that will actually occur, security issues, misleading names. Rank by severity. For each: line reference, what breaks, and the fix in one line. Skip style nitpicks and "consider adding comments". If it's fine, say "it's fine" and stop.
```

**Deep:**
```text
Do a thorough review of this code as if it's going to production and you're the one on call for it.

Context: [WHAT IT DOES, WHO CALLS IT, WHAT DATA IT TOUCHES]
[PASTE CODE]

Cover, in order of severity:
1. Correctness: bugs, race conditions, unhandled edge cases — with a concrete failing input for each claim.
2. Security: injection, authz gaps, secrets, unsafe deserialization — only if actually reachable here.
3. Simplification: anything that can be deleted or flattened without losing behavior.
4. Maintainability: only issues that would confuse the next person, not preferences.
Rules: every finding needs a "here's the input/scenario where it fails" — no hypothetical hand-waving. End with a verdict: ship / fix-then-ship / rethink.
```

---

## Writing

### P6 — Draft From My Ideas

**Fast:**
```text
Draft a [FORMAT: email/post/essay section/doc] from these raw notes:

[PASTE BULLETS / VOICE-NOTE TRANSCRIPT / MESSY THOUGHTS]

Audience: [WHO]. Goal: [WHAT I WANT THEM TO DO/THINK]. Length: ~[N] words.
Rules: use MY points and phrasings where they're good — don't replace them with smoother generic ones. Direct, conversational, no throat-clearing intro. First sentence must earn attention. Mark any claim you added that wasn't in my notes with [ADDED].
```

**Deep:**
```text
Help me write a [FORMAT] that's actually good, in my voice.

Raw material: [PASTE NOTES/DRAFT/TRANSCRIPT]
Audience: [WHO]. Goal: [DESIRED EFFECT]. Length: ~[N] words.
Voice sample — match this, don't improve it into blandness: [PASTE 2–3 PARAGRAPHS I'VE WRITTEN]

Process:
1. Tell me the ONE strongest through-line in my material, and what you'd cut. Wait for my OK.
2. Draft it. Keep my distinctive phrasings; mark added claims with [ADDED].
3. Then critique your own draft in 3 bullets: weakest paragraph, weakest transition, where a reader would stop reading.
4. Revise once based on that critique and give me the final.
Rules: no "In today's fast-paced world" energy anywhere. Specifics over adjectives. If a sentence could appear in anyone's essay, cut or sharpen it.
```

### P7 — Edit / Tighten My Draft

**Fast:**
```text
Edit this draft. Target: [same length but sharper / cut to N words / fix flow].

[PASTE DRAFT]

Rules: keep my voice and my strongest lines untouched — your job is deletion and repair, not rewriting. Kill filler, hedges, repeated points, and weak openers. Return: (1) the edited version, (2) a 3-bullet list of the biggest changes and why. Don't make it more formal.
```

**Deep:**
```text
Give this draft a real edit pass, like a good editor who's on my side but honest.

[PASTE DRAFT]
Audience: [WHO]. Goal: [EFFECT]. What I'm worried about: [e.g. "too long", "argument doesn't land"].

Three passes, shown separately:
1. Structural: is the order right? What should move, merge, or die? (verdict + reasons, don't rewrite yet)
2. Paragraph level: for each weak paragraph, quote it, say what's wrong, show the fix.
3. Line level: the 10 worst sentences, before → after.
Then the full final version. Rules: preserve voice; when in doubt, cut; every change must be justifiable in one line. Tell me the one thing this draft needed that editing can't fix, if any.
```

---

## Planning

### P8 — Goal → Project Plan

**Fast:**
```text
Turn this goal into a plan: [GOAL]. Deadline: [DATE or "none"]. Time I can give it: [HOURS/WEEK]. Constraints: [MONEY/TOOLS/DEPENDENCIES].

Give me:
1. The end state as a checkable definition of done (not a vibe).
2. Milestones working backward from the deadline, each with a rough size in hours.
3. The very next physical action I can do today in <30 min.
4. The #1 risk that kills projects like this, and the cheap mitigation.
Rules: plan for the hours I stated, not ideal-me. No steps like "do research" — say what to research and what decision it feeds.
```

**Deep:**
```text
Help me plan [GOAL/PROJECT] properly. Deadline: [DATE]. Capacity: [HOURS/WEEK]. Constraints: [LIST]. Why this matters to me: [MOTIVATION — helps you make trade-offs].

Process:
1. Ask up to 3 questions that change the plan's shape (scope, dependencies, what "done" means).
2. Give me 2 candidate shapes for the project (e.g. minimal version shipped early vs. full version once) with your recommendation.
3. After I pick: full plan — phases, weekly milestones sized in hours, dependencies marked, and explicit "decision points" where I should stop and reassess.
4. Pre-mortem: it's [DEADLINE] and the project failed. Top 3 causes, and what in the plan guards each.
Rules: total planned hours must fit my stated capacity at 80% (life happens). Every week ends with something checkable.
```

### P9 — Weekly Plan

**Fast:**
```text
Plan my week. Today is [DAY/DATE].
Must-do (deadlines): [LIST WITH DATES]
Want-to-do: [LIST]
Fixed commitments: [CLASSES/MEETINGS/SHIFTS]
Realistic free hours per day: [ROUGH NUMBERS]

Give me a day-by-day plan: must-dos scheduled first with buffer before deadlines, then wants. Max 3 scheduled items/day. One line at the end: what to drop first if the week goes sideways. Don't schedule my evenings unless a deadline forces it.
```

**Deep:**
```text
Run my weekly planning session. Today is [DAY/DATE].

Last week's plan vs. what actually happened: [PASTE OR SUMMARIZE]
This week — deadlines: [LIST], commitments: [LIST], goals I claim to care about: [LIST], realistic hours/day: [NUMBERS]

Process:
1. Look at last week's plan-vs-actual and tell me bluntly: what pattern do you see? (overplanning, one project eating everything, avoidance of a specific task…)
2. Adjust this week's capacity estimate based on that evidence, not my optimism.
3. Day-by-day plan: deadlines with buffer, then ONE goal-advancing block per day, then wants.
4. Name the task I'm most likely to avoid, and give me a 10-minute starter version of it scheduled early in the week.
Rules: max 3 items/day. The plan must survive one bad day — show me what flexes.
```

---

## Research

### P10 — Research Briefing

**Fast:**
```text
Brief me on [TOPIC] in ~500 words. My purpose: [WHY I NEED THIS — decision, paper, curiosity].

Structure:
1. What it is, in 3 sentences a smart friend would use.
2. The 3–5 things that actually matter about it (not a Wikipedia section list) — for my stated purpose.
3. Where informed people disagree, and the strongest point on each side.
4. What you're uncertain about or what may have changed recently — flag anything I must verify before relying on it.
Rules: no encyclopedia tone. Specific names, numbers, dates where they exist. If a common belief about this topic is wrong, lead with that.
```

**Deep:**
```text
Do a proper research deep-dive on [TOPIC]. Purpose: [DECISION/PROJECT THIS FEEDS]. What I already know: [SUMMARY].

Deliver:
1. Landscape: the main schools of thought / approaches / players, and what distinguishes them — as a table if that's clearer.
2. State of the evidence: what's well-established, what's contested, what's speculative. Label each claim accordingly.
3. The 3 highest-quality sources or search paths to verify the load-bearing claims (name specific papers, books, or exact search queries — not "check reputable sources").
4. For MY purpose specifically: what this research implies I should do, and the strongest argument against that.
5. Open questions ranked by how much they'd change the conclusion.
Rules: separate what you know from what you infer. If your training data may be stale here, say where. Never fabricate a citation — say "verify this" instead.
```

### P11 — Compare & Decide

**Fast:**
```text
Help me choose: [OPTION A] vs [OPTION B] (vs [OPTION C]) for [MY SITUATION AND WHAT I OPTIMIZE FOR].

Give me:
1. Your recommendation, first line, with confidence (high/medium/low).
2. The 3 criteria that actually differentiate these options for my case — ignore criteria where they tie.
3. One-line "choose X instead if…" for each non-recommended option.
Rules: no pros/cons walls covering every conceivable factor. If my stated priorities make this a clear call, just say so.
```

**Deep:**
```text
Walk me through a real decision: [DECISION]. Options: [LIST, or "help me generate them"].
My situation: [CONTEXT]. I'm optimizing for: [PRIORITIES, RANKED]. Constraints: [BUDGET/TIME/etc.]. Reversibility: [easy to undo / hard to undo].

Process:
1. Check my framing: am I missing an option (including "neither/later")? Is this actually the decision to make now?
2. Score options against MY ranked priorities — show the reasoning, not just a score grid.
3. Steelman the option you're NOT recommending: the strongest honest case for it.
4. Recommendation + what evidence would change your mind + a cheap test I could run before committing, if one exists.
Rules: if it's hard to undo, bias toward the reversible path or the test. Don't average my priorities away — the top one dominates.
```

---

## Content Ideas

### P12 — Idea Generator

**Fast:**
```text
Generate content ideas: [PLATFORM/FORMAT] about [TOPIC/NICHE] for [AUDIENCE].
My angle/experience that makes me different: [WHAT I KNOW/DO THAT MOST DON'T].

Give me 10 ideas. For each: working title + one line on the specific claim or payoff. 
Rules: every idea must pass the "only I could make this" test — tie it to my stated angle. Ban listicle sludge ("5 tips to…"), ban ideas whose payoff is obvious from the title. At least 3 should feel slightly risky to post. Mark your top 2 picks and say why.
```

**Deep:**
```text
Help me build a content pipeline for [PLATFORM] on [TOPIC/NICHE]. Audience: [WHO, AND WHAT THEY STRUGGLE WITH]. My differentiator: [EXPERIENCE/ACCESS/TAKE]. What's worked before: [PAST HITS, IF ANY].

Process:
1. Map 4–6 recurring content "lanes" for me (e.g. contrarian takes, build-in-public, teardown, beginner rescue) — each with why it fits MY differentiator.
2. For each lane: 4 concrete ideas (title + specific payoff + hook line for the first 5 seconds/sentence).
3. Rank all ideas by (effort ÷ likely resonance) and mark the 5 to make first.
4. Note which ideas can become a series vs. one-offs.
Rules: specificity is the whole game — "how I lost X doing Y" beats "lessons about Y". If an idea works for any creator in my niche, sharpen or kill it.
```

### P13 — Repurpose One Into Many

**Fast:**
```text
Repurpose this piece into [N] other formats: [TARGET FORMATS, e.g. "a tweet thread, a LinkedIn post, a short-video script"].

Original:
[PASTE PIECE OR ITS KEY POINTS]

Rules: each version must be native to its format (its own hook, length, rhythm) — not a copy-paste with line breaks. Lead each with its strongest single idea; you may use DIFFERENT ideas from the original for different formats. Keep my voice. Flag which version you think is weakest and why.
```

**Deep:**
```text
Squeeze maximum value from this piece: [PASTE PIECE/LINK CONTENT].
Where it can go: [LIST MY CHANNELS]. My voice sample: [PASTE SHORT SAMPLE].

Process:
1. Extract every distinct idea in the piece worth standing alone — list them (usually 4–8; if fewer, say so).
2. Match ideas to channels: which idea fits which format best, and which shouldn't be repurposed at all.
3. Produce the top 4 pairings in full, each native to its format with its own hook.
4. Suggest ONE follow-up piece the original sets up but doesn't deliver — the natural sequel.
Rules: no watering down — a repurposed piece should be someone's favorite version, not a summary. Match my voice sample.
```

---

## Design

### P14 — Design Direction & Critique

**Fast:**
```text
[PICK ONE:]
(a) Give me design direction for [THING: slide deck/site/poster/UI screen]. Purpose: [WHAT IT MUST ACHIEVE]. Audience: [WHO]. Constraints: [BRAND/TOOLS/SKILL LEVEL].
(b) Critique this design: [ATTACH/DESCRIBE]. Purpose: [WHAT IT MUST ACHIEVE].

For direction: give me ONE coherent direction (not three vague moods): specific type pairing, a 3–5 color palette with hex codes, spacing/layout rule, and the single focal element. Then 2 quick alternates in one line each.
For critique: the 3 changes with the biggest impact, most-impactful first, each as a concrete instruction ("increase heading to ~2× body and left-align it", not "improve hierarchy"). 
Rules: everything must be executable by [MY SKILL LEVEL/TOOL]. No "make it clean and modern".
```

**Deep:**
```text
Work through a design properly with me: [THING]. Purpose: [GOAL]. Audience + context of use: [WHO, WHERE THEY SEE IT, ON WHAT DEVICE]. Constraints: [BRAND/TOOLS/SKILL]. Current state: [ATTACH/DESCRIBE, or "starting from zero"].

Process:
1. Define the design's one job in a sentence, and the hierarchy: what must be seen 1st, 2nd, 3rd.
2. Propose 2 genuinely different directions (not the same layout in two palettes). For each: type choices, palette with hexes, layout grid, and what feeling it produces. Recommend one.
3. After I pick: a build spec I can execute step by step in [MY TOOL] — exact sizes, weights, spacing values.
4. When I show you the result: critique against the stated hierarchy, top 3 fixes only, each concrete and doable in minutes.
Rules: every suggestion tied to the design's job, not taste. If my content is the problem (too much text, weak headline), say that before styling around it.
```

---

## Meta

### P15 — Prompt Improver

**Fast:**
```text
Improve this prompt. Here's the prompt and an example of the disappointing output it produced:

PROMPT: [PASTE PROMPT]
BAD OUTPUT (excerpt): [PASTE THE DISAPPOINTING PART]
What I actually wanted: [DESCRIBE]

Diagnose in one line WHY the prompt produced that failure (vague success criteria? missing context? no format spec? no anti-pattern ban?). Then give me the revised prompt, with your changes marked or listed. Keep it as short as it can be while fixing the failure — don't bolt on boilerplate.
```

**Deep:**
```text
Help me systematically upgrade a prompt I use repeatedly.

THE PROMPT: [PASTE]
Used for: [TASK + HOW OFTEN]
Last 2–3 outputs, rated: [PASTE EXCERPTS + what was good/bad about each]

Process:
1. Diagnose failure patterns across the examples — recurring, not one-off, issues.
2. Identify what the prompt UNDER-specifies (model has to guess) and OVER-specifies (rules that constrain without helping).
3. Rewrite it. Explain each change with which failure it targets.
4. Give me 2 test inputs I should run through both old and new versions to confirm the new one wins.
5. Suggest what to log about future outputs so next month's revision is evidence-based.
Rules: shorter prompt beats longer prompt at equal quality. Every instruction must earn its place by preventing an observed failure.
```
