const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { Defaults } = require('@models')

const upload = multer({ dest: './data/' })

async function getAllDefaults(req, res) {
    try {
        const rows = await Defaults.findAll()
        return res.status(200).send(rows)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

async function createDefault(req, res) {
    const directoryPath = path.join('./data/')

    fs.readdir(directoryPath, async function(err, files) {
        try {
            if (err) {
                return res
                    .status(400)
                    .send('Error getting directory information.')
            }
            for (const file of files) {
                if (file === req.body.file) {
                    await Defaults.create({
                        decade: req.body.decade,
                        hjoht: req.body.hjoht,
                        description: req.body.description,
                        houseImage: req.body.file,
                    })
                    return res.status(200).send(true)
                }
            }
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    })
}

async function removeDefault(req, res) {
    try {
        await Defaults.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updateDefault(req, res) {
    try {
        const updated = await Defaults.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    '/': {
        post: {
            action: createDefault,
            middlewares: upload.single('file'),
            level: 'admin',
        },
        get: {
            action: getAllDefaults,
            level: 'admin',
        },
    },
    '/:id': {
        delete: {
            action: removeDefault,
            level: 'admin',
        },
        put: {
            action: updateDefault,
            level: 'public',
        },
    },
}
