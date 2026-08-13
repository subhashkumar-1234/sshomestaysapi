const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SSHomestays REST API Documentation",
      version: "1.0.0",
      description:
        "Official API documentation and testing interface for SSHomestays Real Estate & Homestays Backend.",
      contact: {
        name: "SS Homestays Team",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
      {
        url: "https://sshomestays-api.onrender.com",
        description: "Production Render Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
      schemas: {
        UserRegister: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "Password123" },
          },
        },
        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "Password123" },
          },
        },
        FacilityInput: {
          type: "object",
          required: ["name", "appId"],
          properties: {
            appId: { type: "integer", example: 101 },
            name: { type: "string", example: "Infinity Swimming Pool" },
            iconName: { type: "string", example: "Waves" },
            description: { type: "string", example: "Temperature controlled pool with mountain view" },
            status: { type: "string", enum: ["active", "inactive"], example: "active" },
          },
        },
        DiscoverVillaInput: {
          type: "object",
          required: ["title", "appId"],
          properties: {
            appId: { type: "integer", example: 101 },
            title: { type: "string", example: "Luxury Beachfront Villa" },
            subtitle: { type: "string", example: "Private beach access & pool" },
            badge: { type: "string", example: "Popular" },
            iconName: { type: "string", example: "Sparkles" },
            location: { type: "string", example: "Goa, India" },
            price: { type: "number", example: 15000 },
            rating: { type: "number", example: 4.9 },
            reviewsCount: { type: "integer", example: 48 },
            features: {
              type: "array",
              items: { type: "string" },
              example: ["4 Bedrooms", "Private Pool", "Free WiFi"],
            },
          },
        },
      },
    },
    paths: {
      "/": {
        get: {
          summary: "API Health Check",
          description: "Check if the SSHomestays API server is running.",
          tags: ["Health Check"],
          responses: {
            200: {
              description: "API is operational",
            },
          },
        },
      },
      "/api/users/register": {
        post: {
          summary: "Register a new user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserRegister" },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { description: "Validation error or User already exists" },
          },
        },
      },
      "/api/users/login": {
        post: {
          summary: "User Login",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserLogin" },
              },
            },
          },
          responses: {
            200: { description: "Login successful with JWT token" },
            401: { description: "Invalid credentials" },
          },
        },
      },
      "/api/users/profile": {
        get: {
          summary: "Get current user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "User profile data" },
            401: { description: "Unauthorized" },
          },
        },
        put: {
          summary: "Update current user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Profile updated successfully" },
            401: { description: "Unauthorized" },
          },
        },
      },
      "/api/facilities": {
        get: {
          summary: "Get all facilities",
          tags: ["Facilities"],
          responses: {
            200: { description: "List of all facilities" },
          },
        },
        post: {
          summary: "Create a new facility",
          tags: ["Facilities"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FacilityInput" },
              },
            },
          },
          responses: {
            201: { description: "Facility created" },
          },
        },
      },
      "/api/facilities/app/{appId}": {
        get: {
          summary: "Get facilities by App ID",
          tags: ["Facilities"],
          parameters: [
            {
              name: "appId",
              in: "path",
              required: true,
              schema: { type: "integer", default: 101 },
            },
          ],
          responses: {
            200: { description: "List of facilities for App ID" },
          },
        },
      },
      "/api/facilities/{id}": {
        get: {
          summary: "Get facility by ID",
          tags: ["Facilities"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Facility details" },
            404: { description: "Facility not found" },
          },
        },
        put: {
          summary: "Update facility by ID",
          tags: ["Facilities"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FacilityInput" },
              },
            },
          },
          responses: {
            200: { description: "Facility updated" },
          },
        },
        delete: {
          summary: "Delete facility by ID",
          tags: ["Facilities"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Facility deleted" },
          },
        },
      },
      "/api/discover-villas": {
        get: {
          summary: "Get all discover villas",
          tags: ["Discover Villas"],
          responses: {
            200: { description: "List of all discover villas" },
          },
        },
        post: {
          summary: "Create a new discover villa",
          tags: ["Discover Villas"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DiscoverVillaInput" },
              },
            },
          },
          responses: {
            201: { description: "Discover villa created" },
          },
        },
      },
      "/api/discover-villas/app/{appId}": {
        get: {
          summary: "Get discover villas by App ID",
          tags: ["Discover Villas"],
          parameters: [
            {
              name: "appId",
              in: "path",
              required: true,
              schema: { type: "integer", default: 101 },
            },
          ],
          responses: {
            200: { description: "List of discover villas for App ID" },
          },
        },
      },
      "/api/discover-villas/{id}": {
        get: {
          summary: "Get discover villa by ID",
          tags: ["Discover Villas"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Villa details" },
            404: { description: "Villa not found" },
          },
        },
        put: {
          summary: "Update discover villa by ID",
          tags: ["Discover Villas"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DiscoverVillaInput" },
              },
            },
          },
          responses: {
            200: { description: "Villa updated" },
          },
        },
        delete: {
          summary: "Delete discover villa by ID",
          tags: ["Discover Villas"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Villa deleted" },
          },
        },
      },
      "/api/upload": {
        post: {
          summary: "Upload image file to AWS S3",
          tags: ["Upload"],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    image: {
                      type: "string",
                      format: "binary",
                      description: "Image file to upload",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "File uploaded successfully to S3" },
          },
        },
        delete: {
          summary: "Delete file from AWS S3",
          tags: ["Upload"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    key: { type: "string", example: "uploads/1723500000000-image.jpg" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "File deleted successfully" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "SSHomestays API Documentation",
      customCss: ".swagger-ui .topbar { display: none }",
    })
  );
};

module.exports = setupSwagger;
