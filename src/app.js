const express = require("express");
const dbconnect = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express(); // this is an instance of the express application

app.use(express.json()); // express json middleware
app.use(cookieParser()); // express cookie parser middleware

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
