const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "this is secret";

// create a user using: POST "/api/auth/createuser". NO login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists." });
      }
      // hash password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);
      // Create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      // token generated
      const data = {
        user : {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);

      // res.json(user);
      res.json({authToken});
    } 
    catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Authenticate a user using: POST "/api/auth/login". NO login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare)
      {
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }

      const data = {
        user : {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken});
    } 
    catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
)

module.exports = router;
