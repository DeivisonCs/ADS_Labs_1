const { response } = require("express")
const services = require("../services/owner")

function add (req, res) {
    // return res.send({teste: services.add()})
    services.add(req.body)
        .then((owner) => {
            return res.status(400).send({
                message: "Responsavel Adicionado!",
                responsavel: owner})
        }, (error) => {
            return res.status(500).send({message: error})
        })
    // return res.send({input: services.add(req.body)})
}

function remove (req, res) {
    // return res.send({teste: services.remove(req.params)})
    services.remove(req.params.id)
        .then((owner) =>{
            return res.status(400).send({
                message: "Responsável removido com sucesso!",
                responsavel: owner
            })
        }, (error) => {
            return res.status(500).send({message: error})
        })
}


function update (req, res) {
    return res.send({teste: services.update(req.params)})
}


function list (req, res) {
    services.list()    
        .then((owners) => {
            return res.status(400).send({responsavel: owners})
        }, (error) => {
            return res.status(500).send({message: error})
        })
}

module.exports = {list, add, remove, update}