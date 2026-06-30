# Dockerized Node.js Application with Automated CI/CD Deployment & Monitoring

## Project Overview

This project demonstrates how to build, containerize, monitor and automatically deploy a Node.js application to an AWS EC2 instance using Docker, Docker Hub, GitHub Actions, Prometheus and Grafana.

The application consists of a simple Express.js web server with three routes:

* `/` – Returns a basic **"Hello World"** response.
* `/secret` – Protected using HTTP Basic Authentication. Valid credentials return a secret message stored in environment variables.
* `/metrics` – Exposes Prometheus application metrics for monitoring.

The project was created to gain hands-on experience with modern DevOps practices including containerization, continuous integration, continuous deployment, monitoring, observability, secrets management and cloud infrastructure.

---

# Technologies Used

* Node.js
* Express.js
* Docker
* Docker Hub
* Git & GitHub
* GitHub Actions
* AWS EC2 (Amazon Linux 2023)
* Linux
* SSH
* Prometheus
* Grafana
* Node Exporter
* prom-client

---

# Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Build Docker Image
    ├── Push Image to Docker Hub
    └── Deploy to AWS EC2
             │
             ▼
      Docker Container
             │
     ┌───────┴────────┐
     │                │
     ▼                ▼
 Node.js App     Node Exporter
     │                │
     └────────┬───────┘
              ▼
         Prometheus
              ▼
           Grafana
```

---

# Features

* Express.js web application
* HTTP Basic Authentication
* Environment variable configuration
* Docker containerization
* Docker Hub image registry
* Automated deployment with GitHub Actions
* Secure secret management using GitHub Secrets
* Automatic replacement of existing containers during deployment
* Prometheus application metrics endpoint
* Infrastructure monitoring using Node Exporter
* Application monitoring using Prometheus
* Grafana dashboards for infrastructure and application metrics
* Automated deployment to the Docker monitoring network

---

# Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .dockerignore
├── .gitignore
├── Dockerfile
├── index.js
├── package.json
├── package-lock.json
├── prometheus.yml
└── README.md
```

---

# Docker

The application is packaged using Docker.

The Docker image is built from the project source and pushed to Docker Hub during every deployment.

The container exposes port **3000**, which is mapped to port **80** on the EC2 instance.

The deployment workflow automatically deploys the application onto the Docker monitoring network, allowing Prometheus to scrape application metrics without any manual configuration.

---

# Monitoring & Observability

The project includes a complete monitoring stack using Prometheus and Grafana to monitor both the server infrastructure and the Node.js application.

## Infrastructure Monitoring

Node Exporter collects Linux system metrics including:

* CPU utilisation
* Memory usage
* Disk usage
* Network traffic

Prometheus scrapes these metrics and stores them as time-series data.

Grafana visualises these metrics using dashboards.

## Application Monitoring

The Express application exposes a `/metrics` endpoint using the **prom-client** library.

Prometheus scrapes this endpoint to collect application metrics.

Current metrics include:

* `http_requests_total`
* Node.js process metrics
* Process CPU usage
* Process memory usage
* Event loop metrics
* Node.js runtime metrics

Grafana visualises both infrastructure and application metrics through dedicated dashboards.

---

# CI/CD Pipeline

Every push to the repository automatically triggers GitHub Actions.

The workflow performs the following steps:

1. Checkout the repository.
2. Authenticate with Docker Hub.
3. Build the Docker image.
4. Push the latest image to Docker Hub.
5. Connect to the EC2 instance using SSH.
6. Pull the latest Docker image.
7. Stop and remove the previous container.
8. Deploy the updated container.
9. Attach the application container to the Docker monitoring network.
10. Start the updated application.

---

# Secrets Management

Sensitive information is never stored within the repository or Docker image.

GitHub Secrets are used to securely inject:

* Docker Hub username
* Docker Hub access token
* EC2 SSH private key
* EC2 host address
* Basic Authentication username
* Basic Authentication password
* Secret application message

This approach prevents credentials from being committed to source control and follows secure deployment best practices.

---

# Running Locally

Clone the repository:

```bash
git clone https://github.com/Izharn001/deploy-dockerized-node.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```text
USERNAME=admin
PASSWORD=password123
SECRET_MESSAGE=Your secret message
```

Start the application:

```bash
node index.js
```

Visit:

```text
http://localhost:3000
```

Protected endpoint:

```text
http://localhost:3000/secret
```

Prometheus metrics endpoint:

```text
http://localhost:3000/metrics
```

---

# Docker Commands

Build the image:

```bash
docker build -t deploy-dockerized-node .
```

Run the container:

```bash
docker run -d \
--network monitoring \
-p 3000:3000 \
-e USERNAME=admin \
-e PASSWORD=password123 \
-e SECRET_MESSAGE="Hello World" \
deploy-dockerized-node
```

---

# Skills Demonstrated

* Docker containerization
* Docker networking
* Git & GitHub
* GitHub Actions CI/CD
* Docker Hub image management
* AWS EC2 administration
* Linux server management
* SSH authentication
* Environment variable management
* Secure secrets management
* Infrastructure monitoring
* Application monitoring
* Prometheus configuration
* Grafana dashboard configuration
* Express.js development
* Troubleshooting deployment and networking issues

---

# Lessons Learned

This project strengthened my understanding of:

* Docker image creation
* Docker Hub repositories
* Container deployment
* GitHub Actions workflows
* Secure secret management
* SSH automation
* Linux server administration
* AWS EC2 deployments
* CI/CD pipeline design
* Docker networking
* Prometheus monitoring
* Grafana dashboards
* Application observability
* Creating custom Prometheus metrics
* Debugging deployment and networking issues

---

# Future Improvements

* Add Prometheus alerting rules
* Configure Alertmanager
* Add custom metric labels
* Monitor request latency
* Track failed authentication attempts
* Integrate Loki for log aggregation
* Build custom Grafana dashboards
* Deploy using Docker Compose
* Provision infrastructure using Terraform
* Deploy the monitoring stack using Kubernetes

---
