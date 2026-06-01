---
title: "Agent issue tracker"
date: 2026-05-23
status: ready
tags: [agents, issue-tracker, local-markdown]
category: agent-config
---

# Issue Tracker: Local Markdown

Issues, plans and PRD-derived task lists for this repo live as markdown files under `issues/`.

## Conventions

- Use `issues/` as the issue tracker root.
- Existing issue lists, such as `issues/hr_strategiradar_mvp_issues.md`, are valid tracker documents.
- New issue files should use YAML frontmatter with `title`, `date`, `status`, `tags` and `category`.
- Triage state is recorded in frontmatter `status` when possible, using the labels in `docs/agents/triage-labels.md`.
- If a feature needs multiple issue files, create a focused directory under `issues/<feature-slug>/`.
- Comments and follow-up notes can be appended under a `## Comments` heading.

## When a skill says "publish to the issue tracker"

Create or update markdown under `issues/`. Do not call a remote tracker unless the user explicitly asks for it.

## When a skill says "fetch the relevant ticket"

Read the referenced path under `issues/`, or search `issues/` by issue id, title or slug.

## Project-specific note

This repo has no configured git remote. Treat local markdown as canonical for planning and triage until the user explicitly chooses GitHub, GitLab or another external tracker.
