//Import Dependencies
const express = require('express')
const Polynomial = require('../models/polynomial')

// Create Router variable to attach to routes
const router = express.Router()

//Middleware
//Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect("/user/login")
    }
})

//New Route -- do I even need this?
router.get('/:id', (req, res) => {
    res.render("polynomials/show.ejs", { polynomial })
})

//Delete Route



//Update Route
router.put("/:id", async (req, res) => {
    console.log(req.body)
    await Comment.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/:id")
  })



//Create Route
app.post("/animals", async (req, res) => {
    let newComment = await Comment.create(req.body)
    res.redirect("/polynomials")
  })
