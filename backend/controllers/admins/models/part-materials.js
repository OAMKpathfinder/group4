const { Part_Materials, Materials } = require('@models')

async function get(req, res) {
    try {
        const rows = await Part_Materials.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

function createPartMaterial(houseDetail, materialArray) {
    return new Promise((res, rej) => {
        materialArray.forEach(element => {
            Part_Materials.create({
                MaterialsId: element,
                HouseDetailsId: houseDetail.id,
            })
                .then(value => {
                    res(value)
                })
                .catch(err => {
                    rej(err)
                })
        })
    })
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
            action: createPartMaterial,
            level: 'admin',
        },
    },
    '/:id': {
        delete: {
            action: remove,
            level: 'admin',
        },
    },
    createPartMaterial,
}
