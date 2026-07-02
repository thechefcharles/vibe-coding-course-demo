# Screenshot manifest

App-UI shots are captured automatically with `node scripts/screenshots.mjs`
(Playwright, chromium, 1280×800, fullPage). Tool/desktop/dashboard shots must be
captured by hand — see `../SCREENSHOTS.md` for the capture checklist.

| filename | module | what it shows | auto/manual | done |
|---|---|---|---|---|
| m00/m00-01-nextjs-starter.png | 0 | Next.js starter page at localhost:3000 | auto | ✅ |
| m00-cursor-welcome.png | 0 | Cursor welcome screen | manual | ⬜ |
| m00-terminal-versions.png | 0 | terminal version checks (node/npm) | manual | ⬜ |
| m04/m04-01-clients-table.png | 4 | /clients table (mock rows) | auto | ✅ |
| m04/m04-02-create-form.png | 4 | /clients/new create form | auto | ✅ |
| m04-cursor-cmdk-diff.png | 4 | Cursor Cmd+K inline diff | manual | ⬜ |
| m04-cursor-at-mention.png | 4 | Cursor @-mention menu | manual | ⬜ |
| m04-cursor-composer-diff.png | 4 | Cursor Composer multi-file diff | manual | ⬜ |
| m05/m05-01-invoices-table.png | 5 | /invoices list (mock) | auto | ✅ |
| m05/m05-02-invoice-form.png | 5 | /invoices/new form | auto | ✅ |
| m05-claude-welcome.png | 5 | Claude Code welcome in terminal | manual | ⬜ |
| m05-claude-md.png | 5 | CLAUDE.md | manual | ⬜ |
| m05-claude-plan-mode.png | 5 | plan mode | manual | ⬜ |
| m05-claude-permission.png | 5 | permission prompt | manual | ⬜ |
| m05-claude-multifile-diff.png | 5 | multi-file diff | manual | ⬜ |
| m06/m06-01-signed-out.png | 6 | app signed-out view (login page) | auto | ✅ |
| m06/m06-02-signed-in-clients.png | 6 | app signed-in /clients (live data) | auto | ✅ |
| m06-supabase-api-keys.png | 6 | Supabase API keys | manual | ⬜ |
| m06-supabase-table-editor.png | 6 | Supabase Table Editor | manual | ⬜ |
| m06-supabase-auth-users.png | 6 | Supabase Auth users | manual | ⬜ |
| m06-supabase-rls-policy.png | 6 | an RLS policy | manual | ⬜ |
| m07-error-overlay.png | 7 | Next.js error overlay | manual | ⬜ |
| m07-debugging-chat.png | 7 | a debugging chat | manual | ⬜ |
| m08-github-repo.png | 8 | GitHub repo | manual | ⬜ |
| m08-github-pr-diff.png | 8 | a pull request diff | manual | ⬜ |
| m08-merge-conflict.png | 8 | a merge conflict in the editor | manual | ⬜ |
| m09/m09-01-live-clients.png | 9 | live /clients on the public Vercel URL | auto (after deploy) | ⬜ |
| m09-vercel-import.png | 9 | Vercel import screen | manual | ⬜ |
| m09-vercel-env.png | 9 | Vercel env vars settings | manual | ⬜ |
| m09-vercel-preview-link.png | 9 | PR preview link | manual | ⬜ |
| m09-supabase-prod-auth-urls.png | 9 | Supabase prod auth URLs | manual | ⬜ |
| m11/m11-01-loading.png | 11 | /clients?state=loading skeleton | auto | ✅ |
| m11/m11-02-empty.png | 11 | /clients?state=empty friendly empty | auto | ✅ |
| m11/m11-03-error.png | 11 | /clients?state=error + retry | auto | ✅ |
| m11/m11-04-tests.txt | 11 | unit + E2E test run output | auto | ✅ |
| m10/m10-01-approval-queue.png | 10 | overdue-reminder human-approval queue | auto | ✅ |
| m12-mcp-list.png | 12 | `claude mcp list` | manual | ⬜ |
| m12-skill-install.png | 12 | SKILL.md / skill install | manual | ⬜ |
| m12-plugin-install.png | 12 | `/plugin install` | manual | ⬜ |
| m12-automated-pr-deploy.png | 12 | an automated PR/deploy | manual | ⬜ |
