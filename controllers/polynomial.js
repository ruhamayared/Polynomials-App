//Import Dependencies
const express = require('express')
const { default: mongoose } = require('mongoose')
const Polynomial = require('../models/polynomial')
const Comment = require('../models/polynomial')
const toId = mongoose.Types.ObjectId

// Create router variable to attach to routes
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


//Routes
//Index Route - Home Page
router.get("/", async (req, res) => {
    const polynomials = await Polynomial.find({}).sort({ degree: "ascending" })
    res.render("polynomials/index.ejs", { polynomials })
})


//Delete Route


//Update Route
// router.put("/:id", async (req, res) => {
//     await Comment.findByIdAndUpdate(req.params.id, req.body)
//     res.redirect("/:id")
// })



//Create Route
// router.post("/comments/:id", async (req, res) => {
//     req.params.Comment = toId[req.params.Comment]
//     const newComment = await (await Comment.create(req.params.Comment))
//     newComment.p
//     newComment.save()
//     console.log(newComment)
//     res.redirect("/polynomials/:id")
// })


//Edit Route


//Show route
router.get("/:id", async (req, res) => {
    const polynomial = await Polynomial.findById(req.params.id)
    res.render("polynomials/show.ejs", { polynomial })
})

module.exports = router