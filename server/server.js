require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const { typeDefs, resolvers } = require("./schema");
const db = require("./config/connection");
const multer = require("multer");

const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Create a new instance of ApolloServer with defined type definitions and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Configure multer for handling file uploads
const upload = multer({ dest: "uploads/" });

const startApolloServer = async () => {
  await server.start();

  // Configure middleware for parsing request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static images from the client directory
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  // Set up GraphQL endpoint with authentication middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Route for generating pre-signed URL for file uploads
  app.get("/presigned-url", upload.single("file"), async (req, res) => {
    try {
      const key = req.query.key;
      if (!key) {
        return res.status(400).json({ error: "No key provided" });
      }
      const presignedUrl = await generatePresignedUrl(key);
      res.json({ presignedUrl });
    } catch (error) {
      console.error("Error generating pre-signed URL:", error);
      res.status(500).json({ error: error.toString() });
    }
  });

  // Serve client-side assets in production mode
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on ${PORT}`);
      console.log(`GraphQL sandbox on http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the function to start the Apollo Server
startApolloServer();
