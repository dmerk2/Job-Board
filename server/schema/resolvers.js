const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Job, Application } = require("../models");
const sendEmail = require("../utils/nodeMailer");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user.role === "employee") {
        const user = await User.findById(context.user._id).populate(
          "appliedJobs"
        );
        return user;
      } else if (context.user.role === "employer") {
        const user = await User.findById(context.user._id).populate(
          "listedJobs"
        );
        return user;
      }

      throw AuthenticationError;
    },
    users: async (_, { role }) => {
      if (role) {
        let users;
        if (role === "employer") {
          users = await User.find({ role }).populate("listedJobs");
        } else if (role === "employee") {
          users = await User.find({ role }).populate("appliedJobs");
        }
        return users;
      }
      return await User.find();
    },
    allJobs: async () => {
      const jobs = await Job.find().populate("employerId");
      return jobs;
    },
    jobListings: async (_, { title }) => {
      if (!title) {
        throw new Error("You must enter a title to search for a job.");
      }
      const spaceRegex = /^\s+$/;
      if (spaceRegex.test(title)) {
        throw new Error("Your input cannot be just spaces.");
      }
      const jobTitle = Job.find({
        title: { $regex: title, $options: "i" },
      }).populate("employerId");
      return await jobTitle;
    },
    jobListing: async (_, { _id }) => {
      const jobTitle = Job.findById(_id).populate("employerId");
      return await jobTitle;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    addJob: async (parent, args, context) => {
      if (context.user) {
        const job = await Job.create({ ...args, employerId: context.user._id });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { listedJobs: job._id },
        });
        return job;
      }
      throw AuthenticationError;
    },
    applyJob: async (parent, { jobId }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to apply for a job."
        );
      }

      // Check if the user has already applied for this job
      const existingApplication = await Application.findOne({
        jobId,
        applicantId: context.user._id,
      });

      if (existingApplication) {
        throw new Error("You have already applied for this job.");
      }

      // Fetch job details including employer's userId
      const job = await Job.findById(jobId);

      if (!job) {
        throw new Error("Job not found");
      }

      // Fetch the employer
      const employer = await User.findById(job.employerId);

      if (!employer) {
        throw new Error("Employer not found");
      }

      // Send email to the employer
      try {
        await sendEmail(
          employer.email,
          "New Job Application",
          `You have a new job application for "${job.title}" from ${context.user.email}!`
        );
        console.log("Email sent successfully!");

        // If the email sending is successful, update the database
        // Update the existing document in the Application collection by pushing the user's _id to the applicantId array.
        await Application.updateOne(
          { jobId },
          { $push: { applicantId: context.user._id } }
        );

        // Find the user
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new Error("User not found");
        }

        // Update the appliedJobs array
        user.appliedJobs.push(jobId);

        // Save the user
        const updatedUser = await user.save();

        // Return some indication of success
        return { success: true, user: updatedUser };
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email to employer.");
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        console.error("User not found");
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        console.error("Incorect password");
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { user, token };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          args,
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
