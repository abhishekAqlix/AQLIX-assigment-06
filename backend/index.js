require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/v1", require("./routes"));

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "API working",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    app.listen(process.env.PORT || 8000, () => {
      console.log("Server started");
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();