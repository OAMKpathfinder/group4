const { House_Details } = require('../../models')

async function getAllHouseDetails(req, res) {
    try {
        const houseDetails = await House_Details.findAll({
            where: { HousesId: req.params.id },
            attributes: { exclude: ['HouseDetailsId'] },
        })
        res.status(200).send(houseDetails)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getAllHouseDetails,
}
