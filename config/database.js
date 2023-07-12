const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1/online-store")
    .then((conn) => {
      console.log(`Database connected ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;
