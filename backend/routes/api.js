import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define Post schema and model
const postSchema = new mongoose.Schema({
  name: String,
  description: String,
  timeOfPost: Date,
});

const Post = mongoose.model("Post", postSchema);

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new post
router.post("/", async (req, res) => {
  const { name, description, timeOfPost } = req.body;

  try {
    const newPost = new Post({ name, description, timeOfPost });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a post by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, timeOfPost } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { name, description, timeOfPost },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a post by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
