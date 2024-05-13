const services = require("../services/owner")

function add (req, res) {
    return res.send({teste: services.add()})
}

function remove (req, res) {
    return res.send({teste: services.remove(req.params)})
}


function update (req, res) {
    return res.send({teste: services.update(req.params)})
}


function list (req, res) {
    return res.send({teste: services.list()})
}

module.exports = {list, add, remove, update}