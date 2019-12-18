const pool = require("./dbconnection");

const model = {};

model.get = () => {
  return new Promise((resolve, reject) => {
    return resolve(["admin","mitra","laporan"]);
  });
};


module.exports = model;
