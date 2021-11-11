const router = require("express").Router();
const User = require("../Models/User");
const Post = require("../Models/Post");
const bcrypt = require("bcrypt");

//update
router.put("/:id", async (req, res) => {
  console.log("updation process");
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { returnDocument: "after" }
      );
      console.log("Updated user is:", updateUser);
      res.status(200).send({ Messgae: "Updated successfuly", updateUser });
    } catch (err) {
      console.log("Error in :", err);
      res.status(500).send("Error in updation ");
    }
  } else {
    res.status(401).send("you cant update others posts");
  }
});

//delete

router.delete("/:id", async (req, res) => {
  console.log("delete in process");
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        try {
          //delete user's all posts
          await Post.deleteMany({ username: user.username });
          // delete user
          await User.findByIdAndDelete(req.params.id);
          res.status(200).send({ Message: "user deleted Successfully", user });
        } catch (err) {
          console.log("Error in delete");
          res.status(500).send(err);
        }
      }
    } catch (err) {
      console.log("err", err);
      res.status(404).send("user not found");
    }
  } else {
    res.status(401).send("Youre not permitted to delete others posts");
  }
});

//getuser

router.get("/:id", async (req, res) => {
  console.log("user getting process");
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    const { password, ...others } = user._doc;
    res.status(200).send({ others });
  } catch (error) {
    res.status(500).send("Error in getting user");
  }
});

module.exports = router;
