const { Part_Types } = require('@models')
const { partTypesValidate } = require('@validation')

async function get(req, res) {
    try {
        const rows = await Part_Types.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req, res) {
    let arr = []
    if (!(req.body instanceof Array)) {
        arr.push(req.body)
    } else {
        arr = req.body
    }
    arr.forEach(async element => {
        try {
            const PartId = element.PartId
            const partType = await Part_Types.build({
                name: element.name,
                producer: element.producer,
                serial: element.serial,
                price: element.price,
                U_value: element.U_value,
                PartId: PartId,
            })
            await partType.save()
        } catch (err) {
            return res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
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
