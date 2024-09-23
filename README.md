Todo Microservice App

## Overview

This is a **Simple Todo Microservice Application** built using **Node.js** and containerized with **Docker**. The app consists of three microservices:
- **Frontend**: A simple HTML/Node.js frontend served from the `/public` directory.
- **Task Service**: A backend service responsible for managing tasks.
- **User Service**: A backend service responsible for managing users and their authentication.

The application is designed to be scalable and is deployed on AWS using **Kubernetes (EKS)** and **Terraform**. The backend and frontend microservices are containerized and managed with Docker.

## Features

- **Multi-Service Architecture**: Separates frontend and backend into distinct microservices.
- **Kubernetes Deployments**: Deployed on AWS EKS using Kubernetes manifests.
- **Infrastructure as Code**: Uses Terraform to provision infrastructure.
- **Docker**: Each microservice is packaged into a Docker container.
- **CI/CD Pipeline**: Supports local development with Docker Compose and can be integrated with CI/CD pipelines for automated deployments.

## Tech Stack

- **Frontend**: HTML, Node.js
- **Backend**: Node.js, Express
- **Containerization**: Docker
- **Orchestration**: Kubernetes (EKS)
- **Infrastructure as Code**: Terraform
- **Cloud Provider**: AWS

## Directory Structure

```
/todo-microservice-app/
├─ /public/                # Frontend microservice (public-facing)
│   ├─ Dockerfile
│   ├─ index.html
│   └─ server.js
├─ /task/                  # Task service microservice (backend service)
│   ├─ Dockerfile
│   └─ taskService.js
├─ /user/                  # User service microservice (backend service)
│   ├─ Dockerfile
│   └─ userService.js
├─ /infrastructure/        # Infrastructure files for deployment
│   ├─ /k8s/               # Kubernetes deployment and service manifests
│   │   ├─ html-deployment.yaml
│   │   ├─ task-deployment.yaml
│   │   ├─ user-deployment.yaml
│   │   ├─ html-service.yaml
│   │   ├─ task-service.yaml
│   │   └─ user-service.yaml
│   ├─ /terraform/         # Terraform configuration for AWS
│   │   ├─ main.tf
│   │   └─ app-secret.yaml
├─ /config/                # Environment variables and scripts
│   ├─ .env                # Environment variables
│   ├─ service-urls.sh     # Bash script for service URLs
├─ /ci-cd/                 # CI/CD and Docker Compose files
│   └─ docker-compose.yml  # Local development with Docker Compose
├─ .gitignore              # Git ignore file
├─ package.json
├─ package-lock.json
```