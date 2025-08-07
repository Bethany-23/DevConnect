
const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} = require("../controllers/postController");

router.route("/")
.get(getPosts)
.post(protect, createPost);

router.route("/:id")
.get(getPostById)
.put(protect,updatePost)
.delete(protect, deletePost);

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).populate("author", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
});


module.exports = router;