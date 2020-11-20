const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  website: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Member",
  },
  bio: {
    type: String,
    default: "",
  },
  githubusername: {
    type: String,
    default: "",
  },
  joined: {
    type: Date,
    default: Date.now,
  },
  profession: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
});
module.exports = User = mongoose.model("users", UserSchema);
