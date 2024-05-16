const db = require("../database/database")
const Sequelize = require("sequelize")

const Owner = db.define("responsavel", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    dataNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    timestamp: true
})

module.exports = Owner