const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,

    validate(value) {
      //   if (value.length < 7) {
      //     throw new Error("Your password is too sort");
      if (value.toLowerCase().includes("password")) {
        throw new Error("Your password is not usable");
      }
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("your email is not correct");
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("you should enter positive age");
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // console.log("just before saming");
  //
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
