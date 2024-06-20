// ====== Packages and imports ====== //
const express = require("express");
const app = express();
require("dotenv").config();

// Import routes

// =========== ENDPOINTS =========== //
app.get("/", (req, res) => {
  console.log("root endpoint hit");
  res.send("Hello, World!");
});

// ============== PORT ============== //
const PORT = process.env.PORT;
app
  .listen(PORT, () => {
    console.log(`Server is alive on http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log("PORT is already in use.");
    } else {
      console.log("Server Errors: ", error);
    }
  });
