const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connect");
const userRouter = require("./routes/users");
const app = express();

app.use("/users", userRouter);

dotenv.config();
connectDB();

app.listen(5000, () => {
  console.log("Backend server is running ..");
});
