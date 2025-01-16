const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


// Signup Route
authRouter.post("/signup", async (req, res) => {
  try {
    //validating the data
    validateSignUpData(req);

    const { first_name, last_name, emailId, password } = req.body;

    //encrypting the password
    const passwordHash = await bcrypt.hash(password, 8);

    //creating new instance of user model
    const user = new User({
      first_name,
      last_name,
      emailId,
      password: passwordHash,
    });

    await user.save(); //saving the user to the database
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Login Route
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).send(`Invalid Credentials`);
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create JWT token
      const token = await user.getJWT();

      // Add the token to the cookies and send the response back to the user.
      res.cookie("token", token);
      return res.send("Login Successful");
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    return res.status(500).send("ERROR : " + err.message);
  }
});

module.exports = authRouter;