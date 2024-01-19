FROM node:18-alpine AS base

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

FROM base AS builder
WORKDIR /app

COPY --from=installer /app/package.json .
COPY --from=installer /app/node_modules ./node_modules

COPY .env* .eslintrc.js .prettierrc.js nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src
COPY libs ./libs

RUN yarn build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV production
ENV PORT 4000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

USER nestjs

EXPOSE ${PORT}

CMD ["yarn", "start:prod"]

