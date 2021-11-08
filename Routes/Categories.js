const router = require("express").Router();
const Category = require("../Models/Category");

//create cat
router.post("/", async (req, res) => {
  console.log("category in process");
  const newCat = new Category(req.body);
  try {
    const postCategory = await newCat.save();
    res.status(200).send({
      Message: "category created",
      details: postCategory,
      cat: { first: "music", second: "game" },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error in category creation", error: error });
  }
});

module.exports = router;
