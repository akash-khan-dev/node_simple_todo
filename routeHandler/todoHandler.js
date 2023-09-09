const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

// get all the todo

router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({ status: "inactive" })
      .select({ _id: 0 })
      .limit(1);
    res.status(200).json({ result: data, message: "There was a successful" });
  } catch (err) {
    res.status(500).json({ message: "There was sarver side error " });
  }
});

// get a todo id

router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "server side error" });
  }
});

// post a todo

router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);

  if (!newTodo.title || !newTodo.description || !newTodo.status) {
    res.status(500).json({ message: "There was sarver side error" });
  } else {
    if (newTodo.status == "active" || newTodo.status == "inactive") {
      newTodo.save();
      res.status(200).json(newTodo);
    } else {
      res.status(500).json({ message: "There was sarver side error" });
    }
  }
});

// post multiple todo

router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({ message: "There was a successful" });
  } catch (err) {
    res.status(500).json({ message: "There was sarver side error" });
  }
});

// put todo

router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      }
    );
    res.status(200).json({ message: "There was a successful" });
  } catch (err) {
    res.status(500).json({ message: "Server Side Error" });
  }
});

// delete  todo

router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Delete Success" });
  } catch (err) {
    res.status(500).json({ message: "Server Side Error" });
  }
});

module.exports = router;
