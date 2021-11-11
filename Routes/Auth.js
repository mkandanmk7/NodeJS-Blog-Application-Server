const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User");

//register
router.post("/register", async (req, res) => {
  console.log("Register Process");
  try {
    const salt = await bcrypt.genSalt(10); //gen string rounds 10
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    //User sChema here
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).send({ register: "user registered successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Error in register", error: err });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const userExist = await User.findOne({ username: req.body.username });
    console.log(userExist);
    !userExist &&
      res.status(400).send({ message: "User not exist , try register" });
    //compare with our encrypted password stored in db;
    const isValid = await bcrypt.compare(req.body.password, userExist.password);
    !isValid &&
      res
        .status(400)
        .send({ message: "Password is incorrect, try with correct one" });

    const { password, ...others } = userExist._doc; //spliting
    res.status(200).send({
      Message: "user Logged in Successfully",
      others,
    });
  } catch (err) {
    console.log("Error in login:", err);
    res.status(400).send({ Error: "Error in login", Details: err });
  }
});

module.exports = router;
