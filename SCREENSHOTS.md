# Reference App + Screenshots — how to run locally

The Cowork sandbox can't run a headless browser or reliably build Next.js on the
mounted folder, so screenshots must be generated on YOUR machine. This folder is a
real Next.js reference app (the course's invoice-tracker) you can run locally.

## Run it
```
cd invoice-tracker
npm install
npm run dev            # http://localhost:3000  (see /clients)
```

## Auto-capture the APP-UI screenshots (Playwright)
```
npm i -D playwright
npx playwright install chromium
# with `npm run dev` running in another terminal:
node scripts/screenshots.mjs   # writes PNGs to ./screenshots
```
Currently captures: Module 0 (Next.js starter), Module 4 (/clients table).
Add more `shots` entries as you build later features (e.g. Module 11 empty/error states).

## Screenshots Playwright CANNOT take — capture these by hand while recording
These are desktop apps / third-party dashboards (and need your accounts):

- **Module 0:** Cursor welcome screen; terminal version checks; Vercel↔GitHub connect
- **Module 4:** Cursor Cmd+K diff; @-mention menu; Composer multi-file diff
- **Module 5:** Claude Code welcome in terminal; CLAUDE.md; plan mode; permission prompt; multi-file diff
- **Module 6:** Supabase API keys; Table Editor; Auth users; an RLS policy
- **Module 7:** the Next.js error overlay; a debugging chat
- **Module 8:** GitHub repo; a pull request diff; a merge conflict in the editor
- **Module 9:** Vercel import screen; env vars settings; PR preview link; Supabase prod auth URLs
- **Module 12:** `claude mcp list`; a SKILL.md / skill install; `/plugin install`; an automated PR/deploy

## Note
The sandbox left a locked `node_modules` in this folder it couldn't delete.
Delete the whole `invoice-tracker` folder from your computer if you don't want it,
then re-clone/rebuild locally — the source files (app/, types/, scripts/) are the point.
