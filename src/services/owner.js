const {Op} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../database/database')
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

    if(params.notpending){
        const ownersID = await db.query(`SELECT id 
            FROM responsavels 
            WHERE id 
            NOT IN 
            (SELECT tarefas."responsavelId" 
            FROM tarefas 
            WHERE tarefas."isComplete" = false)`).then((owners) => owners[0])

            
        const listId = ownersID.map(id => id.id)

        const ownersNotPending = await Owner.findAll({
            where: {
                id: listId
            }
        })
        return ownersNotPending

    }

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
    await Task.destroy({
        where: {
            responsavelId: id
        }
    })
    
    return await Owner.destroy({
        where: {
            id: id
        }
    })
}


module.exports = {list, add, update, remove}