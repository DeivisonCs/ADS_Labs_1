const express = require("express")
const router = express.Router()

const middlewares = require("../middlewares/owner")
const controller = require("../controller/owner")

// Adicionar responsável
router.post("/add", middlewares.verifyInputCreate, controller.add)

// Atualizar responsável
router.put("/update/:id", middlewares.verifyInputUpdate, controller.update)

// Excluir responsável
router.delete("/remove/:id", controller.remove)

// Listar todos os responsáveis
router.get("/list", controller.list)


// Listar todas as tarefas de um responsável
router.get("/list/tasks/:id", )

// Listar todas as tarefas pendente de um responsável
router.get("/pending/:id", )

// Listar responsáveis que não possuem tarefas pendentes
router.get("/complete", )

module.exports = router