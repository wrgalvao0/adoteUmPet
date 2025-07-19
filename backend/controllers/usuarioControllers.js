const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const criarUsuarioToken = require('../helpers/criarUsuarioToken')
const extraiToken = require('../helpers/extraiToken')
const jwt = require('jsonwebtoken')
const obterUsuarioPorToken = require('../helpers/obterUsuarioPorToken')

module.exports = class UsuarioControllers {
    static async cadastrar(req, res) {
        const nome = req.body.nome
        const email = req.body.email
        const senha = req.body.senha
        const imagem = req.body.imagem
        const telefone = req.body.telefone
        const confirmarSenha = req.body.confirmarSenha

        //validacoes

        if (!nome || !email || !senha || !imagem || !telefone || !confirmarSenha) {
            res.status(422).json({ mensagem: 'algum dado ficou faltando verifique e digite novamente' })
            return
        }
        if (senha !== confirmarSenha) {
            res.status(422).json({ mensagem: 'A senha e a confirmacao de senha precisam ser iguais !' })
            return
        }
        //checa se ja existe o email
        const usuarioExiste = await Usuario.findOne({ email: email })

        if (usuarioExiste) {
            res.status(422).json({ mensagem: 'Usuario ja existe, tente outro email' })
            return
        }
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)

        const usuario = new Usuario({
            nome: nome,
            email: email,
            senha: senhaHash,
            telefone: telefone,
        })

        try {
            const novoUsuario = await usuario.save()

            await criarUsuarioToken(novoUsuario, req, res)
        } catch (err) {
            res.status(500).json({ mensagem: err })
        }
    }

    static async login(req, res) {
        const email = req.body.email
        const senha = req.body.senha

        if (!email || !senha) {
            res.status(422).json({ mensagem: 'algum dado ficou faltando verifique e digite novamente' })
            return
        }

        const usuario = await Usuario.findOne({ email: email }) //verifica no banco de dados se ja existe algum usuario com o mesmo email

        if (!usuario) {
            res.status(422).json({ mensagem: 'Não há usuario cadastrado com este email' })
            return
        }

        //verificar se as senhas dao match
        const verificaSenha = await bcrypt.compare(senha, usuario.senha)

        if (!verificaSenha) {
            res.status(422).json({ mensagem: 'Senha invalida' })
            return
        }
        await criarUsuarioToken(usuario, req, res)
    }

    static async checaUsuarioToken(req, res) {
        let usuarioAtual

        console.log(req.headers.authorization)

        if (req.headers.authorization) {
            const token = extraiToken(req)
            const tokenDecodificado = jwt.verify(token, 'meuSecret')
            usuarioAtual = await Usuario.findById(tokenDecodificado.id)
            usuarioAtual.senha = undefined
        }
        else {
            usuarioAtual = null
        }
        res.status(200).send(usuarioAtual)
    }

    static async obterUsuarioId(req, res) {
        const id = req.params.id
        const usuario = await Usuario.findById(id)
        usuario.senha = undefined
        if (!usuario) {
            res.status(422).json({ mensagem: 'Usuario nao encontrado' })
        }
        else {
            res.status(200).json({ usuario })
        }
    }

    static async atualizarUsuario(req, res) {
        const id = req.params.id
        const nome = req.body.nome
        const email = req.body.email
        const senha = req.body.senha
        const telefone = req.body.telefone
        const confirmarSenha = req.body.confirmarSenha

        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        if(req.file){
            usuario.imagem = req.file.filename
        }


        //validacoes
        if (!nome || !email || !senha || !telefone || !confirmarSenha) {
            res.status(422).json({ mensagem: 'algum dado ficou faltando verifique e digite novamente' })
            return
        }
        usuario.nome = nome

        const usuarioExiste = await Usuario.findOne({ email: email })
        if (usuario.email !== email && usuarioExiste) {
            res.status(422).json({ mensagem: 'Por favor utilize outro email, este email ja existe !' })
            return
        }
        usuario.email = email

        if (senha !== confirmarSenha) {
            res.status(422).json({ mensagem: 'A senha e a confirmacao de senha precisam ser iguais !' })
        }
        else if (senha === confirmarSenha && senha != null) {
            const salt = await bcrypt.genSalt(12)
            const senhaHash = await bcrypt.hash(senha, salt)
            usuario.senha = senhaHash
            console.log(usuario)
        }
        try {
            await Usuario.findOneAndUpdate(
                { _id: usuario.id },
                { $set: usuario },
                { new: true }
            )
            res.status(200).json({ mensagem: 'usuario atualizado com sucesso !' })
        }
        catch (err) {
            res.status(500).json({ mensagem: err })
            return
        }
    }
}