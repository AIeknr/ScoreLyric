---
name: scorelyric-release
description: Prepare and publish ScoreLyric repository updates while keeping README product status, design screenshots, roadmap, and release notes synchronized. Use when asked to commit, push, release, or document a ScoreLyric change.
---

# ScoreLyric Release

Treat implementation and documentation as one release unit.

## Before committing

1. Inspect the working tree and preserve unrelated user changes.
2. Verify the changed behavior in proportion to risk. For UI work, check the relevant desktop and mobile states in a browser. Run lint and a production build when dependencies are available.
3. Update `README.md` whenever the change affects product positioning, current status, features, architecture, deployment, roadmap, or user-visible design.
4. For a new visible design version, capture the actual implementation, store the final image under `docs/screenshots/`, add a numbered design entry, and add a dated update record. Do not use a generated mock as evidence when an implemented page can be captured.
5. Keep README claims honest: distinguish completed behavior, UI prototypes, configuration-ready seams, and future backend or Docker work.
6. Run `git diff --check`, inspect the final diff and confirm no temporary QA output, secrets, environment files, or dependency artifacts are staged.

## Commit and push

- Use a concise commit message that describes the product-level change.
- Push only when the user explicitly requests publishing or pushing.
- After pushing, report the branch, commit hash, verification performed, documentation/screenshot updates, and any intentionally unfinished backend or deployment work.

ScoreLyric's current direction is a local NAS application distributed with Docker. Core OCR, library management, search, and correction should be designed to run locally; optional translation or metadata services must not be described as required core dependencies.
