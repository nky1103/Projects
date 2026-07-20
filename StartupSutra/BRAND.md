# StartupSutra — Brand & Design Language

**Rule: this design language does not change for at least the first 30 case studies.**
People follow consistency, not creativity. Anyone seeing a single slide — even a
screenshot six months from now — should instantly think "That's Startup Sutra."

## Series format

Every post is a numbered case study with a subject tag on the cover:

```
🟧 CASE STUDY #001   [ INSTAGRAM ]
🟧 CASE STUDY #002   [ NETFLIX ]
🟧 CASE STUDY #003   [ AIRBNB ]
```

The profile becomes a library of case studies. The last slide teases the next
number ("CASE STUDY #002 SOON").

## Visual system (locked)

- **Canvas:** 1080×1350 (4:5 portrait), 7 slides per carousel
- **Background:** near-black navy `#0b0e14`, subtle amber ambient glow + faint grid
- **Accent:** amber `#f59e0b` → orange `#ea580c` (gradient only on the logo mark and big stats)
- **Text:** warm off-white `#f4f1ea`; dimmed lines `#8b93a3`; secondary `#aab2c0`
- **Font:** Inter (900 for headlines, 600–700 for support text)
- **Header:** "S" logo mark + StartupSutra wordmark (left), slide counter `NN / 07` (right)
- **Footer:** progress dots (left), `@StartupSutra` (center — swap for StartupSutra.co when live), `SWIPE →` (right)
- **Components:** kicker pill, list items (with win/dead states for contrast slides),
  orange-left-border quote card, giant gradient stat numbers

## The Substitution Test (editorial signature)

Every carousel must pass this test before it ships:

> **If I replace the company's name with another company, does the lesson still hold?**

- **Yes** → evergreen content. The company is the *evidence*; the subject is
  business decision-making. This is what founders remember and share.
- **No** → it's a history lesson. Rework it until the lesson stands on its own.

Practical consequence: prefer argument-driven structure over chronological
storytelling. Open with the claim ("BlackBerry didn't fail because Apple made a
better phone"), use the company to prove it, and end with a question the reader
must answer about their own product. First applied: Case Study #002.

## Hard rules

- ❌ No gradients beyond the accent, no illustrations, no stock photos, no AI images
- ✅ Text-first, clean, high-contrast — the information IS the design
- ✅ Emojis used sparingly as functional icons (📍 🎮 📸 👥 🚀 👇 ❤️ 🔁)
- ✅ One idea per slide; the surprising number gets the biggest type
- ✅ Slide 7 always: question + Tell us below / Save / Share + follow card + next-episode tease

## Workflow

Copy the previous post's `source/` folder, edit the text in `carousel.html`,
run `node render.js`, review, commit. Fonts live alongside the HTML.
