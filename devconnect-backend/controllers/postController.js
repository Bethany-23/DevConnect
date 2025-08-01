
const Post = require("../models/Post");

// create new post

exports.createPost = async(req, res) =>{
    try{
        const {title, content} = req.body;
        const post = await Post.create({
            title,
            content,
            author: req.user._id
        });
        res.status(201).json(post);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

// get all posts 

exports.getPosts = async(req, res) =>{
    try{
        const posts = await Post.find().populate("author", "name email");
        res.json(posts);
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

// get single post by ID 

exports.getPostById = async(req, res) =>{
    try{
        const post = await Post.findById(req.params.id).populate("author", "name email");
        if (!post) return res.status(404).json({message: " Post not found"});
        res.json(post);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

// update post 

exports.updatePost = async(req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({message: "Post not found"});

        // check if user is author
        if (post.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "Not authorized to update this post"});
        }
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        const updatedPost= await post.save();
        res.json(updatedPost);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

// DELETE
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post not found" });

  // Check author
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
};