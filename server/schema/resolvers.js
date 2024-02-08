const { signToken, AuthenticationError } = require("../utils/auth");
const { User, Job, Application } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
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
    jobListings: async (_, { title }) => {
      const jobTitle = Job.find({ title });
      return await jobTitle;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
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
  },
};

module.exports = resolvers;
