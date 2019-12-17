const { Thermal_Bridges, House_Details } = require('@models')
const { calculateHjoht, calculateTotalHjoht } = require('@services/calculate')
async function updateThermalBridges(req, res) {
    try {
        const updated = await Thermal_Bridges.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        const thermalBridge = await Thermal_Bridges.findByPk(req.params.id, {
            attributes: { exclude: ['HouseDetailId'] },
        })
        const HouseDetail = await House_Details.findByPk(
            thermalBridge.HouseDetailsId
        )
        await calculateHjoht(thermalBridge.HouseDetailsId)
        await calculateTotalHjoht(HouseDetail.HousesId)
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    updateThermalBridges,
}
