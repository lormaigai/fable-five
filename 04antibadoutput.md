# 4. Anti-Bad-Output Playbook

The failure modes you'll actually hit, how to recognize each in 5 seconds, and the exact line to paste to fix it. These work mid-conversation — you rarely need to start over.

The [style header](00-style-header.md) prevents most of these up front. This file is for when they slip through.

## The 8 failure modes

### 1. Generic sludge
**Smell:** advice that would be true for anyone. "Stay consistent." "Consider your audience." "Test and iterate."

**Fix line:**
```text
Too generic. Delete every sentence that would be true for anyone in my situation. Re-answer using ONLY the specifics I gave you — and if you need a specific you don't have, ask for it instead of writing around it.
```

### 2. Vague hedging
**Smell:** "it depends", "various factors", "you may want to consider" — with no commitment.

**Fix line:**
```text
Commit. Give me your single best recommendation for MY stated situation, with confidence level. Then, in one line each: what would make you change it. "It depends" is banned unless you immediately say on WHAT, and which way each case points.
```

### 3. Overcomplication
**Smell:** a framework, 6-phase plan, or new architecture when the task needed three steps. Extra tools, extra abstractions.

**Fix line:**
```text
Overcomplicated. Give me the version with the fewest moving parts that still works. For anything you keep from the complex version, justify it in one line: what breaks without it. Aim for half the steps.
```

### 4. Padding & filler
**Smell:** restated question, "Great question!", intros about why the topic matters, a summary repeating the body.

**Fix line:**
```text
Cut the padding: no restating my question, no preamble, no closing summary. Start with the answer. Resend at half the length with all substance kept.
```

### 5. Confident fabrication
**Smell:** suspiciously convenient statistics, perfect citations, API functions you can't find, names/dates stated smoothly. **The most dangerous one — it reads exactly like good output.**

**Fix line:**
```text
Audit your last answer: list every factual claim (names, numbers, dates, citations, function/API names) and tag each: [SURE] / [LIKELY] / [GUESSED] / [SHOULD VERIFY]. Be honest — a wrong [SURE] is worse than ten [GUESSED].
```
**And your job:** verify the top 2 load-bearing facts yourself before using them. No fix line replaces that.

### 6. Agreement bias / flattery
**Smell:** "Great idea!" about your plan, praise for a mediocre draft, folding instantly when you push back.

**Fix line:**
```text
Stop agreeing with me. Argue the strongest case AGAINST my idea/draft/plan as someone who wants me to succeed but thinks I'm wrong. Then say which of your objections you'd actually stand behind and which are stretches.
```

### 7. Scope drift
**Smell:** you asked for one function, it refactored the file. You asked to tighten a paragraph, it rewrote your voice out of the piece.

**Fix line:**
```text
You went beyond what I asked. Redo it changing ONLY [THE THING]. Everything else stays byte-for-byte / word-for-word. If you believe something outside scope truly needs changing, list it separately at the end — don't touch it.
```

### 8. AI voice (writing only)
**Smell:** "delve", "crucial", "tapestry", "in today's fast-paced world", "it's important to note", rule-of-three sentences everywhere, em-dash confetti.

**Fix line:**
```text
This reads like AI wrote it. Rewrite matching the rhythm and word choice of this sample of mine: [PASTE SAMPLE]. Vary sentence length. Ban: delve, crucial, moreover, "it's important to note", "in today's world". Specific nouns over abstract ones.
```

## Escalation rule

- **One failure** → paste the fix line, continue.
- **Same failure twice in one conversation** → the conversation is polluted; start fresh and put the fix line IN the initial prompt.
- **Same failure across multiple sessions** → it's a library bug, not a model mood. Fix the prompt itself (use P15) and note it for the [weekly review](05-weekly-review.md).
