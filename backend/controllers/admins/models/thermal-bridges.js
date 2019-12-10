const { Thermal_Bridges } = require('@models')
const { thermalBridgesValidate } = require('@validation')
const { calculateHjoht } = require('@services/calculate')

async function get(req, res) {
    try {
        const rows = await Thermal_Bridges.findAll()
        // {attributes: {exclude:['HouseDetailId']}}
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req, res) {
    const arr = req.body
    arr.forEach(async element => {
        try {
            const HouseDetailsId = element.HouseDetailsId

            const row = await Thermal_Bridges.build({
                bridge_length: element.bridge_length,
                HouseDetailsId: HouseDetailsId,
            })

            await row.save()

            await calculateHjoht(HouseDetailsId)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
}

async function update(req, res) {
    try {
        const updated = await Thermal_Bridges.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        const thermalBridge = await Thermal_Bridges.findByPk(req.params.id, {
            attributes: { exclude: ['HouseDetailId'] },
        })
        await calculateHjoht(thermalBridge.HouseDetailsId)
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function remove(req, res) {
    try {
        await Thermal_Bridges.destroy({ where: { id: req.params.id } })
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
            middlewares: thermalBridgesValidate,
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
