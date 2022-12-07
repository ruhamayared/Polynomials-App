require("dotenv").config()

const mongoose = require("mongoose")

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Establish Mongo connection
mongoose.connect(process.env.DATABASE_URL, CONFIG)

//Mongoose connection events
mongoose.connection
    .on("open", () => console.log("Connected to Mongo!"))
    .on("close", () => console.log("Disconnected from Mongo!"))
    .on("error", (error) => console.log(error))

// export mongoose with connection to use in other files
module.exports = mongoose