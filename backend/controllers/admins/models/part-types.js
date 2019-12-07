const { Part_Types } = require('../../../models')
const { partTypesValidate } = require('./admins.validate')

async function get(req, res) {
    try {
        const rows = await Part_Types.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req, res) {
    const PartId = req.body.PartId
    try {
        const partType = await Part_Types.build({
            name: req.body.name,
            producer: req.body.producer,
            serial: req.body.serial,
            price: req.body.price,
            U_value: req.body.U_value,
        })

        partType.setHouse_Parts(PartId)
        await partType.save()

        return res.status(200).send(partType)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function update(req, res) {
    try {
        const updated = await Part_Types.update(req.body, {
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
        await Part_Types.destroy({ where: { id: req.params.id } })
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
            middlewares: partTypesValidate,
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
