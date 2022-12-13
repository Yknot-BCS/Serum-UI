const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.URI);

let dbConnection;

module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      dbConnection = client.db("fuelswitchdev");
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    } 
  },

  getDb: function () {
    return dbConnection;
  },
};
