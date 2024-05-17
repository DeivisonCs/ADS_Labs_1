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

module.exports = router