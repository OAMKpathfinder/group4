const { House_Details } = require('@models')
const { houseDetailsValidate } = require('@validation')
const { calculateUValue } = require('@services/calculate')
const { createPartMaterial } = require('./part-materials')

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

async function create(req, res) {
    const arr = req.body
    let data = []
    try {
        for (const element of arr) {
            const MaterialsArray = element.MaterialsId

            const detail = House_Details.build({
                surface: element.surface,
                U_value: element.U_value,
                HousesId: element.HousesId,
                HousePartsId: element.HousePartsId,
            })
            const addedDetail = await detail.save()

            await createPartMaterial(addedDetail, MaterialsArray)

            if (!addedDetail.U_value) {
                const x = await calculateUValue(addedDetail)
                data.push(x)
            }
        }
        res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err)
    }
}

async function update(req, res) {
    try {
        const updated = await House_Details.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        const addedDetail = await House_Details.findByPk(req.params.id)
        await calculateUValue(addedDetail)
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
