const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const user = await jwt.verify(authHeader, process.env.JWT_SECRET);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ error: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ error: "Bad Credentials!" });
  }
});

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({ error: "Your not allowed to do that!" });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({ error: "Your not allowed to do that!" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
