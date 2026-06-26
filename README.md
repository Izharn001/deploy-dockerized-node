# Dockerized Node.js Application with Automated CI/CD Deployment

## Project Overview

This project demonstrates how to build, containerize and automatically deploy a Node.js application to an AWS EC2 instance using Docker, Docker Hub and GitHub Actions.

The application consists of a simple Express.js web server with two routes:

* `/` – Returns a basic "Hello World" response.
* `/secret` – Protected using HTTP Basic Authentication. Valid credentials return a secret message stored in environment variables.

The project was created to gain hands-on experience with modern DevOps practices including containerization, continuous integration, continuous deployment, secrets management and cloud infrastructure.

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

---

# Architecture

```
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
Build Docker Image
    │
    ▼
Push Image to Docker Hub
    │
    ▼
SSH into EC2
    │
    ▼
Pull Latest Docker Image
    │
    ▼
Replace Existing Container
    │
    ▼
Deploy Updated Application
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

---

# Project Structure

```
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
└── README.md
```

---

# Docker

The application is packaged using Docker.

The Docker image is built from the project source and pushed to Docker Hub during every deployment.

The container exposes port **3000**, which is mapped to port **80** on the EC2 instance.

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

---

# Secrets Management

Sensitive information is not stored within the repository or Docker image.

GitHub Secrets are used to securely inject:

* Docker Hub credentials
* EC2 SSH private key
* EC2 host address
* Basic Authentication username
* Basic Authentication password
* Secret application message

This approach prevents credentials from being committed to source control and follows secure deployment practices.

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

```
USERNAME=admin
PASSWORD=password123
SECRET_MESSAGE=Your secret message
```

Start the application:

```bash
node index.js
```

Visit:

```
http://localhost:3000
```

Protected endpoint:

```
http://localhost:3000/secret
```

---

# Docker Commands

Build the image:

```bash
docker build -t deploy-dockerized-node .
```

Run the container:

```bash
docker run -d -p 3000:3000 \
-e USERNAME=admin \
-e PASSWORD=password123 \
-e SECRET_MESSAGE="Hello World" \
deploy-dockerized-node
```

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
* Debugging deployment issues

---

# Future Improvements

* Deploy using Docker Compose
* Add automated testing before deployment
* Implement HTTPS using Nginx and Let's Encrypt
* Deploy behind a reverse proxy
* Add health checks
* Introduce container version tagging
* Deploy using Amazon ECR instead of Docker Hub
* Provision infrastructure using Terraform

---

# Author

**Izharn Mohammed**

GitHub: https://github.com/Izharn001
