const { Thermal_Bridges } = require('../../models')

async function updateThermalBridges(req, res) {
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

module.exports = {
    updateThermalBridges,
}
