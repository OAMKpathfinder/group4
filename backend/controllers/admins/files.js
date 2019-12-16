const multer = require('multer')
const fs = require('fs')
const { store } = require('../../services/storage')

const upload = multer({ dest: './data/' })

async function uploadFile(req, res) {
    try {
        const extension = req.file.originalname.split('.')[1]
        if (
            extension !== 'JPG' &&
            extension !== 'jpg' &&
            extension !== 'JPEG' &&
            extension !== 'jpeg' &&
            extension !== 'PNG' &&
            extension !== 'png' &&
            extension !== 'svg' &&
            extension !== 'SVG'
        ) {
            return res
                .status(403)
                .send('Only JPG, PNG or SVG files can be stored')
        }

        const file = './data/' + req.file.originalname
        fs.rename(req.file.path, file, function(err) {
            if (err) {
                console.log(err)
            }
        })

        store['files'].push(req.file.originalname)
        return res.status(200).send(req.file.originalname)
    } catch (err) {
        console.log(err)
    }
}

async function getFiles(req, res) {
    res.status(200).send(store.get('files'))
}

module.exports = {
    '/': {
        post: {
            action: uploadFile,
            middlewares: upload.single('image-upload'),
            level: 'public',
        },
        get: {
            action: getFiles,
            level: 'public',
        },
    },
    getFiles,
}
