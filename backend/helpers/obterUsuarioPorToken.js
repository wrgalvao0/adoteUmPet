const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const obterUsuarioPorToken = async (token) => {
    if (!token) {
        return res.status(401).json({ mensagem: 'Acesso negado !' })
    }

    const tokenDecodificado = jwt.verify(token, 'meuSecret')

    const usuarioID = tokenDecodificado.id

    const usuario = await Usuario.findOne({ _id: usuarioID })

    return usuario
}

module.exports = obterUsuarioPorToken