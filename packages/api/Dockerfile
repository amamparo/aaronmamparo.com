FROM oven/bun:1 AS build
WORKDIR /tmp

ARG HANDLER_FILE

COPY src ./src
COPY package.json .
COPY bun.lockb .

RUN bun install # TODO: use --production flag (it currently doesn't seem to work 😢)
RUN bun build --compile "${HANDLER_FILE}" --outfile bun_executable


FROM public.ecr.aws/lambda/provided:al2

COPY lambda/bootstrap ${LAMBDA_RUNTIME_DIR}
COPY lambda/function.sh ${LAMBDA_TASK_ROOT}

COPY --from=build /tmp/bun_executable ${LAMBDA_TASK_ROOT}

RUN chmod 755 ${LAMBDA_RUNTIME_DIR}/bootstrap ${LAMBDA_TASK_ROOT}/function.sh

WORKDIR ${LAMBDA_TASK_ROOT}
CMD ["function.handler"]
