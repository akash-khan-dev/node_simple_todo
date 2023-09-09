const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },

  date: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
});

module.exports = todoSchema;
