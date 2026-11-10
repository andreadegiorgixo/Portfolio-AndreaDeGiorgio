# --- Stage 1: build dell'app React/Vite ---
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Apache + PHP (serve i file statici e contact.php) ---
FROM php:8.3-apache
COPY --from=build /app/dist/ /var/www/html/
EXPOSE 80
