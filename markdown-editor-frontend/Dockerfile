# Stage 1: Build Stage
FROM node:20-slim AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm config set registry "https://registry.npmjs.org/" && npm install

# Copy the entire application
COPY . .

# Test & Build the React app
RUN npm run test && npm run build

# Stage 2: Production Stage
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy build output from previous stage
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose port 3000
EXPOSE 3000

# Command to run the React app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
