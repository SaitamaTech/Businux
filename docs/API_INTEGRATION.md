# API Integration Guide

## The short version

Everything the UI needs from a backend goes through `src/services/api/*.ts`. Each function in
those files currently does this:

```ts
async getById(id: string): Promise<Customer | null> {
  if (env.useMockApi) {
    await mockDelay();
    return mockCustomers.find((c) => c.id === id) ?? null;
  }
  return apiClient<Customer | null>(`/customers/${id}`);
}
```

To go live: set `NEXT_PUBLIC_USE_MOCK_API=false` in `.env.local` and set
`NEXT_PUBLIC_API_BASE_URL` to your Express server's URL. The mock branch stops running and the
real `apiClient()` call takes over — **no component code changes required**, because components
never call `fetch` directly; they only ever go through these service functions (or the React
Query hooks in `src/hooks/` that wrap them).

## Layers, outside-in

```
Component
  → src/hooks/use-*.ts        (React Query: caching, loading/error state, invalidation)
    → src/services/api/*.ts    (typed request functions, mock/real switch lives here)
      → src/services/api/client.ts   (fetch wrapper: base URL, credentials, error parsing)
        → your Express API
```

Only `client.ts` knows about `fetch()`. Only `api/*.ts` knows whether a given call is currently
mocked. Everything above that just calls a typed async function and gets typed data back.

## What's already wired vs. what's new scaffolding

**Currently driving the approved UI (unchanged, still mock-data-based):** the Zustand stores in
`src/store/*` — `auth-store.ts`, `task-board-store.ts`, `ai-assistant-store.ts`, etc. These are
what the actual screens read from today, and they were intentionally left as-is rather than
rewired mid-project, since the UI is already approved and tested and a wholesale rewrite right
now would risk regressions for no visible benefit.

**New, additive, ready to adopt:** `src/services/api/*` and `src/hooks/*`. These exist so that
backend integration has a clear, typed path to follow. The recommended order of adoption:

1. Build the Express endpoints listed below.
2. Flip `NEXT_PUBLIC_USE_MOCK_API=false`.
3. Migrate one screen at a time from its Zustand store to the matching `hooks/use-*.ts` (e.g.
   swap the Kanban board's `useTaskBoardStore` for `useTasks()` + `useUpdateTaskStatus()`, which
   already has optimistic updates written).
4. Once a store's data-fetching responsibility has fully moved to React Query, keep the store
   only if it still holds pure UI state (e.g. "which column is being dragged over") — see
   `STATE_MANAGEMENT.md`.

This lets you ship backend integration incrementally, screen by screen, verifying each one,
rather than a risky big-bang rewrite.

## Expected Express endpoints

These are the contracts `src/services/api/*.ts` currently assumes. Adjust
`src/types/api.ts` and the corresponding service file together if your backend team's actual
shape differs — that's the only place the difference needs to be absorbed.

### Authentication

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/auth/login` | `{ email, password }` | `{ user }` + sets httpOnly session cookie |
| POST | `/auth/signup` | `{ fullName, email, password }` | `{ user }` |
| POST | `/auth/logout` | — | `204` + clears session cookie |
| GET | `/auth/me` | — | `{ user }` or `401` |
| POST | `/auth/verify-email` | `{ code }` | `{ verified }` |
| POST | `/auth/forgot-password` | `{ email }` | `{ sent }` |
| POST | `/auth/reset-password` | `{ token, password }` | `{ success }` |

**Authentication — the one thing to change carefully:** replace the entire body of `login()` in
`src/store/auth-store.ts` with a real call to `authApi.login()`, and — this is the important
part — have your Express `/auth/login` route set a real `httpOnly`, `Secure`, `SameSite=Lax`
session cookie. Once it does, delete the `setSessionCookie()` helper and its call sites in
`auth-store.ts`; `proxy.ts` should check for *your* real cookie's name instead of
`businux_session`, and ideally verify it (decode a JWT, or call a `/auth/verify` endpoint)
rather than just checking presence. Full detail is in the comment block at the top of
`src/proxy.ts`.

### Customers / CRM

| Method | Path | Returns |
|---|---|---|
| GET | `/customers?search=&status=` | `Customer[]` |
| GET | `/customers/:id` | `Customer` |
| GET | `/customers/:id/deals` | `Deal[]` |
| GET | `/customers/:id/activity` | `ActivityItem[]` |
| POST | `/customers` | `Customer` |

### Tasks

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/tasks` | — | `Task[]` |
| POST | `/tasks` | `{ title, status, priority?, dueDate? }` | `Task` |
| PATCH | `/tasks/:id/status` | `{ status }` | `Task` |
| DELETE | `/tasks/:id` | — | `204` |

### Dashboard / Reports

| Method | Path | Returns |
|---|---|---|
| GET | `/dashboard/summary` | `DashboardSummaryResponse` (revenue, profit, expenses, health score, trend) |
| GET | `/dashboard/tasks-breakdown` | Status counts for the tasks donut |
| GET | `/dashboard/revenue-by-source` | Category breakdown for the revenue donut |

### AI Assistant

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/ai-assistant/messages` | `{ content, conversationId? }` | `{ id, role, content, timestamp }` |

**AI Assistant streaming:** the chat UI (`src/features/ai-assistant/`) currently shows a
"Thinking..." indicator and then the full reply at once. If your backend streams tokens (e.g.
via Server-Sent Events, matching how the OpenAI API streams), `aiAssistantApi.sendMessage()` in
`src/services/api/ai-assistant.ts` is the one function to change — swap the single `fetch`/`await`
for a `ReadableStream` reader that appends chunks to the message as they arrive. The chat bubble
component doesn't need to change either way; it just renders whatever string is in the message.

## Error handling contract

`apiClient()` (`src/services/api/client.ts`) expects error responses shaped like:

```json
{ "error": { "code": "invalid_credentials", "message": "Incorrect email or password.", "fields": { "email": "..." } } }
```

and throws a typed `ApiError` (`status`, `code`, `message`, optional `fields` for per-field
validation errors) that calling code can catch. If your backend's error shape differs, update
the error-parsing block in `apiClient()` — again, one place.

## CORS

If the Express API is on a different origin than the frontend, enable CORS with
`credentials: true` for your frontend's origin specifically (not `*`) — `apiClient()` always
sends `credentials: "include"` so the session cookie is attached.
