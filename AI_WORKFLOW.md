# Multi-AI Workflow

Git is the source of truth for completed work. This file defines handoff rules for any AI editing this repository.

## Start every task

Run `git status --short` and `git log -5 --oneline` before editing.

- Read `AGENTS.md` and inspect the current implementation.
- Preserve existing user changes. Never reset, checkout, stash, or discard them without approval.
- Check `SHOWCASE_LOCK.md` before changing app cards, categories, icons, descriptions, badges, or entry points.

## During the task

- Prefer the smallest existing pattern; keep translations in `src/data/translations.js` and showcase data in `src/data/apps.js`.
- For unfinished work, create or update `AI_HANDOFF.md` with the goal, changed files, next step, and checks. Remove it when complete.
- Do not treat `.antigravitycli/`, `.claude/`, or any tool-owned folder as shared project memory. These may be local, symlinked, stale, or absent on another machine.

## Before handoff

Run the smallest relevant local check, `git diff --check`, and `git status --short`. Do not run production or release builds unless the user explicitly authorizes deployment, release, or launch, as required by `../AGENTS.md`.

Do not run `git add`, `git commit`, or `git push` unless the user explicitly asks. When a commit is requested, make one cohesive commit for the completed user request—not one commit per subtask, checkpoint, handoff, or test pass. Do not commit generated `dist/` files unless explicitly required.

## Push and deploy

- Commit and push only with their respective explicit user authorization; neither authorizes a production build or deployment.
- All builds, packaging and releases run locally. GitHub stores source and Release assets only; never trigger, rerun or re-enable GitHub Actions.
- Local production builds, uploads and deployment require explicit release/deployment authorization. Use `gh release` locally for authorized Release asset uploads.
- Cloudflare operations use `cf` only. Its current legacy Pages directory-upload limitation blocks Pages uploads; do not fall back to Wrangler or automatically migrate production projects.
- A local commit, source push, Release upload and website deployment are distinct operations; report only those actually performed.
