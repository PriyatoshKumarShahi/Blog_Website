const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });
  res.json(posts);
});

// Create post
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user._id });
  await post.save();
  res.json(post);
});

// Get single post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name email");
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json(post);
});

module.exports = router;
