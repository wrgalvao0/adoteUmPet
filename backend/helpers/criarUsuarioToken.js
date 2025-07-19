const jwt = require('jsonwebtoken')

const criarUsuarioToken = async (usuario, req, res) => {
    const token = jwt.sign({nome: usuario.nome, id: usuario._id}, "meuSecret")
    res.status(200).json({mensagem: 'Voce esta autenticado !', token: token, usuarioId: usuario._id})
}
module.exports = criarUsuarioToken