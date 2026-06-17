# saytes.io

Personal portfolio site, built with [Next.js](https://nextjs.org) (App Router) and
[Tailwind CSS v4](https://tailwindcss.com). Statically exported (`output: "export"`)
and deployed to GitHub Pages at [saytes.io](https://saytes.io).

## Development

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # static export to ./out
npm test         # run the vitest suite
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static
export on an Ubuntu runner and publishes `./out` to GitHub Pages.

## The lockfile / `npm ci` gotcha

Tailwind v4 ships native `@tailwindcss/oxide` binaries, with `wasm32-wasi`
fallbacks that depend on `@emnapi/*`. npm records optional, platform-specific
dependencies in `package-lock.json`, and the exact set it writes depends on **both
the OS/CPU and the npm version** that generated the file.

A lockfile generated on macOS (npm 11) is therefore frequently *out of sync* when
`npm ci` runs on the Linux CI runner (npm 10) — producing errors like:

```
npm error Missing: @emnapi/runtime@1.11.1 from lock file
npm error `npm ci` can only install packages when your package.json and
          package-lock.json ... are in sync.
```

This is a known cross-platform npm limitation, not a problem with the deps
themselves.

### How CI handles it

The deploy workflow runs `npm ci || npm install`. The fast, reproducible `npm ci`
path is used whenever the committed lockfile is in sync; if it isn't (the situation
above), the build falls back to `npm install`, which regenerates the tree from
`package.json` on the runner. Builds never fail on lockfile drift.

### Regenerating a clean, CI-matching lockfile

When you want to commit a fresh lockfile that matches the CI environment exactly,
generate it inside a Linux container that mirrors the runner (Node 20). This avoids
the macOS/npm-version skew described above:

```bash
docker run --rm -v "$PWD":/app -w /app node:20 \
  bash -c "rm -rf node_modules package-lock.json && npm install"

# verify it satisfies `npm ci` in the same environment:
docker run --rm -v "$PWD":/app -w /app node:20 \
  bash -c "rm -rf node_modules && npm ci && npm run build"
```

The container writes `package-lock.json` back to the working tree; commit it as-is.
Do **not** run `npm install` on macOS afterward — that re-resolves the file with the
host npm version and reintroduces the drift.
