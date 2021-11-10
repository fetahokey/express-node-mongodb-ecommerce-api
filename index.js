const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connect");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const { notFound, errorHandler } = require("./middleware/error");
const { json, urlencoded } = express;
const app = express();

dotenv.config();
connectDB();
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Backend server is running ..");
});
