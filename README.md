# lukairo-engine

Modular engine layout with core systems, pluggable modules, public assets, and runnable examples.

## Structure

- `core/` — renderer, state, physics, UI system, and data layer primitives.
- `modules/` — feature modules (globe, AI, CRM, analytics). Add more as needed.
- `public/` — static assets served by Vite; images and other assets live here.
- `examples/` — lightweight demos wired to the engine and modules.
- `engine.js` — orchestrates core systems and modules.
- `vite.config.js` — Vite setup serving the repo root with `public` as static dir.
- `package.json` — scripts for dev/build.

## Scripts

```bash
npm run dev   # start Vite dev server (root .)
npm run build # build to dist/
```

## Notes

- Core modules are stubs; extend with real rendering, physics, and data plumbing.
- Examples import from the repo root; public assets are available under `/public`.
- Three.js is installed; integrate it inside `modules/globe` when ready.

