# Session Start Prompt

> Copy everything below the line and paste it as your FIRST message in any new AI session.
> This gives the AI full context of the project so it can pick up from where you left off.

---

## ✂️ COPY FROM HERE ⬇️

---

Read the three documentation files first before making any changes.

Let me read the files in order:

**Reading `website/docs/01-MASTER-PROMPT.md`...**
**Reading `website/docs/02-ARCHITECTURE.md`...**
**Reading `website/docs/03-DEVELOPER-GUIDE.md`...**

Based on my reading of all three files, I understand:

- **Product**: Influra (formerly StyleLink) is a creator affiliate storefront — creators curate outfit collections, visitors browse and click affiliate product links, generating revenue
- **Tech stack**: Next.js 14 (App Router) + Supabase + Tailwind CSS + TypeScript
- **Database tables**: `creators`, `outfits`, `products`, `clicks`
- **Key constraints**: Corporate proxy workarounds, React pinned at 18.2, no `next/image`, no `next/font/google`, no `getUser()` in middleware, no `router.push()` post-auth
- **Folder structure**: `app/` for routes, `components/` for UI, `lib/` for utilities, `docs/` for documentation
- **Design system**: CSS variable-based colors, editorial/fashion aesthetic, Tailwind utility classes

---

### ⚠️ BRANCHING CONTEXT — READ THIS FIRST

**I am working on branch `v1`** — this is the development branch for the next major release (v1.0.0).

| Branch   | Purpose                               | Deploys To                                    |
| -------- | ------------------------------------- | --------------------------------------------- |
| `master` | Production (stable, frozen at v0.5.1) | Vercel production: `stylelink-phi.vercel.app` |
| `v1`     | Development (all new work goes here)  | Vercel preview URL (testing only)             |

**Rules:**

- All code changes happen on `v1` — NEVER commit directly to `master`
- Documentation is updated alongside code on `v1`
- When `v1` is ready for release → PR in Foundry: `v1 → master` → merge → push to GitHub `main`
- CHANGELOG entries go under `[Unreleased - v1.0.0]` until merged

---

**Production status (v0.5.1 — frozen on `master`):**

- ✅ **LIVE** at https://stylelink-phi.vercel.app/
- ✅ Phase 1 + Phase 2 features complete
- ✅ v0.4.0 UI/UX improvements (mobile responsive dashboard, Google OAuth buttons, navigation fixes)
- ✅ v0.5.0 Landing page redesign (admin-featured outfit, WearThis-style card, platform logos)
- ✅ v0.5.1 Homepage polish (scrolling brand strip, 4 new platforms, layout alignment, bg fix)

**v1 branch status (in development):**

- 🔨 Building next major version
- Changes here do NOT affect production until merged to `master`
- Test via Vercel preview URL (push `v1` to GitHub `develop` branch)

**Deploy workflow:**

```bash
# Day-to-day development (testing only — production untouched):
git add .
git commit -m "change description"
git push origin v1                                    # Push to Foundry v1 branch
# Then on local PC:
git pull origin v1
git -c http.sslVerify=false push github develop       # Vercel preview URL

# Release (when v1 is ready for production):
# 1. Create PR in Foundry: v1 → master
# 2. Merge the PR
# 3. On local PC:
git checkout master && git pull origin master
git -c http.sslVerify=false push github main          # Vercel production updates
git tag v1.0.0 && git push origin v1.0.0              # Tag the release
```

**Git remotes:**

- `origin` → Foundry (primary code repo — branches: `master`, `v1`)
- `github` → GitHub (Vercel source — branches: `main` = production, `develop` = preview)

**Branch mapping:**

| Foundry  | →   | GitHub    | →   | Vercel                 |
| -------- | --- | --------- | --- | ---------------------- |
| `master` | →   | `main`    | →   | Production (live site) |
| `v1`     | →   | `develop` | →   | Preview URL (testing)  |

---

## ✂️ COPY ENDS HERE ⬆️

---

## Tips for Best Results

1. **Always start a fresh session with this prompt** — paste it first, then describe what you want
2. **Be specific about what you want** — "Add a share button to outfit cards" is better than "make it shareable"
3. **One feature per session** — keeps things focused and reduces errors
4. **After the AI confirms understanding** — describe your change in plain language
5. **If the AI asks clarifying questions** — answer them, don't skip
6. **Confirm the branch** — the AI should be working on `v1`, not `master`

## Example Follow-up Messages

After the AI reads the docs and asks what you want, you can say things like:

- "Add a share button on each outfit card that copies the outfit link to clipboard"
- "Make the dashboard sidebar collapsible on mobile with a hamburger menu"
- "Add a 'Sort by newest/popular' dropdown on the storefront page"
- "Change the gold accent color to teal"
- "Add a new category called 'Gym Wear'"
- "What's the diff between v1 and master right now?"
