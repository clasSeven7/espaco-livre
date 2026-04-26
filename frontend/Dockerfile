# ---------- BASE ----------
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---------- DEVELOPMENT ----------
FROM base AS development
RUN npm install
EXPOSE 3001
CMD ["npx", "next", "dev", "--turbopack", "-p", "3001"]

# ---------- PRODUCTION ----------
FROM base AS production
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npx", "next", "start", "-p", "3001"]
