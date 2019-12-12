const { Thermal_Bridges } = require('@models')
const { calculateHjoht } = require('@services/calculate')
async function updateThermalBridges(req, res) {
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

module.exports = {
    updateThermalBridges,
}
