# LAOS-Finance

**ເວັບໄຊທ໌ທາງການ ຖ່າຍທອດສົດ ແລະ ຜົນຫວຍລາວ** ພາຍໃຕ້ສຳປະທານໃໝ່ ຈາກລັດຖະບານ ສປປ ລາວ.

Official information portal for the Lao Government Lottery — live broadcast, real-time chat, historical results, news, statistics, and lottery checking.

## Quick start

```bash
pnpm install
pnpm dev          # frontend (web/) on http://localhost:5173
pnpm dev:api      # backend (src/) on http://localhost:8080
pnpm dev:all      # both in parallel
```

## Workspace structure

```
LAOS-Finance/
├── web/              Vite + React 18 + TS + Tailwind + shadcn
│   ├── src/
│   │   ├── components/   layout, lottery, home, news, legal
│   │   ├── pages/        Home, Live, Results, News, Check, Stats, Schedule, About, Legal
│   │   ├── locales/      lo.json (default), th.json
│   │   ├── lib/          cn, i18n, formatDate
│   │   ├── data/         seed (mock data for MVP)
│   │   └── styles/       tokens.css (design system)
│   └── ...
├── src/              Node.js (Fastify + Socket.IO) backend stub
├── docs/             reference screenshots, API spec, runbooks
├── scripts/          deploy, migration, seed
├── tests/            unit + integration (vitest)
├── CLAUDE.md         AI assistant rules (project conventions)
└── .mcp.json         MCP servers for Claude Code
```

## Features (MVP)

| Section | Status | Notes |
|---------|--------|-------|
| Live stream hero (HLS) | ✅ MVP | hls.js + native fallback, demo stream URL |
| Real-time chat | ✅ Mock | UI ready, mock incoming messages — wire up Socket.IO Phase 2 |
| Latest results cards | ✅ MVP | 6 lottery types, seed data |
| Quick check (number search) | ✅ MVP | Matches seed results |
| News feed | ✅ MVP | 8 seeded Lao articles + featured layout |
| Statistics | ✅ MVP | Hot numbers with frequency bars |
| Schedule table | ✅ MVP | Weekly grid per lottery type |
| About + concession info | ✅ MVP | Placeholder concession # — replace with real one |
| Legal pages | ✅ MVP | 5 pages: privacy, terms, cookies, disclaimer, responsible-play |
| i18n (lo / th) | ✅ MVP | Default = Lao; toggle in header |
| Cookie banner (PDPA-aware) | ✅ MVP | Accept all / reject all |
| Age gate modal (20+) | ✅ MVP | Persists in localStorage |
| Admin panel | ⏳ Phase 2 | Results CRUD + verification workflow |
| Backend API + MongoDB | ⏳ Phase 2 | Fastify stub exists in `src/server.ts` |

## Next steps

1. Fill in `.env` from `.env.example`
2. Provision DigitalOcean droplet → update `.mcp.json` SSH alias `laosfinance`
3. Wire real Lao lottery feed (HLS source from broadcaster)
4. Replace `web/src/data/seed.ts` with real API calls
5. Build admin panel (per `CLAUDE.md` "Data Integrity Rules")
6. Run `/security-audit` and `/production-hardening` before go-live

See `CLAUDE.md` for full conventions and `docs/` for reference.
