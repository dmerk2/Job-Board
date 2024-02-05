const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    index: true,
  },
  applicantId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  ],
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
