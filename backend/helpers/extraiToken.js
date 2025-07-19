
const extraiToken = (req) => {
    const cabecalhoAutenticacao = req.headers.authorization
    const token = cabecalhoAutenticacao.split(" ")[1]
    return token
}

module.exports = extraiToken