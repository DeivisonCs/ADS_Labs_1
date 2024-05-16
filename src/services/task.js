const Task = require("../models/task")

async function add(data) {

    return await Task.create(data)
}

async function remove(id){
    return await Task.destroy({
        where: {
            id: id
        }
    })
}

async function update(data, id){
    try{
        const taskToUpdate = await Task.findByPk(id)

        if(!taskToUpdate)
            return false

        const newTask = {}

        if(data.titulo)
            newTask.titulo = data.titulo

        if(data.descricao)
            newTask.descricao = data.descricao
        
        if(data.isComplete)
            newTask.isComplete = data.isComplete

        if(data.dataLimite)
            newTask.dataLimite = data.dataLimite

        await taskToUpdate.update(newTask)

        return await Owner.findByPk(id)
    }
    catch(error){
        return error
    }
}

async function list(data) {

    if(data.id)
        return await Task.findAll({
            where: {
                id: data.id
            }
        })

    if(data.titulo)
        return await Task.find({
            where: {
                titulo: data.titulo
            }
        })

    if(data.isComplete)
        return await Task.find({
            where: {
                isComplete: data.isComplete
            }
        })

    return await Task.findAll()
}

async function listFrom(ownerId) {
    return await Task.findAll({
        where: {
            responsavelId: ownerId
        }
    })
}

async function listPendingFrom(ownerId) {
    return await Task.findAll({
        where: {
            responsavelId: ownerId,
            isComplete: "false"
        }
    })
}

module.exports = {add, list, remove, update, listFrom, listPendingFrom}