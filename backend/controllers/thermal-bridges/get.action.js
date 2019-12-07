const { Thermal_Bridges } = require('../../models')
async function getAllUsersThermalBridges(req, res) {
    try {
        const rows = await Thermal_Bridges.findAll({
            where: { HouseDetailsId: req.params.id },
            attributes: { exclude: ['HouseDetailId'] },
        })
        res.status(200).send(rows)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getAllUsersThermalBridges,
}
