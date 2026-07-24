# Portfolio · Muhammad Jawad Hassan

A dark, cinematic 3D portfolio. Built with Next.js 16, React Three Fiber, and Tailwind v4.

> _"Success is the blueprint drawn by vision and built by action."_

🔗 **Repo:** `https://github.com/Muhammad-Jawad-Hassan/PERSONAL-PORTFOLIO.git`

## Run locally

Requires Node 20+ and npm.

```bash
git clone https://github.com/Muhammad-Jawad-Hassan/PERSONAL-PORTFOLIO.git
cd Personal-Portfolio
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command         | Purpose                  |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm start`     | Run the production build |
| `npm run lint`  | ESLint                   |

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind v4 with CSS-variable design tokens
- **3D:** React Three Fiber · Three.js · @react-three/drei · @react-three/postprocessing
- **Motion:** GSAP · Lenis · Motion
- **Fonts:** Geist Sans + Geist Mono

## Project layout

```
src/
├── app/                # Next.js App Router (layout, page, globals.css, icons)
├── components/
│   ├── sections/       # Page sections (about, projects, experience, skills, contact)
│   ├── three/          # R3F scenes & 3D primitives
│   ├── loader/         # Curtain loader + intro animations
│   └── ui/             # HUD, frames, cursor, badges
├── data/               # Resume content as typed data
└── lib/                # Theme tokens, hooks, utilities
public/                 # Resume PDF, SVG icons, profile pic
```

## Deploy

Push to GitHub → import on [Vercel](https://vercel.com/new). No environment variables required.
