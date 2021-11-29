const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

//routes
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/Users");
const postRoute = require("./Routes/Posts");
const categoryRoute = require("./Routes/Categories");
app.use(cors());
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/images", express.static(path.join(__dirname, "/images")));
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(console.log("connected to mongo db"))
  .catch((err) => console.log("Error in Db connection", err));

//image multer
//storage file location choosing;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(req.body);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// make public folder:

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log("in upload", req.file);
    console.log("In image upload");
    res.status(200).send("file has been uploaded");
  } catch (err) {
    res.status(500).send("error in uploading");
  }
});

//middlewares

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server running at ", port);
});
