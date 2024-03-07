const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/job-board", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

module.exports = mongoose.connection;
