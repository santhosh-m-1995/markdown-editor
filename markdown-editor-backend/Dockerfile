# Use Node 20 base image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the desired port (adjust if needed)
EXPOSE 5000

# Command to run the application
CMD ["nodemon", "dist/src/Server.js"]
