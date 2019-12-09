require('module-alias/register')
const { Materials } = require('@models')

async function getMaterials(req, res) {
    try {
        const rows = await Materials.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getMaterials,
}
