const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), process.env.JWT_SECRET),
    isAdmin,
  });

  if(!newUser){
    console.log('hit')
  }
  
  const savedUser = await newUser.save();
  if (savedUser) {
    res.status(201).json({ user: savedUser });
  } else {
    res.status(500).json({ error: "something went worng! " });
  }
});

// @route PUT /auth/:id
// @desc update user
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { password } = req.body;
  if (password)
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.JWT_SECRET
    ).toString();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: req.body,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  delete updatedUser._doc.password;

  if (updatedUser) {
    return res.status(200).json({ user: updatedUser });
  } else {
    return res.status(500).json({ error: "something went worng! " });
  }
});

// @route DELTE /auth/:id
// @desc delete user
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const deleteUser = await User.findByIdAndDelete(userId);
  if (deleteUser) {
    return res.status(200).json({ user: deleteUser });
  } else {
    return res.status(500).json({ error: "something went worng! " });
  }
});

// @route GET /auth/:id
// @desc get user
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    return res.status(200).json({ user: user });
  } else {
    return res.status(500).json({ error: "something went worng! " });
  }
});

// @route GET /auth/
// @desc get all users
// @access Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password -__v");
  if (users) {
    return res.status(200).json({ users: users });
  } else {
    return res.status(500).json({ error: "something went worng! " });
  }
});

// @route GET /auth/stats
// @desc get all stats
// @access Private
exports.getStats = asyncHandler(async (req, res, next) => {
  console.log("stats: ");
  const date = new Date();
  const lastYear = new Date(date.getFullYear(date.getFullYear() - 1));
  const stats = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  if (stats) {
    return res.status(200).json({ stats });
  } else {
    return res.status(500).json({ error: "something went worng! " });
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, ...password_ } = req.body;

  const user = await User.findOne({
    email,
  });
  if (!user) return res.status(401).json({ error: "Bad Credentials! 0" });

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.JWT_SECRET
  );
  const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (userPassword !== password_.password)
    return res.status(401).json({ error: "Bad Credentials! 1" });

  const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  const { password, ...others } = user._doc;

  if (user) {
    res.status(200).json({ user: others, accessToken });
  } else {
    res.status(500).json({ error: "something went worng!" });
  }
});
