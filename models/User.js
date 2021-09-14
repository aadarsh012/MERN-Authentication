const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide Your UserName"]
  },
  email: {
    type: String,
    required: [true, "Please Provide Your e-mail"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Provide a Valid E-mail!"
    ]
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    minlength: 8,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordDate: Date
});

UserSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordDate = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  });
};

// UserSchema.methods.matchPassword = async function (password) {
//   match = await bcrypt.compare(password, this.password);
//   return match;
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
