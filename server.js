const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
dotenv.config();

const http = require("http");
const app = express();

const db = process.env.DB_CONNECT;
mongoose
  .connect(db, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(db);
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ataching the passport middle ware to the app instance
app.use(passport.initialize());
require("./config/passport")(passport);

const users = require("./api/routes/users");

app.use("/api/users", users);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = {
  server,
};
