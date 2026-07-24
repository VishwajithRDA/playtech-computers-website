# 🔧 Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 🚀 Run Stage
FROM node:20-alpine
WORKDIR /app

# Copy built app
COPY --from=builder /app ./

# Ensure a writable cache location for ISR/prerender at runtime
ENV NEXT_CACHE_DIR=/tmp/next-cache

# (Optional) run as non-root for better security
RUN addgroup -S app && adduser -S app -G app \
  && mkdir -p /tmp/next-cache \
  && chown -R app:app /app /tmp/next-cache
USER app

# Next.js default is 3000; map host 8001->3000 like you already do
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
