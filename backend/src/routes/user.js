const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { celebrate, Joi, isCelebrateError } = require("celebrate");
const User = mongoose.model("user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const celebrateErrorHandler = (error, req, res, next) => {
  if (isCelebrateError(error)) {
    return res.status(400).json({
      message: error.details.get("body").message,
    });
  }
  next(error);
};

const userValidationSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  username: Joi.string().alphanum().min(3).max(50).required().messages({
    "string.empty": "Username cannot be empty",
    "any.required": "Username is required",
    "string.min": "Username must be at least three characters",
    "string.alphanum": "Username must only consist of letters and numbers", // Corrected from string.alphanumeric to string.alphanum
  }),
  name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z ]+$"))
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name cannot be empty",
      "any.required": "Name is required",
      "string.min": "Name must be at least three characters",
      "string.pattern.base": "Name must only consist of letters and spaces", // Custom message for pattern validation
    }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least eight characters",
  }),
});

router.post(
  "/api/user/join",
  celebrate({
    body: userValidationSchema,
  }),
  celebrateErrorHandler,
  async (req, res) => {
    try {
      const { email, username, name, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser != null) {
        return res.status(409).json({ message: "Email is already in use." });
      }

      const usernameTaken = await User.findOne({ username });
      console.log(usernameTaken);
      if (usernameTaken != null) {
        return res.status(409).json({ message: "Username is taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const addedUser = new User({
        email,
        username,
        name,
        password: hashedPassword,
      });
      await addedUser.save();
      res.status(201).json({
        message: "Joined Momentum successfully!",
        user: addedUser._id,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.get("/api/user/login", async (req, res) => {
  try {
    const { user, password } = req.query;

    const existingUser = await User.findOne({
      $or: [{ email: user }, { username: user }],
    });

    if (existingUser == null) {
      return res
        .status(409)
        .json({ message: "No account exists for that username/email" });
    }

    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchingPassword) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res
      .status(201)
      .json({ message: "Logged into Momentum successfully!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
