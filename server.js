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

})

//Make animal model
const Polynomial = model("Polynomial", polynomialsSchema)

//Middleware
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//Routes and Routers
app.get("/", (req, res) => {
    res.send("<h1>Server is Working!</h1>")
})

//Seed Route
app.get("/polynomials/seed", (req, res) => {
    const startPolynomials = [
        { function: "f(x)=-5", form: "Standard Form", type: "Constant", parentFunction: "None", degree: "0", image: "" }, { function: "f(x)=-x+2", form: "Slope-Intercept Form", type: "Linear", parentFunction: "f(x)=x", degree: "1", image: "" },
        { function: "f(x)=3x^2+19x+20", form: "Standard Form", type: "Quadratic", parentFunction: "f(x)=x^2", degree: "2", image: "" },
        { function: "f(x)=2x^3-5x^2+-2x", form: "Standard Form", type: "Cubic", parentFunction: "f(x)=x^3", degree: "3", image: "" },
        { function: "f(x)=3x^4-3x^3-5x^2-6", form: "Standard Form", type: "Quartic", parentFunction: "f(x)=x^4", degree: "4", image: "" },
        { function: "f(x)=x^5-5x^3+4x", form: "Standard Form", type: "Quintic", parentFunction: "f(x)=x^5", degree: "5", image: "" },

    ]

    //Delete all animals
    Polynomial.remove({}, (err, data) => {
        //Seed starter animals
        Polynomial.create(startPolynomials, (err, data) => {
            //Send created animals as response to confirm creation
            res.json(data);
        }
        )
    })

})

//Index Route
app.get("/polynomials", async (req, res) => {
    const polynomials = await Polynomial.find({})
    res.render("index.ejs", { polynomials })
  })


//Server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


