FROM node:lts-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /apps/front

COPY package.json ./
RUN npm install

FROM base AS builder
WORKDIR /apps/front

COPY --from=deps /apps/front/node_modules ./node_modules
COPY . . 

RUN npm run build

FROM base AS runner
WORKDIR /apps/front

RUN addgroup --system front && adduser --system -G front front

COPY --from=builder /apps/front/public ./public

RUN mkdir .next
RUN chown front:front .next

COPY --from=builder --chown=front:front /apps/front/.next/standalone ./
COPY --from=builder --chown=front:front /apps/front/.next/static ./.next/static

USER front

CMD ["node", "server.js"]