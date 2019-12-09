require('module-alias/register')
const { Heating_Systems } = require('@models')

async function getHeatingSystems(req, res) {
    try {
        const rows = await Heating_Systems.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getHeatingSystems,
}
