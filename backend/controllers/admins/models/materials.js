const { Materials } = require('../../../models')
const { materialsValidate } = require('./admins.validate')

async function get(req, res) {
    try {
        const rows = await Materials.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req, res) {
    try {
        const row = await Materials.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
        })
        return res.status(200).send(row)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function update(req, res) {
    try {
        const updated = await Materials.update(req.body, {
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
        await Materials.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    '/': {
        get: {
            action: get,
            level: 'public',
        },
        post: {
            action: create,
            middlewares: materialsValidate,
            level: 'public',
        },
    },
    '/:id': {
        put: {
            action: update,
            level: 'public',
        },
        delete: {
            action: remove,
            level: 'public',
        },
    },
}
