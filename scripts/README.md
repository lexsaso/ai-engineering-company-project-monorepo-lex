# `scripts` folder

This folder contains **helper scripts** for the monorepo: development automation, maintenance utilities, repetitive tasks (setup, lint, migrations, data generation, etc.), and internal tooling.

- **Main purpose**: group support tools that do not belong to a specific app, agent, or pipeline but make the team’s work easier.
- **Recommendation**: document each script (what it does, parameters, requirements, usage examples) and keep them reproducible (and safe) across environments.

> _Spanish version: [README.es.md](./README.es.md)._

## Agent infrastructure checks

From the repository root, install the locked development dependencies with
`npm ci` using Node.js 22.13 or newer, then run:

- `npm run lint`: ESLint for JavaScript/TypeScript and Markdown lint for the
  agent protocol, briefing, memory bank, conventions and workflow skill.
- `npm test`: Node.js tests for the agent documents, local links and YAML skill
  metadata, followed by compile-time tests of the existing shared types.
- `npm run build`: compile the shared TypeScript declarations to `.build/shared/`.

The tests live in `agent-infrastructure.test.mjs` and `shared-types.test.ts`.
These commands do not certify business requirements or nonexistent applications.
Python examples and product frontends/backends have no configured test suites;
add their actual checks to the root runner when those components are implemented.
