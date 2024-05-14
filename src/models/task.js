const db = require("../database/database")
const Sequelize = require("sequelize")
const Owner = require("./owner")

const Task = db.define("tarefa", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dataLimite: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
},{
    timestamp: true
})

Task.associate = () => {
    Task.belongsTo(Owner, {
        as: "autor"
    })
}

module.exports = Task