# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Go back to backend
WORKDIR /app/backend

# Expose backend port
EXPOSE 5000

# Start server
CMD ["npm", "start"]