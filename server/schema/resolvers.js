const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Job, Application } = require("../models");

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
      if (context.user) {
        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({
          jobId,
          applicantId: context.user._id,
        });

        if (existingApplication) {
          alert("You have already applied for this job.");
        }

        // If the user hasn't applied before, update the existing document in the Application collection by pushing the user's _id to the applicantId array.
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
      }

      throw new AuthenticationError(
        "You must be logged in to apply for a job."
      );
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
