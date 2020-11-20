const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const passport = require("passport");

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//gets the currently authenticated user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    console.log(user);
    res.json(user);
  }
);

router.post("/register", async (req, res) => {
  let { email, password, username } = req.body;
  let errors = {};
  try {
    //checks if the user exists
    const user = await User.findOne({
      $or: [
        {
          email,
        },
        { username },
      ],
    });
    if (!user) {
      //user model instance created if user doesnt exist
      const newUser = new User({
        email,
        password,
        username,
        profile_pic:
          "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
      });
      //encrypts and stalts the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //saves the new user
          newUser
            .save()
            .then((user) => {
              const payload = {
                _id: user.id,
                username: user.username,
                profile_pic: user.profile_pic,
                email: user.email,
              };
              console.log(process.env.SECRET);
              //sigins and sends a web token in the response
              jwt.sign(
                payload,
                process.env.SECRET,
                { expiresIn: 3600 * 1000 * 1000 * 20 },
                (err, token) => {
                  console.log(token);
                  res.json({
                    success: true,
                    token: `${token}`,
                  });
                }
              );
            })
            .catch((err) => res.json(err));
        });
      });
    } else {
      //returns error if it does
      errors.username = "User already exists";
      res.json({
        errors,
      });
    }
  } catch (error) {
    console.log(error);
  }
  // res.json({ msg: "Register Route" });
});

//login route for registered users
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  let error = {};
  // // //find user by email
  User.findOne({
    email: email,
  }).then((user) => {
    // console.log(user);
    if (!user) {
      error.email = "User Not Found";
      return res.status(404).json({ error });
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        console.log(isMatch);
        if (isMatch) {
          //user matched create the payload taht will
          // be sent in the token

          const payload = {
            _id: user.id,
            username: user.username,
            email: user.email,
            profile_pic: user.profile_pic,
          };
          console.log(process.env.SECRET);

          //creates the token
          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 3600 * 1000 * 1000 * 20 },
            (err, token) => {
              console.log(token);
              res.json({
                success: true,
                token: `${token}`,
              });
            }
          );
        } else {
          error.password = "password failed";
          return res.status(500).json(error);
        }
      });
    }
  });
});

module.exports = router;
