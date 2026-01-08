# ----------------------------
# Стадия сборки
# ----------------------------
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/. ./
RUN npm run build

# ----------------------------
# Стадия запуска (prod)
# ----------------------------
FROM node:20-alpine AS prod

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/public ./public

EXPOSE 3000
CMD ["node", "dist/main.js"]
