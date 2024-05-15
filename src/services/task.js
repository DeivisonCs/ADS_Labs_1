const Task = require("../models/task")

async function add(data) {
    return await Task.create(data)
}

async function list() {
    return await Task.findAll()
}

module.exports = {add, list}