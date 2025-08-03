FROM node:lts-alpine AS base

FROM base AS deps
WORKDIR /apps/api

COPY package.json ./
RUN npm install

FROM base AS builder
WORKDIR /apps/api

COPY --from=deps /apps/api/node_modules ./node_modules
COPY . . 

RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /apps/api

RUN addgroup --system api && adduser --system -G api api

COPY --from=builder /apps/api/node_modules ./node_modules
COPY --from=builder /apps/api/dist ./dist
COPY --from=builder /apps/api/prisma ./prisma

RUN chown -R api:api ./dist ./prisma

USER api

CMD ["node", "dist/src/main.js"]
