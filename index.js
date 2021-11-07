const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongo db"))
  .catch((err) => console.log("Error in Db connection", err));

port = 3001;
app.listen(port, () => {
  console.log("server running at ", port);
});
