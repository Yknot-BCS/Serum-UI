const { getDb } = require("./connection");

class services {
  static async getCol(col) {
    let res;
    try {
      res = await getDb().collection(col).find({}).toArray();
    } catch (err) {
      res = err;
    }
    return res;
  }
}

module.exports = { services };
