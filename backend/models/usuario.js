const conexao = require('../db/conexao')
const {Schema} = require('mongoose')

const Usuario = conexao.model(
    'Usuario', 
    new Schema({
        nome: { type: String, required: true},
        email: { type: String, required: true},
        senha: {type: String, required: true},
        imagem: {type: String},
        telefone: {type: String, required: true}
    },
    {timestamps: true}
)
)

module.exports = Usuario