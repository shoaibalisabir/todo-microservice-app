# user/Dockerfile

# Use the official Node.js image as the base image
FROM node:20.12.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY user/ .
COPY .env .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD [ "node", "userService.js" ]
