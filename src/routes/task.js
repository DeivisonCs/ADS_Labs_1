const express = require("express")
const router = express.Router()

const middlewares = require("../middlewares/task")
const controller = require("../controller/task")

// Adicionar tarefa
router.post("/add", middlewares.verifyInputCreate, controller.add)

// Listar tarefas
router.get("/list", controller.list)

// Remover tarefas
router.delete("/remove/:id", controller.remove)

module.exports = router