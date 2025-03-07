cat > ~/ai-chat-app/frontend/Dockerfile << 'EOL'
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ARG VITE_IMAGE_KIT_ENDPOINT
ARG VITE_IMAGE_KIT_PUBLIC_KEY
ARG VITE_GEMINI_PUBLIC_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_IMAGE_KIT_ENDPOINT=${VITE_IMAGE_KIT_ENDPOINT}
ENV VITE_IMAGE_KIT_PUBLIC_KEY=${VITE_IMAGE_KIT_PUBLIC_KEY}
ENV VITE_GEMINI_PUBLIC_KEY=${VITE_GEMINI_PUBLIC_KEY}
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOL