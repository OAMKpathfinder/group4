const { Thermal_Bridges, Sequelize } = require('../../models')
const Op = Sequelize.Op
async function getAllUsersThermalBridges(req, res) {
    try {
        const rows = await Thermal_Bridges.findAll({
            where: {
                [Op.or]: [
                    { HouseDetailsId1: req.params.id },
                    { HouseDetailsId2: req.params.id },
                ],
            },
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
