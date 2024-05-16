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
    isComplete: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    dataLimite: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
},{
    timestamp: true
})


    // Task.belongsTo(Owner, {
    //     foreignKey: 'id_responsavel'
    // });

Task.belongsTo(Owner)

module.exports = Task