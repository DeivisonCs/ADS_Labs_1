
const errorMessages = require("../errorsController/errors")
const middlewares = require("./middlewares")

function verifyInputCreate (req, res, next) {
    const name = req.body.nome
    const birthDate = req.body.dataNascimento

    if(!name || !birthDate)
        return res.status(400).send({
            message: errorMessages.missingTextError
        })

    const validName = verifyName(name)
    if(validName != true)
        return res.status(400).send({
            message: errorMessages[validName]
        })

    const validBirthDate = verifyBirthDate(birthDate)
    if(validBirthDate != true)
        return res.status(400).send({
            message: errorMessages[validBirthDate]
        })

    req.body.dataNascimento = middlewares.formatDate(birthDate)
    
    return next()
}

function verifyInputUpdate (req, res, next) {
    const id = req.params.id
    const name = req.body.nome
    const birthDate = req.body.dataNascimento

    if(!id) 
        return res.status(400).send({
            message: errorMessages.missingIdError
        })

    const regex = /\d+/
    if(!regex.test(id))
        return res.status(400).send({
            message: errorMessages.invalidIDError
        })
    
    if(Object.keys(req.body).length > 2)
        return res.status(400).send({
            message: errorMessages.argumentsError
        })
   
    if(name){
        const validName = verifyName(name)
        if(validName != true)
            return res.status(400).send({
                message: errorMessages[validName]
            })
    }

    if(birthDate){
        const validBirthDate = verifyBirthDate(birthDate)
        if(validBirthDate != true)
            return res.status(400).send({
                message: errorMessages[validBirthDate]
            })
    }
    
    return next()
}

function verifyName(name) {
    if(name.length < 3)
        return "lengthError"
    
    const regex = /\d+/
    if(regex.test(name))
        return "numberFoundError"

    return true
}

function verifyBirthDate(birthDate) {
    const splitDate = birthDate.split(/[\/-]/)

    if(splitDate.length > 3)
        return "argumentsError"

    const regex = /[^0-9]/
    if(regex.test(splitDate[0]) || regex.test(splitDate[1]) || regex.test(splitDate[2]))
        return "invalidDigitError"

    if(splitDate[2] < 2014)
        return "invalidYearError"

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