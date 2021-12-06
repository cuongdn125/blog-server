const express = require("express");

const { signUp } = require("../controllers/user");
const router = express.Router();

router.post("/", signUp);

module.exports = router;
