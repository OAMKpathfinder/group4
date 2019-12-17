const { Defaults } = require('@models')

async function getAllDefaults(req, res) {
    try {
        const rows = await Defaults.findAll()
        return res.status(200).send(rows)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

async function getOne(req, res) {
    try {
        const row = await Defaults.findByPk(req.params.id)
        res.status(200).send(row)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function createDefault(req, res) {
    try {
        await Defaults.create({
            decade: req.body.decade,
            description: req.body.description,
            houseImage: req.body.houseImage,
        })
    } catch (err) {
        return res.status(500).send(err)
    }
    return res.status(200).send(true)
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
            level: 'admin',
        },
        get: {
            action: getAllDefaults,
            level: 'admin',
        },
    },
    '/:id': {
        get: {
            action: getOne,
            level: 'public',
        },
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
