# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Expose port
EXPOSE 5000

# Start backend server
WORKDIR /app/backend
CMD ["npm", "start"]