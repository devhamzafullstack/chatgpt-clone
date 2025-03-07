FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Create a non-root user and switch to it
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Create logs directory and set permissions
RUN mkdir -p logs && chown -R nodejs:nodejs logs

# Change to non-root user
USER nodejs

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]