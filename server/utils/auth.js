const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ role, email, _id }) {
    const payload = { role, email, _id };

    try {
      const token = jwt.sign({ data: payload }, secret, {
        expiresIn: expiration,
      });
      return token;
    } catch (error) {
      console.error("Error generating token:", error);
      return null;
    }
  },
};
