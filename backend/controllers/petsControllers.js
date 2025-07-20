const { json } = require('express')
const extraiToken = require('../helpers/extraiToken')
const obterUsuarioPorToken = require('../helpers/obterUsuarioPorToken')
const Pet = require('../models/pet')
const Usuario = require('../models/usuario')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetsControllers {
    static async cadastrar(req, res) {
        const nome = req.body.nome
        const idade = req.body.idade
        const peso = req.body.peso
        const cor = req.body.cor
        let imagens = req.files

        if (!nome || !idade || !peso || !cor || imagens.length === 0) {
            res.status(422).json({ mensagem: 'algum dado ficou faltando verifique e digite novamente' })
            return
        }

        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        const pet = new Pet({
            nome: nome,
            idade: idade,
            peso: peso,
            cor: cor,
            disponivel: true,
            imagens: [],
            usuario: {
                _id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                imagem: usuario.imagem,
                telefone: usuario.telefone
            }
        })

        imagens.map((imagem) => {
            pet.imagens.push(imagem.filename)
        })

        try {
            const novoPet = await pet.save()
            res.status(201).json({ mensagem: 'Pet adicionado com sucesso !', novoPet })
        } catch (error) {
            res.status(500).json({ mensagem: error })
        }
    }

    static async mostrarTodosPets(req, res) {
        try {
            const pets = await Pet.find().sort('-createdAt') //pegando todos os pets do banco de dados e ordenando do mais novo para o mais velho com a funcao sort
            res.status(200).json({ pets: pets })
        } catch (error) {
            res.status(500).json({ mensagem: error })
        }
    }
    static async meusPets(req, res) {
        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        try {
            const pets = await Pet.find({ 'usuario._id': usuario._id }).sort('-createdAt')
            res.status(200).json({ mensagem: 'Pets obtidos com sucesso !', pets })
        }
        catch (error) {
            res.status(500).json({ mensagem: 'Erro ao obter os seus pets', erro: error })
        }
    }

    static async minhasAdocoes(req, res) {
        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        try {
            const pets = await Pet.find({ 'adotante._id': usuario._id }).sort('-createdAt')
            res.status(200).json({ mensagem: 'Pets obtidos com sucesso !', pets })
        }
        catch (error) {
            res.status(500).json({ mensagem: 'Erro ao obter os seus pets', erro: error })
        }
    }

    static async verPet(req, res) {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ mensagem: 'Id e invalido !' })
        }
        else {
            try {
                const pet = await Pet.findOne({ _id: id })
                res.status(200).json({ mensagem: 'OK!', pet })
            } catch (error) {
                res.status(500).json({ erro: error })
            }
        }
    }

    static async deletarPet(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ mensagem: 'Id e invalido !' })
            return
        }

        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        const pet = await Pet.findOne({ _id: id })
        //res.status(200).json({mensagem: 'Pet encontrado !'})
        if (!pet) {
            res.status(404).json({ mensagem: 'Pet nao encontrado !' })
            return
        }
        if (pet.usuario._id.toString() !== usuario.id.toString()) {
            res.status(422).json({ mensagem: 'voce esta tentando deletar um pet que nao e seu, operacao invalida !' })
            return
        }

        try {
            const petDeletado = await Pet.findByIdAndDelete(id)
            res.status(200).json({ mensagem: 'pet deletado com sucesso !', petDeletado })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async atualizarPet(req, res) {
        const id = req.params.id
        const nome = req.body.nome
        const idade = req.body.idade
        const peso = req.body.peso
        const cor = req.body.peso
        const disponivel = req.body.disponivel
        const imagens = req.files
        const dadoAtualizado = {}

        const pet = await Pet.findOne({ _id: id })
        //res.status(200).json({mensagem: 'Pet encontrado !'})
        if (!pet) {
            res.status(404).json({ mensagem: 'Pet nao encontrado !' })
            return
        }

        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        if (pet.usuario._id.toString() !== usuario.id.toString()) {
            res.status(422).json({ mensagem: 'voce esta tentando atualizar um pet que nao e seu, operacao invalida !' })
            return
        }

        if (!nome || !idade || !peso || !cor || imagens.length === 0) {
            res.status(422).json({ mensagem: 'algum dado ficou faltando verifique e digite novamente' })
            return
        }
        dadoAtualizado.nome = nome
        dadoAtualizado.idade = idade
        dadoAtualizado.peso = peso
        dadoAtualizado.cor = cor
        dadoAtualizado.imagens = []

        imagens.map((imagem) => {
            dadoAtualizado.imagens.push(imagem.filename)
        })

        try {
            await Pet.findByIdAndUpdate(id, dadoAtualizado)
            res.status(200).json({ mensagem: 'Pet atualizado com sucesso !' })
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    static async agendarVisita(req, res) {
        const id = req.params.id

        const pet = await Pet.findOne({ _id: id })
        //res.status(200).json({mensagem: 'Pet encontrado !'})
        if (!pet) {
            res.status(404).json({ mensagem: 'Pet nao encontrado !' })
            return
        }

        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        if (pet.usuario._id.toString() === usuario.id.toString()) {
            res.status(422).json({ mensagem: 'voce nao pode agendar uma visita para o seu proprio pet, tente outro pet !' })
            return
        }

        if (pet.adotante) {
            if (pet.adotante._id.toString() === usuario.id.toString()) {
                res.status(422).json({ mensagem: 'Voce ja agendou uma visita para esse pet !' })
                return
            }
        }
        else {
            pet.adotante = {
                _id: usuario.id,
                nome: usuario.nome,
                imagens: usuario.imagens
            }
            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({ mensagem: `A visita foi agendada com sucesso entre em contato com ${pet.usuario.nome} pelo telefone ${pet.usuario.telefone}` })
        }
    }

    static async concluirAdocao(req, res) {
        const id = req.params.id
        const pet = await Pet.findOne({ _id: id })
        //res.status(200).json({mensagem: 'Pet encontrado !'})
        if (!pet) {
            res.status(404).json({ mensagem: 'Pet nao encontrado !' })
            return
        }
        const token = extraiToken(req)
        const usuario = await obterUsuarioPorToken(token)

        if (pet.usuario._id.toString() !== usuario.id.toString()) {
            res.status(422).json({ mensagem: 'voce esta tentando atualizar a disponibilidade de um pet que nao e seu, operacao invalida !' })
            return
        }
        pet.disponivel = false

        try {
            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({mensagem: 'Pet foi adotado com sucesso !'})
            
        } catch (error) {
            res.status(500).json({error})
        }
        
    }
}
