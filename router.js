var express = require("express");
const { services } = require("./services");
var router = express.Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  next();
});

router.get("/", function (req, res) {
  res.send("Welcome to Analytics API");
});

router.get("/:col", async function (req, res) {
  let collection = await services.getCol(req.params.col)
  res.send(collection);
});

module.exports = router;
