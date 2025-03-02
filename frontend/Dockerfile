# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:18
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY package*.json ./
RUN npm install --production --legacy-peer-deps
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]