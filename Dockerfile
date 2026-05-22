# Dockerfile for AIOS Observability (ai-os-profile + SQLite)

FROM node:20-alpine

# Install SQLite (better-sqlite3 requires it)
RUN apk add --no-cache \
    sqlite \
    python3 \
    make \
    g++

WORKDIR /app

# Enable pnpm via Corepack (bundled with the Node image)
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build Next.js app
RUN pnpm build

# Prune devDependencies after build (optimize image size)
RUN pnpm prune --prod

# Create data directory for SQLite
RUN mkdir -p /data

# Environment variables
ENV NODE_ENV=production
ENV DATABASE_PATH=/data/observability.db
ENV PORT=3000

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["pnpm", "start"]
