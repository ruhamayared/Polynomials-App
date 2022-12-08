//Polynomials Model
const Comment = require("./comment")

const mongoose = require('./connection')

// Pull schema and model from mongoose
const { Schema, model } = mongoose

//Make polynomials schema
const polynomialsSchema = new Schema({
    function: String,
    form: String,
    type: String,
    parentFunction: String,
    degree: Number,
    image: String,
    imageTwo: String,
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }]

})

//Make polynomial model
const Polynomial = model("Polynomial", polynomialsSchema)


module.exports = Polynomial
