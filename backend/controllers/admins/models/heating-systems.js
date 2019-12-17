const { Heating_Systems } = require('@models')
const { heatingSystemsValidate } = require('@validation')

async function get(req, res) {
    try {
        const rows = await Heating_Systems.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getOne(req, res) {
    try {
        const row = await Heating_Systems.findByPk(req.params.id)
        res.status(200).send(row)
    } catch (err) {
        console.log(err)
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
            await Heating_Systems.create({
                type: element.type,
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
}

async function update(req, res) {
    try {
        const updated = await Heating_Systems.update(req.body, {
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
        await Heating_Systems.destroy({ where: { id: req.params.id } })
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
            middlewares: heatingSystemsValidate,
            level: 'admin',
        },
    },
    '/:id': {
        get: {
            action: getOne,
            level: 'public',
        },
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
