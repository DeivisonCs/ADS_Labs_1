// Inporta a variável de ambiente que define a porta
require("dotenv").config({path: ".env"})
require("./database/database")

const express = require("express")
// Importa o controlador de rotas
// const tarefaRouter = require("./routes/tarefa")
const ownerRouter = require("./routes/owner")
const taskRouter = require("./routes/task")

const app = express()

// Para a aplicação reconhecer json
app.use(express.json())

app.use("/owner", ownerRouter)
app.use("/task", taskRouter)


// Abre a porta que será usada
app.listen(process.env.PORT, console.log(`Working on door ${process.env.PORT}`))

// Exporta a variável main
module.exports = app