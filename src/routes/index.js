const express = require("express");
const postRoute = require("./postRoute");
const labelRoute = require("./labelRoute");
const authRoute = require("./authRoute");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.use("/auth", authRoute);

router.use(isAuth);

router.use("/post", postRoute);
router.use("/label", labelRoute);
router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
