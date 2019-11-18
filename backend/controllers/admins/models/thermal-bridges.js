const { Thermal_Bridges, House_Details } = require('../../../models')
const { thermalBridgesValidate } = require('./admins.validate')

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
    const HouseDetailsId1 = req.body.HouseDetailsId1
    const HouseDetailsId2 = req.body.HouseDetailsId2
    try {
        const HouseDetails1 = await House_Details.findOne({
            where: { id: req.body.HouseDetailsId1 },
            attributes: { exclude: ['HouseDetailsId'] },
        })
        const HouseDetails2 = await House_Details.findOne({
            where: { id: req.body.HouseDetailsId2 },
            attributes: { exclude: ['HouseDetailsId'] },
        })

        if (HouseDetails1.HousesId === HouseDetails2.HousesId) {
            const row = await Thermal_Bridges.build({
                bridge_length: req.body.bridge_length,
            })

            row.setHouse_Details1(HouseDetailsId1)
            row.setHouse_Details2(HouseDetailsId2)
            await row.save()
            return res.status(200).send(row)
        } else {
            return res
                .status(500)
                .send('House details does not belong to the same house')
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

async function update(req, res) {
    try {
        const updated = await Thermal_Bridges.update(req.body, {
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
            level: 'public',
        },
        post: {
            action: create,
            middlewares: thermalBridgesValidate,
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
