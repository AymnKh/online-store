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
//subCategory
const subCategoruRoute = require("./routes/subCategory");
app.use("/api/v1/sub-categories", subCategoruRoute);

const ApiError = require("./helpers/ApiErrors");
app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
});

//error handler middleware
const globalError = require("./helpers/globalError");
app.use(globalError);

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
