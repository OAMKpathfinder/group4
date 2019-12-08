require('module-alias/register')
const { Thermal_Bridges } = require('@models')

async function deleteThermalBridges(req, res) {
    try {
        await Thermal_Bridges.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    deleteThermalBridges,
}
