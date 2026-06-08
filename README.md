# LAOS-Finance (ຫວຍລາວການເງິນ)

**ເວັບໄຊທ໌ທາງການ ຖ່າຍທອດສົດ ແລະ ຜົນຫວຍລາວ** ພາຍໃຕ້ສຳປະທານໃໝ່ ຈາກລັດຖະບານ ສປປ ລາວ.

Official information portal for the Lao Government Lottery — live broadcast,
real-time chat, historical results, news, statistics, and lottery checking.

## Quick start

```bash
pnpm install
pnpm dev          # frontend (web/) on http://localhost:5273
pnpm dev:api      # backend (src/) on http://localhost:8080
pnpm dev:all      # both in parallel
```

Then open <http://localhost:5273>.

## Workspace structure

```
LAOS-Finance/
├── web/                    Vite + React 18 + TS + Tailwind frontend
│   ├── src/
│   │   ├── components/         layout, lottery, home, news, legal
│   │   ├── pages/              Home, Live, Results, News, Check, Stats, Schedule, About, Legal
│   │   ├── locales/            lo.json (default), th.json
│   │   ├── lib/                cn, i18n, formatDate, useMatchedHeight
│   │   ├── data/               seed.ts (mock data for MVP)
│   │   └── styles/             tokens.css (design system)
│   └── public/                 favicon.svg, apple-touch-icon.svg, site.webmanifest
├── src/                    Node.js (Fastify + Socket.IO) backend stub
├── docs/                   reference assets, API spec, runbooks
├── package.json            workspace root
└── pnpm-workspace.yaml
```

## Tech stack

- **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS + React Router v6
- **i18n**: `react-i18next` — Lao (default) + Thai, locales in `web/src/locales/`
- **Live stream**: `hls.js` (HLS) with YouTube embed fallback
- **Realtime chat**: mock in MVP; Socket.IO wired in `src/server.ts` for Phase 2
- **Forms / validation**: `react-hook-form` + `zod`
- **Date / time**: `dayjs` with Asia/Vientiane timezone, Lao month names
- **Currency**: Kip (ກີບ) — `formatKip()` helper handles ຕື້/ລ້ານ short forms
- **Backend**: Fastify + Socket.IO + Zod (stub, not wired to UI yet)
- **Icons**: `bootstrap-icons` (no emoji in source)

## MVP features

| Section | Status |
|---------|--------|
| Live stream hero (HLS + YouTube fallback) | ✅ |
| Realtime chat (smart auto-scroll + unread badge) | ✅ Mock |
| Latest results cards (3 lottery types, expandable prize structure) | ✅ |
| Quick check (number search) | ✅ |
| News feed (8 seeded Lao articles + categories) | ✅ |
| Statistics (hot numbers + frequency bars) | ✅ |
| Schedule table (weekly grid) | ✅ |
| About + concession display | ✅ |
| Legal pages (privacy, terms, cookies, disclaimer, responsible play) | ✅ |
| i18n toggle (Lao / Thai) | ✅ |
| Cookie banner (PDPA opt-in) | ✅ |
| Age gate modal (20+) | ✅ |
| Favicon + PWA manifest | ✅ |
| Admin panel | ⏳ Phase 2 |
| Backend wired to MongoDB | ⏳ Phase 2 |

## Lottery types supported

| Type | slug | Schedule | Brand color |
|------|------|----------|-------------|
| ຫວຍລາວການເງິນ | `lao-finance` | Mon–Fri 20:30 | Red `#C8102E` |
| ຫວຍລາວວຽງຈັນ | `lao-vientiane` | Daily 14:30 | Blue `#003DA5` |
| ຫວຍລາວປາກເຊ | `lao-pakse` | Daily 10:30 | Green `#0E7C3A` |

Times are Asia/Vientiane (UTC+7).

## Prize structure (per draw)

| Tier | Amount (Kip) | Count |
|------|--------------|-------|
| ລາງວັນທີ 1 | 6,000,000,000 | 1 |
| ລາງວັນທີ 2 | 200,000,000 | 5 |
| ລາງວັນທີ 3 | 80,000,000 | 10 |
| ລາງວັນທີ 4 | 40,000,000 | 50 |
| ລາງວັນທີ 5 | 20,000,000 | 100 |
| ຂ້າງຄຽງລາງວັນທີ 1 | 100,000,000 | 2 |
| ເລກໜ້າ 3 ໂຕ | 4,000,000 | 2 |
| ເລກທ້າຍ 3 ໂຕ | 4,000,000 | 2 |
| ເລກທ້າຍ 2 ໂຕ | 2,000,000 | 1 |

## Configuration

Copy `.env.example` to `.env` and fill in real values. The `.env` file is
gitignored — never commit secrets.

## Next steps

1. Provision production server and update deployment config
2. Wire real Lao lottery HLS feed (currently a demo test stream)
3. Replace `web/src/data/seed.ts` with real API calls to `src/server.ts`
4. Build admin panel (results CRUD with draft → verified → published workflow + audit log)
5. Replace placeholder concession number on `/about` with the real license
6. Run security audit + production hardening before go-live

## License

Proprietary — © LAOS-Finance Co., Ltd. All rights reserved.
