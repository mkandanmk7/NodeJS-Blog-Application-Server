const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User");

//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res
      .status(200)
      .send({ register: "user registered successfully", details: user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Error in register", error: err });
  }
});

//login

module.exports = router;
