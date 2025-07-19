const conexao = require('../db/conexao')
const { Schema } = require('mongoose')

const Pet = conexao.model(
    'Pet',
    new Schema({
        nome: { type: String, required: true },
        idade: { type: Number, required: true },
        peso: { type: Number, required: true },
        cor: { type: String, required: true },
        imagens: { type: Array, required: true },
        disponivel: { type: Boolean, required: true },
        usuario: Object,
        adotante: Object
    },
        { timestamps: true }
    )
)

module.exports = Pet