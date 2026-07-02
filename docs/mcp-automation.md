# Module 12 — MCP automation

**MCP (Model Context Protocol)** lets an AI agent operate external services
through structured tool calls instead of a human clicking dashboards. This
project was built and shipped that way.

## MCP servers used

| Server | What the agent did through it |
|---|---|
| **GitHub** | Created branches, committed files, opened PRs, merged them |
| **Vercel** | Inspected the project, deployments, and preview URLs |
| **Supabase** | (CLI + Management API fallback) schema, RLS, keys, config |
| **Chrome DevTools** | Drove a real browser to capture dashboard screenshots |
| **Playwright** | Headless browser for app-UI screenshots + E2E tests |

## The automated commit → PR → deploy pipeline

This very file was added by the agent with **zero local git and no `gh` CLI** —
purely GitHub MCP tool calls:

1. `create_branch` → `feat/module-12-mcp-automation` off `main`
2. `create_or_update_file` → commit `docs/mcp-automation.md`
3. `create_pull_request` → open the PR
4. **Vercel** auto-builds a **preview deployment** for the PR (GitHub integration)
5. `merge_pull_request` → merge to `main`
6. Merge to `main` triggers Vercel's **production deploy** automatically

The human stays in the loop by reviewing the PR before the merge step — the same
human-approval gate the overdue-reminder workflow uses in the app itself.

## Try it

Ask the agent: *"open a PR that adds X, wait for the preview, then merge it."*
Everything after that is tool calls.
