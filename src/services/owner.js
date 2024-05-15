const Owner = require("../models/owner")

async function list() {
    return await Owner.findAll()
}

async function add(data) {
    return await Owner.create(data)
}

async function update(data, id) {
    try{
        const ownerToUpdate = await Owner.FindByPk(id)

        // if(!ownerToUpdate){
            
        // }

        const newOwnerArtibutes = {};

        if(data.nome) newOwnerArtibutes.nome = data.nome
        if(data.dataNascimento) newOwnerArtibutes.dataNascimento = data.dataNascimento

        await ownerToUpdate.update(newOwnerArtibutes)

        return await Owner.FindByPk(id)
    } catch (error) {
        return error
    }
}

async function remove(id) {
    // return [`remove works! id: ${id.id}`]
    const removedOwner = await Owner.destroy({
        where: {
            id: id
        }
    })

    return removedOwner
}

module.exports = {list, add, update, remove}