# Prototype Quest — Digital Rulebook

A premium, mobile-first web app that turns the Prototype Quest booklet into an
interactive book you open and flip through, instead of a PDF viewer.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion (opening animation, drawers, ambient motion)
- react-pageflip (realistic page-turning: swipe, drag, corner tap)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) — resize your
browser to a phone width, or open dev tools device mode, to see it as intended.

Build for production:

```bash
npm run build
npm run preview
```

The `dist/` folder is a static site — deploy it anywhere (Vercel, Netlify,
GitHub Pages, or your college server).

## Features

- Closed-book landing screen with a floating idle animation and an
  "Open Book" button
- Realistic page flip via `react-pageflip`: swipe, drag, or tap the page
  corners; keyboard arrow keys also work
- Table of Contents drawer (hamburger, top right) that jumps straight to a
  chapter
- Instant search with in-page highlighting and jump-to-result
- Long-press a page to bookmark it; bookmarks live in a drawer and persist in
  Local Storage
- Last page read is remembered and resumed automatically on the next visit
- Double-tap toggles fullscreen reading mode
- Subtle synthesized page-flip sound, muted by default, toggleable from the
  header
- Fully responsive: centered on tablet/desktop, true-to-life on phones

## Editing the content

All booklet text lives in `src/data/book.ts` as plain structured data
(`heading`, `paragraph`, `list`, `eyebrow`, `divider` blocks). Add or edit a
page there — no need to touch any component. If a page grows too long for one
screen, split it into two entries with the same `chapterId` (see how
`rules-1` / `rules-2` are split).

## Project structure

```
src/
  components/
    Book/              cover, back cover, content leaf, closed-book state, flipbook wrapper
    Header/             top bar (search, bookmarks, contents, sound)
    ContentsDrawer/     table of contents
    Search/             instant search
    Bookmark/           bookmarks list
    Navigation/         bottom prev / page count / next
    LoadingScreen/       first-load animation
    Drawer.tsx            shared bottom-sheet shell
  pages/
    Home.tsx              orchestrates loading -> closed book -> open book
  hooks/
    useBookmarks.ts        Local Storage-backed bookmarks
    useLastPage.ts         Local Storage-backed reading position
    usePageSound.ts        synthesized page-flip tick, mute toggle
  data/
    book.ts                 all booklet content + chapter map
```
