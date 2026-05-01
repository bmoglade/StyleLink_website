# Session Start Prompt

> Copy everything below the line and paste it as your FIRST message in any new AI session.
> This gives the AI full context of the project so it can pick up from where you left off.

---

## ✂️ COPY FROM HERE ⬇️

---

You are continuing work on an existing project called **StyleLink** — a creator outfit storefront platform.

**Before doing anything, read these 3 files in order:**

1. `website/docs/01-MASTER-PROMPT.md` — Your role, product context, constraints, design system
2. `website/docs/02-ARCHITECTURE.md` — System diagram, routes, database schema, folder structure, technical decisions
3. `website/docs/03-DEVELOPER-GUIDE.md` — Setup, code patterns, common tasks, troubleshooting

**After reading all 3 files, confirm you understand:**
- What the product does (creator affiliate storefront)
- Tech stack (Next.js 14 + Supabase + Tailwind + TypeScript)
- Database tables (creators, outfits, products, clicks)
- Key constraints (corporate proxy workarounds, React 18.2 pin, no next/image)
- Folder structure and where things go
- Design system (colors, fonts, editorial style)

**Then ask me:** "What would you like to change or add today?"

**Rules for this session:**
- Do NOT break existing functionality
- Do NOT add libraries unless absolutely necessary
- Do NOT use `next/image`, `next/font/google`, `getUser()` in middleware, or `router.push()` for post-auth redirects
- Follow the patterns already in the codebase
- Test on mobile viewport mentally (most users are on mobile)
- Keep code clean, minimal, and production-ready

---

## ✂️ COPY ENDS HERE ⬆️

---

## Tips for Best Results

1. **Always start a fresh session with this prompt** — paste it first, then describe what you want
2. **Be specific about what you want** — "Add a share button to outfit cards" is better than "make it shareable"
3. **One feature per session** — keeps things focused and reduces errors
4. **After the AI confirms understanding** — describe your change in plain language
5. **If the AI asks clarifying questions** — answer them, don't skip

## Example Follow-up Messages

After the AI reads the docs and asks what you want, you can say things like:

- "Add a share button on each outfit card that copies the outfit link to clipboard"
- "Make the dashboard sidebar collapsible on mobile with a hamburger menu"
- "Add a 'Sort by newest/popular' dropdown on the storefront page"
- "Change the gold accent color to teal"
- "Add a new category called 'Gym Wear'"
