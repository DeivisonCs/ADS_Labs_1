const services = require("../services/task")
const errorMessages = require("../errorsController/errors")

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
        .then((task) => {
            // Caso o retorno da função tenha sido um erro personalizado
            if(task == "endedTask")
                return res.status(200).send({message: errorMessages[task]})

            return res.status(200).send({
                message: task?"Tarefa atualizada!":"Tarefa não encontrada!"
            })
        },
    (   error) => res.status(400).send({message: error}))
}

function list(req, res) {
    // Lista a partir de um responsável
    if(req.query.from){
        services.listFrom(req.query.from)
            .then((tasks) => res.status(200).send({tasks: tasks}),
            (error) => res.status(400).send({message: error}))
    }
    // Lista todas as tarefas ou a partir de alguns filtros com id, titulo ou isComplete
    else{ 
        services.list(req.query)
            .then((task) => res.status(200).send({tarefas: task}), 
            (error) => res.status(400).send({message: error}))
    }
}

module.exports = {add, list, remove, update}