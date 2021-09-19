const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const sendEmails = require("../utils/sendEmails");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please Provide email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Email Or Password", 401));
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return next(new ErrorResponse("Invalid Password", 401));
    } else {
      sendToken(user, 201, res);
    }
  } catch (error) {
    return next(new ErrorResponse("Please Provide Email and Password", 500));
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Cannot send Email", 400));
    }

    const resetToken = user.getResetToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
    <h1>You have requested for password reset.</h1>
    <p>Please Click the link below to reset.</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      sendEmails({
        to: email,
        subject: "Reset Password",
        text: message
      });
      res.status(200).json({ success: true, resetToken });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordDate = undefined;

      await user.save();
      res.status(400).json({ success: false, data: "Email cannot be send" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordDate: { $gt: Date.now() }
    });

    if (!user) {
      return next(new ErrorResponse("Invalid user id", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordDate = undefined;

    await user.save();

    res.status(200).json({ success: true, data: "password Reset" });
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
