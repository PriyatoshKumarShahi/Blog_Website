const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name email _id") // ✅ include _id
    .sort({ createdAt: -1 });
  res.json(posts);
});


// Create post
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user._id });
  await post.save();
  res.json(post);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name email _id"); 
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json(post);
});
module.exports = router;
