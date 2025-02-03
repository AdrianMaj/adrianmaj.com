FROM node:22-alpine AS base

RUN npm install -g corepack@latest
ENV COREPACK_INTEGRITY_KEYS=0

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

#COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
#RUN if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; else echo "Lockfile not found." && exit 1; fi
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile


FROM base AS builder
WORKDIR /app

ARG PAYLOAD_SECRET=dummy_secret
ARG DATABASE_URI
ENV DATABASE_URI=${DATABASE_URI}
# Don't uncomment- ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

#RUN if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; else echo "Lockfile not found." && exit 1; fi
RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir -p .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app
# RUN chown -R nextjs:nodejs ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
