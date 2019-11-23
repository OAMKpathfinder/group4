const { Locations } = require('../../../models')
const { locationsValidate } = require('./admins.validate')

async function get(req, res) {
    try {
        const rows = await Locations.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req, res) {
    try {
        const row = await Locations.create({
            country: req.body.country,
        })
        return res.status(200).send(row)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function update(req, res) {
    try {
        const updated = await Locations.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function remove(req, res) {
    try {
        await Locations.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    '/': {
        get: {
            action: get,
            level: 'admin',
        },
        post: {
            action: create,
            middlewares: locationsValidate,
            level: 'admin',
        },
    },
    '/:id': {
        put: {
            action: update,
            level: 'admin',
        },
        delete: {
            action: remove,
            level: 'admin',
        },
    },
}
