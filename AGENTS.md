# Our Game Workshop

This repository contains six independent browser games inspired by a child's ideas. Discuss requested changes in clear Chinese. A short spoken idea is an implementation request: make a reasonable bounded change, keep the playable loop, and explain what changed. Ask only when the idea would materially change the intended behavior and cannot be inferred.

## Find the correct game

Read `games.json`. Chinese title -> source directory:
- 鹈鹕骑行 / 骑自行车 / 鹈鹕 -> `games/pelican-pedal`
- 逃离恐龙岛 / 恐龙 -> `games/dinosaur-island`
- 溪流手记 / 小溪 / 筑坝 -> `games/riverkeeper`
- 不许动，盆栽 / 躲猫猫 / 警察找物体 -> `games/midnight-masquerade`
- 白鲨海峡 / 鲨鱼 / 船 / 潜笼 -> `games/shark-sea-survival`
- 伏沙猎手 / 鳄鱼 -> `games/sandjaw`

If no game is named, use the current task's context; otherwise ask which game. Read its README and existing code before modifying it. Preserve authored/procedural art, audio, animation, controls, and victory/failure/restart behavior. No placeholders or unsolicited rewrites. Keep unrelated games unchanged. Mobile usability matters: retain touch controls, and explicitly state if a requested game still needs keyboard/mouse.

## Commands (Node 22.17+)

From the repository root:
```sh
npm ci
npm run setup
npm test -- shark-sea-survival
npm run build
npm run test:site -- shark-sea-survival
npm run dev -- shark-sea-survival
```
Replace the slug for the requested game. Each game retains its own package.json and lockfile. `npm test` runs all rule suites; `npm run build` builds all six with relative resource URLs and assembles `.site`. After an initial all-game build, `npm run build -- <slug>` refreshes that game and reassembles the site using the other existing builds. If a test reports no browser installation, run `npx playwright install --with-deps chromium` (in a restricted environment, use `npx playwright install chromium` and report missing OS libraries). Do not replace actual browser checks with a build-only claim.

The root `scripts/site-smoke.mjs` checks the assembled production site using real input. Game-specific tools/tests are also retained under each game. Use relevant deeper tests when a behavior change requires them. QA helpers are not proof of real touch/GPU/device acceptance; report coverage honestly. `qa/`, `.site/`, `dist/`, and `node_modules/` are generated and untracked. Never commit credentials or browser profiles.

## Publication

Source is public. Changes to `main` automatically run rules, build, and browser smoke checks, then deploy `.site` to GitHub Pages. Pull requests run the same checks but do not publish. Prepare a PR when asked to modify a game; do not claim a live update before it is merged and the Pages workflow succeeds. Do not merge unless the user authorized it. Link the updated game and summarize checks in Chinese. Preserve the dinosaur root URL and gallery `/games/`; other published game paths come from `games.json`. Generated bundles are not checked in and must not be edited.

## Architecture

`gallery/` is the selection/idea-copy page. `scripts/assemble.mjs` copies only game builds, licenses and the gallery into `.site`. The gallery's idea button copies a prompt for a Codex Cloud task; it does not send requests, use an API key, or automatically dispatch coding tasks. Do not add paid APIs unless explicitly requested.

For gameplay, prefer existing modules: game/simulation rules, rendering/world/model modules, UI/input main.ts, audio. Keep rules testable. Do not globally unify six games' dependencies or engines while handling a single-game request.
