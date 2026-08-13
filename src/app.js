const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const facilityRoutes = require("./routes/facility.routes");
const discoverVillaRoutes = require("./routes/discoverVilla.routes");
const uploadRoutes = require("./routes/upload.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Pre-computed CORS Origins (Optimized for zero allocation per request)
const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((origin) => origin.trim());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Policy Violation: Origin not allowed"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

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