//Import Dependencies
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

// reate Route
const router = express.Router()

//Routes

//Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
  //Encrypt password
  req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
  //Create the new user
  User.create(req.body, (err, user) => {
    //Redirect to login page
    res.redirect("/user/login")
  })
})


//Login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
  //Get the data from the request body
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    //Check if user exists
    if (!user) {
      res.send("User doesn't exist.");
    } else {
      //Check if password matches
      const result = bcrypt.compareSync(password, user.password)
      if (result) {
        req.session.username = username
        req.session.loggedIn = true
        res.redirect("/polynomials")
      } else {
        res.send("Wrong password.");
      }
    }
  })
})


//Logout Route
router.get("/logout", (req, res) => {
  //Destroy session and redirect to main page
  req.session.destroy((err) => {
    res.redirect("/")
  })
})


//Export the Router
module.exports = router