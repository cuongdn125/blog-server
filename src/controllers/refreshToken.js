const db = require("../models");
const jwtHepler = require("../helpers/jwt");
const createError = require("http-errors");

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    // console.log(refreshToken);
    if (!refreshToken) {
      throw createError(400, "refreshToken is required");
    }
    const data = await jwtHepler
      .verifyRefreshToken(refreshToken)
      .then((decoded) => {
        return decoded;
      })
      .catch((err) => {
        throw err;
      });

    const accessToken = await jwtHepler
      .generateAccessToken({
        id: data.id,
        email: data.email,
      })
      .then((token) => {
        return token;
      })
      .catch((err) => {
        throw err;
      });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: true,
      })
      .status(200)
      .json({
        message: "success",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  refreshToken,
};
