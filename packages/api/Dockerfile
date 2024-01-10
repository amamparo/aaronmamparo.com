FROM oven/bun:1.0-slim

WORKDIR /usr/src/app

COPY src src
COPY package.json .
COPY bun.lockb .
RUN bun install # TODO: use `--production` flag (it's currently blowing up)

USER bun
ENV PORT=3000
EXPOSE $PORT/tcp
ENTRYPOINT [ "bun", "run", "src/main.ts" ]