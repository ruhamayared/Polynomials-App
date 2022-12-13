//Comments Model

const mongoose = require('./connection')

//Pull schema and model from mongoose
const { Schema, model } = mongoose

//Make comments schema
const commentSchema = new Schema({
    text: String
})

//Make comment model
const Comment = model("Comment", commentSchema)

module.exports = Comment