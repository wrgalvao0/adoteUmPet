const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost:27017/adoteUmPet')
    console.log(`Conectado ao banco de dados adoteUmPet do mongo db via mongoose`)
}

main().catch((err) => {
    console.log(`Erro ao conectar com o banco de dados: ${err}`)
})

module.exports = mongoose