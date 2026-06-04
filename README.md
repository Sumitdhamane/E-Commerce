# E-Commerce Full Stack Application

A production-ready full-stack E-Commerce platform built with Go (Golang) and React. The application provides secure authentication, product management, cart functionality, order processing, and an admin dashboard. The entire system is containerized using Docker and Docker Compose.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* React Router DOM
* TanStack Query
* Axios
* Context API
* Tailwind CSS

## Backend

* Golang
* Gin Framework
* REST APIs
* JWT Authentication
* Middleware
* Repository Pattern

## Database & Messaging

* MySQL
* Redis
* Apache Kafka
* Zookeeper

## DevOps

* Docker
* Docker Compose

---

# Features

## User Features

* User Registration & Login
* JWT Authentication
* Browse Products
* View Product Details
* Add Products to Cart
* Checkout & Place Orders
* Order History

## Admin Features

* Admin Dashboard
* Product Management
* Create Product
* Update Product
* Delete Product
* Order Management
* Dashboard Statistics

---

# Architecture

```text
Docker
├── ecommerce-ui       (React + TypeScript)
├── ecommerce-api      (Go + Gin)
├── ecommerce-mysql    (MySQL)
├── redis              (Caching)
├── kafka              (Messaging)
└── zookeeper          (Kafka Coordination)
```

---

# Frontend Structure

```bash
ecommerce-ui/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── types/
│   └── main.tsx
```

---

# Backend Structure

```bash
ecommerce-api/
├── cmd/
├── config/
├── internal/
├── middleware/
├── repository/
├── services/
├── docs/
└── docker-compose.yml
```

---

# API Modules

* Authentication APIs
* Product APIs
* Cart APIs
* Order APIs
* Admin APIs
* Dashboard APIs

---

# Pages

## User

* Home
* Products
* Product Details
* Cart
* Orders
* Login
* Signup

## Admin

* Dashboard
* Product Management
* Order Management
* Edit Product
* Create Product

---

# Local Development

## Clone Repository

```bash
git clone https://github.com/Sumitdhamane/E-Commerce.git

cd E-Commerce
```

---

## Frontend

```bash
cd ecommerce-ui

npm install

npm run dev
```

Runs at:

```bash
http://localhost:5173
```

---

## Backend

```bash
cd ecommerce-api

go mod tidy

go run ./cmd
```

Runs at:

```bash
http://localhost:8080
```

---

# Docker Setup

## Start Complete Application

```bash
docker compose up --build
```

## Run in Background

```bash
docker compose up -d
```

## Stop Containers

```bash
docker compose down
```

---

# Environment Variables

```env
PORT=8080

DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=ecommerce

JWT_SECRET=your_secret_key

REDIS_ADDR=redis:6379

KAFKA_BROKER=kafka:9092
```

---

# API Documentation

Swagger UI:

```bash
http://localhost:8080/swagger/index.html
```

---

# Future Enhancements

* Payment Gateway Integration
* Wishlist System
* Product Reviews & Ratings
* Product Search & Filters
* Image Upload Support
* Email Notifications
* Kubernetes Deployment
* CI/CD Pipeline

---

# Learning Outcomes

This project provided hands-on experience with:

* Full Stack Development
* REST API Design
* JWT Authentication
* React State Management
* Docker & Containerization
* Redis Caching
* Kafka Messaging
* MySQL Database Design
* Admin Authorization
* Protected Routes
* Production Deployment Concepts

---

# Author

**Sumit Dhamane**
