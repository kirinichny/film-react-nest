# ----------------------------
# Стадия сборки
# ----------------------------
FROM node:20-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=optional

COPY . .

ARG VITE_API_URL=/api/afisha
ARG VITE_CDN_URL=/content/afisha
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

RUN ROLLUP_VERSION=$(node -p "require('./node_modules/rollup/package.json').version") \
  && npm i --no-save @rollup/rollup-linux-x64-gnu@${ROLLUP_VERSION}

RUN npm run build

# ----------------------------
# Стадия "раздачи"
# ----------------------------
FROM alpine:3.20 AS runner
WORKDIR /app

COPY --from=build /app/dist ./dist

CMD ["sh", "-c", "mkdir -p /shared && cp -r /app/dist/. /shared/ && echo 'Фронтенд собран и скопирован в volume.' && sleep infinity"]
