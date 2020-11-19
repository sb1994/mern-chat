const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;
