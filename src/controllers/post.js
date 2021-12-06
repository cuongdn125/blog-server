const db = require("../models");
const createError = require("http-errors");

const getPosts = async (req, res, next) => {
  try {
    const data = await db.Post.findAll({
      include: [
        { model: db.Label, attributes: ["labelName"] },
        { model: db.User },
      ],
    });

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const postPost = async (req, res, next) => {
  try {
    if (
      !req.body.title ||
      !req.body.contentHTML ||
      !req.body.userId ||
      !req.body.labelNames
    ) {
      // res.status(500).send({ message: "Missing parameter" });
      throw createError(400, "Missing parameter");
    } else {
      const post = await db.Post.create({
        title: req.body.title,
        userId: req.body.userId,
        contentHTML: req.body.contentHTML,
      });
      for (const labelName of req.body.labelNames) {
        const [label, isCreated] = await db.Label.findOrCreate({
          where: { labelName: labelName },
        });
        // console.log(label.id);
        const labelpost = await db.LabelPost.create({
          labelId: label.id,
          postId: post.id,
        });
        // console.log(labelpost);
      }
      res.status(200).json({ message: "Created successfully" });
    }
  } catch (err) {
    // console.log(err);
    // res.status(500).send({ message: err.message });
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await db.Post.findOne({
      where: { id: id },
      include: [
        { model: db.Label, attributes: ["labelName"] },
        { model: db.User },
      ],
      //   include: [{ model: db.User }],
    });
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    // res.status(500).send({ message: error.message });
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await db.Post.destroy({
      where: { id: req.params.id },
    });
    res.status(200).send({ message: "Delete successfully" });
  } catch (error) {
    // console.log(error);
    // res.status(500).send({ message: error.message });
    next(error);
  }
};

module.exports = {
  getPosts,
  postPost,
  getPost,
  deletePost,
};
