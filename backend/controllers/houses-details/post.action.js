const { House_Details } = require('@models')
const { calculateUValue } = require('@services/calculate')

async function addHouseDetail(req, res) {
    const arr = req.body
    arr.forEach(async element => {
        try {
            const detail = House_Details.build({
                surface: element.surface,
                U_value: element.U_value,
                HousesId: element.HousesId,
                HousePartsId: element.HousePartsId,
                MaterialsId: element.MaterialsId,
            })

            const addedDetail = await detail.save()
            if (!addedDetail.U_value) {
                await calculateUValue(addedDetail)
            }
        } catch (err) {
            res.status(500).send(err)
        }
    })
    return res.status(200).send(true)
}

module.exports = {
    addHouseDetail,
}
