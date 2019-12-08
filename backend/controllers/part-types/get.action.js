const { Part_Types, House_Details, Sequelize } = require('../../models')
const Op = Sequelize.Op

async function getSuggestions(req, res) {
    try {
        const houseDetail = await House_Details.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ['HouseDetailsId'] },
        })
        const suggestions = await Part_Types.findAll({
            where: {
                PartId: houseDetail.HousePartsId,
                U_value: { [Op.lt]: houseDetail.U_value },
            },
        })
        res.status(200).send(suggestions)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getSuggestions,
}
