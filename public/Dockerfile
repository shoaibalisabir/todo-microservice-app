# public/Dockerfile

# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the index.html to the Nginx HTML directory
COPY public/index.html /usr/share/nginx/html/

# Expose the port Nginx is running on
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]