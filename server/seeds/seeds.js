const db = require("../config/connection");
const { User, Application, Job } = require("../models");
const cleanDB = require("./cleadDB");

db.once("open", async () => {
  console.log("Database connected");
  await cleanDB("Job", "jobs");
  await cleanDB("User", "users");
  await cleanDB("Application", "applications");

  const jobs = await Job.insertMany([
    {
      title: "Front End Developer",
      description:
        "We need a Front-End Developer to join our team and help us build the next generation of web applications. You will work with the UI/UX designer and bridge the gap between graphical design and technical implementation, taking an active role on both sides and defining how the application looks as well as how it works.",
      salary: 100000,
      location: "New Jersey",
      skills: ["HTML", "CSS", "JavaScript"],
      createdAt: new Date(),
    },
    {
      title: "Back End Developer",
      description:
        "Hoping to hire a Back-End Developer who is responsible for server-side web application logic and integration of the work front-end developers do. Back-end developers usually write web services and APIs used by front-end developers and mobile application developers.",
      salary: 125000,
      location: "Philadelphia",
      skills: ["Node.js", "Express", "MongoDB"],
      createdAt: new Date(),
    },
    {
      title: "Full Stack Developer",
      description:
        "URGENT HIRING! We are looking for a Full-Stack Developer to produce scalable software solutions. You’ll be part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment.",
      salary: 150000,
      location: "New York City",
      skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
      createdAt: new Date(),
    },
    {
      title: "Senior Software Engineer",
      description:
        "Unleash your coding wizardry as a Senior Software Engineer! Lead software development initiatives, mentor a team of talented engineers, and design user-friendly interfaces. Join us in crafting digital experiences that enchant millions.",
      salary: 150000,
      location: "Chicago",
      skills: ["React", "Node.js", "Express", "MongoDB"],
      createdAt: new Date(),
    },
    {
      title: "Full Stack Developer",
      description:
        "We are looking for a Full Stack Developer to produce scalable software solutions. You will be part of a cross-functional team that is responsible for the full software development life cycle, from conception to deployment.",
      salary: 140000,
      location: "Los Angeles",
      skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
      createdAt: new Date(),
    },
    {
      title: "Web Developer",
      description:
        "We are looking for an outstanding Web Developer to be responsible for the coding, innovative design and layout of our website. Web developer responsibilities include building our website from concept all the way to completion from the bottom up, fashioning everything from the home page to site layout and function.",
      salary: 130000,
      location: "San Francisco",
      skills: ["HTML", "CSS", "JavaScript"],
      createdAt: new Date(),
    },
  ]);

  console.log("Jobs seeded");
  //   {
  //     username: "CompanyInc",
  //     email: "companyinc@email.com",
  //     password: "password",
  //     role: "employer",
  //     firstName: "John",
  //     lastName: "Doe",
  //     bio: "We are a company that is looking to hire the best talent in the industry. We are a fast-growing company that is looking to expand our team. We are looking for talented individuals who are passionate about their work and are looking to grow with us.",
  //     location: "New Jersey",
  //     createdAt: new Date(),
  //     skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  //     listedJobs: [{ _id: jobs[0]._id }, { _id: jobs[1]._id }],
  //   },
  //   {
  //     username: "StartupCo",
  //     email: "startingup@email.com",
  //     password: "password",
  //     role: "employer",
  //     firstName: "Jane",
  //     lastName: "Smith",
  //     bio: "We are a startup that is looking to hire the best talent in the industry. We are a fast-growing company that is looking to expand our team. We are looking for talented individuals who are passionate about their work and are looking to grow with us.",
  //     location: "New York City",
  //     createdAt: new Date(),
  //     skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  //     listedJobs: [{ _id: jobs[2]._id }, { _id: jobs[3]._id }],
  //   },
  //   {
  //     username: "WebDevCo",
  //     email: "webco@email.com",
  //     password: "password",
  //     role: "employer",
  //     firstName: "James",
  //     lastName: "Johnson",
  //     bio: "We are a company that is looking to hire the best talent in the industry. We are a fast-growing company that is looking to expand our team. We are looking for talented individuals who are passionate about their work and are looking to grow with us.",
  //     location: "Los Angeles",
  //     createdAt: new Date(),
  //     skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  //     listedJobs: [{ _id: jobs[4]._id }, { _id: jobs[5]._id }],
  //   },
  //   {
  //     username: "DanMerkin",
  //     email: "dan@email.com",
  //     password: "password",
  //     role: "employee",
  //     firstName: "Dan",
  //     lastName: "Merkin",
  //     bio: "I am a tech guy who wants to do tech things.",
  //     location: "New Jersey",
  //     createdAt: new Date(),
  //     skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  //   },
  //   {
  //     username: "JesseLoCascio",
  //     email: "jesse@email.com",
  //     password: "password",
  //     role: "employee",
  //     firstName: "Jesse",
  //     lastName: "LoCascio",
  //     bio: "Let me work for you. I am good at things. I am a good worker. I am a good person. I am good.",
  //     location: "New York City",
  //     createdAt: new Date(),
  //     skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  //   },
  //   {
  //     username: "ThirdEmployee",
  //     email: "numberthree@email.com",
  //     password: "password",
  //     role: "employee",
  //     firstName: "Third",
  //     lastName: "Employee",
  //     bio: "Who am I? Do I really exist? I am a mystery. I am a ghost. I am a shadow. I am a whisper",
  //     location: "Los Angeles",
  //     createdAt: new Date(),
  //     skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  //   },
  // ]);

  const user1 = await User.create({
    username: "CompanyInc",
    email: "companyinc@email.com",
    password: "password",
    role: "employer",
    firstName: "John",
    lastName: "Doe",
    bio: "We are a company that is looking to hire the best talent in the industry. We are a fast-growing company that is looking to expand our team. We are looking for talented individuals who are passionate about their work and are looking to grow with us.",
    location: "New Jersey",
    createdAt: new Date(),
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    listedJobs: [{ _id: jobs[0]._id }, { _id: jobs[1]._id }],
  });

  const user2 = await User.create({
    username: "StartupCo",
    email: "startingup@email.com",
    password: "password",
    role: "employer",
    firstName: "Jane",
    lastName: "Smith",
    bio: "We are a startup that is looking to hire the best talent in the industry. We are a fast-growing company that is looking to expand our team. We are looking for talented individuals who are passionate about their work and are looking to grow with us.",
    location: "New York City",
    createdAt: new Date(),
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    listedJobs: [{ _id: jobs[2]._id }, { _id: jobs[3]._id }],
  });

  const user3 = await User.create({
    username: "WebDevCo",
    email: "webco@email.com",
    password: "password",
    role: "employer",
    firstName: "James",
    lastName: "Johnson",
    bio: "We are a company that is looking to hire the best talent in the industry. We are a fast-growing company that is looking to expand our team. We are looking for talented individuals who are passionate about their work and are looking to grow with us.",
    location: "Los Angeles",
    createdAt: new Date(),
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    listedJobs: [{ _id: jobs[4]._id }, { _id: jobs[5]._id }],
  });

  const user4 = await User.create({
    username: "DanMerkin",
    email: "dan@email.com",
    password: "password",
    role: "employee",
    firstName: "Dan",
    lastName: "Merkin",
    bio: "I am a tech guy who wants to do tech things.",
    location: "New Jersey",
    createdAt: new Date(),
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  });

  const user5 = await User.create({
    username: "JesseLoCascio",
    email: "jesse@email.com",
    password: "password",
    role: "employee",
    firstName: "Jesse",
    lastName: "LoCascio",
    bio: "Let me work for you. I am good at things. I am a good worker. I am a good person. I am good.",
    location: "New York City",
    createdAt: new Date(),
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  });

  const user6 = await User.create({
    username: "ThirdEmployee",
    email: "numberthree@email.com",
    password: "password",
    role: "employee",
    firstName: "Third",
    lastName: "Employee",
    bio: "Who am I? Do I really exist? I am a mystery. I am a ghost. I am a shadow. I am a whisper",
    location: "Los Angeles",
    createdAt: new Date(),
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  });

  console.log("Users seeded");

  await Job.updateMany(
    { _id: { $in: jobs.map((job) => job._id) }, role: "employer" },
    { $set: { employerId: user1._id } }
  );

  await Job.updateMany(
    { title: "Front End Developer" },
    { $set: { employerId: user1._id } }
  );

  await Job.updateMany(
    { title: "Back End Developer" },
    { $set: { employerId: user2._id } }
  );

  await Job.updateMany(
    { title: "Full Stack Developer" },
    { $set: { employerId: user2._id } }
  );

  await Job.updateMany(
    { title: "Senior Software Engineer" },
    { $set: { employerId: user3._id } }
  );

  await Job.updateMany(
    { title: "Full Stack Developer" },
    { $set: { employerId: user3._id } }
  );

  await Job.updateMany(
    { title: "Web Developer" },
    { $set: { employerId: user3._id } }
  );

  console.log("Updated Jobs");

  const userJobMapping = [
    { userId: user4._id, jobIds: [jobs[0]._id, jobs[1]._id] },
    { userId: user5._id, jobIds: [jobs[2]._id, jobs[3]._id] },
    { userId: user6._id, jobIds: [jobs[4]._id, jobs[5]._id] },
  ];

  for (const mapping of userJobMapping) {
    await User.updateOne(
      { _id: mapping.userId },
      { $set: { appliedJobs: mapping.jobIds } }
    );
  }

  console.log("Updated Users");

  const applications = await Application.insertMany([
    {
      jobId: jobs[0]._id,
      applicantId: [{ _id: user4._id }],
    },
    {
      jobId: jobs[1]._id,
      applicantId: [{ _id: user4._id }],
    },
    {
      jobId: jobs[2]._id,
      applicantId: [{ _id: user5._id }],
    },
    {
      jobId: jobs[3]._id,
      applicantId: [{ _id: user5._id }],
    },
    {
      jobId: jobs[4]._id,
      applicantId: [{ _id: user6._id }],
    },
    {
      jobId: jobs[5]._id,
      applicantId: [{ _id: user6._id }],
    },
  ]);

  console.log("Applications seeded");
  process.exit();
});
