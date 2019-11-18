const { House_Details } = require('../../models')

async function updateHouseDetail(req, res) {
    try {
        const updated = await House_Details.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    updateHouseDetail,
}
