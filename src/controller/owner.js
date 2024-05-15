const services = require("../services/owner")

function add (req, res) {
    services.add(req.body)
        .then((owner) => {
            return res.status(400).send({
                message: "Responsavel Adicionado!",
                responsavel: owner})
            }, 
            (error) => {
                res.status(500).send({message: error})
            }
        )
    // return res.send({
    //     message: req.body})
}

function remove (req, res) {
    services.remove(req.params.id)
        .then((owner) =>{
            return res.status(400).send({
                message: "Responsável removido com sucesso!",
                responsavel: owner})
            },
            (error) => res.status(500).send({message: error})
        )
}


function update (req, res) {
    services.update(req.body, req.params.id)
        .then((owner) => {
            return res.status(400).send({
                message: "Responsavel atualizado com sucesso!",
                responsavel: owner})
            },
            (error) => res.status(500).send({message: error})
        )
}


function list (req, res) {
    services.list()    
        .then((owners) => res.status(400).send({responsavel: owners}),
        (error) => res.status(500).send({message: error}))
}

module.exports = {list, add, remove, update}