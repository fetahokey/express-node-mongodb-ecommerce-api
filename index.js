const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connect");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order");
const { notFound, errorHandler } = require("./middleware/error");
const { json, urlencoded } = express;
const logger = require("morgan");
const app = express();

dotenv.config();
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use(orderRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Backend server is running ..");
});
