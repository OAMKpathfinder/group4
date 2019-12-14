const multer = require('multer')
const fs = require('fs')
const path = require('path')

const upload = multer({ dest: './data/' })

async function uploadFile(req, res) {
    try {
        const extension = req.file.originalname.split('.')[1]
        console.log(extension)
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
            return res.status(403).send('Only JPG or PNG files can be stored')
        }
        console.log(req.file)
        const file =
            './data/' + req.file.originalname.split('.')[0] + '.' + extension
        fs.rename(req.file.path, file, function(err) {
            if (err) {
                console.log(err)
            }
        })
        return res.status(200).send(true)
    } catch (err) {
        console.log(err)
    }
}

async function getFiles(req, res) {
    const directoryPath = path.join('./data/')

    fs.readdir(directoryPath, function(err, files) {
        let arr = []
        if (err) {
            return res.status(400).send('Error getting directory information.')
        }
        for (const file of files) {
            arr.push(file)
        }
        return res.status(200).send(arr)
    })
}

module.exports = {
    '/': {
        post: {
            action: uploadFile,
            middlewares: upload.single('file'),
            level: 'public',
        },
        get: {
            action: getFiles,
            level: 'public',
        },
    },
    getFiles,
}
