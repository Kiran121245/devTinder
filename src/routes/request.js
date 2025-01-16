const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

// sendConnectionRequest route
requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.first_name + " has sent a connection request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRouter;