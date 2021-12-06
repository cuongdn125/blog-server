const db = require("../models");
const createError = require("http-errors");
const jwtHepler = require("../helpers/jwt");
const redis = require("../config/redis");

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError(400, "Refresh token is required");
    }
    const decoded = await jwtHepler
      .verifyRefreshToken(refreshToken)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
    // console.log(decoded);
    redis.del(decoded.id, (err, reply) => {
      if (err) {
        throw createError.InternalServerError();
      }
      res.status(204).json({
        message: "Logout success",
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };
