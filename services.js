const { getDb } = require("./connection");

class services {
  static async getDevicesAndMeters() {
    let countData = 0;
    let deviceMsg = "None";

    let countMeters = 0;
    let meterMsgs = "None";

    let devicesWithoutMeters = [];
    let devicesWithMetersWithoutData = [];

    let devices = await getDb()
      .collection("reds")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "username",
          },
        },
        {
          $addFields: {
            username: {
              $first: "$username",
            },
          },
        },
        {
          $addFields: {
            username: "$username.name",
          },
        },
      ])
      .toArray();

    devices.forEach((device) => {
      if (device.meters.length === 0) {
        countMeters++;
        devicesWithoutMeters.push({
          username: device.username,
          devicename: device.name,
        });
      }
    });

    let deviceDatas = await getDb()
      .collection("reds")
      .aggregate([
        {
          $unwind: {
            path: "$meters",
            includeArrayIndex: "meterIndex",
          },
        },
        {
          $lookup: {
            from: "meters",
            localField: "meters",
            foreignField: "_id",
            as: "meter",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "username",
          },
        },
        {
          $addFields: {
            username: {
              $first: "$username",
            },
          },
        },
        {
          $addFields: {
            username: "$username.name",
          },
        },
        {
          $addFields: {
            meter: {
              $first: "$meter._id",
            },
          },
        },
        {
          $lookup: {
            from: "meterdatas",
            localField: "meter",
            foreignField: "meterId",
            as: "meterData",
          },
        },
        {
          $group: {
            _id: "$_id",
            meterData: {
              $push: "$meterData",
            },
            name: {
              $first: "$name",
            },
            username: {
              $first: "$username",
            },
          },
        },
      ])
      .toArray();

    deviceDatas.forEach((data) => {
      if (data.meterData.flat().length === 0) {
        countData++;
        devicesWithMetersWithoutData.push({
          devicename: data.name,
          username: data.username,
        });
      }
    });

    deviceMsg = `${countData}/${deviceDatas.length}`;
    meterMsgs = `${countMeters}/${devices.length}`;
    return {
      deviceMsg: deviceMsg,
      meterMsg: meterMsgs,
      devicesWithoutMeters: devicesWithoutMeters,
      devicesWithMetersWithoutData: devicesWithMetersWithoutData,
    };
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

  static async getRecs() {
    let msgIssued = "None";
    let msgTotal = "None";
    let msgPending = "None";

    let recsAPP = await getDb()
      .collection("recverificationrequests")
      .aggregate([
        {
          $match: {
            status: "APPROVED",
          },
        },
      ])
      .toArray();

    let totalIssued = 0;
    recsAPP.forEach((rec) => {
      totalIssued += rec.energySum;
    });
    msgIssued = Math.floor(totalIssued / 1000);

    let recsPEN = await getDb()
      .collection("recverificationrequests")
      .aggregate([
        {
          $match: {
            status: "PENDING",
          },
        },
      ])
      .toArray();
    let totalRecsPending = 0;
    recsPEN.forEach((rec) => {
      totalRecsPending += rec.energySum;
    });

    let meterDatasPEN = await getDb()
      .collection("meterdatas")
      .aggregate([
        {
          $match: {
            status: "PENDING",
          },
        },
      ])
      .toArray();
    let totalMeterDatasPending = 0;
    meterDatasPEN.forEach((meterdata) => {
      totalMeterDatasPending += meterdata.reading;
    });
    const totalPending = totalMeterDatasPending + totalRecsPending;
    msgPending = Math.floor(totalPending / 1000);

    let total = 0;
    let orders = await getDb().collection("orders").find({}).toArray();
    orders.forEach((order) => {
      total += order.price * order.amount;
    });

    msgTotal = `R ${total}`;
    return { issued: msgIssued, totalValue: msgTotal, pending: msgPending };
  }

  static async getUserSignupData() {
    const userData = await getDb().collection("users").aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]).toArray();
    return userData;
  }

  static async getRECRequestData(){
    const recRequestData = await getDb().collection("recverificationrequests").aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]).toArray();
    return recRequestData;
  }
}

module.exports = { services };
