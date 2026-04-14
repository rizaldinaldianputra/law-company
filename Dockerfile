# 1. Base image
FROM node:20-alpine AS base

# 2. Install dependencies stage
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 3. Build stage
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
RUN npm run build

# 4. Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user (best practice)
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy build output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]