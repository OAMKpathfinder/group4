const { Thermal_Bridges } = require('../../models')

async function createThermalBridges(req, res) {
    const HouseDetailsId1 = req.body.HouseDetailsId1
    const HouseDetailsId2 = req.body.HouseDetailsId2
    try {
        const row = await Thermal_Bridges.build({
            bridge_length: req.body.bridge_length,
        })

        row.setHouse_Details1(HouseDetailsId1)
        row.setHouse_Details2(HouseDetailsId2)
        await row.save()

        return res.status(200).send(row)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    createThermalBridges,
}
