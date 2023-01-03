import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconected", () => {
  console.log("mongoDB disconected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

// by default express server does not accept json data
// this middleware solved it...
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotel", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    // message from mongo db in case of error
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("conected to backend");
});
