const errorMessages = require("../errorsController/errors")
const middlewares = require("./middlewares")

function verifyInputCreate(req, res, next) {
    const title = req.body.titulo
    const isComplete = req.body.isComplete
    const deadline = req.body.dataLimite


    if(!title)
        return res.status(400).send({
            message: errorMessages.missingTextError
        })
        

    if(!isComplete)
        return res.status(400).send({
            message: errorMessages.missingTextError
        })
        

    if(!deadline)
        return res.status(400).send({
            message: errorMessages.missingTextError
        })

    const validDeadline = verifyDate(deadline)
    if(validDeadline != true)
        return res.status(400).send({
            message: errorMessages[validDeadline]
        })

    req.body.dataLimite = middlewares.formatDate(deadline)

    return next()
}

function verifyInputUpdate(req, res, next) {
    const deadline = req.body.dataLimite
    
    if(deadline){
        const validDeadline = verifyDate(deadline)

        if(validDeadline != true)
            return res.status(400).send({
                message: errorMessages[verifyDate(validDeadline)]
        })

        req.body.dataLimite = middlewares.formatDate(deadline)
    }

    return next()
}

function verifyDate(deadline) {
    const splitDate = deadline.split(/[\/-]/)

    if(splitDate.length > 3)
        return "argumentsError"

    const regex = /[^0-9]/
    if(regex.test(splitDate[0]) || regex.test(splitDate[1]) || regex.test(splitDate[2]))
        return "invalidDigitError"

    if(splitDate[1] > 12 || splitDate[1] < 1)
        return "invalidMonthError"

    // Caso seja Ano Bissexto e o mês seja 2
    if(splitDate[1] == 2){
        if(!middlewares.isBissexto(splitDate[2]) && splitDate[0] > 28)
            return "invalidDayError"

        if(splitDate[0] > 29)
            return "invalidDayError"
    }
    else if(middlewares.maxDayOfMonth[splitDate[1]] < splitDate[0] || splitDate[0] < 1)
        return "invalidDayError"

    return true
}

module.exports = {verifyInputCreate, verifyInputUpdate}