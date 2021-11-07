const router = require("express").Router();

const User = require("../Models/User");

//register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    res
      .status(200)
      .send({ register: "user registered successfully", details: user });
  } catch (err) {
    res.status(500).send({ Error: "Error in register", error: err });
  }
});

//login

module.exports = router;
