# Hooks And Rig

## Existing Hooks

- `.git/hooks/pre-commit` is active and calls `scripts/hooks/pre-commit.ps1`.

## Hook Script

- `scripts/hooks/pre-commit.ps1`
- Runs `git diff --check`, required active-task/context checks, and app-local lint when `apps/hr-strategiradar/` files are staged.
- Warns when `decision_model/` or `testcases/` changes without a staged `state/context/` update.
- Does not publish issues externally or run e2e/dev server checks.

## Manual Checks

- For HR Strategiradar app work, use the app-local package scripts.
- For concept work, verify against `state/context/current_context.md` and `docs/agents/domain.md`.
- For UI/UX changes, check `docs/agents/ui-ux-subagent.md`.

## Boundary

Do not activate hooks or publish issues externally without explicit approval.
