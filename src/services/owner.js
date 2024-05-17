const {Op} = require('sequelize')
const Sequelize = require('sequelize')
const Owner = require("../models/owner")
const Task = require("../models/task")

async function add(data) {
    return await Owner.create(data)
}

async function list(params) {

    if(params.id)
        return await Owner.findAll({
            where: {
                id: params.id
            }
        })

    if(params.nome && params.dataNascimento)
        return await Owner.findAll({
            where: {
                nome: params.nome,
                dataNascimento: params.dataNascimento
            }
        })

    if(params.nome)
        return await Owner.findAll({
            where: {
                nome: params.nome
            }
        })

    if(params.dataNascimento)
        return await Owner.findAll({
            where: {
                dataNascimento: params.dataNascimento
            }
        })

    return await Owner.findAll()
}

async function update(data, id) {
    try{
        const ownerToUpdate = await Owner.findByPk(id)

        if(!ownerToUpdate)
            return false

        const newOwnerArtibutes = {};

        if(data.nome) newOwnerArtibutes.nome = data.nome
        if(data.dataNascimento) newOwnerArtibutes.dataNascimento = data.dataNascimento

        await ownerToUpdate.update(newOwnerArtibutes)

        return await Owner.findByPk(id)
    } catch (error) {
        return error
    }
}

async function remove(id) {
    return await Owner.destroy({
        where: {
            id: id
        }
    })
}

async function notPending() {
    // return await Owner.findAll({
    //     where: {
    //         id: {
    //             [Op.notIn]: [Sequelize.literal('SELECT tarefas.responsavelId FROM tarefas WHERE tarefas.isComplete = false')]
    //         }
    //     }
    // })

    const data = Sequelize.query('SELECT id FROM responsavels WHERE id NOT IN (SELECT responsavelId FROM tarefas WHERE isComplete = false)', {type:Sequelize.QueryTypes.SELECT}).then(async (data) => data[0])

    console.log(data)
    return await Owner.findAll()
    
    
}

module.exports = {list, add, update, remove, notPending}