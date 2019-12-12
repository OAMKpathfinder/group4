const { House_Details } = require('@models')
const { calculateUValue, calculateHjoht } = require('@services/calculate')

async function updateHouseDetail(req, res) {
    try {
        const updated = await House_Details.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        const addedDetail = await House_Details.findByPk(req.params.id)
        await calculateUValue(addedDetail)
        await calculateHjoht(addedDetail.id)
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    updateHouseDetail,
}
