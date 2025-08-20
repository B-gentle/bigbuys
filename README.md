# bigbuysFoddApp

Lightweight Node.js API for the BigBuys food app — product catalog, authentication, and order management.

## Tech stack
- Node.js, Express
- MongoDB (Mongoose)
- JWT for auth
- dotenv for configuration
- Optional: nodemon, eslint, jest

## Features
- User registration / login (JWT)
- CRUD for products
- Create and manage orders
- Basic validation and error handling
- Pagination and filtering for product lists

## Prerequisites
- Node.js >= 16
- MongoDB URI (Atlas or local)

## Installation
1. Clone repository
2. Install deps
    npm install
3. Create `.env` (see below)
4. Start
    npm run dev
    or
    npm start

## Example .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bigbuys
JWT_SECRET=your_jwt_secret
NODE_ENV=development

## Typical scripts (package.json)
- start — production start (node dist/index.js)
- dev — development (nodemon)
- test — run tests
- lint — run linters
- seed — seed database

## Folder structure (suggested)
- src/
  - controllers/
  - models/
  - routes/
  - middleware/
  - utils/
  - index.js
- tests/
- config/
- .env

## API (examples)
- Auth
  - POST /api/auth/register
     - body: { "name","email","password" }
  - POST /api/auth/login
     - body: { "email","password" }
- Products
  - GET /api/products?page=1&limit=20&search=burger
  - GET /api/products/:id
  - POST /api/products (protected) — body: { "name","price","description","category","stock" }
  - PUT /api/products/:id (protected)
  - DELETE /api/products/:id (protected)
- Orders
  - POST /api/orders (protected) — body: { "items": [{ productId, quantity }], "address" }
  - GET /api/orders/:id (protected, owner/admin)
  - GET /api/orders (admin)

Example curl:
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"pass"}'

curl http://localhost:3000/api/products

## Validation & Errors
- Use centralized error handler middleware
- Return consistent JSON: { success: boolean, data?, error?: { message, code } }

## Testing
- Write unit tests for controllers and utils
- Use integration tests for routes with an in-memory MongoDB (mongodb-memory-server)

## Contributing
- Fork, create branch, open PR
- Follow coding style, add tests for new features

## License
Add a license file (e.g., MIT) and reference it here.

## Contact
Project maintained by the repository owner. Create issues or PRs for improvements.
