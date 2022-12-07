//Import 
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const PolynomialRouter = require('./controllers/polynomial')
const UserRouter = require("./controllers/user")


//Create express app
const app = express()


//Middleware
app.use(morgan("tiny"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use("/polynomials", PolynomialRouter)



//Server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


