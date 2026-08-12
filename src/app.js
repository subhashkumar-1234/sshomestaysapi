const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const facilityRoutes = require("./routes/facility.routes");
const discoverVillaRoutes = require("./routes/discoverVilla.routes");
const uploadRoutes = require("./routes/upload.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Global Middlewares
app.use(cors());
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

// Centralized Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;