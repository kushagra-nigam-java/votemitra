# Use the official lightweight Node.js 20 image
FROM node:20-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy local code to the container image
COPY . .

# Cloud Run sets the PORT environment variable
# Expose port 8080 to be safe, but it defaults to 8080 in server.js anyway
EXPOSE 8080

# Run the web service on container startup
CMD [ "npm", "start" ]
