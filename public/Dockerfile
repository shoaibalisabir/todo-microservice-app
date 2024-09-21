# Use the official Node.js image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the parent directory
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy server.js and other files from the parent directory
COPY ../public/server.js ./
COPY ../public/. .  

# Expose the port your server will run on
EXPOSE 8080

# Command to run your server
CMD ["node", "server.js"]
