const express = require('express') 
const Polynomial = require('../models/polynomial')


// Create Router  variable to attach routes
const router = express.Router()


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