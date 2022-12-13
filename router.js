var express = require("express");
const { services } = require("./services");
var router = express.Router();
const cors = require("cors");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
router.use(cors());

router.get("/", function (req, res) {
  res.send("Welcome to Analytics API");
});

router.get("/usersNotValidated", async (req, res) => {
  let data = await services.getUsersNotValidated();
  res.send(data);
});

router.get("/:col", async function (req, res) {
  let collection = await services.getCol(req.params.col);
  res.send(collection);
});

module.exports = router;
