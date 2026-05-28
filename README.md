# E-Commerce Full Stack Application

A modern full-stack E-Commerce application built using Go (Golang) for the backend and React + TypeScript for the frontend.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* React Router DOM
* Context API
* Axios
* CSS

## Backend

* Golang
* Gin Framework
* MySQL
* JWT Authentication
* REST APIs

---

# Features

## User Features

* User Signup & Login
* JWT Authentication
* Product Listing
* Product Details
* Add To Cart
* Order Placement
* Order History

## Admin Features

* Admin Dashboard
* Create Product
* Edit Product
* Delete Product
* Manage Orders
* Product Management

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
├── routes/
├── repository/
├── services/
└── main.go
```

---

# API Features

* Authentication APIs
* Product APIs
* Cart APIs
* Order APIs
* Admin APIs

---

# Frontend Pages

* Home Page
* Products Page
* Product Details
* Login
* Signup
* Cart
* Orders
* Admin Dashboard
* Admin Products
* Admin Orders

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Sumitdhamane/E-Commerce.git
```

---

# Frontend Setup

```bash
cd ecommerce-ui

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd ecommerce-api

go mod tidy

go run main.go
```

Backend runs on:

```bash
http://localhost:8080
```

---

# Environment Variables

Create `.env` file in backend:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=ecommerce
JWT_SECRET=your_secret_key
```

---

# Future Improvements

* Payment Gateway Integration
* Wishlist Feature
* Product Reviews
* Search & Filters
* Responsive Dashboard
* Image Upload
* Deployment

---

# Learning Outcomes

This project helped in understanding:

* Full Stack Development
* REST API Development
* JWT Authentication
* React State Management
* API Integration
* Protected Routes
* Admin Authorization
* Infinite Scroll & Pagination

---

# Author

Sumit Dhamane

Frontend Developer | MERN Stack Developer
