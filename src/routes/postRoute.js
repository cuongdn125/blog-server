const express = require("express");

const {
  getPosts,
  postPost,
  getPost,
  deletePost,
} = require("../controllers/post");
const router = express.Router();

router.get("/", getPosts);

router.post("/", postPost);

router.get("/:id", getPost);

router.delete("/:id", deletePost);

module.exports = router;
