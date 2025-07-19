const express = require('express')
const router = express.Router()
const usuarioControllers = require('../controllers/usuarioControllers')
const verificaToken = require('../helpers/verificaToken')
const { imagemUpload } = require('../helpers/imagemUpload')

router.post('/cadastrar', usuarioControllers.cadastrar) 

router.post('/login', usuarioControllers.login)

router.get('/checaUsuario', usuarioControllers.checaUsuarioToken)

router.get('/:id', usuarioControllers.obterUsuarioId)

router.patch('/atualizar/:id', verificaToken, imagemUpload.single('imagem'), usuarioControllers.atualizarUsuario)

module.exports = router