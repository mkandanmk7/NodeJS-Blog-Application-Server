const router = require("express").Router();
const User = require("../Models/User");
const Post = require("../Models/Post");

//create post
router.post("/", async (req, res) => {
  //create
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(200).send({ message: "created post", details: post });
  } catch (err) {
    res.status(500).send({ message: "error in create post", details: err });
  }
});

//update post
router.put("/:id", async (req, res) => {
  console.log("post updation process");

  try {
    const updatePost = await Post.findById(req.params.id);
    if (updatePost.username === req.body.username) {
      try {
        const updation = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res
          .status(200)
          .send({ message: "updated successfully", details: updation });
      } catch (err) {
        res
          .status(500)
          .send({ message: "error in post updation", details: err });
      }
    } else {
      res.status(500).send("You Can update only your posts");
    }
  } catch (err) {
    res.status(500).send({ message: "error in updation", details: err });
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        //delete
        await Post.deleteOne();
        res.status(200).send({ message: "post deleted ", details: post });
      } catch (err) {
        res.status(500).send({ message: "error in delete post", err: err });
      }
    } else {
      res.status(500).send("you can delete only your posts");
    }
  } catch (err) {
    res.status(500).send({ message: "error in delete", err: err });
  }
});

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({ message: "get post done", details: post });
  } catch (error) {
    res.status(500).send({ message: "error in get post", err: err });
  }
});

module.exports = router;
