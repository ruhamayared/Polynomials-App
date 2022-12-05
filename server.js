//Import 
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

//Create express app
const app = express()

//Establish Mongo connection
mongoose.connect(process.env.DATABASE_URL)

//Mongoose connection events
mongoose.connection
    .on("open", () => console.log("Connected to Mongo!"))
    .on("close", () => console.log("Disconnected from Mongo!"))
    .on("error", (error) => console.log(error))

//Middleware
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//Routes and Routers
app.get("/", (req, res) => {
    res.send("<h1>Server is Working!</h1>")
})


//Server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


