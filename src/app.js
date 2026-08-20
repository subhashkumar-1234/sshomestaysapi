const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const facilityRoutes = require("./routes/facility.routes");
const discoverVillaRoutes = require("./routes/discoverVilla.routes");
const uploadRoutes = require("./routes/upload.routes");
const errorMiddleware = require("./middleware/error.middleware");
const { setupSwagger } = require("./config/swagger");

const app = express();

// Dynamic CORS Configuration (Allows Vercel, Localhost, and any frontend domain)
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

// Setup Swagger API Documentation UI
setupSwagger(app);

// API Route Bindings
app.use("/api/users", userRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/discover-villas", discoverVillaRoutes);
app.use("/api/upload", uploadRoutes);

// Root Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SS Homestays REST API is operational",
    documentation: "/api-docs",
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler for Unmatched Endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;