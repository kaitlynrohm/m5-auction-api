// ====== Packages and imports ====== //
const express = require("express");
const cors = require("cors"); // Import cors middleware once
const app = express();
require("dotenv").config();

// Import routes
const searchRoute = require("./routes/searchRoute");

// Middleware
app.use(cors());
app.use(express.json());

// =========== ENDPOINTS =========== //
app.get("/", (req, res) => {
  console.log("root endpoint hit");
  res.send("Hello, World!");
});

app.use(searchRoute);

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
