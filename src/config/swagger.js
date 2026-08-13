const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SSHomestays REST API Documentation",
      version: "1.0.0",
      description: "Interactive Swagger Documentation for Facilities and Discover Villas APIs.",
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
    tags: [
      {
        name: "Facilities",
        description: "Endpoints for managing Homestay Facilities",
      },
      {
        name: "Discover Villas",
        description: "Endpoints for managing Discover Villas & Experiences",
      },
    ],
    components: {
      schemas: {
        Facility: {
          type: "object",
          properties: {
            id: { type: "string", example: "fac_1723456789" },
            title: { type: "string", example: "Private Pool" },
            subtitle: { type: "string", example: "Temperature controlled luxury pool" },
            image: { type: "string", example: "https://sshomestays-api.onrender.com/uploads/pool.jpg" },
            iconName: { type: "string", example: "Waves" },
            appId: { type: "integer", example: 101 },
            createdAt: { type: "string", example: "2026-08-13T10:00:00.000Z" },
          },
        },
        FacilityInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", example: "Private Pool" },
            subtitle: { type: "string", example: "Temperature controlled luxury pool" },
            image: { type: "string", example: "https://sshomestays-api.onrender.com/uploads/pool.jpg" },
            iconName: { type: "string", example: "Waves" },
            appId: { type: "integer", example: 101 },
          },
        },
        DiscoverVilla: {
          type: "object",
          properties: {
            id: { type: "string", example: "villa_1723456789" },
            title: { type: "string", example: "Royal Heritage Villa" },
            subtitle: { type: "string", example: "Luxury stay in Udaipur" },
            image: { type: "string", example: "https://sshomestays-api.onrender.com/uploads/villa.jpg" },
            iconName: { type: "string", example: "Sparkles" },
            appId: { type: "integer", example: 101 },
            createdAt: { type: "string", example: "2026-08-13T10:00:00.000Z" },
          },
        },
        DiscoverVillaInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", example: "Royal Heritage Villa" },
            subtitle: { type: "string", example: "Luxury stay in Udaipur" },
            image: { type: "string", example: "https://sshomestays-api.onrender.com/uploads/villa.jpg" },
            iconName: { type: "string", example: "Sparkles" },
            appId: { type: "integer", example: 101 },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operation executed successfully" },
            data: { type: "object" },
          },
        },
      },
    },
    paths: {
      "/api/facilities": {
        get: {
          summary: "Get all facilities",
          tags: ["Facilities"],
          responses: {
            200: {
              description: "List of all facilities",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Facility" },
                      },
                    },
                  },
                },
              },
            },
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
            201: {
              description: "Facility created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                },
              },
            },
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
              description: "Application ID (e.g. 101)",
            },
          ],
          responses: {
            200: { description: "Facilities filtered by App ID" },
          },
        },
      },
      "/api/facilities/{id}": {
        get: {
          summary: "Get facility by ID",
          tags: ["Facilities"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Facility ID",
            },
          ],
          responses: {
            200: { description: "Facility details" },
            404: { description: "Facility not found" },
          },
        },
        put: {
          summary: "Update facility",
          tags: ["Facilities"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
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
            200: { description: "Facility updated successfully" },
          },
        },
        delete: {
          summary: "Delete facility",
          tags: ["Facilities"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Facility deleted successfully" },
          },
        },
      },
      "/api/discover-villas": {
        get: {
          summary: "Get all discover villas",
          tags: ["Discover Villas"],
          responses: {
            200: {
              description: "List of all discover villas",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/DiscoverVilla" },
                      },
                    },
                  },
                },
              },
            },
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
            201: {
              description: "Discover villa created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiResponse" },
                },
              },
            },
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
              description: "Application ID (e.g. 101)",
            },
          ],
          responses: {
            200: { description: "Discover villas filtered by App ID" },
          },
        },
      },
      "/api/discover-villas/{id}": {
        get: {
          summary: "Get discover villa by ID",
          tags: ["Discover Villas"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Discover Villa ID",
            },
          ],
          responses: {
            200: { description: "Discover villa details" },
            404: { description: "Discover villa not found" },
          },
        },
        put: {
          summary: "Update discover villa",
          tags: ["Discover Villas"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
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
            200: { description: "Discover villa updated successfully" },
          },
        },
        delete: {
          summary: "Delete discover villa",
          tags: ["Discover Villas"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Discover villa deleted successfully" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  // Serve OpenAPI JSON spec endpoint
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
