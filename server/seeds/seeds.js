const db = require("../config/connection")
const { User, Application, Job } = require("../models")
const cleanDB = require("./cleadDB")

db.once("open", async () => {
  console.log("Database connected");
  await cleanDB("Job", "jobs");
  await cleanDB("User", "users");
  await cleanDB("Application", "applications");

  const jobs = await Job.insertMany([
    {
      title: "Front-End Developer",
      description: "",
      salary: 100000,
      location: "New Jersey",
      skills: ["HTML", "CSS", "JavaScript"],
      employerId: user[0]._id
    }
  ])

})