const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();

// Connect with controller
const searchController = require("../controllers/searchController");

router.get("/api/search", (req, res) => {
  console.log("Search endpoint reached");
  searchController(req.query).then((result) => {
    res.send(result);
  });
});

module.exports = router;
