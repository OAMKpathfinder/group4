const { House_Details } = require('../../models')

async function addHouseDetail(req, res) {
    const HousesId = req.body.HousesId
    const HousePartsId = req.body.HousePartsId
    const MaterialsId = req.body.MaterialsId
    try {
        const detail = await House_Details.build({
            surface: req.body.surface,
            U_value: req.body.U_value,
            hjoht: req.body.hjoht,
        })

        detail.setHouses(HousesId)
        detail.setHouse_Parts(HousePartsId)
        detail.setMaterials(MaterialsId)
        await detail.save()

        return res.status(200).send(detail)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    addHouseDetail,
}
