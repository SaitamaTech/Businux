# Accessibility (WCAG 2.2 AA)

## What's in place

- **Semantic structure & landmarks:** `<nav aria-label="Primary">` for both desktop sidebar and
  mobile drawer, `role="dialog" aria-modal="true"` on the mobile nav drawer, `role="alert"` on
  form validation errors so screen readers announce them immediately.
- **Every icon-only control has an accessible name.** Search the codebase for `aria-label` — it's
  on every button/link that has no visible text (password show/hide toggles, sidebar
  collapse/logout, notification bell, mobile nav open/close, task card "Move to" menu, editor
  toolbar formatting buttons, staff-table edit/delete, avatar upload, etc). Decorative icons
  next to visible text use `aria-hidden="true"` instead, so screen readers don't announce a
  redundant icon name on top of the text that's already there.
- **Every form input has an accessible name** — either a visible `<Label htmlFor>` or, where a
  visible label would be redundant with a placeholder (search boxes, inline "add staff" table
  row), an `aria-label`.
- **Form errors are wired to their inputs** via `aria-invalid` + `aria-describedby` pointing at
  the `role="alert"` error text, not just visually adjacent to it.
- **Keyboard navigation:**
  - All Radix-based primitives (Dialog, DropdownMenu, Select, Tabs, Popover, Tooltip) come with
    correct keyboard behavior (Tab/Shift+Tab, Escape, Arrow keys, typeahead) out of the box.
  - The mobile nav drawer (a custom component, not a Radix primitive) has a hand-built focus
    trap: focus moves into the panel on open, Tab cycles within it, Escape closes it, and focus
    returns to the hamburger button on close.
  - **The Kanban board's drag-and-drop has a keyboard-operable equivalent.** Native HTML5
    drag-and-drop (used for mouse users) has no keyboard equivalent at all — that's a genuine
    WCAG 2.2 SC 2.1.1 (Keyboard) failure if left as the only way to move a card. Every task card
    has a "Move to" menu (the ⋮ icon, fully keyboard-operable via the same Radix DropdownMenu
    used elsewhere) that does the same thing dragging does.
  - The OTP/verification code input supports Arrow-key movement between digits and pasting a
    full code across all boxes at once (not just keyboard access — also just a better experience
    for everyone).
- **Focus rings:** every custom interactive element (not just Radix primitives, which already
  have this) has `focus-visible:ring-2 focus-visible:ring-ring` so keyboard users can always see
  where focus is.
- **No hydration-driven flicker/mismatch:** see `docs/ARCHITECTURE.md` and the comments in
  `theme-provider.tsx` — a few things that looked like minor implementation details (module-level
  `Date.now()` calls, `setState` directly in an effect) were actually latent hydration-mismatch
  bugs, fixed during the production-hardening pass rather than left as "probably fine."

## What to verify manually (not verifiable from this environment)

This project was built and hardened in a sandboxed environment without a real browser or screen
reader available, so the following — while addressed at the code level above — should get a
manual pass before shipping:

- A full keyboard-only pass through each screen (Tab through every interactive element in a
  sensible order, confirm nothing is a dead end).
- A screen reader pass with NVDA (Windows, free) or VoiceOver (Mac) on at least: login/signup
  forms, the Kanban board's "Move to" menu, and the mobile nav drawer.
- Automated scan with axe DevTools or Lighthouse's Accessibility audit in Chrome — a good
  five-minute check per page to catch anything the manual review above missed (e.g. color
  contrast in a specific state that's hard to eyeball from source).

## Adding new UI — checklist

- [ ] Icon-only button/link? → needs `aria-label`.
- [ ] Decorative icon next to visible text? → `aria-hidden="true"` on the icon.
- [ ] New form field? → `<Label htmlFor>` + `aria-invalid`/`aria-describedby` on validation error,
      following the pattern in `src/features/auth/components/login-form.tsx`.
- [ ] Custom interactive component (not a Radix primitive)? → confirm it's keyboard-operable
      and has a visible focus state before considering it done.
- [ ] Any drag-and-drop interaction? → needs a non-drag equivalent, per the Kanban board example.
