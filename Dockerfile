FROM oven/bun:1.0-slim

WORKDIR /app

COPY src src
COPY static static
COPY package.json .
COPY bun.lockb .
COPY vite.config.ts .
COPY svelte.config.js .

# HACK so that `bun install` doesn't fail due to `packages` not being copied (we don't need it)
RUN apt-get update && apt-get install -y jq
RUN jq 'del(.workspaces)' package.json > temp.json && mv temp.json package.json

RUN bun install
RUN bun run build

CMD ["bun", "build/index.js"]