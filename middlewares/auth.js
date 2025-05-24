const User=require("../models/user")
const { verifyUserToken } = require("../services/auth");

function checkForAuthCookie(cookieName) {
  return async(req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return next();

    try {
      const verf = verifyUserToken(token);
       const user = await User.findById(verf).select("email fullname role profileImgURL");
      req.user = user;
      res.locals.user = user;
    } catch (err) {
      console.error("Invalid token", err);
    }

    return next();
  };
}

module.exports = { checkForAuthCookie };
