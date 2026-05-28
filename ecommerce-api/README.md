# E-Commerce API (Golang)

A production-style E-Commerce Backend API built using Golang, Gin Framework, MySQL, Redis, Kafka, JWT Authentication, RBAC, and Swagger/OpenAPI3.

---

# Features

* JWT Authentication
* Role-Based Access Control (RBAC)
* Admin & User APIs
* Product CRUD APIs
* Order Management
* Inventory Management
* Redis Caching
* Kafka Integration
* Swagger/OpenAPI3 Documentation
* Centralized Logging
* MySQL Database Integration
* DB Transactions
* Secure Password Hashing using bcrypt

---

# Tech Stack

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| Golang           | Backend Development          |
| Gin              | HTTP Web Framework           |
| MySQL            | Relational Database          |
| Redis            | Caching & Token Blacklisting |
| Kafka            | Event Streaming              |
| Swagger/OpenAPI3 | API Documentation            |
| JWT              | Authentication               |
| bcrypt           | Password Hashing             |
| Docker           | Containerization             |

---

# Project Structure

```bash
.
├── cmd/
│   └── main.go
│
├── config/
│   ├── db.go
│   ├── redis.go
│   ├── kafka.go
│   └── config.go
│
├── docs/
│
├── internal/
│   ├── handlers/
│   ├── middleware/
│   ├── models/
│   ├── repository/
│   ├── logger/
│   └── kafka/
│
├── .env
├── docker-compose.yml
├── go.mod
└── README.md
```

---

# API Features

## Authentication APIs

### Signup

```http
POST /api/v1/auth/signup
```

### Login

```http
POST /api/v1/auth/login
```

### Logout

```http
POST /api/v1/auth/logout
```

---

## Product APIs

### Get All Products

```http
GET /api/v1/products
```

### Get Product By ID

```http
GET /api/v1/products/{id}
```

---

## Admin Product APIs

### Create Product

```http
POST /api/v1/admin/products
```

### Update Product

```http
PUT /api/v1/admin/products/{id}
```

### Delete Product

```http
DELETE /api/v1/admin/products/{id}
```

---

## Order APIs

### Create Order

```http
POST /api/v1/user/orders
```

### Get My Orders

```http
GET /api/v1/user/orders
```

### Get My Order By ID

```http
GET /api/v1/user/orders/{id}
```

---

# Authentication & Authorization

This project uses JWT-based authentication.

## Roles

* Admin
* User

## Protected APIs

Admin routes are protected using:

* JWT Middleware
* Admin Role Middleware

---

# Redis Features

Redis is used for:

* Product caching
* JWT token blacklist (Logout)

## Cache Flow

```text
Request
   ↓
Check Redis Cache
   ↓
Cache Hit → Return Redis Data
Cache Miss → Fetch MySQL Data
```

---

# Kafka Integration

Kafka is used for event-driven order processing.

## Flow

```text
Create Order
      ↓
Kafka Producer
      ↓
Kafka Topic
      ↓
Kafka Consumer
      ↓
Process Order Event
```

---

# Inventory Management

When order is placed:

* Product stock is validated
* Stock is reduced automatically
* Order is created using DB transactions

---

# Database Transactions

Implemented transactions to maintain data consistency.

## Flow

```text
Begin Transaction
      ↓
Check Stock
      ↓
Reduce Stock
      ↓
Create Order
      ↓
Commit Transaction
```

Rollback occurs automatically if any step fails.

---

# Swagger/OpenAPI3

Swagger documentation integrated using:

* swaggo/swag
* gin-swagger

## Swagger URL

```text
http://localhost:8080/swagger/index.html
```

## Generate Swagger Docs

```bash
swag init -g cmd/main.go -d cmd,internal,config
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce

JWT_SECRET=your_secret_key

REDIS_ADDR=localhost:6379

KAFKA_BROKER=localhost:9092
```

---

# Installation & Setup

## Clone Repository

```bash
git clone <your-github-repo>
cd ecommerce-api
```

---

## Install Dependencies

```bash
go mod tidy
```

---

## Run MySQL

Create required database and tables.

---

## Run Redis

```bash
docker run -d -p 6379:6379 redis
```

---

## Run Kafka & Zookeeper

```bash
docker compose up -d
```

---

## Run Server

```bash
go run cmd/main.go
```

---

# Logging

Centralized logging implemented.

## Log Levels

* INFO
* WARN
* ERROR
* DEBUG

Example:

```text
[INFO] Login successful
[WARN] Invalid token
[ERROR] Failed to create product
```

---

# Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Role-Based Authorization
* Token Blacklisting
* Protected Admin APIs

---

# Future Enhancements

* Cart APIs
* Pagination
* Search & Filtering
* Product Reviews
* Payment Integration
* Rate Limiting
* File Upload
* Refresh Token System
* Dockerized Application
* Unit Testing

---

# Learning Outcomes

This project helped in learning:

* REST API Development
* Backend Architecture
* JWT Authentication
* Role-Based Access Control
* Redis Caching
* Kafka Messaging
* DB Transactions
* Swagger/OpenAPI3
* Middleware
* Logging Systems
* Inventory Management

---

# Author

Sumit Dhamane

* Golang Backend Developer
