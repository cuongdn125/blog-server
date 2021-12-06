const express = require("express");

const { getLabels } = require("../controllers/label");
const router = express.Router();

router.get("/", getLabels);

module.exports = router;
