const multer = require('multer')
const path = require('path')

const armazenarImagem = multer.diskStorage({
    destination: function (req, file, cb) {
        let pasta = ''
        if (req.baseUrl.includes('usuarios')) {
            pasta = 'usuarios'
        } else if (req.baseUrl.includes('pets')) {
            pasta = 'pets'
        }
        cb(null, `public/img/${pasta}`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const imagemUpload = multer({
    storage: armazenarImagem,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor envie apenas imagens png ou jpg !'))
        }
        cb(undefined, true)
    }
})

module.exports = { imagemUpload }