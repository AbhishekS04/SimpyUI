# Dockerfile for SimpyUI (React, Node.js, cross-platform)
# Use official Node.js LTS image for stability and cross-OS compatibility
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file for stable dependency install
COPY package.json package-lock.json* ./

# Install dependencies (npm ci uses lock file for reproducibility)
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Expose the default Vite port
EXPOSE 3000

# Start the dev server (change to 'npm run build && npm run preview' for production)
CMD ["npm", "run", "dev"]
