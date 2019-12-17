const { Materials, House_Details } = require('@models')
const { materialsValidate } = require('@validation')
const {
    calculateUValue,
    calculateHjoht,
    calculateTotalHjoht,
} = require('@services/calculate')

async function get(req, res) {
    try {
        const rows = await Materials.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getOne(req, res) {
    try {
        const row = await Materials.findByPk(req.params.id)
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
            await Materials.create({
                name: element.name,
                type: element.type,
                thermal_conductivity: element.thermal_conductivity,
                thickness: element.thickness,
                description: element.description,
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
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
        if (addedDetail) {
            await calculateUValue(addedDetail)
            await calculateHjoht(addedDetail.id)
            await calculateTotalHjoht(addedDetail.HousesId)
        }
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
