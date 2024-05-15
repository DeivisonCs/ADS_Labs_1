const express = require("express")
const router = express.Router()

const middlewares = require("../middlewares/middlewares")
const controller = require("../controller/owner")

// Adicionar responsável
router.post("/add", middlewares.verifyInputCreate, controller.add)

// Atualizar responsável
router.put("/update/:id", middlewares.verifyInputUpdate, controller.update)

// Excluir responsável
router.delete("/remove/:id", controller.remove)

// Listar todos os responsáveis e suas tarefas
router.get("/list", controller.list)


// Listar todas as tarefas pendente de um responsável
router.get("/pending/:owner", )

// Listar responsáveis que não possuem tarefas pendentes
router.get("/complete", )

module.exports = router