const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    last_name: {
      type: String,
    },
    age: {
      type: Number,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    //   validate(value) {
    //     if (!validator.isEmail(value)) {
    //       throw new Error("Invalid email address " + value);
    //     }
    //   },
    },
    password: {
      type: String,
      required: true,
    //   validate(value) {
    //     if (!validator.isStrongPassword(value)) {
    //       throw new Error("Invalid email address " + value);
    //     }
    //   },
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@KiranSai123$#^", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

// Create unique indexes for the first_name and email fields
/* userSchema.index({ first_name: 1 }, { unique: true }); */
/* userSchema.index({ emailId: 1 }, { unique: true }); */

const User = mongoose.model("User", userSchema); // Creating User model provided by mongoose.
User.on("index", (err) => {
  if (err) {
    console.error("Error creating indexes:", err);
  } else {
    console.log("Indexes created successfully");
  }
});

module.exports = User;
