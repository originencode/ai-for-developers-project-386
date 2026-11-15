# AGENTS.md

Booking-calendar service: one pre-defined owner publishes meeting types with durations; guests book free slots within the next 14 days; a time slot can't be double-booked. Hexlet learning project — README and domain docs are in Russian.

## Quality gates

- **`mise run check` runs every check and must pass before a change is done.** CI (`.github/workflows/quality.yml`) runs the same command. One-time setup: install [mise](https://mise.jdx.dev/), then `mise install` and `mise run hooks` (installs pre-commit/pre-push hooks).
- `mise run fix` applies the safe autofixes (formatters, lint --fix).
- Never disable a lint rule or downgrade a check to a warning to get a change through. Exceptions are narrow (one path, one rule), carry a reason, and need a human decision. Security suppressions carry a review date (see `osv-scanner.toml`).
- Tool versions are pinned in `mise.toml` (and `global.json` for the .NET SDK); GitHub Actions are pinned to commit SHAs. Bumping a tool is a deliberate change to those files.
- Hooks can be bypassed with `--no-verify` — don't. CI is the gate.

## Layout

- `src/Calendar.WebApi/` — ASP.NET Core backend, **.NET 10** minimal API (`Program.cs`). Currently just `GET / -> "Hello World!"`; the whole API still needs to be built.
- `src/Calendar.WebApp/` — React 19 + Vite 8 + TypeScript frontend. **Not part of the .slnx solution**; it's a standalone pnpm package.
- `tests/Calendar.Tests/` — NUnit tests (net10.0). Does not yet reference the WebApi project — add a `ProjectReference` when tests need app code.
- `Calendar.slnx` — XML solution format (requires a recent .NET SDK; `dotnet build Calendar.slnx` / `dotnet test Calendar.slnx` work).

## Commands

Backend (from repo root):

- `dotnet run --project src/Calendar.WebApi` — dev server
- `dotnet test` / `dotnet test --filter "FullyQualifiedName~SomeTest"` — all / single NUnit test

Frontend (from `src/Calendar.WebApp/`):

- **pnpm only** (pinned to pnpm@12.21.0 via `packageManager`/`devEngines`; npm/yarn will be rejected)
- `pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm format:check` / `pnpm typecheck` (lint/format use oxlint/oxfmt from the mise toolchain — run them via `mise run check` or with mise activated)
- **Local dev requires `VITE_API_HOST`** env var: Vite proxies `/api/*` to it (`vite.config.ts`). `.env.local` only contains `BROWSER=none` — add e.g. `VITE_API_HOST=http://localhost:5xxx` pointing at the running WebApi, or `/api` calls fail.
- No frontend test script is defined; `vitest` is installed but unwired — add a `test` script if you write frontend tests.

## Constraints

- `.github/workflows/hexlet-check.yml` — **do not delete, rename, or edit**; Hexlet's grader runs on every push (stated in the file header and README).
- Frontend code lives under `src/Calendar.WebApp/src/` and talks to the backend only via `/api/*` (relative paths, so the Vite proxy handles it in dev).
