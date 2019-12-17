const { House_Parts } = require('@models')

async function getHouseParts(req, res) {
    try {
        const rows = await House_Parts.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getHouseParts,
}
