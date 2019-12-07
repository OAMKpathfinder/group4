const { House_Details } = require('../../models')
const { calculateUValue } = require('../../services/calculate')

async function addHouseDetail(req, res) {
    const arr = req.body
    arr.forEach(async element => {
        try {
            const HousesId = element.HousesId
            const HousePartsId = element.HousePartsId
            const MaterialsId = element.MaterialsId

            const detail = House_Details.build({
                surface: element.surface,
                U_value: element.U_value,
            })
            detail.setHouses(HousesId)
            detail.setHouse_Parts(HousePartsId)
            detail.setMaterials(MaterialsId)
            const addedDetail = await detail.save()

            if (!addedDetail.U_value) {
                await calculateUValue(addedDetail, MaterialsId)
            }
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
}

module.exports = {
    addHouseDetail,
}
