# Use Node LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Set environment variables defaults
ENV PORT=5000
ENV NODE_ENV=production

# Production-ready startup command
CMD ["node", "server.js"]
