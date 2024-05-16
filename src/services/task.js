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

module.exports = {add, list, remove}