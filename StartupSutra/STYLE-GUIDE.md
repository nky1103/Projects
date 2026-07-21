# StartupSutra — Editorial Style Guide

**Version 1.2** — Reel Philosophy revised by the first real metrics (§6): reels
are the growth engine, and reels must be **self-contained** (deliver the lesson,
earn the follow) rather than pure teasers. v1.1 added the Human Voice Framework,
Narration Rules, the Editorial Review Scorecard, the Conversation/Screenshot
Quote tests, the five-phase process, and the Editorial Philosophy.
🔴 Startup Failure #001 (BlackBerry) remains the creative benchmark; 🔵 Marketing
Breakdown #001 (Duolingo) is the first episode built under v1.2.

**This is the canonical reference. Every post is built against it.**
The design language and this guide do not change for at least the first 30 episodes.
People follow consistency, not creativity: anyone seeing a single slide — even a
cropped screenshot six months from now — should instantly think *"That's Startup Sutra."*

> **The mantra:** *The company featured is always the evidence; the subject is
> the decision.* We're not documenting history. We're extracting decisions.

---

## 1. Positioning

StartupSutra is a **media brand**, not a meme page. Format: visual case studies
about business decision-making, published daily at 8 PM. The company featured is
always the *evidence*; the *subject* is the decision.

### The Substitution Test (editorial signature)
Every piece must pass before it ships:

> **If I replace the company's name with another company, does the lesson still hold?**

- **Yes** → evergreen. Ship it.
- **No** → it's a history lesson. Rework until the lesson stands alone.

Practical consequence: argument-driven structure over chronology. Open with the
claim, prove it with the company, end with a question the reader must answer
about their own product.

### The editorial formula

**Company → Principle → Framework.** Never Company → Story. Every episode ends
on the *hidden principle* — the transferable framework — not the surface
observation. People don't save company history; they save frameworks they can
apply beyond the company.

- *Observation:* "Duolingo became entertaining." ❌ (true, but disposable)
- *Framework:* "Duolingo turned its brand into a creator." ✅ (transferable, saved)

Runway (Marketing Breakdown): Duolingo → character marketing · Figma →
collaboration as positioning · Notion → identity marketing · Airbnb → trust
before transactions · Patagonia → values as marketing.

---

## 2. Content pillars — the five series

Each pillar is a branded, color-coded, independently numbered series.

| Series | Color | Accent / Deep | Subject | Example subjects |
|---|---|---|---|---|
| 🟧 **CASE STUDY** | Amber | `#f59e0b` / `#ea580c` | How a decision created success | Instagram, Airbnb, Netflix, Canva |
| 🔴 **STARTUP FAILURE** | Red | `#ef4444` / `#b91c1c` | How a decision destroyed value | BlackBerry, Kodak, Nokia, WeWork |
| 🔵 **MARKETING BREAKDOWN** | Blue | `#3b82f6` / `#1d4ed8` | Why a marketing move worked | Apple, Nike, Duolingo, Red Bull |
| 🟢 **FOUNDER FRAMEWORK** | Green | `#22c55e` / `#15803d` | A mental model founders can apply | First Principles, Flywheel, JTBD, Pareto |
| 🟣 **SEED SIGNAL** | Violet | `#8b5cf6` / `#6d28d9` | What signal made investors believe (Weds) | BZERO, and each week's notable raise |

**Seed Signal** is investor psychology, not funding news — the timeless question
*"what signal made investors believe?"* It teaches pattern recognition, so it fits
the Company → Principle → Framework formula. Weekly, Wednesdays.

**Series color drives:** kicker pill, headline accent words, quote-card border/tint,
active progress dot, swipe cue, ambient glow, highlight cards.
**Master brand stays amber always:** the owl mascot (amber tile), the "Sutra" in
the wordmark, and the follow-card owl — on every series. Series color never
touches the owl.

### Episode numbering
- Numbered **per series** (Case Study #001 ≠ Startup Failure #001).
- **Category large, number subtle.** The cover kicker shows the series name only.
  The number lives small in the top-right corner as `#NNN · slide/07`.
- The last slide teases continuity ("New episode tomorrow") without hard-coding
  the next series.

### Published register
- 🟧 CASE STUDY #001 — Instagram (2026-07-19)
- 🔴 STARTUP FAILURE #001 — BlackBerry (2026-07-20)
- 🔵 MARKETING BREAKDOWN #001 — Duolingo (2026-07-21)
- 🟣 SEED SIGNAL #001 — BZERO (2026-07-22)

---

## 3. Visual system

- **Canvas:** carousel 1080×1350 (4:5), 7 slides; reels 1080×1920 (9:16), 30fps
- **Background:** near-black navy `#0b0e14`; ambient glow in series color;
  faint 90px grid, masked radially
- **Text colors:** primary `#f4f1ea` (warm off-white), dimmed `#8b93a3`,
  secondary `#aab2c0`, footer gray `#525a68`
- **Typography:** Inter only. 900 headlines (letter-spacing −1.5px),
  800 quote cards, 700 UI/labels, 600 body. Emoji: Noto Color Emoji.
- **Components:** kicker pill (series color; neutral gray variant for the subject
  tag), list items (win = series-tinted, dead = dimmed/struck), left-border quote
  card, two-column comparison, giant gradient stat numbers, follow card.
- **Header:** owl mark + wordmark left; `#NNN · slide/07` right.
- **Footer:** progress dots left; `@statupsutra` center (→ StartupSutra.co when
  live); `SWIPE →` right (last slide: continuity tease).

### Visual hierarchy rules
1. One idea per slide. The surprising element gets the biggest type.
2. Contrast carries meaning: winner bright, loser dimmed — the design argues
   before the copy does.
3. The screenshot slide (the lesson) is the most minimal slide of the set.
4. Never: stock photos, illustrations, AI imagery, gradients beyond the accent.
   Emojis only as functional icons.

**Toolchain (locked):** every visual asset — slides, reels, the owl mascot,
logos, this guide — is hand-built in HTML/CSS/SVG and rendered via Playwright
(+ ffmpeg for video). No AI image generation (no Higgsfield). Voiceover via
vidIQ only. This keeps every asset editable, vector-clean, and unmistakably ours.

---

## 4. Writing voice

- Short declarative sentences. One thought per line.
- Conversational verbs ("deleted", not "deprecated"; "loved", not "adopted").
- Numbers over adjectives ("1 million users in 2 months", never "huge growth").
- Second person for lessons: turn the insight toward the reader's product.
- No jargon, no hashtag stuffing, no exclamation marks. Confidence is quiet.

### Hook formulas (cover slide / reel opening)
1. **Reversal:** "X didn't lose to Y. It lost to Z." (BlackBerry)
2. **Sacrilege:** "Imagine deleting 80% of your startup." (Instagram)
3. **Near-miss:** "The billion-dollar app almost didn't exist."
4. **Hidden cause:** "Everyone thinks X won because of Y. It was Z."
5. **Question trap:** "Why did the best product lose?"

A hook is never a summary. It creates a gap the carousel closes.

### 4A. Human Voice Framework

**The Conversation Test** — before publishing, ask:

> **Would I actually say this in a conversation with a founder?**

If the answer is no, rewrite it. This single rule removes 90% of AI-sounding copy.

AI-tells to hunt down and delete:
- Stacked abstractions ("underestimated the app ecosystem", "failed to innovate")
- Symmetrical sentence pairs that sound written, not spoken
- Adjectives doing the work numbers should do
- Explaining when you could be revealing

❌ *"BlackBerry failed because it underestimated the app ecosystem."*

✅ *"Here's the part most people miss.
BlackBerry wasn't losing phones.
It was losing relevance."*

**The Screenshot Quote Test (hard rule)** — every episode must contain one
sentence people want to save. For BlackBerry: *"Companies don't fail because
they stop improving. They fail because they improve what customers no longer
value."* **If we don't have that sentence, the episode isn't finished.** It gets
the most minimal slide of the set (slide 6) and a line of its own in the caption.

**The Unforgettable Line** — one step beyond save-worthy: every episode carries
one line people repeat months later. Not a good sentence — a **repeatable** one.
For BlackBerry: *"Apple changed the question. BlackBerry kept answering the old
one."* Draft three candidates in Phase 2; the best earns a slide punchline and a
standalone couplet in the caption. Explaining informs; revealing gets quoted.

---

## 4B. Format independence (core doctrine)

**Each format must stand on its own. Neither depends on the other to succeed —
together they build a stronger brand.** If the reel reaches 100,000 people and
the carousel reaches 10,000, both still have full value alone. The reel does
not exist to sell the carousel, and the carousel does not assume you saw the
reel.

**A reel must deliver:**
- 20–30 seconds.
- One actionable insight.
- A memorable closing line.
- A reason to follow.
- Self-contained enough to earn a **save**.

**A carousel must deliver:**
- The complete story.
- Evidence and context.
- Frameworks founders can apply.
- A discussion-worthy question at the end.

Pointing from one to the other is a *bonus path*, never the payoff.

## 5. Carousel structure (7 slides)

Delivers the complete story (per §4B) — no reel required to understand it.

1. **Hook** — series pill + subject pill, claim in big type, one-line tension
2. **Setup** — the world before; what the company bet on
3. **Shift** — what changed (market, user, technology)
4. **Evidence** — the visual argument (comparison, list, stat) + context
5. **Mistake / Insight** — the decision, named plainly; the framework to apply
6. **Lesson** — the screenshot slide; substitution-test-proof, minimal
7. **CTA** — a discussion-worthy question about the *reader's* product +
   Tell us below / Save / Share rows + follow card + continuity tease

## 6. Reel Philosophy (v1.2 — updated by real metrics)

**Distribution reality (why reels lead):** on a young account, carousels only
reach existing followers via Feed — Startup Failure #001's carousel got **2
views**. The same episode's **reel got 151 views / 128 non-followers** via the
Reels tab + Explore. **Reels are the entire growth engine; carousels are depth
for people who already follow.** So we lead with reels and judge them on
follows + saves, not just watch time.

**What the metrics changed:** the pure-teaser reel (withhold everything, point
to the carousel) reached 128 strangers and converted **0 follows, 0 saves, 0
carousel clicks.** Cold viewers don't leave the Reels tab to hunt for your post.
So the reel must **stand on its own** — deliver a complete insight that earns the
follow, and engineer the save + comment *inside* the reel.

1. **25–30 seconds maximum.** A tighter script forces every line to carry weight.
2. **One idea, delivered — not withheld.** The reel lands the actual lesson so a
   stranger leaves with value (and a reason to follow). The carousel goes
   *deeper* (evidence, comparisons, the founder application) — it does not
   simply repeat. Don't duplicate; deepen.
3. **Engineer the save + the comment, in the reel.** End on a quotable save-line
   *and* a direct comment-bait question. Saves/shares/comments are what the
   algorithm amplifies — a watch alone goes nowhere.
4. **Give an explicit reason to follow.** "One marketing breakdown. Every day."
   Reach doesn't convert to audience on its own.
5. **Kill the 2-second cliff.** Retention drops ~100%→55% in the first 2s. Frame
   one shows the provocation instantly with motion — never a slow fade-in.
6. **Human, not AI.** A founder's observation over coffee. Short sentences,
   natural rhythm, no corporate language.
7. **Point to the carousel for depth, not for the answer.** "Full breakdown in
   today's carousel" is a bonus path, never the only payoff.

**The Insight Test (replaces the Trailer Test)** — before a reel ships, ask:

> **Would a stranger follow after watching this — with nothing else?**

If they'd leave with a complete thought worth keeping, it's done. If they'd
leave with only a cliffhanger and no reason to follow, it gave too *little*.
(This reverses the old Trailer Test, which the metrics disproved for a cold
audience: withholding the lesson converted nobody.)

**The StartupSutra voice:** not motivational influencer, not business guru.
Someone who has been in business, made mistakes, watched companies rise and
fall, and is sharing what they learned. Calm. Confident. Curious. No hype —
an insider observation, not a presentation.

**The signature edit — every reel, the same four beats** (this repetition IS
the identity; media brands are built by making every video unmistakably theirs):
- **0–3s** Challenge a widely held belief. Cold open, no branding; logo ~3.5s.
  Motion at frame one — kill the 2s cliff. ("Every brand is fighting for
  attention.")
- **3–12s** Build, then **land the lesson** — deliver the actual insight.
  ("It stopped making ads and made its mascot the show. The best marketing
  doesn't interrupt your feed — it becomes part of it.")
- **12–20s** The comment-bait question — turned on the viewer's own work.
  ("Would people miss your content if you stopped posting?")
- **20–25s** Explicit follow reason + bonus carousel pointer. ("One marketing
  breakdown. Every day. Full breakdown in today's carousel.")
- Silent kinetic text is the proven default (text-led reels perform sound-off;
  151 views validated it). Add music in-app: minimal cinematic, under the text.
  If using VO later, natural pace — the pauses are the delivery.
- Motion: settle-in text, scene crossfades, slow push-ins. Never flashy.

### 6A. Narration Rules (voice performance)

The guide defines writing; this defines **delivery**. They are different.

- Write for speech, not reading.
- Maximum 8–10 words per sentence.
- Pause after every important line.
- One idea = one breath.
- Start with intrigue, not explanation.
- Never sound like you're presenting. Sound like you're **revealing** something.

Script formatting: one line per breath, ellipses mark pauses the voice must take,
and every scene cut in the reel lands on a breath boundary (this is why we
silence-detect the VO before timing the animation).

## 7. Caption style

1. Open by restating the hook in one line (not word-for-word).
2. 4–8 short lines building the argument — each line stands alone.
3. The lesson, isolated on its own lines.
4. 💬 question → ❤️ save prompt (tie it to a real work moment: "for your next
   roadmap discussion") → 📚 2–3 sources.
5. No hashtag walls. Reel captions are shorter than carousel captions and never
   duplicate them.

## 8. Alt text (accessibility + SEO)

Every slide image gets alt text: `Slide N: [text on slide, condensed]`.
Cover example: "Slide 1: BlackBerry didn't lose to Apple. It lost to the future."
Keep it literal — screen readers first, keywords second.

## 9. Story templates (IG Stories, day-of)

1. **8 PM** — repost the cover slide + "New episode 🔴" + link sticker to post
2. **+2h** — the lesson slide + poll ("Have you seen this mistake up close?")
3. **Next morning** — best comment screenshot + "Tell us yours 👇"
Stories reuse post assets only — never new designs.

## 10. CTA style

- One question per post, always about the reader, answerable in one line.
- Engagement rows fixed: 👇 Tell us below · ❤️ Save this post · 🔁 Share it
  with a founder.
- Follow card: "Follow @statupsutra — daily startup case studies."
- Continuity tease on the last slide/end card; series-agnostic wording.

---

## 11. Editorial Review (pre-publish gate)

Every episode gets scored before publishing. Below target on any metric → rewrite.
Not because it's "bad" — because StartupSutra doesn't publish average episodes.

| Metric | Question it answers | Target |
|---|---|---|
| **Scroll Stop** | Does slide 1 interrupt a thumb mid-scroll? | 9/10 |
| **Curiosity** | Does every slide make you need the next one? | 9/10 |
| **Save Worthy** | Is there a sentence people will screenshot? | 9/10 |
| **Share Worthy** | Would a founder send this to a co-founder? | 8/10 |
| **Human Voice** | Does it pass the Conversation Test? | 10/10 |

The review runs against the finished slides, not the draft copy — what matters
is how it reads in the feed. Record the scores in the episode README.

---

## 12. The five-phase production process

We are not making Instagram posts. We are **producing editorial episodes.**
Every episode moves through five phases, in order:

### Phase 1 — Research
Facts, timeline, sources, competing viewpoints. If credible accounts disagree,
know both sides before choosing the angle.

### Phase 2 — Editorial
Three questions, answered in writing before any design work:
**What's the decision? What's the lesson? What's the screenshot quote?**
Run the **Substitution Test** here. No answers → no episode.

### Phase 3 — Writing
Carousel copy, caption, alt text, story assets. Run the **Conversation Test**
line by line; hunt AI-tells (§4A). Then render: copy from `_template/`
(owl mark + `@statupsutra` baked in), swap text + series color tokens, review
every slide at full size.

### Phase 4 — Performance
Reel script per **Narration Rules** (§6A) — one line per breath, pauses marked.
Generate VO (vidIQ) → silence-detect → sync scene cuts to breath boundaries →
render → mux (H.264 + AAC). Plan music (added in-app, 15–20% under VO).

### Phase 5 — Review
**Conversation Test** on the finished slides → **Editorial Review scorecard**
(§11) → final approval. Below target on any metric → back to Phase 3.
Record scores in the episode README, commit, push, post at 8 PM.

---

## 13. Editorial Philosophy — the DNA

Three non-negotiable principles:

### 1. Teach principles, not history.
We don't publish because BlackBerry failed. We publish because founders can
avoid making the same decision.

### 2. Leave one question unanswered.
If every question is answered inside the carousel, there's no discussion and
no reason to comment. The Founder Question is real, not rhetorical.

### 3. Respect the reader.
Never over-dramatize. Never exaggerate. Never use clickbait the content can't
justify. **Curiosity is earned, not manufactured.**
