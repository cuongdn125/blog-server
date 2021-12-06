const jwtHepler = require("../helpers/jwt");
const createError = require("http-errors");

// const JWT_SECRET_ACCESS_KEY = process.env.JWT_SECRET_ACCESS_KEY;
// const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;

const isAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const decoded = await jwtHepler.verifyAccessToken(token);
        req.user = decoded;
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next(createError(403, "No token provided"));
    }
  } else {
    next(createError(403, "No token provided"));
  }
};

module.exports = {
  isAuth,
};
