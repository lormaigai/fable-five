# 3. Quality Checklists

30-second checks to run on an output **before you act on it**. If an output fails 2+ items, don't re-explain from scratch — grab the matching fix-it line from [`04-anti-bad-output.md`](04-anti-bad-output.md).

## Universal check (any output, 10 seconds)

- [ ] Could this exact output have been given to someone else with a different situation? (If yes → too generic.)
- [ ] Is there a clear "so what" — a decision, action, or artifact I can use today?
- [ ] Did it label its assumptions and uncertainties, or does it sound equally confident about everything?
- [ ] Is it the length the content deserves, or the length that looks thorough?

## Studying (P1, P2)

- [ ] Can I close the chat and explain the concept out loud in 60 seconds? (The real test — actually do it.)
- [ ] Did the explanation include at least one concrete example with real values, not "imagine a scenario"?
- [ ] Were misconceptions/edge cases addressed, or was it all happy path?
- [ ] In quizzing: did it grade me honestly (told me what a grader deducts), or did it praise partial answers?
- [ ] Am I doing the recall, or is the AI doing it for me?

## Coding (P3, P4, P5)

- [ ] Did I run it? (Not "does it look right" — did it actually run?)
- [ ] Do I understand every line well enough to modify it? If not, ask before shipping.
- [ ] Is error handling real, or are there silent `except: pass` / swallowed promises / "TODO" stubs?
- [ ] Did it stay inside the task, or did it "improve" things I didn't ask about?
- [ ] For debugging: did it identify the cause, or just make the symptom go away?
- [ ] Is this the simplest structure that works — could a class/abstraction/dependency be deleted?

## Writing (P6, P7)

- [ ] Read the first sentence alone. Would the audience keep reading?
- [ ] Read it aloud — does it sound like me or like "AI voice" (delve, crucial, in today's world, tapestry, moreover)?
- [ ] Is every claim one I can stand behind? Check anything marked [ADDED].
- [ ] Did it keep my strongest lines, or sand them into smoothness?
- [ ] Can I cut 20% right now without losing meaning? (If yes, it was padded — cut it.)

## Planning (P8, P9)

- [ ] Is the very next action small and physical enough to start in the next 30 minutes?
- [ ] Do the planned hours fit my ACTUAL available hours (check against last week's reality, not intentions)?
- [ ] Does every milestone have a checkable done-condition, not a vibe ("make progress on…" fails)?
- [ ] Does the plan say what to drop when things slip? (Every real week slips.)
- [ ] Are there ≤3 scheduled items per day?

## Research (P10, P11)

- [ ] Are the load-bearing facts (names, numbers, dates, citations) flagged for verification — and did I verify the top 2 before using them?
- [ ] Did it distinguish established / contested / speculative, or present everything at one confidence level?
- [ ] For decisions: did it commit to a recommendation with reasons, or hedge into "it depends"?
- [ ] Did it say what would change the conclusion?
- [ ] Does anything smell too clean? (Perfectly convenient statistics and perfect citations are where fabrication hides.)

## Content ideas (P12, P13)

- [ ] Would I actually make at least 3 of these? (Not "these are fine" — would I make them this week?)
- [ ] Does each idea depend on MY angle, or could any creator in the niche post it?
- [ ] Is the payoff specific ("how I lost $400 automating X") vs. generic ("tips for automating X")?
- [ ] For repurposing: is each version native to its format, with its own hook — or reformatting?
- [ ] Does at least one idea make me slightly nervous to post? (If not, the batch is safe-and-forgettable.)

## Design (P14)

- [ ] Is every suggestion executable — exact sizes, hexes, spacing — or is it adjectives ("clean", "modern", "elevated")?
- [ ] Does it serve the design's stated job, or is it decoration?
- [ ] Did it commit to ONE direction with a recommendation, or hand me three moods to choose from blind?
- [ ] Can I do this with my actual tools and skill level?
- [ ] Did it check the content itself (too much text, weak headline) before styling around it?

## Meta / prompt improvement (P15)

- [ ] Did the diagnosis name a specific failure cause, or restate "the prompt was unclear"?
- [ ] Is the revised prompt SHORTER or equal, not longer with bolted-on boilerplate?
- [ ] Does every added instruction target an observed failure (not a hypothetical one)?
- [ ] Do I have test inputs to prove the new version wins before I adopt it?
