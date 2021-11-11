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
      postCategory,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error in category creation", error: error });
  }
});

//get cate
router.get("/", async (req, res) => {
  try {
    const postCategory = await Category.find();
    res.status(200).send({ message: "get categorie done", postCategory });
  } catch (err) {
    res.status(500).send({ message: "error in get category", details: err });
  }
});

module.exports = router;
