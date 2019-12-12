const { Materials, House_Details } = require('@models')
const { materialsValidate } = require('@validation')
const { calculateUValue } = require('@services/calculate')

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
            thermal_conductivity: req.body.thermal_conductivity,
            thickness: req.body.thickness,
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
        const addedDetail = await House_Details.findOne({
            where: { MaterialsId: req.params.id },
            attributes: { exclude: ['HouseDetailsId'] },
        })
        await calculateUValue(addedDetail)
        return res.status(200).send(updated)
    } catch (err) {
        console.log(err)
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
            level: 'admin',
        },
        post: {
            action: create,
            middlewares: materialsValidate,
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
