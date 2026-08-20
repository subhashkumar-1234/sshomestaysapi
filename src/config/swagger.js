const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SSHomestays REST API Documentation",
      version: "1.0.0",
      description:
        "Comprehensive backend REST API documentation for SSHomestays Real Estate & Homestays Application.",
      contact: {
        name: "SSHomestays Team",
      },
    },
    servers: [
      {
        url: "https://sshomestay.onrender.com",
        description: "Production Server (Render)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT Bearer token to access protected endpoints",
        },
      },
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operation completed successfully" },
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Error description" },
            error: { type: "string", example: "Detailed error message" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "usr_1739847291000" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            role: { type: "string", example: "user" },
            phone: { type: "string", example: "+919876543210" },
            avatar: { type: "string", example: "https://example.com/avatar.jpg" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", format: "password", example: "Password123!" },
            phone: { type: "string", example: "+919876543210" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", format: "password", example: "Password123!" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "User logged in successfully" },
            data: {
              type: "object",
              properties: {
                token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsIn..." },
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        Facility: {
          type: "object",
          properties: {
            id: { type: "string", example: "fac_1739847291000" },
            appId: { type: "string", example: "sshomestays" },
            name: { type: "string", example: "Private Swimming Pool" },
            title: { type: "string", example: "Infinity Pool with Sunset View" },
            description: { type: "string", example: "Temperature controlled luxury swimming pool" },
            icon: { type: "string", example: "waves" },
            category: { type: "string", example: "Outdoor" },
            badge: { type: "string", example: "Popular" },
            price: { type: "number", example: 1500 },
            originalPrice: { type: "number", example: 2000 },
            status: { type: "string", example: "active" },
            isPopular: { type: "boolean", example: true },
            isFeatured: { type: "boolean", example: false },
            images: {
              type: "array",
              items: { type: "string" },
              example: ["https://sshomestaybucket-sshome.s3.eu-north-1.amazonaws.com/uploads/pool.webp"],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        FacilityInput: {
          type: "object",
          required: ["name"],
          properties: {
            appId: { type: "string", example: "sshomestays" },
            name: { type: "string", example: "Private Swimming Pool" },
            title: { type: "string", example: "Infinity Pool with Sunset View" },
            description: { type: "string", example: "Temperature controlled luxury pool" },
            icon: { type: "string", example: "waves" },
            category: { type: "string", example: "Outdoor" },
            badge: { type: "string", example: "Popular" },
            price: { type: "number", example: 1500 },
            originalPrice: { type: "number", example: 2000 },
            status: { type: "string", example: "active" },
            isPopular: { type: "boolean", example: true },
            isFeatured: { type: "boolean", example: false },
            images: {
              type: "array",
              items: { type: "string" },
              example: ["https://sshomestaybucket-sshome.s3.eu-north-1.amazonaws.com/uploads/pool.webp"],
            },
          },
        },
        DiscoverVilla: {
          type: "object",
          properties: {
            id: { type: "string", example: "vil_1739847291000" },
            appId: { type: "string", example: "sshomestays" },
            title: { type: "string", example: "Sunset Ridge Luxury Villa" },
            subtitle: { type: "string", example: "4 BHK Villa with Private Pool" },
            tag: { type: "string", example: "Best Seller" },
            price: { type: "number", example: 12500 },
            originalPrice: { type: "number", example: 16000 },
            location: { type: "string", example: "Lonavala, Maharashtra" },
            rating: { type: "number", example: 4.9 },
            reviewsCount: { type: "number", example: 48 },
            bedrooms: { type: "number", example: 4 },
            bathrooms: { type: "number", example: 4 },
            maxGuests: { type: "number", example: 12 },
            image: { type: "string", example: "https://sshomestaybucket-sshome.s3.eu-north-1.amazonaws.com/uploads/villa1.webp" },
            gallery: {
              type: "array",
              items: { type: "string" },
              example: ["https://sshomestaybucket-sshome.s3.eu-north-1.amazonaws.com/uploads/villa1.webp"],
            },
            amenities: {
              type: "array",
              items: { type: "string" },
              example: ["WiFi", "Pool", "AC", "Kitchen", "Parking"],
            },
            isFeatured: { type: "boolean", example: true },
            isAvailable: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        DiscoverVillaInput: {
          type: "object",
          required: ["title", "price", "location"],
          properties: {
            appId: { type: "string", example: "sshomestays" },
            title: { type: "string", example: "Sunset Ridge Luxury Villa" },
            subtitle: { type: "string", example: "4 BHK Villa with Private Pool" },
            tag: { type: "string", example: "Best Seller" },
            price: { type: "number", example: 12500 },
            originalPrice: { type: "number", example: 16000 },
            location: { type: "string", example: "Lonavala, Maharashtra" },
            rating: { type: "number", example: 4.9 },
            reviewsCount: { type: "number", example: 48 },
            bedrooms: { type: "number", example: 4 },
            bathrooms: { type: "number", example: 4 },
            maxGuests: { type: "number", example: 12 },
            image: { type: "string", example: "https://sshomestaybucket-sshome.s3.eu-north-1.amazonaws.com/uploads/villa1.webp" },
            gallery: {
              type: "array",
              items: { type: "string" },
            },
            amenities: {
              type: "array",
              items: { type: "string" },
            },
            isFeatured: { type: "boolean", example: true },
            isAvailable: { type: "boolean", example: true },
          },
        },
        UploadResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Image uploaded successfully to AWS S3" },
            data: {
              type: "object",
              properties: {
                key: { type: "string", example: "uploads/image-1739847291000-abc12345.webp" },
                url: { type: "string", example: "https://sshomestaybucket-sshome.s3.eu-north-1.amazonaws.com/uploads/image-1739847291000-abc12345.webp" },
                size: { type: "number", example: 1048576 },
                mimetype: { type: "string", example: "image/webp" },
                storage: { type: "string", example: "s3" },
              },
            },
          },
        },
        DeleteUploadInput: {
          type: "object",
          required: ["key"],
          properties: {
            key: { type: "string", example: "uploads/image-1739847291000-abc12345.webp" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "SSHomestays REST API Documentation",
    })
  );
};

module.exports = { setupSwagger, swaggerSpec };
