const db = require("../models");
const { authSchema } = require("../helpers/validation");
const createError = require("http-errors");

const register = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    // console.log(result);
    const doesExit = await db.User.findOne({ where: { email: result.email } });

    if (doesExit) {
      throw createError.Conflict("Email already exists");
    }
    const user = await db.User.create(result);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
