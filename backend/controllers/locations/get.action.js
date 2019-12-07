const { Locations } = require('../../models')

async function getLocations(req, res) {
    try {
        const rows = await Locations.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getLocations,
}
