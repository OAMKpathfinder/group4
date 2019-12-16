const { Defaults } = require('@models')

async function getDefaults(req, res) {
    try {
        const rows = await Defaults.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getImage(req, res) {
    try {
        const row = await Defaults.findOne({
            where: { decade: req.params.decade },
        })
        return res.status(200).send(row.houseImage)
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    getDefaults,
    getImage,
}
