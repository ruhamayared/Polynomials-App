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
//Index Route - Home Page -- Polynomials
router.get("/", async (req, res) => {
    const polynomials = await Polynomial.find({}).sort({ degree: "ascending" })
    res.render("polynomials/index.ejs", { polynomials })
})

//New route
router.get("/new", (req, res) => {
    res.render("polynomials/new.ejs")
  })

//Delete Route -- Polynomial
router.delete("/:id", async (req, res) => {
    await Polynomial.findByIdAndDelete(req.params.id)
    res.redirect("/polynomials")
  })

//Delete Route -- Comments
router.delete("/comments/:id", async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id)
    res.redirect(`/polynomials/${req.query.polynomialId}`)
})

//Update Route -- Comments
router.put("/:id", async (req, res) => {
    //Update the comment
    await Comment.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/polynomials/${req.query.polynomialId}`)
    
})

//Create Route -- Polynomial
router.post("/", async (req, res) => {
    await Polynomial.create(req.body)
    console.log("body", req.body)
    res.redirect("/polynomials")
  })

// Create Route -- Comments
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

//Edit Route -- Comments
router.get("/comments/:id/edit", async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    const polynomial = await Polynomial.find({comments: {$in: [comment._id]}}).populate("comments")
    res.render("polynomials/edit-comments.ejs", { comment, polynomial: polynomial[0] })

})

//Show route -- Polynomials
router.get("/:id", async (req, res) => {
    const polynomial = await Polynomial.findById(req.params.id).populate("comments")
    res.render("polynomials/show.ejs", { polynomial })
})

module.exports = router




