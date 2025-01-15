const express = require("express");
const dbconnect = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

const app = express(); // this is an instance of the express application

app.use(express.json()); // express json middleware
app.use(cookieParser()); // express cookie parser middleware

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.first_name + " has sent a connection request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  } 
});

// All TEST API's
/*
// Getting the user by emailId
app.get("/user", async (req, res) => {
  // console.log(req.body.email);
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    // console.log(users);
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Getting all the Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users);
    if (users.length === 0) {
      res.status(404).send("No Users in Database");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Getting the user by Id
app.get("/userbyId", async (req, res) => {
  const userId = req.body._id;
  // console.log(userId);
  const userDBId = await User.findById(userId);
  res.send(userDBId);
});

// Deleting the user by Id.
app.delete("/userbyId", async (req, res) => {
  const userId = req.body.userId;
  // console.log(userId);
  try {
    const userDBId = await User.findByIdAndDelete(userId);
    if (userDBId === null) {
      res.status(404).send("User not found");
    } else {
      res.send("User with Id: " + userId + ", deleted successfully");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Updating the user by Id.
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const Allowed_UPDATES = ["last_name", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }
    const userDBId = await User.findByIdAndUpdate(userId, data);
    if (userDBId === null) {
      res.status(404).send("User not found");
    } else {
      res.send("User with Id: " + userId + ", updated successfully");
    }
  } catch (err) {
    res.status(500).send("UPDATE FAILED: " + err);
  }
});
*/

dbconnect()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
