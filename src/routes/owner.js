const express = require("express")
const router = express.Router()

const middlewares = require("../middlewares/middlewares")
const controller = require("../controller/owner")

// Adicionar responsável
router.post("/add", middlewares.verifyInput, controller.add)

// Atualizar responsável
router.get("/update/:id", controller.update)

// Excluir responsável
router.delete("/remove/:id", controller.remove)

// Listar todos os responsáveis e suas tarefas
router.get("/list", controller.list)

// Listar todas as tarefas pendente de um responsável
router.get("/pending/:owner", )

// Listar responsáveis que não possuem tarefas pendentes
router.get("/complete", )

module.exports = router