const express = require('express')
const app = express()
const router = express.Router()
const PetsControllers = require('../controllers/petsControllers')
const verificaToken = require('../helpers/verificaToken')
const { imagemUpload } = require('../helpers/imagemUpload')
const { route } = require('./usuarioRotas')


router.post('/cadastrar', verificaToken, imagemUpload.array('imagens'), PetsControllers.cadastrar)

router.get('/', PetsControllers.mostrarTodosPets)

router.get('/meusPets', verificaToken, PetsControllers.meusPets)

router.get('/minhasAdocoes', verificaToken, PetsControllers.minhasAdocoes)

router.get('/:id', PetsControllers.verPet)

router.delete('/deletar/:id', verificaToken, PetsControllers.deletarPet)

router.patch('/atualizar/:id', verificaToken, imagemUpload.array('imagens'), PetsControllers.atualizarPet)

router.patch('/agendarVisita/:id', verificaToken, PetsControllers.agendarVisita)

router.patch('/concluiAdocao/:id', verificaToken, PetsControllers.concluirAdocao)

module.exports = router