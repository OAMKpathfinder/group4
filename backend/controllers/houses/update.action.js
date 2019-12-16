const { Houses } = require('@models')
const { calculateTotalHjoht } = require('@services/calculate')

async function updateHouse(req, res) {
    try {
        const updated = await Houses.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        await calculateTotalHjoht(updated.id)
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    updateHouse,
}
