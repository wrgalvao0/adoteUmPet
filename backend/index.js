const express = require('express')
const cors = require('cors')
const usuarioRotas = require('./routes/usuarioRotas')
const app = express()
const porta = 5000

app.use(express.json())

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))

app.use('/usuarios', usuarioRotas)

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`)
})
