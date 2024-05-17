const errorMessages = require("../errorsController/errors")
const middlewares = require("./middlewares")

function verifyInputCreate(req, res, next) {
    const title = req.body.titulo
    const isComplete = req.body.isComplete
    const deadline = req.body.dataLimite

    // Verifica se o título foi enviado
    if(!title)
        return res.status(400).send({
            message: errorMessages.missingTextError
        })
    
    // Verifica se o estado foi enviado (false: não completa, true: completa)
    if(!isComplete)
        return res.status(400).send({
            message: errorMessages.missingTextError
        })

    // Verifica se o prazo foi enviado
    if(!deadline)
        return res.status(400).send({
            message: errorMessages.missingTextError
        })

    const validDeadline = verifyDate(deadline)

    // Verifica se o prazo é válido
    if(validDeadline != true) 
        return res.status(400).send({
            message: errorMessages[validDeadline]
        })

    // Formata o prazo para aaaa-mm-dd
    req.body.dataLimite = middlewares.formatDate(deadline)

    return next()
}

function verifyInputUpdate(req, res, next) {
    const deadline = req.body.dataLimite

    // return res.send({
    //     data1: deadline,
    //     result1: middlewares.isTaskCompleted(deadline),
    //     data2: "2002/08/12",
    //     result2: middlewares.isTaskCompleted("12/08/2002")
    // })
    
    // Verifica se foi passado uma dataLimite
    if(deadline){
        const validDeadline = verifyDate(deadline)

        // Verifica se a data é válida
        if(validDeadline != true)
            return res.status(400).send({
                message: errorMessages[verifyDate(validDeadline)]
            })

        /* Verifica se o prazo da tarefa já passou, 
        caso tenha passado o parâmetro da data é removido do update,
        caso ainda esteja no prazo a formato da data é formatado para inserção no banco*/
        if(middlewares.isTaskCompleted(deadline)) delete req.body.dataLimite
        else req.body.dataLimite = middlewares.formatDate(deadline)
    }

    return next()
}

function verifyDate(deadline) {
    const splitDate = deadline.split(/[\/-]/)

    // Verifica o tamanho do nome
    if(splitDate.length > 3)
        return "argumentsError"

    const regex = /[^0-9]/
    // Verifica se não há nenhum digito além de números na data
    if(regex.test(splitDate[0]) || regex.test(splitDate[1]) || regex.test(splitDate[2]))
        return "invalidDigitError"

    // Verifica se o mês é válido
    if(splitDate[1] > 12 || splitDate[1] < 1)
        return "invalidMonthError"

    // Verifica se é o mês 2
    if(splitDate[1] == 2){
        // Caso NÃO seja ano bissexto
        if(!middlewares.isBissexto(splitDate[2]) && splitDate[0] > 28)
            return "invalidDayError"
        
        // Caso seja ano bissexto
        if(splitDate[0] > 29)
            return "invalidDayError"
    }
    // Valida o dia em comparação com a data limite do mês
    else if(middlewares.maxDayOfMonth[splitDate[1]] < splitDate[0] || splitDate[0] < 1)
        return "invalidDayError"

    return true
}

module.exports = {verifyInputCreate, verifyInputUpdate}