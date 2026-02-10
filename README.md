# 📦 Product & Production Management System

Fullstack application for managing **products**, **raw materials**, and **production capacity**, calculating how many units can be produced based on available inventory and product value priority.

Built with **Java (REST API)** on the backend and **React + TypeScript** on the frontend.

---

## 🚀 Features

- Product management (CRUD)
- Raw material inventory control
- Product ↔ Raw material association
- Intelligent production calculation
- Frontend filtering and search (client-side)
- Clean REST API architecture

---

## 🧱 Tech Stack

### Backend
- Java
- JAX-RS (Jakarta)
- JPA / Hibernate (Panache)
- RESTful API

### Frontend
- React
- TypeScript
- Vite
- React Query
- Axios
- Tailwind CSS

---

## 🔌 Backend Setup

### Environment Variables

Create a `.env` or `application.properties` file (depending on your setup) with your database configuration:

``` properties
DB_HOST=localhost
DB_PORT=5432
DB_NAME=products_db
DB_USER=postgres
DB_PASSWORD=postgres
```

### Example for Quarkus / application.properties:

```quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=${DB_USER}
quarkus.datasource.password=${DB_PASSWORD}
quarkus.datasource.jdbc.url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
quarkus.hibernate-orm.database.generation=update
```

---

### Database
- Any relational database supported by JPA can be used
- Recommended: PostgreSQL
- Tables are automatically created via JPA on startup

---

### Running Backend
`./mvnw clean install`
`./mvnw quarkus:dev`

Backend will be available at:
`http://localhost:8080`

---

## 🌐 Frontend Setup

### Environment Variables

Create a `.env` file in the frontend root:

`VITE_API_URL=http://localhost:8080`


This value is used by Axios to connect to the backend.

### Running Frontend
- `npm install`
- `npm run dev`

Frontend will be available at:

`http://localhost:5173`

---

## 🔁 API Overview

```Products

GET    /products
GET    /products/{id}
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

---

```Raw Materials
GET    /raw-materials
POST   /raw-materials
PUT    /raw-materials/{id}
DELETE /raw-materials/{id}
```

---

```Product ↔ Raw Material Association
GET    /products/{productId}/raw-materials
POST   /products/{productId}/raw-materials
DELETE /products/{productId}/raw-materials/{id}
```

---

### Payload example:

```{
  "rawMaterialId": 1,
  "requiredQuantity": 2.5
}
```

---

### Production

```GET /production
```

Response example:

```[
  {
    "productId": 1,
    "productName": "Product A",
    "quantityProduced": 10,
    "totalValue": 5000
  }
]
```

---

## 🧠 Production Logic Summary

- Products are processed by descending price
- Available raw material stock is shared across products
- Stock is deducted as production is calculated
- Maximizes total production value

---

### 🧪 Notes

- Filtering, searching and stats are handled on the frontend
- Backend focuses on business rules and data consistency
- Strong typing ensures frontend ↔ backend contract safety