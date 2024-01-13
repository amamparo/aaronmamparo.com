FROM oven/bun:1.0-slim AS build
WORKDIR /tmp

COPY indexBlog.ts .
COPY package.json .
COPY bun.lockb .

RUN bun install # TODO: use --production flag (it currently doesn't seem to work 😢)
RUN bun build --compile indexBlog.ts --outfile indexBlog


FROM public.ecr.aws/lambda/provided:al2

COPY bootstrap ${LAMBDA_RUNTIME_DIR}
COPY function.sh ${LAMBDA_TASK_ROOT}

COPY --from=build /tmp/indexBlog ${LAMBDA_TASK_ROOT}

RUN chmod 755 ${LAMBDA_RUNTIME_DIR}/bootstrap ${LAMBDA_TASK_ROOT}/function.sh

WORKDIR ${LAMBDA_TASK_ROOT}
CMD ["function.handler"]
