const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const obraController = require('./controller/obra.controller')
const materialController = require('./controller/material.controller')
const movimentoController = require('./controller/movimento.controller')

//-------------- Middleware --------------

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


//-------------- Rotas Públicas --------------

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!'})
})

require('./models/rel')

//-------------- Rotas Privadas --------------

//Obra
app.post('/obra', obraController.cadastrar)
app.get('/obras', obraController.listar)
app.get('/obra/:id', obraController.consultar)
app.get('/obra/buscarCnpj/cnpj', obraController.consultarCNPJ)
app.put('/obra/:id', obraController.atualizar)
app.delete('/obra/:id', obraController.apagar)

//Material
app.post('/material', materialController.cadastrar)
app.put('/material/:id', materialController.atualizar)

//Movimento
app.post('/movimento', movimentoController.cadastrar)
app.get('/movimentos', movimentoController.listar)

//-------------- Serve --------------

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao iniciar servidor')
})