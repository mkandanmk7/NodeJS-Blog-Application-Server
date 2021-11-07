const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
