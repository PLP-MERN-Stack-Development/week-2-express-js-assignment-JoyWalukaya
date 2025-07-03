
# 🛠️ Express.js RESTful API - Week 2 Assignment

This project is a RESTful API built using Express.js. It allows CRUD operations on a product resource and includes middleware, error handling, filtering, pagination, and search.

---

## 🚀 How to Run

### 📦 Installation

```bash
npm install
````

### ▶️ Start the Server

```bash
npm run dev
```

---

## 📁 API Endpoints

| Method | Endpoint                           | Description                                        |
| ------ | ---------------------------------- | -------------------------------------------------- |
| GET    | `/api/products`                    | List all products (supports filtering, pagination) |
| GET    | `/api/products/:id`                | Get a product by ID                                |
| POST   | `/api/products`                    | Create a new product                               |
| PUT    | `/api/products/:id`                | Update a product                                   |
| DELETE | `/api/products/:id`                | Delete a product                                   |
| GET    | `/api/products/search?search=term` | Search products by name                            |
| GET    | `/api/products/stats`              | Get product statistics by category                 |

---

## 🔐 API Key Authentication

All protected routes require an API key in the header:

```
Key: x-api-key
Value: 12345
```

---

## 🔎 Middleware Used

* **Logger** – logs method, URL, and timestamp
* **Authentication** – checks for `x-api-key` in headers
* **Validation** – validates request body for POST & PUT
* **Global Error Handler** – handles any thrown errors

---

## 📄 Required Environment Variables

See `.env.example` for required variables:

```
PORT=3000
API_KEY=12345
```

---

## 📦 Project Structure

├── errors/
│   ├── NotFoundErrors.js
│   ├── ValidationError.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validator.js
├── package-lock.json
├──package.json
├── server.js
├── .env.example
├── README.md
```

---

## 📬 Sample POST Body (JSON)

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic and battery-powered",
  "price": 25.99,
  "category": "electronics",
  "inStock": true
}
```

---

## 🧪 Test With Postman

Use Postman to:

* Test all endpoints
* Use `x-api-key` in headers
* Send JSON in raw body (POST/PUT)

