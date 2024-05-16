const Task = require("../models/task")

async function add(data) {

    return await Task.create(data)
}

async function list() {
    return await Task.findAll()
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

module.exports = {add, list, remove, update}