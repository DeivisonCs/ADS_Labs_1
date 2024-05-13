
const errorMessages = {
    missingTextError: "Nome ou Data de Nascimento pendente!",
    lengthError: "Nome deve ter ao menos 3 letras",
    numberFoundError: "Nome não pode conter números",
    invalidBirthDateError: "Responsável deve ter nascido após 2014!",
    argumentsError: "Data de nascimento com mais argumentos do que esperado!",
    invalidDigitError: "Data de nascimento possui algum digito inválido!",
    invalidDayError: "Dia inválido!",
    invalidMonthError: "Mês inválido!",
    invalidYearError: "Ano inválido!",
    testError: "teste"
}

function verifyInput (req, res, next) {
    const name = req.body.nome
    const birthDate = req.body.birthDate

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
    const splitData = birthDate.split(/[\/-]/)

    if(splitData.length > 3)
        return "argumentsError"

    const regex = /[^0-9]/
    if(regex.test(splitData[0]) || regex.test(splitData[1]) || regex.test(splitData[2]))
        return "invalidDigitError"

    if(splitData[2] < 2014)
        return "invalidYearError"

    if(splitData[1] > 12 || splitData[1] < 1)
        return "invalidMonthError"

    // Caso seja Ano Bissexto e o mês seja 2
    if(splitData[1] == 2){
        if(!isBissexto(splitData[2]) && splitData[0] > 28)
            return "invalidDayError"

        if(splitData[0] > 29)
            return "invalidDayError"
    }
    else if(maxDayOfMonth[splitData[1]] < splitData[0] || splitData[0] < 1)
        return "invalidDayError"

    return true
}

const maxDayOfMonth = { 
    1: 31,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

function isBissexto(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

module.exports = {verifyInput}