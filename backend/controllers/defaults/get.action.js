const { Defaults } = require('../../models')

async function getDefaults(req, res) {
    try {
        const rows = await Defaults.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getDefaults,
}
