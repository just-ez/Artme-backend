const express = require("express");
// App Init
const app = express();

const mongoose = require("mongoose");
const { mongodburi, PORT } = require("./src/core/config");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoute = require("./src/Router/userRoute");
const artRoute = require("./src/Router/artRoute");
const postRoute = require("./src/Router/postRoute");
const paystack = require("./src/controllers/clientController");
const commentRoute = require("./src/Router/commentRoute");
const collectionRoute = require("./src/Router/collectionRoute")
const likeRoute = require("./src/Router/likeRoute")

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//router middleware

app.use("/api/pay/", paystack);
app.use("/api/", postRoute);
app.use("/api/user", userRoute);
app.use("/api/", likeRoute)
app.use("/api/", commentRoute);
app.use("/api/", collectionRoute)
app.use("/api/", likeRoute)
app.use("/api/", artRoute);
app.get("/", (req, res) => {
  const apidoc = "https://documenter.getpostman.com/view/21225799/UzQuR6VE";
  res.send(`Artme Backend Is Running: <a href="${apidoc}" style="color:"#000";" >< See Docs /></a>`);
});

// server connection

mongoose
  .connect(mongodburi)
  .then(() =>
    app.listen(PORT, () => console.log(`backend is listening ${PORT}`))
  );
