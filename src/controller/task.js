const services = require("../services/task")

function add(req, res) {
    services.add(req.body)
        .then((task) => 
            res.status(201).send({
                message: "Tarefa criada!",
                tarefa: task
            }), 
        (error) => res.status(400).send({message: error}))
}

function remove(req, res) {
    services.remove(req.params.id)
        .then((task) => 
            res.status(200).send({
                message: task?"Tarefa removida com sucesso!":"Tarefa não encontrada!"
            }),
    (error) => res.status(400).send({message: error}))
}

function update(req, res) {
    services.update(req.body, req.params.id)
        .then((task) => 
            res.status(200).send({
                message: task?"Tarefa atualizada!":"Tarefa não encontrada!"
            }),
    (error) => res.status(400).send({message: error}))
}

function list(req, res) {
    services.list(req.query)
        .then((task) => res.status(200).send({tarefas: task}), 
        (error) => res.status(400).send({message: error}))
}

function listFrom(req, res) {
    services.listFrom(req.params.id)
        .then((tasks) => 
            res.status(200).send({
                tasks: tasks?tasks:"Nenhuma tarefa não encontrada!"
            }),
        (error) => res.status(400).send({message: error}))
}

function listPendingFrom(req, res) {
    services.listPendingFrom(req.params.id)
        .then((tasks) =>
            res.status(200).send({
                tasks: tasks?tasks:"Nenhuma tarefa não encontrada!"
            }),
        (error) => res.status(400).send({message: error}))
}

module.exports = {add, list, remove, update, listFrom, listPendingFrom}