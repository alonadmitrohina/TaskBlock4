# ----------------------------
# 1. Build stage
# ----------------------------
FROM node:18-alpine as builder
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package.json package-lock.json ./

# Встановлюємо всі залежності (включно з dev для TypeScript)
RUN npm install

# Копіюємо весь код і збираємо TypeScript
COPY . .
RUN npm run build

# ----------------------------
# 2. Production stage
# ----------------------------
FROM node:18-alpine
WORKDIR /app

# Копіюємо тільки production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Копіюємо з build stage згенеровані файли
COPY --from=builder /app/dist ./dist

# Запуск
CMD ["node", "dist/index.js"]
