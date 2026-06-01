---
title: "Agent triage labels"
date: 2026-05-23
status: ready
tags: [agents, triage, labels]
category: agent-config
---

# Triage Labels

The engineering skills use five canonical triage roles. This repo uses the standard label strings.

| Label in mattpocock/skills | Label in this tracker | Meaning |
|---|---|---|
| `needs-triage` | `needs-triage` | Maintainer needs to evaluate the issue. |
| `needs-info` | `needs-info` | Waiting on reporter or product owner for more information. |
| `ready-for-agent` | `ready-for-agent` | Fully specified and ready for an AFK agent. |
| `ready-for-human` | `ready-for-human` | Needs human implementation, judgement or domain decision. |
| `wontfix` | `wontfix` | Will not be actioned. |

When a skill mentions a triage role, use the matching string in local markdown frontmatter or issue metadata.
