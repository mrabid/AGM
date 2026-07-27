FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js postcss.config.js tailwind.config.js ./
COPY public ./public
COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY scripts/start.mjs ./scripts/start.mjs
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "scripts/start.mjs"]
