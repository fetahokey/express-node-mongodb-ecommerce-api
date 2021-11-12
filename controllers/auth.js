const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const CryptoJS = require('crypto-js');

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.JWT_SECRET),
    isAdmin,
  });

  const savedUser = await newUser.save();
  if (savedUser) {
    res.status(201).json({ user: savedUser });
  } else {
    res.status(500).json({ error: "something went worng! " });
  }
});
