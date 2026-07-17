# 🛡️ ScamSense — AI scam protection for elderly users and their families

**Check anything suspicious in 5 seconds.** Paste a message or upload a screenshot → get a 🔴🟡🟢 verdict, a plain-language breakdown of the manipulation tactics, and concrete next steps — in English and 中文. Every check can alert the family dashboard.

## Why not just ScamShield?

Singapore's ScamShield blocks **known bad numbers** (blacklist → reactive → protects one person). ScamSense analyzes **any content with AI** — it catches *new* scams by their manipulation patterns, *teaches* the user the tactic so they build immunity, and *loops in the family* (proactive → educational → multi-user). Blacklists miss new scams by definition; tactics don't change.

## Features

| Feature | Where |
|---|---|
| Text analysis → verdict + tactic breakdown + advice (EN + 中文) | `/` |
| Screenshot analysis (Claude vision) — judges can screenshot a scam on their own phone and test live | `/` |
| Elderly mode: large serif type, high contrast, 3-step flow | everywhere |
| Scam library: 5 real scam patterns with pre-cached analyses (works with **no API key** — stage-demo insurance) + live re-run | `/library` |
| Family link: shared family code, child dashboard with red-alert banner | `/family` |
| Telegram bot: forward any message/screenshot to the bot, verdict in chat, `/family CODE` to link alerts | `/api/telegram` |

## Run locally

```bash
cd scamsense
npm install
ANTHROPIC_API_KEY=sk-ant-... npm run dev
```

Without a key, the app still runs: the Scam Library works fully from cached analyses; live checks show a friendly notice.

## Deploy (Vercel)

1. Import the repo on vercel.com → set **Root Directory = `scamsense`**.
2. Environment variables:

| Var | Required? | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | For live analysis | Claude API (model: `claude-opus-4-8`) |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Optional | Persistent family dashboard. Without them a temp-file store is used (fine locally; ephemeral on serverless). |
| `TELEGRAM_BOT_TOKEN` | Optional | Telegram bot entry point |

## Supabase schema (when enabling persistence)

```sql
create table checks (
  id uuid primary key,
  family_code text not null,
  verdict text not null,
  scam_type_en text,
  headline_en text,
  headline_zh text,
  snippet text,
  source text,
  created_at timestamptz not null default now()
);
create index checks_family_code_idx on checks (family_code, created_at desc);
alter table checks enable row level security; -- server uses service-role key; no public policies needed
```

## Telegram bot setup

1. Create a bot with [@BotFather](https://t.me/BotFather), copy the token → `TELEGRAM_BOT_TOKEN`.
2. Register the webhook:
   `curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-domain>/api/telegram"`
3. Send the bot any suspicious message or screenshot. `/family TAN2026` links its checks to the family dashboard.

## Architecture

- **Next.js 15 (App Router) + TypeScript**, no UI framework — hand-rolled elderly-mode CSS.
- **`lib/analyze.ts`** — single shared analysis engine (official `@anthropic-ai/sdk`, structured JSON output, bilingual results in one call) used by both the web API and the Telegram webhook.
- **`lib/store.ts`** — storage adapter: Supabase REST when configured, temp-file fallback otherwise.
- **`data/scamLibrary.ts`** — 5 curated scam patterns with full cached analyses.
