const { Part_Types, House_Details, Sequelize } = require('@models')
const {
    calculateHjoht,
    calculateTotalHjoht,
    totalCost,
} = require('@services/calculate')

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
            order: [
                ['U_value', 'ASC'],
                ['price', 'ASC'],
            ],
            limit: 5,
        })
        res.status(200).send(suggestions)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function upgradeHouse(req, res) {
    try {
        const upgradeObj = await Part_Types.findByPk(req.query.upgradeTo)

        const updated = await House_Details.update(
            { U_value: upgradeObj.U_value },
            { where: { id: req.params.id } }
        )

        await totalCost(updated, upgradeObj.price)
        await calculateHjoht(updated.id)
        await calculateTotalHjoht(updated.HousesId)
        return res.status(200).send(true)
    } catch (err) {
        return res.status(500).send(err)
    }
}

async function getPotentialHouseCost(req, res) {
    let potentialTotalCost = 0
    try {
        const houseDetails = await House_Details.findAll({
            where: { HousesId: req.params.id },
        })
        for (const element of houseDetails) {
            const suggestion = await Part_Types.findOne({
                where: {
                    PartId: element.HousePartsId,
                    U_value: { [Op.lt]: element.U_value },
                },
                order: [['U_value', 'ASC']],
            })
            potentialTotalCost += suggestion.price
        }
    } catch (err) {
        return res.status(500).send(err)
    }
    return res.status(200).send(potentialTotalCost)
}

module.exports = {
    getSuggestions,
    upgradeHouse,
    getPotentialHouseCost,
}
