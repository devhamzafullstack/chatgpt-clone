FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
# Hardcode the environment variables
ENV VITE_CLERK_PUBLISHABLE_KEY=pk_test_bWFqb3ItcHl0aG9uLTc5LmNsZXJrLmFjY291bnRzLmRldiQ
ENV VITE_API_URL=http://ec2-35-176-122-105.eu-west-2.compute.amazonaws.com:5000
ENV VITE_IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/zr2thisipb
ENV VITE_IMAGE_KIT_PUBLIC_KEY=public_AxSGJs0eMTOt4JQjJHS/NapJTjc=
ENV VITE_GEMINI_PUBLIC_KEY=AIzaSyA1cNYVIS7P4gckaAktHxhacDbMMr6n7X4
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]