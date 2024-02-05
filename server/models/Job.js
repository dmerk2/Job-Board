const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  employerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
