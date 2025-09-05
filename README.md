# Modelia – Mini AI Studio (Next.js)

Next.js + TypeScript app that simulates a simplified AI studio.

## Quick Start
```bash
pnpm i
pnpm dev
# or
npm i
npm run dev
```

## What’s Implemented
- Upload PNG/JPG (≤10MB) with client-side downscale to ≤1920px.
- Prompt input + style dropdown (Editorial, Streetwear, Vintage).
- Live summary (image + prompt + style).
- **Mocked API route** `/api/generate`: 1–2s latency, **20% error** (“Model overloaded”).
- Auto-retry with exponential backoff (max 3 attempts).
- **Abort** in-flight request.
- Last 5 generations in `localStorage`; clicking restores.
- A11y: labels, focus states, `aria-live` for status.
- TailwindCSS, strict TypeScript, ESLint + Prettier.
- Tests: Jest + RTL unit test for retry; Playwright smoke test.

## Scripts
- `pnpm dev` / `npm run dev` – start Next
- `pnpm build` / `npm run build` – build
- `pnpm start` / `npm run start` – run production build
- `pnpm test` / `npm run test` – unit tests (Jest)
- `pnpm e2e` / `npm run e2e` – e2e tests (Playwright)

## Notes
- The API returns the same data URL as `imageUrl` to simulate generation output.
- Abort cancels the client fetch; the server delay is still simulated but harmless.
- Keep scope tight per timebox; see TODOs for extras.

## TODOs
- Drag-and-drop upload + paste-from-clipboard.
- More component tests and an e2e covering generate flow.
- CI (GitHub Actions) for lint + test on PRs.
