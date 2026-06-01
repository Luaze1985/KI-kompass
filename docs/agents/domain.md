---
title: "Agent domain docs"
date: 2026-05-23
status: ready
tags: [agents, domain-docs, context]
category: agent-config
---

# Domain Docs

This is a single-context repo for KI-beslutningsradar and HR Strategiradar.

## Read Before Product Or Architecture Work

1. `AGENTS.md`
2. `CONTEXT.md`
3. `CLAUDE.md`
4. `state/context/current_context.md`
5. Relevant files in `app_spec/`, especially `brukerreise_hr_strategiradar.md`, `arbeidsflyt_og_beregningsmodell.md` and `ui_3_stegs_startflyt_og_kanban.md`
6. Relevant architecture notes under `docs/architecture/`
7. For weighting, UI, UX, user journey, wording or visual prioritization: `docs/agents/ui-ux-subagent.md`

## Domain Vocabulary

Use the terms from `CONTEXT.md`. In particular:

- Say `foreløpig KI-diagnose`, not result or fasit.
- Say `KI-bruksoppgave` for the assessment unit, not the whole HR project.
- Treat `human-in-the-loop` as active human work, not a signature or checkbox.
- Treat ROS-punkter as project-group work items, not automatic compliance output.

## Architecture Notes

There is no `docs/adr/` directory yet. Existing architectural decisions live as notes under `docs/architecture/`.

If a future decision is hard to reverse, surprising without context and based on a real trade-off, create a proper ADR under `docs/adr/` using the grill-with-docs format.

## Conflict Rule

If a handoff or implementation plan conflicts with `CONTEXT.md`, `CLAUDE.md` or `state/context/current_context.md`, surface the conflict before implementation. Current known risk: Antigravity handoffs over-emphasized compliance-score, app mechanics and revision locking compared with the canonical workshop/work tool intent.

For UI/UX work, also surface conflicts with `docs/agents/ui-ux-subagent.md` before implementation. In particular, do not accept UI changes that make score, traffic light, lock state or compliance language more prominent than KI-bruksoppgave, stoppregler, ROS-punkter, local verification and human-in-the-loop.
