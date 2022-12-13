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

  static async getUsersNotValidated() {
    let users = await getDb().collection("users").find({}).toArray();
    let count = 0;
    let msg = "None";
    let usersNotValidated = [];
    users.forEach((user) => {
      if (user.verifications.kyc === "APPROVED") {
        count++;
      } else {
        usersNotValidated.push(user.name);
      }
    });
    if (count === users.length) {
      this.allNotValidated = false;
    }
    msg = `${count}/${users.length}`;
    const data = { msg, usersNotValidated };
    return data;
  }
}

module.exports = { services };
