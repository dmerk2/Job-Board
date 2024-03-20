require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const { typeDefs, resolvers } = require("./schema");
const db = require("./config/connection");
const multer = require("multer");
const { uploadImage } = require("./utils/s3");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const User = require("./models/User");

// Create an Express application
const app = express();

// Create a new instance of ApolloServer with defined type definitions and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Configure multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

const startApolloServer = async () => {
  await server.start();

  // Configure middleware for parsing request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static images from the client directory
  app.use("/images", express.static(path.join(__dirname, "../client/images")));

  // Enable CORS
  app.use(cors());

  // Set up GraphQL endpoint with authentication middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Set up a route for uploading images
  app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      const key = `${Date.now()}-${file.originalname}`;
      if (!file || !file.buffer) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      // Call the uploadImage function from the s3.js file
      const upload = await uploadImage(key, file.buffer, req.file.mimetype);
      const userId = req.body._id;
      const imageUrl = upload.Location;
      // Update the user's profileImage field in the database
      await User.findByIdAndUpdate(userId, { profileImage: imageUrl }, { new: true })
      console.log("userId", userId)
      console.log(req.file);
      res.json({ imageUrl: upload.Location});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading image" });
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
