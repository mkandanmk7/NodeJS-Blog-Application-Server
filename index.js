const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//routes
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/Users");
const postRoute = require("./Routes/Posts");
const categoryRoute = require("./Routes/Categories");

const mongoose = require("mongoose");
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongo db"))
  .catch((err) => console.log("Error in Db connection", err));

//middlewares

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

port = 3001;
app.listen(port, () => {
  console.log("server running at ", port);
});
