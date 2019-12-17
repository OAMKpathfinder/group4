const { House_Details } = require('@models')

async function removeHouseDetail(req, res) {
    try {
        await House_Details.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    removeHouseDetail,
}
