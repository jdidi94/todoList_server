const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { User, Blog } = require("./database/index.js");
const mongoose = require("mongoose");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const user = await User.findOne({ name: name });
    if (user) {
      return res.status(200).json(user);
    }
    const newUser = new User({
      name,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new blog
app.post("/api/blogs", async (req, res) => {
  try {
    const { imageUrl, body, title, author } = req.body;
    if (!body || !title || !author) {
      return res
        .status(400)
        .json({ error: "Body, title, and author are required" });
    }
    const newBlog = new Blog({
      imageUrl,
      body,
      title,
      author,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a blog
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: "body is required" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a blog
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = 1128;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
