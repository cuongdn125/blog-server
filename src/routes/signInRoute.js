const express = require("express");

const { signIn } = require("../controllers/user");
const router = express.Router();

router.post("/", signIn);

module.exports = router;
