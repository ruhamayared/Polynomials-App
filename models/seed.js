require('dotenv').config()
const mongoose = require('./connection')
const Polynomial = require('./polynomial')

const startPolynomials = [
    { function: "f(x)=-5", form: "Standard Form", type: "Constant", parentFunction: "f(x)=0", degree: "0", image: "https://i.imgur.com/yFzB8FE.png", imageTwo: "https://i.imgur.com/6dxmsMQ.png" },
    { function: "f(x)=-x+2", form: "Slope-Intercept Form", type: "Linear", parentFunction: "f(x)=x", degree: "1", image: "https://i.imgur.com/DKn60DZ.png", imageTwo: "https://i.imgur.com/QhlSBMl.png" },
    { function: "f(x)=3x^2+19x+20", form: "Standard Form", type: "Quadratic", parentFunction: "f(x)=x^2", degree: "2", image: "https://i.imgur.com/FcpKiU6.png", imageTwo: "https://i.imgur.com/nBCZRIr.png" },
    { function: "f(x)=2x^3-5x^2+-2x", form: "Standard Form", type: "Cubic", parentFunction: "f(x)=x^3", degree: "3", image: "https://i.imgur.com/drU8a3P.png", imageTwo: "https://i.imgur.com/qbZmSBu.png" },
    { function: "f(x)=3x^4-3x^3-5x^2-6", form: "Standard Form", type: "Quartic", parentFunction: "f(x)=x^4", degree: "4", image: "https://i.imgur.com/i2AHqIg.png", imageTwo: "https://i.imgur.com/PsKwd9Z.png" },
    { function: "f(x)=x^5-5x^3+4x", form: "Standard Form", type: "Quintic", parentFunction: "f(x)=x^5", degree: "5", image: "https://i.imgur.com/iRc4Km1.png", imageTwo: "https://i.imgur.com/nN86vQQ.png" },

]

//Delete all polynomials
Polynomial.remove({}, (err, data) => {
    //Create new polynomials once old polynomials are deleted
    Polynomial.create(startPolynomials, (err, data) => {

        console.log(data)
        mongoose.connection.close()

    })

})

