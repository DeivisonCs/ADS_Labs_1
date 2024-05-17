const Task = require("../models/task")
const middlewares = require("../middlewares/middlewares")

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

        if(taskToUpdate.isComplete)
            return ["endedTask"]

        // Verifica se a data da máquina é maior que a data limite da tarefa
        if(middlewares.isTaskCompleted(middlewares.formatDate(taskToUpdate.dataLimite)))
            return ["endedTask"]

        if(data.dataLimite){
            newTask.dataLimite = data.dataLimite
        }

        if(data.titulo)
            newTask.titulo = data.titulo

        if(data.descricao)
            newTask.descricao = data.descricao

        if(data.isComplete)
            newTask.isComplete = data.isComplete

        await taskToUpdate.update(newTask)

        return await Task.findByPk(id)
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

async function getTask(taskId){
    return await Task.findAll({where:{id:taskId}})
}

module.exports = {add, list, remove, update, listFrom, listPendingFrom, getTask}