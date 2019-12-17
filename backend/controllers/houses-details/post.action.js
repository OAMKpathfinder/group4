const { House_Details } = require('@models')
const {
    calculateUValue,
    calculateHjoht,
    calculateTotalHjoht,
} = require('@services/calculate')
const { createPartMaterial } = require('../admins/models/part-materials')

async function addHouseDetail(req, res) {
    const arr = req.body
    let data = []
    try {
        for (const element of arr) {
            const MaterialsArray = element.MaterialsId

            const detail = House_Details.build({
                surface: element.surface,
                U_value: element.U_value,
                HousesId: element.HousesId,
                HousePartsId: element.HousePartsId,
            })
            const addedDetail = await detail.save()

            await createPartMaterial(addedDetail, MaterialsArray)

            if (!addedDetail.U_value) {
                const x = await calculateUValue(addedDetail)
                data.push(x)
            }
            await calculateHjoht(addedDetail.id)
            await calculateTotalHjoht(addedDetail.HousesId)
        }
        res.status(200).send(data)
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    addHouseDetail,
}
