// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const cors = require("cors");

const app = express();

// Configuración más específica de CORS
app.use(
  cors({
    origin: [
      process.env.ORIGIN,
      "http://localhost:5173",    // Vite default
      "http://localhost:3000"     // Create React App default
    ].filter(Boolean),
    credentials: true,            // Si usas cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const skillRoutes = require("./routes/skill.routes");
app.use("/skill", skillRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/event",eventRoutes);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
