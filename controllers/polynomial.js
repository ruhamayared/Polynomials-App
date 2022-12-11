//Import Dependencies
const express = require('express')
const { default: mongoose } = require('mongoose')
const Polynomial = require('../models/polynomial')
const Comment = require('../models/comment')

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
router.delete("/comments/:id", async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id)
    res.redirect(`/polynomials/${req.params.id}`)
})


//Update Route
router.put("/comments/:id", async (req, res) => {
    await Comment.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/polynomials/${req.params.id}`)
})



// Create Route
router.post("/comments/:id", (req, res) => {
    //Find polynomial by id
    Polynomial.findById(req.params.id, (err, poly) => {
        //Create the comment
        Comment.create(req.body, (err, comment) => {
            //Push comment into comment array and schema
            poly.comments.push(`${comment._id}`)
            //Save comment
            poly.save()
            res.redirect(`/polynomials/${req.params.id}`)
        })
    })

    //Will I need to add a way for user to add comment?
})

//Edit Route
router.get("/comments/:id/edit", async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    console.log(comment)
    res.render("polynomials/edit.ejs", { comment })
})

//Show route
router.get("/:id", async (req, res) => {
    const polynomial = await Polynomial.findById(req.params.id).populate("comments")
    res.render("polynomials/show.ejs", { polynomial })
})

module.exports = router


