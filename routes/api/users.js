const express = require("express");
const router = express.Router();

const APP_KEYS = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// user model
const User = require("../../models/User");
const ProductCat = require("../../models/ProductCat");
// @route   Post api/posts
// @desc    Registering user
// @access  public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json("Email already exists");
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.json({
                name: user.name,
                email: user.email,
                role: user.role
              })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = {};
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json("Invalid credentials");
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, email: user.email }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          APP_KEYS.jwtSecret,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: token,
              role: user.role,
              user_id: user.id
            });
          }
        );
      } else {
        return res.status(400).json("Invalid credentials");
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get("/current", auth, (req, res) => {
  //console.log(req.user);
  res.json({
    id: req.user.id,
    name: req.user.name
    //email: req.user.email
  });
});

// @route   GET api/users
// @desc    Get all users
// @access  Private

router.get("/", auth, (req, res) => {
  const errors = {};

  User.find()
    .select("-password")
    .then(Users => {
      if (!Users) {
        errors.noprofile = "There is no User";
        return res.status(404).json(errors);
      }
      res.json(Users);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/users
// @desc    Get user by id
// @access  Private

router.get("/:userId", auth, (req, res) => {
  const errors = {};

  User.findOne({ _id: req.params.userId })
    .select("-password")
    .then(user => {
      if (!user) {
        errors.noprofile = "There is no User";
        return res.status(404).json(errors);
      }
      res.json(user);
    })
    .catch(err => res.status(404).json(err));
});

function unflatten(arr) {
  var tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem._id] = arrElem;
    mappedArr[arrElem._id]["children"] = [];
  }

  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parentId) {
        mappedArr[mappedElem["parentId"]]["children"].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

router.post("/cattree", async (req, res) => {
  try {
    const cats = await ProductCat.find({}).select("_id parentId name");
    var categories = [...cats];
    categories[0]["children"] = [({ name: "A" }, { name: "B" }, { name: "C" })];
    res.json(categories[0].children[0]);
    //res.json(unflatten(cats));
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = router;
