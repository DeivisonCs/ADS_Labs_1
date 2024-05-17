function isBissexto(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function formatDate(birthDate){
    const splitDate = birthDate.split(/[\/-]/)

    return splitDate.reduceRight((accumulator, currentValue) => accumulator + '-' + currentValue)
}

function invertDateFormat(date){
    const splitDate = date.split(/[\/-]/)

    return splitDate.reduceRight((accumulator, currentValue) => accumulator + '/' + currentValue)
}

/* Compara a data de entrada com a data atual da máquina.
return true - caso, data na máquina > data de entrada*/
function isTaskCompleted(date) {
    const dateNow = new Date()
    const dateFormated = invertDateFormat(date)
    const inputDate = new Date(dateFormated)

    if(dateNow > inputDate)
        return true

    return false
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


module.exports = {isBissexto, formatDate, maxDayOfMonth, isTaskCompleted}