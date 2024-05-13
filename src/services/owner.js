const list = () => {
    return ["list works!"]
}

const add = () => {
    return ["add works!"]
}

const update = (id) => {
    return [`update works! id: ${id.id}`]
}

const remove = (id) => {
    return [`remove works! id: ${id.id}`]
}

module.exports = {list, add, update, remove}