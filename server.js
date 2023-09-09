const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

const app = express();
app.use(express.json());
// app.get("/", (req, res) => {});

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/todos");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/todo", todoHandler);

app.listen(3000, () => {
  console.log("listenign hoice");
});
