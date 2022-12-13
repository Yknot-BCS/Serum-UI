const express = require("express");
const { connectToServer } = require("./connection");
const router = require("./router");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);

connectToServer();

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});
