const { Thermal_Bridges, House_Details } = require('@models')
const { calculateHjoht, calculateTotalHjoht } = require('@services/calculate')

async function createThermalBridges(req, res) {
    const arr = req.body
    arr.forEach(async element => {
        try {
            const HouseDetailsId = element.HouseDetailsId
            const HouseDetail = await House_Details.findByPk(HouseDetailsId)

            const row = await Thermal_Bridges.build({
                bridge_length: element.bridge_length,
                HouseDetailsId: HouseDetailsId,
            })

            await row.save()

            await calculateHjoht(HouseDetailsId)
            await calculateTotalHjoht(HouseDetail.HousesId)
        } catch (err) {
            res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
}

module.exports = {
    createThermalBridges,
}
