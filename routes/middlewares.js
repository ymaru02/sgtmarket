const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.redirect("/login");
    }
    return res.redirect("/login");
  }
};
module.exports = verifyToken;
