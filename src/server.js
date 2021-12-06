const express = require("express");
require("dotenv").config();
const connectDB = require("./config/conectDB");
const router = require("./routes");
const cors = require("cors");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
require("./config/redis");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

connectDB();

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
