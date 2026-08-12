# SSHomestays REST API (AWS DynamoDB + AWS S3)

RESTful API backend for SSHomestays - Real Estate & Homestays Application built with **Node.js**, **Express**, **AWS DynamoDB** (database storage), and **AWS S3** (media & file storage).

---

## Architecture Overview

- **Database**: AWS DynamoDB (`@aws-sdk/client-dynamodb` & `@aws-sdk/lib-dynamodb`)
- **Media / File Storage**: AWS S3 (`@aws-sdk/client-s3`)
- **Authentication**: JWT & `bcryptjs` password hashing

---

## Project Structure

```
sshomestays-api/
│
├── src/
│   ├── config/
│   │   ├── aws.js            # Central AWS SDK v3 Client (DynamoDB & S3)
│   │   ├── db.js             # AWS DynamoDB connection & table verifier
│   │   └── env.js            # Environment variable configuration
│   │
│   ├── controllers/
│   │   ├── discoverVilla.controller.js # Discover Villa HTTP handlers
│   │   ├── facility.controller.js      # Facility HTTP handlers
│   │   ├── upload.controller.js        # AWS S3 file upload handler
│   │   └── user.controller.js          # User auth & HTTP request handlers
│   │
│   ├── models/
│   │   ├── discoverVilla.model.js      # DynamoDB DiscoverVilla Model
│   │   ├── facility.model.js           # DynamoDB Facility Model
│   │   └── user.model.js               # DynamoDB User Model (bcryptjs)
│   │
│   ├── routes/
│   │   ├── discoverVilla.routes.js     # Discover Villa API endpoints
│   │   ├── facility.routes.js          # Facility API endpoints
│   │   ├── upload.routes.js            # File upload endpoint
│   │   └── user.routes.js              # User auth API endpoints
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js          # JWT authentication middleware
│   │   ├── error.middleware.js         # Global error handling middleware
│   │   └── upload.middleware.js        # S3 Multer memory storage stream
│   │
│   ├── app.js                          # Express application setup
│   └── server.js                       # Server entry point
│
├── .env                                # Environment variables (AWS Credentials)
├── package.json                        # Node.js scripts & dependencies
└── README.md                           # Documentation
```

---

## Environment Variables (`.env`)

```env
PORT=5000
CORS_ORIGIN=http://localhost:5173

# AWS Credentials & Configuration
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=sshomestaybucket-sshome

# DynamoDB Table Names
DYNAMODB_FACILITIES_TABLE=facilities
DYNAMODB_DISCOVER_VILLAS_TABLE=discover_villas
DYNAMODB_USERS_TABLE=users
```

---

## Running the API

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```
