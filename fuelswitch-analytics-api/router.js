var express = require("express");
const { services } = require("./services");
const { auth } = require("./auth");
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

router.post("/login", async (req, res) => {
  let data = await auth.login(req);
  res.send(data);
});

router.post("/getUserSalt", async (req, res) => {
  let data = await auth.getUserSalt(req);
  res.send(data);
});

router.get("/getUserSignupData", async (req, res) => {
  let data = await services.getUserSignupData();
  res.send(data);
});

router.get("/getRECRequestData", async (req, res) => {
  let data = await services.getRECRequestData();
  res.send(data);
});


router.get("/usersNotValidated", async (req, res) => {
  let data = await services.getUsersNotValidated();
  res.send(data);
});

router.get("/devicesAndMeters", async (req, res) => {
  let data = await services.getDevicesAndMeters();
  res.send(data);
});

router.get("/recs", async (req, res) => {
  let data = await services.getRecs();
  res.send(data);
});

module.exports = router;
