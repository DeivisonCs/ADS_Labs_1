const express = require("express")
const router = express.Router()

const middlewares = require("../middlewares/task")
const controller = require("../controller/task")

// Adicionar tarefa
router.post("/add", middlewares.verifyInputCreate, controller.add)

// Remover tarefa
router.delete("/remove/:id", controller.remove)

// Atualizar tarefa
router.put("/update/:id", middlewares.verifyInputUpdate, controller.update)

// Listar tarefas
router.get("/list", controller.list)


module.exports = router