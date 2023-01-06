const { getDb } = require("./connection");
const bcrypt = require("bcryptjs");
// package bcryptjs

class auth {
  static async login(req) {
    let user = await getDb()
      .collection("users")
      .aggregate([
        {
          $match: {
            email: req.body.email,
          },
        },
        {
          $addFields: {
            roleId: {
              $toObjectId: "$roleId",
            },
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: {
            path: "$role",
          },
        },
        {
          $addFields: {
            role: "$role.name",
          },
        },
      ])
      .toArray();
    if (req.body.password.localeCompare(user[0].password) !== 0) {
      return { isAuthorized: false, msg: "Invalid password" };
    }
    if (user[0].role !== "regulator") {
      return { isAuthorized: false, msg: "Access denied" };
    }
    return { isAuthorized: true, msg: "Success" };
  }

  static async getUserSalt(req) {
    let user = await getDb()
      .collection("users")
      .aggregate([
        {
          $match: {
            email: req.body.email,
          },
        },
      ])
      .toArray();
    if (user.length === 0) {
      return { msg: "No user with that email" };
    }
    return { salt: user[0].salt };
  }
}

module.exports = { auth };
