function isBissexto(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function formatDate(birthDate){
    const splitDate = birthDate.split(/[\/-]/)

    return splitDate.reduceRight((accumulator, currentValue) => accumulator + '-' + currentValue)
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


module.exports = {isBissexto, formatDate, maxDayOfMonth}