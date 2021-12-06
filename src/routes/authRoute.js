const express = require("express");

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const { logout } = require("../controllers/logout");
const { refreshToken } = require("../controllers/refreshToken");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refreshToken);

router.delete("/logout", logout);

module.exports = router;
