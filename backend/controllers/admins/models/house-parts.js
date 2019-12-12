const { House_Parts } = require('@models')
const { housePartsValidate } = require('@validation')

async function get(req, res) {
    try {
        const rows = await House_Parts.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req, res) {
    try {
        const row = await House_Parts.create({
            part: req.body.part,
        })
        return res.status(200).send(row)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function update(req, res) {
    try {
        const updated = await House_Parts.update(req.body, {
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
        await House_Parts.destroy({ where: { id: req.params.id } })
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
            middlewares: housePartsValidate,
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
