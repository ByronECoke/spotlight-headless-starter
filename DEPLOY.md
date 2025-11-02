# Deploy Guide (GitHub + Vercel + Directus + n8n)

## 0) Prereqs
GitHub • Vercel • Directus • n8n • GitHub PAT (repo)

## 1) Push to GitHub
(init, commit, push main)

## 2) Deploy on Vercel
Add env: SITE_BASE_URL, PODCAST_RSS, YT_CHANNEL_ID. Deploy.

## 3) Directus
Import: directus/directus_collections.json and directus/rss_cache_collections.json

## 4) n8n Workflows
Import from automation/n8n/ :
- podcast_rss_to_directus.json (weekly)
- youtube_rss_to_directus.json (daily)
- generate_mdx_and_commit.json (daily)

Create credentials for Directus (Bearer) and GitHub (Bearer).

## 5) Optional: Switch site source from RSS → Directus
Update /app/episodes/page.tsx and /app/snippets/page.tsx to fetch Directus instead of RSS.
