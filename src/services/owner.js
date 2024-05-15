const Owner = require("../models/owner")

async function list() {
    return await Owner.findAll()
}

async function add(datas) {
    const newOwner = await Owner.create(datas)

    return newOwner
}

const update = (id) => {
    return [`update works! id: ${id.id}`]
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