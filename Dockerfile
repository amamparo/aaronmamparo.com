FROM oven/bun:1.0-slim

WORKDIR /app

COPY src src
COPY static static
COPY package.json .
COPY bun.lockb .
COPY vite.config.ts .
COPY svelte.config.js .

RUN bun install
RUN bun run build

CMD ["bun", "build/index.js"]