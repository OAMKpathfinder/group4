const { House_Details } = require('../../../models')
const { houseDetailsValidate } = require('./admins.validate')

async function get(req, res) {
    try {
        const rows = await House_Details.findAll({
            attributes: { exclude: ['HouseDetailsId'] },
        })
        res.status(200).send(rows)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

function create(req, res) {
    const arr = req.body
    arr.forEach(async element => {
        try {
            const HousesId = element.HousesId
            const HousePartsId = element.HousePartsId
            const MaterialsId = element.MaterialsId

            const detail = House_Details.build({
                surface: element.surface,
                U_value: element.U_value,
            })
            detail.setHouses(HousesId)
            detail.setHouse_Parts(HousePartsId)
            detail.setMaterials(MaterialsId)
            await detail.save()
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
}

async function update(req, res) {
    try {
        const updated = await House_Details.update(req.body, {
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
        await House_Details.destroy({ where: { id: req.params.id } })
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
            middlewares: houseDetailsValidate,
            level: 'public',
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
