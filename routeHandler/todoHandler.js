const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

// get all the todo

router.get("/", async (req, res) => {
  await Todo.find({ status: "active" })
    .then((data) => {
      res.status(200).json({ result: data, message: "There was a successful" });
    })
    .catch((err) => {
      res.status(500).json({ message: "There was sarver side error" });
    });
});

// get a todo id

router.get("/:id", (req, res) => {});

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
  await Todo.insertMany(req.body)
    .then(() => {
      res.status(200).json({ message: "There was a successful" });
    })
    .catch(() => {
      res.status(500).json({ message: "There was sarver side error" });
    });
});

// put todo

router.put("/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: "There was a successful" });
    })
    .catch(() => {
      res.status(500).json({ message: "There was sarver side error" });
    });
});

// delete  todo

router.delete("/id", (req, res) => {});

module.exports = router;
