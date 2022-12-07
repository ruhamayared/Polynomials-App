//Import 
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const PolynomialRouter = require('./controllers/polynomial')
const UserRouter = require("./controllers/user")
const session = require('express-session')
const MongoStore = require('connect-mongo')


//Create express app
const app = express()

//User needs to get to login and sign up pages
app.get("/", (req, res) => {
    res.render("index.ejs")
})


//Middleware
app.use(morgan("tiny"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
}))

app.use("/polynomials", PolynomialRouter)
app.use("/user", UserRouter)


//Server listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


