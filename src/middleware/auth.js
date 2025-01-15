const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("T-Unauthorized");
    }
    const decodedObject = await jwt.verify(token, "DEV@KiranSai123$#^");

    const { _id } = decodedObject;
    const user = await User.findById(_id);
    
    if (!user) {
      res.status(401).send("U-Unauthorized");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
