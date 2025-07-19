const jwt = require('jsonwebtoken')
const extraiToken = require('./extraiToken')

const verificaToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ mensagem: 'Acesso negado !' })
    }

    const token = extraiToken(req)

    if (!token) {
        return res.status(401).json({ mensagem: 'Acesso negado !' })
    }
    else {
        try {
            const verificado = jwt.verify(token, 'meuSecret')
            req.usuario = verificado
            next()
        }
        catch (err) {
            return res.status(400).json({ mensagem: 'Token Invalido !' })
        }
    }
}

module.exports = verificaToken