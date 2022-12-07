//Import Dependencies
const express = require('express')
const Polynomial = require('../models/polynomial')

// Create Router variable to attach to routes
const router = express.Router()

//Middleware
//Authorization Middleware
// router.use((req, res, next) => {
//     if (req.session.loggedIn) {
//         next()
//     } else {
//         res.redirect("/user/login")
//     }
// })


//Routes
//Index Route - Home Page
router.get("/", async (req, res) => {
    const polynomials = await Polynomial.find({})
    res.render("polynomials/index.ejs", { polynomials })
})

//Show route
router.get("/:id", async (req, res) => {
    const polynomial = await Polynomial.findById(req.params.id)
    res.render("polynomials/show.ejs", { polynomial })
})

module.exports = router