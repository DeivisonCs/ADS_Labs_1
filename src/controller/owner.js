const services = require("../services/owner")

function add (req, res) {
    services.add(req.body)
        .then((owner) => 
            res.status(201).send({
                message: "Responsavel Adicionado!",
                responsavel: owner
            }), 
        (error) => res.status(400).send({message: error}))
}

function remove (req, res) {
    services.remove(req.params.id)
        .then((owner) =>
            res.status(200).send({
                message: owner?"Responsável removido com sucesso!":"Responsável não encontrado",
                responsavel: owner
            }),
        (error) => res.status(400).send({message: error}))
}


function update (req, res) {
    services.update(req.body, req.params.id)
        .then((owner) =>  
            res.status(200).send({
                message: owner?"Responsavel atualizado com sucesso!":"Responsável não encontrado!"
            }),
        (error) => res.status(400).send({message: error}))
}


function list (req, res) {
    services.list(req.query)    
        .then((owners) => res.status(200).send({responsavel: owners}),
        (error) => res.status(400).send({message: error}))
}

function notPending(req, res) {
    services.notPending()
        .then((tasks) => res.status(200).send({tasks: tasks}),
        (error) => res.status(400).send({message: error}))
}
module.exports = {list, add, remove, update, notPending}