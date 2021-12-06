const db = require("../models");
const createError = require("http-errors");
const jwtHepler = require("../helpers/jwt");
const { authSchema } = require("../helpers/validation");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");

const login = async (req, res, next) => {
  try {
    const result = authSchema.validate(req.body);
    const { email, password } = result.value;
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      next(createError(401, "Invalid email or password"));
      return;
    }
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      next(createError(401, "Invalid email or password"));
      return;
    }
    const accessToken = await jwtHepler
      .generateAccessToken({
        id: user.id,
        email: user.email,
      })
      .then((token) => {
        return token;
      })
      .catch((err) => {
        next(err);
        return;
      });

    const refreshToken = await jwtHepler
      .generateRefreshToken({
        id: user.id,
        email: user.email,
      })
      .then((token) => {
        return token;
      })
      .catch((err) => {
        next(err);
        return;
      });

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: true,
      })
      .status(200)
      .json({
        message: "success",
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
