const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

//dotenv
dotenv.config();
//express app
const app = express();
//parsing data
app.use(express.json());
app.use(express.urlencoded());
//midlleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}
//enable cors
app.use(cors());
app.options("*", cors());

//routes
//category
const categoruRoute = require("./routes/category");
app.use("/api/v1/categories", categoruRoute);

app.get("/", (req, res) => {
  res.send("Welcome to simple server");
});
//connect to db
const dbConnection = require("./config/database");
dbConnection();
//create server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server start");
});
